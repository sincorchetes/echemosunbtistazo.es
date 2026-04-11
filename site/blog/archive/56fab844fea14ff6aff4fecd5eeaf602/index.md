---
uuid: 56fab844fea14ff6aff4fecd5eeaf602
title: "Escuchando música con MPD y ncmpcpp"
slug: /posts/escuchando-musica-con-mpd-ncmpcpp
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
¿Cuántos de nosotr@s nos hemos hecho esta pregunta? ¿Qué sería de la vida sin música? ¿Qué sería de la vida sin letras de canciones que denuncien, que estimen, que compartan dolor, amor, qué irradien ira o revolución? ¿Qué solo contenga ritmo para hacer ejercicio físico sin problemas? ¿Cuándo estamos solos y afligidos, cuándo queremos compartir momentos de celebración?
Parece mentira pero la música nos despierta y nos anima. Pero más nos anima si la escuchamos haciendo uso del mínimo de recursos posibles sin perder calidad. Entonces, eso es amor.

<!-- truncate -->

Después de esta reflexión que parece sacada de un capítulo de Anatomía de Gray, vamos a proceder instalar el servidor de audio MPD, conocido como *Music Player Daemon* junto con el cliente `ncmpcp(1)` con el que interactuaremos cuando queramos escuchar música.

MPD es un servidor de audio que permite no solo escuchar música en local soportando multitud de códecs de audio como Ogg Vorbis, FLAC, Opus, WavPack, MP2, MP3, MP4/AAC, Mod..., si no que también puede transmitirla via streamming por el protocolo HTTP capaz de reproducir ficheros MP3 y OGG Vorbis. En suma, se puede gestionar el servidor a través de la red tanto por IPv4 como por redes IPv6, lee meta-información como las etiquetas ID3v1 y ID3v2, comentarios en Vorbis, MP4...; soporta reprodución contínua, una vez para de reproducirse una, se añaden unos segunos para "hacer creer" que sigue siendo un solo archivo (*crossfading*) y un millar de características más que si las seguimos mencionando no acabamos.

# Instalación

Aquí añadimos varias formas de instalarlo en diferentes distribuciones, vamos a llevarlo a cabo en todas que utilicen `systemd(1)` junto con `pulseaudio(1)`.

_NOTA: Hay distribuciones que por licencias privativas, no se incluye software privativo de manera oficial como es el caso de Fedora, así que revisen que códecs son necesarios para nuestro sistema después de instalar el servidor y posteriormente el cliente con el que nos conectaremos._

## Fedora
Para instalar en Fedora con ejecutar el siguiente comando se nos instalará pero no olvidemos instalar posteriormente los códecs para formatos MP3 desde los repositorios RPM Fusion:
```
sudo dnf install mpd
```

## Ubuntu
En Ubuntu, vale tanto aptitude como la suite `apt(1)`, hay que tener habilitado los repositorios Universe.
```
sudo apt-get install mpd
```
## Debian
Como en Ubuntu, pero se encuentra en repositorio stable:
```
sudo apt-get install mpd
```

## Archlinux
Tenemos que tener habilitado el repositorio extra:
```
sudo pacman -S mpd
```

