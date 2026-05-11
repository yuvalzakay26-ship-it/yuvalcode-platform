import { Mail } from "lucide-react";
import { NewsletterSignup } from "../newsletter/NewsletterSignup";

/**
 * EditorialNewsletter — a deliberately quieter newsletter block tuned for
 * inline reading surfaces (mid-article and end-of-article placements).
 *
 * Wraps the platform-wide NewsletterSignup primitive in editorial framing:
 * a calm eyebrow, a publication-voiced headline, no marketing-funnel
 * adjectives. Surface analytics are propagated.
 *
 * Props:
 *   surface  — analytics surface label (e.g. "article-foot", "collection-foot")
 *   eyebrow  — override the editorial eyebrow
 *   title    — override the headline
 *   description — override the supporting line
 */
export function EditorialNewsletter({
    surface = "editorial",
    eyebrow = "Editorial Letter",
    title = "המשך הסיפור — בחודשי.",
    description = "סיכום עורך אחת לחודש. מה התפרסם, מה למדנו, מה הלאה. בלי ספאם, בלי מותג של פיתוי.",
}) {
    return (
        <section
            aria-labelledby="editorial-newsletter-heading"
            className="container mx-auto px-4 py-12 sm:py-16"
        >
            <div className="max-w-2xl mx-auto">
                <div className="rounded-3xl glass-panel-2 p-6 sm:p-8 relative overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="absolute -bottom-24 start-[-15%] w-72 h-72 bg-secondary/15 rounded-full blur-[120px] mix-blend-screen"
                    />
                    <div className="relative">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass-panel-1 mb-4">
                            <Mail className="h-3.5 w-3.5 text-secondary-300" strokeWidth={2} aria-hidden="true" />
                            <span
                                dir="ltr"
                                className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted"
                            >
                                {eyebrow}
                            </span>
                        </div>

                        <h2
                            id="editorial-newsletter-heading"
                            className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-normal leading-snug mb-3"
                        >
                            {title}
                        </h2>
                        <p className="text-ink-muted text-base leading-relaxed mb-6 max-w-xl">
                            {description}
                        </p>

                        {/* Reuse the platform newsletter primitive. Pass an inline variant
                            so the visual register stays calm. */}
                        <NewsletterSignup
                            variant="inline"
                            surface={surface}
                            eyebrow="Newsletter"
                            title=""
                            description=""
                            className="!p-0 !bg-transparent !border-0"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
