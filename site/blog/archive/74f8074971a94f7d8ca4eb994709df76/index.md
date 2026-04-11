---
uuid: 74f8074971a94f7d8ca4eb994709df76
title: "Twister, gestiona tus frameworks frontend más populares desde Bash"
slug: /posts/twister-gestiona-frameworks-frontend-populares
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Desarrollo
---
Buenas tardes compañer@s, siento no poder llegar a los plazos de las entregas, pero tenemos un ritmo frenético de trabajo, no obstante, tenemos muchas ideas para entregar y sobre todo queremos acabar nuestro Mastering en Bash para/con vosotr@s.

<!-- truncate -->

Hemos ideado un script llamado ¡Twister!, ¡Sí!, porque mezclar _frameworks_ es divertido e incrementa las funcionalidades de nuestros sitios Web por menos tiempo!

Twister nos permite **crear nuestros proyectos basados en frameworks conocidos del lado del "_front-end_"**. Para quiénes no lo sepan, cuando se elabora un desarrollo Web, suelen haber (_**no siempre**_) diversos compañer@s que se encargan de diversas capas del proyecto. 
* Desarrolladores _front-end_, son aquellas personas que se dedican a elaborar el **diseño de la página Web** como la plantilla, las ventanas de diálogo, efectos...
* Programadores _back-end_, encargad@s de elaborar todo el contenido que será **procesado por servidores**, como consultas a sistemas gestores de bases de datos...etc
* Redactores de documentación, se encargan de **elaborar los manuales** de usuari@, de continuación de desarrollo...

<script src="https://asciinema.org/a/188732.js" id="asciicast-188732" async></script>

# Pero.. ¿Qué es un framework?
Ahora bien, ¿_Qué es un framework_? Un _framework_ o bifurcación en español, es una **extensión de un software, aplicación...etc que ya existe, y potenciarlo bajo otro nombre**. Ya sea porque el software que está es viejo, ya no se mantiene, y se pretende darle otro aire; por motivos prácticos como pasó cuando Oracle paró el desarrollo de OpenOffice y así nació LibreOffice; enriquecimiento personal...

Sin embargo, en los desarrollos Web es común ver como hay una multitud de _frameworks_ que permiten **facilitarnos la vida** a tod@s aquell@s que diseñan o elaboran un sitio Web. Ya que, una persona o un conjunto de personas han elaborado otra forma de hacer las cosas, y que, si lo hiciésemos nosotr@s desde 0 **tardaríamos meses de trabajo tedioso** como es la traducción de mensajes a otros idiomas de cada diálogo que elaboremos, un sistema de login de usuari@s...

Ahora bien, este script permite **descargar y crear entorno de trabajo con algunos _frameworks_ más utilizados** como es el caso de jQuery, un _framework_ de JavaScript que lleva vigente desde el 26 de agosto del 2006 con el propósito de **facilitar la gestión de eventos, efectos y muchas cosas** con las que tardaríamos la vida si lo hiciéramos con JavaScript puro.

Bootstrap liderado por Twitter desde agosto de 2011 que consiste en un conjunto de código CSS (_hojas de estilo_) y JS (_JavaScript_) apoyado en jQuery que **permite obtener una interfaz profesional con poco código utilizado**.

Y por último, VUE.js, elaborado en febrero de 2014 por Evan ,  un desarrollador de Google contribuyó mucho en un _framework_ de JavaScript muy conocido como es _AngularJS_. Este extrajo algunas partes que consideraba buenas y creó otro _framework_ **para desarrollar y facilitar así la programación de eventos, interfaz... así como crear una aplicación Web del lado del cliente**. (_En otros post explicaremos todo con más detalle_).

Más adelante, iremos actualizando el script añadiendo mejoras como, instalar _frameworks_ que se ejecuten en el lado del servidor (_backend_); menú gráfico; más _frameworks_ interesantes...etc

El Script está elaborado en Bash, licenciado bajo los términos GNU GPL 2.0, y se puede obtener desde [GitLab](https://gitlab.com/sincorchetes/Twister?target=_blank)

```
git clone https://gitlab.com/sincorchetes/Twister.git
```
¡Un saludo internautas!
