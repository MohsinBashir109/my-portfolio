/**
 * Layered gradients + light parallax on orbs (transform-only, modest blur).
 * Cyan tints aligned to amber / orange brand accents.
 */
import { ParallaxLayer } from './motion'

export function BackgroundDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[4] isolate overflow-hidden bg-lp-bg [transform:translateZ(0)]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,rgba(251,146,60,0.11),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_45%,rgba(179,136,255,0.09),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_0%_75%,rgba(255,140,60,0.07),transparent_48%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(147,51,234,0.048),transparent_45%)]" />

      <ParallaxLayer className="absolute -left-20 top-[18%] h-72 w-72" yRange={28}>
        <div className="h-full w-full rounded-full bg-[rgba(251,146,60,0.085)] blur-3xl" />
      </ParallaxLayer>
      <ParallaxLayer className="absolute -right-16 bottom-[20%] h-64 w-64" yRange={-22}>
        <div className="h-full w-full rounded-full bg-[rgba(253,186,116,0.07)] blur-3xl" />
      </ParallaxLayer>

      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  )
}
