---
uuid: b93b5c20242546f990eeb03f0c9e5e75
title: "Automatizar con Ansible es la clave"
slug: /posts/automatizar-con-ansible-es-la-clave
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - DevOps
  - Linux
---
¿Qué pasa si eres camararero(a) y tienes que llenar 100 copas de agua en 5 minutos? ¿Cómo podrías solventar este problema sin que se derrame agua y que te de tiempo para rellenar estas 100 copas?
La respuesta no es darse prisa, la respuesta se llama **ANSIBLE**.

<!-- truncate -->

Ansible es una plataforma que te permite automatizar y también ejecutar comandos ad-hoc (_a cualquier máquina_), gestionar plataformas de Virtualización como VMware Sphere, plataformas de orquestación de contenedores tipo Kubernetes, dispositivos electrónicos como routers Alcatel...etc.

Puedes hacer maravillas con él, en este post te explico cómo utilizar las cuatro cosas básicas para comenzar a trabajar.
# Instalación en CentOS 7
Para instalarlo, simplemente, ejecutas:
```
sudo yum install ansible
```
# Instalación en Fedora 29
Igual que en el apartado anterior pero con DNF
```
sudo dnf install ansible
```
# Añadiendo servidores
Para hacer una prueba rapidita de cómo lanzar un comando ad-hoc, añade los servidores en los que estés interesado(a) ejecutar algo y ¡a correr!

Edita el archivo `/etc/ansible/hosts` y añade los hostnames/IPS

Genera una llave SSH si no la tienes:
```
ssh-keygen -t rsa
ssh-agent bash
ssh-add ~/.ssh/id_rsa
```
Copia las llaves a los servidores que tengas (_aquí tomo como referencia el puerto por defecto del protocolo SSH que es el 22, si lo has cambiado adáptalo_):
```
ssh-copy-id ~/.ssh/id_rsa USUARIO@HOST
ssh-copy-id ~/.ssh/id_rsa USUARIO@HOST
ssh-copy-id ~/.ssh/id_rsa USUARIO@HOST
```
# ¡A probar!
¡Probamos con un ping!
```
ansibe all -m ping
EXAMPLE.COM.ES | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
EXAMPLE.COM | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
EXAMPLE.ES | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```
¡Perfecto ya lo tienes!

Ahora puedes hacer volar tu imaginación tanto como quieras. ¿Te imaginas actualizar 20 máquinas a la vez sin tener que repetir esos 2-3 comandos? ¡Te ahorras hasta la ejecución de 60 comandos, más el tiempo de acceso a todas esas máquinas!

# Referencias
* Ansible - [documentation](https://docs.ansible.com/ansible/latest/user_guide/intro_getting_started.html?target=_blank)tting_started.html?target=_blank)
