---
uuid: c2688dbfe2d94f3a92b8a94919993fe2
title: "Algunos conceptos básicos"
slug: /posts/que-es-gentoo-linux
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
Gentoo Linux es una metadistribución que se caracteriza por ser altamente configurable y personalizable entre todas las existentes en el mundo de Linux. El usuario que utilice Gentoo Linux, no sólo puede compilar el software a su medida, escogiendo las características que quiere que tome; si no también, puede compilar ese software para su propio soporte de CPU acelerando aún más la fluidez y el consumo del mismo.

<!-- truncate -->

Gentoo Linux promete desde su instalación, un comienzo personalizable al gusto del usuario. Ya que este proceso se realiza a través de comandos y no existe interfaz gráfica de instalación que lo oriente. Para la instalación se emplea un archivo comprimido llamado _stage_ que difunde el proyecto Gentoo en un tiempo que ellos consideran, posteriormente hay que seguir una serie de procesos documentados en su Wiki para poder ir realizando la instalación. 

| Este proceso no es apto para personas sin paciencia y que no leen.

# Algunos conceptos básicos

Antes de entrar en detalles, me gustaría dejar claro una serie de términos, para aquell@s que no lo sepan para no pasarlos por alto:
 * Lenguaje de programación: Permite interactuar con el equipo en un lenguaje que nosotros podemos entender como si fuera hablar en inglés u otro idioma extranjero. Los más típicos son C, C++...
 * Código fuente: Es el ADN del programa y/o software, contiene todo para que funcione. Sin él, no hay programa directamente. Y se escribe en un lenguaje de programación.
 * Compilador: Programa que traduce el lenguaje de programación en lenguaje de máquina, que serían los famosos 0 y 1.
 * Binario: Es el archivo que genera el compilador tras haber traducido el código fuente.
 * Tarball: Comprimido que almacena código fuente.
 * Proceso de compilación. Es aquel que permite traducir el lenguaje de programación leíble por ti y por mí, a un lenguaje de máquina como es el lenguaje binario. Imagínate que quieres publicar un libro, el cuál va a ser leído por multitud de personas. Entonces, te apresuras a empezar, redactando un borrador del libro. El cuál lo harás en un determinado lenguaje como puede ser el español o el inglés. Todos los días vas añadiendo líneas y/o borrando cosas que no encajen y añadiendo comentarios sobre el por qué lo hiciste. 
Finalmente, terminas el borrador y lo llevas a la imprenta. Allí sale el libro terminado, listo para ponerlo a venta al público. 

| Código fuente (borrador) > Compilador (Imprenta) > Binario (Libro).

# Un poco de historia
Antes de liberarse Gentoo Linux en marzo de 2002. El fundador, Daniel Robbins mantenía una distribución llamada Enoch Linux cuyo objetivo consistía en no facilitar paquetes binarios pre-compilados como hacen la mayoría de distribuciones actuales, consiguiendo así agilizar y afinar el software en términos de rendimiento.

Daniel Robbins, probó un fork (_bifurcación_) de GCC conocido como EGCS desarrollado por Cygnus Solutions y renombró el nombre de Enoch Linux a Gentoo Linux. Sin embargo, más tarde decidió detener el desarrollo de Gentoo Linux y se fue a explorar el mundo de FreeBSD (_un SO basado en BSD y constantemente evolucionando_) para obtener más conocimientos sobre el sistema de ports, así, posteriormente, trasladarlo a Gentoo Linux y tener una bella obra de arte como es actualmente Portage. Finalmente, Gentoo Linux vio de nuevo la luz en marzo del 2002 con su versión 1.0.

Beastie, la mascota de BSD.

# ¿Qué es Portage?
Portage es un gestor de alto nivel que permite interactuar con este bello sistema. Uno de los comandos que se utilizan para gestionar el software instalado en el sistema se llama `emerge`. Está escrito en Python mayormente y se encuentra en `/usr/lib/python-exec/version_python/emerge`

En el siguiente vídeo de ejemplo podemos ver como interactuar con él:


## ¿Cómo funciona?
Este comando se apoya de un fichero general ubicado en `/etc/portage/make.conf`, en el que se establecen algunas características generales almacenadas en variables de Bash como puede ser `CFLAGS`, `MAKEOPTS`, `USE`... que explicaremos a continuación:

