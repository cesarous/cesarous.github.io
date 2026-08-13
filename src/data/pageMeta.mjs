// Per-page metadata, shared by the running app and the build-time prerender.
//
// Two consumers read this: App.jsx updates the live <head> on every client
// route change, and scripts/prerender-meta.mjs stamps the same values into
// static HTML at build time. They have to agree - if they drift, a crawler
// and a visitor see different titles for the same URL.
//
// This is a .mjs file so the build script can import it directly under Node.
// The package has no "type": "module", so a plain .js file here would be read
// as CommonJS and the import would fail. Vite resolves either extension.
export const SITE_URL = 'https://cesarous.github.io';

const CCDA_IMAGE = `${SITE_URL}/CCDA.png`;
const FALLBACK_IMAGE = `${SITE_URL}/favicon.ico`;

export const PAGE_META = {
  '/': {
    title: 'Cesar Rodriguez | Software Engineer',
    description: 'Portfolio of Cesar Rodriguez, a software engineer building reliable systems, web applications, and research-driven tools.',
  },
  '/about': {
    title: 'About | Cesar Rodriguez',
    description: 'Learn about Cesar Rodriguez, a software engineer and University of Michigan Computer Science Engineering graduate.',
  },
  '/experience': {
    title: 'Experience | Cesar Rodriguez',
    description: 'Professional experience, engineering work, and technical background from Cesar Rodriguez.',
  },
  '/projects': {
    title: 'Projects | Cesar Rodriguez',
    description: 'Selected software, data, research, and creative coding projects by Cesar Rodriguez.',
  },
  '/connect': {
    title: 'Connect | Cesar Rodriguez',
    description: 'Contact Cesar Rodriguez about software engineering roles, freelance work, and interesting technical problems.',
  },
  '/ccda-viewer': {
    title: 'C-CDA File Viewer for Windows and macOS | Cesar Rodriguez',
    description: 'A free C-CDA file viewer for Windows and macOS. Opens CCDA XML medical records as a readable document - unlimited files, no ads, nothing leaves your computer.',
    image: CCDA_IMAGE,
  },
};

// Resolves a pathname to the full set of tags a page needs.
//
// The trailing slash is stripped first: prerendering writes each route as a
// directory index, so the served URL can arrive as /ccda-viewer/ and would
// otherwise miss the lookup and fall back to the home page's metadata.
export function buildPageMeta(pathname) {
  const path = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;
  const page = PAGE_META[path] || PAGE_META['/'];

  // The canonical URL carries a trailing slash because that is the URL that
  // actually returns 200: each route ships as a directory index, and GitHub
  // Pages 301s /ccda-viewer to /ccda-viewer/. Pointing the canonical at the
  // redirecting form would name a URL that no longer serves the page.
  return {
    title: page.title,
    description: page.description,
    canonical: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`,
    image: page.image || FALLBACK_IMAGE,
  };
}
