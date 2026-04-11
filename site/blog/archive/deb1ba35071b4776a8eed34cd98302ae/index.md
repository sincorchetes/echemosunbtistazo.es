---
uuid: deb1ba35071b4776a8eed34cd98302ae
title: "Trabajando con Alcatel OS6850"
slug: /posts/os6850
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Redes
---
Bienvenidos a este nuevo post en el que hablaremos sobre como trabajar con switches OS6850 de Alcatel. Esta empresa lleva más de 13 años en el mercado de las telecomunicaciones y de otros dispositivos como cámaras IP, tablets, smartphones.

<!-- truncate -->

## Versiones

Podemos encontrar una serie de diferencias entre modelos como se puede apreciar en las siguientes tablas:

### 24 puertos

Todos los modelos de 24 puertos de la serie 6850

| Modelo   | Ptos Eth 	   | Transmisión/Puerto |PoE | PoE+ | SFP | SFP+ | XFP  |
|----------|---------------|--------------------|----|------|-----|------|------|
|6850-24   |     24		   | Gigabit Ethernet   |    |      | 4   |      |		|
|6850-24L  |     24        | Fast Ethernet      |    |      | 4   |      |		|
|6850-P24  |     24        | Gigabit Ethernet   | Sí |      | 4   |      |		|
|6850-P24L |     20        | Fast Ethernet      | Sí |      | 4   |      |		|
|6850-24X  |     24        | Gigabit Ethernet   |    |      | 4   |      |  2   |
|6850-P24X |     24        | Gigabit Ethernet   | Sí |      | 4   |  2   |  2   |
|6850E-P24X|     20        | Gigabit Ethernet   | +  | Sí   | 4   |  2   |      |
|6850E-24  |     20		   | Gigabit Ethernet   |    |      | 4   |      |      |
|6850E-P24 |     20        | Gigabit Ethernet   | +  | Sí   | 4   |      |		|
|6850E-24X |     20		   | Gigabit Ethernet   |    |      | 4   |  2   |		|
|6850-U24X |	  2		   | Gigabit Ethernet	|    |      | 22  |  	 |  2	|

### 48 puertos

Todos los modelos de 48 puertos de la serie 6850

| Modelo   | Ptos Eth 	   | Transmisión/Puerto |PoE | PoE+ | SFP | SFP+ | XFP  |
|----------|---------------|--------------------|----|------|-----|------|------|
|6850-48   |     48		   | Gigabit Ethernet   |    |      | 4   |      |		|
|6850-48L  |     48        | Gigabit Ethernet   | Sí |      | 4   |      |		|
|6850-P48  |     44        | Gigabit Ethernet   | Sí |      | 4   |      |		|
|6850-P48L |     44        | Fast Ethernet      | Sí |      | 4   |      |		|
|6850-48X  |     48        | Gigabit Ethernet   |    |      |     |      |  2   |
|6850-P48X |     48        | Gigabit Ethernet   | Sí |      |     |      |  2   |
|6850E-P48X|     46        | Gigabit Ethernet   | +  | Sí   | 2   |  2   |      |
|6850E-48  |     44		   | Gigabit Ethernet   |    |      | 4   |      |      |
|6850E-P48 |     48        | Gigabit Ethernet   | Sí |      | 4   |      |		|
|6850E-48X |     46		   | Gigabit Ethernet   |    |      | 2   |  2   |		|
|6850-U48X |	  2		   | Gigabit Ethernet	|    |      | 22  |  	 |  2	|

## Conexión console
Si no tenemos ni idea de como conectarnos al switch, recomendamos leer el [artículo anterior](/posts/rs232-link)dónde explicamos como acceder a dispositivos internetwork mediante puerto console.

## Conceptos básicos

Nosotros vamos a trabajar con el modelo 6850-P48L, pero por norma general se trabaja igual para este modelo de switch. Este modelo en concreto hace uso de un CPU MPC8247 a 400MHz, cuenta con una memoria Flash 8MB dónde se almacenará la imagen IOS (Internetwork Operative System) _no confundir con iOS el OS de Iphone/Ipad_ así como los ficheros de configuración y por último contiene una memoria de acceso aleatorio DRAM de 256 MB que se utilizará para cagar la imagen del sistema, la configuración y mantener las tablas MAC, ARP, estadísticas...etc.

## ¿Cómo trabaja Alcatel?
Alcatel como cualquier otro dispositivo internetwork posee una etapa llamada POST (Power On Self Test) que comprueba el hardware antes de arrancar, en caso de que fallase el proceso, se interrumpe el arranque. Una vez que finaliza dicho proceso empieza a cargar la imagen del IOS de la memoria flash para copiarla a la DRAM. Una vez que comience el arranque, este cargará un fichero de configuración que contenga todas las normas, políticas de red, tecnologías...etc.

