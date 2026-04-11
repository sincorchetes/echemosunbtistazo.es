---
uuid: dd6791a1cfa94ab786551217086b1cde
title: "Gestión y administración de usuari@s y grupos en Linux"
slug: /posts/usuarios-y-grupos-linux
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
# Algunos conceptos

<!-- truncate -->

Linux al igual que otro sistema operativo basado en UNIX, por herencia obtiene uno de los hitos que marcó un antes y después en la era de los sistemas, y es el término **multiusuario**. Esto quiere decir que nos permite tener diferentes cuentas de distintos usuari@s iniciadas en el sistema corriendo **n** procesos a la vez pertenecientes a cada usuario. Anteriormente, si querías hacer uso del sistema y otra persona quería utilizarlo, no podías ya que tod@s disponían de una sola sesión de usuario, sin embargo con los avances que hicieron en el pasado, sacaron adelante esta magnífica característica, la del **multiusuario**.

# Usuari@s
L@s usuari@s son personas que tienen un determinado nivel de acceso tanto a la empresa dónde resida el equipo al que pueden acceder y operar, como en su equipo personal. A nivel lógico, esto se conoce como cuentas de usuari@, las cuáles contienen como mínimo un nombre para la cuenta siendo este el nombre de usuari@ y una contraseña. No obstante, l@s desarrolladores de sistemas operativos o de cualquier otro tipo de software intentan simplificar el tratamiento de las cuentas de usuarios mediante un ID numérico, ya que se consume menos recursos buscando números que letras.

En Linux, esos ID asignados a los usuarios se les denominan UID _User Identifier_ o identificador de usuario. Según la distribución, el primer usuario o la primera usuaria del sistema, este establece un UID de 1000, y comienza a sumarse +1 a los posteriores UID creados. También, se añade un grupo nuevo al sistema con el mismo nombre de la cuenta del usuario o de la usuaria y se establece como un grupo primario con el mismo ID.

## ¿Cómo crear un(a) usuari@?
Como norma general y es altamente recomendado hacer uso de los comandos `useradd(8)` o `adduser(8)` podríamos crear un(a) usuari@ a mano, haciendo los siguientes pasos y como usuario root o haciendo uso de `sudo(1)`:

1. Averiguamos cual es el último UID/GID antes de crear nuestr@ usuari@
	* `grep 100* /etc/group`
	* `grep 100* /etc/passwd`
2. Modificar la entrada del fichero `/etc/passwd` **haciendo uso de `vipw(8)`** añadiendo la información mínima para tener un(a) usuari@, vamos ha hacerlo con "pepito":
	* `pepito:x:1004:1004::/home/pepito:/bin/bash`
3. Creamos un grupo para nuestro usuario `/etc/group`
	* `pepito:x:1004:`
4. Creamos una entrada en `/etc/shadow` mediante haciendo uso de `vipw -s`:
   _NOTA:Para saber que algoritmo cifrado utilizar, podemos comprobarlo en el fichero `/etc/login.defs`, en la variable `ENCRYPT_METHOD` lo que pasa que utiliza el sistema un salto o varios (lo desconocemos) para generar la contraseña a parte de la codificiación. Para visualizar el prefijo que necesitamos se puede consultar en `man 3 crypt`_
	* `$1$`: MD5
    * `$2a$`: Blowfish
    * `$5$`: SHA-256
    * `$6$`: SHA-512

Sin embargo, es **altamente recomendable** generar una contraseña nueva haciendo uso del comando `passwd(1)`, ya que esta genera la contraseña con el salto correcto, el algoritmo correcto y se genera automáticamente la entrada en `/etc/shadow`: `passwd pepito`

5. Creamos el directorio: `/home/nombre_usuari@`
6. Creamos el archivo: `/var/spool/mail/nombre_usuari@`
7. Copiamos los archivos `/etc/skel/* en /home/nombre_usuari@`
8. Fijamos los permisos correspondientes usuari@/grupo al directorio `/home/nombre_usuari@` `nombre_usuari@:grupo_usuari@` + `chmod 700`
9. Declaramos los permisos `chmod 660 /var/spool/mail/nombre_usuari@`

