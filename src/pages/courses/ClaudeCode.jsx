import { CourseWorldLayout } from "../../components/course-world/CourseWorldLayout";
import { CourseHero } from "../../components/course-world/CourseHero";
import { SystemsBlueprint } from "../../components/course-world/SystemsBlueprint";
import { BuildOutcomes } from "../../components/course-world/BuildOutcomes";
import { ModulePreview } from "../../components/course-world/ModulePreview";
import { LearningPhilosophy } from "../../components/course-world/LearningPhilosophy";
import { GatewayEntry } from "../../components/course-world/GatewayEntry";

const CLAUDE_CODE_IDENTITY = {
    id: "claude-code",
    theme: "blue-violet",
    baseBg: "bg-black",
    glowColor: "bg-indigo-900/30",
    textAccent: "text-indigo-400",
    bgAccent: "bg-indigo-500",
    borderAccent: "border-indigo-500",
    borderAccentHover: "hover:border-indigo-500/50",
};

// Hero opening — calm, grounded, no marketing register.
// Each line quietly answers one of the institutional questions
// (what you'll learn, why, how it changes your work, who it's for, how to study).
const heroOpeningStatement = [
    "הקורס נבנה כדי לעזור לך לעבוד עם Claude בצורה מקצועית, רגועה ומערכתית — לא להפעיל עוד כלי, אלא לשנות את הדרך שבה אתה ניגש למשימה.",
    "לא צריך להגיע עם ניסיון קודם ב־AI. צריך רק רצון לבנות הרגלי עבודה אמיתיים. נתקדם צעד אחר צעד, וכל רעיון יחזור שוב — בהקשרים שונים, עד שיֵשב.",
    "הקצב כאן רגוע במכוון. אין מירוץ, אין רשימת checkboxes. המטרה היא להבין איך אנשי מקצוע עובדים עם Claude באמת — לא להוסיף עוד טאב פתוח.",
];

const phases = [
    {
        title: "יסודות העבודה עם Claude",
        description: "הכרות עם Claude Code, התקנה ראשונה, וחיבור Claude לכלי העבודה שלך. בונים יחד את הבסיס שיעמוד לכל הקורס.",
        transformation:
            "עד סוף הפרק Claude כבר יהיה חלק מסביבת העבודה היומיומית שלך — לא טאב נוסף, אלא חלק מהזרימה.",
        modules: ["הכרות והתקנה", "חיבור Claude לפרויקט", "סביבת עבודה בטוחה"],
    },
    {
        title: "בניית Workflows אמיתיים",
        description: "לומדים לעבור משאלות בודדות למסלולי עבודה מקצועיים — איך פותחים משימה, איך מנהלים אותה עד הסוף, ואיך לא הולכים לאיבוד.",
        transformation:
            "עד סוף הפרק תיקח משימה מורכבת, תפרק אותה לשלבים, ותעבוד איתה לאורך זמן — בדיוק כמו מפתח שמכיר את העבודה שלו.",
        modules: ["עבודה רוחבית על קבצים", "ניתוח פרויקט קיים", "שיפוץ מודרך"],
    },
    {
        title: "איך לחשוב נכון עם AI",
        description: "הנחיות, הקשר, וחזרתיות. כותבים בקשות שעובדות. בונים מאגר הנחיות אישי שמלווה אותך לאורך כל המסלול שלך.",
        transformation:
            "עד סוף הפרק תכתוב הנחיות שעובדות באופן עקבי, ותדע לבדוק אם הן באמת עושות את מה שאתה מצפה מהן.",
        modules: ["הנחיות מערכתיות", "התאמת הנחיה לפרויקט", "מאגר הנחיות אישי"],
    },
    {
        title: "חשיבה מערכתית עם AI",
        description: "ממקטעי קוד לפרויקט שחי בפרודקשן. לומדים לנהל פריסה, לזהות כשמשהו נשבר, ולהשתמש ב־Claude לאורך כל הדרך.",
        transformation:
            "עד סוף הפרק תוציא משהו לעולם — פרויקט שאתה יכול להראות, שעובד באמת, שנבנה לאורך מסלול מקצועי מסודר.",
        modules: ["אוטומציה של פריסה", "עבודה עם Vercel", "פתרון בעיות בפרודקשן"],
    },
];

const outcomes = [
    {
        title: "פריסה אוטומטית מקצה לקצה",
        description: "פרויקט עם פריסה אוטומטית דרך GitHub Actions שלמדת לבנות ביחד עם Claude — שלב אחרי שלב.",
        stack: "GitHub / Claude",
        type: "פרויקט"
    },
    {
        title: "אפליקציית React מלאה",
        description: "אפליקציה שבנית בעצמך, במסלול מודרך, עם Claude כשותף לתהליך — מהרעיון ועד הפריסה.",
        stack: "React / Tailwind",
        type: "פרויקט"
    },
    {
        title: "מסלול עבודה אוטומטי לתוכן",
        description: "תהליך שלם שלוקח קלט גולמי ומחזיר תוצר מוכן — דוגמה חיה לאיך נראית עבודה מקצועית עם AI.",
        stack: "Node.js / API",
        type: "תרגול"
    },
    {
        title: "פריסה מאובטחת ל־Vercel",
        description: "כל מה שצריך כדי לקחת פרויקט מהמחשב שלך לאינטרנט — בלי לפחד מהרגע של הפריסה הראשונה.",
        stack: "Vercel / Next.js",
        type: "פרויקט"
    }
];

