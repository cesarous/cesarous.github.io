export const paid_projects = [
  {
    id: 0,
    title: 'NextArena',
    image: 'nextarena.jpg',
    link: 'https://nextarena.gg',
    description: 'Free and paid online tournaments with real cash prizes for competitive gamers.'
  },
  {
    id: 1,
    title: 'Isreal Carpet Cleaning Co.',
    image: 'ICCS_logo.png',
    link: 'https://cesarous.github.io/ICCS/',
    description: 'Built a marketing website for a local carpet cleaning business to drive bookings.'
  },
  {
    id: 2,
    title: 'C-CDA File Viewer',
    link: '/ccda-viewer',
    linkLabel: 'View the download page',
    image: 'CCDA.png',
    description: "Reverse-engineered parser that makes CCDA medical files readable for legal staff at Burnes and Libman."
  },
  {
    id: 3,
    title: 'Illinois Deaths in Custody Project',
    link: 'https://ildeathsincustody.org/',
    image: 'IDCP.png',
    description: "Extracted and cleaned unstructured data from scanned records into a dataset usable by non-technical researchers."
  },
];

export const school_projects = [
  {
    id: 1,
    title: 'Music Visualizer',
    image: 'MusicNote.png',
    description: "Maps music to emotions, and emotions to generative shapes."
  },
  {
    id: 2,
    title: 'Cardiopulmonary Resuscitation Response Timer',
    image: 'UROP.png',
    description: "Cut data-collection burden during cardiac arrest response for U-M Medical School residents and fellows."
  },
  {
    id: 3,
    title: 'Autonomous Drone Design',
    image: 'drone.JPG',
    description: 'Designed an autonomous drone that navigates a maze using LIDAR sensors.'
  }
];

export const fun_projects = [
  {
    id: 1,
    title: 'Poetics of Decryption',
    image: 'read_image.png',
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
