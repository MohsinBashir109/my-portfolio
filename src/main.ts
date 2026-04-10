import './style.css'

const LINKEDIN = 'https://www.linkedin.com/in/mohsin-bashir-81412a30a'
const GITHUB = 'https://github.com/MohsinBashir109'
const EMAIL = 'mailto:mohsinbashirr486@gmail.com'
const PHONE = 'tel:+923164612126'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <span class="logo">MB</span>
    <nav class="nav" aria-label="Primary">
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="#education">Education</a>
    </nav>
  </header>

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <p class="eyebrow">Lahore, Pakistan</p>
      <h1 id="hero-title">Mohsin Bashir</h1>
      <p class="tagline">React Native Developer · Software Engineer</p>
      <ul class="contact-chips" role="list">
        <li><a href="${EMAIL}">mohsinbashirr486@gmail.com</a></li>
        <li><a href="${PHONE}">+92 316 4612126</a></li>
        <li><a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="${GITHUB}" target="_blank" rel="noopener noreferrer">GitHub</a></li>
      </ul>
    </section>

    <section id="about" class="section" aria-labelledby="about-heading">
      <h2 id="about-heading">Professional summary</h2>
      <p class="prose">
        React Native developer with professional experience building and shipping cross-platform mobile applications
        and supporting backend services. Strong in React Native, JavaScript, TypeScript, Redux Toolkit, REST API
        integration, reusable component architecture, and Node.js/Express. Focused on clean UI, maintainable code,
        and reliable delivery across healthcare, pharma, and sports products.
      </p>
    </section>

    <section id="skills" class="section" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Technical skills</h2>
      <div class="skill-grid">
        <article class="skill-card">
          <h3>Mobile</h3>
          <p>React Native, JavaScript, TypeScript, Redux Toolkit, React Navigation, cross-platform development, REST APIs, UI implementation, state management</p>
        </article>
        <article class="skill-card">
          <h3>Backend &amp; data</h3>
          <p>Node.js, Express.js, MongoDB, PostgreSQL, Firebase</p>
        </article>
        <article class="skill-card">
          <h3>Tools</h3>
          <p>Git, GitHub, Android Studio, VS Code</p>
        </article>
      </div>
    </section>

    <section id="experience" class="section" aria-labelledby="exp-heading">
      <h2 id="exp-heading">Experience</h2>
      <ol class="timeline">
        <li>
          <div class="timeline-meta">
            <h3>Software Engineer (React Native)</h3>
            <p class="place">Transcure · Lahore</p>
            <p class="dates">Oct 2025 – Present</p>
          </div>
          <ul class="bullets">
            <li>Build and ship production React Native features for MyLera and PharmaPulse: UI, API integration, reusable components, and state-driven flows.</li>
            <li>Delivered CrickWick end-to-end: screen architecture, core workflows, and maintainable components for production.</li>
            <li>Backend services for StartSmartPlus using Node.js, Express.js, and database integrations.</li>
            <li>Collaborate on debugging, refactoring, and performance work to improve quality and stability.</li>
          </ul>
        </li>
        <li>
          <div class="timeline-meta">
            <h3>React Native Developer Intern</h3>
            <p class="place">Transcure · Lahore</p>
            <p class="dates">Jul 2025 – Sep 2025</p>
          </div>
          <ul class="bullets">
            <li>Built cross-platform screens and reusable components alongside senior engineers on production modules.</li>
            <li>Supported debugging, refactoring, and performance improvements in API-connected, maintainable architectures.</li>
          </ul>
        </li>
      </ol>
    </section>

    <section id="projects" class="section" aria-labelledby="proj-heading">
      <h2 id="proj-heading">Selected projects</h2>
      <ul class="project-list">
        <li><strong>MyLera</strong> — Health and wellness: React Native UI, API integration, Redux-based user flows.</li>
        <li><strong>CrickWick</strong> — Cricket scoring: workflows, match logic, responsive screens.</li>
        <li><strong>PharmaPulse</strong> — Pharma product: production UI and API-connected screens.</li>
        <li><strong>StartSmartPlus</strong> — Backend workflows with Node.js, Express.js, and database integration.</li>
        <li><strong>Aquabot</strong> — AI irrigation advisory (university project).</li>
      </ul>
    </section>

    <section id="education" class="section section--last" aria-labelledby="edu-heading">
      <h2 id="edu-heading">Education</h2>
      <article class="edu-card">
        <h3>BSCS — Lahore Garrison University</h3>
        <p>Bachelor of Science in Computer Science · 2022 – 2026</p>
        <p class="muted">Languages: English, Urdu</p>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <p>© ${new Date().getFullYear()} Mohsin Bashir</p>
    <p class="footer-links">
      <a href="${GITHUB}" target="_blank" rel="noopener noreferrer">GitHub</a>
      <span aria-hidden="true">·</span>
      <a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <span aria-hidden="true">·</span>
      <a href="${EMAIL}">Email</a>
    </p>
  </footer>
`
