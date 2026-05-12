import { motion } from "framer-motion";

// Institutional welcome — quiet, deliberate, grounded.
// The hero answers, in the calmest voice we have: what this course teaches,
// who it's for, why it matters, and how to study it. No spectacle, no init language.
export function CourseHero({
    title,
    subtitle,
    identity,
    ctaText,
    eyebrow = "YUVALCODE · המכון",
    openingStatement,
}) {
    const scrollToGateway = () => {
        const gateway = document.getElementById('gateway-entry');
        if (gateway) {
            gateway.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-40 md:pt-48 pb-24 px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl mx-auto flex flex-col items-center z-10"
            >
                {/* Institutional locator — quiet, never decorative */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className={`mb-10 text-[11px] tracking-[0.22em] uppercase ${identity.textAccent}`}
                >
                    {eyebrow}
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tight text-white mb-8 leading-tight">
                    {title}
                </h1>

                <p className="text-lg md:text-2xl text-white/55 max-w-2xl font-light leading-relaxed mb-16">
                    {subtitle}
                </p>

                {openingStatement && openingStatement.length > 0 && (
                    <OpeningStatement
                        statements={openingStatement}
                        identity={identity}
                    />
                )}

                <button
                    onClick={scrollToGateway}
                    className={`px-10 py-5 rounded bg-transparent border border-white/10 hover:bg-white/[0.02] transition-all duration-500 text-white font-medium tracking-widest uppercase text-sm ${identity.borderAccentHover}`}
                >
                    {ctaText}
                </button>
            </motion.div>
        </section>
    );
}

// Calm framing block — stacked sentences that answer (without announcing the question)
// what this course intends, who it serves, and how it's meant to be studied.
// Restrained typography on purpose; this should feel read, not seen.
function OpeningStatement({ statements, identity }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.1 }}
            className="max-w-2xl mb-20 text-right md:text-center"
        >
            <div className={`mx-auto mb-10 h-px w-16 ${identity.bgAccent} opacity-30`} />

            <div className="space-y-6">
                {statements.map((line, i) => (
                    <p
                        key={i}
                        className={`text-[16.5px] md:text-[17px] leading-[2.05] ${i === 0 ? "text-white/85" : "text-white/55"}`}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </motion.div>
    );
}
