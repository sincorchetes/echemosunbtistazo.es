---
uuid: 5d1c7e48d84d4291a57fd204202e0185
title: "Distrochooser, descarga fácilmente distros de Linux desde CLI"
slug: /posts/distrochooser-descarga-distros-desde-terminal-facilmente
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
Distrochooser es un pequeño script que he elaborado para descargar cualquier distribución popular pulsando un par de teclas evitando ir a los mirrors o páginas oficiales para descargarlos. 
Se puede obtener desde GitHub

<!-- truncate -->

```
git clone https://github.com/sincorchetes/distrochooser
chmod +x distrochooser/run.sh
./distrochooser/run.sh
```
Este script crea un directorio `iso` en la ruta de trabajo actual dónde descargar la imagen, para su descarga hace uso del comando `wget` utilizando el modificador `-c` que permite renaudar la descarga en caso de fallo, por lo que deberemos tenerlo instalado en nuestro sistema.

En la próxima versión soportará verificación de firma, más distribuciones. Espero que os guste.

<script src="https://asciinema.org/a/YALdTZZWMUPFOjPVgpbbA6cIt.js" id="asciicast-YALdTZZWMUPFOjPVgpbbA6cIt" async></script>

Un saludo.
