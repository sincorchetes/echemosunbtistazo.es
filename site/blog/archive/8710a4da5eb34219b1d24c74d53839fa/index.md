---
uuid: 8710a4da5eb34219b1d24c74d53839fa
title: "¿Cómo gestionar software en Linux?"
slug: /posts/como-gestionar-software-en-linux
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
Hoy en día, la forma en la que se desarrolla y se distribuye el software ha aumentado y cambiado tanto que alcanza ritmos realmente vertiginosos. Esto ha supuesto una modernización en cuanto al mantenimiento del mismo en todas las distribuciones de GNU/Linux y otros sistemas UNIX-like tipo FreeBSD. 

<!-- truncate -->

Cuentan las malas lenguas hace muchos muchos años, sobre todo en los comienzos de las primeras distribuciones de Linux  en los 90's que para instalar un software teníamos que tener el código fuente y someterlo a un proceso de compilación por el cuál, había que esperar a que saliera bien para que este se incorporáse a nuestro sistema. Eso, o tener el software ya previamente pre-compilado y adherirlo al sistema y esperar a que también funcionase. 

Este proceso tan engorroso fue clave para que se desarrollasen mecanismos alternativos al viejo `make install clean` que permitiesen gestionar software de una forma más cómoda y rápida gracias a la llegada de los gestores de paquetes.

Un gestor de paquetes, es un programa o un conjunto de herramientas que permiten el mantenimiento y gestión del software que se encuentra en nuestro sistema como la instalación, eliminación, comprobación e incluso, búsqueda de software adicional que esté debidamente empaquetado. Este software que se administra a través de un gestor de paquetes es un archivo comprimido con una extensión específica y una serie de archivos y directorios específicos aparte del software ya pre-compilado, que ayudan a identificar al gestor de paquetes qué es lo que se va a instalar/eliminar en el sistema.

Gracias a estos gestores podemos trabajar con paquetes y mantener así una mayor integridad en todo el sistema ya que al registrar todos los programas, scripts... que instalemos, podemos actualizarlos o eliminarlos sin tener que buscar los directorios o ejecutables uno a uno. Utilizando el método tradicional, no sabríamos qué software tendríamos instalado a menos que indaguemos o efectuemos la instalación de forma manual y nos acordemos.

Sin embargo, los gestores de paquetes que se desarrollaron en un principio como es el caso de `dpkg(8)` por parte de la rama de Debian, ó `rpm (8)` por parte del mundo de Red Hat, no facilitaban tareas como la resolución de dependencias, algo clave y muy sustancial porque, permite ahorrar hasta un 99% cuando se quería instalar multitud de paquetes que requerían de dependencias que no estuvieran instaladas en el sistema. Para ello se elaboraron los gestores de paquetes de alto nivel. Éstos contienen una flexibilidad enorme y le sacan el potencial oculto a los gestores de paquetes de bajo nivel como es el caso de `rpm (8)` y `dpkg(8)`. También permiten buscar dependencias de cualquier paquete que se desee instalar, siempre y cuando los encuentre en los servidores que distribuyan los paquetes, los cuáles reciben el nombre de repositorios. 

Estos son algunos nombres de gestores de paquetes de alto nivel: 
 * `zypper(8)` utilizado por openSUSE
 * `pacman(8)` desarrollado por Archlinux
 * `emerge(8)` elaborado por el equipo de Gentoo
 * `dnf(8)` programado por la comunidad de Fedora
 * `apt*(8)`  desarrollado por la comunidad de Debian
 * `aptitude(8)` también elaborado por la comunidad de Debian
 * `yum(8)` antecesor de DNF
 * `pkg(8)` programado por la comunidad de FreeBSD
 * `pkg_add(8)` elaborado por el equipo de NetBSD (la parte binaria)

No obstante, a pesar de ser una evolución y un gran avance a genera una serie de problemas como la incompatibilidad entre sistemas de paquetería y/o posible solapación entre unos y otros ya que el "mercado" intenta simplificar a menudo que software mantener para según que distribución. Para ello se desarrollaron los famosos .exe de Windows para Linux con sistemas como [Snap](https://snapcraft.io?target=_blank) por parte de Canonical, [Flatpak](https://flatpak.org?target=_blank) por parte del ecosistema de Redhat o [AppImage](https://appimage.org?target=_blank) impulsada por entusiastas independientes del software libre y open source.
Estos sacrifican el uso de librerías compartidas, que es una de las características más importantes que tiene Linux o los sistemas UNIX-like ya que permiten ahorrar mucho espacio en disco al reutilizarse las librerías, por tener mayor disponibilidad del software independientemente de la distribución que se utilice.

Como vemos tenemos varias formas de gestionar software en nuestro sistema:
 * Compilando el código fuente e instalándolo/desinstalándolo manualmente
 * Utilizar un gestor de paquetes que permita facilitar la instalación y/o eliminación del software del sistema
 * Haciendo uso de métodos alternativos a los gestores de paquetes como Snap, Flatpak, AppImage.

#Recursos
  * LPIC-I, Ediciones Eni
  * manpages `yum(8)`, `dnf(8)`, `rpm(8)`, `dpkg(8)`
  * Flatpack
  * Snap
  * AppImage
