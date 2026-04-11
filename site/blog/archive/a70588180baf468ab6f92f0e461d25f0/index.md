---
uuid: a70588180baf468ab6f92f0e461d25f0
title: "Solucionando el problema de parpadeo de Stellarium en Intel"
slug: /posts/solucionando-problema-stellarium-parpadeo-intel
date: 2022-01-16
authors:
  - sincorchetes
tags:
  - Linux
---
Después de haber publicado el post anterior sobre [Stellarium causa parpadeos en Fedora 35](https://echemosunbitstazo.es/posts/stellarium-causa-parpadeos-fedora-35/), al poco tiempo después, recibo un correo electrónico indicando que habían añadido más información al tema en el [bug abierto en MESA](https://gitlab.freedesktop.org/mesa/mesa/-/issues/5731). Resulta que era un desarrollador que había publicado un Patch. Me sugirió que lo compilara y lo instalara en la máquina:

<!-- truncate -->

> There's a patch for this issue already, which you have to apply MANUALLY compiling mesa:
> pzanoni/mesa@07dc3d42
> Again: There is no official release containing this patch, yet (mesa is at version 21.3.4 at the time of this writing).

En vez de hacerlo de forma rudimentaria, decidí construir un paquete RPM para Fedora.

1. Instalar fedpkg
```
sudo dnf install fedpkg
```
2. Crear el entorno de compilación
```
rpmdev-setuptree
```

3. Ubicarnos y descargar el último SRPM
```
cd ~/rpmbuild/SRPMS \
dnf download --source mesa
```

4. Descomprimir las fuentes
```
rpm2cpio mesa-21.3.3-2.fc35.src.rpm | cpio -idmvD ~/rpmbuild/SOURCES
```
5. Mover el spec
```
mv ~/rpmbuild/SOURCES/mesa.spec ~/rpmbuild/SPECS
```

6. Descomprimir las fuentes, obtener el archivo original, hacemos una copia para introducir el nuevo código, añadimos el nuevo código en él, y hacemos el patch.
```
tar xfv ~/rpmbuild/SOURCES/mesa-21.3.3.tar.xz -C ~/rpmbuild/SOURCES/ 
cp ~/rpmbuild/SOURCES/mesa-21.3.3/src/gallium/drivers/iris/iris_batch.c \ 
~/rpmbuild/SOURCES/iris_batch_modified.c
diff -urN ~/rpmbuild/SOURCES/mesa-21.3.3/src/gallium/drivers/iris/iris_batch.c \
~/rpmbuild/SOURCES/iris_batch_modified.c > 0007-iris-solve-blinks-problems.patch
```

7. Editamos el `~/rpmbuild/SPECS/mesa.spec` y vamos realizando los siguientes pasos:
   1. Sumamos +1 al `release_number`, en vez de 1, fijamos en 2
   2. Buscamos la sección de los parches listados y añadimos un comentario diciendo de dónde se obtuvo el código cambiado y luego `Patch0009: 0007-iris-solve-blinks-problems.patch`
   3. Vamos a la sección de changelog y añadimos nuestro comentario:
      ```
      * Sat Jan 15 2022 Álvaro Castillo <sincorchetes@fedoraproject.org> 21.3.3-2
      - Solve Intel blinking problems
      ```
   4. Guardamos

5. Preparamos el entorno antes de construir el paquete
```
sudo dnf builddep mesa
```

6. Construimos el paquete
```
rpmbuild -ba ~/rpmbuild/SPECS/mesa.spec
```

Cuando todo acabe, nos habrán generado los paquetes en `~/rpmbuild/RPMS/x86_64/`, aplicamos la actualización:
```
cd ~/rpmbuild/RPMS/x86_64/
sudo dnf install mesa-dri-drivers-21.3.3-2.fc35.x86_64.rpm \
mesa-libEGL-21.3.3-2.fc35.x86_64.rpm mesa-filesystem-21.3.3-2.fc35.x86_64.rpm \
mesa-libgbm-21.3.3-2.fc35.x86_64.rpm mesa-libGL-21.3.3-2.fc35.x86_64.rpm \
mesa-libglapi-21.3.3-2.fc35.x86_64.rpm mesa-libxatracker-21.3.3-2.fc35.x86_64.rpm \
mesa-vdpau-drivers-21.3.3-2.fc35.x86_64.rpm mesa-vulkan-drivers-21.3.3-2.fc35.x86_64.rpm
```

7. Reiniciamos

8. Abrimos Stellarium y ya lo tendremos sin problemas de parpadeos.

Después de haber hecho y haberlo probado en local, lo mandé a Koji (_el sistema de compilación de paquetes de Fedora_) para que se hiciera ahí, y adjunté el resultado de la compilación al BR para que lo puedan incluir en alguna update de Fedora.

Para mandar la solicitud de compilación a Koji, tienes que registrarte y obtener una FAS, firmar el CLA de Fedora y no sé si falta algún pasito más, luego de eso.

1. Instalar el kinit
```
sudo dnf install krb5-workstation
```

2. Loguearnos
```
kinit nombre_usuario_fas@FEDORAPROJECT.ORG
```

3. Probar que hicimos bien el login
```
koji hello
```

4. Subir la solicitud a Koji
```
koji koji build --scratch f35 ~/rpmbuild/SRPMS/mesa-21.3.3-2.fc35.src.rpm
```

5. El comando quedará en primer plano informando del proceso de la solicitud, puedes ver el mío [aquí](https://koji.fedoraproject.org/koji/taskinfo?taskID=81298037)

Puedes descargarte los paquetes desde [aquí](https://koji.fedoraproject.org/koji/taskinfo?taskID=81298037)

## Fuentes
* [The Passthrough post](https://passthroughpo.st/agesa_fix_fedora/)
* [Creating RPM Packages](https://docs.fedoraproject.org/en-US/quick-docs/creating-rpm-packages/)
* [Using the koji build system](https://docs.pagure.org/koji/using_the_koji_build_system/)
