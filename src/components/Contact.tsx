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
  'mt-2 w-full rounded-xl border border-border-subtle bg-input-bg px-4 py-3 text-[13px] text-slate-50 outline-none transition placeholder:text-slate-500 hover:border-border-subtle focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/35 focus:ring-offset-2 focus:ring-offset-lp-bg sm:text-sm'

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
            className="card-lift flex flex-col justify-between gap-8 rounded-2xl border border-border-subtle bg-bg-surface/90 p-8 transition-colors hover:border-brand-primary/25 motion-reduce:hover:translate-y-0"
          >
            <div>
              <p className="text-[13px] font-normal leading-relaxed text-slate-400 sm:text-sm">
                Prefer email or socials? I respond best to concise context: what you&apos;re building, timelines, and how
                I can help.
              </p>
              <ul className="mt-8 space-y-4" role="list">
                {links.map((item: (typeof links)[number]) => (
                  <li key={item.label}>
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-brand-highlight/90">{item.label}</p>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="focus-ring mt-1 inline-block rounded-sm text-[13px] font-medium text-brand-primary transition hover:text-brand-highlight sm:text-sm"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-slate-500">{PERSON.location}</p>
          </motion.div>

          <motion.form
            variants={fadeUpSimple}
            onSubmit={onSubmit}
            className="card-lift rounded-2xl border border-border-subtle bg-bg-surface/90 p-8 shadow-xl shadow-black/25 transition-colors hover:border-brand-primary/20 motion-reduce:hover:translate-y-0"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-brand-highlight/90">Name</span>
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
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-brand-highlight/90">Email</span>
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
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-brand-highlight/90">Message</span>
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
              className="btn-press focus-ring mt-6 w-full rounded-full border border-brand-cta/35 bg-brand-cta py-3.5 text-[13px] text-white shadow-[0_0_36px_-10px_rgba(255,138,76,0.35)] hover:border-brand-cta-hover hover:bg-brand-cta-hover sm:w-auto sm:px-10 sm:text-sm motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
            >
              Send message
            </button>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Opens your email client with a pre-filled message—swap in Formspree or Resend when you want a true inbox
              workflow.
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
