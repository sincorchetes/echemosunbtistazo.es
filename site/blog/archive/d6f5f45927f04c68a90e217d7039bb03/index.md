---
uuid: d6f5f45927f04c68a90e217d7039bb03
title: "Foreman una manera de supervisar y gestionar tus servidores"
slug: /posts/foreman-una-manera-de-supervisar-y-gestionar-tus-servidores
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Sistemas
---
Foreman es una plataforma Open Source que permite administrar y gestionar servidores tanto virtuales como físicos y que también ayuda a la hora de realizar tareas automatizadas de una forma muy interactiva y fácil de utilizar. En este entrega vamos a ver cómo podemos desplegar e instalar Foreman en CentOS 8.

<!-- truncate -->

# Instalando Foreman en CentOS 8
Antes de proceder, es aconsejable tomar un snapshot de nuestra máquina si es virtual, o hacer una copia de seguridad si es física o también hacer ambas cosas.

## Paso previo
Hacemos una copia del fichero `/etc/hosts`
```
# cp -va /etc/hosts /etc/hosts.instalando_foreman
```
Editamos el archivo `/etc/hosts` y añadimos una línea al final referenciando el hostname de nuestro servidor y la ip, guardamos el archivo.
_NOTA: Si no sabes cuál es el hostname, puedes usar el comando `hostnamectl`, este te devolverá mucha información, pero solo te interesa aquella que ponga "Static hostname". Y para la ip, identifica que tarjeta tienes con el comando `ip addr` que esté conectada y accesible a tu red interna._

_NOTA 2: Utiliza como nombre de host minúsculas o te dará un error como este:_
```
The hostname contains a capital letter.

This is not supported. Please modify the hostname to be all lowercase. If needed, change the hostname permanently via the
'hostname' or 'hostnamectl set-hostname' command
and editing the appropriate configuration file.
(e.g. on Red Hat systems /etc/sysconfig/network,
on Debian based systems /etc/hostname).

If 'hostname -f' still returns an unexpected result, check /etc/hosts and put
the hostname entry in the correct order, for example:

  1.2.3.4 hostname.example.com hostname

The fully qualified hostname must be the first entry on the line
Your system does not meet configuration criteria
```
Si tienes este problema, basta con aplicar estos cambios:
```
# cp -va /etc/hostname /etc/hostname.cambio_hostname
```
Editas el nombre del hostname que quieras:
```
# hostnamectl set-hostname $(cat /etc/hostname)
```
Modificas el nombre del host que hayas puesto en `/etc/hosts` que hace referencia a tu host actual, cierras sesión en tu servidor, te vuelves a loguear y prosigues con la instalación.

Ejemplo:
```
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

192.168.1.122 myhostname.lan
```
Es importante este proceso o cuando realices el paso de la instalación de la plataforma te dará un error como este:
```
Unable to resolve forward DNS for your system blabla
Does not meet configuration criteria
```
## Instalando el software necesario
Importamos la llave GPG de Foreman
```
# rpm --import https://yum.theforeman.org/releases/2.1/RPM-GPG-KEY-foreman
```
Instalamos los repositorios necesarios:
```
# dnf install -y https://yum.puppet.com/puppet-release-el-8.noarch.rpm 
# dnf install -y https://yum.theforeman.org/releases/2.1/el8/x86_64/foreman-release.rpm
# dnf install -y epel-release 
```
Editamos la configuración de los repositorios
```
# cp -va /etc/yum.repos.d/foreman.repo /etc/yum.repos.d/foreman.repo.cambiar_version
# cp -va /etc/yum.repos.d/foreman-plugins.repo /etc/yum.repos.d/foreman-plugins.repo.cambiar_version
# sed -ie 's/el7/el8/g' /etc/yum.repos.d/foreman.repo /etc/yum.repos.d/foreman-plugins.repo
# sed -ie 's/2.0/2.1/g' /etc/yum.repos.d/foreman.repo /etc/yum.repos.d/foreman-plugins.repo
```
_NOTA: Esto hay que hacerlo, porque la comunidad de Foreman no automatizó este proceso haciendo uso de variables en su repositorio..._

