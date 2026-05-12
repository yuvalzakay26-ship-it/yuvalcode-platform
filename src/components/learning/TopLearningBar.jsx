import { Link } from "react-router-dom";

// Calm editorial header for the learning experience.
// Reads as a quiet course identity strip, not a system console.
export function TopLearningBar({ course, lesson, progress, paletteClass }) {
    const accentText = `text-${paletteClass}-300`;
    const accentDot  = paletteClass === "claude-code" ? "bg-[#7B82F5]" : "bg-[#F9AE34]";

    return (
        <header className="relative z-20 h-16 shrink-0 bg-[rgba(8,9,14,0.55)] backdrop-blur-2xl after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/[0.04]">
            <div className="h-full px-7 lg:px-9 flex items-center gap-6">
                {/* Right cluster (first in RTL DOM order = visually right) */}
                <div className="flex items-center gap-5 min-w-0">
                    <Link
                        to={`/courses/${course.slug}`}
                        className="group flex items-center gap-2 text-ink-muted hover:text-ink transition-colors duration-500"
                        aria-label="חזרה לעמוד הקורס"
                    >
                        {/* In RTL, a back arrow points right */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7M21 12H3" />
                        </svg>
                        <span className="text-[13px] hidden sm:inline">חזרה לקורס</span>
                    </Link>

                    <div className="w-px h-5 bg-white/10" />

                    {/* Course identity */}
                    <div className="flex items-center gap-3 min-w-0">
                        <div
                            className={`w-2 h-2 rounded-full ${accentDot}`}
                            style={{ boxShadow: paletteClass === "claude-code" ? "0 0 10px rgba(99,102,241,0.55)" : "0 0 10px rgba(245,158,11,0.55)" }}
                        />
                        <div className="min-w-0 flex items-baseline gap-2.5">
                            <span className="text-[15px] font-medium text-ink truncate">{course.title}</span>
                            <span className="text-ink-dim hidden sm:inline">·</span>
                            <span className="text-[13px] text-ink-muted truncate hidden sm:inline">{course.subtitle}</span>
                        </div>
                    </div>
                </div>

                {/* Center — current lesson, presented as an editorial breadcrumb, not a console pill */}
                <div className="hidden md:flex flex-1 items-center justify-center min-w-0">
                    <div className="flex items-center gap-3 min-w-0 max-w-[560px]">
                        <span className={`text-[12px] ${accentText}`}>{lesson.eyebrow}</span>
                        <span className="text-ink-dim">—</span>
                        <span className="text-[13px] text-ink/90 truncate">{lesson.title}</span>
                    </div>
                </div>

                {/* Left cluster (last in DOM = visually left) — gentle progress + institution mark */}
                <div className="flex items-center gap-5 ms-auto md:ms-0">
                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-[12px] text-ink-muted">ההתקדמות שלך</span>
                        <div className="w-36 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                            <div
                                className={`h-full ${paletteClass === "claude-code" ? "bg-[#6366F1]" : "bg-[#F59E0B]"} transition-all duration-700 ease-out`}
                                style={{
                                    width: `${progress.percent}%`,
                                    boxShadow: paletteClass === "claude-code" ? "0 0 10px rgba(99,102,241,0.45)" : "0 0 10px rgba(245,158,11,0.45)",
                                }}
                            />
                        </div>
                        <span className="text-[12px] text-ink-muted tabular-nums">
                            {progress.completed} מתוך {progress.total}
                        </span>
                    </div>

                    {/* Institutional signature — quiet, deliberate, never branded.
                        The mark sits at the edge of the bar like a publisher's imprint
                        on the inside cover of a book — present, not loud. */}
                    <div className="hidden lg:flex items-center gap-2.5 text-[11.5px]">
                        <span className="text-ink-muted">YuvalCode</span>
                        <span
                            aria-hidden="true"
                            className="inline-block w-[3px] h-[3px] rounded-full bg-ink-dim/60"
                        />
                        <span className="text-ink-dim tracking-[0.04em]">המכון ללמידת AI</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
