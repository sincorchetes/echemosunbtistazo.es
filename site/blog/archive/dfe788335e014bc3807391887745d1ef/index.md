---
uuid: dfe788335e014bc3807391887745d1ef
title: "Como crear tu propio repositorio en CentOS"
slug: /posts/como-crear-tu-propio-repo-en-centos
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
YUM o _Yellowdog Updater Modified_ es un gestor de paquetes de alto nivel utilizado por Fedora previo sa la salida de su nuevo gestor de paquetes DNF (basado en YUM), y el que utiliza CentOS y RHEL.

<!-- truncate -->

En este post vamos a ver como crear un repositorio local con CentOS para mantener nuestros paquetes personalizados actualizados, o bien para hacer de "_catcher_" dentro de una red y que puedan distribuirse las actualizaciones oficiales al resto de equipos sin tener que consumir el ancho de banda proporcionado por el ISP que tengamos contratado.

Tenemos que tener un equipo con al menos dos tarjetas de red, una con salida al exterior y otra en la que conecta a la topología interna de nuestro hogar, empresa...etc

Vamos ha hacer el ejemplo con una subred de clase C y con una topología en serie (_el cliente se conecta a un servidor directamente conectado, y el servidor está conectado directamente al ISP_).
## Información de la subred
 * Subred: 192.168.0.64/26 
 * Máscara: 255.255.255.128 
 * Broadcast: 192.168.0.127

## Dirección de subred equipos
Servidor:
 * IP: 192.168.0.64
 * Nombre de la NIC: enp0s8
Cliente:
 * Conexión mediante DHCP
 * Nombre NIC: enp0s3

A continuación vamos a instalar todo lo necesario en el servidor.

# Configurando el Servidor
Pasos a seguir:
 * Configurando interfaz de red interna
 * Instalando y configurando Kea
 * Instalando y configurando Apache
 * Gestionando Firewalld
 * Instalando createrepo

## Configurando interfaz de red interna
En distribuciones como CentOS/RHEL y Fedora, almacenan sus configuraciones de red en el directorio `/etc/sysconfig/network-scripts/`.

