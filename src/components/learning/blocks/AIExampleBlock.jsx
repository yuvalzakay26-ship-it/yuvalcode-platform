// Editorial "how Claude thinks" block.
// No heavy card frame — uses a soft ambient bloom + interior rhythm instead.
export function AIExampleBlock({ title, prompt, steps = [], paletteClass }) {
    const accent = paletteClass === "claude-code" ? "#7B82F5" : "#F9AE34";
    const glow   = paletteClass === "claude-code" ? "rgba(99,102,241,0.09)" : "rgba(245,158,11,0.09)";

    return (
        <section className="relative">
            {/* Ambient bloom — anchors the block visually without a hard border */}
            <div
                aria-hidden="true"
                className="absolute -inset-x-6 -inset-y-4 pointer-events-none"
                style={{
                    background: `radial-gradient(60% 70% at 90% 0%, ${glow}, transparent 65%)`,
                }}
            />

            <div className="relative">
                <div className="mb-6">
                    <span className="text-[12.5px] tracking-[0.04em]" style={{ color: accent }}>
                        ככה Claude חושב על הבעיה
                    </span>
                </div>

                <h3 className="text-[22px] lg:text-[25px] text-ink font-medium mb-8 leading-[1.32] max-w-[42ch]">
                    {title}
                </h3>

                {prompt && (
                    <div
                        className="mb-10 ps-6 pe-5 py-5 rounded-lg"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            boxShadow: `inset 2px 0 0 0 ${accent}80`,
                        }}
                    >
                        <div className="text-[12px] text-ink-muted mb-2">הבקשה שלך</div>
                        <div className="text-[16px] text-ink/90 leading-[1.9]">{prompt}</div>
                    </div>
                )}

                <ol className="flex flex-col gap-7">
                    {steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-5">
                            <span
                                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] tabular-nums mt-0.5"
                                style={{
                                    background: `${accent}14`,
                                    color: accent,
                                    border: `1px solid ${accent}30`,
                                }}
                            >
                                {i + 1}
                            </span>
                            <div className="flex-1 pt-0.5">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[13.5px] font-medium" style={{ color: accent }}>
                                        {step.label}
                                    </span>
                                    <span className="flex-1 h-px bg-white/[0.04]" />
                                </div>
                                <p className="text-[16px] text-ink/85 leading-[1.95] max-w-[54ch]">{step.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
