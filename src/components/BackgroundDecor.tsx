/**
 * Static layered gradients only — animated + huge blur blobs are very expensive
 * (full-viewport repaints every frame). This keeps the same mood at lower cost.
 */
export function BackgroundDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 isolate overflow-hidden bg-lp-bg [transform:translateZ(0)]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,rgba(110,193,228,0.1),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_45%,rgba(179,136,255,0.07),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_0%_75%,rgba(255,140,60,0.045),transparent_48%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(147,51,234,0.035),transparent_45%)]" />

      {/* Soft orbs: modest blur + no motion = cheap vs blur-[100px] + Framer loop */}
      <div className="absolute -left-20 top-[18%] h-72 w-72 rounded-full bg-[rgba(110,193,228,0.07)] blur-3xl" />
      <div className="absolute -right-16 bottom-[20%] h-64 w-64 rounded-full bg-[rgba(179,136,255,0.08)] blur-3xl" />

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
