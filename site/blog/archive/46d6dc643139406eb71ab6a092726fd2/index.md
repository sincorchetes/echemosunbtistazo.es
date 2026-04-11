---
uuid: 46d6dc643139406eb71ab6a092726fd2
title: "¿Cómo solucionar el problema de Netflix y Vivaldi en Linux?"
slug: /posts/como-solucionar-el-problema-de-vivaldi-netflix-en-linux
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Sistemas
  - Linux
---
En el [post anterior](https://echemosunbitstazo.es/blog/vivaldi-un-navegador-impresionante?target=_blank), estuvimos hablando sobre Vilvadi. Un navegador que se liberó en contraposición del rumbo que tomó Opera con su comunidad dando origen a su primera versión el 12 de abril del 2016.

<!-- truncate -->

Sin embargo, hemos tenido problemas al reproducir videos con Netflix o Atres Player porque al parecer hay un problema con los códecs. Fedora por ejemplo no incorpora códecs propietarios a menos que instales un repositorio adicional y los instales. No obstante, hemos hecho un sondeo por sus foros y hemos encontrado bastantes post que ocurrían en diferentes distribuciones de Linux.
* [Netflix and Vivaldi on Linux?](https://forum.vivaldi.net/post/6672?target=_blank)
* [Netflix only works when Chrome is installed](https://forum.vivaldi.net/post/75823?target=_blank)
* [Netflix videos doesn't work :(](https://forum.vivaldi.net/post/4342?target=_blank)
* [Netflix don't find widevine and I'm pretty desperate now](https://forum.vivaldi.net/post/114800?target=_blank)
* [Movie Sites Won't Play](https://forum.vivaldi.net/post/114800?target=_blank)

 ...etc

# ¿Cómo solucionarlo?
Pues bien, uno de estos [post](https://forum.vivaldi.net/topic/12973/video-playback-problems-troubleshooting-and-solutions-on-linux/3?target=_blank), indicaban la instalación de una librería  (_`libffmpeg.so`_) que viene dentro de un paquete que se obtiene de los repositorios de Ubuntu

Linux 32 Bits 
```
wget -c http://security.ubuntu.com/ubuntu/pool/universe/c/chromium-browser/chromium-browser_67.0.3396.99-0ubuntu1_i386.deb
ar vx chromium-browser_67.0.3396.99-0ubuntu1_i386.deb
tar -xjvf data.tar.xz 
sudo cp usr/lib/chromium-browser/libffmpeg.so /opt/vivaldi/lib
rm -rf usr/
```
Linux 64 bits 
```
wget -c http://security.ubuntu.com/ubuntu/pool/universe/c/chromium-browser/chromium-codecs-ffmpeg-extra_67.0.3396.99-0ubuntu1_amd64.deb
ar vx chromium-codecs-ffmpeg-extra_67.0.3396.99-0ubuntu1_amd64.deb
tar -xjvf data.tar.xz 
sudo cp usr/lib/chromium-browser/libffmpeg.so /opt/vivaldi/lib
rm -rf usr/
```
Reiniciamos el navegador y ¡ya tendría que estar solucionado!
Hay otras alternativas como un [script](https://gist.github.com/ruario/bec42d156d30affef655?target=_blank) que sacó un usuario de la comunidad de Vivaldi llamado [@ruario](https://forum.vivaldi.net/uid/48?target=_blank) que es de donde hemos sacado la URL del paquete necesario.

¡Sin duda alguna le agradecemos el aporte desde Echemos un bitstazo!
