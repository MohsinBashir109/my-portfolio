export const PERSON = {
  name: 'Mohsin Bashir',
  email: 'mohsinbashirr486@gmail.com',
  phone: '+92 316 4612126',
  phoneHref: 'tel:+923164612126',
  whatsapp: 'https://wa.me/923164612126',
  linkedin: 'https://www.linkedin.com/in/mohsin-bashir-81412a30a',
  github: 'https://github.com/MohsinBashir109',
  availability: 'Available Aug 2026 — 1 slot open',
} as const

export const MAILTO = `mailto:${PERSON.email}?subject=${encodeURIComponent('Project inquiry — availability')}`

export type ScopeRow = { k: string; v: string }
export type Shot = { id: string; cap: string; tall?: boolean }

export type Project = {
  id: string
  no: string
  flagship?: boolean
  title: string
  type: 'MOBILE' | 'WEB' | 'FULL-STACK' | 'BACKEND' | 'RESEARCH'
  industry: string
  year: string
  status: string
  desc: string
  long: string
  build: string[]
  scope: ScopeRow[]
  skills: string[]
  gallery: Shot[]
  ba: { beforeTitle: string; before: string[]; afterTitle: string; after: string[] }
  github: string
}

const gh = PERSON.github

export const WORK: Project[] = [
  {
    id: 'rcm', no: '01', flagship: true,
    title: 'RCM — Revenue Cycle Management',
    type: 'WEB', industry: 'HEALTHCARE', year: '2025–26', status: 'IN PRODUCTION', github: gh,
    desc: 'Claims, denials, payment posting, and patient balances — one production work queue for US medical billing.',
    long: 'US medical billing runs on claims. Before RCM, the billing team tracked them across payer portals and spreadsheets — no single queue, no shared status, no audit trail. I built the web frontend that pulls that whole lifecycle into one place.',
    build: [
      'Typed API layer over the billing backend. Every endpoint modeled, no any.',
      'Work-queue UX: server-driven tables with filters, sort, and bulk actions that survive refresh.',
      'Role-based views — billers, managers, admins see different queues on the same data.',
      'Predictable loading / error states on every screen. Refresh never loses a biller\u2019s place.',
    ],
    scope: [
      { k: 'CLAIMS', v: 'Intake, status tracking, resubmission' },
      { k: 'DENIALS', v: 'Worklists, reason codes, appeals' },
      { k: 'PAYMENTS', v: 'Posting and reconciliation' },
      { k: 'BALANCES', v: 'Patient balance tracking, statements' },
    ],
    skills: ['REACT', 'TYPESCRIPT', 'REST'],
    gallery: [
      { id: 'rcm-queue', cap: 'FIG. 01 — WORK QUEUE' },
      { id: 'rcm-claims', cap: 'FIG. 02 — CLAIMS & STATUS' },
      { id: 'rcm-payments', cap: 'FIG. 03 — PAYMENT POSTING' },
    ],
    ba: {
      beforeTitle: 'Five portals & spreadsheets', before: ['PORTAL TABS \u00d75', 'EXCEL TRACKERS', 'STATUS BY MEMORY'],
      afterTitle: 'One queue, shared status', after: ['SINGLE WORK QUEUE', 'ROLE-BASED VIEWS', 'FULL AUDIT TRAIL'],
    },
  },
  {
    id: 'retailerz', no: '02',
    title: 'Retailerz',
    type: 'FULL-STACK', industry: 'COMMERCE', year: '2025–26', status: 'SHIPPED END-TO-END', github: gh,
    desc: 'Marketplace platform shipped end-to-end — auth to admin tools, frontend + backend, one pair of hands.',
    long: 'A marketplace has two customers — buyers and sellers — and both got a full product: auth, seller onboarding, catalog, orders and payments, notifications, chat, and the admin tools to run it all. I delivered the stack end-to-end.',
    build: [
      'Auth and seller onboarding flows with file uploads and verification states.',
      'Orders + payments pipeline with notifications at every state change.',
      'In-app chat between buyers and sellers.',
      'Admin dashboard: catalog, orders, reports.',
    ],
    scope: [
      { k: 'AUTH', v: 'Accounts, sessions, seller verification' },
      { k: 'CATALOG', v: 'Listings, search, product details' },
      { k: 'ORDERS', v: 'Cart, payments, status tracking' },
      { k: 'ADMIN', v: 'Moderation, reports, operations' },
    ],
    skills: ['REACT', 'TYPESCRIPT', 'NODE.JS', 'EXPRESS', 'REST'],
    gallery: [
      { id: 'retailerz-1', cap: 'FIG. 01 — HOME & DISCOVERY' },
      { id: 'retailerz-2', cap: 'FIG. 02 — PRODUCT DETAILS' },
      { id: 'retailerz-3', cap: 'FIG. 03 — ADMIN & REPORTS' },
    ],
    ba: {
      beforeTitle: 'Selling over DMs', before: ['ORDERS IN CHAT THREADS', 'MANUAL LEDGERS', 'NO CATALOG'],
      afterTitle: 'Storefront + admin in one', after: ['SELF-SERVE ONBOARDING', 'TRACKED ORDERS & PAYMENTS', 'LIVE CATALOG'],
    },
  },
  {
    id: 'mylera', no: '03',
    title: 'MyLera',
    type: 'MOBILE', industry: 'HEALTHCARE', year: '2025–26', status: 'IN PRODUCTION', github: gh,
    desc: 'Health & wellness app — polished React Native UI, Redux-driven flows, API integration throughout.',
    long: 'A health and wellness product where the UI is the product — onboarding, daily-use screens, and profile management built in React Native with Redux-driven user flows and full API integration.',
    build: [
      'Onboarding flow with state persisted across sessions.',
      'Redux Toolkit slices per domain — predictable, debuggable state.',
      'API-connected screens with graceful loading and offline-tolerant errors.',
    ],
    scope: [
      { k: 'ONBOARDING', v: 'Guided setup, account creation' },
      { k: 'CORE', v: 'Daily-use wellness screens' },
      { k: 'PROFILE', v: 'Settings, preferences, account' },
    ],
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'REDUX TOOLKIT', 'REST'],
    gallery: [
      { id: 'mylera-1', cap: 'FIG. 01 — ONBOARDING', tall: true },
      { id: 'mylera-2', cap: 'FIG. 02 — KEY SCREENS', tall: true },
      { id: 'mylera-3', cap: 'FIG. 03 — PROFILE & SETTINGS', tall: true },
    ],
    ba: {
      beforeTitle: 'Wellness tracking, scattered', before: ['NOTES APP + MEMORY', 'NO GUIDED FLOW', 'NOTHING SYNCED'],
      afterTitle: 'One guided daily flow', after: ['ONBOARDED IN MINUTES', 'STATE-DRIVEN SCREENS', 'API-SYNCED PROFILE'],
    },
  },
  {
    id: 'crickwick', no: '04',
    title: 'CrickWick',
    type: 'MOBILE', industry: 'SPORTS', year: '2025', status: 'SHIPPED END-TO-END', github: gh,
    desc: 'Cricket scoring app — real match logic, live scoring workflows, cross-platform screens.',
    long: 'Cricket scoring is unforgiving — overs, extras, wickets, strike rotation. CrickWick encodes the real match logic behind a fast live-scoring workflow, delivered end-to-end from screen architecture to production build.',
    build: [
      'Match engine: overs, extras, wickets, strike rotation modeled as pure state transitions.',
      'Live scoring UI tuned for one-thumb use at the boundary line.',
      'Summary and stats views generated from the ball-by-ball record.',
    ],
    scope: [
      { k: 'SETUP', v: 'Teams, players, match format' },
      { k: 'SCORING', v: 'Ball-by-ball live input' },
      { k: 'STATS', v: 'Summaries, run rates, history' },
    ],
    skills: ['REACT NATIVE', 'JAVASCRIPT'],
    gallery: [
      { id: 'crickwick-1', cap: 'FIG. 01 — MATCH SETUP', tall: true },
      { id: 'crickwick-2', cap: 'FIG. 02 — LIVE SCORING', tall: true },
      { id: 'crickwick-3', cap: 'FIG. 03 — SUMMARY & STATS', tall: true },
    ],
    ba: {
      beforeTitle: 'Paper scorebook', before: ['PEN + PAPER GRID', 'MENTAL MATH', 'LOST HISTORY'],
      afterTitle: 'Live digital scoring', after: ['BALL-BY-BALL INPUT', 'AUTO MATCH LOGIC', 'SHAREABLE SUMMARY'],
    },
  },
  {
    id: 'pharmapulse', no: '05',
    title: 'PharmaPulse',
    type: 'MOBILE', industry: 'HEALTHCARE', year: '2025–26', status: 'IN PRODUCTION', github: gh,
    desc: 'Pharma-focused mobile experience — production UI integration and API-connected screens.',
    long: 'A pharma-focused mobile product where I own UI integration in production: dashboard, product flows, and detail views, all wired to live APIs with strict loading and error behavior.',
    build: [
      'Dashboard with API-fed cards and pull-to-refresh.',
      'Product flows with deep detail views and stateful navigation.',
      'Shared component layer keeping screens consistent as the product grows.',
    ],
    scope: [
      { k: 'DASHBOARD', v: 'Overview, live product data' },
      { k: 'FLOWS', v: 'Product browsing and actions' },
      { k: 'DETAIL', v: 'Per-product deep views' },
    ],
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'REST'],
    gallery: [
      { id: 'pharmapulse-1', cap: 'FIG. 01 — DASHBOARD', tall: true },
      { id: 'pharmapulse-2', cap: 'FIG. 02 — PRODUCT FLOWS', tall: true },
      { id: 'pharmapulse-3', cap: 'FIG. 03 — DETAIL VIEWS', tall: true },
    ],
    ba: {
      beforeTitle: 'Field data in binders', before: ['PRINTED SHEETS', 'DELAYED SYNC', 'NO DASHBOARD'],
      afterTitle: 'API-connected mobile', after: ['LIVE DASHBOARD', 'CONNECTED FLOWS', 'DETAIL ON TAP'],
    },
  },
  {
    id: 'startsmart', no: '06',
    title: 'StartSmartPlus',
    type: 'BACKEND', industry: 'SAAS', year: '2025–26', status: 'SHIPPED', github: gh,
    desc: 'Backend services — Node.js / Express with MongoDB and PostgreSQL behind product features.',
    long: 'The invisible half of a product: Node.js / Express services with MongoDB and PostgreSQL integrations, built so frontend features stop being blocked on backend work.',
    build: [
      'REST modules per domain with consistent error contracts.',
      'Dual-database integration — document store where it fits, relational where it matters.',
      'Admin workflow endpoints powering internal operations.',
    ],
    scope: [
      { k: 'API', v: 'REST modules, error contracts' },
      { k: 'DATA', v: 'MongoDB + PostgreSQL integration' },
      { k: 'ADMIN', v: 'Internal workflow endpoints' },
    ],
    skills: ['NODE.JS', 'EXPRESS', 'MONGODB', 'POSTGRESQL'],
    gallery: [
      { id: 'startsmart-1', cap: 'FIG. 01 — API MODULES' },
      { id: 'startsmart-2', cap: 'FIG. 02 — INTEGRATIONS' },
      { id: 'startsmart-3', cap: 'FIG. 03 — ADMIN WORKFLOW' },
    ],
    ba: {
      beforeTitle: 'Features blocked on backend', before: ['NO SERVICES', 'AD-HOC DATA ACCESS', 'MANUAL OPERATIONS'],
      afterTitle: 'Services behind every feature', after: ['REST MODULES', 'DUAL-DB INTEGRATION', 'ADMIN WORKFLOWS'],
    },
  },
  {
    id: 'aquabot', no: '07',
    title: 'Aquabot',
    type: 'RESEARCH', industry: 'AGRITECH', year: '2025', status: 'UNIVERSITY PROJECT', github: gh,
    desc: 'AI-powered irrigation advisory — practical, data-driven recommendations for growers.',
    long: 'University research project: an AI-powered irrigation advisory system focused on practical output — when to water, how much, and why — rather than model novelty.',
    build: [
      'Data pipeline from weather and crop inputs to advisory output.',
      'Recommendation views that explain the why, not just the what.',
    ],
    scope: [
      { k: 'DATA', v: 'Weather + crop inputs' },
      { k: 'MODEL', v: 'Advisory logic' },
      { k: 'OUTPUT', v: 'Recommendations, insights' },
    ],
    skills: ['JAVASCRIPT', 'APIS'],
    gallery: [
      { id: 'aquabot-1', cap: 'FIG. 01 — OVERVIEW' },
      { id: 'aquabot-2', cap: 'FIG. 02 — RECOMMENDATIONS' },
      { id: 'aquabot-3', cap: 'FIG. 03 — INSIGHTS' },
    ],
    ba: {
      beforeTitle: 'Irrigation by instinct', before: ['FIXED SCHEDULES', 'GUESSWORK', 'WASTED WATER'],
      afterTitle: 'Data-driven advisory', after: ['SENSOR-FED INPUTS', 'AI RECOMMENDATIONS', 'ACTIONABLE INSIGHTS'],
    },
  },
]

export function relatedTo(current: Project, viewed: string[]): { p: Project; reason: string }[] {
  const shared = (a: Project, b: Project) => a.skills.filter((s) => b.skills.includes(s))
  return WORK.filter((p) => p.id !== current.id)
    .map((p) => {
      const sk = shared(current, p)
      const score =
        (p.industry === current.industry ? 3 : 0) +
        (p.type === current.type ? 2 : 0) +
        sk.length +
        (viewed.includes(p.id) ? 0.5 : 0)
      let reason = 'ADJACENT WORK'
      if (p.industry === current.industry) reason = `SAME INDUSTRY — ${p.industry}`
      else if (p.type === current.type) reason = `SAME TYPE — ${p.type}`
      else if (sk.length) reason = `SHARED — ${sk[0]}`
      return { p, score, reason }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ p, reason }) => ({ p, reason }))
}
