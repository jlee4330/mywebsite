// Frequently edited site-wide settings live here.
// Files inside /public are referenced from the site root, e.g. /website.png.
export const SITE_CONFIG = {
  owner: 'Donggun Lee',
  brand: {
    firstName: 'Donggun',
    lastName: 'Lee',
    leftField: 'Design (+HCI)',
    rightField: 'AI',
  },
  hero: {
    image: '/website.png',
    imageAlt: 'A hand-drawn figure building a house from connected data blocks',
    caption: 'I view AI not simply as a tool, but as a design material to be examined, shaped, and negotiated through practice.',
  },
  profile: {
    image: '/donggunlee.png',
    imageAlt: 'Donggun Lee',
  },
  contact: {
    localPart: 'jlee4330',
    domainParts: ['kaist', 'ac', 'kr'],
  },
  cv: {
    url: '/Donggun Lee_CV.pdf',
    dateLabel: 'March, 2026',
  },
};

export const NAV_ITEMS = [
  { id: 'about', label: 'ABOUT ME' },
  { id: 'publications', label: 'PUBLICATIONS' },
  // Keep the page implemented while temporarily hiding its navigation tab.
  { id: 'projects', label: 'PAST PROJECTS', visible: false },
  { id: 'blog', label: 'BLOG' },
];

export const SOCIAL_LINKS = [
  {
    id: 'scholar',
    label: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=JoR4t6YAAAAJ&hl=ko',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/donggunlee0/',
  },
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/jlee4330',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@donggunlee0',
  },
];
