import { motion } from 'framer-motion'
import { PROJECTS } from '../lib/constants'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import { iconForStack } from '../lib/techIcons'
import { SectionHeading } from './SectionHeading'

export function Projects() {
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
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-lp-elevated/45 p-6 shadow-xl shadow-black/30 backdrop-blur-md transition-colors hover:border-lp-orange/35"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-lp-orange/22 via-transparent to-amber-600/15 opacity-90" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-[family-name:var(--font-family-display)] text-2xl font-normal text-lp-orange">
                    {project.title}
                  </h3>
                  <span className="rounded-full border border-lp-orange/35 bg-lp-orange/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-lp-orange">
                    Case study
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.description}</p>

                <ul className="mt-5 flex flex-wrap gap-2" role="list" aria-label="Tech stack">
                  {project.stack.map((t) => {
                    const StackIcon = iconForStack(t)
                    return (
                      <li key={t}>
                        <motion.span
                          className="inline-flex items-center gap-1.5 rounded-md border border-lp-orange/30 bg-lp-bg/70 px-2 py-1 text-[11px] font-medium text-zinc-200"
                          whileHover={{ scale: 1.04 }}
                        >
                          {StackIcon ? (
                            <StackIcon className="h-3.5 w-3.5 shrink-0 text-lp-orange" aria-hidden="true" />
                          ) : null}
                          {t}
                        </motion.span>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-lp-orange/55 bg-lp-orange/10 px-4 py-2 text-xs font-semibold text-lp-orange transition hover:border-lp-orange hover:bg-lp-orange/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    GitHub
                  </motion.a>
                  {project.live ? (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-lp-orange/40 bg-lp-orange px-4 py-2 text-xs font-semibold text-lp-bg transition hover:bg-[#fdba74] hover:border-[#fdba74]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Live demo
                    </motion.a>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-dashed border-lp-orange/45 bg-lp-orange/5 px-4 py-2 text-xs font-medium text-lp-orange/85">
                      Live demo — add URL
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
