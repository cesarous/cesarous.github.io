// Single source of truth for the Python Concurrency Course promo page.
//
// Unlike the C-CDA Viewer, there's no compiled per-OS binary here - it's a
// static site plus plain Python problem files, so one source archive works
// identically on Windows, macOS, and Linux. zipUrl points at GitHub's own
// automatic branch-archive endpoint rather than a hand-built release asset,
// since there's nothing to compile.
export const courseInfo = {
  liveUrl: 'https://cesarous.github.io/python-concurrency-course/',
  repoUrl: 'https://github.com/cesarous/python-concurrency-course',
  zipUrl: 'https://github.com/cesarous/python-concurrency-course/archive/refs/heads/main.zip',
  supportUrl: 'https://buy.stripe.com/00weVc1G7eIv0w5ejn3F601',
  lessonCount: 31,
  problemCount: 30,
};
