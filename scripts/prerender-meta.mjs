#!/usr/bin/env node
//
// Writes a static HTML file per route after the Vite build, each carrying its
// own <title>, description, canonical and social tags.
//
// Why this exists: the app sets those tags from JavaScript on route change,
// which Google can see (it renders JS) but most other crawlers cannot. Link
// scrapers - LinkedIn, Slack, iMessage, X - read the raw HTML and stop. Before
// this step every URL returned the same generic index.html, so sharing
// /ccda-viewer produced the site-wide description and no preview image.
//
// Each route is written as a directory index (build/ccda-viewer/index.html),
// which every static host resolves. That also means a direct load no longer
// has to bounce through 404.html's redirect trick - that fallback stays for
// paths not listed here.
//
// Runs automatically as `postbuild`. The output is still the same SPA; only
// the <head> differs per file.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { PAGE_META, buildPageMeta } from '../src/data/pageMeta.mjs';

const buildDir = new URL('../build/', import.meta.url);

const escape = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Anything the build-time tags replace. Left in place, the template's own
// title and description would sit alongside the per-route ones and crawlers
// would be free to pick either.
const REPLACED_TAGS = [
  /[ \t]*<title>[\s\S]*?<\/title>\r?\n?/gi,
  /[ \t]*<meta\s+name="description"[\s\S]*?>\r?\n?/gi,
  /[ \t]*<meta\s+(?:name|property)="(?:og|twitter):[\s\S]*?>\r?\n?/gi,
  /[ \t]*<link\s+rel="canonical"[\s\S]*?>\r?\n?/gi,
];

const renderTags = (meta) => [
  `<title>${escape(meta.title)}</title>`,
  `<link rel="canonical" href="${escape(meta.canonical)}" />`,
  `<meta name="description" content="${escape(meta.description)}" />`,
  `<meta property="og:title" content="${escape(meta.title)}" />`,
  `<meta property="og:description" content="${escape(meta.description)}" />`,
  `<meta property="og:url" content="${escape(meta.canonical)}" />`,
  `<meta property="og:image" content="${escape(meta.image)}" />`,
  `<meta property="og:type" content="website" />`,
  `<meta name="twitter:card" content="summary_large_image" />`,
  `<meta name="twitter:title" content="${escape(meta.title)}" />`,
  `<meta name="twitter:description" content="${escape(meta.description)}" />`,
  `<meta name="twitter:image" content="${escape(meta.image)}" />`,
].join('\n    ');

const templatePath = new URL('index.html', buildDir);
let template;

try {
  template = await readFile(templatePath, 'utf8');
} catch {
  console.error('No build/index.html found - run the build before this script.');
  process.exit(1);
}

if (!template.includes('</head>')) {
  console.error('build/index.html has no </head> to inject into.');
  process.exit(1);
}

for (const route of Object.keys(PAGE_META)) {
  const meta = buildPageMeta(route);

  const html = REPLACED_TAGS
    .reduce((acc, pattern) => acc.replace(pattern, ''), template)
    .replace('</head>', `  ${renderTags(meta)}\n  </head>`);

  // '/' is the template's own slot; every other route becomes a directory.
  const target = route === '/'
    ? new URL('index.html', buildDir)
    : new URL(`${route.slice(1)}/index.html`, buildDir);

  if (route !== '/') {
    await mkdir(new URL('.', target), { recursive: true });
  }

  await writeFile(target, html, 'utf8');
  console.log(`  prerendered ${route.padEnd(16)} -> ${target.pathname.split('/build/')[1]}`);
}

console.log(`\n  ${Object.keys(PAGE_META).length} routes given static metadata.\n`);
