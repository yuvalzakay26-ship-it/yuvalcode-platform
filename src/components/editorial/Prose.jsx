import { cn } from "../../lib/utils";

/**
 * Prose — the editorial typography container.
 *
 * Wraps long-form body content. All semantic HTML inside (h2/h3/p/ul/ol/blockquote)
 * inherits a calibrated rhythm: tight Hebrew leading, sane vertical spacing,
 * RTL-aware list indentation, no @tailwindcss/typography dependency.
 *
 * Usage:
 *   <Prose>
 *     <h2>...</h2>
 *     <p>...</p>
 *   </Prose>
 *
 * Latin technical terms inside paragraphs should be wrapped in
 * <span dir="ltr" className="font-mono text-ink"> for bidi correctness.
 */
export function Prose({ children, className }) {
    return (
        <div
            className={cn(
                "prose-editorial",
                "max-w-none text-ink-muted leading-[1.85] text-[17px] sm:text-[18px]",
                "[&>*]:mb-6 [&>*:last-child]:mb-0",

                // Headings — display weight, tight tracking, light dropdown above
                "[&_h1]:font-display [&_h1]:text-3xl sm:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-normal [&_h1]:text-ink [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:leading-[1.15]",
                "[&_h2]:font-display [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-normal [&_h2]:text-ink [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:leading-[1.2]",
                "[&_h3]:font-display [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-normal [&_h3]:text-ink [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:leading-[1.25]",
                "[&_h4]:font-display [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-ink [&_h4]:mt-8 [&_h4]:mb-3",

                // Body
                "[&_p]:text-ink-muted",
                "[&_strong]:text-ink [&_strong]:font-semibold",
                "[&_em]:text-ink [&_em]:not-italic [&_em]:font-medium",

                // Inline code — JetBrains Mono, glass tile
                "[&_code]:font-mono [&_code]:text-[0.92em] [&_code]:px-1.5 [&_code]:py-[3px] [&_code]:rounded-md [&_code]:bg-white/[0.06] [&_code]:border [&_code]:border-white/10 [&_code]:text-ink",

                // Links — primary glow on hover
                "[&_a]:text-primary-300 [&_a]:underline [&_a]:underline-offset-[5px] [&_a]:decoration-primary-300/40 hover:[&_a]:text-primary-200 hover:[&_a]:decoration-primary-300/80 [&_a]:transition-colors",

                // Lists — RTL-aware (uses logical padding-inline-start)
                "[&_ul]:ps-6 [&_ul]:list-disc [&_ul]:marker:text-primary-300/70",
                "[&_ol]:ps-6 [&_ol]:list-decimal [&_ol]:marker:text-primary-300/70 [&_ol]:marker:font-mono",
                "[&_li]:mb-2 [&_li]:leading-[1.8] [&_li>p]:mb-2",

                // Blockquote — restrained, hairline-edged
                "[&_blockquote]:border-s-2 [&_blockquote]:border-primary-300/40 [&_blockquote]:ps-5 [&_blockquote]:py-1 [&_blockquote]:text-ink [&_blockquote]:italic [&_blockquote]:bg-white/[0.02] [&_blockquote]:rounded-md",

                // Horizontal rule — premium hairline
                "[&_hr]:border-0 [&_hr]:h-px [&_hr]:bg-gradient-to-r [&_hr]:from-transparent [&_hr]:via-white/15 [&_hr]:to-transparent [&_hr]:my-12",

                // Tables — glass surface, JetBrains for numbers
                "[&_table]:w-full [&_table]:my-8 [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:border [&_table]:border-white/10 [&_table]:bg-white/[0.02]",
                "[&_th]:bg-white/[0.04] [&_th]:px-4 [&_th]:py-3 [&_th]:text-start [&_th]:text-ink [&_th]:font-semibold [&_th]:text-sm [&_th]:border-b [&_th]:border-white/10",
                "[&_td]:px-4 [&_td]:py-3 [&_td]:text-ink-muted [&_td]:border-b [&_td]:border-white/5 [&_td]:text-[15px]",

                // Images
                "[&_img]:rounded-2xl [&_img]:border [&_img]:border-white/10 [&_img]:my-8",

                // Selection
                "[&_::selection]:bg-primary/30",

                className
            )}
        >
            {children}
        </div>
    );
}
