export const PERSON = {
  name: 'Mohsin Bashir',
  title: 'React Native Developer • Software Engineer',
  location: 'Lahore, Pakistan',
  email: 'mohsinbashirr486@gmail.com',
  phone: '+92 316 4612126',
  linkedin: 'https://www.linkedin.com/in/mohsin-bashir-81412a30a',
  github: 'https://github.com/MohsinBashir109',
} as const

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

export type ProjectEntry = {
  title: string
  description: string
  stack: readonly string[]
  github: string
  live: string | null
  /** Product / UI screenshots — replace `imageSrc: null` when ready */
  uiGallery: readonly ExperienceUiShot[]
}

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    role: 'Software Engineer (React Native/React/Nodejs)',
    company: 'Transcure',
    location: 'Lahore',
    period: 'Oct 2025 – Present',
    highlights: [
      'Ship production features for MyLera and PharmaPulse: UI, API integration, reusable components, and state-driven flows.',
      'Delivered CrickWick end-to-end with screen architecture and maintainable components for production.',
      'Built backend services for StartSmartPlus using Node.js, Express.js, and database integrations.',
      'Built the RCM (Revenue Cycle Management) web frontend and handled API integration for claims, denials, payment posting, and patient balance tracking.',
      'Shipped Retailerz (marketplace) end-to-end: full-stack delivery across auth, seller onboarding, catalog, orders/payments, notifications, chat, and admin tools.',
      'Collaborate on debugging, refactoring, and performance work to improve stability and maintainability.',
    ],
    uiGallery: [
      { caption: 'MyLera — app UI', imageSrc: null },
      { caption: 'PharmaPulse — screens', imageSrc: null },
      { caption: 'CrickWick — product shots', imageSrc: null },
      { caption: 'RCM — web UI', imageSrc: null },
      { caption: 'Retailerz — marketplace UI', imageSrc: null },
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
    title: 'Retailerz',
    description:
      'Full‑stack marketplace platform: auth, seller onboarding, catalog, orders/payments, notifications, chat, and admin tools — shipped end-to-end (frontend + backend).',
    stack: ['React', 'TypeScript', 'Node.js', 'Express.js', 'REST', 'Auth', 'Caching', 'File uploads'],
    github: PERSON.github,
    live: null as string | null,
    uiGallery: [
      { caption: 'Retailerz — home & discovery', imageSrc: null },
      { caption: 'Retailerz — product details', imageSrc: null },
      { caption: 'Retailerz — admin & reports', imageSrc: null },
    ],
  },
  {
    title: 'RCM (Revenue Cycle Management)',
    description:
      'Web frontend for a healthcare RCM workflow with API integration for claims, denials, payment posting, and patient balance tracking.',
    stack: ['React', 'TypeScript', 'REST', 'API integration'],
    github: PERSON.github,
    live: null,
    uiGallery: [
      { caption: 'RCM — work queue', imageSrc: null },
      { caption: 'RCM — claims & status', imageSrc: null },
      { caption: 'RCM — payments & balances', imageSrc: null },
    ],
  },
  {
    title: 'MyLera',
    description: 'Health and wellness product focused on polished React Native UI, API integration, and Redux-based user flows.',
    stack: ['React Native', 'TypeScript', 'Redux Toolkit', 'REST'],
    github: PERSON.github,
    live: null as string | null,
    uiGallery: [
      { caption: 'MyLera — onboarding flow', imageSrc: null },
      { caption: 'MyLera — key screens', imageSrc: null },
      { caption: 'MyLera — profile & settings', imageSrc: null },
    ],
  },
  {
    title: 'CrickWick',
    description: 'Cricket scoring app with match logic, scoring workflows, and responsive cross-platform screens.',
    stack: ['React Native', 'JavaScript', 'State management'],
    github: PERSON.github,
    live: null,
    uiGallery: [
      { caption: 'CrickWick — match setup', imageSrc: null },
      { caption: 'CrickWick — live scoring', imageSrc: null },
      { caption: 'CrickWick — summary & stats', imageSrc: null },
    ],
  },
  {
    title: 'PharmaPulse',
    description: 'Pharma-focused mobile experience with production-ready UI integration and API-connected screens.',
    stack: ['React Native', 'TypeScript', 'REST'],
    github: PERSON.github,
    live: null,
    uiGallery: [
      { caption: 'PharmaPulse — dashboard', imageSrc: null },
      { caption: 'PharmaPulse — product flows', imageSrc: null },
      { caption: 'PharmaPulse — detail views', imageSrc: null },
    ],
  },
  {
    title: 'StartSmartPlus',
    description: 'Backend workflow support with scalable services and database integrations for product features.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
    github: PERSON.github,
    live: null,
    uiGallery: [
      { caption: 'StartSmartPlus — API modules', imageSrc: null },
      { caption: 'StartSmartPlus — integrations', imageSrc: null },
      { caption: 'StartSmartPlus — admin workflow', imageSrc: null },
    ],
  },
  {
    title: 'Aquabot',
    description: 'University project: AI-powered irrigation advisory system with a focus on practical data-driven insights.',
    stack: ['JavaScript', 'APIs', 'Research'],
    github: PERSON.github,
    live: null,
    uiGallery: [
      { caption: 'Aquabot — overview', imageSrc: null },
      { caption: 'Aquabot — recommendations', imageSrc: null },
      { caption: 'Aquabot — insights', imageSrc: null },
    ],
  },
] as const
