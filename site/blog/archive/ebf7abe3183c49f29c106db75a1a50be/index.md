---
uuid: ebf7abe3183c49f29c106db75a1a50be
title: "Gentoo - El arranque no pasa de Loading Linux..."
slug: /posts/gentoo-el-arranque-no-pasa-de-loading-linux
date: 2022-01-11
authors:
  - sincorchetes
tags:
  - Linux
---
Cuando estuve instalando Gentoo hace unas semanas, me di cuenta que cuando trataba de arrancar el kernel, la pantalla quedaba en "Loading Linux 5.11...", si bien el teclado respondía y el sistema no mostraba un comportamiento típico de kernel panic como los LEDs que parpadean o el cese de actividad en disco. Se me hacía raro.

<!-- truncate -->

Esto es debido a que faltaba el soporte de Frame Buffer, que es un dispositivo de tipo bloques que se crea en `/dev` con nombre `fb0` y que permite mostrar textos, gráficos, mostrar logos en el arranque... por lo que es comprensible que no estuviera viendo nada.

Para resolverlo, compilamos el kernel con estas opciones:

```
Device drivers --->
  Graphics Support --->
    [M] Simple Frame Buffer Driver
```

Si usas EFI 1.1 o UEFI 2.0, habilita también:
```
Device drivers --->
  Graphics Support --->
    ---> Frame buffer Devices
      ---> Support for frame buffer devices
        [*] EFI-based Framebuffer Support
```

Fuente: [Gento Forums](https://forums.gentoo.org/viewtopic-t-1090264-start-0.html)
