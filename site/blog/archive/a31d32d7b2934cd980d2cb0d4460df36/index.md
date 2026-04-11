---
uuid: a31d32d7b2934cd980d2cb0d4460df36
title: "Mastering en Bash - Buscando archivos y directorios"
slug: /posts/mastering-bash-buscando-archivos-y-directorios
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Sistemas
  - Linux
---
¿A quién no le interesa encontrar a esta buscada ballena en medio de un océano tan grande? Pues a nosotros no la verdad, preferimos buscar otro tipo de cosas como archivos y directorios en nuestro sistema. Para ello haremos uso de los comandos `find(1)`, `locate(1)`, `whois(1)`,`whereis(1)`.

<!-- truncate -->

# Diferencias
`find(1)` a diferencia de `locate(1)` es un comando que busca a tiempo real y tiene muchísimas funcionalidades añadidas como filtrar por nombre, tipo de ejecutable, fecha, hora.... e incluso, eliminar los ficheros que hemos querido encontrar, mientras que `locate(1)` trabaja junto con una base de datos generada por `updatedb(8)` reduciendo drásticamente la actualización puntera de la ubicación de los ficheros y directorios además de no tener la afinidad que posee `find(1)`.

[![asciicast](https://asciinema.org/a/182400.png)](https://asciinema.org/a/182400)

## Trabajando con `find(1)`
En este artículo vamos a guiarnos más por los ejemplos que por explicar la sintaxis o los parámetros de uno en uno.

Encontrar todos aquellos ficheros y directorios que se encuentren en el directorio `/etc`, y que aquellos directorios a los que no no podamos acceder a su contenido, no nos muestre el error de permisos.

```
find /etc 2>/dev/null 
```
Encontrar todos aquellos archivos en `/var/` cuya extensión sea .log, y que por supuesto, no muestre aquellos directorios que requieran permisos para su acceso.
```
find /var -name "*.log" 2>/dev/null
```
Mostrar todos los directorios de nuestro `/home` sin contar los archivos
```
find ~ -type d
```
Encontrar archivos vacíos en nuestro `/home` y eliminarlos todos
```
find ~ -empty -type f -exec rm -rf {} \;
```
Encontrar ficheros con extensión .log y copiarlos en una carpeta dentro de nuestro home con permisos de superusuario
```
sudo find /var -name ".log" -exec cp {} /home/sincorchetes/LOGS \;
```
Buscando archivos cuya fecha de modificación sea de hace un minuto en nuestro `/home`
```
find ~ -cmin 1 
```
Ficheros que han sido accedidos hace 10 minutos
```
find ~ -amin 10
```
Visualizar archivos que contengan .log de extensión, contengan permisos 644
```
sudo find /var -name "*.log" -perm 644
```
Ver archivos que pesen igual o redondeando den 2GB en nuestro directorio
```
find ~ -size 2G
```
Buscar directorios que contengan nuestro nombre de usuario, con permisos 777.
```
find / -user sincorchetes -type d -perm 777
```
Mostrar todos los archivos o directorios simbólicos que se encuentren en el directorio `/dev` y mostrarlo como si ejcutásemos un `ls(1)`
```
sudo find /dev -type l -ls
```
Listando aquellos archivos de nuestro `/home` cuya extensión contenga "*.avi" y sean iguales o superiores a 1G
```
find ~ -name "*.avi" -a -size 1G
```
Suprimiendo los .rpm que encontremos que lleguen a 10 megas
```
sudo find /var/cache/rpm -name "*.rpm" -a -size 10M -exec rm -rf {} \;
```

Podemos seguir ejemplos del manpages de `find(1)` o imaginarnos lo que se nos ocurra que podamos hacer en un futuro, estos son solo pequeños ejemplos de lo que podemos hacer con esta fantástica utilidad.

## Trabajando con `locate(1)`
Bien, como hemos dicho anteriormente, este comando hace uso de una base de datos que por lo general suele ubicarse en `/var/lib/mlocate/mlocate.db`, y su fichero de configuración suele encontrarse en `/etc/updatedb.conf` todo depende de la distribución que utilicemos.

También podemos hacer un indexado que es registrar todos los archivos y directorios que queramos y se almacenen por un cierto orden en la base de datos de locate, sin tener que hacer uso de superusuario o creando un daemon en el sistema.

## Regenerando las bases de datos
Podemos hacer que nos indexe todo lo que contenga el sistema y que lo puedan ver tod@s l@s usuari@s.
```
sudo updatedb
```
O bien, podemos generar una base de datos para nosotr@s.
```
mkdir .locate
updatedb -l 0 -U /DIR -o .locate/db_file
```
`-l 0`: Permite entre otras cosas, crear el fichero de la base de datos utilizando nuestro usuario.
`-U /DIR`: Directorio a idnexar
`-o nombre_fichero`: El nombre que le pondremos a la db

Si queremos añadir más directorios, tendremos que ejecutar el comando modificando `/DIR`

## Buscando archivos o directorios
Basta con ejecutar `locate nombre_archivo/nombre_dir` y el comando nos arrojará una salida completa con las coincidencias que encuentre en la db.

Sin embargo, si queremos ejecutar nuestro fichero, tendremos que especificárselo a `locate(1)`
```
locate nombre_directorio/nombre_archivo -d .locate/db_file
```

## Visualizando estadísticas
Se pueden ver cuántos archivos y directorios tenemos actualmente registrados en cada db.
```
locate -S 
```
ó 
```
locate -Sd .locate/db_file
```

# El comando `whereis(1)`
Este comando nos viene de fábula cuando queremos encontrar algún binario, archivo fuente o incluso páginas de manual de `man(1)`, para hacerlo, este lleva una búsqueda en aquellos directorios que se encuentren declarados en la variable `$PATH` y `$MANPATH`. Estas variables las podemos encontrar en `/etc/profile` o en `~/.bash_profile`
 (en nuestro caso)
```
echo $PATH
```
Nuestra salida:
```
echo $PATH
/usr/lib/qtchooser:/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/home/sincorchetes/.composer/vendor/bin:/home/sincorchetes/.local/bin:/home/sincorchetes/bin:/home/sincorchetes/.bin/scripts
```
Vamos a visualizar un par de ejemplos.

Buscando una página con la coincidencia `cat(1)`
```
whereis -m cat
```
Encontrando la ubicación del binario
```
whereis -b cat
```
Buscando la fuente de un kernel de Fedora 28
```
whereis -s 4.16.8-300.fc28.
```

# Comando `whatis(1)`
Este comando nos permite buscar en las páginas de `man(1)` y nos devuelve una descripción del mismo en una sola línea, en caso de que encuentre varios resultados, mostrará ambos o más y su categoría dentro de `man(1)`.

```
whatis cat
```
Salida:
```
cat (1p)             - concatenate and print files
cat (1)              - concatenate files and print on the standard output
```
Podemos especificar un directorio diferente para que busque en otras páginas de `man(1)` pues que no tengamos instaladas en el directorio raíz o no se encuentren registradas en `~/.bash_profile`

```
whatis -M ~/.man/ cat
```
Entre otras cosas

# Comando `apropos(1)`
Este comando es parecido al anterior, lo que utiliza directamente `mandb(1)`, también permite utilizar otra ruta de directorio para los manpages...etc

```
apropos whatis
```
Salida:
```
whatis (1)           - display one-line manual page descriptions
```

Y con esto acabamos el artículo de hoy, esperemos que os haya gustado.

¡Un saludo!

# Referencias
* manpages
  * `find(1)`
  * `locate(1)`
  * `updatedb(1)`
  * `whereis(1)`
  * `whatis(1)`
  * `apropos(1)`

