---
uuid: c54e51a77e594bd69b03623eab21347c
title: "Instalando Gentoo con LVM,LUKS y SELinux"
slug: /posts/instalando-gentoo-con-lvm-luks-y-selinux
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
Hemos hablado una vez de Gentoo en un <a href="https://echemosunbitstazo.es/blog/que-es-gentoo-linux" target="blank">post anterior</a>, por lo que voy a ir más al grano en este post sobre cómo lo he conseguido instalar y cómo ayudarte si tienes dudas haciéndolo. Te recomiendo que si no tienes una pantalla dónde puedas consultar la información de este post, que utilices un medio live que te permita interactuar con todos estos pasos, porque es muy importante que no te pierdas al llevar a cabo este post. También es importante **TENER TIEMPO** para hacer esta instalación y no esperes que este proceso se hace en un par de horas. Se compilará mucho código fuente y este proceso **ES COSTOSO** en todos sus aspectos, por lo que te recomiendo **QUE NO HAGAS** muchas compilaciones a la vez.

<!-- truncate -->

# Consideraciones
* Configurar la BIOS de tu equipo para que **arranque en modo UEFI y sin tener activado el secure boot**.
* Tener mucho** tiempo libre** y **pensar las cosas antes de ejecutarlas**
* Tener un tazón y una cafetera **enorme de café al lado.**
* Tener un buen respaldo en la silla y tiene que ser cómodo, nada de taburetes de 100 montaditos

# Hardware que utilicé

Estas son algunas de las especificaciones de Hardware con los que hice la instalación:
* BIOS configurada para arrancar con UEFI sin secure boot.
* Modelo: Portátil <a href="https://www.gigabyte.com/Laptop/Sabre-15#kf" target="blank">Gigabyte Sabre 15</a>
* Procesador: <a href="https://ark.intel.com/content/www/us/en/ark/products/97185/intel-core-i7-7700hq-processor-6m-cache-up-to-3-80-ghz.html" target="blank"> Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz</a>
* Memoria RAM: <a href="https://www.pccomponentes.com/kingston-342b803-so-dimm-ddr4-2400-pc4-19200-8gb-cl17" target="blank">Kingston 8GB 64 bits 2400MHz</a>
* Disco NVME: <a href="https://www.amazon.com/Black-256GB-Performance-SSD-WDS256G1X0C/dp/B01MS6BYJD" target="blank">Western Digital Black HD 2018 256GB</a>
* Audio integrado: <a href="https://ark.intel.com/content/www/us/en/ark/products/98087/mobile-intel-cm238-chipset.html" target="blank"> Intel CM238 HD Audio Controller</a>
* Gráfica integrada: <a href="https://www.intel.es/content/www/es/es/support/products/98909/graphics/graphics-for-7th-generation-intel-processors/intel-hd-graphics-630.html" target="blank"> Intel HD Graphics 630</a>
* Gráfica dedicada: <a href="https://www.nvidia.com/en-sg/geforce/products/10series/geforce-gtx-1050/" target="blank">NVIDIA GP107M GeForce GTX 1050 Mobile</a>
* Audio dedicado: <a href="https://h-node.org/soundcards/view/en/2159/NVIDIA-Corporation-GP107GL-High-Definition-Audio-Controller--rev-a1-" target="blank">NVIDIA GP107GL High Definition Audio Controller</a>
* USB con **espacio mínimo de 4GB**

# Creando un live
En mi caso, como prefiero ver vídeos, distraerme y ver la documentación bien y de forma clara, prefiero realizar este proceso desde una imagen live con un entorno de escritorio como es Calculate Linux antes de utilizar la imagen que Gentoo libera para la instalación que es todo en terminal. No obstante, si quieres, puedes utilizar los siguientes comandos que utilicé para generar el pendrive con Calculate Linux para crearte tu pendrive con la imagen de <a href="https://www.gentoo.org/downloads/" target="blank">Gentoo</a>.