### ¿Dónde carga estos ficheros de configuración y la IOS?
Alcatel posee una estructura de directorios dentro de su memoria Flash como esta:
```
/flash
	|-- working
			|------ boot.cfg ---> Parámetros de configuración del switch
			|------ Kbase.img --> Imagen base del software
			|------ Ksecu.img --> Seguridad opcional añadida
			|------ K2os.img --> Imagen del IOS (6850)
			|------ Kadvrout.img --> Enrutamiento avanzado
			|------ Kencrypt.img --> Encriptado
			|------ Keni.img --> Imágenes Ethernet
	|-- certified
			|------ boot.cfg
			|------ Kbase.img
			|------ Ksecu.img
			|------ K2os.img
			|------ Kadvrout.img
			|------ Kencrypt.img
			|------ Keni.img
	|-- network
			|--------- userTable5 --> Usuarios y contraseñas del IOS I
			|--------- userTable4 --> Usuarios y contraseñas del IOS II
			|--------- lockoutSetting
			|--------- policy.cfg
			|--------- ssh_host_dsa_key
			|--------- ssh_host_dsa_key.pub
	|-- diag
		|---- K2diag.img --> Diagnóstico
	|-- boot.params --> Configura el EMP (Ethernet Management Port) del switch
	|-- cs_system.pmd
	|-- boot.slot.cfg --> Enumera los switch en un stack
	|-- swlog1.log
	|-- swlog2.log
```

Los directorios más importantes y que tienen mucha relevancia aquí son `working` y `certified`. El directorio `working` posee todos los archivos incluyendo la imagen del sistema que se utilizarán para un entorno de desarrollo o experimental, mientras que el contenido de `certified` contiene todos los archivos (IOS, boot.cfg...) para un entorno en producción.

### Entonces, ¿Qué carga el switch?
El switch siempre va a tirar de `certified` antes que de `working`. Sin embargo, en caso de fallar, se puede utilizar `working` para tratar de obtener el mejor estado anterior posible. Es importante mencionar, que cuando se está trabajando en modo `certified` no se puede añadir o eliminar cambios, hay que arrancar desde `working`, hacer los cambios, y luego reiniciar el switch. Más adelante explicaremos cómo hacerlo.

## Configuración básica
Vamos a ver cómo hacer algunas configuraciones básicas con AOS6850 como modificar el prompt, la fecha y hora, una interfaz.

### Guardando la configuración
Una de las cosas que tenemos que tener claras es guardar la configuración. El switch genera en la RAM un fichero de configuración que tendrá que guardarse si queremos almacenar los cambios que habremos hecho.

```
copy running-config working
```

o se puede utilizar también:
```
write memory
```

### Modificando el prompt
Para modificar el prompt, basta con ejecutar:
```
session prompt default "TEXTO_A_PONER"
```

### Cambiando el nombre del switch
Si queremos identificarlo mejor, podemos asignarle un nombre al switch:
```
system name XXXX
```

### Añadiendo una localización
En caso de tener muchos switches repartidos en diferentes puntos o áreas, es recomendable añadir una descripción que facilite saber dónde encontrarlo:
```
system location LUGAR
```

### Modificar el usuario de contacto
Por defecto en Alcatel, si hacemos un:
```show system```
Veremos que en la línea de contacto nos aparece:
```
Alcatel-Lucent OS6850-P48L 6.0.0.000.R00 Service Release, September 01, 2018.
```

Se puede modificar utilizando:
```
system contacto NOMBRE_CONTACTO
```

### Configurando la fecha y hora
Para configurar la fecha, utilizamos la siguiente sintaxis:
 * mm: Mes
 * dd: Día
 * yyyy: Año

```
system date mm/dd/yyyy
```

Para establecer el huso horario:
XXX:
 * PST: Pacific Standard Time: Se utiliza en la zona oeste de Canadá, USA y México. Equivale a -8 en UTC, cuando se aplica DST sobre PST equivale a -7 en UTC.
 * DST: Daylight Saving Time: Utilizado para aplicar el cambio de verano <> invierno de forma automática.
 * UTC: Coordinated Universal Time: Estándar utilizado para definir los husos horarios. No aplica DST.

Nosotros por regla general, utilizaremos UTC.

```
system timezone XXX
```
Se puede especificar horas y minutos en UTC de la siguiente maneras:
```
system timezone +05:45
```
Equivale a UTC 05:45

