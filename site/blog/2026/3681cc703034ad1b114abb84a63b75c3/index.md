---
uuid: 3681cc703034ad1b114abb84a63b75c3
title: "¿Ingeniero DevOps o 'YAML Developer'? Por qué tu base de Sysadmin decidirá tu carrera"
slug: /posts/ingeniero-devops-o-yaml-developer
date: 2026-04-16
authors:
  - sincorchetes
tags:
  - DevOps
  - Sysadmin
  - Linux
  - Kubernetes
  - Docker
---

¿Se puede ser DevOps sin haber tocado jamás un sistema operativo de verdad? Spoiler: **no**. Y lo digo después de años peleándome con FreeBSD, NetBSD, Gentoo, Fedora, Archlinux, Void Linux, NixOS (cuando por fin paré el distrohopping), y hasta Windows como vehículo de supervivencia cuando no tenía herramientas nativas. Hoy te cuento por qué tu base de Sysadmin no es un "nice to have", sino lo que separa a un ingeniero de un *YAML Developer*.

<!-- truncate -->

## Sin Sysadmin no hay DevOps. Punto.

A ver, piénsalo un momento. Docker no es magia. Docker hace uso de contenedores que por detrás tiran de **Cgroups** y del **kernel de Linux** para funcionar. En distribuciones como Fedora, además, llevan etiquetados fuertemente asociados con **SELinux**. ¿Resultado? Que muchas veces el típico `docker -v` o la sección de `volumes` en tu `docker-compose.yml` (o `compose.yml` recientemente) te peta con un error críptico. Y si no entiendes qué es SELinux ni por qué existe, te quedas mirando el error como quien mira un jeroglífico.

Y eso es solo Docker.

Si le sumamos que Kubernetes es una plataforma entera ejecutándose dentro de un sistema Linux, que es una **mega API** que interactúa con una base de datos como etcd, que gestiona cortafuegos con iptables, nftables o incluso eBPF en cloud... Entonces tampoco puedes comprender lo que hay detrás de un `kubectl apply -f`. Estás pegando YAMLs al cluster como quien pega cromos en un álbum. Sin saber qué pasa cuando los pegas.

Aquí va la crítica profesional, y lo digo sin desvalorar el perfil de Operaciones, que es **importantísimo** dentro de las compañías. Pero hay una diferencia entre operar y entender. No puedes ser un ingeniero si operas como un soldado, limitado a las herramientas que tienes para sobrevivir en el lodo. **Un ingeniero es el arquitecto que entiende por qué el lodo está ahí y cómo drenarlo.**

## Minikube en producción: o cómo usar un cuchillo de destornillador

Os cuento una historia real. He visto una empresa con una configuración de **minikube en producción**, dando servicio a otras empresas 24/7. Sí, has leído bien. Minikube. En producción. Con una configuración de pena.

Minikube es una herramienta para **entornos de desarrollo y pruebas**. Per sé. Meterlo en producción es como usar un cuchillo de mantequilla para desatornillar un tornillo: técnicamente puedes, pero estás sobre-exponiéndote a que se rompa en el peor momento. Para esas cosas existen soluciones como **Rancher**, **k3s** o **k0s**. O mejor aún: ni siquiera necesitas Kubernetes si al final tienes 2 o 3 servicios desplegados como ellos tenían. A veces un `docker compose up` y un reverse proxy te solucionan la vida sin montar la NASA.

## etcd: la base de datos que todo el mundo ignora

Otro clásico. Mucha gente coge `kubeadm`, despliega la arquitectura de Kubernetes tal cual para producción y se queda tan ancha. Pues **¡no señor!**

etcd es la base de datos donde vive **todo el estado de tu cluster**. Merece su atención, su desacoplamiento y su redundancia. Porque si pierdes el cluster por el motivo que sea y etcd iba dentro del mismo paquete, ya no tienes la base de datos disponible. Y si te toca redesplegar todo desde cero... enhorabuena, **has perdido dinero de la empresa**. Y probablemente una buena noche de sueño.

## Cuando la red falla, necesitas saber de redes (sorpresa)

Un ejemplo mucho más llano y más de sistemas. Caída en la red: 10 equipos interconectados a una LAN, y 3 de ellos sin salida a Internet. ¿El diagnóstico de alguien sin base de sistemas? "Será el router". ¿La realidad? Había equipos con **IP estática que colisionaban con el servidor de DHCP**. Había que hacer un `arp-scan` para identificar problemas a nivel de capa de enlace y dar con ese fallo de duplicidad de IPs.

Sin esa base, te quedas reiniciando el router como solución universal. Y eso no es ingeniería, eso es rezar.

## No se la jueguen

Con todo esto quiero decir una cosa: **no lean y apliquen cosas sin entenderlas**. Ahora mismo estamos en un momento donde todo se puede aprender de forma prácticamente infinita. Tenemos libros, podcasts, tutoriales, las páginas `man` de Linux, la documentación de los proyectos y hasta una IA que te explica los conceptos si se lo pides bien.

Las herramientas están ahí. La excusa de "no sabía" ya no vale. No se la jueguen.
