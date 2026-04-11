---
uuid: 43e6159aaea94e95acc29d46ff1a622e
title: "DroidCam usa tu smartphone como webcam"
slug: /posts/droidcam-usa-tu-smartphone-como-webcam
date: 2022-01-19
authors:
  - sincorchetes
tags:
  - Linux
---
Droidcam es un proyecto que pertenece a [Dev47apps](https://www.dev47apps.com), dispone de una aplicación para Android e iOS con la que podemos utilizar nuestro smartphone como webcam, podemos configurarla via USB o via red, una estupenda solución cuando no disponemos de una Web cam, o tenemos una que es de mala calidad.

<!-- truncate -->

Además, dispone de un cliente para Windows y Linux que es el que nos hará el puente para las aplicaciones/software que tengamos instalados en nuestro sistema.

  * Descarga la aplicación para [Android](https://play.google.com/store/apps/details?id=com.dev47apps.droidcam)
  * Descarga la aplicación con soporte HD y otras características (de pago 5.20€) para [Android](https://play.google.com/store/apps/details?id=com.dev47apps.droidcamx)
  * Descarga la aplicación para [iOS](https://apps.apple.com/us/app/droidcam-wireless-webcam/id1510258102)

En mi caso solo he probado la de pago de Android que funciona muy bien, nunca me dio problemas. Tiene otra para OBS Studio que no he probado para [Android](https://play.google.com/store/apps/details?id=com.dev47apps.obsdroidcam), pero que tiene buena pinta y es gratuita.


## Instalación en Fedora

Como yo utilizo Linux para todo, vamos a seguir los pasos en Linux, estas instrucciones han sido probadas en Fedora 35 Workstation.

Descargar el tarball
```
wget -O droidcam_latest.zip https://files.dev47apps.net/linux/droidcam_1.8.1.zip
```
Comprobamos el hash
En esta versión 1.8.1, el hash es este: # sha1sum: fb9f0737f45f1904c648dd0e6c1cfa7ff6089aa1

```
sha1sum droidcam_1.8.1.zip
```
Descomprime el .zip
```
unzip droidcam_latest.zip -d droidcam
```
Instalamos el cliente, el módulo y el sonido

> _NOTA_: Es necesario tener instalado: `kernel-devel kernel-headers gcc make binutils pulseaudio-utils`.

```
cd droidcam && sudo ./install-client
sudo ./install-video
sudo ./install-sound
```

Cargando el módulo
```
sudo modprobe v4l2loopback-dc
```

Probamos el módulo nuevo con Cheese, OBS Studio, Kamoso, VLC, mpv...

> _NOTA_: Cada vez que actualicemos el kernel hay que hacer el proceso de `sudo ./install-video`

## GUVCVIEW
Es un cliente muy bueno para las webcam escrito en GTK+, casi que lo recomiendo si quieres hacer pruebas, además de que consume pocos recursos.

## Instalando en Gentoo

Para instalarlo en Gentoo, desenmascaramos el paquete y le decimos que instale el cliente GUI:

```
echo "media-video/droidcam ~amd64" > /etc/portage/package.accept_keywords/droidcam
echo "media-video/droidcam gtk" > /etc/portage/package.use/droidcam
emerge -av media-video/droidcam
```

Cargando el módulo:
```
modprobe v4l2loopback-dc
```

## BONUS: Si tienes la versión premium, puedes usar el soporte HD, para ello tendrás que hacer lo siguiente (válido para Fedora/Gentoo):
Editamos el archivo generado por la aplicación `~/.config/droidcam`
```
size=0x0
```
Lo modificamos por alguno de estos parámetros:
```
640×480, 960×720, 1280×720 (720p), 1920×1080 (1080p).
```

Editamos el archivo `/etc/modprobe.d/droidcam.conf` y modificamos el valor que queramos de tamaño:
```
options v4l2loopback_dc width=CAMBIAR height=CAMBIAR
```
Recargamos el módulo
```
rmmod v4l2loopback-dc
modprobe v4l2loopback-dc
```

## Fuentes
  * [Droidcam](https://www.dev47apps.com/droidcam/linux/)
  * [Gentoo Packages - Droidcam](https://packages.gentoo.org/packages/media-video/droidcam)