```
system timezone -05:45
```
Equivale a UTC -05:45.

### Ajustando la hora
Mostrar la hora actual:
```
system time
```

Ajustar la hora
```
system time hh:mm:ss
```
 * hh: Horas
 * mm: Minutos
 * ss: Segundos

### Gestionando usuarios
Alcatel contiene una serie de características avanzadas como los perfiles de usuario, perfil por defecto... nosotros nos vamos a centrar solamente en crear un usuario administrador.
```
user USUARIO password CONTRASEÑA
```

Para eliminar un usuario:
```
no user USUARIO
```
Para que el usuario actual cambie su contraseña:
```
password
```

### Interfaces de red
En este apartado aprenderemos como configurar una interfaz

#### Levantando una interfaz
Para habilitar un puerto del switch, basta con:
```
interfaces x/y admin up
```
#### Forzando la capacidad de transmisión
Actualmente tenemos dos velocidades de transmisión:
 * Full-duplex [FULL]: Todos los paquetes se envían/reciben de forma simultánea
 * Half-duplex [HALF]: La información se turna para enviarse y/o recibirse
 * Auto [AUTO]: El modo automático que establece que utilizar.

```
interfaces x/n duplex [XXX]
```

#### Forzando la velocidad de transmisión
Se puede modificar las velocidades de transmisión de un puerto:
```
interfaces x/n speed [10/100/1000]
```

#### Ver todas las interfaces con sus estadísticas 
Para ver las interfaces que tenemos en el switch, bastará con realizar:
```
show interfaces
```

Este mostrará todo el estado de los switch, incluyendo estadísticas, bytes emitidos/omitidos, errores CRC (_físicos_)....

#### Obtener información de los SFP
Los SFP (_Small Form-Factor Pluggable_) también llamados _SFP_, permiten extender funcionalidades en caliente de un switch de forma limitada (_algunos switches como este solo tienen 4 puertos SFP disponibles_). Por ejemplo, en el switch que estamos utilizando OS6850-P48L, tenemos 4 puertos SFP para añadir Fibra o Cobre 10/100/1000 (Gigabit Ethernet), ya que los puertos RJ45 de este switch solo funcionan en modo Fast Ethernet 10/100
```
show ni
```
Obtendremos una salida como esta:

```
----RECORTADO----
 GBIC  1
        Manufacturer Name:             FINISAR CORP.   ,
        Part Number:                   FCLF8521P2BXX   ,
        Hardware Revision:             A   ,
        Serial Number:                 XXXXXX         ,
        Manufacture Date:              151219  ,
        Laser Wave Length:             n/a,
        Admin Status:                  POWER ON,
        Operational Status:            UP

```

#### Mostrar todas las interfaces con sus alias
En vez de visualizar todos los puertos con todos los datos, podemos filtrarlos por alias, número de puerto...
```
show interfaces port
```

### Ver información del sistema
El siguiente comando nos permite saber el modelo de switch, versión de firmware, fecha y hora actual del dispositivo, días en activo....
```
show system
```

### Visualizar AC disponibles
Gracias a este comando se puede averiguar qué fuentes de alimentación pueden estar fallando, los watts que utiliza...
```
show power
```

### Reiniciar el switch
Podemos reiniciar el switch haciendo uso del comando `reload`, el cuál nos permite más cosas como arrancar en modo `working` entre otras cosas. 
```
reload
```

Por ejemplo, reiniciar en modo `working` 
```
reload working no rollback-timeout
```

### Visualizar logs del sistema
Para ver los registros del sistema, basta con ejecutar:
```
show log swlog
```
__NOTA: Lo que no es muy recomendable ya que nos imprimirá todos los acontecimiento y/o sucesos que hayan pasado mientras ha estado funcionando el switch, por ende, se utiliza mejor:__
```
show log swlog timestamp mm/dd/yyyy hh:mm
```

## Troubleshooting

### No recuerdo usuario/contraseña
Tenemos que estar conectados via console al switch, tener abierto un emulador de terminal tipo `screen(1)` y tener la conexión abierta. Si es así, reiniciamos el switch y pulsamos rápidamente la tecla `[Enter]`. Nos saltará una salida como esta:
```
U-Boot (6.4.3.479.R01) (for OS6400, OS6850, and OS6855 platforms) (Mar 19 2010 - 17:59:35)

MPC8247 Reset Status: External Soft, External Hard

MPC8247 Clock Configuration
 - Bus-to-Core Mult 4x, VCO Div 2, 60x Bus Freq  25-75 , Core Freq 100-300
 - dfbrg 0, corecnf 0x1a, busdf 3, cpmdf 1, plldf 0, pllmf 3
 - vco_out  400000000, scc_clk  100000000, brg_clk  100000000
 - cpu_clk  400000000, cpm_clk  200000000, bus_clk  100000000
 - pci_clk   66666666

CPU:   MPC8247 (HiP7 Rev 14, Mask 1.0 1K50M) at 400 MHz
Board: Alcatel OS6850 (Kite II)
I2C:   ready
DRAM:  256 MB
FLASH:  8 MB
```

