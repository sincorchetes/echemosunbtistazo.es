---
uuid: 3261358d7b224acd981ef86db4d12a2e
title: "Gestores de paquetes RPM"
slug: /posts/gestor-de-paquetes-rpm
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
Como ya hemos hablado anteriormente sobre qué es un [gestor de paquetes](https://echemosunbitstazo.es/blog/como-gestionar-software-en-linux?target=_blank) comenzaremos a ver cómo trabajar con este gestor de paquetería.

<!-- truncate -->

# Historia y antecedentes

Los orígenes del gestor de paquetes RPM (_Red hat Package Manager_) se remonta en el año 1997. Cuando Marc Ewing, Erik Troan y el resto de desarrolladores de Red Hat lo sacaron como mejora de los gestores de paquetes que existían en aquella época como es el caso de: PMS (Package Management System) desarrollado por Rik Faith, Doug Hoffman y Kevin Martin para su distribución llamada BOGUS en el año 1993; o RPP (Red Hat Software Program Packages) que vio la luz en 1994 en las primeras distribuciones beta de las versión Red Hat Commercial Linux (RCL) y por último, en 1994 también, Ian Murdock fundador de la distribución Debian GNU/Linux, saca a la luz DPKG.

## Notas adicionales 

La Linux Standard Base propuso RPM como un sistema de paquetes estándar que debería formar parte de toda distribución Linux. La LSB ha definido multitud de directorios para mantener un estándar en cuanto configuraciones entre otras muchas más cosas. Sin embargo, muchas distribuciones no respetaron esta proposición, y se dedicaron a mantener su propio sistema de paquetería. 
RPM es ampliamente utilizado sobre todo por las distribuciones openSUSE, Red Hat * como RHEL, Oracle Linux, CentOS, Fedora, Mageia, OpenMandriva, ROSA Linux, PCLinuxOS...

Los objetivos de su diseño era ser fácil de utilizar; tener un enfoque orientado solo a paquetes; actualización de versión superiores de paquetes; llevar un seguimiento de las dependencias internas de los paquetes; capacidad de llevar a cabo consultas; verficación; soporte para múltiples arquitecturas y utilizar fuentes originales.


# Facilidad de uso
No es necesario efectuar una compilación de código fuente de un software como por ejemplo:

```
tar zxf software_package
cd software_package
./configure
make
su
make install
```
Este proceso conlleva a realizar 6 pasos, de los cuáles, 3 de ellos (pasos 3,4,6) pueden dar origen a fallos de compilación por no haber dependencias que se encuentren resultas; fallos en el Makefile (script de compilación); parámetros inestables....etc

A esto, que sería:
```
wget ftp://servidor.com/pub/RPM/software.rpm
rpm -ivh software.rpm
```
Sin duda alguna, reduce de forma notoria la complejidad, y el tiempo, ya que, cuando se compila de código fuente, suele consumir muchos recursos de la máquina, pero sobre todo tiempo de compilación.

# Enfoque sobre un sistema que sea orientado a paquetes

Comentamos que pueden manipularse y/o gestionarse cientos y miles de paquetes de forma simultánea. Mientras que eliminar paquetes con el viejo proceso que se ha utilizado antaño make unistall clean (cuando existía), había que ir, de directorio en directorio efectuando dicha desinstalación. Por lo que se vuelve una ardúa y costosa tarea.

# Actualización de paquetes

En la que se elimina el paquete que ha sido previamente instalado reemplazándolo por el nuevo sin afectar a la estabilidad del sistema. Y por si los administradores poseen ficheros de configuración generales, estos quedan como están, así se evitan perder esos ficheros. Para efectuar una migración completa de los ficheros nuevos de configuración a los nuevos, se crean los famosos .rpmnew. Estos son los ficheros que acompañan a la actualización y que se tratan utilizando rpmconf -a.

# Interdependencia de paquetes.

Estos poseen una información de seguimiento para saber que otros paquetes son necesarios, en caso de actualización, instalación o eliminación de software. Ya que puede haber software que precise de otros programas y estos, si no contuvieran esta información de seguimiento. Puede que no se lleguen a instalar y no funcionaría correctamente el software.

# Capacidad de realizar consultas

Característica que forma parte del sistema de paquetes RPM. Este trabaja en conjunto con una base de datos llamada Berkeley DB en la que se almacena toda la información que tenga que ver con los paquetes que se encuentren instalados en el sistema, incluyendo si, añaden documentación.

# Verificación de paquetes

Característica que evita que se mantengan ficheros corruptos instalados en el sistema. RPM contiene un conjunto de información como el tamaño y los permisos sobre cada uno de los ficheros que se han instalado en el sistema. Esto evita que sucedan errores garrafales que puedan desembocar problemas de fallo de memoria en los programas que se han instalado. Como por ejemplo, un administrador modifica un fichero y este lo desborda con código erróneo, aumentando drásticamente su tamaño. Esto puede detectarlo RPM con su base de datos.

# Disponibilidad múltiples arquitecturas

RPM en suma, está portado a múltiples arquitecturas, no solo está para x86, x86_64. Se puede encontrar para procesadores DEC, SPARC, Motorola 68000, ARM...

# Fuentes originales

Nosotros con RPM podemos encontrarnos 2 tipos de paquetes. Un paquete contiene el código fuente que suelen contener las letras SRC en mayúsculas; y otro paquete que contienen los binarios pre-compilados.

Aquellos paquetes que contienen el SRC, facilitan la vida a los desarrolladores, porque contienen todo lo necesario para llevar a cabo el proceso de empaquetación binaria.

# Terminología y/o nomenclatura

Ahora comentaremos un poco qué terminología utiliza RPM en sus paquetes. La terminología nos sirve para identificar determinadas características y funcionalidades que tiene un paquete. Ya que este puede contener multitud de parámetros que nos puede ayudar para saber la arquitectura que utiliza; la versión y sobre todo que tipo de versión ya que puede incluir alguna característica fuera de lo común; nombre del paquete...etc

En RPM, nos podemos encontrar 2 tipos de paquetes en el siguiente ejemplo extraído de Fedora 24:

```
phpMyAdmin-4.6.3-1.fc24.noarch
phpMyAdmin.src
```
 * Identifica el nombre del paquete
 * Identifica la versión e incluyendo revisión, en caso de que tuviese
 * Identifica la versión de Fedora que se está utilizando
 * Identifica la arquitectura, o, si el paquete es un paquete que contenga código fuente.
 * Sistemas 64 bits y soporte 32 bits (multilib)

En caso de que utilices arquitectura 64 bits, en las distribuciones RPM es fácilmente instaurable una capa de compatibilidad para software de 32 bits. No hace falta más que instalar el software que se encuentre en su terminología i686, poco más hay que hacer aparte de satisfacer las dependencias de dichos paquetes.

# Contenido de los paquetes .RPM

Como hemos dicho anteriormente, existen 2 tipos de paquete, binario y source. Vamos a ver la diferencia que aguarda cada uno de ellos y que contienen de una forma más visual.
```
.

├── phpMyAdmin-4.6.1-all-languages.tar.xz

├── phpMyAdmin-4.6.1-all-languages.tar.xz.asc

├── phpMyAdmin-config.inc.php

├── phpMyAdmin.htaccess

├── phpMyAdmin.nginx

└── phpMyAdmin.spec
```
Este es el contenido de un SRC. Como se puede apreciar, no incluye nada más que:

 * Código fuente comprimido en .tar.xz
 * Suma de verificación del tarball
 * Ficheros específicos de configuración del software phpMyAdmin
 * Fichero .SPEC que hablaremos de ello más adelante. 

Sin embargo, si nos fijamos en el contenido de un paquete binario obtendremos la siguiente salida:
```
.

├── etc

│   ├── httpd

│   │   └── conf.d

│   │       └── phpMyAdmin.conf

│   ├── nginx

│   │   └── default.d

│   │       └── phpMyAdmin.conf

│   └── phpMyAdmin

│       └── config.inc.php

├── usr

│   └── share

│       ├── doc

│       │   └── phpMyAdmin

│       │       ├── ChangeLog

│       │       ├── DCO

│       │       ├── examples

│       │       │   ├── config.manyhosts.inc.php

│       │       │   ├── config.sample.inc.php
```
Podemos observar, como ya incluye directorios del sistema con sus respectos ficheros necesarios para su funcionamiento. Y no incluye nada de código fuente que precise de su compilación.

# Gestionando paquetes
Dentro de lo que cabe en nuestro sistema, podemos hacer las funciones básicas de gestión de paquetes como es el caso de eliminar, instalar o reinstalar entre otras más.

## Instalar un paquete, bastará con efectuar el comando:
```
$ rpm -ivh nombre_paquete.rpm
-i: Instala el paquete
-v: Añade información extra sobre el proceso de instalación
-h: Muestra un porcentaje en # sobre su instalación.
[root@keys0 sincorchetes]# rpm -ivh tcsh-6.19.00-10.fc24.x86_64.rpm 
Preparing...                          ################################# [100%]
Updating / installing...
   1:tcsh-6.19.00-10.fc24             ################################# [100%]
```
## Reinstalar un paquete:
```
$ rpm -vh --reinstall nombre_paquete.rpm
--reinstall: Reinstala el paquete
-v: Añade información extra sobre el proceso de reinstalación
-h: Muestra un porcentaje en # sobre su reinstalación.

[root@keys0 sincorchetes]# rpm --reinstall -vh tcsh-6.19.00-10.fc24.x86_64.rpm
Preparing...                          ################################# [100%]
Updating / installing...
   1:tcsh-6.19.00-10.fc24             ################################# [ 50%]
Cleaning up / removing...
   2:tcsh-6.19.00-10.fc24             ################################# [100%]
```
## Eliminar un paquete, ejecutaremos el comando:
```
$ rpm -evh nombre_paquete.rpm 
-e: Elimina un paquete.
-v: Añade información extra sobre el proceso de eliminación
-h: Muestra un porcentaje en # sobre su eliminación

[root@keys0 sincorchetes]# rpm -evh tcsh
Preparing...                          ################################# [100%]
Cleaning up / removing...
   1:tcsh-6.19.00-10.fc24             ################################# [100%]
```

# Trabajar con la DB

Como hemos comentado, RPM utiliza un conjunto de base de datos, la cual utiliza Berkeley DB, que nos sirve para mantener toda la información de los paquetes que se encuentren instalado en nuestro sistema.

Los ficheros los podemos encontrar en `/var/lib/rpm`:
 * Basenames
 * Conflictname
 * __db.001
 * __db.002
 * __db.003
 * Dirnames
 * Enhancename
 * Filetriggername
 * Group
 * Installtid
 * Name
 * Obsoletename
 * Packages
 * Providename
 * Recommendname
 * Requirename
 * Sha1header
 * Sigmd5
 * Suggestname
 * Supplementname
 * Transfiletriggername
 * Triggername

Sin embargo, no nos vamos a parar en cada uno de ellos, nos podemos hacer una idea que contenido puede tener cada uno.

Vamos a llevar a cabo una serie de ejemplo para trabajar con esta base de datos para así, en algunos casos, no llevarnos un chasco *  *  *  *  * .

## Consultar la información de un paquete, utilizamos:
```
$ rpm -q nombre_del_paquete
Salida de ejemplo: 
[sincorchetes@keys0 rpm]$ rpm -q libcaca## C99-0.28.beta19.fc24.x86_64
```

Como hemos visto, nos ha devuelto la información del paquete que se encuentra instalada en nuestro sistema, en este caso, Fedora 24.
```
sincorchetes@keys0 rpm]$ rpm -q openshot 
package openshot is not installed
```
Obtener el listado de todos los paquetes instalados en el sistema:
```
[sincorchetes@keys0 rpm]$ rpm -qa |less
pated-3.2-20.fc24.x86_p64
perl-XML-SAX-0.99-16.fc24.noarch
libuser-python-0.62-3.fc24.x86_64
dconf-editor-3.20.3-1.fc24.x86_64
teamviewer-11.0.57095-0.i686
libedit-3.1-14.20150325cvs.fc24.x86_64
mate-notification-daemon-1.14.1-1.fc24.x86_64
[...]
```

Utilizando el comando anterior, y una tubería, se pueden filtrar resultados. Muy válido cuando se quiere obtenr listado de muchos programas que contienen diferentes versiones instaladas como es el caso del kernel.
```
[sincorchetes@keys0 rpm]$ rpm -qa |grep kernel
kernel-debug-devel-4.6.4-301.fc24.x86_64
kernel-4.6.4-301.fc24.x86_64
kernel-debug-modules-extra-4.6.4-301.fc24.x86_64
kernel-devel-4.6.4-301.fc24.x86_64
[...]
```

Otra forma de filtrar, es utilizando `rpm -qa --pipe "grep kernel"`

Para saber en qué paquete se encuentra un determinado fichero incluido rutas simbólicas.
```
$ rpm -qf ruta_fichero
[sincorchetes@keys0 rpm]$ rpm -qf /bin/bash 
bash-4.3.42-5.fc24.x86_64
```

Si queremos saber la información de un paquete instalado:
```
$ rpm -qi nombre_paquete
[sincorchetes@keys0 sbin]$ rpm -qi bash
Name        : bash
Version     : 4.3.42
Release     : 5.fc24
Architecture: x86_64
Install Date: Sat 06 Aug 2016 09:51:46 AM WEST
Group       : System Environment/Shells
Size        : 6373152
License     : GPLv3+
Signature   : RSA/SHA256, Thu 19 May 2016 06:29:51 PM WEST, Key ID 73bde98381b46521
Source RPM  : bash-4.3.42-5.fc24.src.rpm
Build Date  : Tue 17 May 2016 03:25:18 PM WEST
Build Host  : buildvm-22.phx2.fedoraproject.org
Relocations : (not relocatable)
Packager    : Fedora Project
Vendor      : Fedora Project
URL         : http://www.gnu.org/software/bash
Summary     : The GNU Bourne Again shell
Description : The GNU Bourne Again shell (Bash) is a shell or command language interpreter that is compatible with the Bourne shell (sh). Bash incorporates useful features from the Korn shell (ksh) and the C shell (csh). Most sh scripts can be run by bash without modification.
```
Obteniendo listado de grupos de paquete. RPM puede alojar un listado de grupos de paquetes para automatizar la instalación de los mismos.
```
$ rpm -qg nombre_grupo
[sincorchetes@keys0 sbin]$ rpm -qg Development/Debuggers
lsof-4.89-4.fc24.x86_64
libunwind-1.1-11.fc24.x86_64
gdb-7.11.1-75.fc24.x86_64
```
Listando los ficheros que incluye un paquete instalado:

```
$rpm -ql nombre_paquete
[sincorchetes@keys0 ~]$ rpm -ql bash
/etc/skel/.bash_logout
/etc/skel/.bash_profile
/etc/skel/.bashrc
/usr/bin/alias
/usr/bin/bash
/usr/bin/bashbug
/usr/bin/bashbug-64
/usr/bin/bg
/usr/bin/cd
/usr/bin/command
/usr/bin/fc
[...] 
```
## Listando ficheros por paquete
```
$ rpm -q --filesbypkg bash
[sincorchetes@keys0 ~]$ rpm -q --filesbypkg bash 
bash                      /etc/skel/.bash_logout 
bash                      /etc/skel/.bash_profile 
bash                      /etc/skel/.bashrc 
bash                      /usr/bin/alias 
bash                      /usr/bin/bash
[...]
```

## Obteniendo una lista con más información:
```
$ rpm -qlv bash
[sincorchetes@keys0 ~]$ rpm -qlv bash 
-rw-r--r--    1 root    root                       18 May 17 15:22 /etc/skel/.bash_logout 
-rw-r--r--    1 root    root                      193 May 17 15:22 /etc/skel/.bash_profile 
-rw-r--r--    1 root    root                      231 May 17 15:22 /etc/skel/.bashrc 
-rwxr-xr-x    1 root    root                       29 May 17 15:22 /usr/bin/alias 
-rwxr-xr-x    1 root    root                  1072056 May 17 15:22 /usr/bin/bash 
lrwxrwxrwx    1 root    root                       10 May 17 15:22 /usr/bin/bashbug -> bashbug-64
[...]
```

## Listando ficheros de configuración de x paquete:
```
$ rpm -qc bash
[sincorchetes@keys0 ~]$ rpm -qc bash 
/etc/skel/.bash_logout 
/etc/skel/.bash_profile 
/etc/skel/.bashrc
```
Listando archivos de configuración con más información de salida:
```
 $ rpm -qcv bash
[sincorchetes@keys0 ~]$ rpm -qcv bash
-rw-r--r--    1 root    root                       18 May 17 15:22 /etc/skel/.bash_logout
-rw-r--r--    1 root    root                      193 May 17 15:22 /etc/skel/.bash_profile
-rw-r--r--    1 root    root                      231 May 17 15:22 /etc/skel/.bashrc 
```
## Listando los scripts dentro de un paquete:
```
rpm -q --scripts bash
[sincorchetes@keys0 ~]$ rpm -q --scripts bash
postinstall scriptlet (using <lua>):
nl        = '\n'
sh        = '/bin/sh'..nl
bash      = '/bin/bash'..nl
f = io.open('/etc/shells', 'a+')
if f then
  local shells = nl..f:read('*all')..nl
  if not shells:find(nl..sh) then f:write(sh) end
  if not shells:find(nl..bash) then f:write(bash) end
  f:close()
end
[...] 
```

## Obteniendo la hoja de cambios del paquete (Changelog):
```
$ rpm -q --changelog bash
[sincorchetes@keys0 ~]$ rpm -q --changelog bash
* Tue May 17 2016 Siteshwar Vashisht <svashisht@redhat.com> - 4.3.42-5
- Do not set terminate_immediately and interrupt_immediately while expanding tilda
  Resolves: #1336800
* Wed Feb 03 2016 Fedora Release Engineering <releng@fedoraproject.org> - 4.3.42-4
- Rebuilt for https://fedoraproject.org/wiki/Fedora_24_Mass_Rebuild
[... ]
```
## Listar los paquetes que han sido instalados recientemente:
```
$ rpm -qa --last |head
[sincorchetes@keys0 ~]$ rpm -qa --last |head 
qemu-system-aarch64-2.6.0-5.fc24.x86_64       Sun 07 Aug 2016 12:09:07 AM WEST 
qemu-2.6.0-5.fc24.x86_64                      Sun 07 Aug 2016 12:09:07 AM WEST 
edk2-aarch64-20160418gita8c39ba-4.fc24.noarch Sun 07 Aug 2016 12:09:07 AM WEST 
qemu-system-ppc-2.6.0-5.fc24.x86_64           Sun 07 Aug 2016 12:09:05 AM WEST 
SLOF-0.1.git20160223-1.fc24.noarch            Sun 07 Aug 2016 12:09:04 AM WEST 
qemu-system-x86-2.6.0-5.fc24.x86_64           Sun 07 Aug 2016 12:09:04 AM WEST
[...]
```
Hay multitud de opciones y parámetros que se pueden combinar. Pero que los daremos más adelante.

## Trabajando externamente con RPM y su base de datos.

Anteriormente, hemos mencionado que se puede realizar una base de datos de nuestras DB que mantiene RPM de una manera sencilla que no supone tanta complejidad. También podemos reconstruirla y restaurarla con tan solo varios comandos.

Para llevar a cabo una copia de seguridad, basta con efectuar los siguientes comandos:
```
# cd /var/lib
# tar cvf rpmdb.tar ./rpm
# gzip rpmdb.tar
```
Estos comandos crean un archivo tar de los ficheros que contienen el directorio rpm.

## Reconstruir la DB
```
$ rpm --rebuilddb
```
Antes de ejecutarlo, siempre es bueno hacer una copia de seguridad. Ya que si, surgen problemas, y no se pueda regenerar la DB. Habrá que tirar de la copia de seguridad. Si el proceso va bien, el tamaño de la base de datos de "Packages" bajará un poco de peso al no contener entradas que antes si contenía pero por desinstalación de algún programa. Una vez se reconstruya "Packages" se comenzarán a actualizar el resto de bases de datos.

## Crear una base de datos nueva
```
$ rpm --initdb
```

## Trabajando con dependencias
Cada paquete .RPM suele contener una serie de dependencias que debe suplir, antes de efectuar una instalación correctamente. Para ello, podemos utilizar este potente gestor de paquetes y averiguar que .RPM necesitamos suplir.
```
[sincorchetes@keys0 ~]$ rpm -ivh openshot-2.0.7-3.fc24.noarch.rpm 
error: Failed dependencies:
	python3-httplib2 is needed by openshot-2.0.7-3.fc24.noarch
	python3-libopenshot is needed by openshot-2.0.7-3.fc24.noarch
	python3-qt5 is needed by openshot-2.0.7-3.fc24.noarch
	python3-qt5-webkit is needed by openshot-2.0.7-3.fc24.noarch
```
Tenemos que buscar las dependencias, bien en los repositorios oficiales e instalarlas manualmente RECOMENDADO SIEMPRE. O bien mediante portales como RPMForge o RPMpbone adecuada para tu distribución.

# Ver dependencias de un paquete cuando lo queremos eliminar:
```
$ rpm -e nombre_paquete
[sincorchetes@keys0 ~]$ rpm -e bash
error: Failed dependencies: 
/bin/bash is needed by (installed) fedora-release-24-2.noarch 
/bin/bash is needed by (installed) nss-softokn-freebl-3.25.0-1.0.fc24.x86_64 
/bin/bash is needed by (installed) kmod-22-4.fc24.x86_64 
/bin/bash is needed by (installed) iproute-4.4.0-3.fc24.x86_64 
/bin/bash is needed by (installed) openssl-1:1.0.2h-1.fc24.x86_64
```

Si este paquete posee múltiples paquetes que dependen de él, no se efectuará el proceso de eliminación. 

En definitiva, con RPM podemos hacer de todo, podemos llevar a cabo instalación de más de 100 paquetes simultáneamente, eliminarlos, reinstalarlos; hacer copias de seguridad de las bases de datos de este magnífico gestor, restaurarlas, exportarlas...; verificar la integridad de los archivos instalados en el sistema con un simple comando; listar todos aquellos que se encuentren instalados y como lidiar con sus dependencias. Las cosas básicas que uno debería saber cuando trabaja con este tipo de sistema de paquetes. 

# Referencias

 * Fedora Documentation
 * RPM5 doc
 * Red Hat Doc
 * Google
 * Wikipedia
 * Eni ediciones ~ LPIC
