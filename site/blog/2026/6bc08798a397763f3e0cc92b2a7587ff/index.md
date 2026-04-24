---
uuid: 6bc08798a397763f3e0cc92b2a7587ff
title: "De nix-shell a devenv: el camino para no volverte loco con tus entornos"
slug: /posts/de-nix-shell-a-devenv
date: 2026-04-23
authors:
  - sincorchetes
tags:
  - Linux
  - NixOS
  - DevOps
  - devenv
---

¿Cuántas veces has empezado un proyecto nuevo y te has visto instalando un PostgreSQL en tu máquina "solo para esto"? ¿Y luego otro proyecto pide una versión distinta y empiezan los líos con puertos, usuarios, servicios de `systemd` y aquel `pg_hba.conf` que tocaste hace meses y ya no recuerdas por qué? Si te suena, este post es para ti.

En el [post anterior](/posts/nix-prueba-software-sin-instalarlo) vimos cómo usar `nix-shell` para probar software sin ensuciar el sistema. Hoy vamos a dar un paso más: montar un entorno de desarrollo de verdad para una API en **FastAPI**, y veremos las distintas formas de hacerlo en Nix hasta llegar a la que, en mi opinión, es la más cómoda con diferencia: `devenv`. Para que el contraste duela un poco, dejaremos lo más interesante (un PostgreSQL 17 gestionado de verdad) para el último ejemplo.

