import { motion, useReducedMotion } from 'framer-motion'
import { type FormEvent, useCallback, useMemo, useState } from 'react'
import { PERSON } from '../lib/constants'
import {
  fadeUpSimple,
  staggerCards,
  staggerContainerInstant,
  viewportReveal,
} from '../lib/motion'
import { SectionHeading } from './SectionHeading'

const inputClass =
  'mt-2 w-full rounded-xl border border-lp-orange/20 bg-lp-bg/70 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 hover:border-lp-orange/45 focus:border-lp-orange/60 focus:ring-2 focus:ring-lp-orange/35 focus:ring-offset-2 focus:ring-offset-lp-bg'

export function Contact() {
  const reducedMotion = useReducedMotion() === true
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'visitor'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}\n\n— Sent from portfolio contact form`
    )
    window.location.href = `mailto:${PERSON.email}?subject=${subject}&body=${body}`
  }, [name, email, message])

  const links = useMemo(
    () =>
      [
        { label: 'Email', value: PERSON.email, href: `mailto:${PERSON.email}` },
        { label: 'LinkedIn', value: 'Profile', href: PERSON.linkedin },
        { label: 'GitHub', value: 'Repositories', href: PERSON.github },
      ] as const,
    []
  )

  const stagger = useMemo(
    () => (reducedMotion ? staggerContainerInstant : staggerCards),
    [reducedMotion]
  )

  return (
    <section id="contact" className="relative px-6 py-24 sm:py-28" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Let’s build something solid"
          subtitle="Reach out for roles, collaborations, or a focused conversation about mobile product work."
        />

        <motion.div
          className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch"
          variants={stagger}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReveal}
        >
          <motion.div
            variants={fadeUpSimple}
            className="card-lift flex flex-col justify-between gap-8 rounded-2xl border border-white/[0.08] bg-lp-elevated/40 p-8 transition-colors hover:border-lp-orange/30 motion-reduce:hover:translate-y-0"
          >
            <div>
              <p className="text-sm leading-relaxed text-zinc-400">
                Prefer email or socials? I respond best to concise context: what you&apos;re building, timelines, and how
                I can help.
              </p>
              <ul className="mt-8 space-y-4" role="list">
                {links.map((item: (typeof links)[number]) => (
                  <li key={item.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-lp-orange/90">{item.label}</p>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="focus-ring mt-1 inline-block rounded-sm text-sm font-medium text-lp-orange transition hover:text-[#fdba74]"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-lp-orange/45">{PERSON.location}</p>
          </motion.div>

          <motion.form
            variants={fadeUpSimple}
            onSubmit={onSubmit}
            className="card-lift rounded-2xl border border-white/[0.08] bg-lp-elevated/45 p-8 shadow-xl shadow-black/25 transition-colors hover:border-lp-orange/25 motion-reduce:hover:translate-y-0"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-lp-orange/90">Name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Your name"
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-lp-orange/90">Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-lp-orange/90">Message</span>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className={inputClass}
                  placeholder="A short note about the opportunity or project…"
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn-press focus-ring mt-6 w-full rounded-full border border-lp-orange/30 bg-lp-orange py-3.5 text-sm font-semibold text-lp-bg shadow-lg shadow-lp-orange/25 hover:border-[#fdba74] hover:bg-[#fdba74] sm:w-auto sm:px-10 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
            >
              Send message
            </button>
            <p className="mt-4 text-xs leading-relaxed text-zinc-500">
              Opens your email client with a pre-filled message—swap in Formspree or Resend when you want a true inbox
              workflow.
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
