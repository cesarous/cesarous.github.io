// Single source of truth for the C-CDA Viewer downloads.
//
// Binaries are built and published by a release workflow that lives in the
// application's own (private) repository and pushes to a public,
// downloads-only repository. The application source is not published.
//
// GitHub's /releases/latest/download/ URL keeps resolving to the newest
// release as long as every release reuses the same asset filenames, so
// shipping a new version means bumping `version` and `released` here and
// nothing else.
export const ccdaDownload = {
  version: '0.1.1',
  released: 'August 2026',

  builds: [
    {
      id: 'windows',
      label: 'Download for Windows',
      href: 'https://github.com/CCDA-Viewer/ccda-viewer-downloads/releases/latest/download/CCDA-Viewer-Setup.exe',
      fileName: 'CCDA-Viewer-Setup.exe',
      operatingSystem: 'Windows 10, Windows 11',
      meta: 'Windows 10 / 11 (64-bit)  ·  15 MB',
    },
    {
      id: 'macos',
      label: 'Download for macOS',
      href: 'https://github.com/CCDA-Viewer/ccda-viewer-downloads/releases/latest/download/CCDA-Viewer-macOS.zip',
      fileName: 'CCDA-Viewer-macOS.zip',
      operatingSystem: 'macOS',
      // Built for Intel; Apple silicon runs it through Rosetta.
      meta: 'macOS  ·  Intel, or Apple silicon via Rosetta  ·  15 MB',
    },
  ],

  supportUrl: 'https://buy.stripe.com/3cI6oGdoPasfdiR7UZ3F600',
};