Todo el código de este artículo está disponible en el repositorio [echemosunbitstazo.es-nix](https://github.com/sincorchetes/echemosunbitstazo.es-nix/tree/main/posts/de-nix-shell-a-devenv) por si quieres clónarlo y trastear directamente.

<!-- truncate -->

## Antes de Nix: el dolor de siempre

Antes de meternos en harina, recordemos cómo se hacía esto "de toda la vida":

- Instalas `postgresql` en el sistema con `apt` o `dnf`.
- Lanzas el servicio con `systemctl`.
- Creas el usuario y la base de datos a mano.
- Te montas un `venv` de Python, instalas `fastapi`, `uvicorn`, `psycopg2`...
- En el siguiente proyecto, otra versión de PostgreSQL. Choque de puertos. Otro `venv`. Otro `requirements.txt`. Otro día perdido.

Y todo esto vive en tu máquina **para siempre**, hasta que decides reinstalar el sistema operativo de pura desesperación.

Docker mejora la cosa, sí, pero te trae sus propios problemas: imágenes de gigas, capas opacas, el demonio corriendo como `root`, y un `Dockerfile` que el día que ejecutes `apt-get update` puede dejar de construir igual. Podman arregla parte del tema de seguridad (`rootless`, `daemonless`), pero seguimos arrastrando imágenes OCI pesadas y construidas de forma imperativa.

Vamos a ver cómo lo resuelve Nix, paso a paso.

## 1. Scripts con `nix-shell` en la cabecera

Lo más directo: un script de bash que en su shebang declara las dependencias que necesita. No hay que instalar nada en el sistema, lo lanzas y funciona.

El intérprete de Python lo trae Nix, pero las dependencias de la API (FastAPI, Uvicorn...) las gestionamos con un `requirements.txt` de toda la vida y un `venv`. Es la forma habitual de trabajar en cualquier proyecto Python y nos sirve para mantener una única fuente de verdad para las dependencias del lenguaje.

_NOTA: Nix también permite empaquetar las librerías de Python con `python314.withPackages (ps: with ps; [ fastapi uvicorn ])`. Es elegante y reproducible, pero te obliga a duplicar la lista de dependencias y te ata a las versiones que haya en `nixpkgs`. Para un proyecto típico, tirar de `requirements.txt` suele ser más práctico._

```text
fastapi
uvicorn
```

```bash
#!/usr/bin/env nix-shell
#! nix-shell -i bash --pure
#! nix-shell -p bash python314
#! nix-shell -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/nixos-25.11.tar.gz

set -euo pipefail

VENV_DIR=".venv"

if [ ! -d "$VENV_DIR" ]; then
    python -m venv "$VENV_DIR"
fi
source "$VENV_DIR/bin/activate"
pip install -r requirements.txt

uvicorn main:app --host 127.0.0.1 --port 8000
```

_Código en el repo: [`posts/de-nix-shell-a-devenv/01-nix-shell-script`](https://github.com/sincorchetes/echemosunbitstazo.es-nix/tree/main/posts/de-nix-shell-a-devenv/01-nix-shell-script)._

Funciona, sí. Y es bastante mágico la primera vez que lo ves: ejecutas el script en una máquina virgen y se descarga todo, monta el `venv` y arranca la API. Pero seamos honestos, esto es **un script de bash con esteroides**: tú sigues siendo quien orquesta el `venv`, el `pip install` y el `uvicorn`. Y eso que aquí solo levantamos uno. Si tienes que apañarte así para un único `uvicorn`, imagínate el shell scripting que tendrías que añadir el día que metas un PostgreSQL y un Redis: `initdb`, `pg_ctl`, `trap`, `until`, esperas a que arranque, creación de usuarios, redis-server en background... y todo eso a mano dentro del script.

## 2. `mkShell` con `shellHook`

El siguiente nivel: un `shell.nix` que separa las dependencias del orquestador. Más limpio de leer, pero el problema de fondo sigue ahí.

```nix
let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-25.11";
  pkgs = import nixpkgs { config = {}; overlays = []; };
in
pkgs.mkShell {
  packages = with pkgs; [ python314 ];

  shellHook = ''
    if [ ! -d .venv ]; then
      python -m venv .venv
    fi
    source .venv/bin/activate
    pip install -r requirements.txt
    uvicorn main:app --host 127.0.0.1 --port 8000
  '';
}
```

_Código en el repo: [`posts/de-nix-shell-a-devenv/02-mkshell`](https://github.com/sincorchetes/echemosunbitstazo.es-nix/tree/main/posts/de-nix-shell-a-devenv/02-mkshell)._

Entras con `nix-shell` y tienes el entorno. Está mejor estructurado, pero el `shellHook` sigue siendo un `bash` disfrazado de Nix. Tú sigues siendo el responsable de montar el `venv` y refrescar el `pip install`. Y otra vez la misma pregunta: si para arrancar `uvicorn` ya estás escribiendo este `shellHook`, ¿qué pasa el día que añadas PostgreSQL y Redis? Pues que ese bloque se llena de `initdb`, `pg_ctl`, `trap` para parar bien al salir, `until` para esperar a que el puerto responda, `redis-server --daemonize yes`... y como abras dos terminales en el mismo proyecto, ese segundo `pg_ctl start` te va a saludar con un error precioso. ¿Y la reproducibilidad? Pues regulera, porque `fetchTarball` apunta a una rama, no a un commit fijo.

## 3. Flakes

Aquí ya entramos en lo serio. Un `flake.nix` te garantiza reproducibilidad **absoluta** porque el `flake.lock` congela el commit exacto de `nixpkgs`. Hoy, mañana y dentro de cinco años, el entorno es bit a bit el mismo.

```nix
{
  description = "Entorno reproducible con FastAPI";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [ pkgs.python314 ];

          shellHook = ''
            if [ ! -d .venv ]; then
              python -m venv .venv
            fi
            source .venv/bin/activate
            pip install -r requirements.txt
            uvicorn main:app --host 127.0.0.1 --port 8000
          '';
        };
      }
    );
}
```

_Código en el repo: [`posts/de-nix-shell-a-devenv/03-flake`](https://github.com/sincorchetes/echemosunbitstazo.es-nix/tree/main/posts/de-nix-shell-a-devenv/03-flake)._

Lo lanzas con `nix develop` y listo. Reproducibilidad clavada, pero... ¿ves el patrón? **Seguimos teniendo el mismo `shellHook` infame**. Hemos ganado en garantías, pero la parte tediosa sigue sin resolverse: cada servicio extra que quieras levantar (PostgreSQL, Redis, MinIO...) es otro bloque de bash que tú escribes, mantienes y depuras a mano dentro del `shellHook`.

_NOTA: Si necesitas levantar tres servicios, te toca escribir tres bloques de bash en el `shellHook`. Y rezar._

## 4. `devenv`: aquí es donde todo cuadra

Y ahora viene lo bueno. `devenv` se construye **por encima** de Nix y los flakes, y aporta dos cosas que cambian la película: **declaración de servicios** y **declaración de lenguajes**. En vez de escribir bash, declaras lo que quieres y `devenv` se encarga del resto.

Mira cómo queda exactamente el mismo entorno:

```nix
{ pkgs, lib, config, ... }:

{
  services.postgres = {
    enable = true;
    package = pkgs.postgresql_17;
    port = 5432;
    listen_addresses = "localhost";
    initialDatabases = [
      {
        "name" = "fastapi_db";
        "user" = "fastapi";
        "pass" = "fastapi_password";
      }
    ];
    initialScript = "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";";
  };

  languages.python = {
    enable = true;
    version = "3.14";
    venv = {
      enable = true;
      requirements = ./requirements.txt;
    };
  };

  packages = [
    pkgs.stdenv.cc.cc
  ];

  env = {
    LD_LIBRARY_PATH = "${pkgs.stdenv.cc.cc.lib}/lib";
    DATABASE_URL = "postgresql://fastapi:fastapi_password@localhost:5432/fastapi_db";
  };

  enterShell = ''
    echo "Comandos disponibles:"
    echo "  - start: Inicia el servidor FastAPI"
    echo "  - stop: Detiene el servidor FastAPI"
    echo "  - dbcon: Conecta a la base de datos"
  '';

  scripts = {
    start.exec = ''
      uvicorn main:app --host 127.0.0.1 --port 8000
    '';
    stop.exec = ''
      pkill -f "uvicorn main:app"
    '';
    dbcon.exec = ''
      psql $DATABASE_URL
    '';
  };

  dotenv.enable = true;
}
```

_Código en el repo: [`posts/de-nix-shell-a-devenv/04-devenv`](https://github.com/sincorchetes/echemosunbitstazo.es-nix/tree/main/posts/de-nix-shell-a-devenv/04-devenv)._

Y se acabó. Ni `initdb`, ni `pg_ctl`, ni `trap`, ni esperas con `until`. Lanzas `devenv up` y `devenv` te levanta PostgreSQL como un servicio gestionado por `process-compose`, con su `initdb` la primera vez, sus bases de datos creadas, su extensión `uuid-ossp` instalada y su parada limpia cuando cierras. Lanzas `devenv shell` y entras al entorno con el `venv` de Python ya montado, las dependencias del `requirements.txt` instaladas y las variables de entorno cargadas.

Y ojo a los detalles que añade casi gratis:

- `dotenv.enable = true` te carga el `.env` automáticamente.
- `languages.python.venv` te crea y mantiene el virtualenv sincronizado con tu `requirements.txt`.
- `scripts` te deja registrar comandos a medida (en el ejemplo, `start` y `stop` para arrancar y parar la API, y `dbcon` para abrir un `psql` contra la base de datos sin tener que recordar la cadena de conexión). Y con `enterShell` te muestra una chuleta al entrar a la shell para que no tengas que recordarlos.

### ¿Dónde queda el `PGDATA`?

A diferencia de los ejemplos anteriores, `devenv` no deja el cluster de PostgreSQL en la raíz del proyecto. Todo el estado vive bajo `.devenv/state/postgres/` (datos, configuración, logs y socket Unix incluidos). Como la ruta es relativamente corta, ni siquiera te peleas con el límite de 107 bytes del socket que sí afecta a los ejemplos anteriores.

Si quisieras forzarlo a otra ubicación, basta con añadir:

```nix
services.postgres.dataDir = "${config.env.DEVENV_ROOT}/.pgdata";
```

_NOTA: Si fijas una versión concreta con `languages.python.version`, `devenv` necesita el input [`nixpkgs-python`](https://github.com/cachix/nixpkgs-python). Lo añades una sola vez con:_

```bash
devenv inputs add nixpkgs-python github:cachix/nixpkgs-python --follows nixpkgs
```

### Comparativa rápida

| Aproximación | Reproducible | Servicios gestionados | Líneas de bash | Sufrimiento |
|---|---|---|---|---|
| `nix-shell` script | Más o menos | No | Muchas | Alto |
| `mkShell` + `shellHook` | Más o menos | No | Bastantes | Medio |
| Flakes | Sí | No | Las mismas | Medio |
| `devenv` | Sí | Sí | Cero | Ninguno |

## Conclusión

Nix te da las piezas para tener entornos limpios, pero tal cual, te obliga a hacer mucho del trabajo sucio a mano, sobre todo cuando aparecen demonios de por medio. `devenv` coge esas piezas, las pone juntas y te da una experiencia que recuerda a `docker-compose` pero **sin contenedores, sin demonios, sin imágenes de gigas y con reproducibilidad bit a bit**.

Si vienes de `docker-compose` y te da pereza la curva de Nix, créeme: empieza directamente por `devenv`. En el próximo post montaremos un proyecto real desde cero con `devenv init`, añadiremos un Redis, un proceso en segundo plano y veremos cómo se integra con CI. Hasta entonces, prueba a migrar uno de tus proyectos y cuéntame qué tal.
