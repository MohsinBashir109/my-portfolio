import { motion } from 'framer-motion'
import { PERSON } from '../lib/constants'

const links = [
  { label: 'GitHub', href: PERSON.github },
  { label: 'LinkedIn', href: PERSON.linkedin },
  { label: 'Email', href: `mailto:${PERSON.email}` },
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-lp-bg/95 px-6 py-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
        <motion.p
          className="text-sm text-zinc-500"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          © {new Date().getFullYear()} {PERSON.name}. Crafted with React &amp; attention to detail.
        </motion.p>
        <nav aria-label="Footer social">
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="focus-ring rounded-sm text-sm font-medium text-zinc-400 transition hover:text-lp-orange"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