// Editorial previews — mirror the in-lesson WorkflowBlock voice so the page literally
// previews the kind of block a learner will meet inside a real lesson. No terminal chrome.
const modules = [
    {
        objective: "ללמוד לעבוד בקצב מקצועי",
        title: "שיפוץ קוד בהדרכה",
        mindset:
            "לומדים לחשוב על שינויים בקבוצות במקום עריכה נקודתית. אתה מנהל את הכיוון, Claude נושא את התחביר. הקצב הוא קצב של מי שיודע איפה הוא נמצא.",
        preview: {
            kind: "workflow",
            title: "המסלול שתחזור עליו בכל שיפוץ",
            stages: [
                { label: "כוונה", description: "אתה מתאר את השינוי במשפט אחד — לפני שאתה כותב שורת קוד" },
                { label: "חקירה", description: "Claude קורא את הקבצים הרלוונטיים ומבין את ההקשר של הפרויקט" },
                { label: "תכנון", description: "מולך נפרשת תוכנית שינויים — קבצים, סדר, תלויות. אתה מאשר או מתקן" },
                { label: "ביצוע", description: "השינויים נכתבים ישירות בקבצים, לא בצ׳אט. אין העתק־הדבק, אין טאבים פתוחים" },
                { label: "אימות", description: "סריקה אחרונה — בדיקות, lint, קומפילציה — לפני שאתה ניגש לקוד שוב" },
            ],
        },
    },
    {
        objective: "ללמוד לפרוס בלי לחץ",
        title: "פריסה אוטומטית — מודרך",
        mindset:
            "פריסה היא כלי, לא טקס. בונים ביטחון דרך תרגול ובדיקות. הצעד האחרון נשאר בידיים שלך — לא בידיים של אוטומציה עיוורת.",
        preview: {
            kind: "workflow",
            title: "ככה נראית פריסה מודרכת",
            stages: [
                { label: "בדיקה", description: "מערך הבדיקות כולו רץ לפני שמשהו ניגש לפרודקשן" },
                { label: "אריזה", description: "בנייה נקייה — שום state אישי או מפתח לא מגיע לסביבה החיה" },
                { label: "תצוגה מקדימה", description: "התוצר עולה לכתובת זמנית ב־Vercel, אפשר לבחון אותה לפני קידום" },
                { label: "קידום", description: "אישור מודע שלך — לא אוטומציה עיוורת, אלא הצעד האחרון בידיים שלך" },
                { label: "מעקב", description: "ניטור קצר אחרי הקידום — שתדע שהכול עובד, ולא רק שזה עלה" },
            ],
        },
    },
];

const philosophy = [
    "אנחנו לא מלמדים תחביר. אנחנו מלמדים איך לחשוב יחד עם AI.",
    "Claude Code הוא לא עוד קורס תכנות. זה מסלול לימוד מודרך — איך הופכים את Claude לשותף עבודה אמיתי, לא לעוד טאב פתוח.",
    "במהלך הקורס תעבור משאילתות בודדות לעבודה במסלולים שלמים, ותרגיש איך נראית הפרודוקטיביות של מפתח מקצועי שעובד עם AI מהיום הראשון."
];

export function ClaudeCode() {
    return (
        <CourseWorldLayout identity={CLAUDE_CODE_IDENTITY}>
            <CourseHero
                title="Claude Code"
                subtitle="מסלול לימוד מודרך לעבודה מקצועית עם AI — מההתקנה הראשונה ועד פרויקט שחי בפרודקשן."
                ctaText="התחל את הקורס"
                identity={CLAUDE_CODE_IDENTITY}
                eyebrow="YUVALCODE · המכון"
                openingStatement={heroOpeningStatement}
            />
            <SystemsBlueprint
                phases={phases}
                identity={CLAUDE_CODE_IDENTITY}
                heading="מסלול הלימוד"
                intro="ארבעה פרקים. שישה־עשר שיעורים. מסלול הדרגתי שבונה אותך — צעד אחר צעד."
            />
            <BuildOutcomes outcomes={outcomes} identity={CLAUDE_CODE_IDENTITY} />
            <ModulePreview
                modules={modules}
                identity={CLAUDE_CODE_IDENTITY}
                heading="ככה נראה שיעור מבפנים"
                intro="לא צילום מסך מבונה — חתיכה אחת אמיתית מהשפה והקצב של החומר."
            />
            <LearningPhilosophy content={philosophy} />
            <GatewayEntry
                targetUrl="/learn/claude-code"
                identity={CLAUDE_CODE_IDENTITY}
                ctaText="התחל את הקורס"
                eyebrow="פתיחה למסלול"
                heading="מתחילים את השיעור הראשון."
                body="כאן נגמרת הסקירה ומתחיל הלימוד עצמו. השיעור הראשון נבנה רגוע במכוון — קודם נסתכל על Claude מלמעלה, בלי להתקין דבר. שום קצב לא ייכפה עליך, ואפשר תמיד לחזור אחורה."
                transitionText="פותחים את השיעור הראשון..."
            />
        </CourseWorldLayout>
    );
}
