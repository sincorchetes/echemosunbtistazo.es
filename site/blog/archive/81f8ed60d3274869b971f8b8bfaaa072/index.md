---
uuid: 81f8ed60d3274869b971f8b8bfaaa072
title: "Como añadir RPM Fusion en Fedora"
slug: /posts/como-anadir-rpmfusion-en-fedora
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
El Proyecto Fedora hace uso de una filosofía en la que pretende fomentar lo máximo que pueda el software libre y de _open source_ ya que si no lo hacen de esta manera, fomentarían el uso de lo privativo en primer lugar dejando a lo libre relegado porque tendería a ir conocíendose menos. Por ende es normal que no encontremos drivers de caracter privativo, códecs multimedia, virtualizadores del tipo VirtualBox...etc.

<!-- truncate -->

# ¿Cómo remediarlo?
RPM Fusion es un conjunto de 2 repositorios creado por voluntari@s que crearon en su día otros repositorios como Dribble, Freshrpms, Livna... para proveer de software que no se encuentren en los repositorios oficiales de Fedora, RHEL o CentOS.

Uno de ellos llamado "_free_", provee software libre o de _open source_ como es el caso de VirtualBox licenciado bajo GPLv2 o GPLv2 con CDDL.

Y otro se llama "_non-free_", este difunde software restrictivo a términos de licencias, pueden contener Copyright como los drivers de NVIDIA.

_**NOTA: No es obligatorio tener ambos repositorios, se pueden utilizar uno independientemente del otro**_

# Instalación
Simplemente abrimos una terminal y ejecutamos el siguiente comando.

Habilitando repositorio RPM Fusion Free
```
sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm 
```
Habilitando repositorio RPM Fusion Non-free
```
https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```
Habilitando ambos repositorios
```
sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

Actualizando el caché de DNF
```
sudo dnf check-update
```
Visualizar todos los paquetes disponibles del repositorio _Free_.
```
dnf list |grep rpmfusion
```
Visualizar todos los paquetes disponibles del repositorio _Non-free_.
```
dnf list |grep rpmfusion
```

<script src="https://asciinema.org/a/7i9hS8mLkkAyFyVuXZzWaEciY.js" id="asciicast-7i9hS8mLkkAyFyVuXZzWaEciY" async></script>

# Referencias
* RPMFusion.org