| Los procesadores contienen una serie de FLAGS (_instrucciones_) que permiten acelerar o mejorar el proceso de compilación del software. Por lo general, el software en otras distribuciones de Linux se compilan con los menos flags posibles para no alterar el uso del mismo en cualquier ordenador o dispositivo que utilicen otros CPUs.

 * `CFLAGS`: Es un array en el que se definen las FLAGS que utilizará tu procesador (_o las que quieras utilizar_) en el software que utilizarás después una vez que el compilador GCC construya un paquete. Digamos, que si compras un traje en una tienda. Por lo general, están elaborados para que todos podamos utilizar dicho traje. Pero siempre quedarán costuras más ceñidas que otras, haciendo que el traje sea igual de válido para todos, pero no ajustado a nuestra silueta.
 Sin embargo, si mandamos ha hacer un traje a nuestra medida, o a la medida que le digamos que queremos el traje, ya lo estamos haciendo único y exclusivo para nosotros, o para el acompañante. Esa es en parte la finalidad de las `CFLAGS`. Aprovechar todo el potencial de nuestro CPU para compilar los paquetes. La contrapartida es que si se le "dejamos" el traje a un amigo, este puede que no le valga.

 * `MAKEOPTS`: Permite definir la cantidad de números de CPUs físicos y virtuales que quieres utilizar para compilar de forma paralela. Este proceso aprovecha todos los núcleos/threads de nuestro procesador incluyendo los subprocesos para llevar a cabo la compilación del paquete. Imagínate, que para hacer un traje solo tenemos una empresa con 20 costurer@s, pero mandamos a trabajar a 1 sola persona. El traje acaba terminado a los 3 días. Pero, ¿y si ponemos a esos 20 costurer@s a trabajar para hacerlo? En menos de un día lo tenemos hecho. Esto es lo mismo al usar esta variable.
Su uso implica siempre sumar `+1` al número actual de núcleos de procesamiento y subprocesos. Por ejemplo, si tenemos un i5 con 2 núcleos y 2 subprocesos. El valor debería ser `MAKEOPTS="-j5"` y no `"-j4"`.

 * `USE`: Un array en el que defines las características con la que queremos que se compilen los paquetes del sistema. Si queremos que se utilice KDE, GNOME, Qt4, Qt5... se habilitan haciendo uso del signo `+` y si no `-`. Extrapolándolo al ejemplo del traje, aquí logramos personalizarlo añadiendo el color que queramos, la tela...

