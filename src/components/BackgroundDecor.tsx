import { motion } from 'framer-motion'

export function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-lp-bg" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,rgba(110,193,228,0.11),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_45%,rgba(179,136,255,0.09),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_0%_75%,rgba(255,140,60,0.05),transparent_48%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(147,51,234,0.04),transparent_45%)]" />

      <motion.div
        className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[rgba(110,193,228,0.09)] blur-[100px]"
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-24 bottom-1/4 h-[380px] w-[380px] rounded-full bg-[rgba(179,136,255,0.1)] blur-[100px]"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  )
}
