import { Callout } from "../../components/editorial/Callout";
import { CONTENT_TYPES } from "../../lib/content/schema";

export const entry = {
    id: "why-yuvalcode-is-a-publication-not-a-portfolio",
    slug: "why-yuvalcode-is-a-publication-not-a-portfolio",
    type: CONTENT_TYPES.ARTICLE,
    pillar: "creator-journey",
    title: "למה YuvalCode הוא פלטפורמה — לא תיק עבודות.",
    summary: "המעבר מאתר תדמית לפלטפורמה אדיטוריאלית: למה החלפנו את כל המנטלי model, ומה זה משנה לגבי מה שאני מפרסם.",
    eyebrow: "Editorial Direction",
    tags: ["editorial", "publishing", "build-in-public", "system-thinking"],
    status: "live",
    visibility: "public",
    date: "2026-05-07",
    href: "/content/articles/why-yuvalcode-is-a-publication-not-a-portfolio",
    related: [
        "phase-3-1-editorial-activation",
        "yuvalcode-platform-architecture",
        "obsidian-claude-publishing-flow",
    ],
    readingMinutes: 5,
    Body,
};

function Body() {
    return (
        <>
            <p>
                כשאתר נבנה כתיק עבודות, הוא מתעדכן פעם בשנה. הביקור הראשון יוצר רושם — אבל הביקור השני, השלישי, החמישים — אין סיבה שיקרה. זאת היתה ה-Y-אקס של רוב הקריירה שלי כמפתח ויוצר. <strong>החלפתי את המודל הזה לחלוטין.</strong>
            </p>

            <h2>מה זה אומר &quot;פלטפורמה אדיטוריאלית&quot;?</h2>
            <p>
                המילה &quot;Publication&quot; היא לא קישוט. היא תיאור מדויק של איך{" "}
                <span dir="ltr" className="font-mono text-ink">YuvalCode</span> פועלת מ-2026 והלאה: כל פיסת תוכן — מאמר, ניסוי, workflow, case study, changelog, research note — חיה במערכת אחת, מקושרת לאקוסיסטם של שמונה pillars, ונחשפת באותו מנגנון של חיפוש, המלצות, ו-knowledge graph.
            </p>

            <Callout variant="insight" title="הקריאייטור של 2026 אינו אתר.">
                הקריאייטור של 2026 הוא <strong>מערכת תוכן חיה</strong>: ארכיון, פיד, חיפוש, המלצות, ניוזלטר, אקוסיסטם של pillars — כולם פועלים יחד, כולם מתעדכנים, כולם מקושרים. תיק עבודות הוא תוצר לוואי, לא היעד.
            </Callout>

            <h2>שלושה כללים שמנחים אותי</h2>
            <ol>
                <li>
                    <strong>אם זה לא קשור לפלטפורמה — זה לא נכנס.</strong> אין &quot;עוד מאמר אקראי&quot;. כל פרסום ממוקם ב-pillar, מתויג, מקושר ל-3 פרסומים אחרים, ונכנס ל-knowledge graph.
                </li>
                <li>
                    <strong>אם זה לא חי בייצור — זה לא משוחרר.</strong> מאמר על Claude Code סוכנים מגיע אחרי שעבדתי איתם בייצור. ניסוי AI מתפרסם אחרי שנכשל מספיק פעמים שיש מה ללמד. case study יוצא רק על מערכת שכבר רצה.
                </li>
                <li>
                    <strong>אם הקורא לא יכול להמשיך — זה כישלון.</strong> סוף כל מאמר חייב להוביל לפרסום הבא. זה מה שעושה את ההבדל בין פוסט בודד לבין מערכת.
                </li>
            </ol>

            <h2>איך זה משפיע על מה שתקראו כאן</h2>
            <p>
                מה שתראו ב-<span dir="ltr" className="font-mono text-ink">/content</span> הוא לא רשימת פוסטים. זה אינדקס של פלטפורמה: קולקציות (Articles · AI Experiments · Workflow Docs · Case Studies · Changelogs · Research Notes), מקושרות זו לזו, חיפוש{" "}
                <span dir="ltr" className="font-mono text-ink">Cmd/Ctrl + K</span> שמכסה את הכול, ו-recommendations אחרי כל קריאה.
            </p>

            <Callout variant="shipping" title="התשתית קיימת. הכתיבה מתחילה.">
                Phase 3.0 שיגרה את שכבת התשתית (search, content schema, recommendations, AI graph). Phase 3.1 — זה — הפעיל את שכבת הפרסום. מ-2026 והלאה כל פרסום עובר דרך המערכת הזו.
            </Callout>

            <h2>למה זה חשוב — לקורא, לא רק לי</h2>
            <p>
                אתר תיק עבודות נותן לך שיחה קצרה. פלטפורמה נותנת לך{" "}
                <strong>מסע</strong>. כשאתה קורא מאמר על workflow, ההמלצה הבאה היא ניסוי שקשור אליו, אחר כך case study שמסביר את המערכת שעליה הוא רץ. כל פרסום הוא צמיחה ב-knowledge graph שלך, לא רק ב-feed.
            </p>
            <p>
                ה-blueprint של זה כתוב ב-<span dir="ltr" className="font-mono text-ink">PROJECT_AUDIT.md</span>, וה-roadmap ב-<span dir="ltr" className="font-mono text-ink">PLATFORM_INTELLIGENCE_REPORT.md</span> ו-<span dir="ltr" className="font-mono text-ink">EDITORIAL_ACTIVATION_REPORT.md</span>. הם פתוחים. הכול נבנה בפומבי.
            </p>
        </>
    );
}