Y listo, tendremos a nuestr@ usuari@ cread@. No obstante, este proceso, además de ser tedioso, complejo y propenso a errores, es preferible hacer uso de unos comandos que nos facilitan crearlo.

### `useradd(8)`
Con este comando generamos un(a) usuari@ en ¡menos que canta un gallo! Todo lo que tenemos que hacer es:
```
sudo useradd pepito -m 
sudo passwd pepito
```
Y ya directamente tenemos usuari@ con su directorio `/home` y `/var/spool/mail` por defecto con sus correspondientes permisos, con la entrada correctamente creada en el fichero `/etc/passwd`, `/etc/shadow` y `/etc/group` listo para identificarse.

¿Fácil verdad? También hay que tener en cuenta, que la configuración por defecto del comando `useradd(8)` que se encuentra en `/etc/default/useradd`, ya que puede haber otras distribuciones que tengan otros parámetros, o directamente, no contenga ningún fichero y hay que especificarlo de forma manual tal que así:
```
sudo useradd pepito -m -k /etc/skel -U
sudo passwd pepito
```
 * `-m`: Genera un directorio en `/home` con el nombre de pepito
 * `-k /etc/skel`: Copia los archivos básicos para que funcione plenamente `bash(1)`
 * `-U`: Crea un grupo con el mismo nombre que el usuario

### `adduser(8)`
Si no tenemos suficiente con el anterior, podemos hacer uso de `adduser(8)`. Es un comando parecido al anterior, no hay mucha diferencia de usabilidad al menos en Linux. En FreeBSD, este comando tiene por defecto un asistente interactivo que nos va preguntando paso por paso cómo crearlo facilitándonos un poco la tarea. Este comando toma los valores para crear el usuario del fichero `/etc/default/useradd` como el comando anterior.

## Ficheros implicados en el uso de ambos comandos
Según el `man` de ambos comandos, tenemos una serie de ficheros implicados cuando ejecutamos uno de los dos comandos para crear el o la usuari@.

* `/etc/passwd`: Archivo clave con la información de la cuenta de usuari@
* `/etc/shadow`: Información sobre la seguridad de la cuenta de usuari@
* `/etc/group`: Grupos con sus correspondienes GID, usuari@s unid@s...
* `/etc/gshadow`: Información relevante sobre la seguridad de los grupos
* `/etc/default/useradd`: Esquema por defecto sobre cómo crear la cuenta de usuari@
* `/etc/skel/`: Directorio que contiene ficheros por defecto para el/la usuari@
* `/etc/login.defs`: Configuración del cifrado de las contraseñas, permisos...etc


## ¿Cómo autenticarse con un(a) usuari@ en nuestra sesión?
Si nos encontramos logeados mediante nuestr@ usuari@ rutinario, pero queremos acceder a otras cuentas del sistema, podemos hacerlo haciendo uso del comando `su(1)`.

Estamos en la cuenta de pepito, y queremos pasar a la de susana.
```
su - susana
```

## ¿Cómo modificar la información de un(a) usuari@?
Tenemos un comando (_¿Cómo no?_), para modificar y actualizar la información de nuestr@ usuari@. Este comando se llama `usermod(8)`. Entre otras cosas, nos permite bloquear una cuenta, actualizar y gestionar lá fecha de demora y fecha límite para cambiar la contraseña, añadir un usuario a grupos secundarios...

Por ejemplo, bloquear una cuenta
```
sudo usermod -L pepito
```
Si vemos el `/etc/passwd`, habrá añadido delante de la contraseña una (!), eso quiere decir que se encuentra bloqueada la cuenta.

Desbloqueando la cuenta:
```
sudo usermod -U pepito
```

Añadiendo un(a) usuari@ a un grupo nuevo
```
sudo usermod -a -G pepito video
```

Cambiando el grupo principal
```
sudo usermod -g users pepito
```

Modificando el shell del/la usuari@
```
sudo usermod -s /bin/bash pepito
```

Cambiando el directorio de trabajo
```
sudo usermod -d /srv pepito
```

Insertando un comentario
```
sudo usermod -c "Comentario" pepito
```

Podemos obtener más información accediendo al `man(1)` de `usermod(8)`

