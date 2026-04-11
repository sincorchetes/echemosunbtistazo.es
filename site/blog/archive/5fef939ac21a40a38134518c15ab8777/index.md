---
uuid: 5fef939ac21a40a38134518c15ab8777
title: "Instala otras versiones de software en CentOS"
slug: /posts/instala-otras-versiones-de-software-en-centos
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
A veces se hace un poco complicado la opción de CentOS como servidor si no lo sabemos administrar. Ya que si nosotros queremos instalar nuevas versiones de PHP, MariaDB, MongoDB o que se yo, te resultará prácticamente imposible a menos que compiles el software directamente o bien hagas uso de repositorios externos tipo [Remi](https://rpms.remirepo.net?target=_blank), [Webtatic](https://webtatic.com?target=_blank) en el que ya tienes que confiar que eso vaya bien.

<!-- truncate -->

Sin embargo, CentOS ha seguido la filosofía que tiene Redhat de tener un repositorio llamado "_CentOS Software Collection_" en el que nos permite tener varias versiones de lenguajes de programación como PHP, Ruby, Python...

Para que conozcamos un poco de donde puede venir el asunto, tenemos que explicar que Redhat posee su propio repositorio llamado "_Redhat Software Collection_". Es un repositorio de paquetes al que solo puede acceder personas con subscripción Redhat, lo bueno que tiene estos repositorios es que están incluidos en su soporte al cliente.

# Instalando el repositorio
Necesitaremos tener el repositorio de CentOS habilitado llamado "_extras_" y posteriormente adherimos el nuevo repo con YUM:
```
sudo yum install centos-release-scl -y
sudo yum upgrade
```

# Visualizando versiones
Si ejecutas el siguiente comando, podrás ver un listado con todos los paquetes que disponibles en el repositorio que acabas de añadir al sistema:
```
sudo yum list available |scl 
```

# ¿Cómo instalar los paquetes?
Para instalarlos basta con hacer un yum...
```
sudo yum install rh-php71
```
# ¿Cómo ejecutar un binario?
Una vez instalado el PHP de este repositorio, tenemos que tener en cuenta, que no se va a instalar en el directorio dónde se encuentran todos los ejecutables, documentación...etc del sistema. Si no que se creará un directorio en `/opt/rh/NOMBRE_PAQUETE` y no se modificará ningún `.bashrc` para añadir un alias, si quieres hacerlo, tendrás que hacerlo a mano.

No obstante, cuando instalamos por primera vez un software de este repositorio se nos viene como dependencia un paquete llamado `scl-utils`, que nos permitirá trabajar con los ejecutables de las diferentes versiones tal que así:
```
scl enable rh-php71 "php -a"
```
Y nos abrirá una consola lista para poder trabajar con el PHP recién instalado.

## Ejecutando una shell
¡Pero! ¡No te mortifiques! También puedes cargar una shell `bash` que te permite cargar todo lo necesario (_ruta de los binarios..._) si ejecutas:
```
scl enable rh-php71 bash
```
Y lanzas un `env` verás como te carga los PATH necesarios para trabajar con soltura.

# Servicios
Los servicios por lo general si que se instalan en el directorio que toca, en este caso es: `/usr/lib/systemd/`

 * Puedes habilitarlo si ejecutas:
```
sudo systemctl enable rh-mariadb102-mariadb.service
```
 * O deshabilitarlo al arranque:
```
sudo systemctl disable rh-mariadb102-mariadb.service
```
 * Iniciar el servicio
```
sudo systemctl start rh-mariadb102-mariadb.service
```
 * Parar el servicio
```
sudo systemctl stop rh-mariadb102-mariadb.service
```
 * Reiniciar el servicio
```
sudo systemctl restart rh-mariadb102-mariadb.service
```
# ¿Qué pasa si no recuerdo lo que instalé?
Con el comando `scl` podemos listar todos los paquetes instalados de la colección de software:
```
scl -l
rh-php71
```
# Extras
Este repositorio también se puede utilizar en _"containers_", un concepto que verás más adelante, y también es posible reconstruir los paquetes de estas versiones con un comando llamado `cbs` que verás en otra ocasión.

# Recursos
 * [CentOS Software Collection](https://wiki.centos.org/SpecialInterestGroup/SCLo#head-3cbac26d7e6a9d1ab72b66cd1e975d774999aa90?target=_blank)
 * [Redhat Software Collection](https://access.redhat.com/documentation/en-us/red_hat_software_collections/3/html/3.2_release_notes/chap-usage?target=_blank)
