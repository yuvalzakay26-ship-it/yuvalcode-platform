export function LearningPhilosophy({ content }) {
    return (
        <section className="relative py-40 px-6 max-w-4xl mx-auto w-full text-center border-t border-white/5">
            <h2 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-16">שיטת הלמידה</h2>
            
            <div className="space-y-12 text-2xl md:text-3xl font-light leading-relaxed text-white/80">
                {content.map((paragraph, i) => (
                    <p key={i} className={i === 0 ? "text-white font-medium" : "text-white/60"}>
                        {paragraph}
                    </p>
                ))}
            </div>
        </section>
    );
}