## ¿Cómo eliminar un(a) usuari@?
Como la mayor parte de las cosas en Linux o sistemas UNIX-like, se puede hacer prácticamente todo a mano, esto se puede hacer al sentido inverso cuando creamos el/la usuari@ en el sistema.

1. Eliminar la entrada del usuario pepito de `/etc/passwd` haciendo uso de `vipw(8)`
2. Destruir el directorio `/home/pepito` o el asignado, en caso de haber escogido otro directorio
3. Eliminar el fichero del directorio `/var/spool/mail/pepito`
4. Quitar el grupo que se creó junto con el/la usuari@ por defecto del fichero `/etc/groups` pero haciendo uso de `vigr(8)`

Y si queremos evitarnos tanta historia, bastará con hacer uso del comando `userdel(8)`
Tan solo con ejecutar:
```
sudo userdel -r pepito
```

Habremos hecho todos los pasos anteriores con un sencillo comando.

## ¿Directorio de trabajo?
Tod@s l@s usuari@s poseen un entorno de trabajo por defecto que se encuentra en el directorio `/home`. Este entorno de trabajo contiene el nombre de la cuenta del/la usuari@ y le permite trabajar en él y que, por defecto, se van almacenando archivos de configuración de programas entre un largo etcétera.

## ¿Super usuario?
Existe un usuario por defecto creado en el sistema llamado _root_. Este usuario por defecto en todos los sistemas UNIX, UNIX-like como Liux, FreeBSD, Minix...etc tiene acceso a tod@s los archivos, carpetas, operaciones con dispositivos, procesos... del sistema. Es muy importante utilizarlo lo menos posible y **nunca** revelar su contraseña, o ejecutar aplicaciones sobre todo gráficas con este usuario.

# Grupos
Por lo general, los grupos son agrupaciones de personas que tienen un objetivo en común, si bien pueden ser personas que tienen el mismo gusto por ver a su cantante favorito como obtener los mejores diseños de sus productos para una empresa. En nuestro caso, los grupos permiten formar un conjunto de usuari@s que desempeñen un rol determinado dentro del sistema. Creando, modificando documentos que ell@s hayan generado pero que otr@s que no pertenezca a dicho grupo no tengan permisos para hacerlo. Un usuario, o una usuaria puede formar parte de más de un grupo a la vez, pero por defecto, tienen un grupo primario al que pertenecen.

Los grupos como l@s usuari@s, contienen un ID que faciliten su recuperación dentro del sistema, en este caso se llama GID de _Group Identifier_ o Identificador de grupo. El sistema por defecto tiene unos grupos ya asignados para determinadas actividades del mismo para diferentes tareas como el acceso a los dispositivos de audio y video entre otras cosas.


## ¿Grupos primarios?
Los grupos primarios son algo así como el grupo principal al que pertenece un/una usuari@. Cada archivo que cree o modifique deberá contener el mismo grupo o si no, no podrá hacerlo a menos que se encuentre añadido a un grupo secundario. Un grupo primario como su nombre indica, es el primer grupo al que pertenece y por ende solo podrá tener un GID asociado a la cuenta. Sin embargo, una cuenta de usuari@ puede pertenecer a muchos grupos secundarios.

