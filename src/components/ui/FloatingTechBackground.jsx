import { useEffect, useRef, useState } from "react";
import { Code2, Cpu, Bot, Database, Globe, Terminal, Brackets, Hash, Laptop, FileCode, GitBranch } from "lucide-react";

// Custom Data Structure Icons
const ArrayIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6V18" /><path d="M20 6V18" />
        <rect x="6" y="8" width="4" height="8" rx="1" />
        <rect x="10" y="8" width="4" height="8" rx="1" />
        <rect x="14" y="8" width="4" height="8" rx="1" />
    </svg>
);

const StackIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19h16" />
        <path d="M4 15h16" />
        <path d="M4 11h16" />
        <path d="M5 21V9h14v12" />
    </svg>
);

const QueueIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v12h-16z" />
        <path d="M9 6v12" />
        <path d="M14 6v12" />
        <path d="M22 12h-2m-16 0h-2" />
    </svg>
);

const LinkedListIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="8" width="5" height="8" rx="1" />
        <path d="M7 12h3" />
        <path d="M8.5 10.5l1.5 1.5-1.5 1.5" />
        <rect x="10" y="8" width="5" height="8" rx="1" />
        <path d="M15 12h3" />
        <path d="M16.5 10.5l1.5 1.5-1.5 1.5" />
        <rect x="18" y="8" width="4" height="8" rx="1" />
    </svg>
);

const BinaryTreeIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4" r="2.5" />
        <path d="M12 6.5L7 11" />
        <path d="M12 6.5L17 11" />
        <circle cx="7" cy="12" r="2.5" />
        <circle cx="17" cy="12" r="2.5" />
        <path d="M7 14.5L4.5 18" />
        <path d="M7 14.5L9.5 18" />
        <path d="M17 14.5L14.5 18" />
        <path d="M17 14.5L19.5 18" />
        <circle cx="4.5" cy="19" r="1.5" />
        <circle cx="9.5" cy="19" r="1.5" />
        <circle cx="14.5" cy="19" r="1.5" />
        <circle cx="19.5" cy="19" r="1.5" />
    </svg>
);

const icons = [
    Code2, Cpu, Bot, Database, Globe, Terminal, Brackets, Hash, Laptop, FileCode, GitBranch,
    ArrayIcon, StackIcon, QueueIcon, LinkedListIcon, BinaryTreeIcon
];

const texts = [
    "const future = 'AI';",
    "console.log('YuvalCode');",
    "while(alive) { learn(); }",
    "<div>Fullstack Dev</div>",
    "if (bug) fix();",
    "import { Knowledge } from 'life';",
    "git commit -m 'Success'",
    "return true;",
    "C# && .NET",
    "System.Out.WriteLine();",
    "using System;",
    "print('Python');",
    "<div>HTML5</div>",
    ".css { display: grid; }",
    "const react = useState(true);",
    "npm install everything"
];

/**
 * Decorative atmospheric background. Renders nothing on:
 *   - prefers-reduced-motion
 *   - coarse-pointer / mobile devices
 *   - when the page is hidden (visibilitychange)
 *   - when the host element is offscreen (IntersectionObserver)
 *
 * Mobile default count is reduced to keep paint cost in check.
 */
export function FloatingTechBackground({ iconOpacity = 0.3, textOpacity = 0.5, count }) {
    const containerRef = useRef(null);
    const [enabled, setEnabled] = useState(false);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const coarse = window.matchMedia("(pointer: coarse)").matches;
        if (reduced || coarse) {
            setEnabled(false);
            return;
        }
        setEnabled(true);

        const handleVisibility = () => {
            setPaused(document.visibilityState === "hidden");
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    useEffect(() => {
        if (!enabled || !containerRef.current) return;
        const el = containerRef.current;
        if (typeof IntersectionObserver === "undefined") return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setPaused(true);
                } else {
                    // resume only if tab is visible
                    setPaused(document.visibilityState === "hidden");
                }
            },
            { threshold: 0 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [enabled]);

    if (!enabled) return null;

    const iconCount = count ?? 12;
    const animationPlayState = paused ? "paused" : "running";

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        >
            {[...Array(iconCount)].map((_, i) => {
                const Icon = icons[i % icons.length];
                const left = (i * 7) % 100 + ((i * 13) % 5);
                const size = 30 + ((i * 11) % 30);
                const duration = 20 + ((i * 7) % 20);
                const delay = -(i * 2);

                return (
                    <div
                        key={`icon-${i}`}
                        className="absolute text-white animate-float-up"
                        style={{
                            left: `${left}%`,
                            width: size,
                            height: size,
                            opacity: iconOpacity,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                            animationPlayState,
                        }}
                    >
                        <Icon size={size} />
                    </div>
                );
            })}

            {texts.map((text, i) => {
                const left = (i * 10) % 80 + 10;
                const duration = 25 + ((i * 9) % 25);
                const delay = -(i * 5);

                return (
                    <div
                        key={`text-${i}`}
                        className="absolute text-white font-mono text-sm whitespace-nowrap font-bold animate-float-up"
                        style={{
                            left: `${left}%`,
                            opacity: textOpacity,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                            animationPlayState,
                        }}
                    >
                        {text}
                    </div>
                );
            })}
        </div>
    );
}
