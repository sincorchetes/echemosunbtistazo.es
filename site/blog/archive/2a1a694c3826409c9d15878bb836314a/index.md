---
uuid: 2a1a694c3826409c9d15878bb836314a
title: "No podemos montar My Passport WD en Linux"
slug: /posts/mypassport-wd-soporte-linux
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
Nos dejaron un disco duro My Passport [WD](https://goo.gl/xSENFj?target=_blank) para pasarle unos archivos con la grata sorpresa de toparnos con un fallo de montaje porque no reconoce el dispositivo, y cómo lo hemos solucionado, vamos a publicar cómo arreglarlo para salir del paso.

<!-- truncate -->

![](wd.jpg?cropResize=400,533 "Western Digital My Passport")


# ¿Por qué no nos reconoce el sistema de archivos?

Parece que los Western Digital My Passport, vienen con un formato llamado exFAT, que es un formato desarrollado por Microsoft que mejora el rendimiento de unidades flash (_estándar para memorias SDXC_)o cuando NTFS no es factible por la sobrecarga de entradas de registro de archivos. También nace como alternativa al viejo FAT(32). Al parecer hay distribuciones como Fedora que no incorporan por defecto el driver para poder leer este tipo de sistema de ficheros.

# ¿Cómo podemos solucionarlo?

Tan solo bastaría con instalar el paquete `exfat-tools` y `fuse-exfat` para poderlo montar.

## Fedora
En Fedora solo tenemos que ejecutar:
```
$ su -c "dnf install fuse-exfat exfat-tools"
```
Y listo, enchufamos el dispositivo y tendremos acceso a los datos.

## Debian, Ubuntu...
Para Ubuntu, Debian y derivadas, bastará con instalar:
```
$ sudo apt-get install exfat-fuse exfat-utils
```

## CentOS, RHEL
En CentOS y RHEL es un poco más compleja su instalación ya que no se encuentran los paquetes de forma oficial y hay que, o bien compilar el código fuente, o bien hacer uso de un repositorio `yum(8)` a terceros. Nosotros os dejaremos la instalación con el repo de YUM, pero también al final, mencionaremos la compilación del código fuente.

### CentOS
La diferencia entre CentOS y RHEL, es que RHEL al ser corporativo no añade todos los paquetes comunitarios como tiene CentOS, además de obtener más rápidamente actualizaciones de seguridad siempre que dispongamos de licencia.

```
# yum -y install epel-release && rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
# rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
```
Añadimos `includepkgs=exfat-utils fuse-exfat` en el archivo `/etc/yum.repos.d/nux-desktop.repo` justo debajo de `protect=0` en el apartado `[nux-desktop]` tal que así:
```
[nux-dextop]
name=Nux.Ro RPMs for general desktop use
baseurl=http://li.nux.ro/download/nux/dextop/el7/$basearch/ http://mirror.li.nux.ro/li.nux.ro/nux/dextop/el7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-nux.ro
protect=0
includepkgs=exfat-utils fuse-exfat
```

Instalamos los paquetes mediante `yum(8)`:
```
$ su -c "yum install exfat-utils fuse-utils"
```
Bastará con que conectemos el disco duro para que monte.

### RHEL
La diferencia con los pasos anteriores, es que el paquete epel-relese que contiene la información del repositorio EPEL de Fedora no está incluido en sus repositorios, por lo tanto hay que instalarlo:
```
# rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```
El resto de pasos es el mismo.

## Archlinux
En Archlinux, al parecer compilaron el git y generaron solo un paquete.
```
$ sudo pacman -S exfat-utils
```

## openSUSE Leap y Tumbleweed
Parecido a Fedora
```
$ sudo zypper in exfat-utils fuse-exfat
```

## Gentoo
```
# emerge -av exfat-utils fuse-exfat
```

## Código fuente

1. Obtenemos el código fuente desde [aquí](https://github.com/relan/exfat/archive/master.zip)
2. Extramos el código
3. Configuramos e instalamos (Se nos pedirá autoreconf como dependencia para compilar, que se encuentra en tarball autoconf, automake y el paquete de desarrollo de FUSE)
```
$ autoreconf --install
$ ./configure --prefix=/usr
$ make install clean
```

NOTA: Si compilamos en otro directorio que no se encuentre añadido a la variable PATH de `/etc/profile.d/` o `.bash_profile`. Tendremos que añadirlo.

4. Vemos la versión
```
$ mount.exfat-fuse
FUSE exfat 1.2.8
Usage: ./mount.exfat-fuse [-d] [-o options] [-V] <device> <dir>
```

# Montando desde CLI 
Si queremos utilizar la terminal bastará con ejecutar:
```
$ sudo mount.exfat-fuse /dev/sdX /directorio_a_montar
```

# Referencias
* Google 
* exFAT ~ Repositorio [git](https://github.com/relan/exfat?target=_blank)
* exFAT ~ [Wikipedia](https://es.wikipedia.org/wiki/ExFAT?target=blank_)
* AskUbuntu ~ Unable [to...](https://askubuntu.com/questions/790837/unable-to-mount-my-wd-my-passport-1-tb-in-ubuntu-16-04?target)
