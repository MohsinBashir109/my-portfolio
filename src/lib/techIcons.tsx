import type { IconType } from 'react-icons'
import {
  SiAndroid,
  SiAndroidstudio,
  SiApple,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiOpenai,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedux,
  SiStorybook,
  SiTypescript,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

/** Marquee + hero dock — curated stack you want to showcase */
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

/** Skill chip label → icon (matches strings in `SKILLS` in constants) */
export const SKILL_ICON_MAP: Record<string, IconType> = {
  React: SiReact,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  'Redux Toolkit': SiRedux,
  'REST APIs': SiOpenapiinitiative,
  'Component architecture': SiStorybook,
  'React Native': SiReact,
  'Cross-platform apps': SiAndroid,
  'React Navigation': SiReact,
  'State management': SiRedux,
  'UI implementation': SiFigma,
  'API integration': SiPostman,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Firebase: SiFirebase,
  Git: SiGit,
  GitHub: SiGithub,
  'Android Studio': SiAndroidstudio,
  'VS Code': VscVscode,
}

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

export function iconForSkill(label: string): IconType | undefined {
  return SKILL_ICON_MAP[label]
}

export function iconForStack(label: string): IconType | undefined {
  return STACK_ICON_MAP[label]
}

/** Larger icons next to skill category titles */
export const CATEGORY_SHOWCASE: Record<
  'frontend' | 'mobile' | 'backend' | 'tools',
  IconType[]
> = {
  frontend: [SiReact, SiTypescript, SiJavascript],
  mobile: [SiReact, SiAndroid, SiApple],
  backend: [SiNodedotjs, SiExpress, SiMongodb],
  tools: [SiGit, SiGithub, VscVscode],
}
