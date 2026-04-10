import { motion } from 'framer-motion'
import { type FormEvent, useState } from 'react'
import { PERSON } from '../lib/constants'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import { SectionHeading } from './SectionHeading'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'visitor'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}\n\n— Sent from portfolio contact form`
    )
    window.location.href = `mailto:${PERSON.email}?subject=${subject}&body=${body}`
  }

  const links = [
    { label: 'Email', value: PERSON.email, href: `mailto:${PERSON.email}` },
    { label: 'LinkedIn', value: 'Profile', href: PERSON.linkedin },
    { label: 'GitHub', value: 'Repositories', href: PERSON.github },
  ] as const

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
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-between gap-8 rounded-2xl border border-white/[0.08] bg-lp-elevated/40 p-8 backdrop-blur-md transition hover:border-lp-orange/25"
          >
            <div>
              <p className="text-sm leading-relaxed text-zinc-400">
                Prefer email or socials? I respond best to concise context: what you&apos;re building, timelines, and how
                I can help.
              </p>
              <ul className="mt-8 space-y-4" role="list">
                {links.map((item) => (
                  <li key={item.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-lp-orange/90">{item.label}</p>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="mt-1 inline-block text-sm font-medium text-lp-orange transition hover:text-[#fdba74]"
                    >
                      {item.label === 'Email' ? item.value : item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-lp-orange/45">{PERSON.location}</p>
          </motion.div>

          <motion.form
            variants={fadeUp}
            onSubmit={onSubmit}
            className="rounded-2xl border border-white/[0.08] bg-lp-elevated/45 p-8 shadow-xl shadow-black/25 backdrop-blur-md transition hover:border-lp-orange/25"
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
                  className="mt-2 w-full rounded-xl border border-lp-orange/20 bg-lp-bg/70 px-4 py-3 text-sm text-zinc-100 outline-none ring-lp-orange/15 transition placeholder:text-zinc-600 hover:border-lp-orange/40 focus:border-lp-orange/55 focus:ring-2 focus:ring-lp-orange/30"
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
                  className="mt-2 w-full rounded-xl border border-lp-orange/20 bg-lp-bg/70 px-4 py-3 text-sm text-zinc-100 outline-none ring-lp-orange/15 transition placeholder:text-zinc-600 hover:border-lp-orange/40 focus:border-lp-orange/55 focus:ring-2 focus:ring-lp-orange/30"
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
                  className="mt-2 w-full resize-y rounded-xl border border-lp-orange/20 bg-lp-bg/70 px-4 py-3 text-sm text-zinc-100 outline-none ring-lp-orange/15 transition placeholder:text-zinc-600 hover:border-lp-orange/40 focus:border-lp-orange/55 focus:ring-2 focus:ring-lp-orange/30"
                  placeholder="A short note about the opportunity or project…"
                />
              </label>
            </div>
            <motion.button
              type="submit"
              className="mt-6 w-full rounded-full border border-lp-orange/30 bg-lp-orange py-3.5 text-sm font-semibold text-lp-bg shadow-lg shadow-lp-orange/25 transition hover:border-[#fdba74] hover:bg-[#fdba74] sm:w-auto sm:px-10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send message
            </motion.button>
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
