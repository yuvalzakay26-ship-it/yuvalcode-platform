import { VideoSection } from "./blocks/VideoSection";
import { ProseBlock } from "./blocks/ProseBlock";
import { AIExampleBlock } from "./blocks/AIExampleBlock";
import { WorkflowBlock } from "./blocks/WorkflowBlock";
import { CodeBlock } from "./blocks/CodeBlock";
import { CalloutBlock } from "./blocks/CalloutBlock";
import { ReflectionBlock } from "./blocks/ReflectionBlock";
import { RecapBlock } from "./blocks/RecapBlock";

// Editorial rhythm system.
// "Section" blocks (video / ai-example / workflow / code / titled prose) open a new movement
// and earn a full breath of space. "Bridge" prose (no title) flows into the previous block,
// so it reads as continuation, not as a new section start.
function isBridgeBlock(block) {
    return block.type === "prose" && !block.title;
}
function isCalloutBlock(block) {
    return block.type === "callout";
}

function getTopRhythm(block, prev) {
    if (!prev) return 0;
    if (isBridgeBlock(block))       return "1.75rem";
    if (isCalloutBlock(prev))       return "2.5rem";
    if (isCalloutBlock(block))      return "2.25rem";
    return "4.5rem";
}

export function LessonViewport({ course, lesson, chapterContext, paletteClass }) {
    return (
        <main className="flex-1 min-w-0 overflow-y-auto learning-scroll relative">
            <div className="mx-auto max-w-[46rem] px-8 lg:px-16 py-16 lg:py-24">
                {/* Course preface — appears once, only on the very first lesson of the course. */}
                {chapterContext?.isFirstLessonOfCourse && course?.preface && (
                    <CoursePreface course={course} paletteClass={paletteClass} />
                )}

                {/* Chapter opener — appears on the first lesson of every chapter. */}
                {chapterContext?.isFirstLessonOfChapter && (
                    <ChapterOpener chapter={chapterContext.chapter} paletteClass={paletteClass} />
                )}

                <LessonHeader lesson={lesson} paletteClass={paletteClass} />

                <div className="flex flex-col">
                    {lesson.blocks.map((block, i) => {
                        const prev = i > 0 ? lesson.blocks[i - 1] : null;
                        return (
                            <div
                                key={i}
                                className="lesson-block"
                                style={{ paddingTop: getTopRhythm(block, prev) }}
                            >
                                <BlockRenderer block={block} paletteClass={paletteClass} />
                            </div>
                        );
                    })}
                </div>

                <LessonEndStrip lesson={lesson} paletteClass={paletteClass} />
            </div>
        </main>
    );
}

// Quiet, deliberate preface that frames the entire course as a journey.
// Appears only once: on the very first lesson of the course.
function CoursePreface({ course, paletteClass }) {
    const accent = paletteClass === "claude-code" ? "#7B82F5" : "#F9AE34";

    return (
        <section className="mb-14 lg:mb-20" aria-label="פתיחה לקורס">
            <div className="flex items-baseline gap-3 mb-5">
                <span className="text-[11px] tracking-[0.18em] text-ink-dim">YUVALCODE</span>
                <span className="text-ink-dim">·</span>
                <span className="text-[11px] tracking-[0.18em] text-ink-dim">המכון</span>
            </div>
            <div
                className="ps-5"
                style={{ boxShadow: `inset 2px 0 0 0 ${accent}55` }}
            >
                <p className="text-[18px] lg:text-[19px] leading-[1.95] text-ink/90 max-w-[52ch]">
                    {course.preface}
                </p>
            </div>
        </section>
    );
}

// Institutional chapter opener — 5-part educational framing.
// Calm title → orienting context → mindset/real-world framing → "by the end" line → reassurance.
// Each part is optional so the data layer can grow into it.
function ChapterOpener({ chapter, paletteClass }) {
    const accent = paletteClass === "claude-code" ? "text-[#9099FB]" : "text-[#FBC25A]";

    return (
        <section className="mb-14 lg:mb-20" aria-label={`פתיחת ${chapter.title}`}>
            <div className={`text-[12px] tracking-[0.18em] mb-3 ${accent}`}>
                פתיחת פרק <span className="tabular-nums">{chapter.index}</span>
            </div>
            <h2 className="text-[1.5rem] lg:text-[1.7rem] leading-[1.3] font-medium text-ink mb-7 max-w-[28ch]">
                {chapter.title}
            </h2>

            {chapter.context && (
                <p className="text-[16.5px] leading-[2.0] text-ink/85 max-w-[56ch] mb-6">
                    {chapter.context}
                </p>
            )}

            {chapter.mindsetShift && (
                <p className="text-[15.5px] leading-[1.95] text-ink-muted italic max-w-[56ch] mb-2">
                    {chapter.mindsetShift}
                </p>
            )}

            {chapter.professionalFrame && (
                <div className="mt-8 max-w-[56ch]">
                    <div className={`text-[11px] tracking-[0.18em] mb-2 ${accent}`}>
                        עד סוף הפרק
                    </div>
                    <p className="text-[16px] leading-[1.95] text-ink-muted">
                        {chapter.professionalFrame}
                    </p>
                </div>
            )}

            {chapter.reassurance && (
                <p className="mt-8 text-[14px] leading-[1.9] text-ink-dim italic max-w-[56ch]">
                    {chapter.reassurance}
                </p>
            )}

            <div className="mt-10 h-px w-24 bg-white/[0.08]" />
        </section>
    );
}

