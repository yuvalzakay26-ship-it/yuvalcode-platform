import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CourseWorldLayout } from "../../components/course-world/CourseWorldLayout";

const CLAUDE_101_IDENTITY = {
    id: "claude-101",
    theme: "amber-gold",
    baseBg: "bg-black",
    glowColor: "bg-amber-900/20",
    textAccent: "text-amber-400",
    bgAccent: "bg-amber-500",
    borderAccent: "border-amber-500",
    borderAccentHover: "hover:border-amber-500/50",
};

export function Claude101AccessHub() {
    const [isInitializing, setIsInitializing] = useState(false);

    const handleEntry = (targetUrl) => {
        setIsInitializing(true);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            window.location.href = targetUrl;
            setTimeout(() => { document.body.style.overflow = ''; }, 500);
        }, 900);
    };

    const accessCards = [
        {
            id: "presentations",
            title: "מצגות הקורס",
            features: ["מצגות הקורס", "מערכי שיעור", "מבנה הלמידה"],
            ctaText: "היכנס למצגות",
            targetUrl: "https://claude-101-production.vercel.app/",
            status: "active",
        },
        {
            id: "videos",
            title: "מערך וידאו",
            features: ["סרטוני הסבר", "Walkthroughs", "Implementation clips"],
            ctaText: "בקרוב",
            targetUrl: null,
            status: "locked",
        },
        {
            id: "resources",
            title: "משאבים וכלים",
            features: ["סיכומים", "GitHub", "כלים ומערכות AI"],
            ctaText: "בקרוב",
            targetUrl: null,
            status: "locked",
        }
    ];

    return (
        <CourseWorldLayout identity={CLAUDE_101_IDENTITY}>
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl w-full flex flex-col items-center z-10 text-center mb-16 md:mb-24"
                >
                    <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
                        Claude 101
                    </h1>
                    <p className="text-lg md:text-xl text-white/50 font-light tracking-wide">
                        גישה למערכות הלמידה
                    </p>
                </motion.div>

                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
                    {accessCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative flex flex-col p-10 rounded border border-white/10 bg-white/[0.01] backdrop-blur-md group ${
                                card.status === 'active' 
                                    ? `hover:bg-white/[0.03] hover:border-amber-500/30` 
                                    : ''
                            } transition-all duration-700`}
                        >
                            {card.status === 'active' && (
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                            )}
                            
                            <h3 className="text-2xl font-medium text-white mb-10">
                                {card.title}
                            </h3>

                            <ul className="flex flex-col gap-5 mb-16 flex-grow">
                                {card.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-4 text-white/60 text-[15px] font-light">
                                        <div className={`w-1 h-1 rounded-full ${card.status === 'active' ? CLAUDE_101_IDENTITY.bgAccent : 'bg-white/20'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {card.status === 'active' ? (
                                <button 
                                    onClick={() => handleEntry(card.targetUrl)}
                                    className={`mt-auto w-full py-5 rounded bg-transparent border border-white/20 hover:bg-white/[0.03] transition-all duration-500 text-white font-medium tracking-[0.15em] uppercase text-sm ${CLAUDE_101_IDENTITY.borderAccentHover}`}
                                >
                                    {card.ctaText}
                                </button>
                            ) : (
                                <div className="mt-auto w-full py-5 rounded bg-white/[0.02] border border-white/5 text-white/30 font-medium tracking-[0.15em] uppercase text-sm text-center cursor-not-allowed">
                                    {card.ctaText}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            <AnimatePresence>
                {isInitializing && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
                    >
                        <div className="flex flex-col items-center">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border-t-2 border-r-2 rounded-full mb-10 border-white/20"
                                style={{ borderTopColor: 'currentColor', color: 'var(--tw-colors-amber-500, #f59e0b)' }} 
                            >
                                <div className={`w-full h-full rounded-full border-t-2 border-transparent ${CLAUDE_101_IDENTITY.borderAccent}`} />
                            </motion.div>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`font-mono text-xs tracking-[0.3em] uppercase ${CLAUDE_101_IDENTITY.textAccent}`}
                            >
                                מאתחל סביבת עבודה...
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CourseWorldLayout>
    );
}
