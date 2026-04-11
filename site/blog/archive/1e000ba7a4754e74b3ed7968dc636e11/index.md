---
uuid: 1e000ba7a4754e74b3ed7968dc636e11
title: "¿Qué es la conversión de números?"
slug: /posts/conversion-de-numeros
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Sistemas
---
En informática tendremos que enfrentarnos con varios problemas que requieren de soluciones distintas haciendo uso de la capacidad resolutiva para según que problemas con los que nos podamos encontrar en el ámbito de sistemas, haciendo uso de algoritmos para sacarnos de apuros en desarrollo Web, e incluso, haciendo un proceso de descartes en base a pruebas de rendimiento. 

<!-- truncate -->

Aquí todo es posible, sin embargo, también debemos aprender las unidades básicas con la que las máquinas trabajan para enviar información a bajo nivel, obtener un color para nuestros desarrollos Web...etc Todo esto lo aprenderemos aquí.

# Binario
Los números binarios son aquellos que están comprendidos entre 0 y 1 utilizando como base el 2. Esto representa la condición eléctrica, es decir, 0 es apagado y 1 es encendido.

## Binario => Decimal BIN->DEC
Para convertir de binario a decimal tenemos dos formas de hacerlo.

* Mediante el uso de una tabla exponencial
* Tabla de exponentes

### Mediante posición
Para convertir mediante posición, lo único que deberemos hacer, es saber en qué posición tenemos cada número y utilizar las potencias.

110101<sub>(2)</sub> => Decimal
```
((1*2⁵)+(1*2⁴)+(0*2³)+(1*2²)+(0*2¹)+(1*2⁰)) =
((1*2⁵)+(1*2⁴)+(1*2²)+(1*2⁰)) = 53(10)
```

53<sub>(10)</sub> es nuestro número decimal.

### Tabla de exponentes
Dibujamos una tabla en relación al número que creemos que podamos obtener.

|128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|----|----|----|----|---|---|---|---|
| 2⁷ | 2⁶ | 2⁵ | 2⁴ | 2³| 2²| 2¹| 2⁰|

Y en base al número que nos den, comenzamos a comparar de menor a mayor. 
Por ejemplo:

| Nº  |128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|-----|----|----|----|--- |---|---|---|---|
| 105 | 0  | 1  | 1  | 0  | 1 | 0 | 0 | 1 |

## Binario => Hexadecimal
Tenemos que tener en cuenta la siguiente equivalencia:

| Hexadecimal | Binario |
|-------------|---------|
|			0 | 0000	|
|			1 | 0001	|
|			2 | 0010	|
|			3 | 0011	|
|			4 | 0100	|
|			5 | 0101	|
|			6 | 0110	|
|			7 | 0111	|
|			8 |	1000	|
|			9 |	1001	|
|		    A | 1010	|
|		    B | 1011	|
|		    C | 1100	|
|		    D | 1101	|
|		    E | 1110	|
|		    F | 1111	|

Para convertir tan solo necesitaremos traducir cifra por cifra en base a esta tabla. 
Por ejemplo: 1010111101100100

```
1010 = A
1111 = F
0110 = 6
0100 = 4
```

Nuestro número es: AF64

## Binario -> Octal
Tenemos que tener presente la siguiente equivalencia:

| Decimal| Binario |
|--------|------|
|	   0 | 000	|
|	   1 | 001	|
|	   2 | 010	|
|	   3 | 011	|
|	   4 | 100	|
|	   5 | 101	|
|	   6 | 110	|
|	   7 | 111	|

El octal solo hace uso de 3 bits, y no de 4 como el decimal o hexadecimal. Tomaremos los 3 primeros bits y los separamos para hacer la conversión.

```
1 010 010 111(2) = x(8)

1 010 111 => Vemos como el 1 está solo, por ello, le añadimos 2 ceros para normalizarlo.
001 010 111.
```
Nuestro número es: 127<sub>(8)</sub>

# Decimal
Son números comprendidos entre 0 y 9, hacen uso de base 10. Estos se suelen utilizar mucho para representar la numeración IPv4, obtener un color para aplicarlo en desarrollo Web mediante la función `rgb/rgba()`...etc

## Decimal => Binario DEC->BIN
Para convertir de binario a decimal tenemos dos formas de hacerlo.

* Mediante división
* Tabla exponencial

### División
Para convertir de decimal a binario, simplemente tenemos que tener en cuenta el resto de la división, ignorar los decimales y continuar dividiendo el número del cociente hasta que ya no pueda dividirse más. Para reconstruir el número, se seleccionan de derecha a izquierda.

Por ejemplo: 
```
362|2 = 0
181|2 = 1
 90|2 = 0
 45|2 = 1
 22|2 = 0
 11|2 = 1
  5|2 = 1
  2|2 = 0
  0|2 = 1
```

101101010

### Tabla de exponentes
Dibujamos una tabla en relación al número que creemos que podamos obtener.

|128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|----|----|----|----|---|---|---|---|
| 2⁷ | 2⁶ | 2⁵ | 2⁴ | 2³| 2²| 2¹| 2⁰|

Y en base al número que nos den, comenzamos a comparar de menor a mayor. 
Por ejemplo:

| Nº  |128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|-----|----|----|----|--- |---|---|---|---|
| 105 | 0  | 1  | 1  | 0  | 1 | 0 | 0 | 1 |

