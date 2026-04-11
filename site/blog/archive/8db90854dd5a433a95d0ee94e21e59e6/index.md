---
uuid: 8db90854dd5a433a95d0ee94e21e59e6
title: "Mastering en Bash - Enlaces simbólicos o duros y alias"
slug: /posts/mastering-bash-enlaces-simbolicos-duros-y-alias
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Sistemas
  - Linux
---
En Echemos un bitstazo sabemos que no es así realmente el refrán, pero si que es cierto, que si acortamos mucho nos será más fácil aprendernos dónde está cada cosa haciendo uso de los enlaces para los ficheros y directorios y alias para comandos muy largos.

<!-- truncate -->

# Alias
Los alias nos permiten reducir la longitud de una sentencia que queramos ejecutar en nuestro sistema y atajarla con una simple palabra. Por ejemplo, si queremos acceder a un directorio muy concurrido desde terminal.

```
cd ~/Documentos/Archivos/2018/05/10/10-11/Sector/1/ficheros_importantes/Codigo054/Area_51/
```
No nos imaginamos en absoluto tener que teclear toda esta ruta cada vez que queramos acceder al directorio Area_51. Pues podemos generar un alias, a nivel de sistema o a nivel de nuestro usuario.

A nivel de sistema, tenemos que añadirlo en `/etc/bashrc` si es que queremos que ese alias también lo tengan el resto de usuarios o si solo lo queremos para el nuestro, en ese caso, `~/.bashrc` es el que debemos tocar de la siguiente manera:

```
alias nombre_alias='cd ~/Documentos/Archivos/2018/05/10/10-11/Sector/1/ficheros_importantes/Codigo054/Area_51/'
```

Posteriormente aplicamos los cambios:

```
source /etc/bashrc
```
o si es a nivel usuario:
```
source ~/.bashrc
```

# Enlaces
Los enlaces vienen a ser lo que en Windows tenemos como "Accesos directos" pero a nivel de terminal, podemos especificar un directorio o un archivo que se encuentre en un directorio X pero teniendo un acceso más rápido en un directorio en el que trabajemos. También tenemos enlaces simbólicos que son accesos que si es borrado el archivo o directorio original solo queda el enlace y por lo tanto, no funciona y no es útil, o tenemos lo que denominamos enlaces duros, en los que se conserva una copia del fichero o directorio.

## Simbólicos
Para poderlos generar, simplemente tenemos que hacer uso del comando `ln(1)` con el parámetro `-s` de soft.
```
ln -s /directorio_a_enlazar /directorio_donde_quiero_ver_el_enlace
```
Por ejemplo:
```
ln -s /usr/src ~
```
Nos genera un enlace simbólico hacia el directorio `/usr/src` de nuestro `/home`.

¿Cómo averiguar si dispongo del enlace simbólico?
Cuando hacemos un `ls(1)` para listar documentos y directorios, veremos en una de las líneas de salida un dato similar:
```
lrwxrwxrwx.  1 sincorchetes sincorchetes         9 May 20 17:37  src -> /usr/src/
```
* "l" al principio de esta entrada identifica un enlace simbólico.
* `src -> /usrc/src`: Nos dice hacia dónde apunta.

## Duros
Los enlaces duros permiten crear "una copia" de lo enlazado, de tal forma, que si se destruye el archivo o directorio original contínua funcionando. 
```
ln /directorio_a_enlazar /directorio_donde_quiero_ver_el_enlace
```
De hecho, si hacemos un `ls(1)`, no veremos añadida una `l` en los permisos o en acceso tipo `src -> /usr/src`.

# Referencias
* manpages, `ln(1)` y `ls(1)`
