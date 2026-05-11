import { Callout } from "../../components/editorial/Callout";
import { CodeBlock } from "../../components/editorial/CodeBlock";
import { CONTENT_TYPES } from "../../lib/content/schema";

export const entry = {
    id: "claude-code-subagents-in-production",
    slug: "claude-code-subagents-in-production",
    type: CONTENT_TYPES.AI_EXPERIMENT,
    pillar: "claude-code",
    title: "Sub-Agents בייצור — מה שעובד באמת.",
    summary: "מה שלמדתי משלושה חודשים של עבודה עם Claude Code Sub-Agents על מערכות חיות. ה-good, the bad, ו-when not to use them.",
    eyebrow: "Lab · Active",
    tags: ["claude-code", "agents", "experiment", "workflow"],
    status: "live",
    visibility: "public",
    date: "2026-04-15",
    href: "/content/ai-experiments/claude-code-subagents-in-production",
    related: [
        "agent-eval-harness-v1",
        "obsidian-claude-publishing-flow",
        "rag-rerank-observations",
    ],
    readingMinutes: 6,
    Body,
};

function Body() {
    return (
        <>
            <p>
                Claude Code Sub-Agents הוא הפיצ&apos;ר שהכי שינה את ה-workflow היומיומי שלי השנה. אבל גם זה שהכי הרבה פעמים השתמשתי בו <em>לא נכון</em> בהתחלה. הנה מה שלמדתי.
            </p>

            <h2>מה זה sub-agent בעצם?</h2>
            <p>
                Sub-agent הוא Claude שמפעיל Claude. הסוכן הראשי מקבל משימה, מפרק אותה, ומפעיל סוכנים מקבילים — כל אחד עם הקשר ממוקד משלו, tool set משלו, ופלט נפרד.
            </p>

            <Callout variant="insight" title="הסוד הוא ההפרדה.">
                ה-context window של Claude הוא לא אינסופי. sub-agent אינו &quot;עוד פיצ&apos;ר&quot; — הוא מנגנון לפיצול של עבודה גדולה ל-windows ממוקדים יותר.
            </Callout>

            <h2>שלושה דברים ש-sub-agents <em>פותרים</em></h2>
            <ol>
                <li>
                    <strong>Context contamination.</strong> כשמשימה ארוכה מעורבת בשני pillars שונים (דוקומנטציה + ארכיטקטורה למשל), הסוכן הראשי מתבלבל. sub-agent בודד לכל pillar — נקי.
                </li>
                <li>
                    <strong>Parallelism.</strong> שלושה סוכנים שעובדים במקביל על שלושה pillars שונים = פי 3 throughput, לא פי 1.5.
                </li>
                <li>
                    <strong>Specialized tools.</strong> sub-agent של &quot;research&quot; יכול לקבל רק tools של קריאה. sub-agent של &quot;refactor&quot; — רק עריכה. הסיכון מצטמצם.
                </li>
            </ol>

            <h2>שלושה דברים ש-sub-agents <em>לא פותרים</em></h2>
            <ol>
                <li>
                    <strong>הם לא חוסכים tokens.</strong> פיצול ל-3 sub-agents הוא יותר tokens, לא פחות. השימוש מיועד לאיכות, לא לעלות.
                </li>
                <li>
                    <strong>הם לא חוסכים זמן בקטן.</strong> משימה של 15 שניות לא מתאימה ל-sub-agent. ה-overhead של איפיון המשימה גדול מהביצוע.
                </li>
                <li>
                    <strong>הם לא מחליפים planning טוב.</strong> אם ה-prompt הראשי מבולגן, sub-agents יחזירו תוצאה מבולגנת בקנה מידה גדול יותר.
                </li>
            </ol>

            <h2>הדפוס שעובד — איפיון בכתב</h2>
            <p>
                אני לא משחרר sub-agent בלי <strong>הגדרת תפקיד בכתב</strong> ב-Markdown. זה הקובץ ש-Claude קורא לפני שהוא מתחיל. דוגמה אמיתית מהפרויקט הזה:
            </p>

            <CodeBlock
                lang="md"
                filename=".claude/agents/editorial-publisher.md"
                code={`# Editorial Publisher Sub-Agent

## תפקיד
פרסום מאמר חדש בקולקציה האדיטוריאלית של YuvalCode.

## כלים מותרים
- קריאת \`src/content/**/*\`
- כתיבה ל-\`src/content/<collection>/<slug>.jsx\`
- עדכון \`src/content/collections.js\` להוסיף את הרשומה

## כלים אסורים
- שינוי \`src/lib/**\` או \`src/components/**\`
- שינוי \`src/lib/content/schema.js\`

## בדיקות לפני סיום
- [ ] frontmatter תואם את REQUIRED_FIELDS
- [ ] slug ייחודי בקולקציה
- [ ] לפחות 2 \`related\` להזרים את ההמלצות`}
            />

            <Callout variant="shipping" title="המסקנה — agent definition הוא הקוד.">
                ה-Markdown הזה הוא לא תיעוד. הוא <strong>חוזה</strong> בין הסוכן הראשי לסוכן המשני. בלעדיו, אין reproducibility.
            </Callout>

            <h2>איך אני מודד אם זה עבד</h2>
            <p>
                ה-eval harness שתיעדתי במאמר הקודם רץ על כל sub-agent בנפרד. אם sub-agent חדש מתחת ל-85% signal hit rate, הוא לא נכנס ל-workflow היומיומי.
            </p>
        </>
    );
}
