---
uuid: 74e0a9463235468bb4786121e0a8f216
title: "Curso de Python - Introducción a la programación orientada a objetos"
slug: /posts/curso-de-python-introduccion-programacion-orientada-a-objetos
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Desarrollo
---
En este post aprenderás los principios básicos del POO o también llamada programación orientada a objetos que es uno de los paradigmas de la programación. En los post siguientes iré explicando más sobre lo que podemos hacer con ella además de mostrar algunos ejercicios.

<!-- truncate -->

# Programación orientada a objetos o POO
Python es un lenguaje como ya mencionamos anteriormente orientado a objetos. Los objetos contienen una serie de métodos y propiedades que lo definen. Si pensamos en un humano, tenemos como propiedades el color de ojos, color de piel, altura... y los métodos serían las acciones como el baile, leer, saltar, correr...

Esta metodología de programación nos permite reusar el código las veces que queramos sin tener que estar escribiendo múltiples líneas con funciones específicas para determinadas partes de nuestro código si lo hicieramos en una programacioń estructurada o procedural.

## Principios básicos de POO
En Python tenemos los siguientes principios:
* Clase: Tipo de dato que contiene un esquema de métodos y propiedades que se usarán para construir un objeto.
* Objeto: Una clase que se ha inicializado, es decir, existe y tiene nombres y apellidos propios en su ejecucioń.
* Herencia: Propiedades o métodos que ha recibido una clase hija por parte de una clase padre, esto no quiere decir que vaya a heredar todos los métodos y propiedades, solo aquellos que se le permitan.
* Encapsulación: La habilidad de enseñar aquello que solo se pueda mostrar y esconder lo que no nos interesa visibilizar.
* Polimorfismo: La capacidad que tiene un objeto para cambiar su rol al mismo tiempo, puede actuar de un rol y en otro rol al mismo tiempo.

### ¿Qué es una clase?
Una clase es la plantilla que tendrá el objeto que queremos crear, contiene una serie de méotodos y propiedades que los utilizaremos una vez generemos el objeto. Por supuesto, una clase es un tipo de dato dentro de Python.

### ¿Cómo declaramos una clase?
Para generar una clase seguiremos esta sintaxis:
```
class NombreClase:
  # Bloque de código
```
### ¿Cómo podemos añadirle propiedades y métodos a una clase?
De la siguiente forma:
```
class Coche:
  propiedad = valor
  
  def método(self):
    # Bloque de código
```
Un ejemplo podría ser:
```
class Coche:
  marca = "Toyota"
  modelo = "Corolla"
  
  def publicidad(self):
    print("De 0 a 100 en 10 segundos")
```
Tenemos la clase Coche, con unas propiedades definidas que son la marca y el modelo, además, tenemos un método llamado publicidad que muestra un mensaje. En el siguiente apartado, veremos como trabajar con esta clase pero desde la vista de un objeto.

### ¿Qué es un objeto?
Un objeto es la materialización de una clase, es decir, cuando lo generamos a partir de unas instrucciones ya empieza a existir en nuestro programa que estemos desarrollando. Por ejemplo, tenemos la clase Casa, evidentemente, las casas que declaremos tiene propiedades y métodos diferentes, por ejemplo, tiene una dirección, un número, una elevación, una función, un espacio diferente. Si creamos 5 casas, hemos creado 5 objetos partiendo de una sola clase que es la clase Casa.

En resumen:
* Es la unidad básica de POO
* Representa una instancia particular partiendo de una clase
* Puede haber más instancias partiendo de una misma clase
* Cada objeto puede contener y mantener su información

