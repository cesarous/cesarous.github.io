export const paid_projects = [
  {
    id: 0,
    title: 'NextArena',
    image: '/nextarena.jpg',
    width: 370,
    height: 364,
    link: 'https://nextarena.gg',
    description: 'Free and paid online tournaments with real cash prizes for competitive gamers.'
  },
  {
    id: 1,
    title: 'Israel Carpet Cleaning Co.',
    image: '/ICCS_logo.png',
    width: 311,
    height: 311,
    // The path is the repo name, so renaming the repo moves this page -
    // GitHub Pages URLs do not follow a rename the way repo URLs do.
    link: 'https://cesarous.github.io/Israel-Carpet-Cleaning-Co/',
    description: 'Built a marketing website for a local carpet cleaning business to drive bookings.'
  },
  {
    id: 2,
    title: 'C-CDA File Viewer',
    link: '/ccda-viewer',
    linkLabel: 'View the download page',
    image: '/CCDA.png',
    width: 512,
    height: 512,
    description: "Reverse-engineered parser that makes CCDA medical files readable for legal staff at Burnes and Libman."
  },
  {
    id: 3,
    title: 'Illinois Deaths in Custody Project',
    link: 'https://ildeathsincustody.org/',
    image: '/IDCP.jpg',
    width: 768,
    height: 488,
    description: "Extracted and cleaned unstructured data from scanned records into a dataset usable by non-technical researchers."
  },
];

export const school_projects = [
  {
    id: 1,
    title: 'Music Visualizer',
    image: '/MusicNote.png',
    width: 800,
    height: 800,
    description: "Maps music to emotions, and emotions to generative shapes."
  },
  {
    id: 2,
    title: 'Cardiopulmonary Resuscitation Response Timer',
    image: '/UROP.png',
    width: 1566,
    height: 851,
    description: "Cut data-collection burden during cardiac arrest response for U-M Medical School residents and fellows."
  },
  {
    id: 3,
    title: 'Autonomous Drone Design',
    image: '/drone.JPG',
    width: 1200,
    height: 1200,
    description: 'Designed an autonomous drone that navigates a maze using LIDAR sensors.'
  }
];

export const fun_projects = [
  {
    id: 1,
    title: 'Poetics of Decryption',
    image: '/read_image.jpg',
    width: 768,
    height: 1536,
    description: "Cracked the code hidden in the \"Poetics of Encryption\" exhibit — polar remapping in OpenCV plus OCR — to reveal its message."
  },
];

// A small, high-signal slice for the Home page teaser. The C-CDA Viewer is
// included while its dedicated download page is being featured.
export const featured_projects = [
  paid_projects[0], // NextArena - flagship / leadership
  paid_projects[2], // C-CDA Viewer - featured desktop tool and download page
  fun_projects[0],  // Poetics of Decryption - technical curiosity project
];
