import { motion, useReducedMotion } from 'framer-motion'
import { PERSON } from '../lib/constants'
import { fadeUpSimple, staggerCards, staggerContainerInstant, viewportRevealTight } from '../lib/motion'

const links = [
  { label: 'GitHub', href: PERSON.github },
  { label: 'LinkedIn', href: PERSON.linkedin },
  { label: 'Email', href: `mailto:${PERSON.email}` },
] as const

export function Footer() {
  const reduce = useReducedMotion()
  const stagger = reduce ? staggerContainerInstant : staggerCards

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-lp-bg/80 px-6 py-10 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
        <motion.p
          className="text-sm text-zinc-500"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportRevealTight}
          transition={{ duration: reduce ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          © {new Date().getFullYear()} {PERSON.name}. Crafted with React &amp; attention to detail.
        </motion.p>
        <nav aria-label="Footer social">
          <motion.ul
            className="flex flex-wrap items-center justify-center gap-6"
            variants={stagger}
            initial={reduce ? false : 'hidden'}
            whileInView="visible"
            viewport={viewportRevealTight}
          >
            {links.map((link) => (
              <motion.li key={link.label} variants={fadeUpSimple}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="focus-ring rounded-sm text-sm font-medium text-zinc-400 transition hover:text-lp-orange"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </footer>
  )
}