Siguiendo la documentación de Calculate Linux, insertamos el USB. Ejecutamos `dmesg` veremos cuál es el pendrive reconocido en el sistema:
```
$ dmesg
[ 6451.987041] usb 1-11: new high-speed USB device number 6 using xhci_hcd
[ 6452.167412] usb 1-11: New USB device found, idVendor=0951, idProduct=1666, bcdDevice= 1.00
[ 6452.167417] usb 1-11: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[ 6452.167421] usb 1-11: Product: DataTraveler 3.0
[ 6452.167424] usb 1-11: Manufacturer: Kingston
[ 6452.167426] usb 1-11: SerialNumber: 002618A369C3B1A0B7AC022F
[ 6452.168867] usb-storage 1-11:1.0: USB Mass Storage device detected
[ 6452.169331] scsi host3: usb-storage 1-11:1.0
[ 6453.203673] scsi 3:0:0:0: Direct-Access     Kingston DataTraveler 3.0 PMAP PQ: 0 ANSI: 6
[ 6453.204285] sd 3:0:0:0: Attached scsi generic sg1 type 0
[ 6453.204565] sd 3:0:0:0: [sdb] 121110528 512-byte logical blocks: (62.0 GB/57.8 GiB)
[ 6453.205397] sd 3:0:0:0: [sdb] Write Protect is off
[ 6453.205403] sd 3:0:0:0: [sdb] Mode Sense: 2b 00 00 08
[ 6453.206361] sd 3:0:0:0: [sdb] Write cache: disabled, read cache: enabled, doesn't support DPO or FUA
[ 6453.241654]  sdb: sdb1 sdb2
[ 6453.244855] sd 3:0:0:0: [sdb] Attached SCSI removable disk
```

En mi caso, es el `/dev/sdb`, el cuál usaré de ejemplo.

1. Descargamos una imagen de <a href="https://wiki.calculate-linux.org/desktop" target="blank">Calculate Linux</a>
2. Comprobamos que la suma de verificación para evitar que la imagen esté corrupta, el enlace para comprobar en MD5 o en SHA1 está justo al lado del enlace de descarga:

<img src="https://echemosunbitstazo.es/user/pages/01.blog/instalando-gentoo-con-lvm-luks-y-selinux/sha1.png" class="img-fluid">

En mi caso, utilicé la imagen de Calculate Linux MATE 64 bits y con SHA1:
```
84ffa7fbce9c557b810f6204dd3e75b153aa5bf2  cldm-20-x86_64.iso
```
Comprobamos que sea el mismo hash:
```
$ sha1sum cldm-20-x86_64.iso
84ffa7fbce9c557b810f6204dd3e75b153aa5bf2
```
Está perfecta, y no está corrupta.

Generamos el pendrive live como dice la <a href="https://wiki.calculate-linux.org/create_a_bootable_usb_flash_drive" target="blank">documentación</a>:
```
# dd if=IMAGEN_CALCULATE.iso of=/dev/sdN
```
  * `dd` es un comando que permite copiar tal cual un archivo, y tiene múltiples usos entre ellos hacer imágenes live.
  * `if` ruta del archivo fuente
  * `IMAGEN_CALCULATE` nombre de la imagen
  * `/dev/sdN` el archivo dispositivo de bloques detectado por el SO
  * `of` ruta del archivo destino, no olvidemos que aunque hemos conectado un pendrive, este en Linux es un dispositivo de bloques y queda reflejado como si fuera un archivo.

En mi caso:
```
# dd if=cldm-20-x86_64.iso of=/dev/sdb
```
Reiniciamos el ordenador y **arrancamos el SO del pendrive**. Esperamos a que cargue el entorno de escritorio y estará la primera parte hecha.

# Particionando
Particionamos el dispositivo, en mi caso es un SSD NVME que tiene otro conector diferente y el núcleo de Linux lo llama como `/dev/nvme0n1`.

Definimos el siguiente esquema de particionamiento:

| Partición | Pto montaje | Formato | Nombre | Tamaño | Bandera |
|-----|------|-----|----|---|--|
| `/dev/nvme0n1p1` | `X` | FAT32 | grub | 2MB | `bios_grub` |
| `/dev/nvme0n1p2` | `/boot` | ext4 | boot | 512MB | `X` |
| `/dev/nvme0n1p3` | `/boot/efi` | FAT32 | efi | 128MB | `boot, esp` |
| `/dev/nvme0n1p4` | `*` | LVM | rootfs | * | `lvm` |

__NOTA__: Si tienes un disco `sda|sdb|sdc`... adáptalo como gustes.

Dentro del LVM, crearemos un grupo de volúmenes llamado `gentoo`, y dentro de él, crearemos un volúmen lógico para la swap, y le definiré un tamaño de 8GB porque suelo tirar mucho de ella, y crearemos otro volúmen lógico para root utilizando el resto de espacio libre.

