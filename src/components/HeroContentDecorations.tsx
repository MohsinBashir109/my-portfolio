import { useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const soft =
  'shadow-[0_10px_26px_-8px_rgba(79,140,255,0.26),inset_0_1px_0_rgba(255,255,255,0.38)]'
const border = 'border border-white/45'

type DecorMode = 'float' | 'drift' | 'bob' | 'pulse' | 'sway' | 'twinkle'

const decorAnimClass: Record<DecorMode, string> = {
  float: 'landing-loop landing-decor-float',
  drift: 'landing-loop landing-decor-drift',
  bob: 'landing-loop landing-decor-bob',
  pulse: 'landing-loop landing-decor-pulse',
  sway: 'landing-loop landing-decor-sway',
  twinkle: 'landing-loop landing-decor-twinkle',
}

function CssDecorMotion({
  className,
  reduced,
  duration,
  delay = 0,
  mode = 'float',
  children,
}: {
  className: string
  reduced: boolean
  duration: number
  delay?: number
  mode?: DecorMode
  children?: ReactNode
}) {
  return (
    <div
      className={`${className}${reduced ? '' : ` ${decorAnimClass[mode]}`}`}
      style={
        reduced
          ? undefined
          : {
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }
      }
    >
      {children}
    </div>
  )
}

/**
 * Full-hero clay chips — absolutely placed; CSS keyframes add slow float / drift / pulse.
 */
export function HeroContentDecorations() {
  const reduced = useReducedMotion() === true

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] select-none overflow-x-hidden overflow-y-visible [contain:layout_paint]"
      aria-hidden
    >
      {/* —— Left rail —— */}
      <CssDecorMotion
        className={`absolute left-[clamp(0.35rem,1.5vw,1rem)] top-[18%] origin-top-left scale-[0.72] sm:left-[clamp(0.75rem,2.5vw,1.75rem)] sm:top-[20%] sm:scale-[0.82] md:scale-[0.92] ${border} rounded-2xl bg-gradient-to-b from-white/42 to-white/18 ${soft}`}
        reduced={reduced}
        duration={9}
        delay={0.15}
        mode="drift"
      >
        <div className="flex gap-1 px-2.5 pt-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#fda4af]/90" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#fde68a]/95" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#86efac]/90" />
        </div>
        <div className="mx-2.5 mt-2 space-y-1 pb-2">
          <div className="h-1 rounded-full bg-white/52" />
          <div className="h-1 w-[78%] rounded-full bg-white/38" />
          <div className="h-1 w-[55%] rounded-full bg-white/28" />
        </div>
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute left-[9%] top-[10%] flex items-center gap-1.5 rounded-lg ${border} bg-gradient-to-br from-white/28 to-white/11 px-2 py-1.5 ${soft} sm:left-[10%] md:left-[12%]`}
        reduced={reduced}
        duration={6.5}
        delay={0.4}
        mode="float"
      >
        <span className="font-mono text-[10px] font-medium text-sky-200/90 sm:text-[11px]">//</span>
        <span className="h-0.5 w-5 rounded-full bg-white/34 sm:w-6" />
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute left-[2.5%] top-[33%] h-2.5 w-2.5 rounded-full ${border} bg-white/38 ${soft} sm:left-[3%] sm:h-3 sm:w-3`}
        reduced={reduced}
        duration={4.2}
        delay={0.2}
        mode="twinkle"
      />

      <CssDecorMotion
        className={`absolute left-[clamp(0.35rem,1.75vw,1.1rem)] top-[42%] flex h-11 w-10 items-center justify-center rounded-xl ${border} bg-gradient-to-br from-white/34 to-white/12 ${soft} font-mono text-xs font-medium text-white/78 sm:h-12 sm:w-11 sm:text-[0.8125rem]`}
        reduced={reduced}
        duration={7.2}
        delay={0.55}
        mode="sway"
      >
        {'{ }'}
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute left-[7%] top-[54%] flex h-10 w-10 items-center justify-center sm:left-[8%] sm:top-[52%] sm:h-11 sm:w-11 md:left-[9%]`}
        reduced={reduced}
        duration={8.5}
        delay={0.1}
        mode="bob"
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.4), rgba(255,255,255,0.12))',
            border: '1px solid rgba(255,255,255,0.42)',
            boxShadow:
              '0 10px 26px -8px rgba(79,140,255,0.22), inset 0 1px 0 rgba(255,255,255,0.35)',
          }}
        >
          <span className="text-[10px] font-bold text-white/72 sm:text-[11px]">&lt;/&gt;</span>
        </div>
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute bottom-[30%] left-[3%] flex h-8 w-8 items-center justify-center rounded-full ${border} bg-white/24 ${soft} sm:bottom-[31%] sm:left-[3.5%] sm:h-9 sm:w-9`}
        reduced={reduced}
        duration={5.8}
        delay={0.85}
        mode="pulse"
      >
        <span className="text-xs text-white/68">@</span>
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute bottom-[15%] left-[clamp(0.35rem,1.75vw,1.1rem)] rounded-xl ${border} bg-gradient-to-b from-slate-900/88 to-slate-950/78 px-2 py-1.5 ${soft}`}
        reduced={reduced}
        duration={6.2}
        delay={0.3}
        mode="float"
      >
        <div className="mb-1 flex gap-1">
          <span className="h-1 w-1 rounded-full bg-emerald-400/90" />
          <span className="h-1 w-1 rounded-full bg-white/28" />
        </div>
        <p className="font-mono text-[11px] font-medium leading-none text-emerald-300/95 sm:text-xs">
          <span className="text-brand-highlight/90">&gt;</span>
          <span className="text-white/45">_</span>
        </p>
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute bottom-[5%] left-[6%] rounded-lg ${border} bg-gradient-to-br from-white/26 to-white/09 px-2 py-1.5 ${soft} sm:left-[7%] md:left-[8%]`}
        reduced={reduced}
        duration={7.8}
        delay={0.65}
        mode="drift"
      >
        <p className="font-mono text-[9px] leading-tight text-white/82 sm:text-[10px]">
          <span className="text-violet-200/90">const</span> <span className="text-sky-200/85">ship</span>
          <span className="text-white/38"> = </span>
          <span className="text-emerald-200/88">true</span>
        </p>
      </CssDecorMotion>

      <CssDecorMotion
        className="absolute bottom-[9%] left-[17%] hidden h-6 w-9 items-end justify-center gap-1 rounded-lg border border-white/36 bg-gradient-to-t from-white/2 to-white/14 pb-1 md:flex lg:left-[19%]"
        reduced={reduced}
        duration={5.4}
        delay={1.1}
        mode="bob"
      >
        <span className="h-[42%] w-1.5 rounded-sm bg-violet-300/88" />
        <span className="h-[68%] w-1.5 rounded-sm bg-sky-300/88" />
        <span className="h-[52%] w-1.5 rounded-sm bg-emerald-300/88" />
      </CssDecorMotion>

      {/* —— Right rail —— */}
      <CssDecorMotion
        className={`absolute right-[clamp(0.35rem,1.5vw,1rem)] top-[16%] origin-top-right scale-[0.72] sm:right-[clamp(0.75rem,2.5vw,1.75rem)] sm:top-[18%] sm:scale-[0.82] md:scale-[0.92] ${border} rounded-2xl bg-gradient-to-b from-white/38 to-white/15 ${soft}`}
        reduced={reduced}
        duration={9.5}
        delay={0.5}
        mode="drift"
      >
        <div className="flex gap-1 px-2.5 pt-2">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-300/90" />
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200/90" />
        </div>
        <div className="mx-2.5 mt-2 space-y-1 pb-2">
          <div className="h-1 rounded-full bg-white/48" />
          <div className="h-1 w-[68%] rounded-full bg-white/32" />
        </div>
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute right-[10%] top-[8%] flex h-8 min-w-[2.75rem] items-center justify-center rounded-full ${border} bg-gradient-to-r from-white/32 to-white/12 ${soft} font-mono text-xs font-semibold text-white/84 sm:right-[11%] md:right-[12%]`}
        reduced={reduced}
        duration={5.2}
        delay={0.25}
        mode="sway"
      >
        =&gt;
      </CssDecorMotion>

      <CssDecorMotion
        className="absolute right-[3.5%] top-[29%] flex gap-1.5 sm:right-[4%]"
        reduced={reduced}
        duration={3.6}
        delay={0}
        mode="twinkle"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/58" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/42" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/58" />
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute right-[clamp(0.35rem,1.75vw,1.1rem)] top-[41%] flex h-11 w-10 items-center justify-center rounded-xl ${border} bg-gradient-to-br from-white/32 to-white/12 ${soft} font-mono text-xs font-semibold text-white/78 sm:h-12 sm:w-11`}
        reduced={reduced}
        duration={7}
        delay={0.7}
        mode="float"
      >
        [ ]
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute right-[8%] top-[52%] flex h-10 w-10 items-center justify-center rounded-2xl ${border} bg-gradient-to-br from-white/36 to-white/14 ${soft} sm:right-[9%] sm:top-[50%] sm:h-11 sm:w-11 md:right-[10%]`}
        reduced={reduced}
        duration={8}
        delay={0.35}
        mode="bob"
      >
        <svg viewBox="0 0 48 48" className="h-5 w-5 text-white/90" fill="none" aria-hidden>
          <path
            d="M14 16l-8 8 8 8M34 16l8 8-8 8"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M22 34l4-20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute right-[4%] top-[68%] hidden items-center gap-1.5 rounded-lg ${border} bg-gradient-to-b from-white/28 to-white/12 px-2 py-1.5 ${soft} sm:flex md:right-[5.5%]`}
        reduced={reduced}
        duration={6.8}
        delay={0.9}
        mode="drift"
      >
        <span className="font-mono text-[10px] font-medium tracking-tight text-sky-200/88 sm:text-[11px]">
          ::
        </span>
        <span className="h-0.5 w-4 rounded-full bg-white/32" />
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute bottom-[17%] right-[clamp(0.35rem,1.75vw,1.1rem)] flex h-11 w-11 items-center justify-center rounded-xl ${border} bg-gradient-to-br from-violet-200/22 to-white/12 ${soft} font-mono text-base font-bold text-white/72 sm:h-12 sm:w-12 sm:text-lg`}
        reduced={reduced}
        duration={6}
        delay={0.15}
        mode="pulse"
      >
        #
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute bottom-[7%] right-[8%] flex h-10 w-10 items-center justify-center rounded-2xl ${border} bg-gradient-to-br from-white/34 to-white/12 ${soft} sm:right-[8.5%] sm:h-11 sm:w-11`}
        reduced={reduced}
        duration={10}
        delay={0.45}
        mode="sway"
      >
        <span className="text-lg leading-none text-white/82 sm:text-xl" aria-hidden>
          ⚙
        </span>
      </CssDecorMotion>

      <DonutDecor reduced={reduced} soft={soft} />

      {/* —— Wings —— */}
      <CssDecorMotion
        className={`absolute left-[21%] top-[7%] hidden rounded-xl ${border} bg-gradient-to-br from-white/24 to-white/09 px-2.5 py-2 ${soft} lg:block xl:left-[23%]`}
        reduced={reduced}
        duration={7.4}
        delay={1.2}
        mode="float"
      >
        <div className="flex gap-1">
          <span className="h-1 w-1 rounded-full bg-white/52" />
          <span className="h-1 w-1 rounded-full bg-white/38" />
        </div>
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute right-[18%] top-[6%] hidden rounded-lg ${border} bg-gradient-to-b from-white/28 to-white/08 px-2.5 py-1.5 ${soft} lg:block xl:right-[20%]`}
        reduced={reduced}
        duration={5.6}
        delay={0.55}
        mode="drift"
      >
        <span className="font-mono text-[11px] tracking-tight text-white/55">0x</span>
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute bottom-[12%] left-[25%] hidden rounded-full ${border} bg-white/18 px-2.5 py-1.5 ${soft} md:block lg:left-[27%]`}
        reduced={reduced}
        duration={4.5}
        delay={0.8}
        mode="pulse"
      >
        <span className="font-mono text-[11px] text-white/58">···</span>
      </CssDecorMotion>

      <CssDecorMotion
        className={`absolute bottom-[10%] right-[22%] hidden h-2.5 w-2.5 rounded-full ${border} bg-white/34 ${soft} md:block`}
        reduced={reduced}
        duration={3.8}
        delay={0.4}
        mode="twinkle"
      />
    </div>
  )
}

function DonutDecor({ reduced, soft }: { reduced: boolean; soft: string }) {
  return (
    <div
      className={`absolute bottom-[4%] right-[1.5%] hidden h-9 w-9 sm:block md:right-[2.5%] md:h-10 md:w-10 ${soft}${
        reduced ? '' : ' landing-loop landing-donut-bob'
      }`}
      style={reduced ? undefined : { animationDuration: '8s', animationDelay: '0.2s' }}
    >
      <div
        className="absolute inset-0 rounded-full border-[7px] border-white/36"
        style={{ boxShadow: '0 8px 22px -8px rgba(79,140,255,0.2)' }}
      />
      <div
        className={`absolute inset-0 rounded-full border-[7px] border-transparent border-t-pink-200/82 border-l-violet-200/70${
          reduced ? '' : ' landing-donut-ring'
        }`}
        style={reduced ? undefined : { animationDuration: '22s' }}
      />
      <div className="relative z-[1] flex h-full w-full items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-full bg-white/42 ring-1 ring-white/30" />
      </div>
    </div>
  )
}
