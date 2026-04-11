---
uuid: 51c362c9e9b24f9bb3c663879ece52c1
title: "Curso de Python - Intérprete, comentarios, identificadores y palabras clave"
slug: /posts/curso-de-python-interprete-comentarios-identificadores-y-palabras-clave
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Desarrollo
---
En esta entrega aprenderás:

<!-- truncate -->

* Algunos consejos básicos para trabajar con el intérprete de Python y crear archivos dónde trabajar con nuestro código
* Comentar en Python que es lo primero que deberíamos aprender cuando estamos aprendiendo lenguajes de programación
* Qué son los identificadores y algunas pautas que debemos seguir
* Qué son las palabras clave y por qué no se usan

# ¿Cómo usar Python?
Sin duda un elemento imprescindible para poder trabajar con Python son los modos en los qué podemos trabajar con él. Podemos hacerlo de dos formas, mediante intérprete de comandos o elaborando un archivo de Python.

## Intérprete de comandos
Si estas en Linux o BSD, puedes ver las múltiples (si hay), versiones instaladas en tu sistema si haces un simple: `whereis python` verás una salida como esta:
```
python: /usr/bin/python3.7-config 
/usr/bin/python2.7 
/usr/bin/python3.7m-x86_64-config 
/usr/bin/python /usr/bin/python3.7 
/usr/bin/python3.7m 
/usr/bin/python3.7m-config 
/usr/lib/python2.7 
/usr/lib/python3.7 
/usr/lib64/python2.7 
/usr/lib64/python3.7 
/usr/include/python2.7 
/usr/include/python3.7m
```
Como podemos ver, en mi sistema tengo instalados una versión de Python 3.7 como una 2.7. Es importante destacar que en el curso SIEMPRE trabajaremos con la rama 3.7 o superior porque la versión 2.7 quedó fuera de soporte desde el 31 de diciembre de 2019 y que prestaré más atención a SO Linux que *BSD.

### ¿Cómo sé que versión tengo por defecto en el sistema?
Si hacemos un `ls /usr/bin |grep python` veremos que un enlace simbólico está apuntado a una versión concreta.

```
lrwxrwxrwx.  1 root root              9 Jan 30 10:18 python -> ./python3
lrwxrwxrwx.  1 root root              9 Oct 21 15:13 python2 -> python2.7
-rwxr-xr-x.  1 root root          16072 Oct 21 15:13 python2.7
```

También se puede saber desde el gestor de paquetes que utilices a menudo en tu distribución de Linux o sistemas *BSD y/o ejecutando `python -V` que este te devolverá la versión:
```
$ python -V
Python 3.7.6
```

### Acceder al intérprete de Python
Basta con que ejecutemos el comando `python` para <a href="https://docs.python.org/3.8/tutorial/interpreter.html" target="blank"> empezar a trabajar.</a>
```
$ python
Python 3.7.6 (default, Jan  8 2020, 19:59:22) 
[GCC 7.3.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```
Vemos una información de todo un poco, con qué compilador fue compilado Python, qué versión estamos utilizando...etc

Hay una sintaxis mínima que tenemos que entender del promp cuando usamos el intérprete:
`>>>` se refiere a un código que puede ejecutarse sin identación por ejemplo cuando definimos una variable, una función...
```
>>> variable = 1
```
`...` aquí está mencionando que tenemos que indentar, es decir, añadir los espacios (4) correspondientes para respetar la sintaxis de Python.
```
>>> def func():
...    variable = 1
```
`'SALIDA'`: Cuando solo salen estas comillas simples, está informando de un valor o imprimiendo la salida de una función, variable...etc
```
>>> import sys
>>> sys.version
'3.7.6 (default, Jan  8 2020, 19:59:22) \n[GCC 7.3.0]'
```
#### Usarlo como calculadora
Se pueden realizar operaciones aritméticas (_ya las veremos más adelante_) como suma, resta, división, multiplicación...
```
>>> 3 + 2
5
```

#### ¿Cómo salir de la terminal?
Para salir podemos usar la función `exit()` o pulsar la combinación de teclas <kbd>Ctrl</kbd> + <kbd>C</kbd>

## REPL tu intérprete en línea
<a href="https://repl.it" target="blank">REPL.it</a> es una página que utilizaré mucho para dinamizar los ejemplos, se trata de un intérprete en línea que permite crear un entorno pequeño de Python y poder trabajar con él. En casi todos los ejemplos pondré un enlace para aquellas personas que quieran probar el código y no dispongan de intérprete.

## Creando un archivo Python
Los archivos de Python tienen la extensión `.py`, y comienzan siempre declarando la ruta del intérprete, a esto se le conoce como <a href="https://es.wikipedia.org/wiki/Shebang" target="blank">SheBang</a>. Por lo general, se suele utilizar la siguiente cabecera para evitar solapamientos con la versión 2.7.
`#!/usr/bin/env python3`