__NOTA__: El primer * es un grupo de volúmen que haremos más adelante, y el segundo, todo el espacio libre restante.

Abrimos una consola, escalamos privilegios para tener acceso como root:
```
# parted -a optimal /dev/sdN
GNU Parted 3.2
Using /dev/sdN
Welcome to GNU Parted! Type 'help' to view a list of commands.
```

Creamos el esquema de particionamiento
```
(parted) mklabel
(parted) unit mib
(parted) mkpart primary 1 3
(parted) name 1 grub
(parted) set 1 bios_grub on
(parted) mkpart primary 3 512
(parted) name 2 boot
(parted) mkpart primary 512 640
(parted) name 3 efi
(parted) set 3 boot on
(parted) mkpart primary 640 -1
(parted) name 4 rootfs
(parted) quit
```

Ya tendremos nuestro esquema listo, ahora toca darle formato.

Creamos las particiones EXT4 y FAT32 para la partición EFI
```
# mkfs.ext4 /dev/nvme0n1p2
# mkfs.fat  -F 32 /dev/nvme0n1p3
```
Creamos la partición cifrada:
```
# cryptsetup luksFormat /dev/nvme0n1p3
```
Confirmamos en mayúsculas que si queremos `(YES)`.

Descriframos la partición cifrada:
```
# cryptsetup luksOpen /dev/nvme0n1p3 world
```
Creamos el volúmen físico:
```
# pvcreate /dev/mapper/world
```
Creamos el grupo de volúmen:
```
# vgcreate gentoo /dev/mapper/world
```
Creamos los volúmenes lógicos:
```
# lvcreate -L 8G -n swap gentoo
# lvcreate -l100%FREE -n root gentoo
```
Formateamos los volúmenes lógicos:
```
# mkfs.ext4 /dev/mapper/gentoo-root
# mkswap /dev/mapper/gentoo-swap
```
Activamos la swap:
```
# swapon /dev/mapper/gentoo-swap
```
Creamos el directorio `/mnt/gentoo`:
```
# mkdir /mnt/gentoo
```
Montamos la partición raíz:
```
# mount /dev/mapper/gentoo-root /mnt/gentoo
```
Creamos la partición `/boot` y `/boot/efi`:
```
# mkdir /mnt/gentoo/boot
# mount /dev/nvme0n1p2 /boot
# mkdir /mnt/gentoo/boot/efi
# mount /dev/nvme0n1p3 /boot/efi
```
Hemos terminado el particionamiento, el formato y el montaje de los sistemas de archivos que hemos formateado.

# Descargando e instalando el stage3
El stage3 es un **conjunto de librerías y binarios precompilados** por el grupo de desarrollo de Gentoo que está casi listo para utilizar. El stage2 y stage1 son para personas que quieren armarse Gentoo casi desde 0, no es recomendado hasta que lleves **una cierta soltura** con el sistema. Además, hay un stage4 que es un nivel más arriba de abstracción pero que nunca he probado. 

Descargamos el stage3 de Gentoo `hardened+selinux` desde este <a href="https://ftp-stud.hs-esslingen.de/pub/Mirrors/gentoo/releases/amd64/autobuilds/current-stage3-amd64-hardened-selinux/" target="blank">espejo mismo</a>.  Si no va bien, hay una amplia lista de espejos que tiene Gentoo disponibles para probar.

<img src="https://echemosunbitstazo.es/user/pages/01.blog/instalando-gentoo-con-lvm-luks-y-selinux/stage3-files.png" class="img-fluid">

Descargamos los archivos `.tar.xz` y `.DIGESTS` con `wget` situados en el directorio `/mnt/gentoo`
```
# cd /mnt/gentoo
# wget https://ftp-stud.hs-esslingen.de/pub/Mirrors/gentoo/releases/amd64/autobuilds/current-stage3-amd64-hardened-selinux/stage3-amd64-hardened-selinux-20200422T214502Z.tar.xz
# wget https://ftp-stud.hs-esslingen.de/pub/Mirrors/gentoo/releases/amd64/autobuilds/current-stage3-amd64-hardened-selinux/stage3-amd64-hardened-selinux-20200422T214502Z.tar.xz.DIGESTS
```
Nos fijamos en la suma de verificación SHA512 del stage3 en el `.DIGESTS`:
```
# cat stage3-amd64-hardened-selinux-20200422T214502Z.tar.xz.DIGESTS
# SHA512 HASH
0ac73366478b4c0ac2f35b1f19a64e8041f666a9f9afd2a67691f77e9ab67d6a8f672d740b2faeb8851c4095e54cdb04f3d6e08a262ce5135840db5ac5bf0181  stage3-amd64-hardened-selinux+nomultilib-20200422T214502Z.tar.xz
```
Comprobamos que es la misma que el stage3:
```
# sha512sum stage3-amd64-hardened-selinux-20200422T214502Z.tar.xz
```
Si es correcta, descomprimimos el tarball
```
# tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner --selinux --acls
```

