---
uuid: 6c16187817064326bde9d3551e020857
title: "Curso de Python - Herencia"
slug: /posts/curso-de-python-herencia
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Desarrollo
---
Vamos a tratar un poco la herencia de que pueden tener los objetos, que es una de las características que tienen los objetos.

<!-- truncate -->

# Herencia
Una de las propiedades que mencionamos que podían tener los objetos es la herencia, por lo que una clase hija puede contener propiedades y métodos de una clase padre. Veamos un ejemplo:
```
# Definimos la clase padre:
class ClasePadre:
# Decimos que se ejecute el código sin hacer nada.
  pass

# Y aquí la clase hija:
class ClaseHija(ClasePadre):
  pass

# Creamos el objeto
Objeto = ClaseHija()
```
Este es un ejemplo:
```
# Definimos la clase Familia
class Familia():

  # Con sus propiedades que se rellenarán cuando se inicialice el objeto.
  def __init__(self, miembros, apellidos):
    self.miembros = miembros
    self.apellidos = apellidos
    
    # Cuando se cree la clase, mostrará el apellido que ha recibido.
    print("Apellidos: %s" % (self.apellidos))

# Creamos la clase Hijo que hereda de Familia
class Hijo(Familia):

  # Se rellenarán propiedades para este objeto.
  def __init__(self, nombre, apellidos):
  
# Si queremos heredar propiedades y métodos, tendremos que hacer uso de la función super()
# super() lo explicaremos más adelante.
# Aquí llamamos la propiedad específica de Familia, Familia.apellidos y la inicializamos
    super().__init__(self,apellidos)
    
    # Definimos aquí los valores que tendrán estas propiedades
    self.nombre = nombre
    self.apellidos = apellidos

# Añadimos un método para el Hijo
  def mostrar_info(self):
  
    # Decimos que imprima self.nombre y self.apellidos.
    print("Soy %s y soy de la familia %s" % (self.nombre,self.apellidos))

# Creamos el objeto
Pugsley = Hijo("Pugsley","Adams")

# Llamamos al método mostrar_info()
Pugsley.mostrar_info()
```
Seguro que te preguntas sobre `super().__init__(...)`, esta función como comentamos permite heredar propiedades y métodos de otra clase. Vendría a ser lo mismo que:
```
class A:
  def __init__(self, ejemplo):
    self.ejemplo = ejemplo

class B(A):
  def __init__(self, x, y, z):
  
    # Este procedimiento es más complicado y más tedioso de hacer.
    self.guardar_info = A(x)

obj = B(2,3,4)
print(obj.guardar_info.ejemplo)
```
#### Sobreescribiendo métodos en clases hijas
Se puede hacer evidentemente, si en la clase A tenemos un método llamado `saludar()`, y la clase B que hereda de la clase A, le podemos definir el contenido del mensaje que devolverá el método `saludar()`.
```
class A:
  def saludar(self):
    print("Hola mundo")

class B(A):
  def saludar(self):
    print("Hello everybody")
    
obj = B
obj.saludar()
```
Y devolverá "Hello everybody".

## Tipos de herencia
Bien, habiendo visto un ejemplo de herencia, también os cuento, que hay distintos ejemplos de herencia:
* Simple
* Múltiple
* Multi nivel
* Jerárquica
* Híbrida

### Simple
Es el tipo de herencia que hemos visto hasta ahora.
```
class A:
  pass
class B(A):
  pass
```
### Múltiple
Es una clase que hereda desde otras clases, por lo que tendrá propiedades y métodos de ambas clases (A y B).
```
class A:
  pass
class B:
  pass
class C(A,B):
  pass
  
# Establecemos una comparación para ver si realmente son subclases o no.
# Devolverá True o False dependiendo de si es correcto o no.
issubclass(C,A) and issubclass(C,B)
```

### Multinivel
Esto se refiere, a que tenemos una clase abuelo, de la cuál hereda una clase padre, del cuál hereda una clase hijo.
```
class A:
  pass
class B(A):
  pass
class C(B):
  pass
```
Como vemos, la clase C hereda de la clase B, la clase B de la clase A, y A es la clase principial de primer nivel. Por lo tanto, la clase C herederá propiedades y métodos de todas sus clases superiores a menos que se establezca qué propiedades o métodos se podrán heredar, esto forma parte del encapsulamiento que veremos más tarde.

### Jerárquica
Tenemos múltiples clases que heredan de una sola clase, es decir.
```
class A:
  pass
class B(A):
  pass
class C(A):
  pass
class D(A):
  pass
```
Un ejemplo puede ser, clase Jefe/Jefa de una empresa que tiene el rol más alto de una organización y que por debajo de ellos hay otros roles acordes a la labor de la empresa que tienen menos privilegios, otras funciones...etc

### Híbrido
Es la combinación de una o múltiples clases con una o múltiples clases por ejemplo:
Imaginamos que tenemos 5 clases (A,B,C,D,E).
* Clase A es una clase padre.
* Clase B,C,D heredan de la clase A
* Clase E, hereda de la clase B y D.
* Clase E es la clase padre de B y D. 

Aquí podemos identificar varios tipos de herencia:
* A, B, C, D, C = __Herencia híbrida__
* B, C, D que heredan de A = __Herencia jerárquica__
* E que hereda de B y D = __Herencia múltiple__
* C hereda de A = __Herencia simple__

Un ejemplo de sintaxis:
```
class A:
  pass
class B(A):
  pass
class C(A):
  pass
class D(A):
  pass
class E(B,D)
```
Si añadimos una variable en la clase A, creamos un objeto que referencie a E:
```
class A:
  hello_world = "Hola Mundo"
class B(A):
  pass
class C(A):
  pass
class D(A):
  pass
class E(B,D):
  pass
obj = E()
print(obj.hello_world)
```
´obj` habrá impreso `"Hola Mundo".`

## Función `super()`
Se utiliza para llamar a métodos de una clase padre, hemos visto en un ejemplo anterior como llamábamos a `super().__init__(self, nombre, apellidos)` en el ejemplo de la Familia Adams. Aquí estábamos llamando al método inicializador de la clase `Familia`. Pero podemos llamar a otros métodos también.
`super().método()`.

```
class Vehiculo:
  def arrancar(self):
    print("Arrancamos el coche")
  def parar(self):
    print("Paramos el coche")

class Conductor(Vehiculo):
  def soplar(self):
    print("Soplando, soplando y soplando...")
    
  def control_policia(self):
    super().parar()
    print("Persona - Hola agente, buenos días")
    print("Policía - Hola, vamos hacerle una prueba de alcoholemia, por favor, sople en la boquilla")
    print("Persona - Vale")
    self.soplar()
    print("Policía - Genial, puede usted proseguir")
    super().arrancar()

Antonio = Conductor()
Antonio.control_policia()
```
Como vemos, no hace falta que llamemos a `__init__` porque __no estamos inicializando ningún valor en ninguna propiedad__ y como se ejecutan los métodos `parar()` y `arrancar()` que forman parte de la clase `Vehiculo`.
