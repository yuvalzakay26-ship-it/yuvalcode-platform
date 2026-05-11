export function ModulePreview({ modules, identity }) {
    return (
        <section className="relative py-32 px-6 max-w-5xl mx-auto w-full border-t border-white/5">
            <div className="mb-24 text-center">
                <div className={`text-xs font-mono tracking-widest uppercase mb-4 ${identity.textAccent}`}>המעבדות</div>
                <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">מפרטים טכניים</h2>
                <p className="text-white/40 font-light text-lg">פירוט סביבות העבודה של המודולים.</p>
            </div>
            
            <div className="space-y-12">
                {modules.map((mod, i) => (
                    <div key={i} className="group p-10 border border-white/5 rounded-xl bg-black hover:bg-white/[0.01] hover:border-white/10 transition-colors flex flex-col md:flex-row gap-12">
                        {/* Dossier Meta */}
                        <div className="md:w-1/3 flex flex-col">
                            <div className={`text-xs font-mono uppercase tracking-[0.2em] mb-6 ${identity.textAccent}`}>{mod.objective}</div>
                            <h3 className="text-2xl font-medium text-white mb-4">{mod.title}</h3>
                            <p className="text-base text-white/50 font-light leading-relaxed">{mod.mindset}</p>
                        </div>
                        
                        {/* Dossier Workflow Visual (Terminal) */}
                        <div className="md:w-2/3">
                            <div className="bg-[#0A0A0A] p-8 rounded-lg border border-white/5 font-mono text-sm text-white/70 h-full flex flex-col justify-center shadow-2xl">
                                <div className="flex gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                </div>
                                <div className="text-white/30 mb-4">// ביצוע תהליך עבודה</div>
                                <pre className="whitespace-pre-wrap leading-loose">
                                    {mod.workflow}
                                </pre>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
