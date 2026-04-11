---
uuid: 64d7214bfa0d418fbf0920b01c4b03b5
title: "QEMUzier - Gestiona máquinas virtuales en QEMU/KVM fácilmente"
slug: /posts/gestiona-maquinas-virtuales-en-qemu-kvm-facilmente-con-qemuzier
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
QEMUzier es un pequeño script licenciado bajo GPL v2.0 que he laborado para gestionar de forma muy sencilla máquinas virtuales con el software de emulación QEMU modificado para utilizarlo con KVM para obtener virtualización completa en Linux.

<!-- truncate -->

Por el momento está adaptado para utilizarlo en distribuciones Fedora.

Para poder instalarlo:

GitLab
```
git clone https://gitlab.com/sincorchetes/qemuzier
```

GitHub
```
git clone https://github.com/sincorchetes/qemuzier
```
Cuando ejecutemos el script, hará una comprobación de dependencias para saber si tenemos qemu-img instalado y luego nos preguntará que queremos hacer.

# Registrarlo en Bash
Si no queremos estar accediendo cada vez al directorio para ejecutarlo, podemos hacer que Bash lo reconozca siempre.

Añadimos la ruta a nuestra ruta de entorno personalizada ubicada en `.bash_profile`

Añadimos la ruta dónde se ubique el directorio, por ejemplo:
`PATH=$PATH:$HOME/.local/bin:$HOME/Documents/qemuzier`

Para ver que se ejecuta, ejecutamos `bash` dentro de una terminal de comandos ya instanciada y veremos una salida como esta.
```
Welcome to QEMUzier. Script to create a new VM easy
List of currently created VMs

Debian
Choose an options:
1) Run VM
2) Create VM
3) List VMs
4) Destroy VM
Choose one: 
```
# ¿Qué nos ofrece este script?
Bueno básicamente es para un uso sencillo, crear una máquina virtual con disco duro en formato QCOW, red en modo NAT, y que arranque con una imagen .ISO.

Las imágenes .ISO se almacenan en la ruta que te crea el script al principio en `$HOME/.qemuzier/.iso`. Este script no utiliza ningún tipo de base de datos que verifique las máquinas virtuales. Simplemente o están creadas (con ello implica la creación de un directorio dentro de `.qemuzier`, o no).

# ¿De cara al futuro?
Se puede incluir un auto-_checking_ de dependencias, y una adaptación a las distribuciones populares; la posibilidad de crear redes _bridging_, he incluso, dotarlo de una interfaz gráfica con Python y PyGTK.

¡Espero que le saquéis algún partido!
