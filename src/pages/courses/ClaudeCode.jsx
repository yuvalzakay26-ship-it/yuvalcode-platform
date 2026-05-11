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

const phases = [
    {
        title: "תשתיות וסביבת עבודה",
        description: "הקמת הבסיס ההנדסי. הגדרת סביבת Claude Code, אינטגרציית מפתחות API, וארגון מערכת ההפעלה לתהליכי עבודה מוכווני AI.",
        modules: ["ארכיטקטורת CLI", "הזרקת קונטקסט", "אבטחת סביבת עבודה"]
    },
    {
        title: "תהליכי עבודה טבעיים",
        description: "מעבר מכתיבת הנחיות רגילות ליצירה פרוגרמטית. תסריטי עבודה עם Claude Code לניהול שינויים רוחביים במערכות מורכבות.",
        modules: ["עיבוד אצווה", "ניתוח בסיס קוד", "שיפוץ קוד אוטומטי"]
    },
    {
        title: "ארכיטקטורת הנחיות",
        description: "עיצוב הנחיות מערכתיות רב-פעמיות שמתפקדות כקוד לכל דבר. בניית ספריות הנחיות ליצירת אינטליגנציה עקבית וצפויה.",
        modules: ["הנחיות מערכתיות", "סילום מתקדם", "מאגרי הנחיות"]
    },
    {
        title: "תזמור מערכות",
        description: "תכנון יישומים יציבים לשרתי ייצור תוך שימוש ב-Claude כארכיטקט הראשי. יישום תהליכי CI/CD ישירות ממסוף הפקודות.",
        modules: ["צינורות פריסה", "אינטגרציה עם Vercel", "ניטור סביבת ייצור"]
    }
];

const outcomes = [
    {
        title: "צינור CI/CD מוכוון AI",
        description: "תהליך פריסה אוטומטי לחלוטין המשולב עם GitHub Actions, ומנוהל כולו דרך ממשק שורת הפקודה (CLI) של Claude.",
        stack: "GitHub / Claude",
        type: "תשתית"
    },
    {
        title: "לוח בקרה למערכות ייצור",
        description: "לוח בקרה מבוסס React שנבנה מתוך חשיבה מערכתית ואיטרציות מתמשכות. מתוכנן לסילום ויציבות.",
        stack: "React / Tailwind",
        type: "יישום"
    },
    {
        title: "מערכת אוטומציה לתוכן",
        description: "צינור עיבוד ויצירת תוכן אוטומטי שהופך נתוני גלם לתוצרים מוגמרים המוכנים לפריסה.",
        stack: "Node.js / API",
        type: "אוטומציה"
    },
    {
        title: "ארכיטקטורת פריסה",
        description: "סביבת Vercel מאובטחת המנוהלת באמצעות תהליכי AI, כולל פריסות תצוגה מקדימה אוטומטיות.",
        stack: "Vercel / Next.js",
        type: "מערכות"
    }
];

const modules = [
    {
        objective: "שליטה בתהליכי עבודה",
        title: "שיפוץ קוד קונטקסטואלי",
        mindset: "חשיבה במונחים של שינויים מערכתיים במקום עריכות נקודתיות. מתן אפשרות ל-AI לטפל בתחביר בזמן שאתה מנהל את הארכיטקטורה.",
        workflow: "> claude analyze --depth=full\n> claude refactor src/components --pattern=composition\n\n[OK] מנתח 42 קבצים...\n[OK] מיישם תבנית Composition...\n[SUCCESS] 14 קבצים עודכנו בהצלחה."
    },
    {
        objective: "הנדסת מערכות עבודה",
        title: "פריסה אוטומטית",
        mindset: "התייחסות לפריסה כאל קריאת API במקום כמטלה ידנית. בניית ביטחון דרך תהליכי בדיקה אוטומטיים.",
        workflow: "> claude test --all\n[OK] 124 בדיקות עברו בהצלחה.\n\n> claude deploy --prod\n[OK] בונה סביבת ייצור...\n[SUCCESS] הסביבה באוויר בכתובת claude-code.vercel.app"
    }
];

const philosophy = [
    "אנו לא מלמדים תחביר. אנו מלמדים מערכות.",
    "Claude Code איננו קורס תכנות רגיל. זוהי סביבת הפעלה עבור המהנדס המודרני. הקורס דורש משמעת, מבנה ברור, ושינוי באופן בו אתה תופס את המכונה.",
    "על ידי שליטה בתהליכי עבודה מוכווני AI, אתה עובר מתפקיד של בונה פיצ'רים בודדים לארכיטקט של מערכות הנדסיות שלמות."
];

export function ClaudeCode() {
    return (
        <CourseWorldLayout identity={CLAUDE_CODE_IDENTITY}>
            <CourseHero 
                title="Claude Code"
                subtitle="סביבת ההפעלה המערכתית לתהליכי פיתוח מודרניים מבוססי בינה מלאכותית."
                ctaText="התחל למידה"
                identity={CLAUDE_CODE_IDENTITY}
            />
            <SystemsBlueprint phases={phases} identity={CLAUDE_CODE_IDENTITY} />
            <BuildOutcomes outcomes={outcomes} identity={CLAUDE_CODE_IDENTITY} />
            <ModulePreview modules={modules} identity={CLAUDE_CODE_IDENTITY} />
            <LearningPhilosophy content={philosophy} />
            <GatewayEntry 
                targetUrl="/404" 
                identity={CLAUDE_CODE_IDENTITY} 
                ctaText="התחל למידה"
            />
        </CourseWorldLayout>
    );
}
