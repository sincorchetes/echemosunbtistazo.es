# Roadmap: Serie Nix y NixOS

Estructura de la serie de posts sobre Nix/NixOS. Orden de menos compromiso a más compromiso para el lector.

---

## Bloque 1 — Nix sin NixOS (la puerta de entrada)

### 1. Instalando Nix en tu distro
- Instalación del gestor de paquetes en Ubuntu/Fedora/Arch/macOS
- Primeros comandos: `nix-env`, `nix-shell`, `nix run`
- Demo rápida: convivencia de Python 3.8 y 3.11 en 5 minutos
- Si no te gusta: `rm -rf /nix` y a otra cosa

### 2. El /nix/store por dentro
- Bajar al barro: hashes, derivaciones, estructura de los paths
- Qué es un closure y por qué importa
- Cómo se organizan los paquetes internamente
- Por qué los paths son así (hash + nombre + versión)

### 3. El lenguaje Nix
- Tipos de datos: strings, integers, booleans, paths, null
- Variables y `let...in`
- Sets (attrsets), listas, acceso a atributos
- Funciones y lambdas
- `with`, `inherit`, `rec`
- `import` y modularización básica
- Probarlo todo desde `nix repl`

### 4. Nix Shell y entornos de desarrollo
- `nix-shell` y `shell.nix`
- `nix develop` (enfoque moderno)
- Caso práctico: montar entorno para proyecto Python/Node/Rust sin contaminar el sistema
- `devShells` y `devenv`
- Diferencia entre entorno imperativo y declarativo

### 5. Flakes (introducción)
- Qué son y por qué existen
- Estructura de `flake.nix`: inputs y outputs
- `flake.lock` y reproducibilidad
- Comandos: `nix flake init`, `nix flake update`, `nix flake show`
- Migrar de `shell.nix` a flakes

---

## Bloque 2 — NixOS (el salto completo)

### 6. Instalando NixOS
- Instalación paso a paso (ISO, particionado, `nixos-generate-config`)
- `configuration.nix` inicial explicada línea por línea
- El choque cultural con FHS: por qué los binarios no están donde esperas
- Primer `nixos-rebuild switch`

### 7. Configuración declarativa de NixOS
- `/etc/nixos/configuration.nix` en profundidad
- Usuarios, paquetes del sistema, localización
- Servicios, networking, firewall
- `nixos-rebuild switch` vs `test` vs `boot`
- Buscar opciones: `nixos-option`, search.nixos.org

### 8. Gestión de servicios y módulos
- Cómo NixOS gestiona systemd
- Opciones de módulos: activar servicios (nginx, postgres, etc.)
- Crear módulos propios
- Estructura de un módulo NixOS: `options` + `config`

### 9. Home Manager
- Qué es y por qué usarlo
- Instalación (standalone vs módulo NixOS)
- Gestionar dotfiles de forma declarativa
- Configurar programas: git, shell (zsh/fish/bash), editores, terminal
- `home.packages` vs `environment.systemPackages`

### 10. Rollbacks y generaciones
- El superpoder: cómo volver atrás al instante
- Gestionar generaciones del sistema
- Limpiar el store: `nix-collect-garbage`
- Bootloader y selección de generación
- "No tengas miedo de romper cosas"

---

## Bloque 3 — Nix avanzado (para los valientes)

### 11. Nixpkgs: empaquetar software propio
- `mkDerivation` desde cero
- `buildPythonPackage`, `buildGoModule`, etc.
- Overlays y overrides
- Contribuir a nixpkgs (experiencia con google-cloud-sdk como ejemplo)

### 12. DevOps con Nix
- CI/CD con Nix (GitHub Actions, GitLab CI)
- Caché binaria: Cachix
- Despliegues reproducibles
- NixOS en servidores y VMs
- Contenedores OCI con Nix (`dockerTools`)

### 13. Secretos y despliegue
- Gestión de secretos: `agenix`, `sops-nix`
- `deploy-rs` para despliegue remoto
- `nixos-anywhere`: instalación remota
- Disko: particionado declarativo

---

## Calendario de publicación

Publicación semanal, cada **lunes**. Post introductorio publicado el 28/03/2026.

| #  | Post                                  | Fecha publicación |
|----|---------------------------------------|-------------------|
| 0  | Nix y NixOS: la revolución (intro)    | 28/03/2026 ✅      |
| 1  | Instalando Nix en tu distro           | 06/04/2026        |
| 2  | El /nix/store por dentro              | 13/04/2026        |
| 3  | El lenguaje Nix                       | 20/04/2026        |
| 4  | Nix Shell y entornos de desarrollo    | 27/04/2026        |
| 5  | Flakes (introducción)                 | 04/05/2026        |
| 6  | Instalando NixOS                      | 11/05/2026        |
| 7  | Configuración declarativa de NixOS    | 18/05/2026        |
| 8  | Gestión de servicios y módulos        | 25/05/2026        |
| 9  | Home Manager                          | 01/06/2026        |
| 10 | Rollbacks y generaciones              | 08/06/2026        |
| 11 | Nixpkgs: empaquetar software propio   | 15/06/2026        |
| 12 | DevOps con Nix                        | 22/06/2026        |
| 13 | Secretos y despliegue                 | 29/06/2026        |

---

## Notas

- **Filosofía**: cada post construye sobre el anterior, sin saltos ni conceptos sin explicar.
- **Posts 1-5**: cualquiera puede probar sin riesgo. Solo necesita instalar Nix.
- **Posts 6-10**: para los que ya están convencidos y quieren el sistema completo.
- **Posts 11-13**: conocimiento avanzado para los que ya viven en el ecosistema.
- Enlazar entre posts cuando se referencien conceptos previos.
