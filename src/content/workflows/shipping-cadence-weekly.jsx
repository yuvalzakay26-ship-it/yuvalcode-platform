import { Callout } from "../../components/editorial/Callout";
import { CONTENT_TYPES } from "../../lib/content/schema";

export const entry = {
    id: "shipping-cadence-weekly",
    slug: "shipping-cadence-weekly",
    type: CONTENT_TYPES.WORKFLOW,
    pillar: "creator-journey",
    title: "Shipping Cadence — איך אני שומר על קצב שבועי לאורך זמן.",
    summary: "השעון הפנימי של creator שעובד בפומבי. למה ימים שני וחמישי, ולמה לא שישי. הקצב שמשרת את הקריאייטור, לא את ה-feed.",
    eyebrow: "Operating System",
    tags: ["build-in-public", "workflow", "creator-journey"],
    status: "live",
    visibility: "public",
    date: "2026-03-26",
    href: "/content/workflows/shipping-cadence-weekly",
    related: [
        "obsidian-claude-publishing-flow",
        "why-yuvalcode-is-a-publication-not-a-portfolio",
    ],
    readingMinutes: 4,
    Body,
};

function Body() {
    return (
        <>
            <p>
                12 שבועות רצופים של פרסום. זה לא מקרי. זה תוצר של <strong>cadence שתוכנן</strong> — לא מהתקפות פרודוקטיביות.
            </p>

            <h2>הקצב — ב-3 משבצות</h2>
            <ul>
                <li>
                    <strong>שני</strong> — סרטון YouTube. הצילום ביום ראשון, העלאה בבוקר.
                </li>
                <li>
                    <strong>רביעי</strong> — פרסום אדיטוריאלי בקולקציה. Article או Workflow לרוב; AI Experiment כשיש משהו שעבר eval.
                </li>
                <li>
                    <strong>חמישי</strong> — Changelog (אם שיגרנו) או Research Note (אם למדנו משהו פתוח).
                </li>
            </ul>

            <Callout variant="insight" title="שלוש הזדמנויות בשבוע, לא יותר.">
                ניסיתי 5/שבוע. נשרפתי תוך חודשיים. ניסיתי 1/שבוע. איבדתי momentum. שלוש הזדמנויות = מספיק שינוי, מספיק הפוגות.
            </Callout>

            <h2>למה לא שישי?</h2>
            <p>
                שישי הוא יום של חופש בישראל. פרסום ביום שישי = אימייל חוזר ביום ראשון, מתי שאתה כבר על משהו אחר. הקהל לא קורא — והפלטפורמה מאבדת את ה-engagement פר-פרסום.
            </p>

            <h2>החוקים שמשמרים את הקצב</h2>
            <ol>
                <li>
                    <strong>אם אין מה לפרסם — לדלג, לא לדלל.</strong> פרסום באיכות בינונית פוגע באמון. החמצת שבוע — לא.
                </li>
                <li>
                    <strong>אם יש מה לפרסם — לפרסם.</strong> ה-temptation לחכות עד שהמאמר &quot;מושלם&quot; הוא רעל לקצב. 90% מספיק טוב.
                </li>
                <li>
                    <strong>חופש מלא 4–5 שבועות בשנה.</strong> אני מודיע מראש בניוזלטר. אין &quot;hustle&quot; של 52 שבועות בשנה.
                </li>
            </ol>

            <h2>המשמעות של 12 שבועות רצופים</h2>
            <p>
                המספר עצמו פחות חשוב מהאמירה: <strong>אפשר לסמוך עליי שאני אפרסם בשבוע הבא</strong>. זה מה שמייצר את האמון של מנוי. זה מה שיוצר ניוזלטר. זה מה שמהפך פלטפורמה לפרסום.
            </p>
        </>
    );
}
