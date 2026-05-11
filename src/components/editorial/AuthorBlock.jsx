import { Link } from "react-router-dom";
import { Sparkles, Youtube, ArrowLeft } from "lucide-react";
import { YZMonogram } from "../ui/YZMonogram";
import { SITE } from "../../lib/constants";

/**
 * AuthorBlock — the creator-context surface that renders below every
 * editorial entry. Establishes who wrote the piece, why it exists, and
 * where the journey continues.
 *
 * The block is intentionally calm: monogram, name, current focus, and two
 * grounded affordances (subscribe + read more about the journey). No
 * "Hire me" energy here — `/work-with-me` lives in the global nav for
 * visitors who want it.
 */
export function AuthorBlock() {
    return (
        <section
            aria-labelledby="author-block-heading"
            className="container mx-auto px-4 py-14 sm:py-18"
        >
            <div className="max-w-2xl mx-auto">
                <div className="rounded-3xl glass-panel-2 p-6 sm:p-8 relative overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="absolute -top-24 end-[-15%] w-72 h-72 bg-primary/15 rounded-full blur-[120px] mix-blend-screen"
                    />

                    <div className="relative flex flex-col sm:flex-row gap-6">
                        {/* Identity */}
                        <div className="shrink-0 flex items-start sm:items-center sm:flex-col sm:text-center gap-4 sm:gap-3">
                            <div className="h-16 w-16 rounded-2xl glass-panel-1 flex items-center justify-center">
                                <YZMonogram size={36} />
                            </div>
                            <div className="sm:hidden">
                                <p className="font-display font-bold text-ink text-lg leading-snug">
                                    Yuval Zakay
                                </p>
                                <p
                                    dir="ltr"
                                    className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim mt-1"
                                >
                                    Software Educator · Learning AI in Public
                                </p>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="min-w-0 flex-1">
                            <h2
                                id="author-block-heading"
                                className="hidden sm:block font-display font-bold text-ink text-xl leading-snug mb-1"
                            >
                                Yuval Zakay
                            </h2>
                            <p
                                dir="ltr"
                                className="hidden sm:block text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-4"
                            >
                                Software Educator · Learning & Building with AI in Public · Modern Tech Creator
                            </p>

                            <p className="text-ink-muted leading-relaxed text-[15.5px] sm:text-base mb-5">
                                <span className="text-ink font-medium">לומד ובונה עם AI בפומבי.</span>{" "}
                                מתעד ניסויים אמיתיים עם{" "}
                                <span dir="ltr" className="text-ink font-medium">Claude Code</span>,{" "}
                                <span dir="ltr" className="text-ink font-medium">Anti Gravity</span>,{" "}
                                ו-<span dir="ltr" className="text-ink font-medium">Obsidian</span>. כל פרסום כאן הוא חתיכה אחת מתוך מסע חי — לא סדרה תיאורטית.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 sm:items-center text-[12.5px] font-mono uppercase tracking-[0.18em]">
                                <Link
                                    to="/about"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel-1 text-ink-muted hover:text-ink hover:border-white/20 transition-colors group"
                                >
                                    <Sparkles className="h-3.5 w-3.5 text-primary-300" strokeWidth={2} aria-hidden="true" />
                                    הסיפור המלא
                                    <ArrowLeft className="h-3 w-3 opacity-60 group-hover:opacity-100 group-hover:-translate-x-0.5 transition-all" strokeWidth={2} aria-hidden="true" />
                                </Link>

                                <a
                                    href={SITE.youtubeChannelUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel-1 text-ink-muted hover:text-ink hover:border-white/20 transition-colors group"
                                >
                                    <Youtube className="h-3.5 w-3.5 text-red-400" strokeWidth={2} aria-hidden="true" />
                                    הצטרף לערוץ
                                    <ArrowLeft className="h-3 w-3 opacity-60 group-hover:opacity-100 group-hover:-translate-x-0.5 transition-all" strokeWidth={2} aria-hidden="true" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