function LessonHeader({ lesson, paletteClass }) {
    const accent = paletteClass === "claude-code" ? "text-[#9099FB]" : "text-[#FBC25A]";
    const dot    = paletteClass === "claude-code" ? "#7B82F5" : "#F9AE34";

    return (
        <header className="mb-16 lg:mb-24">
            {lesson.chapterTitle && (
                <div className="mb-5 text-[12.5px] text-ink-dim leading-[1.7]">
                    {lesson.chapterTitle}
                </div>
            )}

            <div className="flex items-center gap-3 mb-7">
                <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: dot, boxShadow: `0 0 12px ${dot}AA` }}
                />
                <span className={`text-[12px] tracking-[0.04em] ${accent}`}>{lesson.eyebrow}</span>
                {lesson.duration && (
                    <>
                        <span className="text-ink-dim">·</span>
                        <span className="text-[12px] text-ink-muted tabular-nums">{lesson.duration} זמן צפייה</span>
                    </>
                )}
            </div>

            <h1 className="lesson-h1 text-[2.35rem] lg:text-[2.85rem] leading-[1.18] font-medium text-ink mb-7">
                {lesson.title}
            </h1>

            {lesson.objective && (
                <p className="lesson-objective text-[17px] lg:text-[18px] leading-[1.95] text-ink-muted max-w-[58ch]">
                    <span className="text-ink-dim">בשיעור הזה תלמד — </span>
                    {lesson.objective}
                </p>
            )}

            {lesson.openingNote && (
                <p className="mt-5 text-[14.5px] leading-[1.95] text-ink-dim italic max-w-[58ch]">
                    {lesson.openingNote}
                </p>
            )}

            {/* Soft editorial divider — separates header from the lesson body */}
            <div className="mt-12 h-px w-24 bg-white/[0.08]" />
        </header>
    );
}

function LessonEndStrip({ lesson, paletteClass }) {
    const accent = paletteClass === "claude-code" ? "#7B82F5" : "#F9AE34";

    return (
        <div className="mt-28 lg:mt-32 flex flex-col items-start gap-4">
            <div
                className="h-px w-16"
                style={{ background: `linear-gradient(90deg, ${accent}80, transparent)` }}
            />
            <div className="text-[14px] text-ink-muted leading-[1.95] max-w-[58ch]">
                סיימת את השיעור הזה. אפשר להמשיך בקצב שלך — אין שום מירוץ, ואין שום מה לפספס.
                {lesson.closingNote && (
                    <span className="block mt-1.5 text-[13.5px] text-ink-dim italic">
                        {lesson.closingNote}
                    </span>
                )}
            </div>
            <div className="mt-1 flex items-center gap-3 text-[12px] text-ink-dim">
                <span>{lesson.eyebrow}</span>
                {lesson.chapterTitle && (
                    <>
                        <span>·</span>
                        <span>{lesson.chapterTitle}</span>
                    </>
                )}
            </div>
        </div>
    );
}

function BlockRenderer({ block, paletteClass }) {
    switch (block.type) {
        case "video":      return <VideoSection      {...block} paletteClass={paletteClass} />;
        case "prose":      return <ProseBlock        {...block} />;
        case "ai-example": return <AIExampleBlock    {...block} paletteClass={paletteClass} />;
        case "workflow":   return <WorkflowBlock     {...block} paletteClass={paletteClass} />;
        case "code":       return <CodeBlock         {...block} paletteClass={paletteClass} />;
        case "callout":    return <CalloutBlock      {...block} paletteClass={paletteClass} />;
        case "reflection": return <ReflectionBlock   {...block} paletteClass={paletteClass} />;
        case "recap":      return <RecapBlock        {...block} paletteClass={paletteClass} />;
        default: return null;
    }
}
