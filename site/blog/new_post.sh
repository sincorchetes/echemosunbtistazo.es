#!/usr/bin/env bash
new_post=$(sha256sum <<< "$(date)" | cut -c1-32)
mkdir -p 2026/${new_post}
cat > 2026/${new_post}/index.md <<EOL

uuid: ${new_post}
title: "Generic"
slug: /posts/generic
date: 2026-04-23
authors:
  - sincorchetes
tags:
  - Generic
---

Resumen del post.

<!-- truncate -->

Contenido del post.
EOL
echo "New post created at 2026/${new_post}/index.md"