# Configuraciones iniciales
Editamos el archivo `/mnt/gentoo/etc/portage/make.conf`

__NOTA__: En este archivo se define **todo lo que tenga que ver con la compilación** de los paquetes del sistema entre otras cosas.

## Añadiendo optimización en la compilación
Y en la variables `CFLAGS` añadimos el parámetro `-march=native`. Este parámetro tomará de forma **automática todas las instrucciones de tu procesador** y lo compilará solo y exclusivamente para que esté soportado por él. Si tienes intención de portal el software a otras tipos de CPU, entonces no lo pongas.

__NOTA__: Las `CFLAGS` y otras variables permiten pasar una serie de instrucciones al compilador para que el código compilado en C y C++ **sea más óptimo y reducido** (o por lo menos eso es lo que se busca). Puedes leer más información en la <a href="https://wiki.gentoo.org/wiki/GCC_optimization/es" target="blank">documentación de Gentoo.</a>

Y lo dejamos así por el momento, si en el futuro quieres añadir más parámetros o modificadores en el comportamiento de la compilación de los programas lo dejo a libre elección.

```
 These settings were set by the catalyst build script that automatically
# built this stage.
# Please consult /usr/share/portage/config/make.conf.example for a more
# detailed example.
COMMON_FLAGS="-march=native -O2 -pipe"
CFLAGS="${COMMON_FLAGS}"
CXXFLAGS="${COMMON_FLAGS}"
FCFLAGS="${COMMON_FLAGS}"
FFLAGS="${COMMON_FLAGS}"
```
## Añadiendo los mirrors
Creamos una variable llamada `GENTOO_MIRRORS="https://ftp.fau.de/gentoo"` y añadimos este mirror, si quieres otro puedes añadirlo también consultando la lista de espejos <a href="https://www.gentoo.org/downloads/mirrors/" target="blank">aquí</a> y seguidos de un espacio.

```
# echo 'GENTOO_MIRRORS="https://ftp.fau.de/gentoo"' >> /etc/portage/make.conf
```

## Añadiendo soporte multihilo
Añadimos otra variable que se llama `MAKEOPTS="-jN"`, dónde N equivale al número de CPUS que tienes + 1. Por ejemplo, en mi caso tengo 8, pues le asigno `MAKEOPTS="-j9"`. ¿Cómo puedes ver la cantidad de CPU (CPU e hilos) que tienes? con el comando `lscpu`:

```
$ lscpu
Architecture:                    x86_64
CPU op-mode(s):                  32-bit, 64-bit
Byte Order:                      Little Endian
Address sizes:                   39 bits physical, 48 bits virtual
CPU(s):                          8******
```

El valor mostrado en el apartado CPU(s), es el que cuenta.

## Configurando el repositorio de Gentoo
Creamos directorios necesarios para portage:
```
# mkdir --parents /mnt/gentoo/etc/portage/repos.conf
```
Creamos este archivo `/mnt/gentoo/etc/portage/repos.conf/gentoo.conf` y le añadimos:
```
[DEFAULT]
main-repo = gentoo
 
[gentoo]
location = /var/db/repos/gentoo
sync-type = rsync
sync-uri = rsync://rsync.gentoo.org/gentoo-portage
auto-sync = yes
sync-rsync-verify-jobs = 1
sync-rsync-verify-metamanifest = yes
sync-rsync-verify-max-age = 24
sync-openpgp-key-path = /usr/share/openpgp-keys/gentoo-release.asc
sync-openpgp-key-refresh-retry-count = 40
sync-openpgp-key-refresh-retry-overall-timeout = 1200
sync-openpgp-key-refresh-retry-delay-exp-base = 2
sync-openpgp-key-refresh-retry-delay-max = 60
sync-openpgp-key-refresh-retry-delay-mult = 4
```
## Copiando los DNS a lo que será nuestro SO
Copiamos la información de los DNS
```
# cp --dereference /etc/resolv.conf /mnt/gentoo/etc/
```
# Pasos previos a la instalación
Estos pasos son necesarios para poder continuar, hay que asegurarse de que todo está correctamente.