Modificamos el archivo de la interfaz que utilizaremos a nivel interno:
`
```
BOOTPROTO=static
NAME=enp0s8
DEVICE=enp0s8
ONBOOT=yes
ZONE=discrete
IPADDR=192.168.0.65
NETMASK=255.255.255.128
```
Levantando la red:
```
sudo ifdown enp0s8
sudo ifup enp0s8
```
## Instalando y configurando Kea
Kea es un servidor DHCP desarrollado por la _Internet Systems Consortium, Inc_, permite una implementación completa de servidores DHCPv4 (IPv4), DHCPv6 (IPv6) y DNS dinámicos.
```
sudo yum install kea
```
### Modificando `/etc/kea/kea.conf`
Modificamos el fichero troncal de Kea tal que así:
```
# DHCPv4 configuration start here
"Dhcp4":
{
# Add names of interfaces to listen on.
	"interfaces-config": {
	 "interfaces": [ "enp0s8" ]
	},
```
Y modificamos el apartado de subred para IPv4, tal que así:
```
	"subnet4": [
	{
		"subnet": "192.168.0.64/26",
		"pools": [ { "pool": 192.168.0.70 - 192.168.0.126" } ] }
		]
	},
```
Como vemos, hemos dejado 4 IPs para _hosts_ excluidas dentro de este rango, simplemente por si queremos añadir dispositivos estáticos aparte de nuestro servidor.

Iniciamos el servicio:
```
sudo systemctl start kea-dhcpv4.service
```
Añadimos el servicio para que arranque cuando inicie el sistema:
```
sudo systemctl enable kea-dhcpv4.service
```
## Instalando y configurando Apache
Personalmente, trabajo con Apache, pero podéis utilizar NGINX si queréis.
```
sudo yum install httpd
```
Iniciamos
```
sudo systemctl start httpd.service
```
## Gestionando Firewalld
Firewalld es un gestor dinámico del firewall de Linux que viene por defecto en distribuciones como Fedora, RHEL, CentOS.
Podemos definir zonas con servicios y puertos específicos, y asociar dichas zonas a determinadas interfaces de red entre otras cosas.

Creamos una zona personalizada:
```
<?xml version="1.0" encoding="utf-8"?>
<zone>
  <short>Discrete</short>
  <description>Internal use only.</description>
  <interface name="enp0s8"/>
  <service name="http"/>
</zone>
```
Reiniciamos el servicio
```
sudo systemctl restart firewalld.service
```
Comprobando que trabaja:
```
sudo firewall-cmd --get-active-zones
```
Deberá salir una salida tal que así:
```
public
	interfaces: enp0s3
discrete
	interfaces: enp0s8
```
Esto nos permite las conexiones del protocolo HTTP a nuestro servidor, cualquier cliente que se encuentre en la red asociado a la tarjeta `enp0s8`.

_**NOTA Importante: Si utilizas otro puerto para asistir a las peticiones del servidor Web, tendremos que sustituir la linea `<service name="http"/> ` por `<port protocol="tcp" port "xx"/>`, además, si utilizamos SELinux, tendremos que añadir la apertura del puerto. `sudo semanage port -a -t http_port_t -p tcp xx`**_

## Instalando createrepo
Este programa permite generar todo lo necesario para tener un repositorio, como el `repomd.xml` un fichero basado en XML que contiene metadatos registrando todo lo que tiene un repositorio.
Creamos el directorio dentro de la ruta del `ServerRoot` configurado en nuestro Apache: `/var/www/html`
```
sudo mkdir -p /var/www/html/local/packages
```
Creamos el repo
```
sudo createrepo --database /var/www/html/local
```
Y se creará una carpeta llamada `repodata`, creamos un enlace simbólico de `repomd.xml`:
```
sudo ln -s /var/www/html/local/repodata/repomd.xml /var/www/html/local/
```
Probamos si podemos descargar este fichero:
```
wget http://localhost/local/repomd.xml
```
ó visualizarlo con curl
```
curl http://localhost/local/repomd.xml
```
Copiamos o añadimos todos los paquetes tengamos en nuestro nuevo repositorio y listo.
Si queremos actualizar los metadatos y la base de datos dónde se almacena la información de los paquetes, solo bastará con ejecutar:
```
sudo createrepo --update /var/www/html/local
```
_**NOTA: Si utilizamos SELinux, un conjunto de políticas que trabajan conjuntamente con el kernel para proporcionar seguridad al sistema, tendremos que reestablecer las etiquetas con `restorecon`, este comando se encuentra en el paquete `policycoreutils`, viene por defecto instalado en el sistema.**_
```
sudo restorecon -vR /var/ww/html/local/*
```

## B-O-N-U-S
Si queremos hacer de "_catcher_", podemos copiar todos los paquetes que se encuentren almacenados cuando hemos hecho instalaciones y centrarlas en nuestro repo.

Por ejemplo:
```
Descargamos de los repositorios base, updates, epel paquetes --> Copiamos en la carpeta de nuestro repo --> Eliminamos los repositorios de los clientes y dejamos solo el nuestro.
```

Con este pequeño script que puedes descargar desde aquí podemos hacerlo.

Descargamos el script:
```
git clone https://github.com/sincorchetes/ownyumrepo
```

Ejecutamos
```
chmod +x ownyumrepo
./ownyumrepo
```

_NOTA: Si tu repo tiene otro nombre y directorio, tendrás que modificarlo_

# Configuando el cliente
Pasos a seguir:
 * Configurando la interfaz de red
 * Creando `local.repo`

## Configurando la interfaz de red
Si utilizáis CLI en vez de interfaz gráfica, editamos el interfaz `/etc/sysconfig/network-scripts/ifcfg-enp0s3`

```
BOOTPROTO=dhcp
NAME=enp0s3
DEVICE=enp0s3
ONBOOT=yes
```
Levantando la red:
```
sudo ifup enp0s3
```
## Creando `local.repo`
Creamos el fichero de nuestro repositorio local tal que así:
```
[local]
name=Local
baseurl=http://192.168.0.65/local/
enabled=1
```
Actualizamos
```
sudo yum check-update
```
Y listo, ya podemos instalar, si quieres ver qué paquetes tenemos disponibles para instalar:
```
yum list available |grep local
```

_NOTA: Si hemos hecho el paso B-O-N-U-S, tendremos que desactivar todos los repositorios de yum menos el nuestro. Basta con mover todos a una carpeta nueva llamada backup-repos y listo_

¡Espero que les haya gustado este tutorial!

# Referencias
 * [RHEL Documentation database](https://access.redhat.com/solutions/9892?target=_blank)
 * [Firewalld documentation](https://firewalld.org/documentation?target=_blank) 
 * Kea, ifcfg, restorecon... man database
