// Editorial preview of an actual lesson — not a fake terminal, not "engineering shell".
// The right column previews exactly the kind of editorial block a learner will meet
// inside the lesson viewport: a workflow walkthrough with a delicate vertical spine,
// or, when given a string, a quiet inline code fragment without cinematic chrome.
export function ModulePreview({
    modules,
    identity,
    heading = "ככה נראה שיעור מבפנים",
    intro = "טעימה אמיתית מהמבט שתפגוש בתוך השיעור — לא צילום מסך מבונה, אלא חתיכה אחת אמיתית מתוך החומר.",
    eyebrow = "טעימה",
}) {
    return (
        <section className="relative py-32 px-6 max-w-5xl mx-auto w-full border-t border-white/5">
            <div className="mb-24 text-center">
                <div className={`text-[12px] tracking-[0.18em] mb-4 ${identity.textAccent}`}>{eyebrow}</div>
                <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">{heading}</h2>
                <p className="text-white/45 font-light text-lg max-w-2xl mx-auto leading-relaxed">{intro}</p>
            </div>

            <div className="space-y-16">
                {modules.map((mod, i) => (
                    <article
                        key={i}
                        className="p-10 border border-white/[0.06] rounded-xl bg-black/40 hover:border-white/10 transition-colors flex flex-col md:flex-row gap-12"
                    >
                        {/* Mindset column */}
                        <div className="md:w-[38%] flex flex-col">
                            <div className={`text-[12px] tracking-[0.18em] mb-6 ${identity.textAccent}`}>
                                {mod.objective}
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-5 leading-snug">
                                {mod.title}
                            </h3>
                            <p className="text-[15.5px] text-white/55 font-light leading-[2.0]">
                                {mod.mindset}
                            </p>
                        </div>

                        {/* Lesson-shape preview column */}
                        <div className="md:w-[62%] md:border-r md:border-white/[0.06] md:pr-12">
                            <LessonShapePreview
                                preview={mod.preview || mod.workflow}
                                identity={identity}
                            />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

// Renders an editorial fragment that mirrors the in-lesson block types.
// Accepts either:
//   - { kind: "workflow", title?, stages: [{ label, description }] }
//   - { kind: "callout",  title?, body }
//   - a legacy string (renders as quiet inline code, no cinematic chrome)
function LessonShapePreview({ preview, identity }) {
    if (!preview) return null;

    if (typeof preview === "string") {
        return <QuietCode code={preview} />;
    }

    if (preview.kind === "callout") {
        return <CalloutShape title={preview.title} body={preview.body} identity={identity} />;
    }

    // default to workflow
    return (
        <WorkflowShape
            title={preview.title}
            stages={preview.stages || []}
            identity={identity}
        />
    );
}

function WorkflowShape({ title, stages, identity }) {
    // Match the in-lesson WorkflowBlock voice — vertical spine, soft markers.
    const accentColor = identity.theme === "amber-gold" ? "#F9AE34" : "#7B82F5";

    return (
        <section>
            {title && (
                <div className="mb-7">
                    <div
                        className="text-[12px] tracking-[0.04em] mb-2"
                        style={{ color: accentColor }}
                    >
                        ככה זה עובד בפועל
                    </div>
                    <h4 className="text-[19px] text-white font-medium leading-[1.32]">
                        {title}
                    </h4>
                </div>
            )}

            <ol className="flex flex-col">
                {stages.map((stage, i) => {
                    const isLast = i === stages.length - 1;
                    return (
                        <li key={i} className="relative flex items-start gap-5 pb-7 last:pb-0">
                            {!isLast && (
                                <span
                                    aria-hidden="true"
                                    className="absolute top-7 bottom-0 w-px"
                                    style={{
                                        background: `linear-gradient(180deg, ${accentColor}55, ${accentColor}10 80%, transparent)`,
                                        insetInlineStart: "0.75rem",
                                    }}
                                />
                            )}

                            <span
                                className="relative shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                                style={{
                                    background: `${accentColor}14`,
                                    border: `1px solid ${accentColor}40`,
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}AA` }}
                                />
                            </span>

                            <div className="flex-1 pt-0">
                                <div className="flex items-baseline gap-3 mb-1.5">
                                    <span className="text-[15.5px] text-white font-medium">
                                        {stage.label}
                                    </span>
                                    <span className="text-[10.5px] tabular-nums text-white/40">
                                        שלב {i + 1}
                                    </span>
                                </div>
                                <p className="text-[14.5px] leading-[1.9] text-white/55">
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

function CalloutShape({ title, body, identity }) {
    const accentColor = identity.theme === "amber-gold" ? "#F9AE34" : "#7B82F5";

    return (
        <div
            className="ps-5 py-1"
            style={{ boxShadow: `inset 2px 0 0 0 ${accentColor}55` }}
        >
            {title && (
                <div className="text-[15.5px] text-white font-medium mb-2">{title}</div>
            )}
            <p className="text-[14.5px] leading-[2.0] text-white/55">{body}</p>
        </div>
    );
}

// Quiet inline code — no traffic-light dots, no terminal chrome, no [OK]/[SUCCESS] theatrics.
// Just monospace on a calm surface, the way code appears inside the lesson viewport itself.
function QuietCode({ code }) {
    return (
        <pre
            className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-6 font-mono text-[13px] leading-[1.95] text-white/70 whitespace-pre-wrap overflow-x-auto"
            dir="ltr"
        >
            {code}
        </pre>
    );
}
