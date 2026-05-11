import { CourseWorldLayout } from "../../components/course-world/CourseWorldLayout";
import { CourseHero } from "../../components/course-world/CourseHero";
import { SystemsBlueprint } from "../../components/course-world/SystemsBlueprint";
import { BuildOutcomes } from "../../components/course-world/BuildOutcomes";
import { ModulePreview } from "../../components/course-world/ModulePreview";
import { LearningPhilosophy } from "../../components/course-world/LearningPhilosophy";
import { GatewayEntry } from "../../components/course-world/GatewayEntry";

const CLAUDE_101_IDENTITY = {
    id: "claude-101",
    theme: "amber-gold",
    baseBg: "bg-black",
    glowColor: "bg-amber-900/20",
    textAccent: "text-amber-400",
    bgAccent: "bg-amber-500",
    borderAccent: "border-amber-500",
    borderAccentHover: "hover:border-amber-500/50",
};

const phases = [
    {
        title: "בהירות ארכיטקטונית",
        description: "הבנת היסודות של עבודה מול מודלי שפה, חשיבה מערכתית וניהול קונטקסט מקצועי בסביבות עבודה דינמיות.",
        modules: ["מבנה הנדסי", "עיצוב סביבת העבודה", "חשיבה מונחית-מערכת"]
    },
    {
        title: "משמעת אופרטיבית",
        description: "הטמעת הרגלי עבודה מתקדמים שמפרידים בין משתמש רגיל לאדריכל מערכות. ניהול משימות מורכבות ותעדוף תהליכים.",
        modules: ["בקרת איכות", "ניהול משימות", "תהליכי סקירה אוטומטיים"]
    },
    {
        title: "שילוב מערכתי",
        description: "אינטגרציה של AI לתוך תהליכי הפיתוח הקיימים שלך. בניית תהליכי עבודה עמידים, שקופים ויעילים.",
        modules: ["סינרגיית כלים", "עבודה מקבילית", "ארכיטקטורת נתונים"]
    }
];

const outcomes = [
    {
        title: "יסודות איתנים",
        description: "יכולת לגשת לכל פרויקט עם מתודולוגיה ברורה וסדורה, תוך שימוש בכלים הנכונים בזמן הנכון.",
        stack: "חשיבה מערכתית / Claude",
        type: "מתודולוגיה"
    },
    {
        title: "סביבת עבודה פרודוקטיבית",
        description: "הגדרה והתאמה אישית של כלי העבודה שלך להשגת יעילות מקסימלית ולמזעור חיכוך טכני.",
        stack: "אופטימיזציה / תהליכים",
        type: "אופרציה"
    }
];

const modules = [
    {
        objective: "שליטה בסביבה",
        title: "ארכיטקטורת עבודה נקייה",
        mindset: "הפרדת רעשים מהותיים. הבנת ההבדל בין פתרון נקודתי לתכנון מערכתי שיחזיק מעמד לטווח ארוך.",
        workflow: "> initialize --workspace\n[OK] מקים סביבת עבודה בסיסית...\n[SUCCESS] הסביבה מוכנה לעבודה מוכוונת AI."
    },
    {
        objective: "תקשורת הנדסית",
        title: "ניהול קונטקסט מקצועי",
        mindset: "מעבר מפקודות פשוטות להנחיות מערכתיות. כתיבת דרישות שיוצרות פלט צפוי ואמין.",
        workflow: "> context inject --source ./docs\n[OK] מנתח פרמטרים...\n[SUCCESS] קו בסיס הוגדר בהצלחה."
    }
];

const philosophy = [
    "אנו לא מלמדים קיצורי דרך. אנו מלמדים יסודות.",
    "קלוד 101 הוא שער הכניסה לעולם הפיתוח מבוסס ה-AI. הוא דורש הבנה עמוקה, סבלנות, ויכולת להסתכל על המערכת השלמה.",
    "כאשר היסודות יציבים, היכולת לבנות מערכות מורכבות הופכת לטבעית."
];

export function Claude101() {
    return (
        <CourseWorldLayout identity={CLAUDE_101_IDENTITY}>
            <CourseHero 
                title="Claude 101"
                subtitle="יסודות סביבות עבודה מבוססות AI. שילוב כלים מקצועי, בהירות מחשבתית ומשמעת אופרטיבית."
                ctaText="התחל למידה"
                identity={CLAUDE_101_IDENTITY}
            />
            <SystemsBlueprint phases={phases} identity={CLAUDE_101_IDENTITY} />
            <BuildOutcomes outcomes={outcomes} identity={CLAUDE_101_IDENTITY} />
            <ModulePreview modules={modules} identity={CLAUDE_101_IDENTITY} />
            <LearningPhilosophy content={philosophy} />
            <GatewayEntry 
                targetUrl="/courses/claude-101/access" 
                identity={CLAUDE_101_IDENTITY} 
                ctaText="התחל למידה"
            />
        </CourseWorldLayout>
    );
}
