// Editorial workflow walkthrough.
// Uses a delicate vertical spine instead of a hard outer card.
export function WorkflowBlock({ title, stages = [], paletteClass }) {
    const accent = paletteClass === "claude-code" ? "#7B82F5" : "#F9AE34";

    return (
        <section>
            {title && (
                <div className="mb-9 max-w-[42ch]">
                    <div className="text-[12.5px] tracking-[0.04em] mb-2.5" style={{ color: accent }}>
                        ככה זה עובד בפועל
                    </div>
                    <h3 className="text-[22px] lg:text-[25px] text-ink font-medium leading-[1.32]">
                        {title}
                    </h3>
                </div>
            )}

            <ol className="flex flex-col">
                {stages.map((stage, i) => {
                    const isLast = i === stages.length - 1;
                    return (
                        <li key={i} className="relative flex items-start gap-6 pb-10 last:pb-0">
                            {/* Vertical spine connecting steps — replaces the outer card frame */}
                            {!isLast && (
                                <span
                                    aria-hidden="true"
                                    className="absolute top-8 bottom-0 w-px"
                                    style={{
                                        background: `linear-gradient(180deg, ${accent}55, ${accent}10 80%, transparent)`,
                                        // Centre under the marker (3.5 = w-7/2). RTL-safe via inset-inline-start.
                                        insetInlineStart: "0.875rem",
                                    }}
                                />
                            )}

                            <span
                                className="relative shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                                style={{
                                    background: `${accent}14`,
                                    border: `1px solid ${accent}40`,
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ background: accent, boxShadow: `0 0 8px ${accent}AA` }}
                                />
                            </span>

                            <div className="flex-1 pt-0.5">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-[16.5px] text-ink font-medium">
                                        {stage.label}
                                    </span>
                                    <span className="text-[11px] tabular-nums text-ink-dim">
                                        שלב {i + 1}
                                    </span>
                                </div>
                                <p className="text-[15.5px] leading-[1.95] text-ink-muted max-w-[56ch]">
                                    {stage.description}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}