Python 3 utiliza la codificación <a href="https://docs.python.org/3/howto/unicode.html#unicode-literals-in-python-source-code" target="blank">UTF-8 por defecto</a>, por lo que si queremos trabajar con otro tipo de codificación tendremos que especificarla justamente debajo del SheBang.
```
#!/usr/bin/env python3
# -*- coding: latin-1 -*-
```
A partir de aquí añadimos nuestro código, que iremos aprendiendo a lo largo de las entregas de Python.

También es importante, que se le den permisos de escritura al archivo de Python para poderlo ejecutar desde terminal, si no obtendremos el error de permisos:
```
$ ./hola.py
bash: ./hola.py: Permission denied
$ chmod +x hola.py
$ ./hola.py
Hello world
```

Ya que sabemos esto, cuando en los comandos de ejemplo haga referencia a los diferentes tipos de prompt (`>>>`, `...` o `' '`) usamos directamente el intérprete y cuando no lo haga, estamos haciendo un archivo en Python. 

¡Una vez que sabemos esto, adelante!

# Comentarios
Algo muy importante sobre todo en nuestro código es comentar. Comentar nos permite recordar los cambios que hemos hecho en el código o tener al menos un punto de retorno porque cuando llevas muchas horas programando y programando, y revisando... dejas el código unos días, y te costará mucho entender y comprender todo el código de nuevo sin tener una ayuda de por qué decidimos hacer un cambio en la estructura, en el flujo del código...etc

## ¿Cómo se comenta en Python?
Si quieres <a href="https://docs.python.org/3.8/reference/lexical_analysis.html#comments" target="blank">comentar</a> una línea, puedes usar:
```
# Comentamos con la almohadilla
```
Cuando queremos comentar múltiples líneas, utilizaremos esta sintaxis:
```
"""
Este es un comentario multilínea.
:D
"""
```
_<a href="https://repl.it/@sincorchetes/comentarios" target="blank">Ver ejemplo dinámico aquí.</a>_

# Identificadores
Los identificadores son el nombre que se utilizan para identificar una variable, función, clases o un objeto.
Las principales reglas que se deben respetar son las siguientes:
* No se utilizan caracteres especiales o numéricos menos ( _ ) que se puede utilizar como un identificador
* Las palabras clave no se utilizan
* Python discrimina de mayúsculas y minúsculas por lo que no es lo mismo llamar a una función o variable `var` si está definida como `Var`.
* Indentar es obligatorio, hay que respetar los espacios cuando se crean funciones, clases o métodos.

## Variable
Las variables permiten almacenar un valor que le asignes como una cadena, un dato númerico, listas, tuplas... el tipo de valor lo veremos con más profundidad en entregas posteriores, pero hay que saber lo que hace este identificador y para que nos puede servir.
```
>>> variable = "Hello world"
```
## Funciones 
Permiten ejecutar un fragmento de código específico el cuál puede solicitar o no datos para la ejecución de dicho código.
```
>>> def nombre_funcion(argumentos):
...    # Bloque de código
```
Los argumentos se separan por comas.

## Bucles
Permiten recorrer un conjunto de datos como un `set|lista|tupla|collection`...etc o ejecutarse desde un rango específico como por ejemplo, de 0 a 100 o de 1 a 5...etc
### Bucle `for`
```
>>> for x in a:
...    # Bloque de código
```
Es el más común, pero no nos alarmemos que veremos más sobre los bucles en otras entregas posteriores.

## Clases
Las clases son la plantilla de los objetos, Python es un lenguaje de programación orientado a objetos, por lo que es indispensable este identificador.

### Propiedades
Son los atributos que tiene una clase, a fin de cuentas es como usar variables en otro contexto de programación.

### Métodos
Son las funciones o acciones que tiene una clase.

## Módulo
Son fragmentos de códigos externos o integrados en Python que realizan una serie de cosas, se puede conocer en otros lenguajes como librerías.

Pero no nos alarmamemos, todos estos identificadores los veremos más adelante de una forma más profunda.

# Palabras clave
Python como otros lenguajes, tienen una serie de palabras que no se deben utilizar bajo ningún concepto para utilizarlos como identificadores. Podemos averiguar cuáles son desde su <a href="https://docs.python.org/3/reference/lexical_analysis.html#keywords" target="blank">documentación oficial</a> o importando el módulo `keyword` y su propiedad `.kwlist`
```
>>> import keyword
>>> print(keyword.kwlist)
```
Nos devolverá esta salida:
```
['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```
_NOTA: Ver <a href="https://repl.it/@sincorchetes/palabrasclave" target="blank">ejemplo dinámico aquí</a>._
Todas estas palabras no se podrán utilizar como variables, nombres de lista, tuplas, diccionarios... porque su uso está reservado para otras finalidades.

También podemos averiguar si la palabra que estamos utilizando puede estar dentro de esta lista con su método `.iskeyword()`.
```
>>> keyword.iskeyword('pass')
```
Esto devolverá como resultado `True` porque es una palabra reservada.

Y con esto nos veremos en la siguiente entrega, espero que os haya gustado, un saludo.
