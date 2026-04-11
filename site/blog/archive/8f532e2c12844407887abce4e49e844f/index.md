---
uuid: 8f532e2c12844407887abce4e49e844f
title: "Mastering en Bash - grep y sus amigos"
slug: /posts/mastering-bash-grep-y-sus-amigos
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Sistemas
  - Linux
---
# Volvemos a la carga

<!-- truncate -->

Como hemos comentado en el post [anterior](https://echemosunbitstazo.es/blog/mastering-bash-redireccionamientos-tuberias?target=_blank) relacionado con este Mastering, queríamos dedicarle una publicación directamente a los comando `grep(1)` y `cut(1)`, pues aquí esta uno de ellos.
Ya hemos visto lo siguiente en este Mastering en Bash:
 * Qué es una shell y qué es Bash
 * Qué son las entradas y salidas en una shell
 * Qué son los modificadores en los comandos
 * Trabajando con directorios y archivos
   * Mostrando archivos ocultos
   * Qué son las rutas absolutas y relativas
   * Cómo posicionarse en directorios superiores
   * Obtener la ruta del directorio actual
   * Gestionando directorio: crear, mover, copiar, renombrar, eliminar
   * Listar archivos y directorios
   * Tipos de archivo
   * Crear ficheros vacíos
   * Mostrando información de un fichero
   * Trabajando con archivos de texto:
     * Mostrar o redireccionar texto
     * Crear archivo y añadir texto directamente
   * Copias de seguridad
* Qué son las tuberías y redireccionamiento

Y todavía nos faltan muchos comandos y sobre todo, el área de scripting que es el área dónde pondremos en práctica lo aprendido para que nos pueda ser útil en un futuro.

# Comando `grep(1)`
Este es uno de los comandos más esencial de Bash, nos permite mostrar coincidencias en archivos en base a la cadena de caracteres que nosotr@s le pasemos, en otras palabras, si queremos buscar una palabra en un archivo de texto, `grep(1)` es nuestro comando.

## Sintaxis y ejemplos
Acorde con las indicaciones que nos proporciona la todopoderosa biblia de los comandos, `man(1)` estos son 3 ejemplos que nos da `man 1 grep`. 
```
grep [OPCIONES] PATRÓN [FICHERO...]
grep [OPCIONES] -e PATRÓN ... [FICHERO...]
grep [OPCIONES] -f FICHERO ... [FICHERO...]
```

Tanto las opciones, como los patrones y los ficheros se pueden repetir dentro de la línea de ejecución de nuestro comando.

Vamos con los ejemplos:

```
grep -o "Linux" /proc/version
```

Imprimirá la cadena "Linux" si la encuentra en el archivo, y la imprime tantas veces como la encuentre.

```
grep -q "Linux" /proc/version
```
No imprime nada, es una opción en la que se omite la salida, si encuentra una coincidencia con dicha palabra, devolverá en el estado de la shell un 0.
`echo $?` = 0 si se encontró y = 1 en el caso contrario.

```
grep -H "sda" /proc/* 2>/dev/null
```
Muestra en cada línea en la que encuentre coincidencias, también el nombre del archivo y omite errores.

```
grep -A 2 "_this_module" /proc/kallsyms
```
Muestra las 2 líneas siguientes de haber encontrado la coincidencia en la o las líneas.

```
grep -B 2 "_this_module" /proc/kallsyms
```
La inversa de la anterior, en vez de mostrar las 2 líneas siguientes, muestra las dos líneas anteriores a la coincidencia.

```
grep -C 2 "_this_module" /proc/kallsyms
```
Si la A y la B hacía cada cosa por separado, con la C podemos mostrar tanto las líneas anteriores como las posteriores. En este caso muestra el resultado de las dos sentencias anteriores en una sola sentencia.

```
grep -rA 2 "gcc" /proc/ 2>/dev/null
```
Buscará de forma recursiva en todos los ficheros y directorios que se encuentren dentro del directorio especificado y cuándo obtenga una coincidencia, imprimirá las 2 líneas anteriores a la coincidencia incluyendo el nombre del archivo en el que se encuentre.

_NOTA: El uso del parámetro -r ya incluye el parámetro -H por defecto_

```
grep -U "note" /bin/cp
```
Pretendemos encontrar una coincidencia dentro de un binario, y que en caso de encontrarla, ésta nos lo diga mediante un mensaje de salida.

```
grep -ob "root" /etc/passwd
```
Nos mostrará las líneas en dónde la coincidencia se haya repetido n veces dentro de un fichero especificado.

```
grep -obrA 2 "root" /etc 2>/dev/null
```
Permite efectuar lo mismo, pero se visualizarán las 2 líneas en cada coincidencia encontrada, número de línea, nombre de archivo dentro de un directorio y se omitirán los mensajes de error.

```
grep -FrB 2 '/usr' /proc 2>/dev/null
```
Permite utilizar caracteres especiales para la búsqueda de coincidencias. Este comando buscará de forma recursiva la cadena que contiene un carácter "prohibido" y mostrará las 2 líneas anteriores cada vez que encuentre una coincidencia. También omitirán los mensajes de error.

```
grep -ErC 2 '??linux' /proc 2>/dev/null
```
Al contrario que el anterior, aquí utilizaremos expresiones regulares como es el caso de ?? que sustituye a un caracter por signo de interrogación que no recordemos o no estemos seguro de cuál puede ser. Esta sentencia imprimirá las dos líneas siguientes a las coincidencias así mismo como las 2 anteriores, los mensajes de error se omitirán y se visualizará el nombre de los archivos que contengan dichas coincidencias

# Los amigos de grep, `fgrep(1)` y `egrep(1)`
Pues ya los hemos dado en los dos ejemplos anteriores, aunque no lo creamos, `fgrep(1)` como `egrep(1)` son dos comandos que actúan como alias.
 * `fgrep(1)` equivale a `grep -F`
 * `egrep(1)` es igual a `grep -E`

# Fuentes
* man pages ~ `grep(1)`





