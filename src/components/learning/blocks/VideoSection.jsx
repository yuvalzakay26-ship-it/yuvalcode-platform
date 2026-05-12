export function VideoSection({ title, duration, paletteClass }) {
    const glow = paletteClass === "claude-code" ? "rgba(99,102,241,0.18)" : "rgba(245,158,11,0.18)";
    const ring = paletteClass === "claude-code" ? "rgba(123,130,245,0.40)" : "rgba(249,174,52,0.40)";

    return (
        <section aria-label="סרטון השיעור">
            <div className="relative group">
                {/* Soft outer glow — the only ambient cue. No grid, no inset border. */}
                <div
                    aria-hidden="true"
                    className="absolute -inset-x-3 -inset-y-2 rounded-[1.75rem] opacity-60 blur-3xl pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at center, ${glow}, transparent 65%)` }}
                />

                <div
                    className="relative aspect-video rounded-2xl overflow-hidden bg-[#08090E]"
                    style={{
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(255,255,255,0.04)",
                    }}
                >
                    {/* Cinematic gradient backdrop — soft and quiet */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(ellipse at 50% 35%, ${glow} 0%, transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.015), transparent 35%)`,
                        }}
                    />

                    {/* Play surface */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            type="button"
                            className="relative w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-700 ease-out hover:scale-[1.04]"
                            style={{
                                background: "rgba(8,9,14,0.72)",
                                border: `1px solid ${ring}`,
                                boxShadow: `0 0 36px ${glow}, inset 0 0 0 1px rgba(255,255,255,0.03)`,
                            }}
                            aria-label="התחל את השיעור"
                        >
                            <svg className="w-7 h-7 ms-1 text-ink/95" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7L8 5z" />
                            </svg>
                        </button>
                    </div>

                    {/* Bottom metadata strip — quietly anchored, no harsh edges */}
                    <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-12 flex items-end justify-between bg-gradient-to-t from-black/65 via-black/25 to-transparent">
                        <div className="flex flex-col gap-1">
                            <span className="text-[12px] text-ink-muted">סרטון השיעור</span>
                            <span className="text-[15px] text-ink/95 font-medium leading-[1.4]">{title}</span>
                        </div>
                        {duration && (
                            <span className="text-[12px] tabular-nums text-ink-muted px-3 py-1 rounded-full bg-black/35 backdrop-blur-sm">
                                {duration}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
