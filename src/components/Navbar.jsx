import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Briefcase, Linkedin, ArrowUpLeft, Search } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";
import { YZMonogram } from "./ui/YZMonogram";
import { SITE, WORK_WITH_ME_PATH } from "../lib/constants";
import { SearchTrigger } from "./search/SearchTrigger";
import { useSearchOptional } from "../lib/search/SearchContext";
import { LearningDropdown } from "./LearningDropdown";

// Canonical premium curve — mirrors --ease-premium (CSS) and EASE token (motion.js).
const EASE = [0.16, 1, 0.3, 1];

const MOBILE_DRAWER_ID = "primary-mobile-drawer";

// Primary tracks — surface as top-level desktop nav at lg+. Order is the editorial spine.
// Hebrew-first for general routes, English preserved for the technical/brand tracks.
const PRIMARY_LINKS = [
    { name: "למידה", isDropdown: true },
    { name: "מוסד הלמידה", path: "/content" },
    { name: "AI", path: "/ai" },
    { name: "פרויקטים", path: "/projects" },
    { name: "כלים", path: "/stack" },
];

// Secondary surfaces — drawer-only. Logo already serves as the home affordance on desktop.
const SECONDARY_LINKS = [
    { name: "בית", path: "/" },
    { name: "מבחני מה״ט", path: "/exams" },
    { name: "אודות", path: "/about" },
    { name: "צור קשר", path: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const triggerRef = useRef(null);
    const drawerRef = useRef(null);
    const lastFocusedRef = useRef(null);
    const searchCtx = useSearchOptional();
    const reduced = useReducedMotion();

    // Hysteresis prevents the pill from flickering between states near the threshold.
    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled((prev) => (prev ? y > 12 : y > 28));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => setIsOpen(false), [location.pathname]);

    // Lock background scroll, ESC-to-close, focus trap, and focus restore
    useEffect(() => {
        if (!isOpen) return;

        lastFocusedRef.current = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const focusFirst = () => {
            const root = drawerRef.current;
            if (!root) return;
            const focusables = root.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (focusables.length > 0) focusables[0].focus();
        };
        const t = setTimeout(focusFirst, 50);

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                setIsOpen(false);
                return;
            }
            if (e.key !== "Tab") return;

            const root = drawerRef.current;
            if (!root) return;
            const focusables = Array.from(
                root.querySelectorAll(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
            ).filter((el) => !el.hasAttribute("disabled"));
            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            clearTimeout(t);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
            if (lastFocusedRef.current && lastFocusedRef.current.focus) {
                lastFocusedRef.current.focus();
            } else if (triggerRef.current) {
                triggerRef.current.focus();
            }
        };
    }, [isOpen]);

    const closeDrawer = useCallback(() => setIsOpen(false), []);

    return (
        <>
            <motion.nav
                initial={reduced ? false : { y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex justify-center motion-safe:transition-[padding] duration-[400ms]",
                    scrolled ? "pt-3" : "pt-5"
                )}
                style={{ transitionTimingFunction: "var(--ease-premium)" }}
                aria-label="ניווט ראשי"
            >
                <div
                    className={cn(
                        "relative flex items-center justify-between backdrop-blur-xl border",
                        "motion-safe:transition-[width,background-color,border-color,border-radius,padding,box-shadow] duration-[400ms]",
                        scrolled
                            ? "w-[94%] md:w-[86%] lg:w-[68%] xl:w-[58%] bg-background/85 border-white/[0.08] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.45)] rounded-full py-2 ps-3 pe-2"
                            : "w-[94%] md:w-[90%] lg:w-[82%] bg-background/55 border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] rounded-2xl py-3 px-5"
                    )}
                    style={{ transitionTimingFunction: "var(--ease-premium)" }}
                >
                    {/* Brand */}
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 group relative z-10 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        aria-label="Yuval Zakay — דף הבית"
                    >
                        <YZMonogram
                            size={scrolled ? 30 : 36}
                            className="motion-safe:transition-transform duration-[400ms] group-hover:scale-[1.04]"
                            style={{ transitionTimingFunction: "var(--ease-premium)" }}
                        />
                        <span
                            className={cn(
                                "font-display font-bold tracking-normal text-ink whitespace-nowrap motion-safe:transition-[font-size,opacity] duration-[400ms]",
                                scrolled ? "text-sm hidden sm:inline-block" : "text-base sm:text-lg inline-block"
                            )}
                            style={{ transitionTimingFunction: "var(--ease-premium)" }}
                        >
                            Yuval Zakay
                        </span>
                    </Link>

                    {/* Center nav — desktop only at lg+ */}
                    <div className="hidden lg:flex items-center gap-1 relative z-10">
                        {PRIMARY_LINKS.map((link) => (
                            link.isDropdown ? (
                                <LearningDropdown key="learning" isActive={location.pathname.startsWith('/courses')}>
                                    {link.name}
                                </LearningDropdown>
                            ) : (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    end={link.path === "/"}
                                    className={({ isActive }) =>
                                        cn(
                                            "relative px-3.5 py-1.5 text-[13px] font-medium tracking-wide rounded-full group overflow-hidden",
                                            "motion-safe:transition-colors duration-[250ms]",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                                            isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                                        )
                                    }
                                    style={{ transitionTimingFunction: "var(--ease-premium)" }}
                                >
                                    {({ isActive }) => (
                                        <>
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
                                            <span className="relative z-10" aria-current={isActive ? "page" : undefined}>{link.name}</span>
                                        </>
                                    )}
                                </NavLink>
                            )
                        ))}
                    </div>

                    {/* Right cluster (RTL end) */}
                    <div className={cn("flex items-center relative z-10 shrink-0", scrolled ? "gap-1.5" : "gap-2")}>
                        {/* Search at lg+ — keyboard hint doubles as a click affordance */}
                        {searchCtx && (
                            <div className="hidden lg:block">
                                <SearchTrigger scrolled={scrolled} />
                            </div>
                        )}

                        {/* LinkedIn — renders only when configured */}
                        {SITE.linkedinUrl && (
                            <a
                                href={SITE.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="פרופיל LinkedIn"
                                className={cn(
                                    "hidden lg:inline-flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-white/[0.05]",
                                    "motion-safe:transition-colors duration-[250ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                                    scrolled ? "h-8 w-8" : "h-9 w-9"
                                )}
                                style={{ transitionTimingFunction: "var(--ease-premium)" }}
                            >
                                <Linkedin className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden="true" />
                            </a>
                        )}

                        {/* Hairline divider between utility icons and primary CTA — only on desktop */}
                        <span aria-hidden="true" className="hidden lg:block w-px h-4 bg-white/[0.08] mx-0.5" />

                        {/* Recruiter CTA — persistent across every page on desktop */}
                        <Link
                            to={WORK_WITH_ME_PATH}
                            className="hidden lg:block group/cta focus-visible:outline-none"
                            aria-label="להעסיק אותי — שיתוף פעולה"
                        >
                            <span
                                className={cn(
                                    "relative inline-flex items-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide",
                                    "motion-safe:transition-[background-color,border-color,box-shadow,padding] duration-[250ms]",
                                    "border border-white/[0.08] bg-white/[0.04] text-ink",
                                    "group-hover/cta:border-white/[0.16] group-hover/cta:bg-white/[0.07]",
                                    "group-hover/cta:shadow-[0_8px_24px_-14px_rgba(99,102,241,0.55)]",
                                    "group-focus-visible/cta:ring-2 group-focus-visible/cta:ring-primary/40",
                                    scrolled ? "px-3.5 py-1.5 text-[12px]" : "px-4 py-2 text-[13px]"
                                )}
                                style={{ transitionTimingFunction: "var(--ease-premium)" }}
                            >
                                <Briefcase className="h-3.5 w-3.5 text-primary-300" strokeWidth={1.75} aria-hidden="true" />
                                <span>להעסיק אותי</span>
                                <ArrowUpLeft
                                    className="h-3 w-3 opacity-50 motion-safe:transition-[opacity,transform] duration-[250ms] group-hover/cta:opacity-100 group-hover/cta:-translate-y-0.5 group-hover/cta:-translate-x-0.5"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                    style={{ transitionTimingFunction: "var(--ease-premium)" }}
                                />
                            </span>
                        </Link>

                        {/* Mobile/tablet search trigger */}
                        {searchCtx && (
                            <button
                                type="button"
                                className="lg:hidden inline-flex items-center justify-center h-10 w-10 text-ink-muted hover:text-ink hover:bg-white/[0.05] rounded-full motion-safe:transition-colors duration-[250ms] focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                                onClick={() => searchCtx.open("navbar-mobile")}
                                aria-label="פתח חיפוש"
                                style={{ transitionTimingFunction: "var(--ease-premium)" }}
                            >
                                <Search className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                            </button>
                        )}

                        {/* Mobile/tablet hamburger */}
                        <button
                            ref={triggerRef}
                            type="button"
                            className="lg:hidden inline-flex items-center justify-center h-10 w-10 text-ink-muted hover:text-ink hover:bg-white/[0.05] rounded-full motion-safe:transition-colors duration-[250ms] focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                            onClick={() => setIsOpen(true)}
                            aria-label="פתח תפריט ניווט"
                            aria-expanded={isOpen}
                            aria-controls={MOBILE_DRAWER_ID}
                            aria-haspopup="dialog"
                            style={{ transitionTimingFunction: "var(--ease-premium)" }}
                        >
                            <Menu className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile/tablet drawer — active below lg */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            onClick={closeDrawer}
                            className="fixed inset-0 bg-black/65 backdrop-blur-xl z-40 lg:hidden"
                            aria-hidden="true"
                        />
                        <motion.div
                            id={MOBILE_DRAWER_ID}
                            ref={drawerRef}
                            role="dialog"
                            aria-modal="true"
                            aria-label="תפריט ניווט"
                            initial={reduced ? { opacity: 0 } : { x: "100%", opacity: 0 }}
                            animate={reduced ? { opacity: 1 } : { x: 0, opacity: 1 }}
                            exit={reduced ? { opacity: 0 } : { x: "100%", opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="fixed inset-y-0 right-0 z-50 lg:hidden flex flex-col w-[88%] max-w-sm bg-background/95 backdrop-blur-2xl border-e border-white/[0.08] px-6 pt-6 pb-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] overflow-hidden"
                        >
                            <div aria-hidden="true" className="absolute top-0 end-0 w-64 h-64 bg-primary/[0.07] blur-[110px] pointer-events-none" />
                            <div aria-hidden="true" className="absolute bottom-0 start-0 w-48 h-48 bg-secondary/[0.06] blur-[100px] pointer-events-none" />

                            {/* Drawer header */}
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-2.5">
                                    <YZMonogram size={32} />
                                    <span className="font-display font-bold text-sm text-ink tracking-normal">Yuval Zakay</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeDrawer}
                                    className="inline-flex items-center justify-center h-10 w-10 bg-white/[0.04] rounded-full hover:bg-white/[0.08] text-ink-muted hover:text-ink motion-safe:transition-colors duration-[250ms] border border-white/[0.06] focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                                    style={{ transitionTimingFunction: "var(--ease-premium)" }}
                                    aria-label="סגור תפריט"
                                >
                                    <X className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                                </button>
                            </div>

                            {/* Persistent recruiter CTA — editorial-tier glass instead of saturated funnel button */}
                            <Link
                                to={WORK_WITH_ME_PATH}
                                onClick={closeDrawer}
                                className="block mb-8 relative z-10 group/cta rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                aria-label="להעסיק אותי — שיתוף פעולה"
                            >
                                <span className="relative w-full inline-flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] motion-safe:transition-[background-color,border-color] duration-[250ms] group-hover/cta:bg-white/[0.06] group-hover/cta:border-white/[0.14] overflow-hidden"
                                      style={{ transitionTimingFunction: "var(--ease-premium)" }}
                                >
                                    <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                                    <span className="flex items-center gap-3">
                                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/[0.04] border border-white/[0.06]">
                                            <Briefcase className="h-4 w-4 text-primary-300" strokeWidth={1.75} aria-hidden="true" />
                                        </span>
                                        <span className="font-display font-semibold text-base text-ink tracking-normal">להעסיק אותי</span>
                                    </span>
                                    <ArrowUpLeft
                                        className="h-4 w-4 text-ink-muted opacity-60 motion-safe:transition-[opacity,transform] duration-[250ms] group-hover/cta:opacity-100 group-hover/cta:-translate-y-0.5 group-hover/cta:-translate-x-0.5"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                        style={{ transitionTimingFunction: "var(--ease-premium)" }}
                                    />
                                </span>
                            </Link>

                                <nav aria-label="ניווט מובייל" className="flex flex-col relative z-10">
                                    {/* Primary tracks — numbered, larger, the editorial spine */}
                                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim mb-3 ps-1">ניווט</p>
                                    <ul className="flex flex-col gap-1">
                                        {PRIMARY_LINKS.map((link, i) => (
                                            link.isDropdown ? (
                                                <li key="learning-mobile">
                                                    <div className="group/item flex flex-col min-h-[52px] px-4 py-3 rounded-xl border border-transparent bg-white/[0.02]">
                                                        <div className="flex items-center gap-4 mb-3">
                                                            <span aria-hidden="true" dir="ltr" className="font-mono text-[11px] text-ink-dim tabular-nums">
                                                                {String(i + 1).padStart(2, "0")}
                                                            </span>
                                                            <span className="tracking-normal text-lg font-medium text-ink">{link.name}</span>
                                                        </div>
                                                        <div className="flex flex-col gap-2 ps-8">
                                                            <NavLink to="/courses/claude-101" onClick={closeDrawer} className={({isActive}) => cn("text-[15px] transition-colors", isActive ? "text-amber-400" : "text-ink-muted hover:text-ink")}>
                                                                Claude 101
                                                            </NavLink>
                                                            <NavLink to="/courses/claude-code" onClick={closeDrawer} className={({isActive}) => cn("text-[15px] transition-colors", isActive ? "text-indigo-400" : "text-ink-muted hover:text-ink")}>
                                                                Claude Code
                                                            </NavLink>
                                                            <span className="text-[15px] text-ink-dim/50 cursor-not-allowed">
                                                                Cloud Systems
                                                            </span>
                                                            <span className="text-[15px] text-ink-dim/50 cursor-not-allowed">
                                                                MAT Systems
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ) : (
                                                <li key={link.path}>
                                                    <NavLink
                                                        to={link.path}
                                                        end={link.path === "/"}
                                                        onClick={closeDrawer}
                                                        className={({ isActive }) =>
                                                            cn(
                                                                "group/item flex items-center justify-between min-h-[52px] px-4 rounded-xl text-lg font-medium border border-transparent",
                                                                "motion-safe:transition-[background-color,border-color,color] duration-[250ms]",
                                                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                                                                isActive
                                                                    ? "bg-white/[0.05] text-ink border-white/[0.08]"
                                                                    : "text-ink-muted hover:text-ink hover:bg-white/[0.03]"
                                                            )
                                                        }
                                                        style={{ transitionTimingFunction: "var(--ease-premium)" }}
                                                    >
                                                        {({ isActive }) => (
                                                            <>
                                                                <span className="flex items-center gap-4" aria-current={isActive ? "page" : undefined}>
                                                                    <span aria-hidden="true" dir="ltr" className="font-mono text-[11px] text-ink-dim tabular-nums">
                                                                        {String(i + 1).padStart(2, "0")}
                                                                    </span>
                                                                    <span className="tracking-normal">{link.name}</span>
                                                                </span>
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={cn(
                                                                        "h-1.5 w-1.5 rounded-full motion-safe:transition-[background-color,opacity] duration-[250ms]",
                                                                        isActive
                                                                            ? "bg-primary opacity-100"
                                                                            : "bg-white/20 opacity-0 group-hover/item:opacity-60"
                                                                    )}
                                                                    style={{ transitionTimingFunction: "var(--ease-premium)" }}
                                                                />
                                                            </>
                                                        )}
                                                    </NavLink>
                                                </li>
                                            )
                                        ))}
                                    </ul>

                                {/* Hairline divider — gradient, subtler than a flat border */}
                                <div aria-hidden="true" className="hairline my-6 opacity-70" />

                                {/* Secondary surfaces — calmer mono register */}
                                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim mb-3 ps-1">עוד</p>
                                <ul className="flex flex-col gap-0.5">
                                    {SECONDARY_LINKS.map((link) => (
                                        <li key={link.path}>
                                            <NavLink
                                                to={link.path}
                                                end={link.path === "/"}
                                                onClick={closeDrawer}
                                                className={({ isActive }) =>
                                                    cn(
                                                        "flex items-center min-h-[44px] px-4 rounded-lg text-base font-medium",
                                                        "motion-safe:transition-colors duration-[250ms]",
                                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                                                        isActive
                                                            ? "text-ink bg-white/[0.04]"
                                                            : "text-ink-muted hover:text-ink hover:bg-white/[0.025]"
                                                    )
                                                }
                                                style={{ transitionTimingFunction: "var(--ease-premium)" }}
                                            >
                                                {({ isActive }) => (
                                                    <span className="tracking-normal" aria-current={isActive ? "page" : undefined}>{link.name}</span>
                                                )}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Drawer footer — socials */}
                            {(SITE.linkedinUrl || SITE.githubUrl) && (
                                <div className="mt-auto pt-6 relative z-10">
                                    <div aria-hidden="true" className="hairline mb-5 opacity-60" />
                                    <div className="flex items-center justify-between">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim ps-1">רשתות</p>
                                        <div className="flex items-center gap-2">
                                            {SITE.linkedinUrl && (
                                                <a
                                                    href={SITE.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="פרופיל LinkedIn"
                                                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/[0.03] border border-white/[0.06] text-ink-muted hover:text-ink hover:bg-white/[0.06] hover:border-white/[0.12] motion-safe:transition-colors duration-[250ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                                    style={{ transitionTimingFunction: "var(--ease-premium)" }}
                                                >
                                                    <Linkedin className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden="true" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
