import { useMemo, useState } from "react";

// Learning companion rail. Right side in RTL.
// Reads as a quiet course companion — not a tree of files, not a console.
export function LearningSidebar({ chapters, currentLessonId, paletteClass }) {
    const initialExpanded = useMemo(() => {
        const map = {};
        for (const ch of chapters) {
            const containsCurrent = ch.lessons.some(l => l.id === currentLessonId);
            map[ch.id] = containsCurrent || ch.status === "active";
        }
        return map;
    }, [chapters, currentLessonId]);

    const [expanded, setExpanded] = useState(initialExpanded);

    const currentChapter = chapters.find(ch => ch.lessons.some(l => l.id === currentLessonId));
    const currentChapterIndex = currentChapter ? currentChapter.index : 1;

    return (
        <aside className="w-[23rem] shrink-0 bg-[rgba(9,10,16,0.45)] backdrop-blur-xl flex flex-col min-h-0 relative">
            {/* Soft inline-start hairline, kept ghostly so the rail feels like a column, not a panel */}
            <div aria-hidden="true" className="absolute inset-y-0 start-0 w-px bg-white/[0.04]" />

            <div className="px-8 pt-8 pb-7">
                <div className="text-[12px] text-ink-muted mb-2">מסלול הלימוד שלך</div>
                <div className="text-[18px] font-medium text-ink leading-[1.35]">פרקים ושיעורים</div>
                <div className="mt-3 flex items-baseline gap-2 text-[12px] text-ink-dim leading-[1.7]">
                    <span>אתה בפרק</span>
                    <span className="text-ink-muted tabular-nums">{currentChapterIndex}</span>
                    <span>מתוך</span>
                    <span className="text-ink-muted tabular-nums">{chapters.length}</span>
                </div>
            </div>

            {/* Hairline kept very light so it reads as breathing, not as a panel divider */}
            <div className="mx-8 h-px bg-white/[0.05]" />

            <nav
                className="flex-1 overflow-y-auto overflow-x-hidden learning-scroll px-4 py-5"
                aria-label="פרקי הקורס"
            >
                <div className="flex flex-col gap-1">
                    {chapters.map((chapter) => (
                        <ChapterGroup
                            key={chapter.id}
                            chapter={chapter}
                            currentLessonId={currentLessonId}
                            expanded={!!expanded[chapter.id]}
                            onToggle={() => setExpanded(s => ({ ...s, [chapter.id]: !s[chapter.id] }))}
                            paletteClass={paletteClass}
                        />
                    ))}
                </div>
            </nav>
        </aside>
    );
}

