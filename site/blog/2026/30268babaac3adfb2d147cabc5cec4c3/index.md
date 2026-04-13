---
uuid: 30268babaac3adfb2d147cabc5cec4c3
title: "Usa Nix en Debian, Ubuntu o Fedora y deja de sufrir"
slug: /posts/usa-nix-en-debian-ubuntu-o-fedora
date: 2026-04-13
authors:
  - sincorchetes
tags:
  - Linux
  - NixOS
  - DevOps
  - Debian
  - Ubuntu
  - Fedora
---

No necesitas instalar NixOS para aprovechar Nix. De hecho, puedes tener **tres distribuciones diferentes** para trabajar y mantener entornos de desarrollo idénticos en todas ellas. Sin Docker. Sin Ansible. Sin rezar para que funcione igual en producción. Hoy te cuento cómo montar Nix en Debian, Ubuntu y Fedora, y por qué esto te va a cambiar la forma de trabajar.

<!-- truncate -->

## ¿Por qué querría Nix si ya tengo apt o dnf?

Buena pregunta. A ver, `apt` y `dnf` hacen su trabajo. Pero tienen un problema de base: **son gestores de paquetes del sistema**. Cuando instalas algo, lo enchufas directamente en `/usr/bin`, `/usr/lib` y compañía. Si dos proyectos necesitan versiones distintas de Node, Python o lo que sea... bueno, ya sabes cómo acaba la cosa. Virtualenvs, nvm, contenedores para todo, y un `docker-compose.yml` que parece un testamento.

## Pero espera, ¿Qué es `/nix/store`?

Nix funciona diferente. En lugar de instalar paquetes en las rutas compartidas del sistema, cada paquete se almacena en `/nix/store`, un directorio especial que actúa como almacén centralizado de **todo** lo que Nix gestiona: binarios, librerías, configuraciones, dependencias. Cada elemento dentro del store tiene una ruta única generada a partir de un hash criptográfico que incluye el código fuente, las dependencias y las opciones de compilación. Algo así:

```
/nix/store/83vhly8yyqr4nlzjvdyjsghvrkfb7gzl-toilet-0.3/
/nix/store/b6zafi0xddw1s6nsx1gmsrxrw00yr8h6-nodejs-slim-20.20.2/
```

Ese hash garantiza que si cualquier cosa cambia (una dependencia, un flag de compilación, una versión), la ruta será diferente. Esto permite que convivan múltiples versiones del mismo software sin conflictos. Si necesitas Python 3.8 con NumPy 1.20 para un proyecto y Python 3.12 con NumPy 1.24 para otro, ambos viven en el store sin pisarse. Cada uno tiene su propia ruta, sus propias librerías, su propio mundo. No toca tu sistema. No contamina nada. Y lo mejor: **funciona igual en Debian, Ubuntu y Fedora**. Literalmente. El mismo comando, el mismo resultado, las mismas versiones.

Imagina que tienes un portátil con Fedora, un servidor con Debian y una VM con Ubuntu. Con Nix, los tres hablan el mismo idioma. Eso es lo que vamos a montar hoy.

## Instalando Nix

La instalación es idéntica en las tres distros. Un solo comando y ya está.

### Requisitos previos

Necesitas `curl` y permisos de `sudo`. En la mayoría de instalaciones ya los tienes, pero por si acaso:

**Debian/Ubuntu:**

```shell
❯ sudo apt update && sudo apt install -y curl
```

**Fedora:**

```shell
❯ sudo dnf install -y curl
```

### El instalador oficial

Nix ofrece dos modos de instalación: **single-user** y **multi-user**. Vamos directos al multi-user, que es el que nos interesa.

¿Por qué no single-user? Porque instala todo en tu `$HOME`, y si no lo gestionas bien acaba contaminando tu directorio personal con perfiles, enlaces y configuraciones que se mezclan con tus dotfiles. Está pensado para escenarios muy concretos: contenedores sin privilegios, entornos CI donde no tienes root, o pruebas rápidas donde no te importa limpiar después. Para trabajar en el día a día en tu máquina, ni lo contemples.

El modo multi-user crea un daemon del sistema, usuarios dedicados (`nixbld1`, `nixbld2`...) y gestiona todo bajo `/nix/store` de forma limpia, sin tocar tu home. Ejecuta esto:

```shell
❯ sh <(curl -L https://nixos.org/nix/install) --daemon
```

El script te pedirá confirmación antes de hacer cada paso. Léelo tranquilamente, no hay prisa. Cuando termine, cierra y vuelve a abrir la terminal para que se carguen las variables de entorno.

Comprobamos que funciona:

