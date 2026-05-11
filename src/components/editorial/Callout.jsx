import { Info, AlertTriangle, Lightbulb, Sparkles, GitCommit } from "lucide-react";
import { cn } from "../../lib/utils";

const VARIANTS = {
    note: {
        icon: Info,
        eyebrow: "Note",
        accent: "rgb(129 140 248)",
        ring: "border-primary-300/30",
        bg: "bg-primary-300/[0.04]",
        iconColor: "text-primary-300",
    },
    warning: {
        icon: AlertTriangle,
        eyebrow: "Heads up",
        accent: "rgb(245 158 11)",
        ring: "border-amber-300/30",
        bg: "bg-amber-300/[0.05]",
        iconColor: "text-amber-300",
    },
    insight: {
        icon: Lightbulb,
        eyebrow: "Insight",
        accent: "rgb(192 132 252)",
        ring: "border-secondary-300/30",
        bg: "bg-secondary-300/[0.04]",
        iconColor: "text-secondary-300",
    },
    experiment: {
        icon: Sparkles,
        eyebrow: "Experiment",
        accent: "rgb(236 72 153)",
        ring: "border-accent-400/30",
        bg: "bg-accent-400/[0.04]",
        iconColor: "text-accent-300",
    },
    shipping: {
        icon: GitCommit,
        eyebrow: "Shipped",
        accent: "rgb(16 185 129)",
        ring: "border-emerald-400/30",
        bg: "bg-emerald-400/[0.04]",
        iconColor: "text-emerald-300",
    },
};

/**
 * Callout — inline editorial surface for emphasizing a note, warning,
 * insight, experiment status, or shipping moment inside the body.
 *
 * Props:
 *   variant — "note" | "warning" | "insight" | "experiment" | "shipping"
 *   title   — optional bold lead inside the body
 *   eyebrow — overrides the variant's default eyebrow
 *
 * Children render in the standard prose voice (Hebrew muted, latin LTR).
 */
export function Callout({ variant = "note", title, eyebrow, children, className }) {
    const config = VARIANTS[variant] || VARIANTS.note;
    const Icon = config.icon;

    return (
        <aside
            className={cn(
                "my-8 flex gap-4 rounded-2xl border p-5 sm:p-6",
                config.ring,
                config.bg,
                className
            )}
            role="note"
        >
            <div
                className={cn(
                    "shrink-0 h-9 w-9 rounded-xl glass-panel-1 flex items-center justify-center",
                    config.iconColor
                )}
                aria-hidden="true"
            >
                <Icon className="h-4 w-4" strokeWidth={2} />
            </div>

            <div className="min-w-0 flex-1">
                <div
                    dir="ltr"
                    className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-1"
                >
                    {eyebrow || config.eyebrow}
                </div>
                {title && (
                    <p className="text-ink font-semibold mb-1.5 leading-snug">
                        {title}
                    </p>
                )}
                <div className="text-ink-muted leading-[1.7] text-[15px] sm:text-base">
                    {children}
                </div>
            </div>
        </aside>
    );
}
