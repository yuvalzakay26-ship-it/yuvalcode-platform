// Per-phase blueprint. Each phase can optionally surface a quiet "what changes after this chapter"
// line — the same institutional voice the in-lesson ChapterOpener uses. When present, it carries
// the chapter as a stage of professional growth rather than a content group.
export function SystemsBlueprint({
    phases,
    identity,
    heading = "מסלול הלימוד",
    intro = "פרקים שבונים אותך — צעד אחר צעד.",
}) {
    return (
        <section className="relative py-32 px-6 max-w-6xl mx-auto w-full">
            <div className="mb-24 md:mb-32 flex flex-col items-start md:items-center md:text-center">
                <h2 className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight">{heading}</h2>
                <p className="text-white/45 font-light text-xl">{intro}</p>
            </div>

            <div className="relative">
                {/* Continuous Vertical Spine */}
                <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2" />

                <div className="space-y-24 md:space-y-32">
                    {phases.map((phase, i) => (
                        <div key={i} className="grid grid-cols-[48px_1fr] md:grid-cols-[1fr_120px_1fr] relative">

                            {/* Desktop Left: Title & Phase number */}
                            <div className="hidden md:flex flex-col items-end text-right pr-4 pt-1">
                                <div className={`text-[12px] tracking-[0.18em] mb-3 ${identity.textAccent}`}>
                                    פרק {i + 1}
                                </div>
                                <h3 className="text-2xl font-medium text-white">{phase.title}</h3>
                            </div>

                            {/* Center Spine Node */}
                            <div className="relative flex justify-center items-start">
                                <div className={`relative z-10 w-8 h-8 md:w-10 md:h-10 rounded border border-white/20 bg-background flex items-center justify-center shrink-0 ${identity.textAccent}`}>
                                    <div className="absolute inset-0 bg-current opacity-5 rounded" />
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-sm bg-current" style={{ boxShadow: '0 0 12px currentColor' }} />
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="flex flex-col pl-2 md:pl-0 md:pr-12">
                                {/* Mobile Header */}
                                <div className="md:hidden mb-6 pt-1">
                                    <div className={`text-[11px] tracking-[0.18em] mb-2 ${identity.textAccent}`}>
                                        פרק {i + 1}
                                    </div>
                                    <h3 className="text-xl font-medium text-white">{phase.title}</h3>
                                </div>

                                <p className="text-white/60 font-light leading-relaxed mb-6 text-[15px] md:text-lg max-w-xl">
                                    {phase.description}
                                </p>

                                {/* What changes after this chapter — quiet, italicized, never loud. */}
                                {phase.transformation && (
                                    <div className="mb-8 max-w-xl">
                                        <div className={`text-[11px] tracking-[0.18em] mb-2.5 ${identity.textAccent} opacity-70`}>
                                            אחרי הפרק
                                        </div>
                                        <p className="text-white/50 italic font-light leading-[1.95] text-[14.5px]">
                                            {phase.transformation}
                                        </p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                                    {phase.modules.map((mod, j) => (
                                        <div key={j} className="p-4 rounded border border-white/5 bg-white/[0.01] flex items-center gap-4 hover:border-white/10 transition-colors">
                                            <div className={`w-1.5 h-1.5 rounded-full ${identity.bgAccent} opacity-60 shrink-0`} />
                                            <span className="text-white/70 text-sm font-medium leading-tight">{mod}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
