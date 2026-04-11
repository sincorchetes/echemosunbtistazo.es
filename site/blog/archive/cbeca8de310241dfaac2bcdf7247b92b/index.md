---
uuid: cbeca8de310241dfaac2bcdf7247b92b
title: "Curso de Python - Encapsulamiento y polimorfismo"
slug: /posts/curso-de-python-encapsulamiento
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Desarrollo
---
En este post haré una breve introducción a lo que es el encapsulamiento en Python y el poliformismo.

<!-- truncate -->

# Encapsulamiento
Encapsular permite abstraer cierta información al mundo y mostrar solo aquella que interese. Por ejemplo, cuando enviamos un paquete por correos, el personal de correos no puede ver el contenido del paquete, pero si que puede ver el destinatario y el remitente, pudiendo identificar a las dos personas implicadas y saber sus direcciones de correo postal.

## ¿Cómo encapsular?
Para encapsular, básicamente tendremos que añadirle dos guiones bajos "_ __ _ " delante de la propiedad que queremos ocultar.
```
class A:
  self._propiedad = valor
```
Veamos un ejemplo:
```
class Persona:
  def __init__(self):
    self.nombre  = "Susana"
    self.__apellidos = "Bramura"
    self._tlfno = "777 777 777"
    
Carlos = Persona()

print(Carlos.apellidos)
```
Veremos un error parecido a este:
```
Traceback (most recent call last):
  File "main.py", line 9, in <module>
    print(Carlos.apellidos)
AttributeError: 'Persona' object has no attribute 'apellidos'
```
Y nos preguntaremos... Pero, si llamamos a `Carlos.apellidos` y nosotros hemos puesto: `Carlos.__apellidos`, ¿no sería más correcto para querer obtener el valor de los apellidos de la clase Persona? Bueno, aunque pensemos esto, si utilizamos __ igualmente dará el mismo error porque no se puede acceder desde fuera a una propiedad o método encapsulado.
```
print(Carlos.__apellidos)
Traceback (most recent call last):
  File "main.py", line 8, in <module>
    print(Carlos.__apellidos)
AttributeError: 'Persona' object has no attribute '__apellidos'
```
## ¿Cómo podemos acceder o modificar las variables, propiedades, o los métodos de ámbito privado?
Tendremos que crear métodos específicos que puedan acceder a esas variables, propiedades o métodos.
```
class A:
  # Constructor de clase
  def __init__(self):
  
    # Asignamos 20 a esta propiedad privada
    self.__propiedad = 20
  
  def __metodo(self):
    print("Soy un método privado.")
  
  # Soy un método público que leerá y ejecutará contenido privado.
  def mostrar(self):
    self.__metodo()
    print(self.__variable)
    
   def cambiar(self,propiedad):
     self.__propiedad = propiedad
     print("Esta es la nueva propiedad %i % (self.__propiedad))

# Instanciamos el objeto
obj = A()

# Ejecutamos el método público mostrar()
obj.mostrar()

# Modificamos el valor propiedad
obj.cambiar(300)
```

# Polimorfismo
Es la capacidad que tiene un objeto para ser y poder ser otra cosa al mismo tiempo. Por ejemplo, un pájaro. Un pájaro puede ser un pingüino y un gorrión, ambos tienen propiedades en común como las patas, ojos, orejas; el color de las plumas, de los ojos, de los picos. También, tienen una serie de métodos similares como volar, poner huevos, comer, dormir... 
¿Qué tienen en común todos ellos? Que son pájaros. Por lo tanto, un pájaro puede ser un gorrión o puede ser un pingüino al mismo tiempo sin perder lo que es su esencia, que es ser un pájaro.

```
# Creamos la clase Pájaro
class Pajaro:
  
  # Método volar
  def nadar(self):
    print("Puedo nadar.")
  
  def volar(self):
    print("Puedo volar.")

class Pinguino(Pajaro):
  def nadar(self):
    print("Puedo nadar.")
  
  def volar(self):
    print("No puedo volar.")

def ver_volar(birds)
  birds.volar()
  
gorrion=Pajaro()
pinguino=Pinguino()

# Este imprimirá que pude volar
ver_volar(gorrion)

# Este imprimirá que no puede volar
ver_volar(pinguino)
```
