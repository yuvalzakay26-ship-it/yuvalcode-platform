import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpLeft } from "lucide-react";
import { cn } from "../lib/utils";

const COURSES = [
    {
        id: "claude-101",
        name: "Claude 101",
        description: "יסודות סביבות עבודה מבוססות AI",
        path: "/courses/claude-101",
        color: "amber",
        tag: "בסיס"
    },
    {
        id: "claude-code",
        name: "Claude Code",
        description: "מערכות הנדסיות בסביבת ייצור",
        path: "/courses/claude-code",
        color: "indigo",
        tag: "הנדסה"
    },
    {
        id: "cloud-systems",
        name: "Cloud Systems",
        description: "ארכיטקטורת תשתיות ופריסה",
        path: "/courses/cloud-systems",
        color: "sky",
        tag: "תשתיות",
        disabled: true
    },
    {
        id: "mat-systems",
        name: "MAT Systems",
        description: "סטנדרט טכני ויסודות הנדסה",
        path: "/exams",
        color: "emerald",
        tag: "ארכיטקטורה"
    }
];

const EASE = [0.16, 1, 0.3, 1];

export function LearningDropdown({ children, isActive }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={cn(
                "relative px-3.5 py-1.5 text-[13px] font-medium tracking-wide rounded-full group overflow-hidden cursor-pointer flex items-center gap-1",
                "motion-safe:transition-colors duration-[250ms]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                isActive || isHovered ? "text-ink" : "text-ink-muted hover:text-ink"
            )}>
                <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-white/[0.04] opacity-0 group-hover:opacity-100 rounded-full motion-safe:transition-opacity duration-[250ms]"
                    style={{ transitionTimingFunction: "var(--ease-premium)" }}
                />
                {isActive && (
                    <motion.span
                        aria-hidden="true"
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/[0.06]"
                        transition={{ duration: 0.4, ease: EASE }}
                    />
                )}
                <span className="relative z-10">{children}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 relative z-10 motion-safe:transition-transform duration-[400ms]", isHovered && "rotate-180")} style={{ transitionTimingFunction: "var(--ease-premium)" }} />
            </div>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="absolute top-full right-1/2 translate-x-1/2 pt-4 z-50 w-[600px]"
                        style={{ transformOrigin: "top center" }}
                    >
                        <div className="bg-background/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] rounded-2xl p-2 relative overflow-hidden">
                            {/* Ambient background glow */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 blur-[80px] pointer-events-none" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 blur-[80px] pointer-events-none" />
                            
                            <div className="relative z-10 p-4">
                                <h3 className="text-[11px] font-mono tracking-[0.2em] text-ink-dim uppercase mb-4 px-2">מסלולי למידה</h3>
                                
                                <div className="grid grid-cols-2 gap-2">
                                    {COURSES.map((course) => (
                                        course.disabled ? (
                                            <div key={course.id} className="p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] opacity-50 select-none">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-display font-medium text-[15px] tracking-wide text-ink">{course.name}</span>
                                                    <span className="text-[10px] font-mono border border-white/10 px-1.5 py-0.5 rounded text-ink-dim uppercase tracking-wider">בקרוב</span>
                                                </div>
                                                <p className="text-[13px] text-ink-muted leading-relaxed">{course.description}</p>
                                            </div>
                                        ) : (
                                            <Link 
                                                key={course.id} 
                                                to={course.path}
                                                className="group relative p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1] motion-safe:transition-[background-color,border-color] duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                            >
                                                {course.color === "amber" && <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/[0.03] opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />}
                                                {course.color === "indigo" && <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/[0.03] opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />}
                                                
                                                <div className="flex justify-between items-start mb-2 relative z-10">
                                                    <span className="font-display font-medium text-[15px] tracking-wide text-ink group-hover:text-white transition-colors">{course.name}</span>
                                                    <span className={cn(
                                                        "text-[10px] font-mono border px-1.5 py-0.5 rounded uppercase tracking-wider transition-colors",
                                                        course.color === "amber" ? "text-amber-400 border-amber-500/20 group-hover:border-amber-500/40 group-hover:bg-amber-500/10" :
                                                        course.color === "indigo" ? "text-indigo-400 border-indigo-500/20 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10" :
                                                        "text-ink-dim border-white/10"
                                                    )}>
                                                        {course.tag}
                                                    </span>
                                                </div>
                                                <p className="text-[13px] text-ink-muted leading-relaxed relative z-10 group-hover:text-ink/90 transition-colors">{course.description}</p>
                                                
                                                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <ArrowUpLeft className="w-4 h-4 text-ink-dim group-hover:text-white" />
                                                </div>
                                            </Link>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
