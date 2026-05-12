export function BuildOutcomes({ outcomes, identity }) {
    return (
        <section className="relative py-32 px-6 max-w-6xl mx-auto w-full border-t border-white/5">
            <div className="mb-20 text-center">
                <div className={`text-[12px] tracking-[0.18em] mb-4 ${identity.textAccent}`}>מה תיקח איתך</div>
                <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">פרויקטים שתיצא איתם מהקורס</h2>
                <p className="text-white/45 font-light text-lg">לא רק תאוריה — דברים אמיתיים שעבדת עליהם בעצמך.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {outcomes.map((outcome, i) => (
                    <div key={i} className="group p-10 rounded-xl border border-white/5 bg-black hover:bg-white/[0.02] hover:border-white/10 transition-all duration-500 flex flex-col">
                        <h3 className="text-2xl font-medium text-white mb-4">{outcome.title}</h3>
                        <p className="text-white/50 font-light leading-relaxed mb-12 flex-grow text-lg">
                            {outcome.description}
                        </p>
                        <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-[12px] tracking-[0.14em]">
                            <span className="text-white/40">{outcome.stack}</span>
                            <span className={identity.textAccent}>{outcome.type}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
