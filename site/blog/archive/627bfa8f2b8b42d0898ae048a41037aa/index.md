---
uuid: 627bfa8f2b8b42d0898ae048a41037aa
title: "Transfersh sube archivos desde terminal"
slug: /posts/transfersh-sube-archivos-desde-terminal
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Sistemas
---
Si quieres compartir archivos desde Bash por ser un curioso, por subir ficheros de un servidor a otro sitio...etc puedes hacerlo mediante [transfer.sh](https://transfer.sh?target=_blank).

<!-- truncate -->

Este servicio permite alojar archivos de hasta 10GB de capacidad sin coste alguno. También añade una serie de características como seguridad (_archivos alojados encriptados_), obtienes una URL para descargar los archivos desde cualquier navegador y todo con un plazo de hasta ¡14 días!

Tan solo hay que utilizar `curl(1)`, un programa parecido a `wget(1)`, este permite transferir datos a servidores utilizando algúno de los protocolos soportados como DICT, FILE, FTP, FTPS, GOPHER, HTTP, HTTPS,  IMAP, IMAPS,  LDAP,  LDAPS,  POP3,  POP3S,  RTMP, RTSP, SCP, SFTP, SMB, SMBS, SMTP, SMTPS, TELNET y TFTP). 
También tiene otras características como soporte para proxy, autenticación de usuari@s, conexión SSL, cookies...etc

# ¿Cómo funciona el servicio?
Bueno básicamente, con ejecutar:
```
curl --upload-file fichero_a_subir https://transfer.sh
```
Este devolverá una URL que apunta al fichero.
También se puede hacer directamente, si añades en el apartado _"Drag your files here, or  click to browse."_ dará el mismo resultado via Web.

# ¿Cómo descargo el fichero?
Bien, puedes hacer un simple:
```
curl https://transfer.sh/NUMERO/NOMBRE_ARCHIVO -o NOMBRE_ARCHIVO
```
O bien, desde la propia Web.

<script src="https://asciinema.org/a/189051.js" id="asciicast-189051" async></script>

¡A qué espera a probarlo!
