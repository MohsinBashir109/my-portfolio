import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../lib/motion'
import { SectionHeading } from './SectionHeading'
import { skillsMarqueeLabelsFlat } from '../lib/constants'
import { SkillsMarquee } from './SkillsMarquee'

export function Skills() {
  const allLabels = skillsMarqueeLabelsFlat()

  return (
    <section id="skills" className="relative px-6 py-24 sm:py-28" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          title="Tools I use to ship"
          subtitle="Everything below shows up regularly in production work—same stack, continuous motion."
        />

        <motion.div
          className="mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <ul className="sr-only">
            {allLabels.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <SkillsMarquee />
        </motion.div>
      </div>
    </section>
  )
}
