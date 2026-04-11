---
uuid: 4db0a80196d24150b7871b01d2b04dfc
title: "Mastering Bash - Redireccionamientos y tuberías"
slug: /posts/mastering-bash-redireccionamientos-tuberias
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Sistemas
  - Linux
---
Un redireccionamiento, como su propio nombre indica lo que hace es una redirección a un determinado sitio. En nuestro caso, utilizaremos los redireccionamientos para gestionar tanto las salidas, como entradas así como los niveles de error que de un comando o una aplicación para utilizarlos en nuestro beneficio.

<!-- truncate -->

Podemos decirle a un comando, que si tiene un error X, no lo muestre en pantalla y lo rediriga a un archivo de texto para que haga de log. También podemos añadir una frase, sentencias... a un archivo ya existente o en caso de que no exista que lo cree; comentar el número de palabras que tiene un texto... y un sin fin de cosas más.

## Operadores de redireccionamiento
Estos son los operadores que utilizaremos en la elaboración de scripts sobre todo, capítulo que introduciremos estos días con las siguientes entregas.

| Operador | Descripción |
|----------|-------------|
| 	 >	   | Redirecciona una salida hacia un archivo o comando. Si el archivo no existe, lo crea, y si existe, lo sobreescribe |
|   >>	   | Igual que el anterior, pero si el archivo existe no lo destruye, añade la salida después de la última línea |
| 	 <	   | Redirecciona una entrada hacia un comando para que este emita una salida (si lo hace), puede ser la salida de un comando hacia otro, un fichero... |
| 	<<	   |Redirecciona el contenido de un fichero hasta que se encuentre la palabra especificada en la redirección para finalizarla |

## Canales

Nuestra terminal tiene una serie de canales por los que se toman la entrada, salida y errores.

| Canal | Descripción | Ubicación |
|-------|-------------|-----|------|
|  0    | Es el canal por defecto de la entrada estándar | /dev/stdin |
|  1    | Especifica la salida de un comando. Por ejemplo ls 2> file.txt | 	/dev/stdout |
|  2	| Muestra la presencia de errores. Por ejemplo ls -lklk 3> error.txt | /dev/stderr |
categories: ["Administración de sistemas"]
---

# Estamos de vuelta

Bienvenidos a esta nueva entrega de 
Mastering en Bash, los que ya nos siguen de las anteriores espero que disfrutéis con este post, si acabas de acceder y no tienes ni idea de que va esto, puedes ver nuestro viejo post [Primeros Pasos](/posts/mastering-bash-primeros-pasos). En el siguiente post veremos que son los redireccionamientos y las tuberías antes de comenzar con scripting.

# ¿Qué es un redireccionamiento?
Un redireccionamiento, como su propio nombre indica lo que hace es una redirección a un determinado sitio. En nuestro caso, utilizaremos los redireccionamientos para gestionar tanto las salidas, como entradas así como los niveles de error que de un comando o una aplicación para utilizarlos en nuestro beneficio.

Podemos decirle a un comando, que si tiene un error X, no lo muestre en pantalla y lo rediriga a un archivo de texto para que haga de log. También podemos añadir una frase, sentencias... a un archivo ya existente o en caso de que no exista que lo cree; comentar el número de palabras que tiene un texto... y un sin fin de cosas más.

## Operadores de redireccionamiento
Estos son los operadores que utilizaremos en la elaboración de scripts sobre todo, capítulo que introduciremos estos días con las siguientes entregas.

| Operador | Descripción |
|----------|-------------|
| 	 >	   | Redirecciona una salida hacia un archivo o comando. Si el archivo no existe, lo crea, y si existe, lo sobreescribe |
|   >>	   | Igual que el anterior, pero si el archivo existe no lo destruye, añade la salida después de la última línea |
|	 <	   | Redirecciona una entrada hacia un comando para que este emita una salida (si lo hace), puede ser la salida de un comando hacia otro, un fichero... |
|	<<	   |Redirecciona el contenido de un fichero hasta que se encuentre la palabra especificada en la redirección para finalizarla |

## Canales

Nuestra terminal tiene una serie de canales por los que se toman la entrada, salida y errores.

| Canal | Descripción | Ubicación |
|-------|-------------|-----|------|
|  0    | Es el canal por defecto de la entrada estándar | /dev/stdin |
|  1    | Especifica la salida de un comando. Por ejemplo ls 2> file.txt |	/dev/stdout |
|  2	| Muestra la presencia de errores. Por ejemplo ls -lklk 3> error.txt | /dev/stderr |


## Ejemplos

Almacenar la salida del comando `ls -al` en un fichero `lista.txt`:
```
ls -al > lista.txt
```

Veremos como no se muestra nada en pantalla, pero se ha creado el archivo `lista.txt`

Mostrar el contenido de `lista.txt`
```
cat lista.txt
total 568
drwxrwxr-x.  2 sincorchetes sincorchetes  4096 May  2 01:43 .
drwx------. 55 sincorchetes sincorchetes  4096 May  2 17:10 ..
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  1 12:55 20E2MC8SVX-9423.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  1 12:55 36712GXM3C-865.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  1 12:55 4SASA426RU.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  2 01:43 5ODFPGZXOI-25637.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  2 01:43 5PYBWDCZWK.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  1 12:55 6A21WJKHWL.png

```

