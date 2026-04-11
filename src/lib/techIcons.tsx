import type { IconType } from 'react-icons'
import {
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiOpenai,
  SiOpenapiinitiative,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiTypescript,
} from 'react-icons/si'

/** Marquee — curated stack */
export const HERO_TECH: { name: string; Icon: IconType }[] = [
  { name: 'React Native', Icon: SiReact },
  { name: 'React', Icon: SiReact },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Express', Icon: SiExpress },
  { name: 'Redux', Icon: SiRedux },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'Firebase', Icon: SiFirebase },
  { name: 'Git', Icon: SiGit },
  { name: 'GitHub', Icon: SiGithub },
]

/** Project stack tag → icon */
export const STACK_ICON_MAP: Record<string, IconType> = {
  'React Native': SiReact,
  TypeScript: SiTypescript,
  'Redux Toolkit': SiRedux,
  REST: SiOpenapiinitiative,
  JavaScript: SiJavascript,
  'State management': SiRedux,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  APIs: SiOpenapiinitiative,
  Research: SiOpenai,
}

export function iconForStack(label: string): IconType | undefined {
  return STACK_ICON_MAP[label]
}
