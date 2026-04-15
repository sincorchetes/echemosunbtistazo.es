---
uuid: fb4cdac535823072358e582c67835a8d
title: "Nix, gestor de paquetes"
slug: /posts/nix-gestor-de-paquetes
date: 2026-03-20
authors:
  - sincorchetes
tags:
  - Linux
  - NixOS
  - DevOps
---

¿Cuántas veces has instalado algo "para probar" y se ha quedado ahí para siempre? ¿O peor, has roto dependencias por mezclar versiones? Nix es un gestor de paquetes que funciona de forma radicalmente distinta a lo que conoces. No toca `/usr/bin`. No ensucia tu sistema. No pisa a nadie. Cada paquete vive aislado en `/nix/store` con su propio hash, sus propias dependencias y su propio mundo. ¿Resultado? Puedes probar software, cerrarlo y que no quede ni rastro. Como si nunca hubiera estado ahí.

Pero Nix no es solo un gestor de paquetes, también es un lenguaje de programación propio. Y eso abre la puerta a cosas muy interesantes que iremos desgranando en esta serie. Hoy vamos a lo práctico: entornos temporales, ejecuciones ad-hoc y cómo limpiar el store cuando se te vaya de las manos.

<!-- truncate -->

Hay varias formas de usar Nix, y a lo largo de esta serie las iremos cubriendo todas. Hoy empezamos por la más directa y la que más vas a usar en el día a día: `nix-shell`.

## Creando un entorno temporal

Efectivamente, podemos crear un entorno temporal dónde solo contendrá aquello que queramos probar o usar, sin necesidad de ejecutar un `rebuild` para reconstruir el sistema.

Lo que hace `nix` es iniciar una nueva sesión de shell envolviendo la actual, y estableciendo bash como shell por defecto, además de heredar las variables de entorno como `DISPLAY, XDG_CURRENT_DESKTOP...` manteniendo el acceso a cualquier momento a los binarios ya instalados en nuestro sistema, pero antepone en el `$PATH` a los binarios que hayas solicitado, permitiendo usar el software que quieres probar junto con las herramientas ya instaladas en el sistema.

Vamos a probarlo instalando `toilet` un comando que muestra texto en diferentes formatos en terminal.

```shell
❯ nix-shell -p toilet

this path will be fetched (0.69 MiB download, 0.78 MiB unpacked):
  /nix/store/83vhly8yyqr4nlzjvdyjsghvrkfb7gzl-toilet-0.3
copying path '/nix/store/83vhly8yyqr4nlzjvdyjsghvrkfb7gzl-toilet-0.3' from 'https://cache.nixos.org'...

[nix-shell:~]$ 

```

Localizamos el binario

```shell
[nix-shell:~]$ whereis toilet
toilet: /nix/store/83vhly8yyqr4nlzjvdyjsghvrkfb7gzl-toilet-0.3/bin/toilet
```

Automáticamente, nuestro prompt cambiará añadiendo `nix-shell` y modificando algunos caracteres mostrando que estamos dentro de un entorno virtual temporal.

```shell
[nix-shell:~]$ toilet "Hola mundo"
                                                                      
 m    m        ""#                                           #        
 #    #  mmm     #     mmm          mmmmm  m   m  m mm    mmm#   mmm  
 #mmmm# #" "#    #    "   #         # # #  #   #  #"  #  #" "#  #" "# 
 #    # #   #    #    m"""#         # # #  #   #  #   #  #   #  #   # 
 #    # "#m#"    "mm  "mm"#         # # #  "mm"#  #   #  "#m##  "#m#" 
```

Si nos salimos del prompt con exit o cerramos terminal y volvemos a abrirla, no encontrará el comando

_NOTA: En mi caso uso zsh, que no te extrañe el error._

```shell
[nix-shell:~]$ exit
> toilet
zsh: command not found: toilet
```

Si lo tratamos de localizar con `whereis`, no encontramos rastro alguno de él:

```shell
❯ whereis toilet                                              
toilet:
```

Nix funciona de forma extraordinariamente eficiente, aunque hayas salido de la shell, el binario quedó instalado en el `/nix/store` de tal forma, que si necesitas volver a utilizarlo, simplemente comprueba que está en él, y no lo descarga de internet, manteniéndose así cacheado en nuestro sistema.

### ¿Qué pasa si solo quiero probar el software sin necesidad de tener acceso a mis herramientas?

Simplemente, añadimos el flag `--pure` al final del comando, así, `nix-shell` solo mantendrá en el `$PATH` los directorios de los binarios que quieres probar sin tener acceso a las herramientas del sistema (_a excepción de los comandos esenciales de `bash` como `ls, cat, grep...`_)

```shell
> nix-shell -p toilet --pure

[nix-shell:~]$ git
bash: git: command not found

[nix-shell:~]$ whereis cat
bash: whereis: command not found

[nix-shell:~]$ ls
hello.txt world.txt
```

Como puedes ver, incluso herramientas como `whereis` desaparecen, aunque `cat` o `ls` sigan ahí por ser parte del entorno básico de supervivencia de la shell.

### ¿Y si quiero iniciar todo el comando sin instalar nada?

En ese caso, ejecutamos el comando en una línea:

