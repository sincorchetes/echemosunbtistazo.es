---
uuid: e6a0f27481a9468e9af7c2da4b27807e
title: "Monta tu LAMP+ en menos de dos minutos"
slug: /posts/monta-tu-lamp-en-menos-de-dos-minutos
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
Seguro que much@s de nosotr@s cuando hemos tenido que desarrollar alguna página Web en un entorno Windows montado alguna vez la suite de software [XAMPP](https://www.apachefriends.org/index.html?target=_blank) de Apache Friends para salir del paso y tener un entorno mínimo comenzar a programar, en vez de instalar un servicio uno por uno porque además de que en Windows es uno de los sistemas en los que este trabajo resulta algo más laborioso.

<!-- truncate -->

Sin embargo, Linux o los sistemas UNIX-like son mucho más amigables en cuánto entornos de desarrollo tanto de software como de aplicaciones Web. El uso de los **gestores de paquetes** junto con el **amplio soporte de software oficial** incluido en los repositorios, el uso de **librerías compartidas del sistema**, la **documentación extensa** y sobre todo las mil y una funcionalidades en materia de seguridad, optimización, escalabilidad... que se pueden añadir para potenciar el sistema operativo, hacen que los UNIX-like sean clave para este tipo de tareas.

Como ejemplo disparatado, la lista de servidores [top500](https://top500.org?target=_blank), en los que **el 100% de los supercomputadores más potentes del mundo hacen uso de Linux para todo tipo de operaciones y cálculos**. Para que veamos, que aquell@s que tengamos un "_tuxito_" instalado en nuestro PC, no tenemos un SO de "_juguete_".

## ¿Qué es Lampy?
Lampy es un script que permite instalar en poco menos de 1 paso un entorno de desarrollo Web. Un servidor Web que puede ser Apache o Nginx; un servidor FTP (vsftpd); un sistema gestor de base de datos que en este caso es MariaDB y por último el lenguaje de desarrollo web PHP.

<script src="https://asciinema.org/a/190993.js" id="asciicast-190993" async></script>

Actualmente, solo se puede utilizar para **Archlinux, Debian, Fedora, openSUSE y Ubuntu**, pero que en un futuro iremos añadiendo más características y soporte para otras distribuciones como Gentoo y CentOS.

El script se puede obtener desde el repositorio de [Gitlab](https://gitlab.com/sincorchetes/lampy?target=_blank)

```
git clone https://gitlab.com/sincorchetes/lampy.git
```
¡Un saludo y a disfrutarlo!