Escribimos:

```
[Miniboot]  setenv bootflags 0x01000
[Miniboot]  bootm 0xff900000
```

Nos aparecerá una salida como esta:

```
## Booting image at ff900000 ...
   Image Name:   miniboot-6.4.3.479.R01
   Image Type:   PowerPC VxWorks Kernel Image (gzip compressed)
   Data Size:    984865 Bytes = 961.8 kB
   Load Address: 00005000
   Entry Point:  00005000
   Verifying Checksum ... OK
   Uncompressing Kernel Image ... OK
## Ethernet MAC address not copied to NV RAM
Loading .text @ 0x01000000 (1580292 bytes)
Loading .rodata @ 0x01181d08 (337331 bytes)
Loading .data @ 0x011d42c0 (135644 bytes)
Clearing .sbss @ 0x011f54a0 (1528 bytes)
Clearing .bss @ 0x011f6000 (1571268 bytes)
## Using bootline (@ 0x4200): flash(1,0)cmm:default h=192.168.10.1 e=192.168.10.1:ffffff00 cb=9600 cp=none cs=1 cw=8 cm=modemControlOff f=0x1000 
## Starting vxWorks at 0x01000000 ...
USB2 Host Stack Initialized.
USB Hub Driver Initialized 
USBD  Wind River Systems, Inc. 562 Initialized
M824xHCI Controller found.
Waiting to attach to USBD...Done.
usbCbiUfiDevInit() returned OK
CBI Class Driver Successfully Initialized
ataDrv call. 0 1 24 24 621 0 0
0xffffde0 (tRootTask): usbBulkDevInit() returned OK

CS EEPROM Module ID: 42012219 , System type: 48 port Lite 100Base-X, with 4 combo ports, stacking- kite2


Adding 5421 symbols for standalone.
Check Disk Running ...
                                                                                dosChkLib : CLOCK_REALTIME is being reset to THU FEB 02 10:15:14 2017
Value obtained from file system volume descriptor pointer: 0xed9b9d8
The old setting was THU JAN 01 00:00:00 1970
Accepted system dates are greater than THU DEC 27 00:00:00 1990
/flash/  - Volume is OK 


Boot parameters are:

 'flash(1,0)cmm:default e=10.255.24.81:ff000000 h=192.168.10.1 g=10.255.24.181 f=0x1000 cb=9600 cp=none cs=1 cw=8 cm=modemControlOff'


AOS miniboot version: 6.4.3.479.R01
VxWorks (for Alcatel CMM Motorola MPC8248) version VxWorks5.5.1
KERNEL: WIND version 2.6
Made on Mar 19 2010, 18:00:20.
Copyright Wind River Systems, Inc., 1984-2006

CPU: Motorola MPC8248.  Processor #0.
Memory Size: 0x10000000 (256 MB).  BSP version 1.2/1.

WARNING: Stopping in miniboot as directed by boot flags...
```

Nos dirigimos al directorio `network`
```
[Miniboot] cd "network"
```

Comprobamos que existen los ficheros `userTable*` y los eliminamos todos.
```
[Miniboot] xdelete "userTable*"
```

Reiniciamos
```
[Miniboot] reboot
```

Y ya podemos loguearnos como usuario por defecto del dispositivo, login => admin, password => switch.

### Reinicializar el switch

Si queremos reinicializar el switch, porque lo queremos dejar como "estado de fábrica", entonces tendremos que seguir los pasos del punto anterior añadiendo los siguientes comandos:
```
[Miniboot] cd ".." 
[Miniboot] cd "working"
[Miniboot] xdelete "boot.cfg"
[Miniboot] cd ".."
[Miniboot] cd "certified"
[Miniboot] xdelete "boot.cfg"
[Miniboot] reboot
```

Y ya tendremos el switch reinicializado.

## Fuentes
 * Alcatel Unleashed ~ Especial incapié en el usuario `sergio`
 * Alcatel documentation ~ AOS Release 6 Management guide, Network guide
