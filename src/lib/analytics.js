// Site analytics and download-click tracking (Umami Cloud).
//
// The tracker is injected at runtime here rather than hardcoded as a <script>
// tag in index.html, so an unconfigured checkout still builds and runs: with
// UMAMI_WEBSITE_ID empty, everything in this module is a no-op.
//
// The website ID is not a secret - Umami puts it in the page source of every
// site that uses it - so it lives in the repo rather than in an env var that
// could silently go missing at deploy time and leave the site untracked.
//
// Umami counts pageviews on its own, SPA route changes included (its tracker
// wraps history.pushState), so nothing here has to hook into React Router.
export const UMAMI_WEBSITE_ID = '2b4f9d6d-aee9-4fbe-a09f-bbf9f81941e7';

const UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js';

// Restricts tracking to the live site. The tracker loads everywhere but
// discards anything sent from another hostname, which keeps localhost
// development out of the numbers - on a site this size, a few dozen of your
// own pageviews and test clicks would badly distort the picture. To verify
// the wiring locally, add 'localhost' to this list for the session.
const UMAMI_DOMAINS = 'cesarous.github.io';

export function initAnalytics() {
  if (!UMAMI_WEBSITE_ID) return;
  if (document.querySelector(`script[data-website-id="${UMAMI_WEBSITE_ID}"]`)) return;

  const script = document.createElement('script');
  script.src = UMAMI_SCRIPT_URL;
  script.defer = true;
  script.dataset.websiteId = UMAMI_WEBSITE_ID;
  script.dataset.domains = UMAMI_DOMAINS;
  document.head.appendChild(script);
}

// Records a named event; `data` becomes event properties in the dashboard.
//
// Safe to call unconditionally - if analytics is unconfigured, still loading,
// or blocked by an ad blocker, the event is simply dropped. Download links do
// not unload the page (GitHub serves release assets as attachments, and the
// support link opens in a new tab), so the request has time to leave.
export function trackEvent(name, data) {
  window.umami?.track(name, data);
}
