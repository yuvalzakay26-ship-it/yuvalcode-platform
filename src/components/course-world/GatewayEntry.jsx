import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function GatewayEntry({ targetUrl, identity, ctaText = "התחל למידה" }) {
    const [isInitializing, setIsInitializing] = useState(false);
    const navigate = useNavigate();

    const handleEntry = () => {
        setIsInitializing(true);
        // Lock scroll immediately
        document.body.style.overflow = 'hidden';
        
        // 0.9s Airlock transition
        setTimeout(() => {
            if (targetUrl.startsWith('/')) {
                navigate(targetUrl);
                setIsInitializing(false); // Reset state for internal navigation
            } else {
                window.location.href = targetUrl;
            }
            // Restore scroll slightly after redirect logic in case they navigate back
            setTimeout(() => { document.body.style.overflow = ''; }, 500);
        }, 900);
    };

    return (
        <>
            <section id="gateway-entry" className="relative py-48 px-6 flex flex-col items-center justify-center text-center border-t border-white/5 bg-gradient-to-t from-black via-background to-background">
                <div className={`mb-8 w-px h-16 bg-gradient-to-b from-transparent to-${identity.borderAccent.replace('border-', '')} opacity-50`} />
                <h2 className="text-4xl font-medium text-white mb-12">מוכן לאתחול?</h2>
                
                <button 
                    onClick={handleEntry}
                    className={`px-14 py-6 rounded bg-transparent border border-white/20 hover:bg-white/[0.03] transition-all duration-500 text-white font-medium tracking-[0.15em] uppercase text-sm ${identity.borderAccentHover}`}
                >
                    {ctaText}
                </button>
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
                            {/* Restrained Loading Reticle */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className={`w-16 h-16 border-t-2 border-r-2 rounded-full mb-10 border-white/20`}
                                style={{ borderTopColor: 'currentColor', color: 'var(--tw-colors-indigo-400)' }} // Fallback if tailwind struggles with dynamic borders
                            >
                                <div className={`w-full h-full rounded-full border-t-2 border-transparent ${identity.borderAccent}`} />
                            </motion.div>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`font-mono text-xs tracking-[0.3em] uppercase ${identity.textAccent}`}
                            >
                                מאתחל סביבת עבודה...
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
