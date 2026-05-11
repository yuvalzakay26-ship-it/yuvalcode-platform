import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import { CollectionIcon } from "./icons";

/**
 * EmptyCollection — graceful state when a collection has no live entries
 * yet. Honest about being early; routes the visitor onward to the
 * editorial hub instead of dead-ending.
 *
 * Per BRAND_V2.md: empty surfaces are forbidden. This block IS content —
 * a calm note from the editor that the collection exists, that real
 * entries land here as they ship, and that the visitor has somewhere to
 * go meanwhile.
 */
export function EmptyCollection({ config }) {
    if (!config) return null;

    return (
        <section className="container mx-auto px-4 py-16 sm:py-20">
            <div className="max-w-2xl mx-auto text-center">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl glass-panel-2 mb-6">
                    <CollectionIcon
                        name={config.iconName}
                        className="h-6 w-6"
                        style={{ color: `rgb(${config.accent})` }}
                    />
                </div>
                <p
                    dir="ltr"
                    className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-3"
                >
                    Editorially in progress
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-normal mb-3">
                    הפרסומים הראשונים בקרוב.
                </h2>
                <p className="text-ink-muted leading-relaxed mb-8">
                    הקולקציה הזו פעילה — היא חיכתה לפלטפורמה שתתנהל בצורה אדיטוריאלית. הפרסומים הראשונים מגיעים בתקופה הקרובה, ויסתנכרנו אוטומטית עם החיפוש הגלובלי וההמלצות.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/content"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full glass-panel-1 text-ink-muted hover:text-ink hover:border-white/20 transition-colors text-sm font-medium group"
                    >
                        <Sparkles className="h-4 w-4 text-primary-300" strokeWidth={2} aria-hidden="true" />
                        חזרה למרכז התוכן
                        <ArrowLeft className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:-translate-x-0.5 transition-all" strokeWidth={2} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
