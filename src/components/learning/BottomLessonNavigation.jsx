// Page-turn navigation between lessons.
// In RTL, "previous" reads on the right, "next" reads on the left — natural Hebrew reading flow.
export function BottomLessonNavigation({ neighbors, chapterContext, paletteClass }) {
    const { prev, next, current, total } = neighbors;
    const accent = paletteClass === "claude-code" ? "#6366F1" : "#F59E0B";

    return (
        <footer className="relative z-20 h-[4.5rem] shrink-0 bg-[rgba(8,9,14,0.55)] backdrop-blur-2xl before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/[0.04]">
            <div className="h-full px-7 lg:px-10 flex items-center gap-5">
                {/* Right side in RTL = previous */}
                <NavCard
                    direction="prev"
                    lesson={prev}
                    accent={accent}
                />

                <div className="flex-1 flex flex-col items-center justify-center gap-0.5">
                    <div className="flex items-center gap-2 text-[12.5px] text-ink-muted">
                        <span>שיעור</span>
                        <span className="tabular-nums text-ink/90">{current}</span>
                        <span className="text-ink-dim">מתוך</span>
                        <span className="tabular-nums">{total}</span>
                    </div>
                    {/* Grounded chapter context — calm fact, never streak energy. */}
                    {chapterContext && (
                        <div className="hidden md:flex items-center gap-1.5 text-[11px] text-ink-dim">
                            <span>פרק {chapterContext.chapter.index}</span>
                            <span>·</span>
                            <span className="tabular-nums">
                                {chapterContext.lessonIndexInChapter} מתוך {chapterContext.lessonsInChapter}
                            </span>
                        </div>
                    )}
                </div>

                <NavCard
                    direction="next"
                    lesson={next}
                    accent={accent}
                />
            </div>
        </footer>
    );
}

function NavCard({ direction, lesson, accent }) {
    const label = direction === "prev" ? "השיעור הקודם" : "המשך לשיעור הבא";
    const disabled = !lesson;

    // RTL geometry: prev sits at the start (right), next at the end (left)
    const alignment = direction === "prev" ? "items-start text-start" : "items-end text-end";

    return (
        <button
            type="button"
            disabled={disabled}
            className={`group h-12 px-4 rounded-xl bg-transparent hover:bg-white/[0.025] transition-colors duration-500 flex items-center gap-3.5 min-w-[220px] max-w-[280px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
            style={!disabled ? { transition: "background-color 500ms cubic-bezier(0.16, 1, 0.3, 1)" } : undefined}
        >
            {direction === "prev" && <DirArrow side="prev" accent={accent} disabled={disabled} />}

            <div className={`flex-1 flex flex-col gap-1 ${alignment} min-w-0`}>
                <span className="text-[11.5px] text-ink-muted">{label}</span>
                <span className="text-[13.5px] text-ink/90 truncate w-full leading-[1.4]">
                    {lesson ? lesson.title : "סיימת — זה היה השיעור האחרון"}
                </span>
            </div>

            {direction === "next" && <DirArrow side="next" accent={accent} disabled={disabled} />}
        </button>
    );
}

function DirArrow({ side, accent, disabled }) {
    // RTL meaning:
    //   prev (right side, going back)  → arrow points RIGHT
    //   next (left side, going forward) → arrow points LEFT
    const path = side === "prev"
        ? "M14 5l7 7-7 7M21 12H3"
        : "M10 19l-7-7 7-7M3 12h18";

    return (
        <svg
            className="w-4 h-4 shrink-0 transition-colors duration-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke={disabled ? "currentColor" : accent}
            strokeWidth="1.6"
            style={{ color: disabled ? undefined : "currentColor" }}
        >
            <path d={path} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
