import { useState, useEffect } from "react";

export function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        window.scrollTo({
            top: 0,
            behavior: reduced ? "auto" : "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="חזרה לראש העמוד"
            className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-tr from-primary to-secondary text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100 z-50 box-glow border border-white/20 backdrop-blur-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                aria-hidden="true"
                className="w-7 h-7 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 transition-transform motion-reduce:transition-none drop-shadow-md"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
            </svg>
        </button>
    );
}
