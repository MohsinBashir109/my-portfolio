/**
 * Ambient dust / ember field — drawn inside `HeroAtmosphere` (single canvas + RAF).
 * Import helpers here if you split the canvas or build a custom renderer.
 */
export type { AmbientParticle } from './ambientLayer'
export { ambientCountForMode, createAmbientParticles, drawAmbient, stepAmbient } from './ambientLayer'
