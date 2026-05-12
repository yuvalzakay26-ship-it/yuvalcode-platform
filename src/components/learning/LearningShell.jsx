import { TopLearningBar } from "./TopLearningBar";
import { LearningSidebar } from "./LearningSidebar";
import { LessonViewport } from "./LessonViewport";
import { BottomLessonNavigation } from "./BottomLessonNavigation";

// Hebrew-first Core Learning Shell.
// RTL is inherited from the document root — we do NOT override direction here.
// In RTL flex-row, the first child sits on the right; that's where the sidebar belongs.
export function LearningShell({ course, chapters, lesson, neighbors, progress, chapterContext, paletteClass = "claude-code" }) {
    return (
        <div className="learning-shell h-screen w-screen overflow-hidden flex flex-col bg-[#06070B] text-ink selection:bg-white/10 font-sans">
            {/* Ambient cinematic backdrop — single source of glow. Soft, ambient, never busy. */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-0"
                style={{
                    background: paletteClass === "claude-code"
                        ? "radial-gradient(1200px 700px at 88% -8%, rgba(99,102,241,0.085), transparent 62%), radial-gradient(1000px 600px at -5% 112%, rgba(67,56,202,0.06), transparent 65%)"
                        : "radial-gradient(1200px 700px at 88% -8%, rgba(245,158,11,0.085), transparent 62%), radial-gradient(1000px 600px at -5% 112%, rgba(180,83,9,0.06), transparent 65%)",
                }}
            />

            {/* Deep secondary layer — felt depth, not noticed effect.
                A near-imperceptible far-away wash so the surface has atmosphere,
                like standing in a softly lit room rather than against a flat black wall. */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-0"
                style={{
                    background:
                        "radial-gradient(1800px 1100px at 50% 60%, rgba(255,255,255,0.018), transparent 70%)",
                    mixBlendMode: "screen",
                }}
            />

            {/* Subtle film-grain texture — visual softness that catches the eye like paper, not glass.
                Kept at very low opacity; reads as warmth, not as noise. */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "3px 3px",
                    mixBlendMode: "overlay",
                }}
            />

            <TopLearningBar
                course={course}
                lesson={lesson}
                progress={progress}
                paletteClass={paletteClass}
            />

            <div className="relative z-10 flex-1 flex min-h-0">
                {/* In RTL, the first flex child renders on the right — sidebar lives there by design. */}
                <LearningSidebar
                    chapters={chapters}
                    currentLessonId={lesson.id}
                    paletteClass={paletteClass}
                />

                <LessonViewport
                    course={course}
                    lesson={lesson}
                    chapterContext={chapterContext}
                    paletteClass={paletteClass}
                />
            </div>

            <BottomLessonNavigation
                neighbors={neighbors}
                chapterContext={chapterContext}
                paletteClass={paletteClass}
            />
        </div>
    );
}