*NOTA: Recordemos que el operador `>` sobreescribe todo lo que haya, si queremos añadir información nueva al archivo debemos utilizar el operador `>>`*

```
ls -al >> lista.txt
cat lista.txt
total 568
drwxrwxr-x.  2 sincorchetes sincorchetes  4096 May  2 01:43 .
drwx------. 55 sincorchetes sincorchetes  4096 May  2 17:10 ..
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  1 12:55 20E2MC8SVX-9423.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  1 12:55 36712GXM3C-865.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  1 12:55 4SASA426RU.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  2 01:43 5ODFPGZXOI-25637.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  2 01:43 5PYBWDCZWK.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  1 12:55 6A21WJKHWL.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  2 01:43 6FG92BUEDM-12977.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  2 01:43 A6XZFBO1TK-18309.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  2 01:43 FBEBPAR2O9-16637.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  2 01:43 FP9EZ05Y3E-16753.png
-rw-rw-r--.  1 sincorchetes sincorchetes 25277 May  1 12:55 FZRD6D42BI-875.png
```

Guardar todos los errores que surjan en la ejecución del programa
```
cat ks 2> error.txt
```

No se mostrará nada en pantalla, pero nos daremos cuenta el error que nos da `cat(1)` en el fichero que se ha creado llamado `error.txt`
```
cat error.txt
cat: jk: No such file or directory
```

Mostrar en pantalla tanto la salida estándar como los errores
```
ls -al 2>&1 info.txt
```

Guardar en un fichero tanto la salida como los errores
```
ls -al 2>&1 info.txt > file.txt
```

Calcular las líneas que tiene un fichero de texto
```
wc -l < file.text
```

Añadir información a un fichero e interrumpirlo utilizando una palabra clave declarada por el usuario
```
cat add << EOF
```

Crear un fichero de texto utilizando la canal de entrada y utilizando una palabra clave para finalizar la adicción
```
cat > create_text.txt << EOF
```

Adherir la salida estándar de múltiples textos y redireccionándolos a un archivo
```
cat lista.txt error.txt info.txt create_text.txt > salida_multiple
```

# Tuberías
Una tubería es una secuencia de uno o más comandos separados por operadores de control como `|` o `&`. Suelen utilizarse mucho junto con el comando `grep(1)`, `egrep(1)` y `fgrep(1)` para filtrar resultados, o el comando `cut(1)` para recortar la salida estándar, generalmente producida por comandos. Estos comandos que hemos mencionado les dedicaremos un post especial debido a la importancia de los mismos. Sobre todo cuando demos scripting más adelante.

Este es el formato de una tubería común:
```
comando [+parámetros] | ó & [comando1]
```

## Ejemplos
Ejemplos basándonos en esta estructura de directorios:
```
.
├── fichero-0
├── fichero-1
├── fichero-10
├── fichero-11
├── fichero-12
├── fichero-13
├── fichero-14
├── fichero-15
├── fichero-16
├── fichero-17
├── fichero-18
├── fichero-19
├── fichero-2
├── fichero-3
├── fichero-4
├── fichero-5
├── fichero-6
├── fichero-7
├── fichero-8
└── fichero-9
```

Mostrar un valor relacionado con `dmesg(1)`
```
dmesg |grep Bluetooth

[   23.265232] Bluetooth: Core ver 2.22
[   23.265247] Bluetooth: HCI device and connection manager initialized
[   23.265250] Bluetooth: HCI socket layer initialized
[   23.265251] Bluetooth: L2CAP socket layer initialized
[   23.265256] Bluetooth: SCO socket layer initialized
[   24.078796] Bluetooth: hci0: read Intel version: 370810225019140f18
[   24.078797] Bluetooth: hci0: Intel device is already patched. patch num: 18
[   35.047963] Bluetooth: BNEP (Ethernet Emulation) ver 1.3
[   35.047967] Bluetooth: BNEP filters: protocol multicast
[   35.047974] Bluetooth: BNEP socket layer initialized
[   85.419671] Bluetooth: RFCOMM TTY layer initialized
[   85.419675] Bluetooth: RFCOMM socket layer initialized
[   85.419722] Bluetooth: RFCOMM ver 1.11
[60146.891379] Bluetooth: hci0: read Intel version: 370810225019140f00
[60147.826024] Bluetooth: hci0: Intel Bluetooth firmware file: intel/ibt-hw-37.8.10-fw-22.50.19.14.f.bseq
[60148.097374] Bluetooth: hci0: Intel firmware patch completed and activated
[60151.506132] Bluetooth: hci0: command 0x0c56 tx timeout

```

Mostrar un valor relacionado con la salida del comando `lspci(8)`

```
lspci |grep VGA
00:02.0 VGA compatible controller: Intel Corporation Device 591b (rev 04)
```

# Referencias
* [manpages](https://linux.die.net?target=_blank)
* [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter?target=_blank)