function ChapterGroup({ chapter, currentLessonId, expanded, onToggle, paletteClass }) {
    const isLocked = chapter.status === "locked";
    const isActive = chapter.lessons.some(l => l.id === currentLessonId);
    const accentText = paletteClass === "claude-code" ? "text-[#9099FB]" : "text-[#FBC25A]";
    const accent = paletteClass === "claude-code" ? "#7B82F5" : "#F9AE34";

    return (
        <div>
            <button
                type="button"
                onClick={onToggle}
                className="w-full px-4 py-3.5 rounded-xl flex items-start gap-3 hover:bg-white/[0.02] transition-colors duration-500 group text-start"
                aria-expanded={expanded}
            >
                <Chevron expanded={expanded} />
                <div className="flex flex-col min-w-0 flex-1 gap-1.5">
                    <div className="flex items-center gap-2">
                        <span className={`text-[11px] tracking-[0.04em] ${isLocked ? "text-ink-dim" : accentText}`}>
                            פרק {chapter.index}
                        </span>
                        {isLocked && <LockIcon />}
                    </div>
                    <span className={`text-[15px] leading-[1.5] ${isLocked ? "text-ink-muted" : "text-ink"}`}>
                        {chapter.title}
                    </span>
                    {chapter.summary && (
                        <span className={`text-[12.5px] leading-[1.75] ${isLocked ? "text-ink-dim" : "text-ink-muted"}`}>
                            {chapter.summary}
                        </span>
                    )}
                </div>
            </button>

            {expanded && (
                <div className="mt-1 mb-2 ms-7 ps-4">
                    {/* Institutional framing — surfaces only on the active chapter, italic + dim, breathing.
                        Quiet voice; never present on locked/upcoming chapters. */}
                    {isActive && chapter.mindsetShift && (
                        <div
                            className="mb-3 ps-3 py-1 text-[12.5px] leading-[1.85] text-ink-dim italic max-w-[28ch]"
                            style={{ boxShadow: `inset 2px 0 0 0 ${accent}33` }}
                        >
                            {chapter.mindsetShift}
                        </div>
                    )}

                    {/* No hard line. Soft inline-start spacing only — reads as indentation, not as a tree connector. */}
                    <ul className="flex flex-col gap-0.5">
                        {chapter.lessons.map(lesson => (
                            <LessonRow
                                key={lesson.id}
                                lesson={lesson}
                                active={lesson.id === currentLessonId}
                                paletteClass={paletteClass}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function LessonRow({ lesson, active, paletteClass }) {
    const stateClasses = active
        ? "bg-white/[0.035] text-ink"
        : lesson.status === "completed"
            ? "text-ink-muted hover:bg-white/[0.02]"
            : lesson.status === "locked"
                ? "text-ink-dim cursor-not-allowed"
                : "text-ink-muted hover:bg-white/[0.02]";

    return (
        <li>
            <button
                type="button"
                disabled={lesson.status === "locked"}
                className={`w-full px-3.5 py-3 rounded-lg flex items-center gap-3.5 text-start transition-colors duration-500 ${stateClasses}`}
                aria-current={active ? "true" : undefined}
            >
                <StateMark status={active ? "active" : lesson.status} paletteClass={paletteClass} />
                <span className="text-[13.5px] flex-1 truncate leading-[1.55]">
                    {lesson.title}
                </span>
                <span className="text-[11px] text-ink-dim tabular-nums shrink-0">
                    {lesson.duration}
                </span>
            </button>
        </li>
    );
}

function StateMark({ status, paletteClass }) {
    if (status === "completed") {
        const fill = paletteClass === "claude-code" ? "#6366F1" : "#F59E0B";
        return (
            <span
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${fill}22`, boxShadow: `0 0 8px ${fill}55` }}
            >
                <svg className="w-2 h-2" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.5l2.5 2.5 5-6" stroke={fill} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        );
    }
    if (status === "active") {
        const fill = paletteClass === "claude-code" ? "#7B82F5" : "#F9AE34";
        // Calm breathing — slow, steady, never twitchy. No reactive ping.
        return (
            <span className="relative w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0">
                <span
                    className="absolute inset-0 rounded-full lesson-active-breath"
                    style={{ background: `${fill}33` }}
                />
                <span
                    className="relative w-1.5 h-1.5 rounded-full"
                    style={{ background: fill, boxShadow: `0 0 10px ${fill}` }}
                />
            </span>
        );
    }
    if (status === "locked") {
        return (
            <span className="w-3.5 h-3.5 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <svg className="w-2 h-2 text-ink-dim" viewBox="0 0 12 12" fill="none">
                    <rect x="3" y="5.5" width="6" height="4.5" rx="1" stroke="currentColor" strokeWidth="1" />
                    <path d="M4.5 5.5V4a1.5 1.5 0 013 0v1.5" stroke="currentColor" strokeWidth="1" />
                </svg>
            </span>
        );
    }
    // upcoming
    return (
        <span className="w-3.5 h-3.5 rounded-full border border-white/[0.10] shrink-0" />
    );
}

function Chevron({ expanded }) {
    // In RTL, collapsed chevrons should point left (toward content flow start)
    return (
        <svg
            className={`w-3 h-3 mt-2 text-ink-dim transition-transform duration-500 ${expanded ? "rotate-90" : ""}`}
            viewBox="0 0 12 12"
            fill="none"
        >
            <path d="M7.5 3L4.5 6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg className="w-3 h-3 text-ink-dim" viewBox="0 0 12 12" fill="none">
            <rect x="3" y="5.5" width="6" height="4.5" rx="1" stroke="currentColor" strokeWidth="1" />
            <path d="M4.5 5.5V4a1.5 1.5 0 013 0v1.5" stroke="currentColor" strokeWidth="1" />
        </svg>
    );
}
