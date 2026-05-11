import { motion } from "framer-motion";

export function CourseHero({ title, subtitle, identity, ctaText }) {
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
                {/* Institutional Badge */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className={`mb-8 px-4 py-1.5 rounded-full border border-white/10 text-xs tracking-[0.2em] uppercase ${identity.textAccent} bg-white/[0.01] backdrop-blur-md`}
                >
                    סביבת למידה הנדסית
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tight text-white mb-10 leading-tight">
                    {title}
                </h1>
                
                <p className="text-lg md:text-2xl text-white/50 max-w-2xl font-light leading-relaxed mb-20">
                    {subtitle}
                </p>
                
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
