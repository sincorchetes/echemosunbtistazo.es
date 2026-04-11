---
uuid: 9adfd3caf63d44e7b3bbe37043294bdb
title: "¿Cómo obtener ayuda en sistemas UNIX-like?"
slug: /posts/como-obtener-ayuda-sistemas-unix-like
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
  - Sistemas
---
¿Qué pasa cuando tenemos algún problema con algún comando, no tenemos muy clara el parámetro que tendríamos que utilizar, saber bien si es realmente ese comando..etc?

<!-- truncate -->

Bien los sistemas UNIX-like como FreeBSD, Linux... por excelencia poseen una serie de herramientas como el comando `man(1)`, `info(1)`, `help(1)`... que vienen con el sistema operativo que podemos utilizarlos para salvarnos de un buen apuro. Si bien son conocidos estos sistemas son por su extensa y grande documentación otorgándoles muchísima profesionalidad y calidad.

## man
El comando `man(1)` es un interfaz en modo texto escrito por John W. Eaton entre el 1990 y 1993. Este nos permite visualizar los manuales de los comandos y programas que tengamos instalados en el sistema. Por lo general suelen contener multitud de ejemplos, descripciones sobre lo qué hace el comando o programa así como también explica para qué sirve cada parámetro que queramos utilizar. Es como un biblia en verso. `man(1)` dispone de una base de datos dónde almacena las rutas de la documentación para facilitar un acceso casi instantáneo a los archivos, la configuración de ésta se encuentra en el directorio `/etc/man_db.conf` y para regenerarla o crearle se utiliza el comando `mandb(8)`

Su sintaxis más básica es la siguiente:
```
man [n] comando
```
    * man es el nombre del comando
    * n es el número de categoría que puede tener el programa en el sistema, ya que pueden haber dos comandos iguales y pueden despitarnos a la hora de obtener el manual correcto.
    * comando nos permitirá visualizar el manual para este

### Categorías 
|Nº cat | Descripción |
|-------|-------------|
|  1    | Ejecutables o comandos que tienen que ver con el shell |
|  2    | Llamadas al sistema que son funciones provistas por el kernel |
|  3    | Llamadas a librerías que son funciones dentro de las librerías de los programas |
|  4    | Ficheros especiales que suelen encontrarse en /dev |
|  5    | Formatos y convenciones de archivos como por ejemplo `/etc/passwd` |
|  6    | Juegos |
|  7    | Miscelánea que también incluye macro paquetes y sus convenciones como `man(7)`, `groff(7)` |
|  8    | Comandos de administración del sistema que suele utilizar el usuario `root` |
|  9    | Rutinas del kernel que no son estándar |

## ¿Cómo funciona man?
Seguramente que nos lo preguntemos por la cantidad de categorías que hay y sobre todo porque hay muchos comandos que posiblemente se encuentren repetidos. Bien, cuando nosotros llamamos a `man(1)` sin especificar una categoría, lo que hace es buscar en todas las categorías pero de forma consecutiva, es decir, 1 1p 8 2 3 3p 4 5 6 7 9 0p n lp o 1x 2x 3x 4x 5x 6x 7x 8x.

## ¿Qué secciones contiene cada manual?
Cada página de manual contiene una serie de secciones que nos permiten organizar la información de tal forma que no se mezcle y siendo bastante útil y práctica. También es verdad que muchas páginas de los manuales no contienen todas las secciones e incluso pueden que tengan secciones personalizadas como es el caso del comando `info(1)` que contiene una sección llamada COPYRIGHT y REPORTING BUGS.

| Sección | Descripción |
|---------|-------------|
| NAME    | Nombre del programa, comando... |
| SYNOPSIS| Sintaxis, parámetros y un poco cómo utilizar el comando |
| CONFIGURATION | Apartado de configuración |
| DESCRIPTION | En este apartado se explica qué hace el comando, finalidad... |
| OPTIONS | Explicación intensiva de cada una de las opciones y parámetros del software |
| EXIT STATUS | Número de salida de ejecución de un comando, script... |
| RETURN VALUE | Tipo de valor que devuelve X cosa, generalmente suelen ser funciones |
| ERRORS | Se explica por qué pueden producirse determinados errores controlados |
| ENVIRONMENT | Variables de entorno |
| FILES | Ficheros involucrados en el funcionamiento del comando o aplicación |
| VERSIONS | Cambios añadidos en las versiones del software |
| CONFORMING TO | Citando estándares o información en concreto |
| NOTES | Información adicional |
| BUGS | Aparta de información para reportar errores tipo Bugzilla |
| EXAMPLE | Ejemplos de cómo habría que ejecutarse o configurarse determinado software |
| AUTHORS | Responsables del diseño del programa |
| SEE ALSO | Tipo README adicional |

## Preformateo en las secciones:
Según el `man` del comando `man`, en la sección de SYNOPSIS si o sí, debería hacer uso de un estándar de formato para diferenciar parámetros o argumentos obligatorios y que este, puede extenderse en el resto de secciones.

* **texto en negrita**: Exactamente como se muestra
* <u>_texto en cursiva_</u>: Reemplazar con un argumento apropiado
* [**-abc**]: Cualquiera o todos los argumentos que se encuentren dentro de los corchetes son opcionales
* **-a|-b**: Opciones delimitadas por el caracter | o que se no se pueden utilizar en conjunto
* <u>argumento</u>: Argumento que se puede repetir
* [<u>_expresion_</u>]: Toda la expresión que se encuentre dentro de unos corchetes pueden repetirse

Este tipo de formato se puede interpretar de una forma diferente devido al dispositivo que se esté utilizando, ya que hay intérpretes de comandos que no pueden reproducir un subrayado, palabras en cursiva...etc