## Montando los pseudos sistemas de archivos
Montamos los pseudosistemas de archivos necesarios para poder hacer un chroot:
```
root #mount --types proc /proc /mnt/gentoo/proc
root #mount --rbind /sys /mnt/gentoo/sys
root #mount --rbind /dev /mnt/gentoo/dev
```
__NOTA__: Estamos haciendo una "redirección" de estos pseudo sistemas de archivos para que podamos ejecutar comandos que interactúen con el hardware de nuestro equipo. 

__NOTA__: Si haces la **instalación con algún live que _use systemd_**, tienes que ejecutar estos comandos adicionales, si no, ignora este paso:
```
# mount --make-rslave /mnt/gentoo/sys
# mount --make-rslave /mnt/gentoo/dev
```
__NOTA__: **Si no utilizas el live de instalación de Gentoo** como yo usando Calculate Linux, ejecuta los siguientes comandos como dice la documentación, de lo contrario omite este paso:
```
# test -L /dev/shm && rm /dev/shm && mkdir /dev/shm
# mount --types tmpfs --options nosuid,nodev,noexec shm /dev/shm
# chmod 1777 /
```
# Accediendo a nuestro futuro sistema
El `chroot` permite "aislar" el sistema que vamos configurar del actual evitando accidentes, por lo que habrán variables, comandos y directorios que no existan, y lo que era `/mnt/gentoo` se volverà `/`. ¡Cuidado con no confundirse dónde estás trabajando!
```
# chroot /mnt/gentoo /bin/bash
# source /etc/profile
# export PS1="(chroot) ${PS1}"
```

__NOTA__: Ejecutamos un `mount` y tenemos que ver que las particiones `/boot`, `/boot/efi` se encuentren montadas, si no habrá que salir del `chroot` y montarlas de nuevo como en comento en los primeros pasos.

# Configurando Portage
Portage es un conjunto de directorios bien organizados por categorías basadas en el criterio de los desarrolladores de Gentoo, y que cada una de ellas, hay un directorio con el nombre del software cuyo interior hay scripts como .ebuilds, parches...etc necesarios para instalar los paquetes.

Descargamos todos el árbol de portage para poder instalar software necesario.
```
# emerge-webrsync
# emerge --sync
```
Por lo general en la documentación te recomiendan que **leas las noticias de Portage**, en mi caso no tuve ningún problema, pero si lees este post y ha pasado un tiempo, es preferible que te informes:
```
# eselect news list
News items:
  [1]      2016-06-19  L10N USE_EXPAND variable replacing LINGUAS
  [2]      2018-08-07  Migration required for OpenSSH with LDAP
  [3]      2019-05-23  Change of ACCEPT_LICENSE default
  [4]   N  2019-12-30  Genkernel 4 changed default filenames
  [5]   N  2020-02-07  Python 2.7 went EOL
  [6]   N  2020-02-20  OpenSSH 8.2_p1 running sshd breakage
  [7]      2020-04-22  Python 3.7 to become the default target
```
Para leer una a una:
```
# eselect news read 1
2016-06-23-l10n-use_expand
  Title                     L10N USE_EXPAND variable replacing LINGUAS
  Author                    Mart Raudsepp <leio@gentoo.org>
  Author                    Ulrich Müller <ulm@gentoo.org>
  Posted                    2016-06-19
  Revision                  1

The L10N variable is replacing LINGUAS as a USE_EXPAND, to avoid a
conceptual clash with the standard gettext LINGUAS behaviour.
[...]
```
## Seleccionando el perfil
Comprobamos que el perfil que tenemos es el correcto:
```
# eselec profile list
Available profile symlink targets:
  [1]   default/linux/amd64/17.0 (stable)
  [2]   default/linux/amd64/17.0/selinux (stable)
  [3]   default/linux/amd64/17.0/hardened (stable)
[...]
```
__NOTA__: Los perfiles tienen una serie de configuraciones de USE, CFLAGS, paquetes que no deben compilarse para evitar incompatibilidades...etc que están definidas por el equipo de desarrolladores de Gentoo. Puedes ver que USE contiene este perfil`emerge --info | grep ^USE`

