// Editorial Hebrew typography. Long-form reading rhythm; no tight tracking
// (Hebrew letterforms lose legibility under negative tracking).
export function ProseBlock({ title, paragraphs = [] }) {
    return (
        <section className="lesson-prose">
            {title && (
                <h2 className="text-[1.7rem] lg:text-[1.95rem] leading-[1.28] font-medium text-ink mb-7 max-w-[34ch]">
                    {title}
                </h2>
            )}
            <div className="flex flex-col gap-6 max-w-[62ch]">
                {paragraphs.map((p, i) => (
                    <p key={i} className="text-[17.5px] leading-[2.0] text-ink/88">
                        {p}
                    </p>
                ))}
            </div>
        </section>
    );
}
