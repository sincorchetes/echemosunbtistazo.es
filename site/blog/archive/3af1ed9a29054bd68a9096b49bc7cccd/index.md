---
uuid: 3af1ed9a29054bd68a9096b49bc7cccd
title: "Instalando MongoDB en CentOS 8"
slug: /posts/instalando-mongodb-en-centos-8
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
Bueno, antes de entrar en materia quiero comentar que las instrucciones que hay aquí descritas se han obtenido de la <a href="https://docs.mongodb.com/manual" target="blank">documentación oficial de MongoDB</a> y las he probado personalmente para asegurar que funciona este procedimiento.

<!-- truncate -->

![Imagen obtenida de MongoDB.com](MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png)

Para empezar, MongoDB es una base de datos (_NoSQL_) orientada a documentos y utiliza un formato de intercambio de datos llamado <a href="https://docs.mongodb.com/manual/reference/bson-types/" target="blank">BSON</a> que es una representación binaria de estructuras de datos y mapas JSON. Sin más tapujos, entraremos al trapo.


# Requisitos previos
__Importante__: Sacar un snapshot o copia de seguridad antes de comenzar:

* Actualizamos el SO antes de comenzar:
```
# dnf upgrade -y
```
* __NOTA:__ Reiniciamos si hemos aplicado un nuevo kernel o systemd antes de proceder.

# Instalando MongoDB
* Creamos el siguiente archivo `/etc/yum.repos.d/mongodb-org-4.2.repo` y añadimos las siguientes líneas:
```
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```
* Refrescamos los repositorios:
```
# dnf check-update
```
* Instalamos el servidor y la consola de acceso:
```
# dnf install -y mongodb-org
```
* MongoDB por defecto, almacenará todo su contenido en los directorios:
   * `/var/lib/mongo` ----> Directorio de datos
   * `/var/lib/mongodb` --> Directorio de registros

* Si queremos hacer alguna modificación, la configuración está en: `/etc/mongod.conf` hay que recordar, que MongoDB se ejecuta utilizando el `usuario:grupo` `mongod:mongod`. Por lo tanto,
si hacemos alguna modificación en las rutas, tendremos que cambiar su `$HOME`, y otorgarle los permisos correspondientes `usuario:grupo` a los nuevos directorios. Y también actualizar la definición de los mismos en el fichero de configuración. 

  __NOTA:__ Es mejor tener un FS separado de `/` para evitar el colapso del mismo cuando hay mucha información almacenada, porque evitaría que el sistema no pudiera trabajar correctamente forzando un reinicio.

* Comprobar el servicio que esté parado
```
$ systemctl status mongod.service
● mongod.service - MongoDB Database Server
   Loaded: loaded (/usr/lib/systemd/system/mongod.service; enabled; vendor pres>
   Active: inactive (dead)
     Docs: https://docs.mongodb.org/manual
```

# Gestionando los permisos de SELinux
Como ya he mencionado en un par de artículos anteriores, SELinux es un conjunto de políticas de seguridad que trabajan junto con el núcleo de Linux e impiden que se ejecuten exploits o malware que pueda afectar a la seguridad de la máquina. Esta modificación que vamos a implementar, permitirá a MongoDB acceder a `/sys/fs/cgroup` para que pueda identificar cuánta memoria hay disponible en el sistema.

* Asegurándonos de que el paquete `checkpolicy` está instalado en nuestro sistema:
```
# dnf install checkpolicy
```
__NOTA__: Si lo tienes instalado saldrá una salida tal que así:
```
Last metadata expiration check: 0:11:28 ago on Wed 13 May 2020 11:06:20 PM CEST.
Package checkpolicy-2.9-1.el8.x86_64 is already installed.
Dependencies resolved.
Nothing to do.
Complete!
```
* Creamos un fichero de políticas llamado `mongodb_cgroup_memory.te`:

