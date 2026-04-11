---
uuid: a1ea6b849f168ab3b707adb0b8ee3db9
title: "Mi primera contribución a nixpkgs"
slug: /posts/mi-primera-contribucion-a-nixpkgs
date: 2026-03-20
authors:
  - sincorchetes
tags:
  - Linux
  - NixOS
  - DevOps
---
¿Te ha pasado que un error en la terminal te persigue como una sombra? Ese era mi caso con `google-cloud-sdk` en NixOS. Cada vez que abría una nueva shell, ahí estaba: un molesto error de `readlink` ensuciando el inicio. Podría haberlo ignorado un año más, pero llegó un punto en el que la fricción técnica superó la paciencia. Decidí que, en lugar de quejarme, iba a ser yo quien lo arreglara en el upstream.

<!-- truncate -->

## El problema

Cuando instalas `google-cloud-sdk` a través de nixpkgs, el script de inicialización de la shell ejecuta unas llamadas a `readlink` para resolver la ruta del SDK. El problema es que en el entorno Nix, estas llamadas generan errores por stderr porque las rutas simbólicas no se resuelven como el script espera. El resultado: cada vez que abres una terminal, te saluda un bonito error que ensucia la salida.

No es un error fatal, no rompe nada, pero es como ese grifo que gotea en casa. Al principio lo ignoras, luego te acostumbras, y al final un día te levantas y dices: "Hoy se arregla esto".

## El reto

En Nix, los paquetes se construyen mediante derivaciones, y los binarios suelen ser envueltos por `wrapProgram` que renombra el binario original (en este caso `gcloud` pasa a ser `.gcloud-wrapped`). Esto significa que hay que parchear el script de origen **antes** de que `wrapProgram` haga su magia y renombre los binarios.

La clave estaba en usar `substituteInPlace` en el momento justo del proceso de build.

## La solución

Tras sumergirme en el código de la derivación en nixpkgs, implementé un `substituteInPlace` que ataca dos frentes:

**Silencio administrativo**: Redirección de stderr a `/dev/null` en las llamadas de `readlink` que generaban ruido innecesario.

**Robustez en rutas**: Sustitución de la lógica de `CLOUDSDK_ROOT_DIR` por un `realpath` más sólido basado en `dirname "$0"`.

El parche en `pkgs/by-name/go/google-cloud-sdk/package.nix` quedó así:

```nix
    # Resolve readlink noise in shell initialization
    # We patch the source script before wrapProgram renames it.
    # This ensures that the resulting .gcloud-wrapped binary contains the fix.
    substituteInPlace "$out/google-cloud-sdk/bin/gcloud" \
      --replace-fail 'while _cloudsdk_link=$(readlink "$_cloudsdk_path")' 'while _cloudsdk_link=$(readlink "$_cloudsdk_path" 2>/dev/null)' \
      --replace-fail 'CLOUDSDK_ROOT_DIR=$(_cloudsdk_root_dir "$0")' 'CLOUDSDK_ROOT_DIR=$(realpath "$(dirname "$0")/..")'
```

Sencillo, limpio, y sin romper la lógica existente.

## El resultado

Mi primer commit fusionado en el repositorio de NixOS/nixpkgs. Una terminal limpia, una contribución a la comunidad y la satisfacción de saber que ese error ya no molestará a nadie más (ni a mí).

NixOS puede tener una curva de aprendizaje pronunciada, pero la capacidad de "meterle mano" a cualquier paquete y ver tu cambio en producción en el repositorio estándar de la comunidad es, sencillamente, otro cantar.

## Referencias

* [Commit 667cd10 en nixpkgs](https://github.com/NixOS/nixpkgs/commit/667cd1065ddfcacd605d2b268db7ad036b9eb0c7)
* [NixOS/nixpkgs](https://github.com/NixOS/nixpkgs)
