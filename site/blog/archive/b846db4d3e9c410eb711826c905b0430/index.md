---
uuid: b846db4d3e9c410eb711826c905b0430
title: "Mastering CSS - Primeros pasos"
slug: /posts/mastering-css3-primeros-pasos
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Desarrollo
---
CSS proviene del inglés _Cascade Style Sheet_ traducido al español como hoja de estilos en cascada que como su nombre propio indica, le atribuye estilo como colores, formas, bordes, dimensiones a determinados elementos o un conjunto de elementos de una página elaborada con lenguaje de etiquetado HTML.

<!-- truncate -->

# ¿Por qué CSS y no CSS3?
CSS ha tenido varias versiones a lo largo de los años, CSS2 según el portal de documentación Mozilla Developer, necesitó de 9 años para su estandarización desde agosto del 2002 hasta junio del 2011. Con lo que hace lento su normalización. Sin embargo, adaptaremos el contenido para la última pre-versión.

# Reglas 

En el CSS tenemos lo que se llaman reglas con las que _estilizar_ los elementos del documento Web. Estas reglas están formadas por un selector que es un elemento Web como puede ser un anclaje (`<a>`); un párrafo (`<p>`), una tabla (`<table>`)... una propiedad que puede ser común para muchos elementos como `color` para un texto, anclaje... y un valor que suele determinarse según lo que tengamos que declarar en la propiedad, ya sean píxels, porcentajes, números y texto...etc Tanto la propiedad como el valor, van incluídos dentro de llaves `{}`

```
| Selector |
  --------			 Valor
  	 |		     | -------- |
  	 body {			   |
  	 	font-family: Sans;
  	 	-----------
  	 	     |
  	 	 Propiedad

  	 }
```

*NOTA: Se pueden añadir tantas propiedades como uno quiera, o el selector lo permita.*

## Prioridad
Cuando nosotros declaramos una regla a un elemento padre que engloba a muchos hijos tipo `body`. Todos los elementos heredarán las propiedades junto con el valor y se representarán como tal (siempre que el elemento lo permita). Sin embargo, cuando hacemos reglas específicas, siempre prevalecerán las específicas sobre las general. Por ejemplo, si tenemos un `body` con un color de fondo en negro, y párrafos con un fondo rojo. Los párrafos utilizarán de fondo el color rojo que se interpreta aquí como un subrayado.

# Maneras de introducir CSS
Existen 3 formas de enmaquetación Web con las hojas de estilo que pueden alternarse entre sí, pero es preferible escoger 1, y a ser posible la última de todas estas. Más que nada por legibilidad del código y la propia separación de los demás lenguajes de marcas como es HTML del de programación Web como Javascript entre otros.
1. Etiqueta `<style>`
2. Atributo `style=""`
3. Fichero separado `.css`

## Etiqueta `<style>`
Esta etiqueta se añade al elemento `<head></head>` la etiqueta `<style></style>` en la cuál, declararemos nuestro código CSS.

Ejemplo:
```
<head>
	<style>
		body {
			background-color: black;
			color: green;
			font-family: Sans;
		}
	</style>
</head>
```

## Atributo `style=""`
Se le puede designar a un elemento un estilo más específico como un atributo.

Por ejemplo:
```
<body>
	<h1>Cuando éramos jóvenes</h1>
	<p style="color:brown"> Correteábamos en la playa con un cubito que llenábamos de agua del mar para hacer nuestros castillos más fuertes, mientras que otros en otras zonas de la península....</p>
</body>
```

## Fichero separado .css
Sin duda alguna, esta es la mejor forma de enmaquetar una paǵina Web. Tener un directorio en nuestro proyecto llamado `css/` al que añadir todas nuestras hojas de estilo personalizadas sin tener que buscar dentro de 1000 líneas de css.

Para incluirna en nuestra Web, bastará con añadir la siguiente etiqueta en `<head></head>`
```
<link rel="stylesheet" href="css/example.css">
```

Pongámos un ejemplo:

```
/var/www/html/mi_pagina
|
|-- doc.html
|-- css/
	 |
	 |-- example.css
```

doc.html
```
<!DOCTYPE html>
<html>
	<head>
		<title>Mi primera página Web</title>
		<meta author="Álvaro Castillo">
		<meta keywords="web, html5, css">
		<link rel="stylesheet" href="css/example.css">
	</head>
	<body>
		<h1>Cuando éramos jóvenes</h1>
		<p> Correteábamos en la playa con un cubito que llenábamos de agua del mar para hacer nuestros castillos más fuertes, mientras que otros en otras zonas de la península....</p>
	</body>
```

example.css
```
body {
	background-color: yellow;
	font-size: 20px;
}
p {
	font-family: Sans;
	color: cyan;
}
```

El resultado:
* Fondo en todo el body de color amarillo.
* Tamaño fuente general para todos los elementos de la página a tamaño 20
* Tipo de familia de la tipografía que utilizarán los párrafos es Sans.
* Color de las letras de todos los párrafos utilizará el color Azul Cian.

## Enmaquetación básica
A continuación veremos algunas propiedades con las que podremos jugar con diferentes elementos.

