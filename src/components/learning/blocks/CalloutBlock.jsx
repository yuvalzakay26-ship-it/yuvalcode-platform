// Soft editorial aside — used for insights and next-step hints inside a lesson.
// No surrounding card. Just a thin accent bar and breathing room.
export function CalloutBlock({ title, body, tone = "insight", paletteClass }) {
    const accent = paletteClass === "claude-code" ? "#7B82F5" : "#F9AE34";
    const label =
        tone === "next"     ? "בשיעור הבא" :
        tone === "practice" ? "תרגול קצר" :
        tone === "warning"  ? "שווה לשים לב" :
                              "תובנה חשובה";

    return (
        <aside
            className="relative ps-7 pe-2 py-2"
            style={{
                // Accent bar on the inline-start edge (right in RTL) — direction-agnostic via box-shadow.
                boxShadow: `inset 3px 0 0 0 ${accent}`,
            }}
        >
            <div className="flex items-center gap-3 mb-3">
                <span className="text-[12.5px] font-medium tracking-[0.02em]" style={{ color: accent }}>
                    {label}
                </span>
            </div>
            {title && <h4 className="text-[17px] font-medium text-ink mb-2.5 leading-[1.45]">{title}</h4>}
            <p className="text-[16px] leading-[1.95] text-ink-muted max-w-[58ch]">{body}</p>
        </aside>
    );
}