## Decimal -> Hexadecimal

Dividimos el número entre 16 utilizamos el cociente para seguir dividiendo sin utilizar los decimales resultantes. Posteriormente, para obtener el resto, se multiplica el decimal obtenido de la división por 16 que es la base para obtener el resto.

Por ejemplo:
2937<sub>(10)</sub> -> x<sub>(16)</sub>
```
2937|16 = 183.5625 -> Resto = 0.5625*16 = 9
 183|16 = 11.4375 -> Re = 0.4375*16 = 7
  11|16 = 0.6875 -> Re = 0.6875*16 = B
```

Con lo que nuestro nº es: B79<sub>(16)</sub>

## Decimal -> Octal
Se divide el número decimal entre 8, se desestiman los decimales, y el último número que ya no puede ser divisible se queda tal cual como resto formando parte del nº. Se lee de derecha hacia la izquierda.

```
210(10) = x(8)

210|8 = Resto =2
 26|8 = Re = 2
  3|8 = Re =3
```

Nuestro número es: 322.

# Hexadecimal
Estos números son muy utilizados sobre todo cuando queremos manipular cierta información de archivos, contemplan un rango entre 0 y F, siendo F el número 15, hace uso de base 16.

## Hexadecimal => Decimal 
Para convertir de hexadecimal a decimal 

Utilizamos las posiciones de los números y los multiplicamos por el resultado de su base.

```
B79(16) = x(12)

B*16² + 7*16¹ + 9*16⁰ =
11*256 + 7*16 + 9*1 =
2816+112+9 = 2937(10)
```


## Hexadecimal => Binario
Tenemos que tener en cuenta la siguiente equivalencia:

| Hexadecimal | Binario |
|-------------|---------|
|			0 | 0000	|
|			1 | 0001	|
|			2 | 0010	|
|			3 | 0011	|
|			4 | 0100	|
|			5 | 0101	|
|			6 | 0110	|
|			7 | 0111	|
|			8 |	1000	|
|			9 |	1001	|
|		    A | 1010	|
|		    B | 1011	|
|		    C | 1100	|
|		    D | 1101	|
|		    E | 1110	|
|		    F | 1111	|

Para convertir tan solo necesitaremos traducir cifra por cifra en base a esta tabla. 
Por ejemplo: A7F0

```
A = 1010
7 = 0111
F = 1111
0 = 0000
```

Nuestro número es: 1010011111110000

## Hexadecimal -> Octal
Realizar este proceso de conversión no es un método directo. Primero hay que traducir de HEX->BIN y luego de BIN->OCT para obtener el valor.

```
E67(16) = x(8)

E(16) = 1110(2)
6(16) = 0110(2)
7(16) = 0111(2)

Nº convertido= 111001100111
```
Una vez obtenido el binario, lo pasamos a octal.

```
111001100111(2) = x(8)

111 001 100 111 = 7147(8)
```

Nuestro número es 7147<sub>(8)</sub>

# Octal
Útil pero menos visto, nos permite obtener un número comprendido entre 0-7, hace uso de base 8.

## Octal -> Decimal

Se tiene en cuenta la posición de la cifra, ya que luego se multiplica por su base, y a su vez, la base se multiplica por sí misma tantas veces tenga n en el exponente.

```
7147(8) = x(10)

7*8³ + 1*8² + 4*8¹ + 7*8⁰ = 3584 + 64 + 32 + 7
```

Nuestro número es: 3,687

## Octal -> Binario
Básicamente utilizamos 3 bits por dígito, hay que tener en cuenta la siguiente equivalencia:

Tenemos que tener presente la siguiente equivalencia:

| Decimal| Binario |
|--------|------|
|	   0 | 000	|
|	   1 | 001	|
|	   2 | 010	|
|	   3 | 011	|
|	   4 | 100	|
|	   5 | 101	|
|	   6 | 110	|
|	   7 | 111	|

7420<sub>(8)</sub> -> x<sub>(2)</sub>
```
7 = 111
4 = 100
2 = 010
0 = 000
```

Nuestro número es: 111100010000<sub>(2)</sub>

## Octal -> Hexadecimal

Como hemos dicho anteriormente, es un proceso que no se hace directo y hay que hacer uso del paso anterior para obtener el número hexadecimal.

7456(8) -> x(2)
```
7 = 111
4 = 100
5 = 101
6 = 110

Nº binario: 111100101110
```

Para obtener el número hexadecimal, bastará con separar 4 bits los dígitos del nº binario.
```
1111 0010 1110(2) -> x(16)

1111 = F
0010 = 2
1110 = E
```

Nuestro número es: F2E

# Finalizando
¡Espero que aprendáis mucho! Al principio puede costar, pero con la práctica terminas haciendo las operaciones casi al instante.

¡Un saludo!

# Fuentes
* [Wikipedia](https://wikipedia.org?target=_blank)
* [Conversor números](https://coderstoolbox.net/number?target=_blank)
* [Youtube](https://youtube.com?target=_blank)
* [Calculadora Conversor](https://www.calculadoraconversor.com?target=_blank)
* [Img de cabecera](https://es.wikipedia.org/wiki/Archivo_binario#/media/File:Binary_file.png?target=_blank)