## ¿Cómo manejar info?
Para interactuar con `man(1)`, podemos hacer uso de las flechas direccionales, no obstante, en la siguiente tabla resumiremos un poco algunos atajos que nos servirán para empezar a manejarlo:

| Atajo | Descripción |
|-------|-------------|
| h H   | Muestra la ayuda de navegación |
| q :q Q :Q ZZ | Sale del man |
| j e   | Desplaza la información hacia arriba línea a línea|
|   k   | Mueve la información hacia abajo línea a línea|
| d z f | Desplaza unas cuántas líneas hacia arriba |
| b y   | Desplaza unas cuántas líneas hacia abajo |
| g w   | Comienzo de página |
| 1,20,200...| Corre el texto tantos caracteres se le comunique |
| /expresión | Busca en el texto alguna coincidencia con lo escrito |
| n     | Permite volver a buscar una misma coincidencia con lo buscado con / |

## ¿Dónde se encuentra la documentación?
En general, toda la documentación se encuentra en el directorio `/usr/share/man`, también puede encontrarse en `/usr/local/share/man` o en directorios ya facilitados por el propio software a la hora de compilarse o empaquetarse.

## Encontrar información relacionada
Si no nos acordamos del comando podemos buscarlo mediante relación de coincidencias haciendo uso del parámetro `-k`

```
man -k download

ascii-xfr (1)        - upload/download files using the ASCII protocol
dnf.plugin.download (8) - DNF download Plugin
git-fetch (1)        - Download objects and refs from another repository
git-http-fetch (1)   - Download from a remote Git repository via HTTP
repotrack (1)        - track a package and its dependencies and download them
smbget (1)           - wget-like utility for download files over SMB
update-pciids (8)    - download new version of the PCI ID list
wget (1)             - The non-interactive network downloader.
XkbSetIndicatorMap (3) - Downloads the changes to the server based on modific...
yumdownloader (1)    - download RPM packages from Yum repositories
```

## Regenerando la base de datos
Para regenerar la base de datos de man, simplemente ejecutaremos:
```
sudo mandb
```

# Comando info
El comando `info(1)` desarrollado por la Free Software Foundation (FSF) nos provee un lector de documentación elaborada en formato info. Por lo generla, si ejecutamos `info(1)` a secas, nos saldrá como una especie de página con hipervínculos por dónde podemos navegar entre las diferentes páginas disponibles como si de una página Web en modo texto se tratase.

Si nos dirigimos a los vínculos que se encuentran subrayados y pulsamos enter, accedemos directamente a dicha página. Las páginas pueden contener un índice facilitando la navegación. 

Para más información sobre el comando info, `info info`

# Comandos con parámetro de ayuda
Por regla general, cada comando suele tener una pequeña ayuda que describe un poco para qué sirve cada parámetro en resumidas líneas.

Por ejemplo, veamos la salida del comando `ls(1)`
*NOTA: Recortaremos la salida del comando porque es muy largo*

```
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.

Mandatory arguments to long options are mandatory for short options too.
  -a, --all                  do not ignore entries starting with .
  -A, --almost-all           do not list implied . and ..
      --author               with -l, print the author of each file
  -b, --escape               print C-style escapes for nongraphic characters
      --block-size=SIZE      with -l, scale sizes by SIZE when printing them;
                               e.g., '--block-size=M'; see SIZE format below
  -B, --ignore-backups       do not list implied entries ending with ~
```
Como podemos ver nos da una breve explicación de lo que hace cada parámetro.

Si no hacen uso de `--help`, otros comandos también disponen de `-h` como `dmesg(1)`:
*NOTA: También hemos recortado la salida de este comando debido al tamaño de su salida*
```
Usage:
 dmesg [options]

Display or control the kernel ring buffer.

Options:
 -C, --clear                 clear the kernel ring buffer
 -c, --read-clear            read and clear all messages
 -D, --console-off           disable printing messages to console
 -E, --console-on            enable printing messages to console
 -F, --file <file>           use the file instead of the kernel log buffer
 -f, --facility <list>       restrict output to defined facilities
 -H, --human                 human readable output
```

# Comando help
Este comando provee de información sobre comandos integrados en la shell como los condicionales, bucles, variables... veamos un ejemplo:

```
function: function name { COMMANDS ; } or name () { COMMANDS ; }
    Define shell function.
    
    Create a shell function named NAME.  When invoked as a simple command,
    NAME runs COMMANDs in the calling shell's context.  When NAME is invoked,
    the arguments are passed to the function as $1...$n, and the function's
    name is in $FUNCNAME.
    
    Exit Status:
    Returns success unless NAME is readonly.

```

Veamos otro:
```
variables: variables - Names and meanings of some shell variables
    Common shell variable names and usage.
    
    BASH_VERSION	Version information for this Bash.
    CDPATH	A colon-separated list of directories to search
    		for directories given as arguments to `cd'.
    GLOBIGNORE	A colon-separated list of patterns describing filenames to
    		be ignored by pathname expansion.
    HISTFILE	The name of the file where your command history is stored.
    HISTFILESIZE	The maximum number of lines this file can contain.
    HISTSIZE	The maximum number of history lines that a running
```

Como vemos en uno nos explica la sintaxis de una función (_que veremos más adelante_) y de las variables de entorno, con una salida recortada ya que esta es muy larga.

Y esto es todo compañer@s, no se olviden de que cada proyecto, software, aplicación, comandos...etc suelen tener a disposición al menos un pequeño manual de como utilizarse además de que dependiendo de su envergadura, puede estar sustentado por una comunidad que favorezca el intercambio de información y se impulsen más características, más documentación y más de todo.

¡Espero que les haya gustado!

# Fuentes
* `man(1)` pages
* `info(1)` pages
