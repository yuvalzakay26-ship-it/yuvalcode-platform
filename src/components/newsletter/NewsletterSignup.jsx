import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import {
    SEGMENT_OPTIONS,
    SEGMENTS,
    isValidEmail,
    isProviderConfigured,
    getActiveProvider,
    subscribeToNewsletter,
} from "../../lib/newsletter";
import {
    trackNewsletterIntent,
    trackNewsletterResult,
} from "../../lib/analytics";
import { cn } from "../../lib/utils";

const EASE = [0.16, 1, 0.3, 1];

/**
 * NewsletterSignup — premium reusable signup form.
 *
 * Variants:
 *   "card"    — full glass-panel-2 block (used in CTASection / footer-style placements)
 *   "inline"  — compact horizontal row (used inside the home CTA / page footers)
 *   "minimal" — stripped-down email + button (used in tight footer placements)
 *
 * The component never blocks the UI — it always renders, and gracefully
 * degrades to a "deferred" mode that links to /contact?subject=newsletter
 * when no provider is configured. That preserves audience intent without
 * shipping a fake success state.
 */
export function NewsletterSignup({
    variant = "card",
    surface = "(unknown)",
    eyebrow = "Newsletter",
    title = "סיכום חודשי, בלי ספאם.",
    description = "מה למדתי החודש על Claude Code, AI agents, Obsidian, ובניית מערכות בפומבי.",
    showSegments = false,
    className,
}) {
    const reduced = useReducedMotion();
    const inputId = useId();
    const segmentsId = useId();
    const provider = getActiveProvider();
    const configured = isProviderConfigured();

    const [email, setEmail] = useState("");
    const [segments, setSegments] = useState([SEGMENTS.GENERAL]);
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");

    // Emit a "showed" intent only the first time a particular surface mounts —
    // avoids inflating analytics on long pages with the form repeated.
    useEffect(() => {
        trackNewsletterIntent({ surface });
    }, [surface]);

    const onToggleSegment = (id) => {
        setSegments((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (status === "loading") return;

        if (!isValidEmail(email)) {
            setStatus("error");
            setMessage("נא להזין כתובת אימייל תקינה.");
            return;
        }

        setStatus("loading");
        setMessage("");

        const result = await subscribeToNewsletter({
            email,
            segments,
            surface,
        });

        if (result.status === "success") {
            setStatus("success");
            setMessage("נרשמת. נשלח לך אישור במייל.");
            trackNewsletterResult({ status: "success", surface });
            return;
        }

        if (result.status === "deferred") {
            setStatus("deferred");
            setMessage(result.message || "ניוזלטר בדרך — נמשיך דרך טופס הקשר.");
            trackNewsletterResult({ status: "submit", surface });
            return;
        }

        setStatus("error");
        setMessage(result.message || "תקלה. נסה שוב.");
        trackNewsletterResult({ status: "error", surface });
    };

    const isCard = variant === "card";
    const isMinimal = variant === "minimal";

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className={cn(
                isCard ? "glass-panel-2 rounded-3xl p-6 md:p-8" : "",
                isMinimal ? "" : "",
                className
            )}
        >
            {!isMinimal && (
                <div className="mb-5">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass-panel-1 text-[10px] font-mono uppercase tracking-[0.18em] text-ink-dim mb-3">
                        <Mail className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                        {eyebrow}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-ink tracking-normal mb-2">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-[13px] md:text-sm text-ink-muted leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            )}

            <form onSubmit={onSubmit} aria-describedby={`${inputId}-status`} noValidate>
                <div className={cn(
                    "flex gap-2",
                    isMinimal ? "" : "flex-col sm:flex-row"
                )}>
                    <label htmlFor={inputId} className="sr-only">כתובת אימייל</label>
                    <input
                        id={inputId}
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        autoComplete="email"
                        spellCheck={false}
                        dir="ltr"
                        className={cn(
                            "flex-1 px-4 py-2.5 rounded-xl text-[14px] text-ink placeholder:text-ink-dim",
                            "bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-primary/40",
                            "focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                        )}
                        aria-invalid={status === "error"}
                    />
                    <Button
                        type="submit"
                        size="default"
                        variant="primary"
                        disabled={status === "loading"}
                        className="shrink-0"
                    >
                        <span className="flex items-center gap-2">
                            {status === "loading" ? "שולח…" : "הצטרף"}
                            <ArrowRight className="h-4 w-4 rtl:rotate-180" strokeWidth={2} aria-hidden="true" />
                        </span>
                    </Button>
                </div>

                {showSegments && !isMinimal && (
                    <fieldset className="mt-4">
                        <legend id={segmentsId} className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-dim mb-2">
                            בחר נושאים
                        </legend>
                        <div className="flex flex-wrap gap-1.5" aria-labelledby={segmentsId}>
                            {SEGMENT_OPTIONS.map((opt) => {
                                const active = segments.includes(opt.id);
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => onToggleSegment(opt.id)}
                                        aria-pressed={active}
                                        className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] tracking-wide border transition-all",
                                            active
                                                ? "border-primary/40 bg-primary/15 text-ink"
                                                : "border-white/10 bg-white/[0.03] text-ink-muted hover:text-ink hover:border-white/20"
                                        )}
                                        title={opt.description}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>
                )}

                <div
                    id={`${inputId}-status`}
                    role="status"
                    aria-live="polite"
                    className="min-h-[1.25rem] mt-3 text-[12px] flex items-center gap-1.5"
                >
                    {status === "success" && (
                        <span className="flex items-center gap-1.5 text-emerald-300">
                            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                            {message}
                        </span>
                    )}
                    {status === "error" && (
                        <span className="flex items-center gap-1.5 text-rose-300">
                            <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                            {message}
                        </span>
                    )}
                    {status === "deferred" && (
                        <Link
                            to="/contact?subject=newsletter"
                            className="text-ink-muted hover:text-ink underline-offset-4 hover:underline"
                        >
                            {message || "המשך לטופס הקשר"}
                        </Link>
                    )}
                </div>

                {!configured && status === "idle" && (
                    <p className="mt-2 text-[11px] text-ink-dim leading-relaxed">
                        נרשם זמני · {provider === "deferred" ? "ניוזלטר עתידי" : "לא מוגדר"}
                    </p>
                )}
            </form>
        </motion.div>
    );
}
