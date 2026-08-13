#!/usr/bin/env node
//
// Ground-truth download counts for the C-CDA Viewer, read straight from the
// GitHub Releases API. This counts every download of a release asset - direct
// links, other referrers, people who never saw the site - which is exactly
// what client-side analytics cannot see. The analytics side answers a
// different question: which page or referrer produced the click.
//
// Usage:  npm run downloads
//
// Unauthenticated requests are limited to 60/hour per IP, which is plenty for
// a manual check. Set GITHUB_TOKEN to raise that if you ever poll it.
import { readFile } from 'node:fs/promises';

// The repository is derived from the download URLs rather than duplicated, so
// this keeps working if the downloads repo is ever renamed or moved.
const downloadSource = await readFile(
  new URL('../src/data/ccdaDownload.js', import.meta.url),
  'utf8',
);
const repoMatch = downloadSource.match(/github\.com\/([\w.-]+)\/([\w.-]+)\/releases\//);

if (!repoMatch) {
  console.error('Could not find a GitHub releases URL in src/data/ccdaDownload.js.');
  process.exit(1);
}

const [, owner, repo] = repoMatch;

const headers = { Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const response = await fetch(
  `https://api.github.com/repos/${owner}/${repo}/releases?per_page=100`,
  { headers },
);

if (!response.ok) {
  console.error(`GitHub API returned ${response.status} ${response.statusText}.`);
  if (response.status === 403) {
    console.error('Rate limited - wait, or set GITHUB_TOKEN to a personal access token.');
  }
  process.exit(1);
}

const releases = await response.json();

if (releases.length === 0) {
  console.log(`No releases published in ${owner}/${repo} yet.`);
  process.exit(0);
}

const pad = (name) => name.padEnd(28);
const totalsByAsset = new Map();
let grandTotal = 0;

console.log(`\nC-CDA Viewer downloads  ·  ${owner}/${repo}\n`);

for (const release of releases) {
  const date = release.published_at ? release.published_at.slice(0, 10) : 'unpublished';
  console.log(`  ${release.tag_name}  (${date})`);

  if (release.assets.length === 0) {
    console.log('    no assets');
  }

  for (const asset of release.assets) {
    console.log(`    ${pad(asset.name)}${asset.download_count}`);
    totalsByAsset.set(asset.name, (totalsByAsset.get(asset.name) ?? 0) + asset.download_count);
    grandTotal += asset.download_count;
  }

  console.log('');
}

if (releases.length > 1) {
  console.log('  All releases');
  for (const [name, count] of totalsByAsset) {
    console.log(`    ${pad(name)}${count}`);
  }
  console.log('');
}

console.log(`  ${pad('Total downloads')}${grandTotal}\n`);
