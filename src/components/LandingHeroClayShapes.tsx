import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const clayShadow =
  'shadow-[0_14px_36px_-12px_rgba(154,52,18,0.4),inset_0_2px_0_rgba(255,255,255,0.55)]'
const clayShadowSoft =
  'shadow-[0_10px_28px_-10px_rgba(154,52,18,0.32),inset_0_1px_0_rgba(255,255,255,0.45)]'

type FloatMode = 'float' | 'drift' | 'pulse'

function FloatShape({
  className,
  duration,
  delay = 0,
  reduced,
  mode = 'float',
  children,
}: {
  className: string
  duration: number
  delay?: number
  reduced: boolean
  mode?: FloatMode
  children: ReactNode
}) {
  const animate =
    reduced
      ? undefined
      : mode === 'drift'
        ? { y: [0, -10, 0], x: [0, 8, 0], rotate: [-2, 2, -2] }
        : mode === 'pulse'
          ? { y: [0, -6, 0], scale: [1, 1.06, 1], opacity: [0.5, 0.72, 0.5] }
          : { y: [0, -12, 0], rotate: [0, 2.5, 0] }

  return (
    <motion.div
      className={className}
      initial={false}
      animate={animate}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

/** Tiny sparkle — static opacity when reduced */
function Sparkle({
  className,
  reduced,
  delay,
}: {
  className: string
  reduced: boolean
  delay: number
}) {
  return (
    <motion.span
      className={`absolute rounded-full border border-white/30 bg-white/45 ${className}`}
      initial={false}
      animate={reduced ? undefined : { opacity: [0.35, 0.85, 0.35], scale: [1, 1.15, 1] }}
      transition={{ duration: 2.8 + (delay % 3) * 0.4, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

/**
 * Decorative 3D-ish “clay” shapes (CSS + SVG only) — inspired by soft isometric tech art.
 * Sits behind hero copy on the orange surface; no bitmap assets.
 */
export function LandingHeroClayShapes() {
  const reduced = useReducedMotion() === true

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden select-none"
      aria-hidden
    >
      {/* Large soft blob — top left */}
      <FloatShape
        className={`absolute -left-[8%] top-[14%] h-[min(42vw,280px)] w-[min(42vw,280px)] rounded-[42%_58%_48%_52%/48%_42%_58%_52%] bg-gradient-to-br from-white/50 to-white/25 ${clayShadowSoft} blur-[0.5px]`}
        duration={9}
        delay={0}
        reduced={reduced}
      >
        <span />
      </FloatShape>

      {/* Medium blob — bottom right */}
      <FloatShape
        className={`absolute -bottom-[6%] -right-[6%] h-[min(38vw,220px)] w-[min(38vw,220px)] rounded-[55%_45%_52%_48%/44%_56%_46%_54%] bg-gradient-to-tl from-white/38 to-white/16 ${clayShadowSoft}`}
        duration={11}
        delay={0.35}
        reduced={reduced}
        mode="drift"
      >
        <span />
      </FloatShape>

      {/* Mid blob — behind center copy */}
      <FloatShape
        className={`absolute left-1/2 top-1/2 h-[min(55vw,320px)] w-[min(55vw,320px)] -translate-x-1/2 -translate-y-[42%] rounded-[50%_50%_48%_52%/46%_54%_50%_50%] bg-gradient-to-b from-white/22 to-white/8 ${clayShadowSoft} opacity-60`}
        duration={14}
        delay={0.2}
        reduced={reduced}
        mode="pulse"
      >
        <span />
      </FloatShape>

      {/* Code window — compact on mobile */}
      <FloatShape
        className="absolute left-[4%] top-[36%] scale-[0.72] sm:left-[6%] sm:top-[38%] sm:scale-100"
        duration={7.5}
        delay={0.4}
        reduced={reduced}
      >
        <div
          className={`relative h-[72px] w-[100px] rounded-2xl border border-white/50 bg-gradient-to-b from-white/45 to-white/20 ${clayShadow} backdrop-blur-[2px]`}
        >
          <div className="flex gap-1 px-2.5 pt-2">
            <span className="h-2 w-2 rounded-full bg-[#fda4af]/90" />
            <span className="h-2 w-2 rounded-full bg-[#fde68a]/95" />
            <span className="h-2 w-2 rounded-full bg-[#86efac]/90" />
          </div>
          <div className="mx-2 mt-2 space-y-1.5">
            <div className="h-1 rounded-full bg-white/50" />
            <div className="h-1 w-[80%] rounded-full bg-white/35" />
            <div className="h-1 w-[60%] rounded-full bg-white/30" />
          </div>
        </div>
      </FloatShape>

      {/* Second smaller window — top right area */}
      <FloatShape
        className="absolute right-[3%] top-[8%] hidden md:block"
        duration={6.2}
        delay={1.2}
        reduced={reduced}
        mode="drift"
      >
        <div
          className={`h-[52px] w-[72px] rounded-xl border border-white/45 bg-gradient-to-b from-white/38 to-white/16 ${clayShadowSoft}`}
        >
          <div className="flex gap-0.5 px-2 pt-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-300/90" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-200/90" />
          </div>
          <div className="mx-2 mt-1.5 space-y-1">
            <div className="h-0.5 rounded-full bg-white/45" />
            <div className="h-0.5 w-[70%] rounded-full bg-white/28" />
          </div>
        </div>
      </FloatShape>

      {/* </> mark */}
      <FloatShape
        className="absolute right-[5%] top-[20%] hidden scale-90 sm:right-[8%] sm:top-[22%] sm:block sm:scale-100"
        duration={8}
        delay={0.2}
        reduced={reduced}
      >
        <div
          className={`flex h-[76px] w-[76px] items-center justify-center rounded-3xl border border-white/45 bg-gradient-to-br from-white/40 to-white/15 ${clayShadow}`}
        >
          <svg viewBox="0 0 48 48" className="h-10 w-10 text-white/90" fill="none" aria-hidden>
            <path
              d="M14 16l-8 8 8 8M34 16l8 8-8 8"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M22 34l4-20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </FloatShape>

      {/* Curly braces {} */}
      <FloatShape
        className="absolute left-[12%] top-[62%] hidden sm:block lg:left-[14%]"
        duration={5.8}
        delay={0.55}
        reduced={reduced}
        mode="drift"
      >
        <div
          className={`flex h-[52px] w-[44px] items-center justify-center rounded-2xl border border-white/40 bg-gradient-to-br from-white/35 to-white/12 ${clayShadowSoft}`}
        >
          <span className="font-[family-name:var(--font-roboto-mono)] text-lg font-bold text-white/80">
            {'{ }'}
          </span>
        </div>
      </FloatShape>

      {/* Cloud puff */}
      <FloatShape
        className="absolute -right-[4%] top-[44%] hidden sm:block lg:top-[48%]"
        duration={10}
        delay={0.6}
        reduced={reduced}
      >
        <div className="relative h-20 w-36">
          <div
            className={`absolute bottom-0 left-4 h-12 w-20 rounded-full border border-white/40 bg-gradient-to-b from-white/40 to-white/18 ${clayShadowSoft}`}
          />
          <div
            className={`absolute bottom-1 left-0 h-14 w-14 rounded-full border border-white/35 bg-gradient-to-br from-white/45 to-white/2 ${clayShadowSoft}`}
          />
          <div
            className={`absolute bottom-1 right-0 h-11 w-11 rounded-full border border-white/35 bg-gradient-to-br from-white/42 to-white/15 ${clayShadowSoft}`}
          />
        </div>
      </FloatShape>

      {/* Mini cloud — left mid, mobile */}
      <FloatShape
        className="absolute left-[-2%] top-[52%] block sm:hidden"
        duration={8.5}
        delay={0.3}
        reduced={reduced}
        mode="pulse"
      >
        <div className="relative h-14 w-24 scale-90">
          <div
            className={`absolute bottom-0 left-2 h-8 w-14 rounded-full border border-white/35 bg-gradient-to-b from-white/35 to-white/15 ${clayShadowSoft}`}
          />
          <div
            className={`absolute bottom-0.5 left-0 h-9 w-9 rounded-full border border-white/30 bg-white/30 ${clayShadowSoft}`}
          />
          <div
            className={`absolute bottom-0.5 right-0 h-7 w-7 rounded-full border border-white/30 bg-white/28 ${clayShadowSoft}`}
          />
        </div>
      </FloatShape>

      {/* Stacked “server” cards */}
      <FloatShape
        className="absolute bottom-[24%] left-[8%] hidden md:block"
        duration={6.5}
        delay={0.8}
        reduced={reduced}
      >
        <div className="relative h-[52px] w-[64px]">
          <div
            className={`absolute bottom-0 left-0 right-0 h-3 rounded-md border border-white/30 bg-white/25 ${clayShadowSoft}`}
          />
          <div
            className={`absolute bottom-2 left-1 right-1 h-3 rounded-md border border-white/35 bg-white/35 ${clayShadowSoft}`}
          />
          <div
            className={`absolute bottom-4 left-0.5 right-0.5 h-8 rounded-lg border border-white/45 bg-gradient-to-b from-white/45 to-white/22 ${clayShadow}`}
          >
            <div className="mt-2 flex justify-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/90 shadow-[0_0_6px_rgba(110,231,183,0.8)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-200/90 shadow-[0_0_6px_rgba(253,230,138,0.7)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300/80 shadow-[0_0_6px_rgba(125,211,252,0.7)]" />
            </div>
          </div>
        </div>
      </FloatShape>

      {/* Bar chart */}
      <FloatShape
        className="absolute bottom-[18%] right-[6%] hidden lg:block"
        duration={7.2}
        delay={0.25}
        reduced={reduced}
        mode="drift"
      >
        <div
          className={`flex h-[56px] w-[72px] items-end justify-center gap-1.5 rounded-2xl border border-white/45 bg-gradient-to-b from-white/40 to-white/15 px-2.5 pb-2 ${clayShadow}`}
        >
          <div className="h-[40%] w-2.5 rounded-md bg-gradient-to-t from-violet-300/90 to-violet-200/70" />
          <div className="h-[65%] w-2.5 rounded-md bg-gradient-to-t from-sky-300/90 to-sky-200/70" />
          <div className="h-[50%] w-2.5 rounded-md bg-gradient-to-t from-amber-300/90 to-amber-200/70" />
          <div className="h-[78%] w-2.5 rounded-md bg-gradient-to-t from-emerald-300/90 to-emerald-200/70" />
        </div>
      </FloatShape>

      {/* Donut ring */}
      <FloatShape
        className="absolute left-[8%] top-[8%] hidden md:block"
        duration={9.5}
        delay={0.9}
        reduced={reduced}
        mode="pulse"
      >
        <div className={`relative flex h-16 w-16 items-center justify-center rounded-full ${clayShadowSoft}`}>
          <div className="absolute inset-0 rounded-full border-[10px] border-white/38" />
          <div
            className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-pink-200/85 border-l-violet-200/75"
            style={{ transform: 'rotate(-35deg)' }}
          />
          <div className="relative z-[1] h-5 w-5 rounded-full bg-white/35 ring-1 ring-white/30" />
        </div>
      </FloatShape>

      {/* Laptop */}
      <FloatShape
        className="absolute right-[18%] bottom-[20%] hidden lg:block"
        duration={8.8}
        delay={0.1}
        reduced={reduced}
      >
        <div className={`relative w-[88px] ${clayShadowSoft}`}>
          <div className="mx-auto h-[48px] w-[76px] rounded-lg rounded-b-none border border-white/45 bg-gradient-to-b from-white/42 to-white/20 px-2 pt-1.5">
            <div className="h-full w-full rounded border border-white/20 bg-white/15">
              <div className="m-1 space-y-0.5">
                <div className="h-0.5 w-full rounded-full bg-sky-200/50" />
                <div className="h-0.5 w-[85%] rounded-full bg-violet-200/45" />
                <div className="h-0.5 w-[70%] rounded-full bg-amber-200/45" />
              </div>
            </div>
          </div>
          <div className="mx-auto -mt-px h-2 w-[92px] rounded-b-lg border border-white/35 bg-gradient-to-b from-white/35 to-white/15" />
        </div>
      </FloatShape>

      {/* Gear */}
      <FloatShape
        className="absolute left-[3%] bottom-[12%] hidden sm:block"
        duration={12}
        delay={0.4}
        reduced={reduced}
        mode="drift"
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/40 bg-gradient-to-br from-white/38 to-white/14 ${clayShadowSoft}`}
        >
          <span className="text-[1.65rem] leading-none text-white/85" aria-hidden>
            ⚙
          </span>
        </div>
      </FloatShape>

      {/* Rocket */}
      <FloatShape
        className="absolute right-[2%] top-[32%] hidden md:block"
        duration={6}
        delay={0.7}
        reduced={reduced}
      >
        <div className="relative flex flex-col items-center">
          <div className="h-0 w-0 border-x-[10px] border-x-transparent border-b-[14px] border-b-white/55" />
          <div
            className={`h-10 w-7 rounded-b-xl rounded-t-sm border border-white/45 bg-gradient-to-b from-white/45 to-white/22 ${clayShadowSoft}`}
          />
          <div className="-mt-0.5 flex gap-1">
            <span className="h-3 w-1 rounded-full bg-amber-200/80 blur-[1px]" />
            <span className="h-4 w-1 rounded-full bg-orange-200/70 blur-[1px]" />
            <span className="h-3 w-1 rounded-full bg-amber-200/80 blur-[1px]" />
          </div>
        </div>
      </FloatShape>

      {/* Lightbulb */}
      <FloatShape
        className="absolute left-[40%] top-[8%] hidden lg:block"
        duration={5.5}
        delay={1.4}
        reduced={reduced}
        mode="pulse"
      >
        <div className="flex flex-col items-center">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-gradient-to-b from-amber-100/90 to-amber-50/50 ${clayShadowSoft}`}
          >
            <span className="block h-4 w-4 rounded-full bg-amber-200/60 blur-[2px]" />
          </div>
          <div className="h-2 w-6 rounded-b-md border border-white/35 bg-gradient-to-b from-white/40 to-white/20" />
        </div>
      </FloatShape>

      {/* Envelope */}
      <FloatShape
        className="absolute bottom-[8%] left-[22%] hidden sm:block md:left-[28%]"
        duration={7.8}
        delay={0.5}
        reduced={reduced}
        mode="drift"
      >
        <div
          className={`relative h-10 w-14 rounded-md border border-white/45 bg-gradient-to-br from-white/42 to-white/18 ${clayShadowSoft}`}
        >
          <div className="absolute inset-x-1 top-1 h-0 border-l-[22px] border-r-[22px] border-b-[14px] border-l-transparent border-r-transparent border-b-white/40" />
        </div>
      </FloatShape>

      {/* Hex tile */}
      <FloatShape
        className="absolute top-[28%] right-[28%] hidden xl:block"
        duration={10}
        delay={0.2}
        reduced={reduced}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center ${clayShadowSoft}`}
          style={{
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.42), rgba(255,255,255,0.14))',
            border: '1px solid rgba(255,255,255,0.4)',
          }}
        >
          <span className="text-[10px] font-bold text-white/70">◇</span>
        </div>
      </FloatShape>

      {/* Rounded shield + check */}
      <FloatShape
        className="absolute bottom-[30%] right-[10%] hidden sm:block"
        duration={7}
        delay={0.15}
        reduced={reduced}
      >
        <div
          className={`flex h-[68px] w-[56px] items-center justify-center rounded-b-[40%] rounded-t-3xl border border-white/45 bg-gradient-to-b from-white/48 to-white/18 ${clayShadow}`}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-white/95" fill="none" aria-hidden>
            <path
              d="M6 12.5l3.5 3.5L18 8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </FloatShape>

      {/* Connection arc */}
      <svg
        className="absolute left-[18%] top-[48%] hidden lg:block lg:opacity-50"
        width="120"
        height="60"
        viewBox="0 0 120 60"
        fill="none"
        aria-hidden
      >
        <path
          d="M10 45 Q 60 5 110 40"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 8"
        />
      </svg>

      {/* Small orbs */}
      <FloatShape
        className="absolute left-[22%] top-[18%] h-4 w-4 rounded-full border border-white/40 bg-white/35 sm:h-5 sm:w-5"
        duration={5}
        delay={0.3}
        reduced={reduced}
      >
        <span />
      </FloatShape>
      <FloatShape
        className="absolute right-[20%] top-[58%] h-3 w-3 rounded-full border border-white/35 bg-white/30 sm:h-3.5 sm:w-3.5"
        duration={4.2}
        delay={1.1}
        reduced={reduced}
      >
        <span />
      </FloatShape>
      <FloatShape
        className="absolute bottom-[40%] right-[28%] h-2.5 w-2.5 rounded-full bg-white/40"
        duration={5.5}
        delay={0.5}
        reduced={reduced}
      >
        <span />
      </FloatShape>
      <FloatShape
        className="absolute left-[32%] top-[72%] h-2 w-2 rounded-full bg-white/50 sm:top-[68%]"
        duration={4.8}
        delay={1.5}
        reduced={reduced}
        mode="pulse"
      >
        <span />
      </FloatShape>
      <FloatShape
        className="absolute right-[40%] top-[14%] h-2 w-2 rounded-full border border-white/35 bg-white/40"
        duration={5.2}
        delay={0.2}
        reduced={reduced}
      >
        <span />
      </FloatShape>
      <FloatShape
        className="absolute left-[6%] top-[72%] h-1.5 w-1.5 rounded-full bg-white/45"
        duration={3.8}
        delay={0.8}
        reduced={reduced}
        mode="drift"
      >
        <span />
      </FloatShape>

      {/* Sparkle field */}
      <Sparkle className="left-[15%] top-[26%] h-1 w-1" reduced={reduced} delay={0} />
      <Sparkle className="right-[35%] top-[20%] h-1 w-1" reduced={reduced} delay={0.4} />
      <Sparkle className="left-[48%] top-[12%] h-1.5 w-1.5" reduced={reduced} delay={0.8} />
      <Sparkle className="right-[12%] top-[70%] h-1 w-1" reduced={reduced} delay={1.2} />
      <Sparkle className="left-[8%] top-[50%] h-1 w-1" reduced={reduced} delay={1.6} />
      <Sparkle className="right-[42%] bottom-[36%] h-1.5 w-1.5" reduced={reduced} delay={0.3} />
      <Sparkle className="left-[55%] bottom-[22%] h-1 w-1" reduced={reduced} delay={1.0} />
      <Sparkle className="right-[24%] top-[40%] h-1 w-1" reduced={reduced} delay={0.6} />
    </div>
  )
}
