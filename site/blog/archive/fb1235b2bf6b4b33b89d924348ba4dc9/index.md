---
uuid: fb1235b2bf6b4b33b89d924348ba4dc9
title: "Mastering en Bash - Condicionales"
slug: /posts/mastering-bash-condicionales
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Sistemas
  - Linux
---
En esta entrega comenzaremos a ver los condicionales de los que disponemos en Bash. 

<!-- truncate -->

**Off-Topic: Vamos a resumir los artículos y separarlos por subcontenidos para hacer más ágil su lectura, lo hemos aprendido el post anterior [Mastering en Bash ~ Primero de Scripting](https://echemosunbitstazo.es/blog/mastering-bash-primero-scripting?target=_blank), en el que hemos inyectado mucha cantidad de contenido de golpe a pesar de ser muy útil, puede parecer pesada su lectura.**

# ¿Qué es un condicional?
Imaginémonos que vamos a comprar el pan y resulta de que o bien no hay, o bien sale más caro de lo que imaginamos, o bien no es el tipo que buscamos...etc, entonces tenemos que pensar ¿Qué hacer? y aquí entra en juego el uso de los condicionales.

Los condicionales son evaulaciones que aplicamos en determinados valores que obtenemos como resultado de una operación anterior, bloques de código que han sido ejecutados y que han devuelto alguna salida. Es decir, con el if **regularemos el flujo de trabajo de nuestro sript**, añadiendo diferentes situaciones para resultados diferentes.

# If

If permite añadir una situación diferente que en caso de que no se cumpla la condición, continuará ejecutando el resto del código. Este se puede elaborar en dentro de un script (_como haremos a partir de ahora_), o bien se puede ejecutar en una sola línea de ejecución en Bash.

Creamos un script dónde añadiremos el siguiente bloque de código.


```
estado="Cerrado"
parque=$estado

if [ $parque == "Cerrado"]
then
	echo "Está cerrado"
fi
```

Si ejecutamos el código de arriba, nos devolverá un mensaje de que se encuentra cerrado. Sin embargo, si cambiamos "Cerrado" => "Abierto". La cosa cambia, ya que no producirá una salida.

```
estado="Cerrado"
parque=$estado

if [ $parque == "Cerrado"]
then
	echo "Está cerrado"
fi
```

¿Por qué sucede esto? Porque como la condición no se cumple, ya que caracter-caracter se va comprobando que sean correctos dentro de la condición, en cuanto sea alguno de ellos distinto, se prosigue con el resto del código sin hacer nada al respecto. Si queremos decirle que ejecute otra instrucción de código utilizaremos la sentencia else.

```
estado="Cerrado"
parque=$estado

if [ $parque == "Cerrado"]
then
	echo "Está cerrado"
else
	echo "Está abierto"
fi
```

Pero... ¿Y si queremos añadir más condiciones? Un parque puede estar abierto, cerrado, en obras entre otras cosas. Para eso tenemos la sentencia if-elif

```
estado="Abierto"
parque=$estado

if [ $parque == "Cerrado"]
then
	echo "Está cerrado"
elif [ $parque == "Abierto" ]
then
	echo "Está abierto"
fi
```

Más estados...
```
estado="Obras"
parque=$estado

if [ $parque == "Cerrado"]
then
	echo "Está cerrado"
elif [ $parque == "Abierto" ]
then
	echo "Está abierto"
elif [ $parque == "Obras" ]
then
	echo "Está en obras"

else
	echo "Consulte al ayuntamiento de su ciudad"
fi
```

## Condicional en una simple linea

Se pueden escribir condicionales en una sola línea, acortando todo el bloque de código en una sola instrucción reduciendo el consumo de memoria y de procesamiento, pero aumentando la complejidad de lectura para el desarrollador.
```
if [ $parque == "Cerrado" ]; then  echo "Está cerrado" ; elif [ $parque == "Abierto" ]; then  echo "Está abierto" ; elif [ $parque == "Obras" ]; then echo "Está en obras" ; fi

```

## ¿Cómo evalúa if todo esto?
Los corchetes que incluimos como sintaxis del if, realmente esconden el comando `test(1)`. Este comando básicamente compara valores, por ejemplo:
```
[ 2 -eq 0 ]
```
Si hacemos un `echo $?` para ver el resultado de la ejecución del comando, nos saldrá un 1 como señal de ARCHIVOALSE.
```
[ 0 -eq 0 ]
```
Al hacer un `echo $?` nos mostrará el 0, de verdadero.

Lo mismo da utilizar los corchetes como llamar directamente al comando.
```
test 0 -eq 0
```
Veremos el resultado de la ejecución del comando, recordemos 0 es éxito !=0 puede ser un error.
```
echo $?
```

### Tabla de expresiones utilizadas
Las siguientes expresiones devuelven todas verdadero en su defecto en caso de que cumplan la condición. Para ver el resultado, hay que verificar la salida de la ejecución del comando con `echo $?`

| Expresión en terminal | Descripción |
|-----------|-------------|
| [ -a ARCHIVO ] | ARCHIVO existe |
| [ -b ARCHIVO ] | ARCHIVO existe y es un fichero especial de bloques |
| [ -c ARCHIVO ] | ARCHIVO existe y es archivo especial de caracteres |
| [ -d ARCHIVO ] | ARCHIVO existe y es un directorio |
| [ -e ARCHIVO ] | ARCHIVO existe |
| [ -f ARCHIVO ] | ARCHIVO existe y es un archivo regular |
| [ -g ARCHIVO ] | ARCHIVO existe y tiene el SGID asignado |
| [ -h ARCHIVO ] | ARCHIVO existe y es un enlace simbólico |
| [ -k ARCHIVO ] | ARCHIVO existe y tiene asignado _sticky bit_ |
| [ -p ARCHIVO ] | ARCHIVO existe y está nombrado como tubería (ARCHIVOIARCHIVOO) |
| [ -r ARCHIVO ] | ARCHIVO existe y tiene permisos de lectura |
| [ -s ARCHIVO ] | ARCHIVO existe y tiene un tamaño mayor que 0 |
| [ -t ARCHIVO ] | La descripción del fichero de ARCHIVO está abierta y se refiere a una terminal |
| [ -u ARCHIVO ] | ARCHIVO existe y tiene SUID asignado |
| [ -w ARCHIVO ] | ARCHIVO existe y puede escribirse en él |
| [ -x ARCHIVO ] | ARCHIVO existe y es un ejecutable |
| [ -O ARCHIVO ] | ARCHIVO existe y está gestionado por su usario |
| [ -G ARCHIVO ] | ARCHIVO existe y está gestionado por su grupo |
| [ -L ARCHIVO ] | ARCHIVO existe y es enlace simbólico |
| [ -N ARCHIVO ] | ARCHIVO existe y se modificó desde la última vez que se leyó |
| [ -S ARCHIVO ] | ARCHIVO existe y es un socket |
| [ ARCHIVO1 -nt ARCHIVO2 ]  | ARCHIVO1 se modificó antes que ARCHIVO2, o si ARCHIVO1 existe y ARCHIVO2 no |
| [ ARCHIVO1 -ot ARCHIVO2 ] |	ARCHIVO1 es más viejo que ARCHIVO2, o ARCHIVO2 existe y ARCHIVO1 no |
| [ ARCHIVO1 -ef ARCHIVO2 ] |	ARCHIVO1 y ARCHIVO2 se refieren al mismo dispositivo y número de inodo |
| [ -o OPNAME ] | Si la shell tiene la opción "OPTIONNAME" activdada `bash -o`|
| [ -z STRING ] | La longitud del STR es 0 |
| [ -n STRING ]  ó [ STRING ] |	Si la longitud de STRING no es 0 |
| [ STR1 == STR2 ] ó [ STR1 = STR2 ] | Si las cadenas son iguales |
| [ STR1 != STR2 ] | Si las cadenas no son iguales |
| [ STR1 < STR2 ] |	STR1 se ordena antes que STR2 según como esté la localización configurada |
| [ STR1 > STR2 ] |	STR1 ordena después de STR2 en base al idioma del sistema |


### Expresiones para números
Las siguientes condiciones solo son aplicables para números enteros, y devolverán verdadero en caso de cumplir la condición.

| Expresión en terminal | Descripción |
|-----------------------|-------------|
| [ N1 -eq N2 ]			| N1 es igual que N2 |
| [ N1 -ne N2 ]			| N1 no es igual a N2 |
| [ N1 -lt N2 ]			| N1 es menor que N2 |
| [ N1 -le N2 ]			| N1 es menor o igual que N2 |
| [ N1 -gt N2 ]			| N1 es mayor que N2 |
| [ N1 -ge N2 ]			| N1 es mayor o igual que N2 |

### Comparando múltiples valores
Se pueden anidar condiciones para un determinado valor o conjunto de valores como podemos ver a continuación gracias a los operadores lógicos.

`cmd1 && cmd2` => Si devuelve 0 (éxito), se ejecutará `cmd2`
`cmd1 || cmd2` => Si devuelve un número distinto a 0, se ejecutará `cmd2`

| Expresión en terminal | Descripción |
|-----------------------|-------------|
| [[ VAL1 -eq VAL2 && VAL3 -lt VAL1 ]] | Si el VAL1 es igual a VAL2 y a su vez, VAL3 es menor que VAL1, devolverá verdadero |
| [[ VAL1 == VAL2 || VAL1 > VAL3 ]] | Si VAL1 es igual a VAL2 o, VAL1 es menor que VAL3, devolverá verdadero |

# Referencias
* Ediciones ENI ~ Tercera edición LPIC-I
* The Linux Documentation Project ~ [TLDP](https://www.tldp.org/LDP/abs/html?target=_blank)
* Linux Man Pages ~ `help if`
