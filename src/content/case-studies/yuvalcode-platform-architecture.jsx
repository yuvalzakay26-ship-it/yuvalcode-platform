import { Callout } from "../../components/editorial/Callout";
import { CodeBlock } from "../../components/editorial/CodeBlock";
import { CONTENT_TYPES } from "../../lib/content/schema";

export const entry = {
    id: "yuvalcode-platform-architecture",
    slug: "yuvalcode-platform-architecture",
    type: CONTENT_TYPES.CASE_STUDY,
    pillar: "building-with-ai",
    title: "YuvalCode Platform — מ-portfolio ל-creator HQ ל-publication.",
    summary: "המסע הארכיטקטוני של הפלטפורמה — מה שינינו, למה, ומה למדנו. מ-React SPA פשוט ל-platform intelligence layer עם editorial system.",
    eyebrow: "Architecture",
    tags: ["case-study", "architecture", "build-in-public", "system-thinking"],
    status: "live",
    visibility: "public",
    date: "2026-05-07",
    href: "/content/case-studies/yuvalcode-platform-architecture",
    related: [
        "why-yuvalcode-is-a-publication-not-a-portfolio",
        "phase-3-1-editorial-activation",
        "hebrew-rtl-typography-deep-dive",
    ],
    readingMinutes: 9,
    Body,
};

function Body() {
    return (
        <>
            <p>
                הפלטפורמה הזו עברה <strong>שלוש pivot strategiyot</strong> ב-12 חודשים. כל אחת ייצרה שכבת תשתית שלא נזרקה. הנה הסיפור הארכיטקטוני המלא.
            </p>

            <h2>Phase 0 — Mahat catalog (2025)</h2>
            <p>
                התחלה: SPA פשוט עם React + Vite + Tailwind שמרכז סרטוני YouTube של פתרונות מבחני מה&quot;ט. נתוני מקור: YouTube Data API. אין routes נוספים, אין tracks.
            </p>

            <Callout variant="note" title="שכבת תשתית #1 — YouTube data layer.">
                ה-<code dir="ltr">youtubeService.js</code> שנכתב בשלב הזה — TTL caching, dedupe, batched duration enrichment, stale-on-error fallback — הוא היחיד שלא השתנה דרך כל ה-pivots. שכבת בסיס איכותית שורדת.
            </Callout>

            <h2>Phase 1 — Recruiter portfolio (Q1 2026)</h2>
            <p>
                Pivot ראשון: &quot;התעסקות יחיד&quot; של portfolio for hire. הוספנו{" "}
                <code dir="ltr">/about</code>, <code dir="ltr">/contact</code>, hero ב-CV-style. החלטה אסטרטגית: <strong>טעות</strong>. הפלטפורמה לא נראתה כמו creator brand, היא נראתה כמו אתר freelance.
            </p>

            <h2>Phase 2 — BRAND_V2: creator HQ</h2>
            <p>
                המעבר ל-creator HQ ב-2026-04-30. שיגרנו 5 tracks first-class:
            </p>
            <ul>
                <li><code dir="ltr">/ai</code> — AI Track Foundation</li>
                <li><code dir="ltr">/projects</code> — Projects Authority System</li>
                <li><code dir="ltr">/content</code> — Content OS</li>
                <li><code dir="ltr">/stack</code> — Creator Stack System</li>
                <li><code dir="ltr">/work-with-me</code> — Partnership system</li>
            </ul>
            <p>
                כל track בנוי על אותו pattern: hero ב-88vh, 6–9 sections, dedicated namespace ב-<code dir="ltr">src/components/&lt;track&gt;/</code>, glass tier system, brand gradient יחיד. הקלון אינו random — הוא מנגנון שמייצר identity קוהרנטי בכל route.
            </p>

            <h2>Phase 3 — Platform Intelligence Layer</h2>
            <p>
                ב-2026-05-07 — שיגרנו את שכבת ה-intelligence שמתחת לכל ה-tracks:
            </p>

            <CodeBlock
                lang="text"
                code={`src/lib/
├── search/         — Cmd/K corpus + matcher + provider
├── content/        — schema + pillars + taxonomy + collections API
├── newsletter.js   — vendor-agnostic abstraction
├── analytics.js    — typed events + scrubber
└── ai/
    ├── graph.js
    ├── recommend.js
    ├── metadata.js
    └── assistant.js`}
            />

            <Callout variant="insight" title="המעבר מ-tracks ל-platform.">
                זה בדיוק ה-shift שמהפך &quot;אתר עם 5 דפים&quot; ל-&quot;פלטפורמה עם 5 דפים&quot;. השכבה לא נראית — אבל היא מאפשרת חיפוש גלובלי, recommendations, ניוזלטר, analytics, ו-AI foundations.
            </Callout>

            <h2>Phase 3.1 — Editorial Activation</h2>
            <p>
                המעבר מ-&quot;יש פלטפורמה&quot; ל-&quot;יש פרסום&quot;: שכבת ה-editorial הופעלה — collections, dynamic routes, prose system, recommendations rail, author block. זה הפרסום שאתה קורא ברגע זה.
            </p>

            <h2>שלוש החלטות שעיצבו את הארכיטקטורה</h2>
            <ol>
                <li>
                    <strong>אין דף ריק.</strong> מ-<code dir="ltr">/coming-soon</code> שהוסר ב-Phase 1, עד &quot;empty collections&quot; שמראים פיסת תוכן ב-Phase 3.1 — אסור לפלוט dead-end.
                </li>
                <li>
                    <strong>זרם דרך אחד.</strong> כל פיסת תוכן עוברת דרך <code dir="ltr">defineCollection()</code>. כל route עובר דרך <code dir="ltr">PageMeta</code>. כל motion עוברת דרך EASE אחד. החזרה על pattern היא יתרון, לא חזרת.
                </li>
                <li>
                    <strong>שכבות לא יעלמו.</strong> כל שכבה ש-Phase מסוים שיגרה — לא נמחקה. ה-data layer של Phase 0 חי. ה-glass system של Phase 1 חי. ה-tracks של Phase 2 חיים. שכבה איכותית שורדת.
                </li>
            </ol>

            <h2>מה הלאה — Phase 4 (mid-2026)</h2>
            <p>
                ה-roadmap המוצע ב-PROJECT_AUDIT הוא: per-exam crawlable URLs, embedded YouTube player, semantic search (replace lexical matcher with embeddings — <em>קריאייטור</em>!), ו-Cal.com booking. הכול מתחבר לשכבות הקיימות בלי rewrites.
            </p>
            <p>
                <strong>ארכיטקטורה טובה היא ארכיטקטורה שמאפשרת את העתיד שלא תכננת.</strong> זה הסטנדרט שלי לפלטפורמה הזו.
            </p>
        </>
    );
}
