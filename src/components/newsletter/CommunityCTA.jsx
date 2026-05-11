import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Youtube, Users, Sparkles, ArrowUpRight } from "lucide-react";
import { SITE, WHATSAPP_LINK } from "../../lib/constants";
import { trackCta } from "../../lib/analytics";
import { cn } from "../../lib/utils";

const EASE = [0.16, 1, 0.3, 1];

/**
 * CommunityCTA — reusable cross-route community / subscribe block.
 *
 * Surfaces this on any page that wants the same retention pattern: subscribe,
 * join community (conditional), explore. Variants control density.
 *
 * The component is intentionally analytics-aware: each link emits a
 * `cta-click` event with the surface + destination so Phase 3 analytics can
 * attribute conversion to the section that surfaced it.
 */
export function CommunityCTA({
    surface = "(unknown)",
    variant = "stacked",
    eyebrow = "Join the journey",
    heading = "הצטרף לאקוסיסטם.",
    body = "ערוץ YouTube לתוכן השבועי, קהילה לדיון על AI ובנייה, ניוזלטר חודשי לסיכומים.",
    showCommunity = true,
    className,
}) {
    const reduced = useReducedMotion();
    const isInline = variant === "inline";

    const subscribeHref = SITE.youtubeSubscribeUrl;

    const onSubscribe = () => trackCta({ id: "subscribe-yt", surface, destination: subscribeHref });
    const onCommunity = () => trackCta({ id: "community-whatsapp", surface, destination: WHATSAPP_LINK });
    const onNewsletter = () => trackCta({ id: "newsletter-link", surface, destination: "/contact?subject=newsletter" });

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className={cn(
                "glass-panel-2 rounded-3xl p-6 md:p-8",
                className
            )}
        >
            <div className={cn(
                "flex gap-6",
                isInline ? "flex-col md:flex-row md:items-center md:justify-between" : "flex-col"
            )}>
                <div className="max-w-xl">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass-panel-1 text-[10px] font-mono uppercase tracking-[0.18em] text-ink-dim mb-3">
                        <Sparkles className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                        {eyebrow}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-ink tracking-normal mb-2">
                        {heading}
                    </h3>
                    {body && (
                        <p className="text-[13px] md:text-sm text-ink-muted leading-relaxed">
                            {body}
                        </p>
                    )}
                </div>

                <div className={cn(
                    "flex gap-2 flex-wrap",
                    isInline ? "shrink-0" : ""
                )}>
                    <a
                        href={subscribeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onSubscribe}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/90 text-white text-[13px] font-semibold tracking-wide hover:bg-red-600 transition-colors shadow-lg shadow-red-900/30"
                    >
                        <Youtube className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                        הירשם לערוץ
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-70" strokeWidth={2} aria-hidden="true" />
                    </a>

                    <Link
                        to="/contact?subject=newsletter"
                        onClick={onNewsletter}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-ink text-[13px] font-medium tracking-wide hover:bg-white/[0.08] hover:border-white/20 transition-colors"
                    >
                        <Sparkles className="h-4 w-4 text-primary-300" strokeWidth={1.75} aria-hidden="true" />
                        ניוזלטר
                    </Link>

                    {showCommunity && WHATSAPP_LINK && (
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onCommunity}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-400/25 text-emerald-200 text-[13px] font-medium tracking-wide hover:bg-emerald-500/25 transition-colors"
                        >
                            <Users className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                            קהילה
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-70" strokeWidth={2} aria-hidden="true" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
