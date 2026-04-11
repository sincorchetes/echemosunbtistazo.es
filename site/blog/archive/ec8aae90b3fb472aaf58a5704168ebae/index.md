---
uuid: ec8aae90b3fb472aaf58a5704168ebae
title: "Como clonar discos duros en Linux usando Clonezilla"
slug: /posts/como-clonar-discos-duros-en-linux-usando-clonezilla
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
  - Sistemas
---
Clonezilla es un proyecto de software libre muy conocido entre otras funciones como herramienta de clonación de dispositivos de almacenamiento como discos duros, memorias USB entre otros.

<!-- truncate -->

Este proyecto distribuye dos tipos de versiones, una live que nos permite hacer una copia de seguridad o una restauración en menos que canta un gallo, pero para una máquina.

Mientras que la versión para servidor permite hacer clonación de hasta 40 máquinas a la vez.
Clonezilla cuenta con dos ramas de desarrollo, estable y de pruebas ambas cuentan con una imagen basada en Debian y otra en Ubuntu.

# Características
 * Soporta un gran número de sistemas de archivos como EXT[2-4], Reiser[FS-4], XFS, JFS, BTRFS, F2F2, NTFS, LVM2...
 * Incluye el gestor de arranque tanto para MBR como GPT
 * Soporta arranque por UEFI y también por red
 * Permite clonar todo el disco o por particiones
 * Se puede almacenar el contenido de un disco, o partición en ficheros .img
 * y mucho más...

# Lo malo
* El dispositivo de almacenamiento de origen tiene que tener el mismo espacio que el dispositivo destino
* No hay copia de seguridad incremental o diferencial (aún)
* No se puede clonar en caliente (aún)
* Y algunas cosas más que puedes ver en su página oficial.

# ¡Al lío!
En el siguiente vídeo vamos a ver como realizar la clonación completa de dos discos duros paso por paso.
<iframe width="800" height="600" src="https://www.youtube.com/embed/SX84NfXieXY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

# Recursos
* Clonezilla [Doc](https://www.clonezilla.org/clonezilla-live-doc.php?target=_blank)
* [Google](https://www.google.es?target=_blank)
* [TinyCore](https://distro.ibiblio.org/tinycorelinux?target=_blank)
