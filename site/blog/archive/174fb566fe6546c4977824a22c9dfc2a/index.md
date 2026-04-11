---
uuid: 174fb566fe6546c4977824a22c9dfc2a
title: "¡Ya está con nosotros Fedora 32!"
slug: /posts/ya-esta-con-nosotros-fedora-32
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
Me enorgullece compartirles que el equipo del proyecto Fedora, el cuál elabora una magnífica distribución de Linux la cuál llevo casi 10 años utilizando nos trae una nueva versión, la versión número 32 que fue liberada ayer por la noche con una gran cantidad de cambios, vamos a comentar algunos de ellos.

<!-- truncate -->

![Imagen obtenida de Fedora Project](https://getfedora.org/static/images/g-monitor-fedoralogo.png "Imagen obtenida de Fedora Project")

# Procesos importantes en el comportamiento del sistema:

## Habilitar EarlyOOM
EarlyOOM es un subproceso que se ejecuta en segundo plano que verifica de forma periódica cuánta memoria RAM y swap se está consumiendo en el sistema para tomar una decisión cuando este esté llegando a colapsarse. Por ejemplo, si tenemos el sistema que se encuentra más del 90% de RAM y swap ocupados, este subproceso buscará aquel que tenga una puntuación muy alta según un sistema de puntuación que tiene incorporado llamado oom_score y enviando un mensaje a estos procesos para que finalicen lo antes posible de una forma segura `SIGTERM`. Si el consumo llega a superar el 95%, entonces, revisando su tabla de puntuación, y enviará un mensaje para que esos procesos finalicen de forma inesperada o como se le conoce como `kill`, `SIGKILL`.

De esta forma, podemos recuperar el control del sistema sin que nos veamos forzados ha hacer un apagado forzado del mismo.

## Reiniciar servicios cuando se terminan las transacciones de RPM
Los scriptlets, que son conjuntos de scripts que se ejecutan después de la instalación o desinstalación de paquetes .rpm y permiten ejecutar código específico. Entonces, cuando los paquetes se actualicen y tengan servicios específicos, estos se reiniciarán sin tener que esperar un reinicio del sistema.

## Se habilita fstrimr.timer por defecto
Un \*.timer permite ejecutar un servicio en un determinado tiempo, es como el sustituto de `cron`. Con este `.timer`, que vendrá activado por defecto. Permite ejecutar el servicio `fstrim.service` cada semana para informar a las unidades de almacenamiento tanto físicos como virtuales de los bloques sin utilizar permitiendo obtener un mejor rendimiento. Recordemos que un SSD, NVMe, tarjetas SD...

## Firewalld ya utiliza por defecto nftables
Aunque Fedora ya lo ha utilizado como backend en estas dos últimas versiones menores, y RHEL 8 lo tiene por defecto, ya lo establecen de forma oficial. ¿Qué ganamos con esto? Pues podemos definir reglas que funcionen tanto para IPv4 como para IPv6 ahorrando multitud de líneas porque no tendremos que usar iptables o ip6tables. En suma, se pueden usar espacio de nombres y entonces, un usuario puede crear por separado su propio conjunto de reglas independiente sin que Firewalld se entrometa en el camino del usuario. Y por último, y el más importante, es que Netfilter está centrándose en nftables y no en iptables.

# Compiladores
Fedora vendrá con GCC 10 instalado y todos los paquetes se han recompilado utilizando esta versión de GCC permitiendo un entorno con librerías compiladas más actualizadas como es el caso de GNU C que viene con la versión 2.31. También se actualizó la versión de LLVM a la versión 10. (_parece que ambos compiladores estén compitiendo entre sí_). 

## Se eliminan componentes de librerías el paquete clang-libs
Librerías como libclangBasic.so, libclangAST.so... ya que los pequetes que dependan de librerias de clang deberían enlazarse con libclang-cpp.so. Esto mejora la estabilidad en Fedora porque el empaquetado se construye con una configuración que está soportada directamente por el proyecto clang y encima, nos olvidamos de tener que vincular hasta 37 bibliotecas compartidas diferentes reemplazándolas solo por 1 ayudando a mejorar los tiempos de inicio de la aplicación.

## Se actualiza el compilador de Pascal
El compilador libre de Pascal se actualiza a la versión 3.2.0 y permitiendo que otras arquitecturas como AArch64 y ppc64le puedan utilizar paquetes utilizando el compilador.

## Binutils
Se actualiza de la versión 2.32 a la versión 2.33

# Lenguajes de programación

## Python
Se ha retirado el soporte de Python 2 como era de esperar, Python 2 dejó de tener soporte el día 31 de diciembre de 2019 y es una buena idea quitarlo ya del sistema para evitar problemas de seguridad o afectación del rendimiento. Se actualiza de Python 3.7 a 3.8.

## Ruby 2.7
Se ha actualizado de la rama 2.6 a la rama 2.7

# Soporte idiomático
## Weblate
Las traducciones que antes se hacían en Zanata, ahora se hacen en Weblate que se puede acceder desde <a href="" target="blank">aquí.</a> Más que nada porque se reduce bastante el riesgo de no tener otra plataforma de traducción si Zanata se va al traste. Además, de que se centralizan las traducciones y se facilita que se interactúe con los proyectos (_upstream_). Si tengo un campo en GIMP que no está traducido, lo traducimos a través de Weblate y este se lo comunicará al proyecto GIMP para que lo subsane en su posterior versión. También permite generar de forma automática aquellas cadenas (palabras, textos...) que se han añadido nuevas a los programas facilitando aún más su traducción entre otras cosas.

Si te interesa ver más cambios aprobados, puedes acceder a sus <a href="https://docs.fedoraproject.org/en-US/fedora/f32/release-notes/" target="blank">Notas de liberación. </a>

¡A qué esperas para probarla! Tienes muchas posibilidades, puedes elegir la versión que más te guste o se adapte a tus necesidades:
* <a href="https://getfedora.org/es/workstation/download/" target="blank">Workstation </a>, la versión por defecto que contiene GNOME como entorno de escritorio lista para trabajar.
* <a href="https://getfedora.org/es/silverblue/" target="blank">Silverblue </a>, una versión de Fedora que contiene el entorno de escritorio de GNOME pero que te permite tener un entorno inmutable con aplicaciones aisladas.
* <a href="https://getfedora.org/es/coreos/" target="blank">CoreOS </a>, un sabor digno de contenedores, un sistema mínimo que ejecuta y se centra en contenedores.
* <a href="https://getfedora.org/es/server/" target="blank">Server</a>, puedes ejecutar aplicaciones en hardware dedicado o en la nube con la última tecnología de código abierto.
* <a href="https://iot.fedoraproject.org" target="blank">IoT</a>, diseñada para ejecutarse en entornos ARM como Raspberry Pi entre otras placas de este tipo de procesadores.
* <a href="https://spins.fedoraproject.org/es/kde/" target="blank">Plasma</a>, Fedora que utiliza el entorno de escritorio Plasma (_antes KDE_).
* <a href="https://spins.fedoraproject.org/es/xfce/" target="blank">XFCE </a>, si te gusta optimizar el rendimiento y no tener un entorno muy sobrecargado, puedes optar la versión que contiene XFCE por defecto.
* <a href="https://spins.fedoraproject.org/es/lxqt/" target="blank">LXQT </a>, un entorno de escritorio que combina el estilismo de Plasma al utilizar sus librerías gráficas _Qt_ y programas que consumen poco.
* <a href="https://spins.fedoraproject.org/es/mate-compiz" target="blank">MATE-Compiz</a> Provee un entorno de escritorio que derivó de la anterior versión de GNOME, la 2.32.1. Actualmente tiene muy buena acogida entre los usuarios y combina la potencia con buenos efectos de escritorio.
* <a href="https://spins.fedoraproject.org/es/cinnamon" target="blank">Cinnamon </a>, un escritorio moderno pero con la experiencia tradicional de Gnome.
* <a href="" target="blank">Sugar </a>, si tienes niños, ¡no es excusa!, también puedes enseñarle a usar Fedora con este entorno preparado para ellos.
* <a href="https://labs.fedoraproject.org/es/astronomy/" target="blank">Astronomy </a>, esta edición contiene programas relacionados con la astronomía.
* <a href="https://labs.fedoraproject.org/es/security/" target="blank">Lab de seguridad</a>, te ofrece un entorno de prueba seguro para trabajar en auditorías de seguridad, forenses, rescate de sistemas...
* <a href="https://labs.fedoraproject.org/es/design-suite/" target="blank">Suite de diseño</a> un sistema que contiene todos los programas necesarios para la edición gráfica.
* <a href="https://labs.fedoraproject.org/es/games/" target="blank">Juegos </a>, esta versión provee de multitud de juegos libres y de código abierto.
