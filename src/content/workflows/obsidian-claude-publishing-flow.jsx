import { Callout } from "../../components/editorial/Callout";
import { CONTENT_TYPES } from "../../lib/content/schema";

export const entry = {
    id: "obsidian-claude-publishing-flow",
    slug: "obsidian-claude-publishing-flow",
    type: CONTENT_TYPES.WORKFLOW,
    pillar: "obsidian",
    title: "Obsidian × Claude — מ-vault ל-publishing.",
    summary: "ה-pipeline היומי שלי — איך הערות ב-Obsidian נכנסות ל-Claude Code, יוצאות כפרסום מתוייג, ונכנסות ל-platform graph.",
    eyebrow: "Operating System",
    tags: ["obsidian", "claude-code", "workflow", "publishing"],
    status: "live",
    visibility: "public",
    date: "2026-04-08",
    href: "/content/workflows/obsidian-claude-publishing-flow",
    related: [
        "claude-code-subagents-in-production",
        "shipping-cadence-weekly",
        "why-yuvalcode-is-a-publication-not-a-portfolio",
    ],
    readingMinutes: 5,
    Body,
};

function Body() {
    return (
        <>
            <p>
                לפני שלוש שנים השתמשתי ב-Notion כ-second brain. לפני שנתיים — ב-Roam. בשנה האחרונה — Obsidian + Claude Code, בלי תחרות. <strong>זה לא בגלל פיצ&apos;רים. זה בגלל שזה הצמד היחיד שמאפשר לי לפרסם בלי תכנון מוקדם.</strong>
            </p>

            <h2>השלבים — קצרים</h2>
            <ol>
                <li>
                    <strong>Capture (כל יום)</strong> — הערה ב-Obsidian בכל פעם שמשהו מעניין קורה. tag ל-pillar, link לפרסומים קיימים, אין editing.
                </li>
                <li>
                    <strong>Distill (סוף השבוע)</strong> — אני פותח את ה-vault עם Claude Code. הסוכן קורא את כל ההערות החדשות מהשבוע, מציע 2–3 קונספטים שיכולים להיות פרסום.
                </li>
                <li>
                    <strong>Compose (שעתיים)</strong> — בוחר אחד. Claude Code מבצע <em>draft</em> בעברית, אני עורך, מוסיף callouts, code blocks אם רלוונטי.
                </li>
                <li>
                    <strong>Publish (commit אחד)</strong> — sub-agent של &quot;editorial publisher&quot; מוסיף את הקובץ לקולקציה, מעדכן <code dir="ltr">collections.js</code>, מוודא ש-frontmatter תקין. PR נשלח, build רץ, פרסום חי.
                </li>
            </ol>

            <Callout variant="insight" title="הזמן הוא ה-bottleneck — לא הרעיונות.">
                לפני ה-flow הזה, היו לי 40 רעיונות בחודש ו-2 פרסומים. עכשיו — 8 פרסומים בחודש, אותם 40 רעיונות. ה-overhead של פרסום ירד ב-90%.
            </Callout>

            <h2>החוקים שמייצרים את הקצב</h2>
            <ul>
                <li>
                    <strong>אין capture בלי tag.</strong> הערה בלי <code dir="ltr">#claude-code</code> או <code dir="ltr">#mahat</code> — לא קיימת. אני לא רוצה לחפש לפי כותרת.
                </li>
                <li>
                    <strong>אין distill בלי Claude.</strong> אני לא קורא 30 הערות לבד. הסוכן מסכם, אני מאשר.
                </li>
                <li>
                    <strong>אין publish בלי <code dir="ltr">related</code>.</strong> כל פרסום מקושר ל-2 פרסומים אחרים, מינימום. בלי זה, הוא לא נכנס ל-knowledge graph.
                </li>
            </ul>

            <h2>איך זה משתלב עם הפלטפורמה</h2>
            <p>
                ה-pipeline הזה הוא הסיבה שהקולקציה האדיטוריאלית של <span dir="ltr" className="font-mono text-ink">YuvalCode</span> תגדל בקצב סביר. כל פרסום הוא תוצר של אסטרטגיה ולא של מאמץ-פתאום.
            </p>
        </>
    );
}
