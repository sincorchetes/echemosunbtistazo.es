---
uuid: 29e0d8ad970e4e4d88dd9ed2720968b5
title: "Utilizando Podman en Gentoo"
slug: /posts/podman-en-gentoo
date: 2022-01-12
authors:
  - sincorchetes
tags:
  - Linux
  - DevOps
---
Podman es un motor de contenedores que es compatible con la especificación OCI de contenedores. Este software forma parte del ecosistema de Red Hat, pero se puede instalar también en distribuciones como Gentoo. Como cumple las especificaciones OCI, se puede reemplazar directamente por Docker, ya que mucho de los comandos de Docker se han traducido directamente a Podman y así evitar tener que aprender más comandos nuevos.

<!-- truncate -->

Las principales diferencias que existen entre Docker y Podman es que Podman no necesita de un servicio, con lo que se incrementa la seguridad en el sistema, y si se tiene systemd, los contenedores pueden ejecutarse como servicios del sistema. [Más info sobre esto](https://access.redhat.com/documentation/es-es/red_hat_enterprise_linux/8/html/building_running_and_managing_containers/auto-starting-pods-using-systemd_porting-containers-to-systemd-using-podman).

## Configurando el kernel

Hay que tener una serie de caracterísitcas habilitadas en el kernel para poder continuar:
```
General setup  --->
  -*- Control Group support  --->
    [*]   Memory controller
    [*]   IO controller
    [*]   CPU controller  --->
      [*]   Group scheduling for SCHED_OTHER
      [*]     CPU bandwidth provisioning for FAIR_GROUP_SCHED
      [*]   Group scheduling for SCHED_RR/FIFO
    [*]   PIDs controller
    [*]   RDMA controller
    [*]   Freezer controller
    [*]   HugeTLB controller
    [*]   Cpuset controller
    [*]     Include legacy /proc/<pid>/cpuset file
    [*]   Device controller
    [*]   Simple CPU accounting controller
    [*]   Perf controller
    [*]   Misc resource controller
  [*] Configure standard kernel features (expert users)  --->
    [*]   Enable 16-bit UID system calls
    [*]   Multiple users, groups and capabilities support
    [*]   sgetmask/ssetmask syscalls support
    [*]   Sysfs syscall support
    [*]   open by fhandle syscalls
    [*]   Posix Clocks & timers
    [*]   Enable support for printk
    [*]   BUG() support
    [*]   Enable ELF core dumps
    [*]   Enable PC-Speaker support
    [*]   Enable full-sized data structures for core
    [*]   Enable futex support
    -*-   Enable eventpoll support
    -*-   Enable signalfd() system call
    -*-   Enable timerfd() system call
    -*-   Enable eventfd() system call
    -*-   Use full shmem filesystem 
    [*]   Enable AIO support
    [*]   Enable IO uring support
    [*]   Enable madvise/fadvise syscalls
  -*- Namespaces support  --->
    -*-   UTS namespace
    [*]   TIME namespace
    -*-   IPC namespace
    -*-   User namespace
    -*-   PID Namespaces
    -*-   Network namespace
[*] Networking support  --->
  Networking options  --->
    <M> 802.1d Ethernet Bridging
    [*]   IGMP/MLD snooping
    <M> 802.1Q/802.1ad VLAN Support

Device Drivers  --->
  [*] Network device support  --->
    <M>     MAC-VLAN support
    <M>       MAC-VLAN based tap driver
    <M>     Universal TUN/TAP device driver support
    <M>     Virtio network driver
  Character devices  --->
    [*]   Unix98 PTY support

File systems  --->
  <*> FUSE (Filesystem in Userspace) support
  <*> Overlay filesystem support
```

Creamos este archivo `/etc/modules-load.d/networking.conf` y añadimos `tun`.

## Configuramos los subuid y subgid al usuario que lo usará
Podman lo utilizará para mapear rangos de UID en los contenedores mediante espacios de nombres de usuario.

```
# usermod --add-subuids 200000-201000 --add-subgids 200000-201000 sincorchetes
```

## Añadimos soporte CGroups V2 en el arranque

Editamos el archivo `/etc/rc.conf` y añadimos:

```
rc_controller_cgroups="YES"

```

## Configuramos las USE flags

Usaremos estas USE flags:
```
app-containers/podman rootless fuse
```

## Instalamos

```
# emerge --ask app-containers/crun app-containers/podman
```

## Exponiendo los contenedores a la red local

Habilitamos el servicio:
```
# rc-update add cni-dhcp default
# rc-service cni-dhcp start
```

Añadimos la configuración de red `/etc/cni/net.d/88-macvlan.conflist`:

```
{
  "cniVersion": "0.4.0",
  "name": "macvlan",
  "plugins": [
    {
      "type": "macvlan",
      "master": "br0",
      "isGateway": true,
      "ipam": {
        "type": "dhcp"
      }
    },
    {
      "type": "portmap",
      "capabilities": {
        "portMappings": true
      }
    },
    {
      "type": "firewall"
    },
    {
      "type": "tuning"
    }
  ]
}
```

## Creamos la interfaz br0 con NetworkManager

Para saber qué tarjetas tenemos y podemos utilizar:
```
nmcli dev
```

Haciendo bridging

br0-slave0: Añado la interfaz Ethernet cableada
br0-slave1: Vinculo con la de Wireless.

```
nmcli con add type bridge con-name br0 ifname br0 ip4 10.0.0.3/24 gw4 10.0.0.1
nmcli con add type bridge-slave con-name br0-slave0 ifname enp3s0f1 master br0
nmcli con add type bridge-slave con-name br0-slave1 ifname wlp4s0 master br0
nmcli con up br0
```

## Creamos la red

```
# podman pod create --name homeserver --network macvlan
```

## Probamos
```
$ podman run -ti centos bash
[root@f0f1e1bb8d1b /]# cat /etc/os-release
NAME="CentOS Linux"
VERSION="8"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="8"
PLATFORM_ID="platform:el8"
PRETTY_NAME="CentOS Linux 8"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:8"
HOME_URL="https://centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"
CENTOS_MANTISBT_PROJECT="CentOS-8"
CENTOS_MANTISBT_PROJECT_VERSION="8"
```

## Fuentes

* [CGroups Gentoo Wiki](https://wiki.gentoo.org/wiki/OpenRC/CGroups)
* [LXC Gentoo Wiki](https://wiki.gentoo.org/wiki/LXC#Kernel_options_required)
* [Podman Gentoo Wiki](https://wiki.gentoo.org/wiki/Podman)
* [Bridging Gentoo Wiki](https://wiki.gentoo.org/wiki/Network_bridge#Using_NetworkManager)
