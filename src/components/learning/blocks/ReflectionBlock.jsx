// A calm pause — not a quiz, not an exercise, not a card.
// The learner is invited to think; nothing is graded, nothing is submitted.
// Visual register: invitation. Open space, no accent bar, no border, no button.
//
// Shape:
//   { type: "reflection", eyebrow?, questions: string[], note? }
export function ReflectionBlock({ eyebrow = "רגע למחשבה", questions = [], note, paletteClass }) {
    const accent = paletteClass === "claude-code" ? "#7B82F5" : "#F9AE34";

    if (!questions.length) return null;

    return (
        <section className="py-4" aria-label="עצירה למחשבה">
            <div
                className="text-[12px] tracking-[0.04em] mb-5"
                style={{ color: accent }}
            >
                {eyebrow}
            </div>

            <ol className="flex flex-col gap-5 max-w-[58ch]">
                {questions.map((q, i) => (
                    <li
                        key={i}
                        className="flex items-baseline gap-3 text-[17px] lg:text-[18px] leading-[1.85] text-ink/80"
                    >
                        <span
                            aria-hidden="true"
                            className="shrink-0 w-2 h-2 rounded-full translate-y-[10px]"
                            style={{ background: `${accent}55`, boxShadow: `0 0 6px ${accent}33` }}
                        />
                        <span>{q}</span>
                    </li>
                ))}
            </ol>

            {note && (
                <p className="mt-7 text-[14px] leading-[1.9] text-ink-dim italic max-w-[58ch]">
                    {note}
                </p>
            )}
        </section>
    );
}
