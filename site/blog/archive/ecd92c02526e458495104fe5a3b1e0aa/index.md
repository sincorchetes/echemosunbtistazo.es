---
uuid: ecd92c02526e458495104fe5a3b1e0aa
title: "Instalando Doas en Gentoo"
slug: /posts/instalando-doas-en-gentoo
date: 2022-01-10
authors:
  - sincorchetes
tags:
  - Linux
---
Doas es una alternativa a sudo, el comando más utilizado por la mayor parte de las distribuciones para obtener privilegios o para ejecutar determinados programas concretos.

<!-- truncate -->

Fue desarrollado por el equipo de OpenBSD, intenta ser minimalista y fácilmente entendible en su configuración. Tiene el 95% de características de sudo en una fracción de código base incrementado así la seguridad.

## Instalando

Vamos habilitar el USE flag persist para poder hacer uso de esta opción en el `/etc/doas.conf`, esto nos permitirá poder ejecutar doas sin perdirnos cada 5 minutos la contraseña.

```
# mkdir /etc/portage/profile
# echo "-persist" > /etc/portage/profile/use.mask
# emerge --ask app-admin/doas
```

## Configurando

Añadiendo nuestro usuario al grupo `wheel`

```
# gpasswd -a USUARIO wheel
```

Añadiendo la siguiente línea:
```
# echo "permit persist keepenv :wheel" > /etc/doas.conf
```

Ahora podemos probar a ejecutar algo:

```
doas cat /var/log/kern.log
doas (sincorchetes@basecamp) password:
doas ls
```

Veremos que nos solicita contraseña, si queremos dejar que nos pregunte siempre, quitamos `persist`.

El `keepenv` permite mantener las variables de entorno que tenemos en nuestro usuario.

## Bonus, apagado, reinicio

Para reiniciar o apagar nuestro equipo con Doas, añadimos las siguientes líneas al fichero `/etc/doas.conf`:

```
permit nopass :wheel cmd poweroff
permit nopass :wheel cmd reboot
```
Con esto, cuando hagamos `doas reboot` o `doas poweroff` se apagará sin pedir contraseña.


