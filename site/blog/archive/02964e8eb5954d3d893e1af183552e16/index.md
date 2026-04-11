---
uuid: 02964e8eb5954d3d893e1af183552e16
title: "Mastering en Bash - Trabajando con textos"
slug: /posts/mastering-bash-trabajando-con-textos
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Sistemas
  - Linux
---
En esta entrega vamos a ver como trabajar con textos en Bash, tenemos una serie de comandos para trabajar con ellos que nos ayudarán cuando estemos avanzando en nuestra senda por este querido mundo que es el Software Libre.

<!-- truncate -->

## Comando `less(1)`
Este comando se utiliza mucho para visualizar textos desde el principio. Nos podemos olvidar de hacer un `cat(1)` y empezar a subir la parrafada bien con un scroll en una terminal gráfica o bien haciendo uso de <kbd>Shift</kbd> + <kbd>Page Up/Page Down</kbd>. 

Su funcionamiento es sencillo, simplemente con las teclas de dirección podemos orientarnos en el texto. No obstante, veremos el funcionamiento de algunos atajos del teclado:

| Métodos abreviados | Descripción |
|--------------------|-------------|
| <kbd>j</kbd> ó <kbd>&uarr;</kbd> | Desplaza una línea hacia delante o una cantidad "N"|
| <kbd>k</kbd> ó <kbd>&darr;</kbd> | Desplaza una línea o una cantidad N hacia atrás |
| <kbd>SPACE</kbd>   | Desplaza un conjunto de muchas líneas o varios conjuntos hacia delante |
| <kbd>b</kbd>       | Igual que el anterior, pero desplazándolas hacia detrás |
| <kbd>&rarr;</kbd>  | Desplaza la mitad del ancho de una pantalla o N posiciones |
| <kbd>&larr;</kbd>  | Desplaza la mitad del ancho de una pantalla o N posiciones (solo valido si se utiliza <kbd>&rarr;</kbd> |
| <kbd>F</kbd>       | Actuando como `tail -f` |
| <kbd>/</kbd>       | Permite buscar coincidencias |

Aquí podemos ver el funcionamiento de `less(1)` en acción: 
<script src="https://asciinema.org/a/181201.js" id="asciicast-181201" async></script>

## Comando `more(1)`                         
Este comando es parecido a `less(1)`, lo que pasa es que se diferencia sobre todo en su apariencia como el cuadro de ayuda que es distinto pero la finalidad llega a ser la misma, mostrar texto.
Comentamos los atajos de teclado más utilizados:

| Métodos abreviados | Descripción |
|--------------------|-------------|
| <kbd>Nº</kbd> + <kbd>Espacio</kbd> | Desplaza una línea hacia delante o una cantidad "N"|
| <kbd>Nº</kbd> + <kbd>z</kbd> | Desplaza una línea o una cantidad N hacia atrás |
| <kbd>SPACE</kbd>   | Desplaza un conjunto de muchas líneas o varios conjuntos hacia delante |
| <kbd> = </kbd>     | Muestra la línea actual |
| <kbd>/cadena</kbd> | Encuentra coincidencias |
| <kbd>n</kbd>       | Salta a la siguiente coincidencia |
| <kbd>!<cmd></kbd>  | Permite ejecutar un comando en una subshell |
| <kbd>/</kbd>       | Inicia el editor `vi(1)` en la línea actual |
| <kbd>:f </kbd>     | Muestra el nombre del fichero y número de línea actual |

Por aquí tenemos a `more(1)` un poco en acción:

<script src="https://asciinema.org/a/181209.js" id="asciicast-181209" async></script>

## Comando `tail(1)`
Este comando suele utizarse para mostrar salidas vivas en la terminal, es decir, si tenemos un archivo que constantemente se actualiza como pueden ser los logs, este nos permite ver a tiempo real los cambios producidos entre otras muchas más cosas.

En principio, si se ejecuta sin ningún parámetro o modificador, este devolverá un determinado número de líneas, unas 10 por defecto.

Veremos los modificadores más comunes:

| Parámetros | Descripción |
|------------|-------------|
| -n N       | Modifica el límite de líneas a mostrar |
| -v         | Muestra el título del fichero como una cabecera |
| --version  | Muestra el número de versión |

Comando tail en acción:

<script src="https://asciinema.org/a/181263.js" id="asciicast-181263" async></script>

## Comando `head(1)`
`head(1)` nos permite visualizar las 10 primeras líneas de la parte superior de los archivos, lo contrario a `tail(1)` y su funcionamiento es parecido, tanto que se pueden utilizar los parámetros de `tail(1)` para su uso.

Visualizando a `head(1)`:

<script src="https://asciinema.org/a/181264.js" id="asciicast-181264" async></script>

## Comando `wc(1)`
Este es muy utilizado para contar líneas, decimales o bytes, suele combinarse con tuberías para obtener resultados y utilizarlos en condicionales por ejemplo. Veamos como funciona.

| Parámetros | Descripción |
|------------|-------------|
|    -c      | Imprime los recuentos de bytes de una salida o fichero |
|    -m      | Recuentos de caracteres |
|    -l      | Muestra el número de líneas calculado de un archivo o salida |
|    -L      | Imprime el número de la línea más larga |
|    -w      | Recuento de palabras |

Veamos como funciona:

<script src="https://asciinema.org/a/181265.js" id="asciicast-181265" async></script>

## Comando `tr(1)`
Este comando nos permitirá intercambiar caracteres por otros o eliminarlos desde una salida. Por ejemplo, vamos a modificar la salida de una línea:
`head -n 3 /proc/kallsyms | tr 0 K`

Nos dará un resultado como este:
```
KKKKKKKKKKKKKKKK A irq_stack_union
KKKKKKKKKKKKKKKK A __per_cpu_start
KKKKKKKKKKKKKKKK A cpu_debug_store
```

Si no queremos reemplazar el caracter y simplemente eliminarlo:
```
head -n 3 /proc/kallsyms | tr -d 0
```

Obtendremos una salida como esta:
```
 A irq_stack_union
 A __per_cpu_start
 A cpu_debug_store
```

Si queremos trabajar con caracteres especiales, podemos hacerlo.

Tenemos mucha info en el `man 1 tr` que nos puede ayudar.

<script src="https://asciinema.org/a/181266.js" id="asciicast-181266" async></script>

## Comando `cut(1)`
Este comando es uno de los más potentes, con el se hacen auténticos scripts, ya que nos permite eliminar secciones de ficheros o salidas.

Por ejemplo, si queremos obtener las variables declaradas en el archivo `/etc/os-release`
```
cut -f 1 -d "=" /etc/os-release
```

O si queremos que nos devuelvan los datos:
```
cut -f 2 -d "=" /etc/os-release
```
Podemos hacer combinaciones entre dos comandos para que nos devuelva exclusivamente los valores de las variables sin entrecomillado de este archivo.
```
cut -f 2 -d "=" /etc/os-release | tr -d '\"'
```

Básicamente cuando se utiliza el parámetro `-f + NUM`, es porque queremos escoger los resultados que se encuentren dentro de la columna número X y se utiliza con el modificador `-d CARÁCTER` para poder partir el resultado, si no no sirve de nada.

<script src="https://asciinema.org/a/181266.js" id="asciicast-181266" async></script>

# Fuentes
* manpages 

