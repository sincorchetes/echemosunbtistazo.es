---
uuid: c5811f42b9ad424ba51d281b5056fda4
title: "¿Cómo instalar Packet Tracer 7.3 en Linux?"
slug: /posts/como-instalar-packet-tracer-en-linux
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
__NOTA: He vuelto a revisar el procedimiento para PT 7.3 en Fedora 32 y funciona perfectamente. He visto varios comentarios indicando que pueden obtener el software de servidores como Mediafire. Os pido que lo descarguéis directamente desde la página web de Cisco. El hecho de que no ponga el enlace de descarga a este software, es que Cisco no permite su difusión, por lo que os añado en este post una manera de cómo obtenerlo, gracias por vuestros reportes y aportes.__

<!-- truncate -->

Packet Tracer es un software desarrollado por Cisco en su división de educación NetAcad. Este software de "simulación" permite diseñar múltiples escenarios en el ámbito de redes, ya que permite elaborar diferentes tipos de redes como LAN, MAN, WAN con medios alámbricos e inalámbricos; permite utilizar protocolos de enrutamiento dinámicos como OSPF, IGRP, EIGRP, BGP, RIP y estáticos.

También permite la elaboración de redes convergentes implementando equipos con múltiples servicios que actúen de servidor, todos los paquetes transmitidos y retransmitidos (protocolo TCP) se pueden visualizar con un analizador de tráfico que incorpora el programa, este permite ver cómo se establecen los procesos de negociación con los diferentes protocolos de transmisión y de enrutamiento facilitando la comprensión de los mismos.

Packet Tracer se encuentra disponible para diferentes sistemas como Windows (_32 y 64 bits_), Linux (_solo 64 bits_), Android e iOS. Hay que estar previamente logeado para acceder a su contenido.

La instalación tanto en Android, iOS y Windows no requieren de pasos adicionales, más que de descargar su instalador desde el market de aplicaciones correspondiente (_Google Play Store_, App Store_) o el ejecutable para Windows desde la página Web.

# Requisitos
Primeramente, hay que tener usuari@ en la NetAcad para poder descargar su software, (_no ponemos un enlace directo ya que no se permite redistribuir el software_). Antes era más complicado acceder si no se hacía un curso concertado, pero ahora basta con hacer un curso introductorio para poder descargarlo.

Puedes inscribirte en el curso pulsando [aquí.](https://www.netacad.com/courses/packet-tracer?target=_blank)

# ¿Linux? ¿Complicado?
En Linux los pasos no son tan "sencillos", ya que en primer lugar, el software viene comprimido en un comprimido `.tar.gz`,  en segundo lugar, hay que realizar la instalación haciendo uso de un script en línea de comandos, en tercer lugar el script de instalación está mejor adaptado a distribuciones como Ubuntu que el resto, y en cuarto lugar, el software hace uso de una librería SSL poco utilizada en distribuciones modernas, y tenemos que hacer un "apaño" con lo que hace este proceso un poco engorroso.

# Pasos a seguir 
Descargamos y descomprimimos el Packet Tracer.

```
cd /DIRECTORIO_DESCARGA_PT/
mkdir PT
tar xfv Packet\ Tracer\ 7.2\ for\ Linux\ 64\ bit.tar.gz -C PT
cd PT
```

Instalamos
```
sudo ./install

[salida]
Welcome to Cisco Packet Tracer 7.2 Installation

Read the following End User License Agreement "EULA" carefully. You must accept the terms of this EULA to install and use Cisco Packet Tracer.
Press the Enter key to read the EULA.
[...]
```

Pulsamos <kbd>Espacio</kbd> para hacer más rápida la lectura, cuando nos pregunte, escribimos <kbd>y</kbd>, dejamos todo por defecto.
```
Do you accept the terms of the EULA? (Y)es/(N)o y
Enter location to install Cisco Packet Tracer or press enter for default [/opt/pt]: 
Installing into /opt/pt
Copied all files successfully to /opt/pt


Should we create a symbolic link "packettracer" in /usr/local/bin for easy Cisco Packet Tracer startup? [Yn] y
Type "packettracer" in a terminal to start Cisco Packet Tracer
Writing PT7HOME environment variable to /etc/profile
Writing QT_DEVICE_PIXEL_RATIO environment variable to /etc/profile

Cisco Packet Tracer 7.2 installed successfully
Please restart you computer for the Packet Tracer settings to take effect
```

Cuando queramos arrancar el software, no aparecerá nada. Si no fijamos veremos que falta una librería.

```
ldd /opt/pt/bin/PacketTracer7
[...]
libcrypto.so.1.0.0 => not found
[...]
```

Para solucionar este inconveniente descargamos [libcrypto.so.1.0.0](https://github.com/sincorchetes/packettracer/blob/master/libcrypto.so.1.0.0?raw=true) y [libssl.so.1.0.0.](https://github.com/sincorchetes/packettracer/blob/master/libssl.so.1.0.0?raw=true) y lo copiamos a `/opt/pt/bin` o clonamos el repositorio y ejecutamos el script sencillo con el que copiará directamente los archivos descargados al directorio dónde tienen que ir.

```
git clone https://github.com/sincorchetes/packettracer
cd packettracer
chmod +x bootstrap.sh
./bootstrap.sh
```

Una vez hecho esto, si lanzamos packettracer (_un alias que instaló el instalador_) desde terminal veremos una ventana como la siguiente:

![](launch.png)

![](window.png)

## Troubleshooting
No veo Packet Tracer en el menú de aplicaciones. Si no lo ves, solo bastará con copiar el archivo `.desktop` a `/usr/share/applications`

```
sudo cp /opt/pt/bin/Cisco-PacketTracer.desktop /usr/share/applications/
```

# Referencias
* [RPMBone](http://rpm.pbone.net/index.php3/stat/3/srodzaj/1/search/libcrypto.so.1.0.0%28%29%2864bit%29?target=_blank)