```shell
❯ nix-shell -p toilet --run "toilet Hola mundo"
                                                                      
 m    m        ""#                                           #        
 #    #  mmm     #     mmm          mmmmm  m   m  m mm    mmm#   mmm  
 #mmmm# #" "#    #    "   #         # # #  #   #  #"  #  #" "#  #" "# 
 #    # #   #    #    m"""#         # # #  #   #  #   #  #   #  #   # 
 #    # "#m#"    "mm  "mm"#         # # #  "mm"#  #   #  "#m##  "#m#" 
```

Es interesante para algún output en concreto como una ejecución ad-hoc en Ansible como aprovisionamiento, o en alguna parte del script de tu automatización de procesos que no requiera tenerlo instalado en tu sistema, de paso, evitamos la famosa frase de **en mi local funciona**.

### ¿Puedo usar múltiples programas a la vez?

Sí, claro, el flag `-p` lo que hace referencia es a `--packages`, simplemente separa todos los paquetes que quieras utilizar, por ejemplo:

```shell
> nix-shell -p toilet cowsay --run "toilet -t Hola Mundo | cowsay -n"
 ________________________________________________________________________
/                                                                        \
|  m    m        ""#                  m    m                   #         |
|  #    #  mmm     #     mmm          ##  ## m   m  m mm    mmm#   mmm   |
|  #mmmm# #" "#    #    "   #         # ## # #   #  #"  #  #" "#  #" "#  |
|  #    # #   #    #    m"""#         # "" # #   #  #   #  #   #  #   #  |
|  #    # "#m#"    "mm  "mm"#         #    # "mm"#  #   #  "#m##  "#m#"  |
|                                                                        |
\                                                                        /
 ------------------------------------------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

```

O si prefieres hacerlo en múltiples líneas

_NOTA: ¿Cuándo te vale esto? A parte de este ejemplo, si necesitas editar un archivo de configuración, y no quieres añadirlo a tu sistema o cosas de estas por ejemplo_.

```shell
> nix-shell -p toilet cowsay 
[nix-shell:~]$ toilet -t Hola Mundo | cowsay -n
 ________________________________________________________________________
/                                                                        \
|  m    m        ""#                  m    m                   #         |
|  #    #  mmm     #     mmm          ##  ## m   m  m mm    mmm#   mmm   |
|  #mmmm# #" "#    #    "   #         # ## # #   #  #"  #  #" "#  #" "#  |
|  #    # #   #    #    m"""#         # "" # #   #  #   #  #   #  #   #  |
|  #    # "#m#"    "mm  "mm"#         #    # "mm"#  #   #  "#m##  "#m#"  |
|                                                                        |
\                                                                        /
 ------------------------------------------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

```

### ¿Podría anidar otra sesión si se me ha olvidado un paquete?

¡Por supuesto! puedes ejecutar sesiones infinitas aunque no es lo recomendado.

```
> nix-shell -p toilet
[nix-shell:~]$ nix-shell -p cowsay
[nix-shell:~]$ whereis cowsay
cowsay: /nix/store/gx2whfvcahb2ba9gmwgnvflgn8jclqxd-cowsay-3.8.4/bin/cowsay

[nix-shell:~]$ whereis toilet
toilet: /nix/store/83vhly8yyqr4nlzjvdyjsghvrkfb7gzl-toilet-0.3/bin/toilet

```

Sin embargo, hay un matiz muy importante, si usamos `--pure` en la segunda anidación, no tendremos acceso a `toilet`. ¡Ojito con eso!

### Vale, pero me has dicho que no se borra el software, ¿entonces?

¡Exacto! No se elimina, para ello tenemos que aplicar un limpiador, es como cuando tenemos una pelota. La hemos comprado, la pelota es nueva y reluciente, la probamos un rato y la guardamos en el cajón. Seguimos teniendo la pelota en el cajón, si queremos borrarla, simplemente la "tiramos". Para ello, utilizamos el comando `nix-collect-garbage`.

#### ¿Cómo sabe Nix qué "tirar" y qué no?

Cuando ejecutas `nix-collect-garbage`, Nix actúa como un inspector muy estricto:

1. **Busca conexiones:** Mira qué paquetes están instalados en tu sistema actual, en tus perfiles de usuario y en los enlaces de programas que usas.
2. **Identifica "basura":** Si encuentra un paquete en el cajón (como `toilet`) que **no** está en tu configuración de sistema y que **no** está siendo usado por ninguna shell abierta, lo marca como basura.
3. **Limpieza:** Solo entonces borra físicamente los archivos del disco.

#### Los dos niveles de limpieza

Hay dos formas de "vaciar el cajón":

- **La limpieza estándar:** `❯ nix-collect-garbage` Borra lo que no se usa ahora, pero mantiene las "versiones anteriores" de tu sistema por si quieres volver atrás (rollback).
- **La limpieza a fondo:** `❯ nix-collect-garbage -d` El flag `-d` (delete-old) vacía el cajón por completo, borrando incluso el historial de tus instalaciones anteriores. Es el que más espacio libera.

Nix es como un cajón que nunca se llena hasta que tú decides limpiarlo. Esto es genial porque si mañana quieres volver a usar toilet, no tendrás que esperar a que se descargue; pero si lo que quieres es recuperar espacio en tu disco, `nix-collect-garbage` es tu mejor aliado.
