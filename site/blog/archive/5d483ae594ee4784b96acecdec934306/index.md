---
uuid: 5d483ae594ee4784b96acecdec934306
title: "Creando un 'box' personalizado con Vagrant"
slug: /posts/creando-un-box-personalizado-con-vagrant
date: 2022-01-17
authors:
  - sincorchetes
tags:
  - Linux
---
Vagrant nos permite crear entornos de desarrollo virtuales sin afectar a nuestra máquina instalando todos esos molestos y dificultosos componentes y está disponible para múltiples sistemas operativos entre ellos OSX, GNU/Linux, Windows...

<!-- truncate -->

## Instalar en Fedora

> NOTA: Debemos tener habilitados los repositorio RPM Fusion en el sistema para instalar VirtualBox. Échale un vistazo a este [tutorial](https://echemosunbitstazo.es/archivo/como-anadir-rpmfusion-en-fedora/) de archivo.

```
sudo dnf install -y vagrant VirtualBox
```

## Postconfiguración

Añade tu usuario al grupo de VirtualBox para que puedas trabajar con él:
```
sudo gpasswd -a TU_USUARIO vboxusers
```

Y haz relogin

## Primeros pasos con Vagrant

Para poder tener tu máquina desde 0 (_porque puedes crear tu máquina desde una imagen existente_), primero descargaremos la image .iso con la que queramos hacerla, en este caso será [Rocky Linux 8](https://rockylinux.org/download).

Segundo, crearemos una máquina virtual con las siguientes características:

* 2 vCPU
* 4 GB vRAM
* 1 disco configurado como SSD de 1TiB

Iniciamos la máquina virtual y hacemos la instalación habitual con este esquema de particionado:

Particionado EFI:

* /dev/sda1 = /boot (1GiB,ext4)
* /dev/sda2 = /boot/efi (512MiB, EFI)
* /dev/sda3 = LVM
* /dev/mapper/rl-root (50GiB, ext4)
* /dev/mapper/rl-swap (8 GiB, swap)

El usuario deberá ser vagrant con contraseña vagrant y con la casilla de administrador marcada.

## Post instalación

Actualizamos el sistema

```
sudo dnf upgrade -y
```

Instalamos las guest additions
```
sudo dnf install rpm-fusion-free epel-release
sudo dnf install VirtualBox-guest-addition
```

> __NOTA__: Instalo los de RPM Fusion porque cuando actualicemos el kernel, se reconsturirán los módulos sin tener que volver a ejecutar el proceso de construcción que es manual.

Reiniciamos y podremos ver haciendo un `lsmod`, que cargaron los módulos de la guest additions en el sistema.

## Generando nuestro 'box'

Apagamos la máquina virtual y tomamos su nombre, después ejecutamos:
```
vagrant package --base NOMBRE_VM
```
En mi caso, la VM se llamaba rockylinux85 y ejecuto:
```
vagrant package --base rockylinux85
```
Tendrá una salida similar a esta:
```
==> rockylinux85: Exporting VM...
==> rockylinux85: Compressing package to: /home/sincorchetes/package.box
```

### BONUS, VM disponible desde Vagrant Cloud
Si quieres que esta imagen sea disponible desde Vagrant Cloud:
  1. [Creamos una cuenta](https://app.vagrantup.com/account/new)
  2. [Iniciamos sesión](https://app.vagrantup.com/session)
  3. [Crear una nueva 'box'](https://app.vagrantup.com/boxes/new)
  4. Introducimos los siguientes datos:
    * Name: Lo_dejamos_como_está / nombre_de_tu_box
    * Visibility: [] Private (Marcas si quieres que sea privada o no)
    * Short description: Añades una definición de como que contiene tu box...etc
    * Create box
  5. En la siguiente pantalla introducimos estos datos:
    * Version: 8.5 (Que es la de Rocky Linux, no nos guiamos por la nuestra, o usa lo que creas conveniente)
    * Description: Lo que creas conveniente
  6. Pulsamos en "Add Provider"
    * Provider: Seleccionamos VirtualBox
    * File hosting: Upload to Vagrant Cloud
    * Checksum type: Cogemos SHA512
    * Checksum: Le hacemos `sha512sum /home/sincorchetes/package.box` (esto lo adaptas a dónde tengas tu 'box' generada)
    * Continue to upload
  7. En la sección "Add Provider File"
    * Upload File: Buscamos la 'box', en mi caso `/home/sincorchetes/package.box`
    * Upload
  8. Ya tendremos la máquina subida, pero, tenemos que publicarla, volvemos a la pantalla principal de la máquina
  9. Dónde está la versión, pulsamos Edit -> Release y rellenamos los datos
¡Listo!

Si quieres iniciarla en tu máquina ejecuta:
```
vagrant init sincorchetes/rockylinux \
  --box-version 8.5
vagrant up
```

__NOTA:__ Dónde va 8.5 va el número de versión.

O también puedes hacerlo:
```
mkdir ~/tu_maquina
cd ~/tu_maquina
echo 'Vagrant.configure("2") do |config|
  config.vm.box = "sincorchetes/rockylinux"
  config.vm.box_version = "8.5"
end' > Vagrantfile
vagrant up
```

Para ambos casos después de haberlas descargado, bastará con situarse en el directorio y hacer `vagrant up`.

## Fuentes
  * [Vagrant - Vagrantfile](https://www.vagrantup.com/docs/vagrantfile)
  * [Vagrant - Creating a base box](https://www.vagrantup.com/docs/providers/virtualbox/boxes)


