---
uuid: 4a09e91205aa448e701a2eb7a190c5cc
title: "Nix y NixOS: la revolución que no esperabas"
slug: /posts/nix-y-nixos-la-revolucion-que-no-esperabas
date: 2026-03-28
authors:
  - sincorchetes
tags:
  - Linux
  - NixOS
  - DevOps
---

![NixOS Logo](img/nixos-logo.png)

Después de contar [mi aventura arreglando el google-cloud-sdk en nixpkgs](/posts/mi-primera-contribucion-a-nixpkgs), me preguntaban varios colegas míos: "pero ¿qué es exactamente Nix? ¿por qué te metiste en esto?" Así que aquí va el contexto que necesitas para entender por qué este ecosistema me voló la cabeza.

<!-- truncate -->

## El momento en que todo cambió

Hace unos años me topé con NixOS de rebote. Alguien en internet decía que tenía un **sistema inmutable**, generado desde un **simple archivo de configuración**. Pensé que era una exageración. Pero cuando entendí que podía **reproducir el estado exacto en cualquier máquina** (*servidor, VM, portátil*), con todo configurado de la misma forma, y que además podía hacer rollback al instante si algo se rompía... bueno, mi cerebro entró en cortocircuito.

Imagínate poder decir: "Quiero exactamente esto en mi sistema" en un archivo, ejecutar un comando, y que todo se armase como un LEGO perfectamente encajado. Sin conflictos. Sin sorpresas. Eso es NixOS.

Para los que venimos del DevOps, es como tener **Terraform pero para tu propio sistema operativo**. Defines el estado deseado con código, y Nix se encarga de hacerlo realidad. Siempre obtienes lo que pediste, ni más ni menos.

## El problema que lo origina

Pero antes de llegar a NixOS, hubo un equipo en la Universidad de Utrecht liderado por **Eelco Dolstra** (junto con Merijn de Jonge y Eelco Visser) a quienes les hartó el **infierno de las dependencias**. Porque sí, hacen falta tres cerebros para enfrentarse a ese monstruo. Vaya, si conoces la frustración...

Instalas un paquete, y de repente: **Error de glibc**. Tu app necesita la versión 2.33 pero solo tienes la 2.35. O peor aún: dos aplicaciones que necesitan versiones distintas de la misma librería, y ambas quieren vivir en `/usr/lib`. Bash scripts para arreglarlo. Ansible. Puppet. Docker/Podman para cada cosa. Todo genera deuda técnica gigante.

Dolstra pensó diferente. ¿Y si cada software viviera **aislado con sus dependencias exactas**, sin tocarse entre sí? Así nació Nix en 2003. Punto.

¿Y el nombre? **Nix** viene del holandés *niks*, que significa literalmente **"nada"**. Y tiene todo el sentido del mundo: como dice el propio paper de Dolstra, *"las acciones de build no ven nada que no se haya declarado explícitamente como input"*. Cada paquete se construye en un entorno donde no existe *nada* más. Cero. Vacío absoluto. Solo lo que tú le digas que necesita. Poético para un gestor de paquetes, ¿no? Dolstra básicamente bautizó su criatura como "La Nada" y resulta que funciona mejor que todo lo que existía. Le faltó ponerle música épica de fondo.

## ¿Cómo funciona Nix?

Aquí viene la magia: Nix es un **gestor de paquetes** que almacena todo en una carpeta especial (`/nix/store`). Cada paquete va con sus dependencias exactas, encapsulado. Si necesitas Python 3.8 con NumPy 1.20, y otro proyecto pide Python 3.11 con NumPy 1.24, ambos conviven sin saber que existen el uno al otro.

Para verlo claro, piensa en tu sistema como un edificio enorme. En lugar de poner todas las tuberías, cables y muebles en el mismo sitio (donde se interfieren), Nix construye **salas completamente aisladas**. Cada sala tiene lo que necesita. Conviven en el mismo edificio, pero **no se ensucian entre sí**.

La belleza de esto es que **ya no necesitas Docker para desarrollo local**. Nix en tu distro normal es suficiente. Menos imágenes enormes, menos `docker-compose.yml` roto. Solo ambientes limpios.

Ah, y Nix es portable. No necesitas NixOS para usarlo. Funciona en cualquier Linux, incluso en macOS. Es una forma perfecta para probar esto sin saltar a una distro desconocida.

## Ahora llega el NixOS

Alguien dijo: "¿Y si llevamos esto a un sistema operativo *completo*?" Ese alguien fue Armijn Hemel, y en su tesis de maestría creó el primer prototipo de NixOS. Si Nix era el gestor, ¿por qué no construir todo (*kernel, servicios, configuración de red*) con la misma filosofía?

La idea tomó forma, evolucionó, y en 2013 sacaron la **versión 13.10**: la primera estable de NixOS. Un sistema operativo dedicado a vivir declarativamente.

Si Nix es el constructor, NixOS es **el terreno, los cimientos y el edificio completo**. Al controlarlo todo desde el inicio, tienes una experiencia 100% coherente. Nix solo sobre otra distro es potente, pero NixOS es otra liga.

## El ecosistema detrás

Un proyecto así no se sostiene solo. Necesitas compilar paquetes de forma masiva (Hydra, su CI/CD), mantener servidores, toda una infraestructura. Por eso en 2015 crearon la **NixOS Foundation**, una entidad sin ánimo de lucro que asegura que todo esto siga funcionando.

## La realidad del día a día

Ahora bien, antes de que pienses que es todo color de rosa: **la curva de aprendizaje es un muro**. Yo reinstalé NixOS cuatro veces. Dos de ellas me rendí completamente.

¿El problema? Vienes del **FHS** (*Filesystem Hierarchy Standard*), donde `/bin` es `/bin`, `/usr/lib` es `/usr/lib`. Descargas un binario normal y lo ejecutas. Funciona. En NixOS, los binarios ni siquiera están donde esperas. No siguen las rutas que conoces. Cuando intentas correr algo genérico, falla porque no encuentra las librerías donde debería.

Es un choque cultural brutal. Pero una vez cruzas ese río, comprendes por qué está así organizado. Y eso merece su propio post.

De eso hablaremos en la siguiente entrega. Por ahora, ya sabes por dónde vienen los tiros.

## Referencias
* [Eelco Dolstra ~ Paper explicativo](https://edolstra.github.io/pubs/nspfssd-lisa2004-final.pdf)
* [NixOS ~ Wiki](https://wiki.nixos.org/wiki/NixOS_Wiki)
* [Wikiepdia ~ NixOS](https://en.wikipedia.org/wiki/NixOS)
* [Wikipedia ~ Nix](https://en.wikipedia.org/wiki/Nix_(package_manager))