### Fuentes
Las fuentes son muy importantes para el diseño de nuestro proyecto. No solo porque le otorgamos un cierto caracter y estilo, sino porque también ayudaremos al lector a poder comprenderlo y sobre todo qué sencación de seguridad podemos darle. Recordemos que las fuentes influyen en el punto de vista del lector que pueden determinar insconcientemente algunos sentimientos como bien se recoge en algunos artículos de la [psicología de la tipografía](https://www.websa100.com/blog/psicologia-de-la-tipografia?target=_blank).

#### Tamaño de letra
Cuando queremos modificar el tamaño de las fuentes de nuestro documento, nos encontramos con una propiedad clave como `font-size`. Esta nos permite asignar un valor que se puede declarar como %, unidades de longitud, una cadena como valor y/o em.

* Los porcentajes tienden muchas veces a fallarnos y a no comportarse como uno quiere ya que los navegadores no los interpretan igual, mencionar que está disponible para utilizarse pero que no son recomendados.
* Por otro lado, tenemos diferentes medidas de longitud como los píxeles (px), centímetros (cm)...
	* Una medida interesante es el `em`, es un tamaño relativo de fuente. Si utilizamos 2 ems quiere decir que equivale 2 veces el tamaño de la fuente actual. Suele utilizarse mucho en diseños "responsive"
* medium, xx-small, small, large, x-large, xx-large, initial, inherit...: Son valores no numéricos que predefinen el tamaño de una fuente.

#### Colores
Los colores pueden mostrase de diversas formas y diferentes esquemas del color:
* Palabras clave
* Esquema RGB 
* Esquema HSL
* Canales alfa

##### Palabras clave
Éstas contienen un código hexadecimal que ya interpreta el navegador directamente a pesar de ser un código hexadecimal encubierto no requiere más que utilizar la palabra clave para su uso.
* cyan: Azul Cian
* pink: Rosa
* yellow: Amarillo
* brown: Marrón
* blue: Azul

Y así un sin fin más, podemos ver una lista completa a través de la página de la [w3](https://www.w3.org/TR/css-color-3/#svg-color?target=_blank).

##### RGB
[_Red Green Blue_](https://es.wikipedia.org/wiki/Modelo_de_color_RGB?target=_blank) es un modelo de color que trabaja con los colores primarios, y que a su vez, la mezcla de estos generan diferentes colores aplicando una intensidad de color diferente en cada uno de estos 3 colores. Este modo de color pueden llegar a crear 16.7 millones de colores solo haciendo uso de estos 3 colores.
Para poder darle un valor, se utiliza numeración decimal que va desde el 255 (saturación máxima de colores) hasta el 0 (ausencia total de color), o bien, mediante representación hexadecimal completa o abreviada.

| Color | Valor decimal | Valor hexadecimal | Hexadecimal abreviado |
|-------|---------------|-------------------|-----------------------|
| Rojo  | 255 0 0		| ##FF0000			|	#FF0 				|
| Verde	| 0   255 0		| ##00FF00			|	#0F0				|
| Azul	| 0   0  255	| ##0000FF			|   #00F 				|

*NOTA: En el [artículo anterior](/posts/conversion-de-numeros), explicamos como pasar de decimal a hexadecimal o viceversa. La representación abreviada del hexadecimal, solo puede hacerse si coinciden las 3 primeras cifras de cada color. F= Rojo, F=Verde, F=Azul*

##### HSL
[HSL](https://es.wikipedia.org/wiki/Modelo_de_color_HSL?target=_blank) o _Hue, Saturation, Lightness_ es un modo de color basado en matriz, saturación y luminosidad. La matriz comprende un valor entre 0 y/o 360 refiriéndose a los grados en los que rotará en el espectro de colores. Mientras que la saturación y el brillo tiene una relación en porcentajes comprendidos entre 0 y 100.

##### Canales alfa
El canal alfa se añadió en CSS3 como una mejora para añadir cierto efecto a las fuentes añdiendo un grado de transparencia tanto para el modo de color RGB como para el HSL, eso sí, no podemos declararlo en valores hexadecimales.

#### Propiedades

Aquí dejamos una lista con algunas propiedades y sus valores para trabajar con el texto:

* `font-size: px|%|small,large...`: Permite establecer el tamaño de la fuente mediante:
	* Unidad de longitud (px, cm, em...)
	* Porcentaje
	* Palabras clave como medium, small, large... 
* `font-family; a,b,c,d...`: Permite definir que tipografía utilizar, y sobre todo, en caso de que no la tenga el sistema o no se descargue bien de un CDN, mostrar la siguiente fuente especificada.
* `font-style; normal|italic|oblique`: Muestra como se verá la fuente:
	* `normal`: Formato limpio
	* `italic`: Tipo itálica, en HTML sería lo equivalente a -> `<em></em>`
	* `oblique`: Parecido a itálica, pero con otro estilo
* `font-weight: normal|bold`: Permite añadir negrita o no
* `color: valor:`: Establece un valor para la fuente:
	* RGB => Hexadecimal: `#000000`
	* RGB => Hexadecimal abreviado: `#000`
	* RGB => Decimal:	`rgb(rrr,ggg,bbb)`
	* RGB => Decimal con canal alfa: `rgba(rrr,ggg,bbb,A)`
	* HSL => `hsl(grados,%,%)`
	* HSL => Con canal alfa: `hsla(grados,%,%,A)`
* `background-color:`: Establece un subrayado en la fuente parecido al que utilizamos para recalcar lo importante en los libros, se pueden declarar los mimos valores de la propiedad color.

# Finalizando
En las siguientes entregas hablaremos sobre la teoría de las cajas, modificar vistas en relación a la resolución de pantalla, jugar con los selectores y frameworks más utilizados.

¡Un saludo!

# Fuentes
[Wikipedia](https://www.wikipedia.org?target=_blank)
[W3](https://www.w3.org?target=_blank)
[Mozilla Developer Portal](https://developer.mozilla.org/es/docs/Web/CSS?target=_blank)
[LenguajeCSS](https://lenguajecss.com/p/css/propiedades/colores-css?target=_blank)
[CSS3 banner](http://www.makdigitaldesign.com/web-design/css3s-new-font-display-property-is-here?target=_blank)
