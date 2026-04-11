---
uuid: 91c12e471e9e4a63ab19af6a42bd2d34
title: "Curso de Python - Fecha y hora"
slug: /posts/curso-de-python-fecha-y-hora
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Desarrollo
---
¿Qué tal mis queridos/as lectores/as? hace bastante tiempo que no redactaba en el blog, últimamente he estado ocupándome de tener un poco de tiempo para mí, como si tuviera unas mini vacaciones. Pero no importa, aquí vuelvo cargado de más conocimientos para todos.

<!-- truncate -->

En este pequeño post, aprenderás a trabajar con la fecha y la hora de una forma breve y sencilla antes de hacer la introducción a la programación por objetos o POO.

# Fecha y hora
Hay un módulo llamado `time` que te permitirá trabajar con la fecha y la hora, estos son algunos métodos.
```
import time
print(time.ctime())
```
Devolverá:
```
Mon Apr 13 21:58:46 2020
```
No es muy práctico si quieres hacer otras cosas, como asignar una fecha y hora a un archivo que quieras crear, por suerte, puedes preformatear con `.strftime()`.
```
import time
fecha_log = time.strftime("%d-%m-%Y_%H-%M-%S")
fecha_humano = time.strftime("%A %d %B %Y %H:%M:%S")

# Imprimirá una fecha como esta:
# 13-04-2020_22-23-06    
print(fecha_log)

# Imprimirá una fecha como esta:
# Monday 13 April 2020 22:23:06
print(fecha_humano)
```
Puedes ver más información sobre los parámetros para formatear <a href="https://docs.python.org/3/library/time.html#time.strftime" target="blank">aquí.</a>

Este es un ejemplo de como almacenar el resultado del comando `dmesg` del sistema operativo Linux, y que se almacene el resultado en un archivo con la fecha preformateada.
```
import subprocess
dmesg = subprocess.Popen(["dmesg"], shell=False,stdout=subprocess.PIPE)

from time import strftime as ConvertirTiempoLog
fecha_log = ConvertirTiempoLog("%d-%m-%Y_%H-%M-%S")
archivo_log = "dmesg_log_%s.log" % (fecha_log)

with open(archivo_log,'w') as dmesg_log:
   dmesg_log.write(dmesg.stdout.read().decode('utf-8'))
   dmesg_log.close()
```

## `calendar`
Muestra un calendario como el comando `cal` de Linux.
```
import calendar
calendar.month(2020,1)
# Nos mostrará:
    January 2020
Mo Tu We Th Fr Sa Su
       1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 29 30 31
```
Puedes hacer una combinación con el módulo `time` y `calendar`.
```
import time,calendar
anyo = int(time.strftime("%Y"))
mes = int(time.strftime("%m"))

#Imprimirá el calendario del año y me introducido.
print(calendar.month(anyo,mes))
```
O también puedes hacer que devuelva un calendario con valores específicos:
```
import calendar
anyo = int(input("Introduzca el año a consultar: "))
mes = int(input("Introduzca el mes: "))

#Imprimirá el calendario del año y me introducido.
print(calendar.month(anyo,mes))
```
Más información, en la documentación <a href="https://docs.python.org/3/library/calendar.html" target="blank">oficial.</a>
