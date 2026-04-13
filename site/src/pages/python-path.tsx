import React from "react";
import Layout from "@theme/Layout";

const posts = [
  {
    title: "Curso de Python - Introducción y preparación del entorno",
    url: "/posts/curso-de-python-preparando-el-entorno",
    date: "2021-01-07",
    description:
      "Historia de Python, cómo instalarlo en diferentes sistemas operativos y qué IDEs puedes usar para desarrollar.",
  },
  {
    title: "Curso de Python - Intérprete, comentarios, identificadores y palabras clave",
    url: "/posts/curso-de-python-interprete-comentarios-identificadores-y-palabras-clave",
    date: "2021-01-07",
    description:
      "Consejos básicos para trabajar con el intérprete de Python, cómo comentar código, qué son los identificadores y las palabras clave.",
  },
  {
    title: "La función print()",
    url: "/posts/curso-de-python-funcion-print-type-y-ver-los-diferentes-tipos-de-datos",
    date: "2021-01-07",
    description:
      "Aprende a usar la función print() y type() para imprimir valores y descubrir tipos de datos, incluyendo cadenas, constantes, números enteros y valores flotantes.",
  },
  {
    title: "Curso de Python - Imprimir valores y funciones",
    url: "/posts/curso-de-python-imprimir-valores-y-funciones",
    date: "2021-01-07",
    description:
      "Múltiples formas de imprimir valores, iteradores y funciones, return, yield, closures y generadores en Python.",
  },
  {
    title: "Curso de Python - Introducir datos, control de excepciones, trabajar con archivos",
    url: "/posts/curso-de-python-introducir-datos-control-de-excepciones-trabajar-con-archivos",
    date: "2021-01-07",
    description:
      "Introducir datos por teclado, gestionar control de excepciones, y trabajar con archivos de texto en Python.",
  },
  {
    title: "Curso de Python - Tuplas, listas, diccionarios y sets",
    url: "/posts/curso-de-python-tuplas-listas-diccionarios-y-sets",
    date: "2021-01-07",
    description:
      "Tipos de datos clave en Python: tuplas, listas, diccionarios y sets, con ejemplos de sus métodos más útiles.",
  },
  {
    title: "Curso de Python - Introducción a la programación orientada a objetos",
    url: "/posts/curso-de-python-introduccion-programacion-orientada-a-objetos",
    date: "2021-01-07",
    description:
      "Principios básicos de la POO: clases, objetos, herencia, encapsulación y polimorfismo.",
  },
  {
    title: "Curso de Python - Fecha y hora",
    url: "/posts/curso-de-python-fecha-y-hora",
    date: "2021-01-07",
    description:
      "Trabaja con fecha y hora usando módulos como time, con ejemplos prácticos de formateo y gestión de fechas.",
  },
  {
    title: "Flask - Creando una mini aplicación",
    url: "/posts/flask-creando-una-miniaplicacion",
    date: "2021-01-07",
    description:
      "Tutorial práctico sobre Flask, el web framework de Python para crear aplicaciones web sencillas pero potentes.",
  },
];

export default function PythonPath(): React.JSX.Element {
  return (
    <Layout title="Python Path" description="Ruta de aprendizaje de Python">
      <main className="container margin-vert--lg">
        <h1>Python Path</h1>
        <p>
          Artículos sobre Python, desde los fundamentos hasta
          frameworks como Flask. Aquí encontrarás todos los tutoriales ordenados
          para seguir la ruta de aprendizaje paso a paso.
        </p>
        <div className="row">
          {posts.map((post, idx) => (
            <div className="col col--12 margin-bottom--lg" key={idx}>
              <div className="card shadow--md" style={{ height: "100%" }}>
                <div className="card__header">
                  <h3>
                    <a href={post.url}>{post.title}</a>
                  </h3>
                </div>
                <div className="card__body">
                  <p>{post.description}</p>
                </div>
                <div className="card__footer">
                  <small>{post.date}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
