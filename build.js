#!/usr/bin/env node
/**
 * build.js — Generador de estructura del proyecto IA Bachillerato TIC
 * 
 * USO:
 *   1. Guarda este archivo como build.js en una carpeta vacía
 *   2. Abre la terminal en esa carpeta
 *   3. Ejecuta: node build.js
 *   4. Copia el contenido de cada artefacto en el archivo correspondiente
 * 
 * Requiere: Node.js (https://nodejs.org) — versión 14 o superior
 */

const fs   = require('fs');
const path = require('path');

// ── Carpeta destino del proyecto ──
const PROJECT_DIR = path.join(__dirname, 'ia-bachillerato-tic');

// ── Lista de archivos a crear ──
const FILES = [
  'index.html',
  'styles.css',
  'nav.js',
  'mod01-prompt.html',
  'mod02-chatbots.html',
  'mod02a-gpts.html',
  'mod02b-gemas.html',
  'mod02c-claude.html',
  'mod03-imagenes.html',
  'mod04-pres.html',
  'mod05-hojas.html',
  'mod06-trans.html',
  'mod07-visual.html',
  'mod08-invest.html',
  'mod09-notebook.html',
  '_template.html',
];

// ── Crear carpeta principal e img/ ──
if (!fs.existsSync(PROJECT_DIR)) {
  fs.mkdirSync(PROJECT_DIR, { recursive: true });
  console.log(`✅ Carpeta creada: ${PROJECT_DIR}`);
}

const IMG_DIR = path.join(PROJECT_DIR, 'img');
if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR);
  console.log(`✅ Carpeta creada: img/`);
}

// ── Crear archivos vacíos con comentario de referencia ──
FILES.forEach(filename => {
  const filepath = path.join(PROJECT_DIR, filename);
  if (!fs.existsSync(filepath)) {
    const ext = path.extname(filename);
    let placeholder = '';

    if (ext === '.html') {
      placeholder = `<!-- =============================================
  ${filename}
  Copia aquí el contenido del artefacto correspondiente
  desde la conversación con Claude.
  ============================================= -->
`;
    } else if (ext === '.css') {
      placeholder = `/* =============================================
  ${filename}
  Copia aquí el contenido del artefacto "styles.css"
  desde la conversación con Claude.
  ============================================= */
`;
    } else if (ext === '.js') {
      placeholder = `/* =============================================
  ${filename}
  Copia aquí el contenido del artefacto "nav.js"
  desde la conversación con Claude.
  ============================================= */
`;
    }

    fs.writeFileSync(filepath, placeholder, 'utf8');
    console.log(`  📄 Creado: ${filename}`);
  } else {
    console.log(`  ⚠️  Ya existe (omitido): ${filename}`);
  }
});

// ── Crear README.md ──
const readme = `# IA para Bachillerato TIC

Sitio educativo sobre herramientas de Inteligencia Artificial  
para alumnos de 2º de Bachillerato TIC.

## Estructura

\`\`\`
/
├── index.html            # Página de inicio
├── styles.css            # CSS global compartido
├── nav.js                # Navegación y utilidades
├── mod01-prompt.html     # Módulo 01: El Prompt
├── mod02-chatbots.html   # Módulo 02: Chatbots
├── mod02a-gpts.html      # 02-A: GPTs de ChatGPT
├── mod02b-gemas.html     # 02-B: Gemas de Gemini
├── mod02c-claude.html    # 02-C: Claude Artefactos
├── mod03-imagenes.html   # Módulo 03: Imágenes IA
├── mod04-pres.html       # Módulo 04: Presentaciones
├── mod05-hojas.html      # Módulo 05: Hojas de Cálculo
├── mod06-trans.html      # Módulo 06: Transcripciones
├── mod07-visual.html     # Módulo 07: Org. Visual
├── mod08-invest.html     # Módulo 08: Investigación
├── mod09-notebook.html   # Módulo 09: NotebookLM
└── img/                  # Imágenes de cabecera de cada módulo
\`\`\`

## Publicar en GitHub Pages

1. Sube todos los archivos a un repositorio GitHub
2. Ve a **Settings → Pages → Source: main / root**
3. El sitio estará disponible en \`https://tuusuario.github.io/nombre-repo\`

## Añadir imágenes de cabecera

Coloca tus imágenes en la carpeta \`img/\` y actualiza el atributo
\`src\` en el \`<div class="section-hero">\` de cada módulo:

\`\`\`html
<img src="img/mod01.jpg" alt="El Prompt"/>
\`\`\`

Tamaño recomendado: 1400×400 px, formato JPG o WebP.
`;

fs.writeFileSync(path.join(PROJECT_DIR, 'README.md'), readme, 'utf8');
console.log(`  📄 Creado: README.md`);

// ── Crear .nojekyll (necesario para GitHub Pages con archivos _ ) ──
fs.writeFileSync(path.join(PROJECT_DIR, '.nojekyll'), '', 'utf8');
console.log(`  📄 Creado: .nojekyll`);

console.log(`
╔══════════════════════════════════════════════════════╗
║  ✅ Estructura creada en: ia-bachillerato-tic/       ║
║                                                      ║
║  SIGUIENTES PASOS:                                   ║
║  1. Abre la carpeta ia-bachillerato-tic/             ║
║  2. Copia el contenido de cada artefacto de Claude   ║
║     en el archivo correspondiente                    ║
║  3. Sube la carpeta a GitHub                         ║
║  4. Activa GitHub Pages en Settings → Pages          ║
╚══════════════════════════════════════════════════════╝
`);