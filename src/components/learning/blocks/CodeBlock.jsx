import { useState } from "react";

export function CodeBlock({ title, language = "bash", code = "", paletteClass }) {
    const accent = paletteClass === "claude-code" ? "#7B82F5" : "#F9AE34";
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard unavailable — silently no-op; the code is still visible.
        }
    };

    return (
        <section>
            {title && (
                <div className="mb-5 max-w-[42ch]">
                    <div className="text-[12.5px] tracking-[0.04em] mb-2" style={{ color: accent }}>
                        דוגמת קוד
                    </div>
                    <h3 className="text-[19px] text-ink font-medium leading-[1.4]">{title}</h3>
                </div>
            )}

            {/* Code chrome stays LTR (commands and identifiers are LTR by nature) — only the box flips direction. */}
            <div
                dir="ltr"
                className="rounded-xl overflow-hidden bg-[#08090E]"
                style={{
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
            >
                <div className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-white/[0.08]" />
                        <span className="w-2 h-2 rounded-full bg-white/[0.08]" />
                        <span className="w-2 h-2 rounded-full bg-white/[0.08]" />
                        <span className="ml-3 text-[11px] tracking-[0.14em] text-ink-dim">
                            {language}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="text-[12px] text-ink-muted hover:text-ink transition-colors duration-500"
                        aria-label="העתק קוד"
                        dir="rtl"
                    >
                        {copied ? "הועתק" : "העתקה"}
                    </button>
                </div>
                <pre className="px-5 pt-1 pb-5 overflow-x-auto text-[13px] leading-[1.85] font-mono text-ink/85">
                    <code>{code}</code>
                </pre>
            </div>
        </section>
    );
}