```
# cat > mongodb_cgroup_memory.te <<EOF
module mongodb_cgroup_memory 1.0;
  
require {
  type cgroup_t;
  type mongod_t;
  class dir search;
  class file { getattr open read };
}
  
#============= mongod_t ==============
allow mongod_t cgroup_t:dir search;
allow mongod_t cgroup_t:file { getattr open read };
EOF
```

* Compilamos y cargamos este módulo de políticas:
```
# checkmodule -M -m -o mongodb_cgroup_memory.mod mongodb_cgroup_memory.te
# semodule_package -o mongodb_cgroup_memory.pp -m mongodb_cgroup_memory.mod
# semodule -i mongodb_cgroup_memory.pp
```
* Creamos un servicio que deshabilite el THP (_Transparent Huge Pages_) `/etc/systemd/system/disable-transparent-huge-pages.service`

* __NOTA__: Según MongoDB en su documentación, comentan que deshabilitar este sistema de administración de memoria de Linux, reducirá la sobrecarga de las búsquedas de búfer de traducción (TLB) en máquinas con grandes cantidades de memoria mediante el uso de páginas de memoria más grandes. Por lo visto, MongoDB funciona mal con este sistema y se recomienda deshabilitarlo.

```
[Unit]
Description=Disable Transparent Huge Pages (THP)
DefaultDependencies=no
After=sysinit.target local-fs.target
Before=mongod.service

[Service]
Type=oneshot
ExecStart=/bin/sh -c 'echo never | tee /sys/kernel/mm/transparent_hugepage/enabled > /dev/null'

[Install]
WantedBy=basic.target
```
* Iniciamos y habilitamos el servicio `disable-transparent-huge-pages.service`
```
# systemctl enable --now disable-transparent-huge-pages.service
```
* __NOTA__: Si hacemos un `status` del servicio `disable-transparent-huge-pages.service` veremos que está `inactive`, esto es porque
los servicios tipos `oneshot` solo ejecutan una acción cuando se inician, y se paran cuando el proceso termina. Si queremos comprobar que ha cambiado
el valor en el `/sys/kernel/mm/transparent_hugepage/enabled`.
```
$ cat /sys/kernel/mm/transparent_hugepage/enabled
```
* Iniciamos el servicio de MongoDB
```
# systemctl start mongod.service
```
* Verificando que el servicio está funcionando
```
$ systemctl status mongod.service
● mongod.service - MongoDB Database Server
   Loaded: loaded (/usr/lib/systemd/system/mongod.service; enabled; vendor pres>
   Active: active (running) since Wed 2020-05-13 20:24:38 CEST; 2min 34s ago
     Docs: https://docs.mongodb.org/manual
  Process: 13799 ExecStart=/usr/bin/mongod $OPTIONS (code=exited, status=0/SUCC>
  Process: 13797 ExecStartPre=/usr/bin/chmod 0755 /var/run/mongodb (code=exited>
  Process: 13795 ExecStartPre=/usr/bin/chown mongod:mongod /var/run/mongodb (co>
  Process: 13794 ExecStartPre=/usr/bin/mkdir -p /var/run/mongodb (code=exited, >
 Main PID: 13802 (mongod)
   Memory: 79.0M
   CGroup: /system.slice/mongod.service
           └─13802 /usr/bin/mongod -f /etc/mongod.conf
May 13 20:24:37 test systemd[1]: Starting MongoDB Database Server...
May 13 20:24:37 test mongod[13799]: about to fork child process, waiting until >
May 13 20:24:37 test mongod[13799]: forked process: 13802
May 13 20:24:38 test mongod[13799]: child process started successfully, parent >
May 13 20:24:38 test systemd[1]: Started MongoDB Database Server.
```
* Habilitando el servicio al arranque del sistema
```
# systemctl enable mongod.service
```
# Habilitando el control de acceso de usuarios basado en roles o RBAC
A pesar de que MongoDB no permite aceptar conexiones remotas (se puede configurar editando `/etc/mongod.conf` en la directiva `bindIp`), no hay un sistema de control de acceso configurado por defecto, por lo que vamos a configurarlo aquí.

