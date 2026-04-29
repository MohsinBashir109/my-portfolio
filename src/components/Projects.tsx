import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'
import { PROJECTS } from '../lib/constants'
import {
  fadeUpBlur,
  fadeUpSimple,
  staggerCards,
  staggerContainerInstant,
  viewportReveal,
} from '../lib/motion'
import { iconForStack } from '../lib/techIcons'
import { ExperienceUiGallery } from './ExperienceUiGallery'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  const reducedMotion = useReducedMotion() === true
  const stagger = useMemo(
    () => (reducedMotion ? staggerContainerInstant : staggerCards),
    [reducedMotion]
  )
  const cardVariants = useMemo(
    () => (reducedMotion ? fadeUpSimple : fadeUpBlur),
    [reducedMotion]
  )

  return (
    <section id="projects" className="relative px-6 py-24 sm:py-28" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          title="Selected work"
          subtitle="High-signal snapshots you can tailor with real links and demos when you are ready."
        />

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={stagger}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReveal}
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.title}
              variants={cardVariants}
              tabIndex={-1}
              className="group card-lift relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface/90 p-6 shadow-xl shadow-black/30 transition-colors hover:border-brand-primary/35 hover:bg-[#162033] hover:shadow-[0_0_40px_-12px_rgba(79,140,255,0.2)] focus-within:border-brand-primary/50 focus-within:ring-2 focus-within:ring-brand-primary/25 focus-within:ring-offset-2 focus-within:ring-offset-lp-bg motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-xl"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                aria-hidden="true"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-primary/15 via-transparent to-brand-secondary/12 opacity-90" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-geist text-xl font-semibold text-slate-50 transition-colors group-hover:text-brand-primary sm:text-2xl">
                    {project.title}
                  </h3>
                  <span className="rounded-full border border-border-subtle bg-bg-elevated px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-brand-highlight">
                    Case study
                  </span>
                </div>
                <p className="mt-3 text-[13px] font-normal leading-relaxed text-slate-400 sm:text-sm">
                  {project.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2" role="list" aria-label="Tech stack">
                  {project.stack.map((t) => {
                    const StackIcon = iconForStack(t)
                    return (
                      <li key={t}>
                        <span className="chip-lift inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-bg-elevated/80 px-2 py-1 font-mono text-[10px] font-medium text-slate-300 motion-reduce:hover:scale-100 sm:text-[11px]">
                          {StackIcon ? (
                            <StackIcon className="h-3.5 w-3.5 shrink-0 text-brand-highlight" aria-hidden="true" />
                          ) : null}
                          {t}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press focus-ring inline-flex items-center justify-center rounded-full border border-border-subtle bg-transparent px-3.5 py-2 text-[11px] text-slate-50 hover:border-border-subtle hover:bg-bg-surface motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 sm:px-4 sm:text-xs"
                  >
                    GitHub
                  </a>
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press focus-ring inline-flex items-center justify-center rounded-full border border-brand-primary/40 bg-brand-primary px-3.5 py-2 text-[11px] text-white shadow-[0_0_28px_-8px_rgba(79,140,255,0.35)] hover:border-brand-primary-hover hover:bg-brand-primary-hover motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 sm:px-4 sm:text-xs"
                    >
                      Live demo
                    </a>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-dashed border-border-subtle bg-bg-elevated/40 px-3.5 py-2 font-mono text-[11px] font-medium text-slate-500 sm:px-4 sm:text-xs">
                      Live demo — add URL
                    </span>
                  )}
                </div>

                <ExperienceUiGallery shots={project.uiGallery} />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