# ¿Cómo Linux sabe qué hace una cosa y un grupo otra?
Existen una serie de ficheros clave que todo administrador debe saber que existen:
 * `/etc/passwd`: Contiene los nombres de usuario, contraseñas (en antiguas versiones que no usen `shadow(5)`, UID, GID, descripción, directorio de trabajo y el intérprete de comandos que utilice. Cuando en el campo de la contraseña se encuentra una "x" quiere decir que hace uso del archivo `/etc/shadow`
 * `/etc/shadow`: Es un fichero que contiene todas las contraseñas ya sean de grupos o de usuari@s cifradas en un algoritmo determinado por el sistema, se utiliza para evitar que las contraseñas se puedan leer en `/etc/passwd` ya que tod@s l@s usuari@s tienen acceso lectura. Este archivo contiene:
 	* Nombre de la cuenta de usuari@
 	* Contraseña encriptada, o bien puede incluir (!) que aparece como cuenta bloqueada en el sistema, un ejemplo de esto es cuando creamos una nueva cuenta sin haberle asignado una contraseña.
 	* Fecha del último cambio de contraseña, si se encuentra vacío, es que no están habilitadas las gestiones de cuentas de l@s usuari@s.
 	* Fecha mínima para efectuar un cambio de contraseña
 	* Fecha máxima límite para modificar la contraseña
 	* Periodo de aviso para cambiarla
 	* Número de días con el usuario inactivo después de que haya expirado la contraseña
 	* Fecha de expiración de la cuenta
 	* Campo reservado
 * `/etc/shadow-`: Copia de seguridad del fichero anterior
 * `/etc/group`: Contiene nombre del grupo, contraseña (en caso de no usar `shadow(5)`), GID, lista de usuarios adjuntos

 Son los archivos principales y que tod@s tenemos que tener hechos una copia de seguridad en caso de que falle el sistema o nos equivoquemos editando alguno de ellos.

 __NOTA: A pesar de no ser altamente recomendable su edición, si queremos editar a mano los ficheros `passwd(5)` o `shadow(5)` tenemos que utilizar los comandos `vigr(1)` para edición de grupos y `vipw(1)` para edición de los ficheros tanto `passwd(5)` como `shadow(5)`.__

## ¿Cómo crear un grupo?
Los grupos se pueden crear manualmente al igual que l@s usuari@s haciendo uso del comando `vigr(8)`. No obstante, es preferible como siempre hacer uso de los comandos que nos faciliten las cosas más que nada para evitar incorrecciones de cualquier índole.

### `groupadd(8)`
`groupadd(8)` es una bella herramienta con la que crear un grupo, edita el fichero `/etc/group` y a su vez actualiza el `/etc/gshadow` para añadir la contraseña asignada

Creando un grupo
```
sudo groupadd sysadmins
```

Creando un grupo con GID específico
```
sudo groupadd -g 1200 sysadmins 
```

Asignando contraseña a un grupo
```
sudo groupadd -p contraseña sysadmins
```

## ¿Cómo modificar un grupo?
Como podemos modificar l@s usuari@s, ¿Por qué no los grupos? Pues claro que sí podemos hacerlo con `groupmod(8)`.

### `groupmod(8)`
Este comando nos permitirá modificar cierta información de los grupos que tenemos como por ejemplo:

Cambiando el nombre del grupo
```
sudo groupmod -n devels sysadmins
```

Cambiando el GID
```
sudo groupmod -g 1203 devels
```

Modificando la contraseña
```
sudo groupmod -p "Contraseña" devels
```

## ¿Cómo eliminar el grupo?
También es otra operación que podemos hacer con `vigr(8)`, pero es mejor utilizando este método.
```
sudo groupdel devels
```
## ¿Cómo cambiar temporalmente nuestr@ grupo primario?
Los usuarios siempre utilizamos un grupo primario que permite identificarnos con diversas partes o áreas del sistema. En caso de haber actualizado algo que requiera de una persona conectada al ordenador, se puede hacer pasar por la otra persona para saber que...
Entonces existen una serie de restricciones intrínsecas como no editar un documento a la vez, si has instalado un software reciente que requiere permisos y por tanto reiniciar la sesión gráfica, se puede evitar.

Básicamente es gracias al comando `newgrp(1)`
```
newgrp finance
```

Y con esto, se activa nuestro grupo secundario como primario.

## Visualizando los grupos en los que estoy
Se puede ver fácilmente haciendo uso del comando
```
groups
```

## Comodín
Tenemos un pequeño comodín que nos permite modificar ciertas cosas de nuestr@ usuari@ o de un grupo en concreto como su contraseña. Esta herramienta se llama `gpasswd(1)` y la tenemos instalada por defecto.

Añadiendo un(a) usuari@ a un grupo
```
sudo gpasswd -a pepito users
```

Eliminando un(a) usuari@ de un grupo
```
sudo gpasswd -d pepito users
```

Suprimir contraseña en un grupo
```
sudo gpasswd -r users
```


# Permisos

Poco sentido tiene diferenciar usuarios y grupos si no les atribuímos algún permiso especial que permita establecer una cierta jerarquía o distinción, ya que si no, estaríamos dejando un sistema horizontal en el que tod@s l@s usuari@s puedan hacer lo que quieran dentro del sistema. Aquí entra en juego el factor permisos.

Los permisos en UNIX se rigen por una serie de campos

 * Usuario: Solo el autor puede leer, escribir, ejecutar, o una combinación de los mismos, el poder en este caso sobre el fichero solo lo tiene él o ella o el usuario `root`.
 * Grupo: Tod@s l@s usuari@s que formen parte del grupo, dependiendo de los permisos que tenga establecido en este apartado el fichero o directorio podrán o no leer, escribir, o ejecutar en caso de ser un fichero ejecutable.
 * Todo el mundo: El resto de usuari@s del sistema que no pertenezcan ni al grupo, ni sea el autor del fichero, dependiendo de los permisos podrá o no acceder a los directorios y ficheros.

Imaginemos que tenemos el siguiente ejemplo:

Somos jefes(as) de un proyecto de desarrollo, y tenemos vari@s emplead@s a nuestro cargo. Nosotr@s como jefe(as) del proyecto, tenemos plena acción sobre todos los ficheros (somos autores). Y, seleccionamos determinados ficheros para determinados grupos, por ejemplo, todos aquellos ficheros que tengan que ver con el departamento de comunicación que tiene múltiples usuari@s, solo podrán acceder los de comunicación; el grupo de desarrolladores(as) tiene sus ficheros a cargo...etc Y cada usuari@ dentro de su grupo, tiene acceso pleno a los ficheros, sin embargo, las personas de otros grupos no pueden acceder a dichos archivos por las restricciones. Y luego, tenemos un apartado público, que solo podrá leer determinados archivos. ¡Voilá! hemos explicado el funcionamiento de usuarios y grupos de una forma sencilla.

```
		   
			   Jefes(as) de proyecto
			   		   \º/ \ª/
		   			      |
			   	  |-------------------|
				  |	Contabilidad	  |
				  |	Directivas		  |
				  |	Contratos		  |
				  |-------------------|
		  ________________|______________
		 /							 	 \
  	Comunicación 					 Desarrollo
  	  \º/ \ª/ 						   \º/ \ª/
  		 |								  |
  |-----------------|			 |-----------------|
  |	Inventario RRSS	|			 | Código fuente   |
  | Inversores		|			 | Contraseñas OS  |
  | Media 			|			 | Servidores	   |
  | ...				|			 | ...			   | 
  |-----------------|			 |-----------------|
  		 |								  |
  		 |							Todo el mundo
  		 |							\º/ \ª/\º/ \ª/
  		 *------------------------->  \º/ \ª/\º/ 
  									    \ª/ \ª/
  									      |
  									|-------------|
  									| index.html  |
  									| setup.sh 	  |
  									| screenshots |
  									| Twitter     |
  									| Facebook    |
  									| Google+     |
  									|-------------|

```

Ahora vamos a traducir las palabras en el lenguaje que lo interpreta el sistema, tenemos hasta tres formas de conceder, modificar o leer permisos:
 * Formato verbal o por carácter: Se hacen uso de las letras para asignar, modificar o simplemente leer los permisos.
 	* r: _read_ solo lectura
 	* w: _writable_ solo escritura (_debe ir acompañado de lectura para que pueda modificarse_)
 	* x: _executable_ solo ejecutable (_debe ir acompañado del permiso lectura para poder ejecutarse_)

 	|	     #         |  r   |  w |  x | rw   | rx   | wx   | rwx   |
 	|------------------|:-------------:|:-------------:|:-------------:|:----:|:----:|:----:|:-----:|
 	|    Usuario 	   | chmod u+r f1  |    u+w		   | u+x		   | u+rw | u+rx | u+wx | u+rwx |
 	|	  Grupo 	   | chmod g+r f1  |	g+r		   | g+x		   | g+rw | g+rx | g+wx | g+rwx |
 	|	Todo el mundo  | chmod o+r f1  |	o+r		   | o+x		   | o+rw | o+rx | o+wx | o+rwx |
 	| 	   Tod@s  	   | chmod a+r f1  |	a+r		   | a+x		   | a+rw | a+rx | a+wx | a+rwx |

 * Formato numérico basado en Octal: Se hace uso del 1 al 7 para definir los permisos

 	|	     #         |  r   |  w |  x | rw   | rx   | wx   | rwx   |
 	|------------------|:-------------:|:-------------:|:-------------:|:---:|:---:|:---:|:---:|:---:|
 	|    Usuario 	   | 400	 	   |	200		   | 100		   | 600 | 500 | 300 | 700 |
 	|	  Grupo 	   | 040	 	   |	020		   | 010		   | 060 | 050 | 030 | 070 |
 	|	Todo el mundo  | 004	 	   |	002		   | 001		   | 006 | 005 | 003 | 007 |
 	| Usuario + Grupo  | 440		   |    220        | 110		   | 660 | 550 | 330 | 770 |
 	| Grupo + Mundo    | 044		   | 	022		   | 011		   | 066 | 055 | 033 | 077 |
 	| Usuario + M      | 404		   |	202		   | 101		   | 606 | 505 | 303 | 707 |
 	| 	   Tod@s       | 444		   |	222		   | 111		   | 666 | 555 | 333 | 777 | 

 * Mediante máscara: Esta es la forma menos común de declarar los permisos, pero también se utiliza. Para declarar un valor hay que hacer uso del comando `umask(1p)`

 	Si queremos asignar el valor 022 a la máscara, este es el valor que le tendremos que restar al número actual de permisos que se encuentre en el directorio actual.
 	Por ejemplo: 
 	 * 002 = 777 - 002 = 775 (rwrwxr-x)
 	 * 444 = 644 - 444 = 200 (-w-------)
 	 * 020 = 660 - 020 = 640 (rw--r----)
 	 Para declarar el valor de una máscara se hace uso de `umask(1p)` tal que así:
 	 ```
 	 umask 020
 	 ```
 	 Cuando se declara una máscara en un directorio, todos los archivos y rutas que se creen dentro de él, heredarán estos permisos. No es que se aplique directamente al archivo/directorio.

## ¿Cómo ver los permisos?
Para visualizar los permisos tenemos el magnífico comando `ls(1)` como hemos visto en el post de [Mastering en Bash ~ Primeros pasos](https://echemosunbitstazo.es/blog/mastering-bash-primeros-pasos?target=_blank).

```
ls -al
```

Este comando muestra todos los archivos y directorios que se encuentren en el directorio actual además de los ocultos. En suma, muestra los enlaces tanto duros como simbólicos. En la siguiente salida, si nos fijamos en la primera columna de la izquierda veremos los permisos y el tipo de archivo.

```
lrwxrwxrwx.  1 sincorchetes sincorchetes    37 May 19 21:51  .steampath -> /home/sincorchetes/.steam/sdk32/steam
lrwxrwxrwx.  1 sincorchetes sincorchetes    35 May 19 21:51  .steampid -> /home/sincorchetes/.steam/steam.pid
drwxrwxr-x.  3 sincorchetes sincorchetes  4096 Mar  7 14:17  .subversion
-rw-rw-r--.  1 sincorchetes sincorchetes     8 Mar 28 22:29  .tasks
drwxrwxr-x.  2 sincorchetes sincorchetes  4096 Jan 20 04:25  .themes
drwx------.  3 sincorchetes sincorchetes  4096 Feb 12 01:10  .thumbnails
drwx------.  3 sincorchetes sincorchetes  4096 Jan 20 11:05  .thunderbird
drwxrwxr-x.  3 sincorchetes sincorchetes  4096 May 27 19:56  .tmux
-rw-rw-r--.  1 sincorchetes sincorchetes   370 May 27 19:57  .tmux.conf
drwxrwxr-x.  7 sincorchetes sincorchetes  4096 Jun  2 12:38  .vagrant.d
drwxr-xr-x.  2 sincorchetes sincorchetes  4096 Jun  4 17:08  Videos
```

Los archivos que contienen una "l" en los permisos denotan que son enlaces simbólicos y se puede además saber porque apuntan a otro directorio/fichero "->".

Aquellos que contienen una "d", denotan que son directorios y los que no contienen nada más que un "-" se interpretan como archivos.

## Modificando la autoría de archivos/directorios
Como podemos ver, se pueden asignar múltiples permisos a los archiv@s, ahora bien, ¿Qué pasa si queremos cambiar el autor del fichero, el grupo o ambos?

Podemos hacerlo gracias al comando `chown(1)`:
* `chown usuario fichero/directorio`: Cambiando el autor del fichero y/o directorio
* `chown usuario:grupo`: Cambiando el autor y el **grupo** al fichero y/o directorio

Se puede asignar un autor a un fichero y tener un grupo diferente, el autor podrá modificarlo, leerlo o ejecutarlo en cualquier momento, es indiferente.

## Sticky Bit
¿Qué pasa si tenemos much@s usuari@s dentro de un grupo cuyo grupo tiene asignado un directorio de trabajo y el usuario "Pepe" crea un fichero y la usuaria "Susana" intenta eliminarlo? Que podrá hacerlo siempre y cuando, se aplique una restricción llamada "_Sticky Bit_" del inglés, "bit pegajoso". Este permiso especial, permite restringir los archivos creados y modificados por l@s miembr@s de un grupo y evitar que se genere un "autosabotaje" o un borrado por error.

Para habilitarlo bastará con efectuar:
```
chmod 1000 archivo/directorio
```
ó
```
chmod u+t archivo/directorio
```

Aplicar permisos recursivos en los ficheros y subdirectorios de un directorio
```
chmod 1000 -R directorio
```

Cuando ejecutemos un `ls(1)`, veremos que en los permisos se habrá añadido un "t" al final tanto para directorios como para ficheros, esto nos indica la activación del _Sticky Bit_, también aparecerá modo de ejecución permitido. Si aparece una "T" en vez de una "t", esto quiere decir, que se ha activado el _Sticky Bit_ pero solo para el usuario actual, si vemos el resultado, no contienen permisos de ejecución y por lo tanto no se permitirá crear archivos/directorios.

Salida con _Sticky Bit_ activado:
```
ls -al
total 8
drwxrwxrwt. 2 root root  4096 Jun 11 07:41 .
drwxrwxrwt. 3 root users 4096 Jun 11 07:41 ..
```

Salida con _Sticky Bit_ activado para el usuari@ actual:
```
ls -al
total 8
drwxrwxrwx. 2 root         users        4096 Jun 11 07:38 .
drwxrwxrwx. 3 sincorchetes sincorchetes 4096 Jun 11 07:37 ..
-rwxrw-rwT. 1 sincorchetes sincorchetes    0 Jun 11 07:38 12
```

Aquí os podemos mostrar con más claridad el funcionamiento:

<script src="https://asciinema.org/a/186545.js" id="asciicast-186545" async></script>

## SUID y SGUID
En Linux existen una serie de condiciones especiales para determinados ejecutables, archivos... que pueden editarse o ejecutarse sin ser el propietario de los mismos. Esta característica nos otorga una cierta ventaja como por ejemplo, si queremos cambiar la contraseña de nuestr@ usuari@ podemos hacerlo sin ser usuario "root".

Si nos fijamos en los permisos del comando `passwd`, veremos que tiene la letra "s" dentro de la ristra de permisos.

```
ls -al /usr/bin
-rwsr-xr-x. 1 root root         29008 Apr 12 11:24 passwd
```

Digamos que el/la usuari@ se hace pasar por "root" para intentar cambiar su contraseña y lo puede hacer gracias a estos permisos. Estos se llaman SUID _Set User ID Bit_ o SGID _Set Group ID Bit_. Podemos verificar si un archivo o directorio lo tiene activado porque en los permisos del usuario tiene una "s" o en los permisos del grupo contiene "s". Solo el propietario del fichero/directorio puede declarar estos permisos "extendidos".

_NOTA: En caso de contener una "S", esto quiere decir, que tanto el autor del archivo/directorio como el grupo y el resto del mundo no podrá editar, modificar y/o ejecutar archivos dentro del directorio. De hecho, veremos como se encuentra reducida la salida de permisos._

# Referencias
* [Google](https://www.google.es?target=_blank)
* [man pages](https://linux.die.net/man?target=_blank)
* [The Linux Document Project](https://www.tldp.org?target=_blank)
