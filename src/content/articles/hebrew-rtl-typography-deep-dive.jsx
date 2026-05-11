import { Callout } from "../../components/editorial/Callout";
import { CodeBlock } from "../../components/editorial/CodeBlock";
import { CONTENT_TYPES } from "../../lib/content/schema";

export const entry = {
    id: "hebrew-rtl-typography-deep-dive",
    slug: "hebrew-rtl-typography-deep-dive",
    type: CONTENT_TYPES.ARTICLE,
    pillar: "building-with-ai",
    title: "Typography עברית ב-RTL — המדריך שלא רציתי לכתוב.",
    summary: "כל מה שלמדתי על typography עברית, RTL מושלם, ו-bidi-correct rendering אחרי שבניתי פלטפורמה שלמה ב-Hebrew-first.",
    eyebrow: "Deep Dive",
    tags: ["editorial", "deep-dive", "publishing", "system-thinking"],
    status: "live",
    visibility: "public",
    date: "2026-04-30",
    href: "/content/articles/hebrew-rtl-typography-deep-dive",
    related: [
        "why-yuvalcode-is-a-publication-not-a-portfolio",
        "yuvalcode-platform-architecture",
    ],
    readingMinutes: 7,
    Body,
};

function Body() {
    return (
        <>
            <p>
                לבנות פלטפורמה עברית מודרנית פירושו לבנות פלטפורמה{" "}
                <strong>RTL-first</strong> — לא RTL-מותאם. ההבדל הוא לא קוסמטי. הוא ארכיטקטוני.
            </p>

            <h2>השיעור הראשון: <span dir="ltr" className="font-mono text-ink">left/right</span> שווה ל-bug</h2>
            <p>
                בגירסה הראשונה של האתר, השתמשתי ב-{" "}
                <code dir="ltr">padding-left</code> ו-<code dir="ltr">margin-right</code> בכל מקום. זה עבד באנגלית. כשעברתי ל-RTL, כל ה-spacing התהפך באופן בלתי צפוי. הפתרון לא היה לתקן ידנית — הפתרון היה לוגי-properties.
            </p>

            <CodeBlock
                lang="css"
                filename="prefer-logical-properties.css"
                code={`/* רגרסיה — מתהפך בלתי צפוי ב-RTL */
.card {
    padding-left: 1rem;
    margin-right: 0.5rem;
}

/* RTL-first — מתאים את עצמו אוטומטית */
.card {
    padding-inline-start: 1rem;
    margin-inline-end: 0.5rem;
}`}
            />

            <p>
                ב-Tailwind 3.4 זה אומר{" "}
                <code dir="ltr">ps-4</code> במקום <code dir="ltr">pl-4</code>, <code dir="ltr">me-2</code> במקום <code dir="ltr">mr-2</code>, <code dir="ltr">start-0</code> במקום <code dir="ltr">left-0</code>. אחרי שעוברים — לא חוזרים.
            </p>

            <h2>השיעור השני: bidi-correct rendering הוא לא optional</h2>
            <p>
                כשמילה לטינית מופיעה בתוך משפט עברי, הדפדפן לא תמיד &quot;יודע&quot; באיזה כיוון לסדר אותה. ב-99% מהמקרים זה עובד. ה-1% הוא איפה ה-trust נשבר. הפתרון:
            </p>

            <CodeBlock
                lang="jsx"
                code={`// פשוט יעבוד ב-99% מהמקרים. לא תמיד.
<p>אני בונה עם Claude Code בכל יום</p>

// תמיד יעבוד.
<p>אני בונה עם <span dir="ltr">Claude Code</span> בכל יום</p>`}
            />

            <Callout variant="warning" title="כל המונחים הלטיניים — עטופים.">
                כל מונח טכני באנגלית בתוך טקסט עברי חייב{" "}
                <code dir="ltr">dir=&quot;ltr&quot;</code> מפורש. זה לא paranoia, זה תקן. דפדפנים מסוימים, גרסאות מסוימות, רעיונות מסוימים — bidi rendering נשבר במקומות לא צפויים.
            </Callout>

            <h2>השיעור השלישי: typography עברית דורשת leading שונה</h2>
            <p>
                Heebo נראה נהדר ב-<code dir="ltr">leading-relaxed</code> (1.625) באנגלית. בעברית — האותיות עומדות צפופות יותר, וה-line height הזה נראה דחוק. הסטנדרט שלנו:{" "}
                <strong>1.85 לטקסט גוף בעברית</strong>. מקצועי, נושם, לא תופח.
            </p>
            <p>
                ב-prose-editorial הזה (הקומפוננט שמצייר את הגוף שאתה קורא ברגע זה), {" "}
                <code dir="ltr">leading-[1.85]</code> + Heebo + JetBrains Mono ל-code = רושם של פרסום מקצועי, לא של בלוג WordPress.
            </p>

            <h2>השיעור הרביעי: <span dir="ltr" className="font-mono text-ink">font-feature-settings</span> זה לא רעש</h2>
            <CodeBlock
                lang="css"
                code={`body {
    font-feature-settings: "ss01", "cv11";
}

h1, h2, h3, .font-display {
    font-feature-settings: "ss01", "cv11", "tnum";
}`}
            />
            <p>
                <code dir="ltr">tnum</code> נותן tabular numerals — מספרים בכותרות (תאריכים, מספרי-גרסאות) שלא קופצים. <code dir="ltr">ss01</code> ו-<code dir="ltr">cv11</code> משפרים את הקריאות של אותיות מסוימות בעברית. כל פלטפורמה רצינית מפעילה את זה. ב-99% של אתרים זה לא מופעל.
            </p>

            <h2>הסיכום: איך זה משפיע על מה שאתה קורא</h2>
            <p>
                כל פרסום ב-<span dir="ltr" className="font-mono text-ink">YuvalCode</span> נמצא תחת ה-<code dir="ltr">Prose</code> wrapper שכולל את כל ה-RTL-first decisions, bidi guards, וטיפוגרפיה עברית בקנה מידה. אתה לא רואה את זה — אבל אתה מרגיש את זה.
            </p>
            <Callout variant="insight">
                הניסיון לבנות בעברית-first הוא <strong>כל-כך נדיר</strong> שהוא נחשב לחלוקה תחרותית. זה לא יתרון של 2026 — זה יתרון של 2030.
            </Callout>
        </>
    );
}
