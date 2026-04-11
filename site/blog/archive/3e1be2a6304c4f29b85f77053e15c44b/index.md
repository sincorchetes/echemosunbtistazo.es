---
uuid: 3e1be2a6304c4f29b85f77053e15c44b
title: "¿Es realmente comunitaria Fedora Project?"
slug: /posts/es-realmente-comunitaria-fedora-project
date: 2022-01-30
authors:
  - sincorchetes
tags:
  - Comunidad
---
Uno de los consejos que os voy a trasladar, es, que si quieren contribuir en un proyecto de Software Libre, Open Source... lo revisen bien. Voy a contaros una experiencia reciente que he tenido con la parte de actualizaciones de Fedora Project.

<!-- truncate -->

Estoy en un grupo de Telegram de [Fedora ES](https://t.me/fedoraesp), donde un compañero menciona que tiene problemas con un programa llamado Stellarium, prácticamente es un visor del cielo que te permite visualizar las constelaciones; ver cómo está el cielo en una determinada fecha y multitud de cosas más interesantes... 100% recomendado.

Bueno, el tema es que cuando él abría el programa le daban muchos destellos hasta tal punto que no se puede utilizar. Como tengo un portátil con gráfica Intel HD 630 y NVIDIA GeForce GTX 1050, me dedico a probar Stellarium y efectivamente, me pasa el mismo problema, sin embargo, si lo ejecutaba con la NVIDIA (`DRI_PRIME=1`) no tenía el problema, con lo cuál, el problema era de Intel.

Si bien usaba Wayland, probé con X.org, y no se subsanaba el problema, con lo que no es el driver de X.org de Intel, si no era ya problema de MESA.

Entonces, el día 14 de enero de 2022, abro un bug report en el Bugzilla de Red Hat [2040771](https://bugzilla.redhat.com/show_bug.cgi?id=2040771) y menciono que hay problemas con Stellarium y que hay parpadeos al usarlo, que no funciona con Intel y si con NVIDIA.

Voy investigando e investigando, veo que funciona haciendo un downgrade de paquetes de MESA y resulta, que funcionaba, así que terminaba por confirmar que era MESA, efectivamente.

El día 15 de enero, entro en MESA y veo que una persona puso una solución en este [issue](https://gitlab.freedesktop.org/mesa/mesa/-/issues/5731). Así que, empecé a informarme sobre cómo compilar un RPM, ver como enviarlo al sistema de construcción de paquetes de Fedora Project llamado Koji... Le dediqué muchas horas, empecé en la tarde y terminé de madrugada ya que finalmente, a la 01:37 de la mañana del día 16 de enero consigo finalmente una compilación con el parche que elaboré y mi cambio en el `changelog`.

Había puesto que resolví el problema gracias al `commit` de esa persona que encontré en MESA, y añadí mi parche al Bug Report que abrí. Después veo que para incluir estos cambios en las actualizaciones de Fedora no bastaba con compilar el paquete con la solución en Koji y estudié y pregunté cómo enviar el reporte a Bodhi (_sistema de valoración de actualizaciones en Fedora_) hice un [Pull Request a Fedora](https://src.fedoraproject.org/rpms/mesa/pull-request/14).

Todos los días accedía a mi PR y veía que nadie comentaba este PR, y justo el día 22, veo que me cierran el PR sin dar ningún tipo de explicación y entonces pregunté:

> Why is closed?

Como vi que pasó un día y no contestó, me da por mirar que había un [PR](https://bodhi.fedoraproject.org/updates/FEDORA-2022-d9c9d567ce) para probar una actualización hecha por Lyude.

Descargo el SRC del rpm, y veo que está el parche con el mismo código que yo añadí en el Bug Report...

Accedo al issue y pregunto el día 23 de enero en su PR:

> Why are you closed my PR? https://src.fedoraproject.org/rpms/mesa/pull-request/14

> Why you didn't added my contribution in to mesa.spec changelog?

> Your patch includes the code I've added into my solution fix.

En español:

> ¿Por qué cerraste mi PR? https://src.fedoraproject.org/rpms/mesa/pull-request/14

> ¿Por qué no añadiste mi contribución en el log de cambios del fichero mesa.spec?

> Su parche incluye el código que añadí en mi solución.

Lyude, me contestó con este mensaje:

> @sincorchetes Sorry about that! The reason I did it was because the way you had incremented the rpm build was incorrect, and because I was finishing up the day at work it was just faster for me to redo it myself. It didn't occur to me you might want your name mentioned in the changelog, my apologies.


Traducción:
> @sincorchetes, ¡Siento esto! La razón por la que yo lo hice fue porque la manera en el que habías incrmentado la construcción del rpm fue incorrecta, y porque estaba finalizando mi día de trabajo entonces era más rápido para mí era rehacerlo a mi estilo. No se me ocurrió que quisieras que mencionara tu nombre en el changelog, mis disculpas.

No solo he regalado el trabajo a Lyude, si no que encima, ella no va hacer nada para remediarlo, con lo que le contesté:

> Hi @lyude,

> Yes, please. Because I have taken time to understand the logic part to contribute to Fedora. How to build rpm How to build a package for Koji How to submit a PR in this infra Looking for the bug in upstream

> I made a lot of hours testing and trying to insert this patch in this software to help others, so, yes, I request my work in this rpm rebuilt.

> Thanks

En español:

> Hola @lyude,

> Sí, por favor. Porque me he tomado mi tiempo para entender la parte lógica sobre cómo contribuir a Fedora. Cómo construir un paquete rpm; Cómo construirlo con Koji; Cómo enviar un PR a la Fedora Way para corregir el bug que hay desde upstream.

Adivinen, nadie contestó, se aprobó el PR y se integró en la rama estable.

A todo esto, yo me pregunto. ¿Me he currado todos esos días, todas esas horas, investigando, probando, aprendiendo la "Fedora Way" para contribuir...etc para que después me lo paguen de esta forma?

Solo digo que a esta persona le pagan por esto, a mí, no. ¿A esto se le llama ser comunitario?

