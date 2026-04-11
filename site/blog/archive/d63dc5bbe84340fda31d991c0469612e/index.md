---
uuid: d63dc5bbe84340fda31d991c0469612e
title: "Recuperando el acceso al usuario root"
slug: /posts/recuperando-acceso-root-live
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
# ¿Qué pasa cuando nos olvidamos de la contraseña de root?

<!-- truncate -->

> — Cariño, ¿A dónde vas?

> — Pues a comprar

> — ¿No me das un beso?

> — Pero..., si vuelvo en un momento

> — Vale, vale...

Creo que tod@s l@s que hemos tenido pareja, entendemos esa escena en la que escuchamos ese Vale vale con cierto rintintín como si estuvieran diciendo *"Oye te quedas sin postre esta noche"*... Pues esto es igual, pero depende de la gravedad del asunto nos puede resultar un suplicio o podemos pasar un buen rato aprendiendo. Como nos olvidemos de la contraseña del superusuario y no tengamos `sudo(1)` configurado con las restricciones y permisiones respectivas para poder llevar a cabo tareas de administración la tenemos crudo. Sin embargo, tenemos un método alternativo para asignar una nueva contraseña y salir del apuro.

¡Comencemos!

# Requisitos
En primer lugar, necesitamos tener bajo nuestro brazo un *live CD/DVD/USB/PXE* con el que arrancar un entorno Linux en nuestro ordenador, preferiblemente si tenemos un sistema que corre bajo `systemd(1)`, utilicemos una versión similar, al igual que si usa `runit(1)` o `upstart(1)` y sobre todo que sea acorde con vuestra arquitectura instalada, si es ARM, x86 (32 bits), o x86_64/AMD64T (64-bits).

# Primeros pasos
Una vez que hemos arrancado el live *, tendremos que saber, qué particiones debemos de montar y sobre todo, cada uno sabrá que esquema de particiones, en nuestro caso vamos ha hacerlo utilizando el siguiente esquema de particionado del disco.

* `/`-> Raíz del sistema -> `/dev/sda1`
* `/boot` -> Partición con el contenido de arranque -> `/dev/sda2`
* `swap` -> Partición de intercambio -> `/dev/sda3`

Solo haremos uso de la partición raíz en este caso

Abriremos una terminal y escribiremos lo siguiente:
```
su -
mkdir /recuperacion
mount /dev/sda1 /recuperacion
mount --rbind /dev /recuperacion/dev
mount --make-rslave /recuperacion/dev
mount --rbind /sys /recuperacion/sys
mount --make-rslave /recuperacion/sys
mount -t proc /proc /recuperacion/proc
```
En este bloque de comandos, lo que hacemos es obtener todos los privilegios de superusuario dentro de la imagen *Live*.

*NOTA: En otro post explicaremos que son los usuarios, grupos y qué es ser superusuario.*

1. Creamos un directorio dónde montaremos la partición raíz y la montamos
2. Montamos los sistemas de archivos virtuales en sus respectivos directorios (*dev, proc y sys*)

# Haciendo chrooting
Un `chroot(1)` es un comando que nos permite de alguna forma aislar un entorno Linux que hayamos montado en nuestro sistema y seguir trabajando sin problemas en nuestro sistema operativo, es decir, tendremos un Linux dentro de otro Linux y podremos operar con él para según que cosas. Esto es muy útil para gestiones de este tipo, en Gentoo por ejemplo se utiliza para instalar el sistema y en sistemas como FreeBSD tenemos una variante similar llamada [`jails(1)`](https://www.freebsd.org/doc/en_US.ISO8859-1/books/handbook/jails.html?target=_blank) que es un `chroot(1)` con *esteroides*, en la que permiten lanzar servicios o *"daemons"* de forma aislada y sin tener que instalar un sistema base para poder operar con él.

Bien, pues vamos a por ello:

```
chroot /recuperacion /bin/bash
```
*NOTA: Depende de la distribución que uses, te interesará recuperar el usuario root o el usuario corriente con `sudo(1)` configurado. Por ejemplo, las distribuciones como Ubuntu conceden privilegios de administración máximos del sistema a los usuarios corrientes haciendo uso de `sudo(1)`, y las distribuciones como CentOS, Fedora, Gentoo... sin embargo, prefieren separarlo y hacer uso del comando UNIX por excelencia `su(1)` para autenticarse como root y tener privilegios.*

## Recuperando la contraseña
En caso de distribuciones con Ubuntu o en las que tengamos nuestr@ usuari@ con `sudo(1)`:
```
passwd usuario_comun
```

En caso de distribuciones como Fedora, Gentoo, Archlinux... o que utilicen el usuario root:
```
passwd root
```

Cuando nos pida la contraseña y comencemos a escribir, por motivos de seguridad no se mostrará en la terminal, por lo que tenemos que estar seguro de lo que escribimos.

# Terminando
Una vez que acabemos, desmontamos todos los sistemas de archivos y reiniciamos.
```
exit
umount -l /recuperacion
systemctl reboot
```

Referencias
* [Gentoo Installation Guide](https://wiki.gentoo.org/wiki/Chroot/es?target=_blank)
* [FreeBSD Handbook ~ Jails](https://www.freebsd.org/doc/en_US.ISO8859-1/books/handbook/jails.html?target=_blank)
* [Fedora Reset Password](https://fedoraproject.org/wiki/How_to_reset_a_root_password?target=_blank)
* Google
* Man pages ~ `chroot(1)`
