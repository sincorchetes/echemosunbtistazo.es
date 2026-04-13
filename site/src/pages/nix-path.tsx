import React from "react";
import Layout from "@theme/Layout";

const posts = [
    {
    title: "Nix y NixOS: La revolución que no esperabas",
    url: "/posts/nix-y-nixos-la-revolucion-que-no-esperabas",
    date: "2026-04-13",
    description:
      "Descubre cómo Nix y NixOS pueden transformar tu flujo de trabajo y simplificar la gestión de paquetes y entornos.",
  },
  {
    title: "Usa Nix en Debian, Ubuntu o Fedora y deja de sufrir",
    url: "/posts/usa-nix-en-debian-ubuntu-o-fedora",
    date: "2026-04-13",
    description:
      "Instala Nix en tu distribución actual y disfruta de sus beneficios sin necesidad de migrar a NixOS.",
  },
  
];

export default function NixPath(): React.JSX.Element {
  return (
    <Layout title="Nix Path" description="Ruta de aprendizaje de Nix y NixOS">
      <main className="container margin-vert--lg">
        <h1>Nix Path</h1>
        <p>
          Artículos sobre Nix y NixOS, desde cero hasta producción.
          Aquí encontrarás todos los posts ordenados para seguir la ruta de
          aprendizaje paso a paso.
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
