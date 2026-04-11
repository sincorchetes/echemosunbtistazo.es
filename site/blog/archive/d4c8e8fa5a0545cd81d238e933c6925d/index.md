---
uuid: d4c8e8fa5a0545cd81d238e933c6925d
title: "Gestionando aplicaciones por defecto en Linux"
slug: /posts/gestionando-aplicaciones-por-defecto-en-linux
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
Una de las formas que tiene Linux es que es tan configurable y tan versátil que podemos hacer lo que queramos con él, en este artículo veremos cómo configurar las aplicaciones por defecto para abrir X tipos de archivos.

<!-- truncate -->

# ¿Aplicaciones por defecto?
Todos los archivos tienen un identificador que permiten saber que tipo de dato contienen como por ejemplo un archivo de audio, está compuesto por un tipo de fichero de audio ya sea `MP3, OGG...`

Cuando utilizamos un entorno de escritorio o un gestor de ventanas (_ya que el sistema en "crudo" no utiliza los MIME types, hace uso de otros métodos_), el servidor gráfico interactúa con una base de datos que contiene lo que se denominan MIME Types. Los MIME Types es un estándar que facilita la identificación de los tipos de archivos del sistema mediante una serie de atributos en la cabecera del archivo que permiten presentarlos correctamente.

Podemos ver esta lista en `/usr/share/applications/mimeapps.list`
```
[Default Applications]
application/x-dia-diagram=dia.desktop
text/x-vcard=evolution.desktop
text/directory=evolution.desktop
text/calendar=evolution.desktop
application/x-cd-image=gnome-disk-image-mounter.desktop
application/x-raw-disk-image=gnome-disk-image-writer.desktop
application/x-raw-disk-image-xz-compressed=gnome-disk-image-writer.desktop
image/x-compressed-xcf=gimp.desktop
image/x-xcf=gimp.desktop
image/x-psd=gimp.desktop
image/x-fits=gimp.desktop
[...]
```
Para crear nuestra propia lista de aplicaciones la podemos hacer mediante comando `xdg-mime` o creando el archivo directamente en `~/.config/mimeapps.list`

# Con xdg-mime
Esta herramienta la podemos encontrar dentro del paquete `xdg-utils` de nuestra distribución.

Añadir una aplicación por defecto:
```
xdg-mime default *.desktop mime_type
```
Por ejemplo, abrir ficheros PDF con el visor ligero de MuPDF.
```
xdg-mime default mupdf.desktop application/pdf 
```

# Manualmente
Editamos o creamos el fichero `~/.config/mimeapps.list` con nuestro editor favorito y a la par viendo la DB de mime ubicada en `/usr/share/applications/mimeapps.list`

# Referencias
 * IANA [RFC](https://tools.ietf.org/html/rfc6838?target=_blank)
 * Freedesktop [Spec](https://specifications.freedesktop.org/mime-apps-spec/mime-apps-spec-1.0.html?target=_blank)
 * Mozilla Developer [Doc](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types?target=_blank)
