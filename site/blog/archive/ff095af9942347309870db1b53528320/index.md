---
uuid: ff095af9942347309870db1b53528320
title: "La función `print()`"
slug: /posts/curso-de-python-funcion-print-type-y-ver-los-diferentes-tipos-de-datos
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - "Desarrollo"
---
Como hemos visto en la entrega anterior qué son los identificadores, vamos a trabajar un poco con algunos de ellos como las variables y explicaremos los tipos de datos haciendo uso de ellas.

<!-- truncate -->

¿Qué veremos en esta entrega?
* Cómo imprimir de forma sencilla textos o valores almacenados en las variables con la función `print()`
* Averiguar el tipo de dato con `type()`
* Tpos de datos como son las cadenas, constantes, números enteros, coma flotante...

# La función `print()`
Esta función se utiliza para imprimir valores por lo que nos podemos imaginar lo que podemos imprimir, resultados de funciones, valores asignados a variables, textos...etc.
```
print("Hello World")
```
Esta sentencia imprime en pantalla `Hello World`. Más adelante, veremos distintos usos de cómo utilizar esta función como por ejemplo, sustituciones de valores por variables...

# La función `type()`
Esta función nos permite averiguar el tipo de dato que estamos tratando.
``` 
>>> type("Hello World")
```
O asignándolo en una variable y después imprimirlo:
```
>>> type("Hello World")
```
Esto nos devolverá un mensaje como: `<class 'str'>` indicando que es un `str` o cadena.
Si probamos con un nº entero como el 2 nos devolverá `<class 'int'>`:
```
>>> type(2)
```
`type()` y `print()` son unas de las funciones más utilizadas, sobre todo para cuando tengamos que hacer depuración y revisar por qué en nuestro código hay cosas que no funcionan si estamos tratando con tipos de datos.

# Tipos de datos en Python (Literals)
* Cadenas o strings
* Constantes
* Númericos
* Especiales

##  Cadenas o _strings_ 
Se forman encerrando un texto utilizando ( _ " _ ) ó (  _''_ ). 

Por ejemplo: 
```
helloWorld = "Hello world"
helloWorld = 'Hello world'
```

Se puede definir cadenas con múltiples líneas:
```
helloWorldMessage = '''
Este es un mensaje para toda la civilización.
Todos(as) aquellos(as) que no se interesen por la historia,
estarán condenados(as) a repetir los mismos errores que se
cometieron en el pasado. '''
```

Obtener la primera letra de un `str`:
```
>>> mensaje = "Hola mundo"
>>> print(mensaje[0])
h
```

Obtener letras de un `str` a partir de un rango:
```
>>> mensaje = "Hola mundo"
>>> print(mensaje[0:4])
hola
```

Conseguir la posición de un `str` en un `str`:
```
>>> mensaje = "Hola mundo, me llamo sincorchetes y estamos en echemosunbitstazo.es"
>>> mensaje.find("me")
12
```
Si nos ponemos a contar (_desde 0 siempre_) caracter por caracter (_incluyendo los espacios y ,_), obtendremos el número 12.

Reemplazar un ´str´ dentro de un ´str´:
```
>>> mensaje = "Hola mundo, me llamo sincorchetes y estamos en echemosunbitstazo.es"
>>> mensaje.replace("sincorchetes","anonymous")
'Hola mundo, me llamo anonymous y estamos en echemosunbitstazo.es'
```

Separar un `str` cuando encuentre un caracter específico y devolver el resultado como una lista `list`:
```
>>> mensaje = "Hola mundo, me llamo sincorchetes y estamos en echemosunbitstazo.es"
>>> mensaje.split(" ")
['Hola',
 'mundo,',
 'me',
 'llamo',
 'sincorchetes',
 'y',
 'estamos',
 'en',
 'echemosunbitstazo.es']
```

Busca en el `str` un `str` y devuelve el nº de coincidencias:
```
>>> hi = "Hello"
>>> hi.count("l")
2
```
Convertir todos los caracteres de un `str` a mayúsculas:
```
>>> hi = "Hello"
>>> hi.upper()
'HELLO'
```
Convertir todos los caracteres de un `str` a minúsculas:
```
>>> hi = "HELLO"
>>> hi.lower()
'hello'
```
Convertir el primer caracter de un `str` en mayúscula:
```
>>> hi = "hello"
>>> hi.capitalize()
'Hello'
```
Obtener el valor máximo de un `str`:
```
>>> valor = "!#aBcDeFghI"
>>> max(valor)
'h'
```
Obtener el valor mínimo de un `str`:
```
>>> valor = "!#aBcDeFghI"
>>> min(valor)
'!'
```
## Constantes
Las constantes como su nombre indica son valores que no se modificarán a lo largo de la vida del programa. Sin embargo en Python no se declaran a lo mejor como en otro lenguaje tipo PHP. Para hacerlo en Python, tenemos que respetar una forma de trabajo y sintaxis específicas.
1. Crea un archivo llamado `constantes.py`
2. Define en el variables, todas en mayúsculas y seguidas de "_ _ _".
3. Importa tu archivo en tu proyecto.
4. Llama a la constante.

Veamos un ejemplo:
1. Creamos el archivo `constantes.py`
2. Añadimos las siguientes variables:
```
IP_SERVIDOR = '127.0.0.1'
PUERTO_SERVIDOR = 3306
NOMBRE_USUARIO = 'sincorchetes'
PASS_USUARIO = 'Foo1234'
NOMBRE_DB = 'Foo'
```
3. Creamos un archivo `main.py`
4. Importamos el archivo y mencionamos a la constante.
```
import constantes
print(constantes.IP_SERVIDOR)
```
Veremos que tendremos una salida:
```
127.0.0.1
```

Así definiríamos una constante en Python.

Por otro lado, Python tiene unas constantes integradas que no estaría más echarles un vistazo, no son muchas, pero viene bien <a href="https://docs.python.org/3/library/constants.html" target="blank">saberlas</a>.

## Números
Tenemos varios tipos de dato en Python como puede ser:
* `int`
* `long` (_no se usa más en Python 3_)
* `float`
* `complex`

### `int` o números enteros
* Este tipo de dato solo almacena números enteros (_positivos y negativos, nada de comas, ni decimales, ni fracciones_.
* Este tipo de dato no contiene ninguna restricción por parte del número de bits en Python y puede expandirse el límite de la memoria disponible.
* No se necesita ningún tipo de declaración especial para almacenar números muy largos.

```
>>> a = 1
>>> b = -2
>>> print(a - b)
3
```

### `float` o número de coma flotante
Si necesitas utilizar decimales, este es el tipo de dato que buscar.
```
>>> x = 20.30
>>> y = -33.99
>>> z = 100.12
>>> print(x - y - z)
-45.83
```

### `complex` o números complejos 
Se utilizan para diferentes tipos de cálculos aplicados a la geometría, física... La definición en Python es `a+bj`, dónde `a` es el número que se encuentra representado en los números reales; `bj` es el número imaginario.
```
>>> a = 2+3j
>>> print(a)
2+3j
```

### Tipos de datos especiales
Tenemos el valor `None` que viene a ser el valor `null` en otros lenguajes como SQL, se suele utilizar para declarar un campo con este valor _¡ojo, esto no quiere decir que esté vacío!_

En las siguientes entregas veremos cómo trabajar con módulos y algunos operadores para empezar a prácticar operaciones aritméticas y de validación.