```shell
❯ nix --version
nix (Nix) 2.28.3
```

_NOTA: La versión puede variar. Lo importante es que responda sin errores._

### Habilitando flakes y nix-command

La experiencia moderna de Nix usa **flakes** y el comando `nix` (en lugar del antiguo `nix-env`). No vienen activados por defecto, así que los habilitamos:

```shell
❯ mkdir -p ~/.config/nix
❯ echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf
```

A partir de aquí, todo lo que hagamos funciona exactamente igual en Debian, Ubuntu y Fedora. Esa es la gracia.

## Tu primer entorno de desarrollo portable

Vamos a lo práctico. Imagina que necesitas trabajar en un proyecto con Node.js 20, Python 3.12 y jq. En lugar de instalar cada cosa con el gestor de paquetes de turno:

```shell
❯ nix shell nixpkgs#nodejs_20 nixpkgs#python312 nixpkgs#jq
```

Comprobamos:

```shell
❯ node --version
v20.20.2

❯ python3 --version
Python 3.12.11

❯ jq --version
jq-1.7.1
```

Los tres comandos están disponibles. Sales de la shell, desaparecen. Tu sistema sigue intacto.

## ¿Y si quiero probar software sin ensuciar mi sistema?

Esta es mi parte favorita. ¿Necesitas probar `wireshark` pero no quieres dejarlo instalado? ¿O una versión concreta de `terraform`?

```shell
❯ nix shell nixpkgs#wireshark
```

Úsalo. Cuando termines, cierra la shell. No queda rastro en tu sistema. Ni binarios sueltos, ni dependencias huérfanas, ni `apt autoremove` que ejecutar.

Y si quieres ejecutarlo directamente sin ni siquiera entrar en una shell:

```shell
❯ nix run nixpkgs#cowsay -- "Esto funciona en Debian, Ubuntu y Fedora"
 ___________________________________________
< Esto funciona en Debian, Ubuntu y Fedora >
 -------------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## Convivencia pacífica con apt y dnf

Un punto importante: **Nix no reemplaza tu gestor de paquetes**. Tu sistema sigue siendo Debian, Ubuntu o Fedora al 100%. Los paquetes de sistema, las actualizaciones de seguridad, el kernel... todo eso lo sigue gestionando `apt` o `dnf`.

Nix se ocupa del **entorno de desarrollo**. Conviven sin problemas porque Nix no toca `/usr`, no modifica librerías del sistema, no interfiere con nada. Vive en su `/nix/store` y punto.

La única excepción es el espacio en disco. El `/nix/store` puede crecer bastante si acumulas muchos entornos. Recuerda hacer limpieza de vez en cuando:

```shell
❯ nix-collect-garbage -d
```

## Desinstalando Nix

Si algún día decides que no es para ti, la desinstalación es limpia. El instalador multi-usuario crea un servicio systemd y unos usuarios de sistema. Para quitarlo todo:

```shell
❯ sudo systemctl stop nix-daemon.service
❯ sudo systemctl disable nix-daemon.service
❯ sudo rm -rf /nix /etc/nix ~/.config/nix ~/.nix-profile ~/.nix-defexpr ~/.nix-channels
❯ sudo userdel -r nixbld1  # Repetir para nixbld2, nixbld3... hasta nixbld32
❯ sudo groupdel nixbld
```

_NOTA: Si usaste el instalador oficial, revisa `/etc/bash.bashrc`, `/etc/zshrc` o `/etc/profile.d/` por si quedó alguna línea de configuración de Nix._

Y tu sistema vuelve a ser como antes. Sin rastro.

## Conclusión

Nix no es solo para NixOS. Es una herramienta que puedes usar **hoy** en tu Debian, Ubuntu o Fedora sin cambiar de distro, sin romper nada y sin complicaciones. Te da aislamiento real, versiones exactas y la tranquilidad de que lo que instalas no contamina tu sistema.

Pero esto es solo rascar la superficie. En el próximo artículo nos ponemos serios: **instalar NixOS desde cero con la ISO live**. Particionado, configuración declarativa, primer boot. Y a partir de ahí, seguiremos desgranando la maquinaria pesada de NixOS: `nix-shell`, flakes, devenv, y todo lo que hace que este ecosistema sea una bestia en entornos de desarrollo y producción. Esto no ha hecho más que empezar.

## Referencias

* [Nix ~ Instalación oficial](https://nixos.org/download/)
* [NixOS Wiki ~ Nix on non-NixOS](https://wiki.nixos.org/wiki/Nix_Installation_Guide)
* [Nixpkgs ~ Buscador de paquetes](https://search.nixos.org/packages)