__NOTA__: Las USE flags, son **características que queremos que tenga el paquete**, puede que existan incompatibilidades entre paquetes al definirlas, otras no estén disponibles, y otras pueden estar bloqueadas por motivos de estabilidad _package.mask_.

En esta lista, debe estar marcado con asterisco esta opción:
```
  [19]  default/linux/amd64/17.1/hardened/selinux (stable) *
```
# Configurando los locales
Los "locales" es el soporte idiomático/codificación que queremos que tenga soportada por defecto nuestro sistema. En mi caso, he configurado que el idioma por defecto sea el inglés norteamericano y el español como idioma secundario. Ambos idiomas tienen soporte UTF-8.

```
# echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
# echo "es_ES.UTF-8 UTF-8" >> /etc/locale.gen
```
Generamos los locales:
```
# locale-gen
```
Seleccionamos el locale por defecto:
```
# eselect locale list
Available targets for the LANG variable:
  [1]   C *
  [2]   C.utf8
  [3]   en_US.utf8
  [4]   es_ES.utf8
  [5]   POSIX
  [ ]   (free form)
```
Lo cambiamos:
```
# eselect profile set 3
```
Regeneramos toda la configuración de nuestro entorno:
```
# env-update && source /etc/profile && export PS1="(chroot) ${PS1}"
```

# Haciendo un pequeño tunning al `/etc/portage/make.conf`
Los siguientes pasos nos ayudarán en la instalación de los paquetes.

## Soporte de instrucciones de procesamiento en paquetes
Instalamos el paquete `app-portage/cpuid2cpuflags`:
```
# emerge -av app-portage/cpuid2cpuflags
```
Ejecutamos:
```
# cpuid2cpuflags >> /etc/portage/make.conf
```
Editamos el archivo `/etc/portage/make.conf` y cambiamos:
```
CPU_FLAGS_X86: aes avx avx2 f16c fma3 mmx mmxext pclmul popcnt sse sse2 sse3 sse4_1 sse4_2 ssse3
```
Por esto:
```
CPU_FLAGS_X86="aes avx avx2 f16c fma3 mmx mmxext pclmul popcnt sse sse2 sse3 sse4_1 sse4_2 ssse3"
```
Esto nos añadirá el soporte específico para los paquetes que definen las instrucciones que tiene nuestro procesador para aquellos paquetes que lo permitan mediante USE. Puedes ver los paquetes que usan estas USE si lo buscas en una sección de la <a href="https://packages.gentoo.org/useflags" target="blank">página de paquetes de Gentoo.</a>

<img src="https://echemosunbitstazo.es/user/pages/01.blog/instalando-gentoo-con-lvm-luks-y-selinux/use-flags-gentoo.png" class="img-fluid">

## Soporte idiomático en las aplicaciones
También añadiremos la variable `L10N="es en"` para tener soporte idiomático de los paquetes que instalemos en nuestro sistema. 
```
# echo 'L10N="es en"' >> /etc/portage/make.conf
```

## Definir la versión de Python por defecto para el sistema
Podemos optar por:
* Python 2.7: Intentar evitarlo porque su **soporte finalizó el 31 de diciembre de 2019**, aún así pueden haber programas que lo necesiten. No obstante, si no lo defines no importa.
* Python 3.6
* Python 3.7 
* Python 3.8
* Python 3.9

En mi caso, escogí el 3.7 porque vi que no tenía problemas con él, en contra posición con el 3.8 o 3.9 que hay paquetes que no están todavía migrados como `sys-apps/policycoreutils`, también puedes mezclarlos, pero a mí no me gusta mucho esa idea.

