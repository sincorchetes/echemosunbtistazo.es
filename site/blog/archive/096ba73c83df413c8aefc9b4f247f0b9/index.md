---
uuid: 096ba73c83df413c8aefc9b4f247f0b9
title: "Stellarium causa parpadeos en Fedora 35"
slug: /posts/stellarium-causa-parpadeos-fedora-35
date: 2022-01-15
authors:
  - sincorchetes
tags:
  - Linux
---
Ayer hablando con un compañero en el canal de [@fedoraesp](https://t.me/fedoraesp) en Telegram, comentaba que Stellarium 0.2.3 (la última versión en los repositorios) no le funcionaba bien porque tenía muchos parpadeos, tampoco le funcionaba la versión obtenida desde el Registry de Flatpak de Fedora, ya que éste está construido con el 'runtime' de Fedora (_contiene las librerías esenciales para que funcione_).

<!-- truncate -->

Entonces, instalé Stellarium desde los repos oficiales y luegos desde Flatpak aprovechando que tengo un portátil Gigabyte Sabre 15 que tiene una gráfica integrada Intel y una dedicada de NVIDIA. Decidí probar y efectivamente, me daba problemas de parpadeos. Mientras que, si lanzaba el programa usando la gráfica NVIDIA (nouveau) con `DRI_PRIME=1 stellarium`, ésta, no causaba problemas de parpadeos ni en Wayland ni en X.org.

Entonces, me decidí a sumar más información a un caso abierto en [Stellarium](https://github.com/Stellarium/stellarium/issues/2168) y creé un Bug Report en el sistema de reporte de errores de Fedora [Bugzilla](https://bugzilla.redhat.com/show_bug.cgi?id=2040771).

Pensando, si el problema era la versión del programa, entonces, bajemos de versión, (_quizás el programa tenga alguna manera de comunicarse via OpenGL o algo_), pero no resultó, por lo que evidentemente *no era problema de Stellarium*. Me cercioré y busqué si el driver de X.org de Intel se actualizó pero rpm me dijo que no:

```
[sincorchetes@fedora ~]$ rpm -qi xorg-x11-drv-intel
Name        : xorg-x11-drv-intel
Version     : 2.99.917
Release     : 51.20200205.fc35
Architecture: x86_64
Install Date: Tue 26 Oct 2021 06:42:42 AM WEST
```

También es cierto, que si pensamos, que afecta a Wayland y a X.org, este paquete, poco tiene que ver, así que me puse a ver las películas de El Hobbit y dejé de investigar.

Hoy volviendo hablar con mi compañero afectado, retomé la investigación, y empecé a probar cosas.

Hice un downgrade de Stellarium instalado desde el Registry de Fedora, sin efecto, por lo mismo, el runtime, y se me ocurrió instalar la versión de Flathub, y daba el mismo problema.

Entonces, pensé, mmm, ¿Y si instalo la versión anterior pero de Flathub? Pues, 'eureka', la versión de Flathub, la 0.2.2 funcionaba. ¿Por qué? Pues... me puse a investigar y vi que usaba una versión inferior de los drivers de MESA. Su 'runtime' tenía la versión 21.1.8 mientras que la versión de Fedora usaba 21.3.4.

Salida de `stellarium --verbose` acortada con Stellarium 0.2.2 de Flathub:
```
Driver version string: "3.0 Mesa 21.1.8 (git-127871cd1e)"
```

Salida de `stellarium --verbose` acortada con Stellarium 0.2.3 de repos oficiales:
```
Driver version string: "4.6 (Compatibility Profile) Mesa 21.3.3 (git-a65ad66c47)"
```

Entonces, hice un downgrade de los drivers de MESA:

```
sudo dnf downgrade --version mesa-dri-drivers-21.2.3-6.fc35.x86_64

```

Me bajo de versión estos paquetes:
```
mesa-filesystem-21.2.3-6.fc35.x86_64 
mesa-dri-drivers-21.2.3-6.fc35.x86_64 
mesa-libxatracker-21.2.3-6.fc35.x86_64 
mesa-vulkan-drivers-21.2.3-6.fc35.x86_64
```

Reinicié el entorno gráfico, y volví a lanzar Stellarium, ya andaba perfectamente, busqué un Bug Report abierto de MESA, y ahí puse toda la info que puedes ver desde [aquí](https://gitlab.freedesktop.org/mesa/mesa/-/issues/5731)
