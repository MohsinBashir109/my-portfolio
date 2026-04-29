import { useId, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { IoLocationOutline } from 'react-icons/io5'
import { EXPERIENCE } from '../lib/constants'
import {
  fadeUpSimple,
  staggerCards,
  staggerContainerInstant,
  viewportReveal,
} from '../lib/motion'
import { ExperienceUiGallery } from './ExperienceUiGallery'
import { SectionHeading } from './SectionHeading'

function websiteHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function Experience() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const reducedMotion = useReducedMotion() === true

  return (
    <section
      id="experience"
      className="full-bleed relative bg-transparent px-6 py-24 sm:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Roles that shaped my craft"
          subtitle="A clear progression from internship to shipping production features across multiple products."
        />

        <motion.div
          className="flex flex-col gap-3"
          variants={reducedMotion ? staggerContainerInstant : staggerCards}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReveal}
        >
          {EXPERIENCE.map((job, index) => {
            const isOpen = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const website = job.websiteUrl?.trim() ? job.websiteUrl.trim() : null

            return (
              <motion.div key={`${job.role}-${job.period}`} variants={fadeUpSimple}>
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    id={`${baseId}-trigger-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-[background-color,box-shadow] duration-200 sm:px-6 sm:py-5 ${
                      isOpen
                        ? 'rounded-t-xl rounded-b-none bg-gradient-to-r from-brand-primary to-brand-secondary shadow-[0_0_50px_rgba(124,58,237,0.2)]'
                        : 'rounded-xl bg-bg-surface ring-1 ring-border-subtle hover:bg-[#162033] hover:ring-brand-primary/35'
                    }`}
                  >
                    <span className="min-w-0 font-geist text-[15px] font-semibold leading-snug text-white sm:text-lg">
                      {job.role} <span className="text-white/90">@</span> {job.company}
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="font-mono text-[13px] font-medium tabular-nums text-white sm:text-base">{job.period}</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15 text-xl font-light leading-none text-white ring-1 ring-white/25">
                        {isOpen ? '−' : '+'}
                      </span>
                    </span>
                  </button>
                </h3>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={`${baseId}-trigger-${index}`}
                      className="rounded-b-xl border border-t-0 border-border-subtle bg-bg-main px-5 pb-6 pt-5 sm:px-6 sm:pb-8 sm:pt-6"
                    >
                      <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-400 sm:text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          <IoLocationOutline className="h-[1.1em] w-[1.1em] shrink-0 opacity-90" aria-hidden />
                          {job.location}
                        </span>
                        {website ? (
                          <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium underline decoration-brand-primary/45 underline-offset-2 transition hover:text-brand-highlight hover:decoration-brand-highlight/60"
                          >
                            {websiteHost(website)}
                            <HiArrowTopRightOnSquare className="h-[1em] w-[1em] shrink-0 opacity-90" aria-hidden />
                          </a>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                        <ul className="max-w-xl space-y-3 text-[13px] leading-relaxed text-white sm:text-sm" role="list">
                          {job.highlights.map((line) => (
                            <li key={line} className="flex gap-3">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" aria-hidden />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                        <p
                          className="shrink-0 font-geist text-2xl font-semibold tracking-tight text-white/95 sm:text-3xl lg:text-right lg:text-4xl lg:leading-none"
                          aria-hidden
                        >
                          {job.company}
                        </p>
                      </div>

                      {job.skillTags && job.skillTags.length > 0 ? (
                        <ul className="mt-8 flex flex-wrap gap-2" role="list">
                          {job.skillTags.map((tag) => (
                            <li key={tag}>
                              <span className="inline-block rounded-full border border-border-subtle bg-bg-elevated px-3 py-1.5 font-mono text-[11px] font-medium tracking-wide text-brand-highlight ring-1 ring-brand-primary/15 sm:text-xs">
                                {tag}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <ExperienceUiGallery shots={job.uiGallery} variant="experience" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
