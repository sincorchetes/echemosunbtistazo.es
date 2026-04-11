---
uuid: fe3775f98bbc436584757b76c781cc9c
title: "Como instalé Gentoo, hoja de pasos"
slug: /posts/como-instale-gentoo-hoja-de-comandos
date: 2022-01-18
authors:
  - sincorchetes
---
Hace un tiempo, en el viejo blog (_que todo el contenido está si le das archivo_), hice un post sobre Gentoo que puedes mirar [aquí](https://echemosunbitstazo.es/archivo/que-es-gentoo-linux/). En resumidas cuentas, es una meta distribución que contiene un gran corazón del que necesitas tiempo para entender como funciona y como construirte tu sistema operativo a lo DIY (_Do It Yourself_).

<!-- truncate -->

Aquí dejo los pasos que utilicé, no explico mucho voy al grano, por lo que, si tienes dudas, consulta la doc oficial [Gentoo Handbook](https://wiki.gentoo.org/wiki/Handbook:AMD64), hubiera utilizado el live que da Gentoo para la instalación, pero pasé un poco del tema, y lo instalaba mientras jugaba a Cyberpunk 2077 a través del servicio de NVIDIA GeForce NOW usando un live de Manjaro. (_si, muy raro todo_).

## Hardware

El hardware con el que hice la instalación

* Portátil: Gigabyte Sabre 15
* CPU: Intel i7-7700HQ
* RAM: 32GB 
* Disp. Almacenamiento: NVME Sandisk Corp WD Black 2018/SN750
* Gráfica integrada: Intel Corporation HD Graphics 630
* Gráfica dedicada: GeForce GTX 1050 Mobile
* Adaptador de Red Ethernet cableada: RTL8111/8168/8411
* Adaptador de Red Wireless: Intel Corporation Dual Band Wireless-AC 3168NGW
* Adaptador de Red Bluetooth: Intel Corp. Wireless-AC 3168 Bluetooth
* Webcam: Acer, Inc BisonCam,NB Pro

## Esquema de particionado (GPT)

Este fue el esquema de particionado que utilicé, las particiones / y swap estaban crifradas bajo LUKS.

|    Partición            | Pto. Montaje | Tipo de partición | Tamaño    |
|-------------------------|--------------|-------------------|-----------|
| /dev/nvme0n1p1          | /boot/efi    |       EFI         |  512MiB     |
| /dev/nvme0n1p2          | /boot/       |       ext4        |   1GiB     |
| /dev/nvme0n1p3          | ------------ |       LVM         |  Restante |
| /dev/mapper/gentoo-root |     /        |       ext4        |  Todo     |
| /dev/mapper/gentoo-swap |    swap      |       swap        |   8GiB     |


## Preparando el entorno
Requisitos previos:

  1. Tener conexión estable a Internet
  2. Tener configurada la tarjeta de red
  3. Un termo de café

### Particionando

Definimos primero la tabla de particiones

```
sudo fdisk /dev/nvme0n1
Command (? for help): n
First sector........: [Enter]
Last sector.........: +512MiB
Command (? for help): t
Partition type......: 1
Command (? for help): n
Partition number....: [Enter]
First sector........: [Enter]
Last sector.........: +1GiB
Command (? for help): n
First sector........: [Enter]
Last sector.........: [Enter]
Command (? for help): t
Partition type......: 31
Command (? for help): w
Command (? for help): q
```

Damos formato a las particiones que hemos creado:

```
sudo mkfs.fat -F32 /dev/nvme0n1p1
sudo mkfs.ext4 /dev/nvme0n1p2
sudo cryptsetup luksFormat /dev/nvme0n1p3
YES
Introduciendo la contraseña y la confirmación...
sudo cryptsetup luksOpen /dev/nvme0n1p3 data
sudo pvcreate /dev/mapper/data
sudo vgcreate gentoo /dev/mapper/data
sudo lvcreate -L8GiB -n swap gentoo
sudo lvcreate -l100%FREE -n root gentoo
sudo mkswap /dev/mapper/gentoo-swap
sudo mkfs.ext4 /dev/mapper/gentoo-root
```

#### Montaje, parte I:

```
sudo mkdir /mnt/gentoo
sudo mount /dev/mapper/gentoo-root /mnt/gentoo
sudo mkdir /mnt/gentoo/boot
sudo mount /dev/nvme0n1p2 /mnt/gentoo/boot
sudo mkdir /mnt/gentoo/boot/efi
sudo mount /dev/nvme0n1p1 /mnt/gentoo/boot/efi
```

### Fase de instalación de archivos

Accedemos a la página de [Gentoo](https://www.gentoo.org/downloads/) y descargamos la versión OpenRC que era la que yo usé, hacemos la comprobación de suma e instalamos.

Ejemplo de verificación:

Accedo [aquí](https://mirror.bytemark.co.uk/gentoo//releases/amd64/autobuilds/current-stage3-amd64-openrc/) y me encuentro que tengo estos archivos:
* `stage3-amd64-openrc-20220116T170534Z.tar.xz`
* `stage3-amd64-openrc-20220116T170534Z.tar.xz.DIGESTS`

En el DIGESTS obtengo los hashes, algo parecido a esto:

```
# BLAKE2 (b2sum) HASH
e59f339039029f009b23ff211d11007a49efba49857b6ed0591620c96323c6d3493b7bc7467b4910f4213a2d6399432d44785e171ba06a3f033ea1c158d99b0b  /var/tmp/catalyst/builds/default/stage3-amd64-openrc-20220116T170534Z.tar.xz
# SHA512 HASH
e801e19d5e2931675d4ac6ce20aa4c2213e612384c95b9270ef9be2f8ac550faea74adc82d07ac123c621e7fae0d6796e074c186cab4868bf584f0e0f01800b6  stage3-amd64-openrc-20220116T170534Z.tar.xz
# BLAKE2 (b2sum) HASH
c78ed26c7188b6ed54f5682dab9aaaf1fcc59b30c88f86b74848d3a1a68db65743171e1e7d0a97fc77a6bb9e6849e334da3615fcbd819d8d2544943eeab92798  /var/tmp/catalyst/builds/default/stage3-amd64-openrc-20220116T170534Z.tar.xz.CONTENTS.gz
# SHA512 HASH
f5d892f8939690e96690d207cc9f8f8321ec35780057a4b643218521f763acb69054ccf41e96b189ea558b0032ec968299528dbfc3f292f79c4850ad3889c8dc  stage3-amd64-openrc-20220116T170534Z.tar.xz.CONTENTS.gz
```

En este caso, solo nos fijamos en el `SHA512SUM` del archivo `stage3-amd64-openrc-20220116T170534Z.tar.xz`,

```
sha512sum stage3-amd64-openrc-20220116T170534Z.tar.xz
e801e19d5e2931675d4ac6ce20aa4c2213e612384c95b9270ef9be2f8ac550faea74adc82d07ac123c621e7fae0d6796e074c186cab4868bf584f0e0f01800b6  stage3-amd64-openrc-20220116T170534Z.tar.xz
```
¿Coincide? Pues continuemos

Extraemos los archivos:
```
sudo tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner -C /mnt/gentoo/
```

Hacemos algunos tejemanejes:
```
sudo cp --dereference /etc/resolv.conf /mnt/gentoo/etc/
sudo mkdir --parents /mnt/gentoo/etc/portage/repos.conf
sudo cp /mnt/gentoo/usr/share/portage/config/repos.conf /mnt/gentoo/etc/portage/repos.conf/gentoo.conf
```

¡Perfecto! Ya tenemos lo básico para empezar,

### Preparando algunas cosas

Comprobamos cuántos nucleos e hilos tiene nuestro procesador:
```
lscpu |grep On
On-line CPU(s) list:             0-7
```

En total, 7.

Con todo ya listo:

Editamos `/mnt/gentoo/etc/portage/make.conf` y añadimos lo siguiente en estas secciones:

* `CFLAGS="..."` ---> Añadimos:  `-march=native`
* `MAKEOPTS=-jN` --> El resultado de "On-line CPU(s) list, lo ponemos aquí +1, es decir, en mi caso 8.
* `GENTOO_MIRRORS="https://mirrors.evowise.com/gentoo/ https://mirrors.lug.mtu.edu/gentoo/"` --> Los mirrors a utilizar
* `ACCEPT_LICENSE="*"` ---> Aceptamos todas las licencias de software

Y guardamos el archivo

#### Montaje, parte II:

Montamos los pseusosistemas de archivo necesarios:
```
sudo mount --rbind /dev /mnt/gentoo/dev
sudo mount --make-rslave /mnt/gentoo/dev
sudo mount --rbind /sys /mnt/gentoo/sys
sudo mount --make-rslave /mnt/gentoo/sys
sudo mount -t proc /proc /mnt/gentoo/proc
sudo mount --bind /run /mnt/gentoo/run
sudo mount --make-slave /mnt/gentoo/run
sudo test -L /dev/shm && rm /dev/shm && mkdir /dev/shm
sudo mount --types tmpfs --options nosuid,nodev,noexec shm /dev/shm
sudo chmod 1777 /dev/shm
```
> _NOTA_: Al ser Manjaro y usar systemd, tenemos que ejecutar `--make-rslave`

¡Listo, podemos empezar a trabajar!

### Fase de instalación del sistema

¡Empieza la fiesta, chrooting!

```
sudo chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) ${PS1}"
```

Actualizando portage
```
emerge-webrsync
```

Hay que leer las news siempre
```
eselect news list
eselect news read
```

El perfil lo dejo tal cual, ya habrá tiempo para poner lo demás.

Recompilando todo lo necesario:

```
emerge --ask --verbose --update --deep --newuse @world
```

Configuramos el huso horario, en mi caso es Atlantic/Canary
```
echo "Atlantic/Canary" > /etc/timezone
emerge --config sys-libs/timezone-data
```

Configuramos las locales, en mi caso usaba English (USA) por defecto, editamos el archivo `/etc/locale.gen` y añadimos:
```
nano -w /etc/locale.gen
en_US ISO-8859-1
en_US.UTF-8 UTF-8
es_ES ISO-8859-1
es_ES.UTF-8 UTF-8
C.UTF-8
```
Regeneramos las locales:
```
locale-gen
 * Generating 5 locales (this might take a while) with 8 jobs
 *  (2/5) Generating en_US.ISO-8859-1 ...                                 [ ok ]
 *  (4/5) Generating es_ES.ISO-8859-1 ...                                 [ ok ]
 *  (1/5) Generating C.UTF-8 ...                                          [ ok ]
 *  (3/5) Generating en_US.UTF-8 ...                                      [ ok ]
 *  (5/5) Generating es_ES.UTF-8 ...                                      [ ok ]
 * Generation complete
 * Adding locales to archive ...                                          [ ok ]
```

Seleccionamos las locales por defecto:
```
eselect locale list
Available targets for the LANG variable:
  [1]   C
  [2]   C.utf8
  [3]   en_US
  [4]   en_US.iso88591
  [5]   en_US.utf8
  [6]   es_ES
  [7]   es_ES.iso88591
  [8]   es_ES.utf8
  [9]   POSIX
  [10]  C.UTF8 *
  [ ]   (free form)


eselect locale set 5
Setting LANG to en_US.utf8 ...
Run ". /etc/profile" to update the variable in your shell.

```

Refrescamos entorno:
```
env-update && \
source /etc/profile && \
export PS1="(chroot) ${PS1}"
```

### Instalando kernel

Instalamos:
```
emerge --ask sys-kernel/linux-firmware \
sys-kernel/gentoo-sources \
sys-kernel/genkernel \
sys-apps/pciutils
```

Seleccionando el kernel por defecto:
```
eselect kernel list
Available kernel symlink targets:
  [1]   linux-5.15.11-gentoo *
eselect kernel set 1
```

> _NOTA_: Estos pasos requieren cierta habilidad en la compilación del kernel, si es muy difícil, ve al paso (Instalar kernel genérico)

#### Compilar un kernel personalizado
> _NOTA_: Los pasos a continuación requieren cierta habilidad en la compilación del kernel, si es muy difícil, ve al paso ge (Instalar kernel genérico)

Configuramos el kernel:
```
cd /usr/src/linux
make menuconfig
```

> _NOTA_: Utiliza esta [documentación](https://echemosunbitstazo.es/posts/gentoo-el-arranque-no-pasa-de-loading-linux/) que puse, o no pasarás del arranque si no lo tienes activado.

Aquí ya no puedo ayudar, échale un vistazo al [Handbook](https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Kernel#Activating_required_options), ya que cada uno tiene un hardware diferente...

Cuando esté listo, guardamos el archivo como `kernel.config`

```
genkernel -- lvm --luks --kernel-config=/usr/src/linux/kernel.config all
```

#### Instalar kernel genérico
Se va a compilar un kernel con todos los módulos para tener un mayor soporte, tardará más que compilar un kernel personalizado pero te evita el tener que compilarlo y lo puedes hacer más adelante.

Para aquellos que prefieren dejarlo para después.

```
genkernel --lvm --luks all
```

No te asustes si sale unos mensajes como estos:
```
* Gentoo Linux Genkernel; Version 4.2.6
* Using genkernel configuration from '/etc/genkernel.conf' ...
* Running with options: --lvm --luks all

* Working with Linux kernel 5.15.11-gentoo for x86_64
* Using kernel config file '/usr/share/genkernel/arch/x86_64/generated-config' ...
* 
* Note: The version above is subject to change (depends on config and status of kernel sources).

* kernel: >> Initializing ...
*         >> Running 'make mrproper' ...
*         >> Running 'make oldconfig' ...
*         >> Re-running 'make oldconfig' due to changed kernel options ...
*         >> Kernel version has changed (probably due to config change) since genkernel start:
*            We are now building Linux kernel 5.15.11-gentoo-x86_64 for x86_64 ...
*         >> Compiling 5.15.11-gentoo-x86_64 bzImage ...
*         >> Compiling 5.15.11-gentoo-x86_64 modules ...
*         >> Installing 5.15.11-gentoo-x86_64 modules (and stripping) ...
*         >> Generating module dependency data ...
*         >> Saving config of successful build to '/etc/kernels/kernel-config-5.15.11-gentoo-x86_64' ...

* initramfs: >> Initializing ...
*         >> Appending devices cpio data ...
*         >> Appending base_layout cpio data ...
*         >> Appending util-linux cpio data ...
*         >> Appending eudev cpio data ...
*         >> Appending devicemanager cpio data ...
*         >> Appending auxiliary cpio data ...
*         >> Appending busybox cpio data ...
*         >> Appending luks cpio data ...
*         >> Appending lvm cpio data ...
*         >> Appending modprobed cpio data ...
*         >> Appending modules cpio data ...
*         >> Appending linker cpio data ...
*         >> Deduping cpio ...
*         >> Pre-generating initramfs' /etc/ld.so.cache ...
*         >> Compressing cpio data (.xz) ...

* Kernel compiled successfully!
* 
* --no-bootloader set; Skipping bootloader update ...
* 
* Required kernel parameter:
* 
* 	root=/dev/$ROOT
* 
* Where $ROOT is the device node for your root partition as the
* one specified in /etc/fstab

* If you require Genkernel's hardware detection features, you MUST
* tell your bootloader to use the provided initramfs file '/boot/initramfs-5.15.11-gentoo-x86_64.img'.

* WARNING... WARNING... WARNING...
* Additional kernel parameters that *may* be required to boot properly:
* - Add "dolvm" for LVM support
* - Add "crypt_root=<device>" for LUKS-encrypted root
* - Add "crypt_swap=<device>" for LUKS-encrypted swap

* Do NOT report kernel bugs as genkernel bugs unless your bug
* is about the default genkernel configuration...
* 
* Make sure you have the latest ~arch genkernel before reporting bugs.

```

### Editando el /etc/fstab
Vamos a definir bien aquí los datos, de lo contrario, el sistema no arrancará:
```
/dev/nvme0n1p1			/boot/efi	vfat	defaults,noatime     1 2
/dev/nvme0n1p2			/boot		ext4    defaults,noatime     1 2
/dev/mapper/gentoo-root        	/		ext4	defaults,noatime     0 1
/dev/mapper/gentoo-swap		none		swap	sw                   0 0
```

### Instalando gestor de arranque

Añadimos al fichero `/etc/portage/make.conf`:
```
nano -w /etc/portage/make.conf
GRUB_PLATFORMS="efi-64"
```

Ejecutamos:
```
echo "sys-boot/grub:2 device-mapper" >> /etc/portage/package.use/sys-boot
emerge -av grub
```
> _NOTA:_ Si tienes otros SO instalados, entonces tienes que instalar `emerge -av sys-boot/os-prober` y añadir `mount` a `/etc/portage/package.use/sys-boot`

Añadimos al archivo `/etc/defaults/grub`
```
nano -w /etc/default/grub
GRUB_CMDLINE_LINUX="dolvm root=/dev/mapper/gentoo-root crypt_root=/dev/nvme0n1p3"
```
Instalamos el GRUB:
```
grub-install --target=x86_64-efi --efi-directory=/boot/efi
```
Regeneramos la configuración:
```
grub-mkconfig -o /boot/grub/grub.cfg
```
> _NOTA_: Es posible que salgan avisos como los del siguiente ejemplo sobre todo si lo instalas desde otro SO como yo que utilicé Manjaro

```
Generating grub configuration file ...
[...]
  WARNING: Failed to connect to lvmetad. Falling back to device scanning.
Found linux image: /boot/vmlinuz-5.15.11-gentoo-x86_64
Found initrd image: /boot/initramfs-5.15.11-gentoo-x86_64.img
  WARNING: Failed to connect to lvmetad. Falling back to device scanning.
  WARNING: Failed to connect to lvmetad. Falling back to device scanning.
Warning: os-prober will not be executed to detect other bootable partitions.
Systems on them will not be added to the GRUB boot configuration.
Check GRUB_DISABLE_OS_PROBER documentation entry.
Adding boot menu entry for UEFI Firmware Settings ...
done
```

Nos aseguramos de que el servicio LVM quede habilitado al arranque:
```
rc-update add lvm default
```

### Instalando algunas herramientas básicas
Registrador del sistema:
```
emerge --ask app-admin/sysklogd
rc-update add sysklogd default
```

Cronie
```
emerge --ask sys-process/cronie
rc-update add cronie default
```

Herramientas ext4 (obligado)
```
emerge --ask sys-fs/e2fsprogs
```

Cliente/Servidor DHCP
```
emerge --ask net-misc/dhcpcd
```

Soporte Wireless (WPA-*/WPA2-*)
```
emerge --ask net-wireless/iw net-wireless/wpa_supplicant
```

### Configurando un usuario

```
useradd -m usuario
passwd usuario
gpasswd -a usuario wheel
```

### Configurando la contraseña de root
```
passwd root
```

### Configurando el teclado de tty
```
nano -w /etc/conf.d/keymaps
keymap="es"
```

### Finalizando

```
exit
cd
sudo umount -l /mnt/gentoo/dev{/shm,/pts,}
sudo umount -R /mnt/gentoo
sudo reboot
```

Y con esto, tendremos un sistema Gentoo con LVM+LUKS instalado.

## Fuentes
* [Gentoo Handbook](https://wiki.gentoo.org/wiki/Handbook:AMD64)