```
# echo 'PYTHON_TARGETS="python3_7"' >> /etc/portage/make.conf
```
Dejando la versión por defecto 3.7 en el sistema:
```
# eselect python list
Available Python interpreters, in order of preference:
  [1]   python3.7
  [2]   python3.6 (uninstalled)
  [3]   python3.8 (fallback)
  [4]   python2.7 (fallback)
```
En mi caso, pues dejo por defecto 3.7
```
# eselect set 1
```
## Instalando y configurando ccache
ccache permite ahorrarte tiempo en la compilación porque queda almacenado código compilado en un directorio definido en su configuración, siguiendo las <a href="https://wiki.gentoo.org/wiki/Ccache" target="blank">notas de la documentación</a>.
```
# emerge -av dev-util/ccache
```
Ejecutamos los siguientes comandos:
```
# echo 'FEATURES="ccache"' >> /etc/portage/make.conf
# echo 'CCACHE_DIR="/var/cache/ccache"' >> /etc/portage/make.conf
```
Creamos un directorio específico y aplicamos permisos:
```
# mkdir -p /var/cache/ccache
# chown root:portage /var/cache/ccache
# chmod 2775 /var/cache/ccache
```
Editamos el archivo de configuración `/var/cache/ccache/ccache.conf` y lo dejamos como este:
```
# Maximum cache size to maintain
max_size = 100.0G

# Allow others to run 'ebuild' and share the cache.
umask = 002

# Preserve cache across GCC rebuilds and
# introspect GCC changes through GCC wrapper.
compiler_check = %compiler% -v

# I expect 1.5M files. 300 files per directory.
cache_dir_levels = 3

compression = true
compression_level = 1
```
Regeneramos toda la configuración de nuestro entorno:
```
# env-update && source /etc/profile && export PS1="(chroot) ${PS1}"
```

# Instalando el núcleo del sistema y algunas utilidades
Ejecutamos los siguientes comandos:
```
# echo ">=sys-kernel/linux-firmware-20200519 initramfs" >> /etc/portage/package.use/usevars
# echo ">=sys-firmware/intel-microcode-20200520_p20200601 initramfs" >> /etc/portage/package.use/usevars
# echo ">=sys-kernel/linux-firmware-20200519 linux-fw-redistributable no-source-code" >> /etc/portage/package.license
# echo ">=sys-firmware/intel-microcode-20200520_p20200601 intel-ucode" >> /etc/portage/package.license
```
Añadimos las USE para todo `/etc/portage/make.conf`:
```
USE="device-mapper lvm audit"
```
Instalamos los siguientes paquetes `ys-kernel/gentoo-sources sys-apps/pciutils sys-kernel/genkernel sys-kernel/linux-firmware`:
```
# emerge -av sys-kernel/gentoo-sources sys-apps/pciutils sys-kernel/genkernel sys-kernel/linux-firmware
```
Editamos el `/etc/fstab`
```
/dev/nvme0n1p2		/boot		ext4		noauto,noatime	1 2
/dev/nvme0n1p3		/boot/efi	vfat		noauto,noatime  1 2
/dev/mapper/gentoo-root /		ext4		noatime	0 0
/dev/mapper/gentoo-swap  none		swap		sw		0 0
```
Compilamos el núcleo y lo instalamos:
```
# genkernel all --lvm --luks
```
__NOTA__: En mi caso, preferí compilar el kernel con opciones personalizadas, es un proceso más engorroso y necesitas tener un poco más de conocimiento. Más adelante haré un pequeño tutorial de tres cosas básicas para optimizarlo, pero de momento, instalamos todo.

__NOTA__: Este proceso dura bastante, tómate 7-8 cafés...

Cuando termine, podemos verificar que se han instalado correctamente:
```
# ls /boot/vmlinu* /boot/initramfs*
/boot/initramfs-5.4.38-gentoo-x86_64.img  /boot/vmlinuz-5.4.38-gentoo-x86_64
```

# Configurando la red
Configuramos el nombre de nuestra máquina a nivel de red, editamos el archivo `/etc/conf.d/hostname`:
```
# Set to the hostname of this machine
hostname="shark"
```
`shark` es el nombre que le asigno a mi máquina.

Le asignamos un dominio local, editamos `/etc/conf.d/net`:
```
# Set the dns_domain_lo variable to the selected domain name
dns_domain_lo="lan"
```
Mi máquina será identificada en la red como `shark.lan`

Instalamos el paquete `net-misc/netifrc`:
```
# emerge --ask --noreplace net-misc/netifrc
```
Editamos el archivo `/etc/hosts` y definimos el nombre de nuestra máquina en él:
```
127.0.0.1     shark.lan shark localhost
::1		           shark.lan shark localhost
```
## Gestionando los usuarios del sistema
Ejecutamos:
```
# passwd
```
Creamos un usuario sin privilegios:
```
# useradd -m sincorchetes
# passwd sincorchetes
# gpasswd -a sincorchetes wheel
```
## Cambiando el idioma del teclado
Editamos el archivo `/etc/conf.d/keymaps`:
```
# Use keymap to specify the default console keymap.  There is a complete tree
# of keymaps in /usr/share/keymaps to choose from.
keymap="es"
```