| Nota personal: Prefiero dejar pocos valores en `USE` en el archivo `/etc/portage/make.conf` y utilizar un fichero separado como `/etc/portage/packages.use/nombre_fichero` para cada paquete que quieras instalar y especificar las `USE` de cada paquete allí para evitar problemas posteriormente, porque cuando la defines en el fichero general, lo aplicará a todo el software que quieras compilar y puede que te generen conflictos.

 * `FEATURES`, este array permite añadir algunas características a Portage como:
 	* `parallel-fetch`: Utilizar descarga paralela, imagínate que la empresa de confección de trajes o ropa, le compra la tela, botones... a una distribuidora la cuál solo usa un furgón de reparto para todo. Puede que pinche los neumáticos y no llegue a tiempo. No obstante, puede mandar todo repartido en varios furgones, esto permite mayor carga y además más rapidez, si pincha uno las gomas, no pasa nada.
	* `user-fetch`: La descarga se hace mediante usuario sin privilegios. Más info [aquí](https://wiki.gentoo.org/wiki/Handbook:AMD64/Working/Features?target=_blank)
 * `GENTOO_MIRROR`: Array en el que añades mirrors para evitar que sí cae uno por el motivo que sea, salte al otro sin problema. Imagínate que tienes 1 distribuidora de material textil para confeccionar la ropa, y casualmente un día te falla por el motivo que sea. ¿Qué haces? ¿Dejas tirado a tus clientes porque esa empresa te ha fallado? ¿No, verdad? Se concierta otras para evitar que sucedan este tipo de cosas y no dejes a tus clientes plantados.
 * `L10N` (_como reemplazo a `LINGUAS`_), especifica el idioma y/o los idiomas que quieras mantener instalado en tu sistema. Puedes tener más de 1 sin ningún problema.
 * `PORTDIR`: Variable cuyo valor es el directorio dónde se encuentra el árbol de paquetes, generalmente se suele dejar por defecto.
 * `PKGDIR`: Variable que contiene el directorio con los tarballs que contienen el código fuente. Suele dejarse por defecto.
 * `CPU_FLAGS_X86`: Array que pretende sustituir los registros de estado comúnmente denominado en inglés FLAGS del procesor que suelen añadirse también como registros `USE`, y así los mantienen más ordenados.
 * `VIDEO_CARDS`: Array en el que defines que drivers vas a utilizar según la tarjeta gráfica que tengas, siempre y cuando utilices servidor gráfico.
 * `INPUT_DEVICES`: Otro array en el que añades los controladores que utilizas para los periféricos en el caso de utilizar servidor gráfico.
 * `CHOST`: Variable que se suele dejar por defecto. Si quieres otra versión de GCC, en ese caso, se debería seguir cuidadosamente las siguientes instrucciones [1](https://wiki.gentoo.org/wiki/Changing_the_CHOST_variable/es?target=_blank) y [2](https://wiki.gentoo.org/wiki/Upgrading_GCC?target=_blank).

Hay más variables y arrays que se pueden utilizar para definir más características como por ejemplo `APACHE2_MODULES` que asigna los módulos que se quieren utilizar para Apache; `PORTDIR_OVERLAY` para definir en qué directorio alojar los overlays...et

## Licencias y acuerdos de licencia de software adicional
Hay software en Gentoo Linux que aunque en su mayor parte es software libre y/u Open Source, encontrarás software privativo como es el caso de los drivers de NVIDIA, TeamViewer, VirtualBox... con lo que conlleva a que aceptemos una serie de licencias como la PUEL, NVIDIA...etc para ello, hay un fichero ubicado en `/etc/portage/package.license`.

### Aceptando licencias
En él, podrás añadir el paquete que quieras instalar más el nombre de la licencia que pide y se pueden añadir de 2 formas:
 * `>=dev-util/nvidia-cuda-toolkit-6.5.14 NVIDIA-CUDA`
 * `dev-util/nvidia-cuda-toolkit NVIDIA-CUDA`

¿Cuál es la diferencia? No tan sustancial. Puedes indicar que las versiones que sean superiores a la 6.5.14 pidan de nuevo volver modificar `package.license`. Mientras que la segunda, sea cual sea la versión aceptará las condiciones.

### Instalar paquetes bloqueados
En cuánto a los paquetes bloqueados, son paquetes no testados y considerados de índole "inestable". Es decir, no han sido aprobados como estables dentro del árbol de Portage. Hay que añadir el paquete a instalar más la arquitectura que estás utilizando en cuestión en el fichero `/usr/portage/package.accept_keywords`

Como mencioné anteriormente, se puede utilizar la misma sintaxis para este tipo de software como para el de las licencias:
 * `>=dev-db/sqlmap-1.0.6 ~amd64`
 * `dev-db/sqlmap ~amd64`

### Bloquear paquetes de forma voluntaria
Puede que carezca de sentido, pero si a lo mejor `emerge` se pone un pelín caprichoso y no te deja compilar un paquete porque te avisa de que lo bloquees por algún motivo. Se puede hacer. En este caso hay que añadir solo el nombre del paquete en el fichero: `/etc/portage/packages.mask/nombre_fichero`
 * `>=dev-db/sqlmap-1.0.6`
 * `dev-db/sqlmap`
Puedes obtener más información sobre Portage a través de su [documentación](https://wiki.gentoo.org/wiki/Portage?target=_blank).

# Algunas diferencias entre Portage y el FreeBSD Ports Collection

Portage, es un gestor de paquetes de alto nivel que está inspirado en el árbol de ports de FreeBSD. Los ports en FreeBSD son un conjunto de directorios con scripts elaborados en lenguaje script que permiten y facilitan la instalación de software desde tarballs (_códifo fuente_). 

FreeBSD **no tiene un gestor de paquetes de alto nivel que simplifique la tarea como tiene Gentoo Linux con emerge**. En este SO, tienes que ir directorio tras directorio efectuando un `make install clean`. Eso sí, si el software que pretendes instalar tiene dependencias, las compila también, esto suprime la necesidad de ir directorio tras directorio.

Si coges un listín telefónico ordenado por categorías, dentro de esas categorías hay subcategorías y finalmente los negocios, locales, y personas con su nombre, descripción, y teléfono de contacto. Al que si llamas te ofrece un servicio.

Este es un ejemplo del árbol de Portage:
```

├── app-accessibility
│   ├── accerciser
│   │   ├── accerciser-3.14.0.ebuild
│   │   ├── ChangeLog
│   │   ├── ChangeLog-2015
│   │   ├── Manifest
│   │   └── metadata.xml
│   ├── at-spi2-atk
│   │   ├── at-spi2-atk-2.16.0-r1.ebuild
│   │   ├── at-spi2-atk-2.18.1.ebuild
│   │   ├── at-spi2-atk-2.20.1.ebuild
│   │   ├── ChangeLog
│   │   ├── ChangeLog-2015
│   │   ├── files
│   │   │   ├── at-spi2-atk-2.16.0-atk_suite.h
│   │   │   ├── at-spi2-atk-2.16.0-null-gobject.patch
│   │   │   ├── at-spi2-atk-2.16.0-out-of-source.patch
│   │   │   └── at-spi2-atk-2.16.0-tests-data
│   │   │       ├── test-accessible.xml
│   │   │       ├── test-action.xml
│   │   │       ├── test-component.xml
│   │   │       └── test.xml
```

## ¿Qué contiene un paquete en Gentoo?
En Gentoo a diferencia de otras distribuciones de Linux, un paquete no es un archivo comprimido que sigue una serie de pautas de empaquetamiento y que en él se incluya software ya pre-compilado. Se le llama así exactamente a lo que es en FreeBSD un port (_un conjunto de carpetas y archivos varios legibles que permiten la instalación de un software a partir del código fuente compilándolo_).

Aquí puedes ver que un paquete está constituido por varios archivos. Especialmente los que más se repiten como patrón son:

`Metadata.xml`: XML que se utiliza para saber quién es el matenedor de ese paquete entre otras cosas.
`Manifest`: Archivo que contiene la suma de comprobación para verificar si el paquete que se ha descargado de los repositorios coincide con la suma que contiene el fichero en un hash determinado como puede ser SHA1, SHA256...
`*.ebuild`: Fichero que contiene todo lo necesario para instalar un software determinado. En él se incluye información como:
 	* Nombre
	* Descripción
	* Licencia
	* Palabras clave (arquitecturas)
	* Dependencias
	* Si incluye o no parches
	* Si necesita configuración adicional para soporte multilib
	* ChangeLog: Permite visualizar los cambios que ha sufrido este paquete a lo largo del tiempo.

## ¿Y un port en FreeBSD?
Por otro lado, FreeBSD tiene la siguiente estructura, similar como no:

 * `Makefile`: Fichero que incluye información como:
 * Nombre del port
 * Versión
 * Revisión
 * Categoría
 * Web oficial
 * Mantenedor
 * Comentario
 * Dependencias...
 * `distinfo`: Contiene un tipo de hash para comprobar si cumple con la suma de verificación y el nombre del archivo a descargar junto con su versión, revisión y extensión.
 * `pkg-descr`: Descripción larga del port
 * `pkg-plist`: Lista de archivos que se van a instalar relativo al port en cuestión (_no el resto de dependencias si las tuviera_)

Ejemplo de uso:
<script async="" id="asciicast-22f3i5rn39q0r8gi84ipngmbi" src="https://asciinema.org/a/22f3i5rn39q0r8gi84ipngmbi.js" type="text/javascript"></script>


# Ya, para de hablar de Portage ¿Qué hay de los servicios?
Gentoo por norma general recomienda utilizar OpenRC, que es un gestor de daemons (_nombre antiguo para definirse a servicios_) muy bueno y se encuentra disponible tanto para Gentoo Linux como para sistemas BSD como FreeBSD. Manjaro y/o Archlinux lo mantienen en sus repositorios. OpenRC se caracteriza por respetar la filosofía KISS (_Keep It Simple, Stupid!_) en español ¡Hazlo sencillo!, ¡Estúpido! 

## Algunas características de OpenRC
OpenRC se caracteriza entre otras cosas:
 * BusyBox; como entorno single mode reemplazo de init
 * Añade ficheros `init.d` específicos para un entorno BusyBox
 * Reemplazar `udev` con `mdev` y/o `eudev`
 * Compatible con Wicd, Network Manager, Pulseaudio...
 * `runlevels` específicos durante el arranque
 * Uso de CGroups (_una forma de gestionar procesos por grupos_)
 * Soporte `chroot`

## ¿Cómo trabajar con OpenRC?
Los comandos que suelen utilizarse para interactuar con él son:
 * `rc-status`: Muestra información sobre los daemons de todos los runlevels o uno específico
 * `rc-config`: Configura un runlevel añade o elimina un daemon que esté en él; ó bien para, inicia un daemon...
 * `rc-service`: Arranca o paraliza daemons

El fichero de configuración de OpenRC se llama `rc.conf` y está ubicado en el directorio `/etc`

# ¿Otras forma de tener Gentoo?

Gentoo no sólo se puede utilizar conjuntamente con Linux. Puedes encontrarlo con sistemas BSD como [FreeBSD](https://wiki.gentoo.org/wiki/Gentoo_FreeBSD?target=_blank), [OpenBSD](https://wiki.gentoo.org/wiki/Project:OpenBSD?target=_blank), [NetBSD](https://wiki.gentoo.org/wiki/Project:NetBSD?target=_blank), combinado el potencial de Gentoo con el resto de sistemas operativos. No me podría imaginar un OpenBSD y su firewall y seguridad con las herramientas que tiene Gentoo. Y no solo eso, existen [multitud de proyectos](https://wiki.gentoo.org/wiki/Project:Gentoo?target=_blank) como [Gentoo Hardened](https://wiki.gentoo.org/wiki/Project:Hardened?target=_blank) que pretende hacer de Gentoo Linux algo tan blindado como OpenBSD.

# Referencias
 * [Gentoo Wiki](https://www.gentoo.org/support/documentation?target=_blank)
 * Wikipedia
 * Man-pages
 * Errata: @SagMan Telegram user:  Distribución > [Metadistribución](https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/About/es?target=_blank)