## Gentoo
No nos olvidemos de aplicar las USE que queramos para que se instale con los códecs y características que queramos. Puedes ver la lista pulsando [aquí](https://packages.gentoo.org/packages/media-sound/mpd?target=_blank)
```
sudo emerge -av media-sound/mpd
```

## openSUSE Leap 42.3
La instalación en openSUSE requiere que se habilite el repositorio [`multimedia:apps`](https://build.opensuse.org/project/show/multimedia:apps?target=_blank) porque no se encuentra soportado en los repositorios principales. 

## CentOS 7
Es necesario habilitar los repositorios [`nux`](https://li.nux.ro/repos.html?target=_blank)
```
sudo yum install mpd
```

# Configuración
La configuración como hemos dicho, haremos uso de `pulseaudio(1)` y lo ejecutaremos mediante nuestro usuario para evitar utilizar el usuario `root` que explicaremos en siguientes post que es este usuario y por qué se encuentra en el sistema.

 1. Creamos los directorios para albergar las configuraciones, playlists...etc
    ```
    mkdir ~/.mpd/{database,playlists,logs}
    ```
 2. Copiamos el fichero de configuración de ejemplo que nos proporciona mpd.
    ```
    cp /etc/mpd.conf ~/.mpd/
    ```
 3. Editamos el fichero de configuración y tienen que estar descomentadas y editadas las siguientes líneas:
    ```
    music_directory "~/Music"
    playlist_directory "~/.mpd/playlists"
    db_file "~/.mpd/database/mpd.db"                                           
    log_file "~/.mpd/logs/mpd.log"
    user "sincorchetes"
    auto_update "yes"
    audio_output {
      type "pulse"
      name "My Pulse Output"
    }
    filesystem_charset "UTF-8"$
    ```

Explicaremos qué quiere decir cada línea:
1. Es el directorio dónde tengamos almacenada la música que queramos escuchar.
2. El directorio dónde se almacenarán las listas de reproducción personalizadas.
3. Fichero en el cuál se alojará los registros de cada archivo de reproducción.
4. Fichero de registro
5. Nuestro usuario
6. Se actualizará MPD de forma automática cuando MPD detecte cambios en el directorio
7. Habilitando PulseAudio en MPD (líneas 7,8 y 9)
8. Soporte UTF-8

Ahora para probar esta configuración, bastará con correr el servidor apuntando al fichero.
```
mpd ~/.mpd/mpd.conf
```

Puede que nos aparezca un mensaje como este:
```
exception: bind to '0.0.0.0:6600' failed (continuing anyway, because binding to '[::]:6600' succeeded): Failed to bind socket: Address already in use
```
Comunicándonos que se está utilizando el puerto que usa MPD, no pasa nada, lo omitimos y listo.

## ncmpcpp
En este apartado, instalaremos y explicaremos como utilizar el cliente.

###Instalando el cliente
Hay varios clientes para utilizar MPD, incluyendo clientes gráficos, pero a nosotros personalmente nos agrada utilizar `ncmpcpp(1)` más que nada por gustos.

#### Fedora
Para añadirlo a este SO:
```
sudo dnf install ncmpcpp
```

#### CentOS 7
Hay que tener habilitado el repositorio de `nux` como hemos mencionado anteriormente:
```
sudo yum install ncmpcpp
```

#### Ubuntu
Hay que tener habilitado el repositorio `universe`
```
sudo apt-get install ncmpcpp
```

#### Debian
Con un solo comando:
```
sudo apt-get install ncmpcpp
```

#### Archlinux
Tenemos que tener habilitado el repositorio `Community`
```
sudo pacman -S ncmpcpp
```
#### Gentoo
No nos olvidemos de que tenemos que declarar las variables [USE](https://packages.gentoo.org/packages/media-sound/ncmpcpp?target=_blank) para soportar determinadas características.
```
sudo emerge -av media-sound/ncmpcpp
```
#### openSUSE
Desafortunadamente no hay cliente para openSUSE, hay que compilarlo.

## Probando
Para probarlo tan solo tenemos que ejecutar `ncmpcpp(1)`

<script src="https://asciinema.org/a/181165.js" id="asciicast-181165" async></script>

## ¿Cómo manejarnos?
Bueno `ncmpcpp(1)` se utiliza mediante las flechas de dirección y algunas teclas preconfiguradas como las que recogemos en la siguiente tabla.

| Combinación de teclas | Descripción |
|-------|-------------|
|   <kbd>a</kbd>   | Añade un tema a una lista de reproducción, ya puede ser nueva o actual |
| <kbd>&uarr;</kbd>| Sube por los elementos |
| <kbd>&darr;</kbd>| Desciende por los elementos |
| <kbd>Shift</kbd> + <kbd>&uarr;</kbd> | Selecciona elementos hacia arriba |
| <kbd>Shift</kbd> + <kbd>&darr;</kbd> | Selecciona elementos hacia abajo |
| <kbd>[</kbd> | Desciende por el álbum |
| <kbd>]</kbd> | Asciende por el álbum |
| <kbd>{</kbd> | Asciende según el artista |
| <kbd>}</kbd> | Desciende según el artista |
| <kbd>Page Up</kbd> | Asciende muchos ítems |
| <kbd>Pade Down</kbd> | Desciende muchos ítems |
| <kbd>Insert</kbd> | Selecciona ítem |
| <kbd>Enter</kbd> | Según en la vista, puede reproduci, ingresar en un directorio...etc |
| <kbd>Espacio</kbd> | Según la vista, puede añadir un elemento a la lista de reproducción, actualizar las letras según cambie la canción, cambiar el tipo de visualización... |
| <kbd>Delete</kbd> | Borra ítems de la lista, del buscador...|
| <kbd>&larr;</kbd> | Bajar el volumen, columna anterior, pantalla máster |
| <kbd>&rarr;</kbd> | Subir el volumen, siguiente columna... |
| <kbd>TAB</kbd> | Siguiente vista |
| <kbd>Shift</kbd> +  <kbd>TAB</kbd> | Vista anterior |
| <kbd>F1</kbd> | Muestra la ayuda |
| <kbd>1</kbd> | Vista: Lista de reproducción |
| <kbd>2</kbd> | Vista: Buscador |
| <kbd>3</kbd> | Vista: Modo navegador de archivos |
| <kbd>4</kbd> | Vista: Interactuar con la biblioteca |
| <kbd>5</kbd> | Vista: Editor de listas de reproducción |
| <kbd>6</kbd> | Vista: Editor de etiquetas |
| <kbd>7</kbd> | Vista: Muestra los métodos de salida |
| <kbd>8</kbd> | Vista: Visualizador de música (no lo hemos incluído en este post) |
| <kbd>=</kbd> | Vista: Muestra un reloj digital |
| <kbd> @ </kbd> | Vista: Muestra la información del servidor |
| <kbd>s</kbd> | Para la reproducción |
| <kbd>p</kbd> | Pausa la reproducción |
| <kbd>></kbd> | Siguiente tema |
| <kbd><</kbd> | Tema anterior |
| <kbd>Ctrl</kbd> + <kbd>h</kbd> | En el modo navegador de archivos, vuelve un directorio hacia atrás |
| <kbd>Ctrl</kbd> + <kbd>h</kbd> | Repite la canción en modo reproducción |
| <kbd>Backspace</kbd> | En modo navegador sube un directorio |
| <kbd>Backspace</kbd> | En modo reproductor repite la canción |
| <kbd>f</kbd> | Reproduce más rápido |
| <kbd>b</kbd> | Rebovina |
| <kbd>r</kbd> | Modo repetición |
| <kbd>z</kbd> | Reproducción aleatoria |
| <kbd>y</kbd> | Tiene múltiples funciones, buscador de canciones, detecto de cambios en etiquetas, comenzar a buscar... |
| <kbd>Y</kbd> | Modo reproducción de una única canción |
| <kbd>u</kbd> | Actualizar la DB |

En fin hemos comentado medio archivo de atajos de teclado que viene por defecto. Puedes crearte uno propio creando el directorio `~/.ncmpcpp/bindings`.

# Fuentes
* Archlinux ~ MPD
* man packages
    * mpd.conf(5)
    * mpd(1)
    * ncmpcpp(1)
