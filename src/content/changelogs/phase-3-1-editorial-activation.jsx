import { Callout } from "../../components/editorial/Callout";
import { CONTENT_TYPES } from "../../lib/content/schema";

export const entry = {
    id: "phase-3-1-editorial-activation",
    slug: "phase-3-1-editorial-activation",
    type: CONTENT_TYPES.CHANGELOG,
    pillar: "creator-journey",
    title: "Phase 3.1 — Editorial Activation System.",
    summary: "MDX-style publishing layer · 6 collections · dynamic routes · prose system · related-content rail · author block · ניוזלטר אדיטוריאלי · changelog system. שכבת הפרסום של הפלטפורמה — חיה.",
    eyebrow: "Build in Public · Shipped",
    tags: ["build-in-public", "shipping", "release-notes", "publishing", "editorial"],
    status: "live",
    visibility: "public",
    date: "2026-05-07",
    href: "/content/changelog/phase-3-1-editorial-activation",
    related: [
        "phase-3-platform-intelligence",
        "why-yuvalcode-is-a-publication-not-a-portfolio",
        "yuvalcode-platform-architecture",
    ],
    readingMinutes: 4,
    Body,
};

function Body() {
    return (
        <>
            <p>
                Phase 3.1 הופך את הפלטפורמה מ-&quot;יש שכבת תשתית&quot; ל-&quot;יש פרסום חי&quot;. ה-collections, ה-routes הדינמיים, ה-prose system, ההמלצות, ה-author block, וה-newsletter האדיטוריאלי — כולם פעילים ברגע זה.
            </p>

            <Callout variant="shipping" title="הפלטפורמה מתחילה לחיות.">
                Phase 3.0 שיגרה את <em>השכבה</em>. Phase 3.1 הפעילה את <em>הקול</em>. כל פרסום בקולקציה האדיטוריאלית עובר דרך אותה תשתית: search global, ההמלצות הגרפיות, ה-newsletter abstraction, ה-analytics layer.
            </Callout>

            <h2>מה שיגרנו</h2>
            <ul>
                <li>
                    <strong>MDX-style publishing layer</strong> — JSX-as-MDX (זה הקובץ הזה הוא דוגמה). אפס תלויות חדשות. נתיב מעבר ל-MDX אמיתי הוא one-line swap.
                </li>
                <li>
                    <strong>6 קולקציות פעילות</strong> — Articles · AI Experiments · Workflows · Case Studies · Changelog · Research Notes.
                </li>
                <li>
                    <strong>2 routes דינמיים</strong> — <code dir="ltr">/content/:collection</code> ו-<code dir="ltr">/content/:collection/:slug</code>.
                </li>
                <li>
                    <strong>Editorial reading primitives</strong> — <code dir="ltr">Prose</code>, <code dir="ltr">CodeBlock</code>, <code dir="ltr">Callout</code>, <code dir="ltr">EditorialHero</code>, <code dir="ltr">CollectionHero</code>, <code dir="ltr">EntryCard</code>, <code dir="ltr">RelatedRail</code>, <code dir="ltr">EcosystemNav</code>, <code dir="ltr">AuthorBlock</code>, <code dir="ltr">EditorialNewsletter</code>.
                </li>
                <li>
                    <strong>Recommendation rail</strong> — graph-derived, מסומנת לפי source (related / same-pillar / adjacent-pillar).
                </li>
                <li>
                    <strong>Per-route JSON-LD</strong> — Article / TechArticle / HowTo / CollectionPage לפי סוג.
                </li>
                <li>
                    <strong>חוויית קריאה ב-Hebrew-first</strong> — typography מותאם, RTL מושלם, bidi guards אוטומטיים על מונחים לטיניים.
                </li>
            </ul>

            <h2>מספרים</h2>
            <ul>
                <li>
                    <strong>שכבת התשתית הקיימת</strong> — schema, taxonomy, defineCollection, search indexer, recommendation engine — חזרה לשימוש בלי rewrites.
                </li>
                <li>
                    <strong>ערכי Bundle</strong> — שכבת ה-editorial היא chunks lazy לפי route. <code dir="ltr">ContentEntry-*.js</code> וה-<code dir="ltr">ContentCollection-*.js</code> נטענים בקריאה ראשונה בלבד.
                </li>
                <li>
                    <strong>Sitemap</strong> — מתעדכן עם כל route חדש (collection landings + entry pages).
                </li>
                <li>
                    <strong>Search corpus</strong> — כל פרסום נכנס לחיפוש Cmd/Ctrl+K אוטומטית — זה מה שה-frontmatter contract של Phase 3.0 הכין.
                </li>
            </ul>

            <h2>מה הלאה</h2>
            <p>
                Phase 3.2 (פתוח לתכנון) — newsletter provider אמיתי (Beehiiv או webhook), חיפוש סמנטי (החלפת ה-lexical matcher בעוטף embeddings), ו-MDX adapter אמיתי (build-time parse של <code dir="ltr">.mdx</code> files שמזין את <code dir="ltr">defineCollection()</code> ללא שינוי בצרכנים).
            </p>
        </>
    );
}