## Cambiando la hora del equipo
Editamos el archivo `/etc/conf.d/hwclock`
```
# Set CLOCK to "UTC" if your Hardware Clock is set to UTC (also known as
# Greenwich Mean Time).  If that clock is set to the local time, then
# set CLOCK to "local".  Note that if you dual boot with Windows, then
# you should set it to "local".
clock="local"
```

## Instalando herramientas del sistema
Instalamos el gestor de logs `app-admin/syslog-ng` y el un software de rotado de logs `app-admin/logrotate`
```
# emerge -av app-admin/syslog-ng app-admin/logrotate
# rc-update add syslog-ng default
```
Instalamos el gestor de tareas `sys-process/cronie`:
```
# emerge -av sys-process/cronie
# rc-update add cronie default
```
Instalamos los paquetes `net-misc/dhcpcd`, `net-wireless/iw` y `net-wireless/wpa_supplicant`
```
# emerge -av net-misc/dhcpcd net-wireless/wpa_supplicant net-wireless/iw
```
## Dejando SELinux en modo permissive
Cómo tenemos que aprender a tratar y gestionar nuestras propias políticas, tenemos que dejarlo en modo permissive y no targeted. En modo permissive, el sistema envía alertas de políticas incorrectas como una posible vulneración de se seguridad por ejecutar determinado software.

Editamos el archivo `/etc/config/selinux` y cambiamos:
```
SELINUX=targeted
```
Por:
```
SELINUX=permissive
```

## Configurando el gestor de arranque
Añadimos las USE necesarias para compilar el software:
```
# echo ">=sys-boot/grub-2.04-r1 device-mapper truetype mount" >> /etc/portage/package.use/usevars
```
Añadimos el soporte EFI para el GRUB
```
# echo 'GRUB_PLATFORMS="efi-64"' >> /etc/portage/make.conf
```
Instalamos el GRUB y además actualizamos todo el software que necesite tomar las nuevas variables USE configuradas:
```
# emerge --ask --update --newuse --verbose sys-boot/grub:2
```
Instalamos el gestor de arranque, en mi caso fue con un nvme0n1:
```
# grub-install --target=x86_64-efi --efi-directory=/boot/efi
```
Generamos la configuración del gestor de arranque, editamos `/etc/default/grub`
```
GRUB_DISTRIBUTOR="Gentoo"
GRUB_CMDLINE_LINUX="dolvm crypt_root=/dev/nvme0n1p4"
```
__NOTA__: En el caso de que tengas la partición de LVM en `/dev/sda4`, cambia `/dev/nvme0n1p4` por esa.

Guarda el archivo y genera el fichero de configuración del grub:
```
# grub-mkconfig -o /boot/grub/grub.cfg
```
Saliendo del `chroot`:
```
# exit
```
En la terminal del pendrive live:
```
# cd /
# umount -l /mnt/gentoo/dev{/shm,/pts,}
# umount -R /mnt/gentoo
# reboot
```
# Arrancando el sistema
Cuando arranquemos el sistema, podemos hacer login con nuestro usuario y escalar a `root`. Para poder conectarnos via Wi-Fi, podemos usar `wpa_supplicant`.

## Conectándonos a una red Wi-Fi

Identificamos nuestra interfaz Wi-Fi
```
# ip addr
```
Por regla general, las tarjetas wireless son mapeadas por el sistema con el nombre de `wlpNsM`, en mi caso es `wlp0s4`.

Generamos el archivo de conexión:
```
# wpa_passphrase SSID contraseña > /root/config
```
Conectamos:
```
# wpa_supplicant -D nl80211 -i wlan0 -c /root/config &
```
Asignamos una IP dinámica:
```
# dhcpcd wlp4s0
```
Si hacemos un `ip addr`, veremos que ya tendremos conexión, si no, probamos:
```
# ping google.es
```

Ahora podemos continuar instalando paquetes, en los próximos tutoriales, veremos cómo instalar X.org con los drivers de NVIDIA y MATE Desktop, las políticas de SELinux...etc
