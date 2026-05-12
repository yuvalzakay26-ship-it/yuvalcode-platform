// Continuity callback — a quiet remembering of prior material,
// surfaced when the current lesson genuinely builds on what came before.
// Not a callout. No box. Reads like the teacher pausing to gather what's already known.
//
// Shape:
//   { type: "recap", eyebrow?, body: string, reference?: { lessonTitle, chapterTitle } }
export function RecapBlock({ eyebrow = "מה כבר ראית", body, reference, paletteClass }) {
    const accent = paletteClass === "claude-code" ? "#7B82F5" : "#F9AE34";

    if (!body) return null;

    return (
        <section className="py-2" aria-label="המשך מהחומר הקודם">
            <div
                aria-hidden="true"
                className="mb-7 h-px w-12"
                style={{ background: `linear-gradient(90deg, ${accent}55, transparent)` }}
            />

            <div
                className="text-[12px] tracking-[0.04em] mb-3"
                style={{ color: accent }}
            >
                {eyebrow}
            </div>

            <p className="text-[16px] leading-[2.0] text-ink-muted/95 max-w-[58ch]">
                {body}
            </p>

            {reference && (
                <div className="mt-4 text-[12.5px] text-ink-dim leading-[1.7] max-w-[58ch]">
                    {reference.chapterTitle && (
                        <span>{reference.chapterTitle}</span>
                    )}
                    {reference.chapterTitle && reference.lessonTitle && (
                        <span className="mx-2">·</span>
                    )}
                    {reference.lessonTitle && (
                        <span>{reference.lessonTitle}</span>
                    )}
                </div>
            )}
        </section>
    );
}