Instalamos el software de Foreman
```
# dnf check-update && dnf install -y foreman-installer
```
## Lanzamos la instalación de la plataforma
_NOTA: Este proceso se demorará un poco más o un poco menos dependiendo de tu hardware físico._
```
# foreman-installer
```
Veremos información quee va actualizándose en la termianl y cuando termine, nos devolverá un mensaje como este:
```
Preparing installation Done                                           
foreman-rake upgrade:run finished successfully!
  Success!
  * Foreman is running at https://myhostname.lan
      Initial credentials are admin / WoFc7UX2Ycm4WkXp
  * Foreman Proxy is running at https://myhostname.lan:8443
  The full log is at /var/log/foreman-installer/foreman.log
```
Ya podemos acceder a la interfaz web de forma local que aunque es un logro, no nos interesa porque gestionar un portal web desde un navegador como lynx o elinks no es especialmente plato de buen gusto, por lo que, haremos la gestión desde nuestro equipo, pero antes hay que habilitar el acceso en el cortafuegos en el servidor. Por defecto una vez instalado, se crea un servicio llamado `foreman.service` que se habilita en el arranque sin que tengamos que hacer nada.

```
# firewall-cmd --add-port 443/tcp --permanent
# firewall-cmd --add-port 8443/tcp --permanent
# firewall-cmd --reload
```
Accedemos desde nuestro equipo por IP, si tienes un servidor DNS que ya te resuelve el hostname, pues accede a través de él.

https://192.168.1.172 (_en mi caso_)

<img src="https://echemosunbitstazo.es/blog/foreman-una-manera-de-supervisar-y-gestionar-tus-servidores/certificado.png" class="img-fluid" alt="Certificado inválido">


Vemos que el certificado es inválido, esto suele ocurrir en los despliegues de los servicios que necesiten obligatoriamente un certificado SSL. Estos generan un certificado autofirmado haciendo mención al hostname, aunque intentes crear una entrada en tu `/etc/hosts` de tu máquina dónde gestionarás Foreman y hagas la traducción, como no hay ninguna entidad que pueda avalar la autoridad este certificado seguirá siendo invalido. 

<img src="https://echemosunbitstazo.es/blog/foreman-una-manera-de-supervisar-y-gestionar-tus-servidores/certificado2.png" class="img-fluid" alt="Certificado inválido">

Pero si tienes un certificado validado con Let's Encrypt por ejemplo lo puedes gestionar más adelante.

Nos saltamos la validación y accedemos al portal:

<img src="https://echemosunbitstazo.es/blog/foreman-una-manera-de-supervisar-y-gestionar-tus-servidores/foreman.png" class="img-fluid" alt="Foreman Login">

Insertamos las credenciales que nos devolvió la terminal una vez se instaló y vemos el inicio de la aplicación web y veremos este panel principal o _dashboard_ bastante vistoso que podemos personalizar como queramos (_dentro de lo que nos deje claro_).

<img src="https://echemosunbitstazo.es/blog/foreman-una-manera-de-supervisar-y-gestionar-tus-servidores/foreman_dashboard.png" class="img-fluid" alt="Panel principal">

En él podemos ver los equipos registrados, su estado, los últimos eventos, gráficas... te recomiendo que la primera cosa que hagas sea cambiar la contraseña de tu usuario, accede a la parte superior derecha de la pantalla dónde dice "My Account", y aquí edites la contraseña:

<img src="https://echemosunbitstazo.es/blog/foreman-una-manera-de-supervisar-y-gestionar-tus-servidores/foreman_password.png" class="img-fluid" alt="Cambiar contraseña">

Espero que os haya gustado este tutorial, en las siguientes entregas veremos como ir añadiendo hosts a nuestro inventario y cómo podemos trabajar con ellos.
