---
uuid: 2bbe8711551c412e85bac5c7bba22ef2
title: "Detecta cambios en tus archivos con AIDE"
slug: /posts/detecta-cambios-en-tus-archivos-con-aide
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Sistemas
  - Seguridad
---
Aide es un sistema avanzado de detección de intrusión que nos permite visualizar cambios en los archivos. Si una persona accede de forma ilegal a nuestro servidor y modifica un archivo que no tiene que tocar, este sistema de intrusión te lo detecta mediante el hash del archivo.

<!-- truncate -->

También permite revisar nuevos archivos creados, eliminados o modificados. Al realizar un escaneo a los archivos puede devolver diversos códigos de salida como errores de escritura, argumentos inválidos, funciones incompletas...etc
El software no ocupa más que 200kb de espacio, y tiene un gran potencial, algo similar a mlocate.

# Instalación en Fedora
```
sudo dnf install aide
```

# Ejemplos de uso
En el siguiente apartado veremos los usos que podemos darle:
 * [Comprobar versión](#apartado-1)
 * [Generar la base de datos](#apartado-2)
 * [Instalar la DB en el directorio estipulado en `/etc/aide`](#apartado-3)
 * [Comprobando la integridad sin cambios](#apartado-4)
 * [Comprobando la integridad con una modificación](#apartado-5)

<a id="apartado-1"></a>
## Comprobar versión:
Podemos ver todas las opciones con las que se compiló y de dónde obtiene la configuración.
```
sudo aide --version
Aide 0.16

Compiled with the following options:

WITH_MMAP
WITH_PCRE
WITH_POSIX_ACL
WITH_SELINUX
WITH_XATTR
WITH_E2FSATTRS
WITH_LSTAT64
WITH_READDIR64
WITH_ZLIB
WITH_CURL
WITH_GCRYPT
WITH_AUDIT
CONFIG_FILE = "/etc/aide.conf"
```
<a id="apartado-2"></a>
## Generar la base de datos
Depende del volumen de información que tengamos puede que tarde más o menos, hay que tener un poco de cuidado si estamos trabajando con elementos críticos en el sistema y tengamos un sistema no muy potente.

```
sudo aide --init
AIDE initialized database at /var/lib/aide/aide.db.new.gz

Number of entries:  11284

---------------------------------------------------
The attributes of the (uncompressed) database(s):
---------------------------------------------------

/var/lib/aide/aide.db.new.gz
  MD5      : dwWdkE+qrFulxJf6iEWJTQ==
  SHA1     : aK4Ao0mbmSmtCueAhyJnoJ4mdwI=
  RMD160   : TDxnNq5kYr1fmXXi8lAgCdsnfeA=
  TIGER    : nqgmBwvdbU4BrDrBS0pFdn9MIYPwd2q5
  SHA256   : QT3fev2WCQ+rDzvPMFU8ZgRgEXAd1pzd
             WLf95un9zeg=
  SHA512   : wCjWTKbQuKfNN/Y2Jytuq71waZrm24sr
             aQMShVvuYDS2DBRiT0G0WP146SuAkFV6
             lGqBitUYo+AgqvEPLuNXAQ==


End timestamp: 2019-01-16 18:56:44 +0000 (run time: 0m 7s)
```
<a id="apartado-3"></a>
## Moviendo la base de datos
Este proceso es esencial a menos que modifiquemos la línea de dónde leerá la base de datos en el fichero de configuración o bien se lo indiquemos mediante parámetro.
```
sudo mv mv /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz
```
<a id="apartado-4"></a>
## Comprobar la integridad de los archivos
Permite visualizar si hay o no cambios en la integridad de los archivos.
```
sudo aide --check
AIDE found NO differences between database and filesystem. Looks okay!!

Number of entries:  11284

---------------------------------------------------
The attributes of the (uncompressed) database(s):
---------------------------------------------------

/var/lib/aide/aide.db.gz
  MD5      : rK2m9AmpajAl1ft5hBUMNQ==
  SHA1     : 0gB7cMLYLFHjRs52/7EBp3+NeS4=
  RMD160   : AcDvvoKGwNGBJe4xN+GpQVjFF2k=
  TIGER    : VOjFoPFMk6Q6zuRZcPNkaHPPYOT5yG7F
  SHA256   : xCptxDZF+uw36xUP1F0pRgc+iQtAtCbO
             aJqaD2EzhHs=
  SHA512   : SEoScwAVxVPvCfC1ZSVLR+iTP2H/ZV1d
             hi+FZm1MzVQhrsL5yqTOPxLuitdzYnn6
             aZpV9FSangKVytif0MM2vQ==


End timestamp: 2019-01-16 19:02:40 +0000 (run time: 0m 5s)
```
Como puedes ver, no se observan cambios.
<a id="apartado-5"></a>
## Prueba modificando uno de ellos
Si toqueteamos el fichero de `/etc/krb5.conf` que pertenece a una cosa rara llamada Kerberos, te devolverá una salida como esta indicando que ha habido un cambio en el archivo de configuración.
```
AIDE found differences between database and filesystem!!

Summary:
  Total number of entries:  11284
  Added entries:    0
  Removed entries:    0
  Changed entries:    1

---------------------------------------------------
Changed entries:
---------------------------------------------------

f   ...   i  . . : /etc/krb5.conf

---------------------------------------------------
Detailed information about changes:
---------------------------------------------------

File: /etc/krb5.conf
  Inode    : 12452018                         | 12717139


---------------------------------------------------
The attributes of the (uncompressed) database(s):
---------------------------------------------------

/var/lib/aide/aide.db.gz
  MD5      : rK2m9AmpajAl1ft5hBUMNQ==
  SHA1     : 0gB7cMLYLFHjRs52/7EBp3+NeS4=
  RMD160   : AcDvvoKGwNGBJe4xN+GpQVjFF2k=
  TIGER    : VOjFoPFMk6Q6zuRZcPNkaHPPYOT5yG7F
  SHA256   : xCptxDZF+uw36xUP1F0pRgc+iQtAtCbO
             aJqaD2EzhHs=
  SHA512   : SEoScwAVxVPvCfC1ZSVLR+iTP2H/ZV1d
             hi+FZm1MzVQhrsL5yqTOPxLuitdzYnn6
             aZpV9FSangKVytif0MM2vQ==


End timestamp: 2019-01-16 19:05:15 +0000 (run time: 0m 2s)
```

Como vemos, no es un software muy "moderno", pero cumple su función.

¡Espero que le saquéis utilidad!