### ¿Cómo declaramos un objeto?
La sintaxis es:
```
NombreObjeto = NombreClase()
```
En este ejemplo creamos 3 objetos diferentes partiendo de la clase anterior.
```
NombreObjeto = NombreClase()
NombreObjeto2 = NombreClase()
NombreObjeto3 = NombreClase()
```
Para acceder a sus propiedades:
```
NombreObjeto.propiedad1
```
Para acceder a sus métodos:
```
NombreObjeto.método1()
```
Utilizando el ejemplo que hemos creado antes:
```
class Coche:
  marca = "Toyota"
  modelo = "Corolla"
  publicidad = "De 0 a 100 en 10 segundos"

  def eslogan(self):
    print("Este es un método",self.publicidad)

Sara = Coche()
Ionela = Coche()
```
Tenemos a dos personas que utilizan el mismo coche Ionela y Sara y lo vemos:
```
print(Ionela.marca,Ionela.modelo)
Toyota Corolla
Ionela.eslogan()
De 0 a 100 en 10 segundos

print(Sara.marca,Sara.modelo)
Toyota Corolla
Sara.eslogan()
De 0 a 100 en 10 segundos
```
¿Qué pasa si Sara quiere cambiar de coche?
```
Sara.marca = "Citröen"
Sara.modelo = "Xsara"
Sara.publicidad = "El confort no es discutible."
print(Sara.marca,Sara.modelo)
Citröen Xsara
Sara.eslogan()
El confort no es discutible.
```
¿Pero Ionela ha cambiado de coche?
```
print(Ionela.marca,Ionela.modelo)
Toyota Corolla
Ionela.eslogan()
De 0 a 100 en 10 segundos
```
¡Ya lo tenemos! Podemos instanciar objetos diferentes partiendo de una misma clase y cambiar sus propiedades sin afectar al resto de objetos. ¿A qué es sencillo? Pero, ¿Qué pasa si queremos cualquier persona pueda tener un coche diferente desde el principio?

Pues a pesar de que se puede hacer creando un método que le asigne el valor a las propiedades, lo más correcto es utilizando el método `__init__`. Este método `constructor` (_que permite inicializar un objeto_) asigna valores a las propiedades del objeto cuando se construye, por ejemplo.
```
class NombreClase:
  def __init__(self, valor_propiedad1, valor_propiedad2):
    self.propiedad1 = valor_propiedad1
    self.propiedad2 = valor_propiedad2
  
  def metodo1(self):
    # Bloque de código
```
Para crear el objeto:
```
Variable=NombreClase("Valor de ejemplo n1","Valor de ejemplo n2")
```
Si parece dificultoso de entender, no pasa nada, este es otro ejemplo con comentarios (_¡Será por ejemplos!_):
```
# Definimos la clase Coche
class Coche:

  # Definimos el constructor que sustituirá los 
  # valores de las propiedades cuando las definamos al inicializar el objeto.
  
  def __init__(self,marca,modelo, velocidad):
    self.marca = marca
    self.modelo = modelo
    self.velocidad = velocidad
    
  # Cuando se llama a este método la velocidad se incrementa +1.
  def acelerar(self):
    self.velocidad += 1
    print(self.velocidad)
    
  # Cuando se llama a este método la velocidad disminuye en -1.  
  def frenar(self):
   self.velocidad -= 1
   print(self.velocidad)

# Creamos los objetos:

Chami = Coche("Nissan", "Almera", 0)
Jose = Coche("Toyota","Corolla AE92 GTi Twin Cam", 0)

# Imprimimos los valores que tienen las propiedades de cada objeto:

print("El coche de Chami es un:",Chami.marca,Chami.modelo,"y ahora va a",Chami.velocidad,"km/h.")
print("El coche de Jose es un:",Jose.marca,Jose.modelo,"y ahora va a",Jose.velocidad,"km/h.")

# Aumentamos la velocidad a uno de los objetos:
Chami.acelerar()

# Si queremos aumentar más veces la velocidad, podemos usar un bucle
for x in range(0, 100):
  Chami.acelerar()

# Imprimimos la velocidad actual
print("Chami va a una velocidad de %i" % Chami.velocidad)
```
Este ejemplo si lo ejecutamos dará como resultado:
```
El coche de Chami es un: Nissan Almaera y ahora va a 0 km/h.
El coche de Jose es un: Toyota Corolla AE92 GTi Twin Cam y ahora va a 0 km/h.
```
