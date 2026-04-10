export const PERSON = {
  name: 'Mohsin Bashir',
  title: 'React Native Developer | Software Engineer',
  location: 'Lahore, Pakistan',
  email: 'mohsinbashirr486@gmail.com',
  phone: '+92 316 4612126',
  linkedin: 'https://www.linkedin.com/in/mohsin-bashir-81412a30a',
  github: 'https://github.com/MohsinBashir109',
  /** Add a file under `public/` (e.g. `/portrait.jpg`) or set to `null` for the text placeholder. */
  heroPortraitSrc: null as string | null,
  heroPortraitAlt: 'Mohsin Bashir — portrait',
} as const

export const NAV_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export const SKILLS = {
  frontend: ['React', 'JavaScript', 'TypeScript', 'Redux Toolkit', 'REST APIs', 'Component architecture'],
  mobile: [
    'React Native',
    'Cross-platform apps',
    'React Navigation',
    'State management',
    'UI implementation',
    'API integration',
  ],
  backend: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Firebase'],
  tools: ['Git', 'GitHub', 'Android Studio', 'VS Code'],
} as const

/** Same order as `SkillsMarquee` rows (frontend+mobile, then backend+tools) */
export function skillsMarqueeLabelsFlat(): string[] {
  return [...SKILLS.frontend, ...SKILLS.mobile, ...SKILLS.backend, ...SKILLS.tools]
}

export type ExperienceUiShot = {
  /** Short label shown on the placeholder card */
  caption: string
  /** e.g. `/screens/mylera-1.png` in `public/` — `null` until you add assets */
  imageSrc: string | null
}

export type ExperienceEntry = {
  role: string
  company: string
  location: string
  period: string
  highlights: readonly string[]
  /** Product / UI screenshots for this role — replace `imageSrc: null` when ready */
  uiGallery: readonly ExperienceUiShot[]
  /** Shown next to location when set (e.g. company site) */
  websiteUrl?: string | null
  /** Skill pills in the expanded accordion panel */
  skillTags?: readonly string[]
}

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    role: 'Software Engineer (React Native)',
    company: 'Transcure',
    location: 'Lahore',
    period: 'Oct 2025 – Present',
    highlights: [
      'Ship production features for MyLera and PharmaPulse: UI, API integration, reusable components, and state-driven flows.',
      'Delivered CrickWick end-to-end with screen architecture and maintainable components for production.',
      'Built backend services for StartSmartPlus using Node.js, Express.js, and database integrations.',
      'Collaborate on debugging, refactoring, and performance work to improve stability and maintainability.',
    ],
    uiGallery: [
      { caption: 'MyLera — app UI', imageSrc: null },
      { caption: 'PharmaPulse — screens', imageSrc: null },
      { caption: 'CrickWick — product shots', imageSrc: null },
    ],
    skillTags: ['React Native', 'TypeScript', 'Redux Toolkit', 'REST APIs', 'Node.js'],
  },
  {
    role: 'React Native Developer Intern',
    company: 'Transcure',
    location: 'Lahore',
    period: 'Jul 2025 – Sep 2025',
    highlights: [
      'Built cross-platform screens and reusable components with senior engineers on production modules.',
      'Supported debugging, refactoring, and performance improvements across API-connected architectures.',
    ],
    uiGallery: [{ caption: 'Production modules & UI work', imageSrc: null }],
    skillTags: ['React Native', 'JavaScript', 'REST APIs'],
  },
]

export const PROJECTS = [
  {
    title: 'MyLera',
    description: 'Health and wellness product focused on polished React Native UI, API integration, and Redux-based user flows.',
    stack: ['React Native', 'TypeScript', 'Redux Toolkit', 'REST'],
    github: PERSON.github,
    live: null as string | null,
  },
  {
    title: 'CrickWick',
    description: 'Cricket scoring app with match logic, scoring workflows, and responsive cross-platform screens.',
    stack: ['React Native', 'JavaScript', 'State management'],
    github: PERSON.github,
    live: null,
  },
  {
    title: 'PharmaPulse',
    description: 'Pharma-focused mobile experience with production-ready UI integration and API-connected screens.',
    stack: ['React Native', 'TypeScript', 'REST'],
    github: PERSON.github,
    live: null,
  },
  {
    title: 'StartSmartPlus',
    description: 'Backend workflow support with scalable services and database integrations for product features.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
    github: PERSON.github,
    live: null,
  },
  {
    title: 'Aquabot',
    description: 'University project: AI-powered irrigation advisory system with a focus on practical data-driven insights.',
    stack: ['JavaScript', 'APIs', 'Research'],
    github: PERSON.github,
    live: null,
  },
] as const
