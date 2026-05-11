import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * CodeBlock — premium code presentation primitive.
 *
 * No external syntax highlighter (Prism / Shiki) ships in v1; we trade
 * tokenized colors for typographic discipline (JetBrains Mono, glass surface,
 * filename + lang chip, copy affordance). When/if a real highlighter lands,
 * this component is the swap-point: replace the <pre> body with a tokenized
 * tree and the surface stays unchanged.
 *
 * Props:
 *   code      — string (required)
 *   lang      — language label shown in the header (e.g. "ts", "jsx", "bash")
 *   filename  — optional filename for context
 *   showCopy  — boolean (default true)
 *   className — passthrough
 */
export function CodeBlock({ code, lang, filename, showCopy = true, className }) {
    const [copied, setCopied] = useState(false);

    const onCopy = async () => {
        if (!navigator?.clipboard) return;
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            // Silent — copy is a nicety, not a feature.
        }
    };

    const headerLabel = filename || lang || "code";

    return (
        <div
            dir="ltr"
            className={cn(
                "relative my-8 rounded-2xl overflow-hidden glass-panel-2",
                "shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" aria-hidden="true" />
                    <span className="ms-3 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                        {headerLabel}
                    </span>
                    {filename && lang && (
                        <span className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim/60">
                            · {lang}
                        </span>
                    )}
                </div>
                {showCopy && (
                    <button
                        type="button"
                        onClick={onCopy}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        aria-label={copied ? "Copied" : "Copy code"}
                    >
                        {copied ? (
                            <>
                                <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                                copied
                            </>
                        ) : (
                            <>
                                <Copy className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                                copy
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Body */}
            <pre className="overflow-x-auto px-5 py-4 text-[13.5px] leading-[1.75] font-mono text-ink/90 bg-white/[0.015]">
                <code>{code}</code>
            </pre>
        </div>
    );
}