* Comprobamos que la instancia de Mongo está levantada:
```
$ ps -e| grep 'mongod'
```
Veremos una salida tal que así:
```
13802 ?        00:00:48 mongod
```
* Nos conectamos al SGBD
```
mongo --host 127.0.0.1 --port 27017
```
* Veremos un mensaje como este:
```
MongoDB shell version v4.2.6
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("2f1c42a5-ed69-4535-a84d-3cf14489ac86") }
MongoDB server version: 4.2.6
Server has startup warnings: 
2020-05-14T19:10:57.742+0200 I  CONTROL  [initandlisten] 
2020-05-14T19:10:57.742+0200 I  CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2020-05-14T19:10:57.742+0200 I  CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2020-05-14T19:10:57.742+0200 I  CONTROL  [initandlisten] 
---
Enable MongoDB's free cloud-based monitoring service, which will then receive and display
metrics about your deployment (disk utilization, CPU, operation statistics, etc).
The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and anyone you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.
To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
```
* Cambiamos a la base de datos de admin
```
use admin
```
* Creamos el usuario `root` con el método `db.createUser()`
```
db.createUser(
  {
    user: "superuser",
    pwd: "cambiameEstaPwdConUnaMasFuerte",
    roles: [ "root" ]
  }
)
```
* Obtendremos una salida como esta:
```
Successfully added user: { "user" : "superuser", "roles" : [ "root" ] }
```
* Mostramos los usuarios:
```
show users
```
* Obtendremos un solo usuario que es el que utilizaremos para administrar MongoDB
```
{
	"_id" : "admin.superuser",
	"userId" : UUID("40f946bd-5740-42b1-a89b-811a41a10150"),
	"user" : "superuser",
	"db" : "admin",
	"roles" : [
		{
			"role" : "root",
			"db" : "admin"
		}
	],
	"mechanisms" : [
		"SCRAM-SHA-1",
		"SCRAM-SHA-256"
	]
}
```
* Apagamos la DB desde la shell
```
> db.shutdownServer()
> exit
```
* Editamos el archivo `/etc/mongod.conf` y añadimos las siguientes líneas debajo del apartado `# network interfaces`:
```
security:
  authorization: enabled
```
* Reiniciamos el servicio
```
# systemctl restart mongod.service
```
* Accedemos
```
$ mongo --host 127.0.0.1 --port 27017
```
* Notaremos que ya no nos aparece el mensaje de advertencia de que el RBAC no está habilitado:
```
MongoDB shell version v4.2.6
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("6ffb9ae6-6a13-42a1-b7f7-046d60085e86") }
MongoDB server version: 4.2.6
```
* Tratamos de apagar la DB
```
> use admin
> db.shutdownServer()
2020-05-14T19:21:32.489+0200 E  QUERY    [js] Error: shutdownServer failed: {
	"ok" : 0,
	"errmsg" : "command shutdown requires authentication",
	"code" : 13,
	"codeName" : "Unauthorized"
} :
_getErrorWithCode@src/mongo/shell/utils.js:25:13
DB.prototype.shutdownServer@src/mongo/shell/db.js:426:19
@(shell):1:1
```
* Ahora vemos que no se ha apagado la DB, para conectarnos con el usuario que hemos creado:
```
$ mongo --host 127.0.0.1 --port 27017 --username superuser
MongoDB shell version v4.2.6
Enter password: 
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("c82db55b-3170-493b-9bf5-7be269539025") }
MongoDB server version: 4.2.6
---
Enable MongoDB's free cloud-based monitoring service, which will then receive and display
metrics about your deployment (disk utilization, CPU, operation statistics, etc).
The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and anyone you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.
To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
> 
```

En este post hemos aprendido a:
* Qué es MongoDB
* Cómo instalar MongoDB en CentOS
* Cómo mejorar la integridad con el ecosistema de CentOS (SELinux, y THP)
* Habilitar un sistema de RBAC en MongoDB para securizar el SDGB
