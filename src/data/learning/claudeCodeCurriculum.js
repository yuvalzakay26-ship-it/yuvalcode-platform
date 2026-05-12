// Core Learning Shell — Claude Code course curriculum
// Hebrew-first content. Block-driven lesson viewport.

export const COURSE = {
    id: "claude-code",
    slug: "claude-code",
    palette: "claude-code",
    title: "Claude Code",
    subtitle: "ללמוד לעבוד מקצועית עם AI",
    totalLessons: 16,
    // Institutional course-level framing — surfaces only on lesson 1 as a quiet preface.
    preface:
        "ארבעה פרקים, שישה־עשר שיעורים. הקורס הזה לא נועד ללמד אותך את Claude — הוא נועד ללמד אותך לעבוד.",
};

// ---------------------------------------------------------------------------
// Module tree — chapters → lessons
// status: "completed" | "active" | "upcoming" | "locked"
// ---------------------------------------------------------------------------

export const chapters = [
    {
        id: "ch-01",
        index: 1,
        title: "יסודות העבודה עם Claude",
        summary: "הכרות עם Claude Code והכנת סביבת העבודה שלך.",
        context:
            "אנחנו נכנסים יחד לחומר — בלי להתקין דבר, בלי לרוץ. בפרק הזה Claude הופך מ׳עוד שירות שמישהו דיבר עליו׳ לכלי שאתה יודע איך לעבוד איתו ביומיום.",
        mindsetShift:
            "מעבר מהתפיסה של ׳עוד כלי השלמת קוד׳ לתפיסה של ׳שותף עבודה שחי בתוך הפרויקט שלך׳.",
        professionalFrame:
            "Claude כבר יהיה חלק מסביבת העבודה היומיומית שלך — לא טאב נוסף, אלא חלק מהזרימה.",
        reassurance:
            "אם רעיון לא יישב לך מיד, זה בסדר. כל מה שיוזכר כאן יחזור שוב — עם דוגמאות ותרגול — בפרקים הבאים. הקצב שלך הוא הקצב שלך.",
        status: "active",
        lessons: [
            { id: "ch01-l01", slug: "intro",         index: 1, title: "מבוא — מה זה Claude Code, ולמה זה משנה",  duration: "08:42", status: "active"   },
            { id: "ch01-l02", slug: "install",       index: 2, title: "התקנה ראשונה וחיבור Claude לכלי שלך",     duration: "11:05", status: "upcoming" },
            { id: "ch01-l03", slug: "context",       index: 3, title: "איך Claude קורא את הקוד שלך",              duration: "14:20", status: "upcoming" },
            { id: "ch01-l04", slug: "secure-env",    index: 4, title: "שמירה על מפתחות וסביבת עבודה בטוחה",       duration: "09:30", status: "upcoming" },
        ],
    },
    {
        id: "ch-02",
        index: 2,
        title: "בניית Workflows אמיתיים",
        summary: "מעבר משאלות בודדות למסלולי עבודה מקצועיים.",
        context:
            "אחרי שהבסיס הונח, אנחנו עוברים מ׳לשאול את Claude שאלה׳ ל׳לעבוד איתו על משימה׳. כאן העבודה מתחילה להרגיש כמו עבודה אמיתית — לא כמו שיחה.",
        mindsetShift:
            "להפסיק לחשוב במונחים של שאלה־תשובה, ולהתחיל לחשוב במונחים של מסלולי עבודה שלמים.",
        professionalFrame:
            "תיקח משימה מורכבת, תפרק אותה לשלבים, ותעבוד איתה לאורך זמן — בדיוק כמו מפתח שמכיר את העבודה שלו.",
        reassurance:
            "החומר כאן נשען על מה שכבר ראית, ולא מצפה ממך לזכור הכול. רעיונות חשובים יחזרו בכל פעם שנפגוש אותם בהקשר חדש.",
        status: "locked",
        lessons: [
            { id: "ch02-l01", slug: "batch",         index: 1, title: "לעבוד על מספר קבצים בו־זמנית",      duration: "12:10", status: "locked" },
            { id: "ch02-l02", slug: "analyze",       index: 2, title: "להבין פרויקט שלם בעזרת Claude",     duration: "13:55", status: "locked" },
            { id: "ch02-l03", slug: "refactor",      index: 3, title: "שיפוץ קוד מודרך — לאט ובטוח",       duration: "15:40", status: "locked" },
            { id: "ch02-l04", slug: "review",        index: 4, title: "סקירת קוד יחד עם Claude",           duration: "10:25", status: "locked" },
        ],
    },
    {
        id: "ch-03",
        index: 3,
        title: "איך לחשוב נכון עם AI",
        summary: "הנחיות, הקשר וחזרתיות — כתיבת בקשות שעובדות.",
        context:
            "כאן הקצב משתנה קצת. במקום ללמוד עוד פעולה, נעצור ונסתכל על מה שעומד מאחורי הפעולה — איך מעצבים בקשה שהמכונה באמת מבינה.",
        mindsetShift:
            "להבין שהנחיה היא לא טקסט — היא ארכיטקטורה. ההנחיה היא הצורה שבה אתה מעצב את החשיבה של הכלי.",
        professionalFrame:
            "תכתוב הנחיות שעובדות באופן עקבי, ותדע לבדוק אם הן באמת עושות את מה שאתה מצפה מהן.",
        reassurance:
            "הפרק הזה דורש קצת יותר ריכוז, אבל לא מהירות. אם קטע דורש שתי קריאות — קרא אותו שתי פעמים. בדיוק לזה נועד החומר הזה.",
        status: "locked",
        lessons: [
            { id: "ch03-l01", slug: "system-prompts",   index: 1, title: "הנחיות מערכתיות — איך Claude יודע מה לעשות", duration: "11:30", status: "locked" },
            { id: "ch03-l02", slug: "prompt-scaling",   index: 2, title: "להתאים את ההנחיה לגודל הפרויקט",             duration: "13:00", status: "locked" },
            { id: "ch03-l03", slug: "prompt-libraries", index: 3, title: "מאגר הנחיות אישי — לעבוד פעם, להשתמש תמיד",   duration: "10:15", status: "locked" },
            { id: "ch03-l04", slug: "evals",            index: 4, title: "איך יודעים אם הנחיה באמת עובדת",              duration: "12:45", status: "locked" },
        ],
    },
    {
        id: "ch-04",
        index: 4,
        title: "חשיבה מערכתית עם AI",
        summary: "מקטע קוד בודד אל פרויקט שחי בפרודקשן.",
        context:
            "כל מה שעשינו עד עכשיו חי במחשב המקומי שלך. עכשיו אנחנו מוציאים את הקוד אל העולם — אל פרודקשן, אל משתמשים אמיתיים, אל מערכת שחיה.",
        mindsetShift:
            "להפסיק לראות פרויקט כאוסף של קבצים, ולהתחיל לראות אותו כמערכת שחיה — עם פריסה, ניטור, וזמן ריצה.",
        professionalFrame:
            "תוציא משהו לעולם — פרויקט שאתה יכול להראות, שעובד באמת, ושנבנה לאורך מסלול מקצועי מסודר.",
        reassurance:
            "פריסה לפרודקשן יכולה להישמע מפחידה. הפרק הזה נבנה בדיוק כדי להוריד את הפחד הזה — לאט, צעד אחר צעד, ולא בקפיצה אחת.",
        status: "locked",
        lessons: [
            { id: "ch04-l01", slug: "ci-cd",        index: 1, title: "אוטומציה של פריסה — Claude לאורך כל הדרך",   duration: "14:10", status: "locked" },
            { id: "ch04-l02", slug: "vercel",      index: 2, title: "עבודה משולבת עם Vercel",                       duration: "12:30", status: "locked" },
            { id: "ch04-l03", slug: "monitoring",  index: 3, title: "מה לעשות כשמשהו נשבר בפרודקשן",                 duration: "13:20", status: "locked" },
            { id: "ch04-l04", slug: "production",  index: 4, title: "פרויקט סיום — מערכת מלאה שעובדת",               duration: "16:45", status: "locked" },
        ],
    },
];

// ---------------------------------------------------------------------------
// Lesson content — block-driven. Lesson Viewport renders blocks in order.
// Block types: "video" | "prose" | "ai-example" | "workflow" | "code" | "callout"
// ---------------------------------------------------------------------------

export const lessons = {
    "ch01-l01": {
        id: "ch01-l01",
        chapterId: "ch-01",
        chapterTitle: "פרק 1 · יסודות העבודה עם Claude",
        index: 1,
        title: "מבוא — מה זה Claude Code, ולמה זה משנה",
        eyebrow: "שיעור 1",
        duration: "08:42",
        objective: "להבין מה Claude Code מציע מעבר ל־autocomplete, ואיך הוא משנה את אופן העבודה של מפתח יחיד.",
        openingNote: "אל תרגיש שאתה חייב להבין הכול מיד. השיעור הזה הוא הסתכלות מלמעלה — ההכרות הראשונה. כל פרט יחזור בהמשך עם דוגמאות חיות.",
        closingNote: "נמשיך אל ההתקנה הראשונה — צעד אחר צעד, יחד.",
        blocks: [
            {
                type: "prose",
                paragraphs: [
                    "לפני שנכנסים פנימה — שווה לעצור רגע. הקורס הזה לא מתחיל בהתקנה, אלא בשינוי תפיסה. בשיעור הזה ננסה להבין מה זה בעצם Claude Code, ולמה זה לא עוד כלי שמשלים שורות קוד.",
                    "אם משהו ייראה לך לא ברור לחלוטין — זה בסדר גמור. החומר הזה נבנה בקצב מתון: כל רעיון שאני אזכיר עכשיו יחזור בהמשך הקורס עם הדגמה ותרגול. כרגע מספיק להחזיק את התמונה הכללית.",
                ],
            },
            {
                type: "video",
                title: "מבוא ל־Claude Code",
                duration: "08:42",
                poster: null,
            },
            {
                type: "prose",
                title: "לא עוד כלי השלמה",
                paragraphs: [
                    "רוב המפתחים פוגשים את Claude כצ׳אט בדפדפן, או כהשלמה אוטומטית בעורך. Claude Code הוא משהו אחר לגמרי: שותף עבודה שחי בתוך הטרמינל שלך, יודע לקרוא ולערוך את כל הקוד של הפרויקט, להריץ פקודות, ולסגור משימות שלמות בכוחות עצמו.",
                    "במקום לכתוב הנחיה, לקבל קטע קוד, ולהדביק אותו אצלך — אתה מתאר משימה במשפט אחד, והוא ניגש לעבודה: קורא את הקבצים הרלוונטיים, מבין תלויות, מציע שינויים רוחביים, ומריץ בדיקות. התפקיד שלך משתנה. אתה כבר לא מקליד את כל הקוד — אתה מנהל כוונה.",
                ],
            },
            {
                type: "callout",
                tone: "insight",
                title: "מה ישתנה אצלך כבר בשבוע הראשון",
                body: "תפסיק לקפוץ בין העורך לצ׳אט. תפסיק להעתיק ולהדביק קטעי קוד. תתחיל לחשוב במונחים של משימות שלמות במקום עריכות נקודתיות. ההרגלים שיתעצבו אצלך כאן ילוו אותך לאורך כל הקורס.",
            },
            {
                type: "prose",
                paragraphs: [
                    "כדי להמחיש איך זה נראה בפועל, ניקח דוגמה אמיתית. נניח שאתה מקבל באג בקוד החיובים — לפעמים לקוחות מחויבים פעמיים. במקום לפתוח את ה־IDE ולחפש שעה את המקור, אתה פונה ל־Claude ומספר לו מה קרה.",
                    "תקרא את הדוגמה הבאה לאט. הרעיון שאנחנו רוצים שתיקח איתך מכאן הוא איך Claude חושב על הבעיה — איזה סדר פעולות הוא בוחר. הקוד עצמו יחזור בפירוט מאוחר יותר בקורס.",
                ],
            },
            {
                type: "ai-example",
                title: "באג חי — איך Claude מנתח אותו צעד אחר צעד",
                prompt: "תקן את הבאג במסלול התשלום שגורם לפעמים לחיוב כפול",
                steps: [
                    { label: "איתור", text: "סורק את src/checkout/* ומאתר את הטיפול בתשלום" },
                    { label: "ניתוח", text: "מזהה race condition בטיפול בשליחה — אין השהיה (debounce) על הכפתור" },
                    { label: "תכנון", text: "מציע שילוב של מפתח idempotency עם נעילת ממשק עד שהשרת חוזר" },
                    { label: "ביצוע", text: "עורך שלושה קבצים, מעדכן בדיקה, מריץ pnpm test" },
                ],
            },
            {
                type: "prose",
                paragraphs: [
                    "שמת לב שזה לא קסם? כל שלב כאן הוא בדיוק מה שהיית עושה בעצמך — רק מהיר יותר, ובלי לאבד הקשר באמצע. וזה הסוד של עבודה מקצועית עם AI: לדעת לפרק משימה לשלבים, ולתת לכלי לעבוד מתוך אותה דרך חשיבה.",
                    "הנה איך זה נראה כשמסתכלים על המסלול הזה מלמעלה. אין צורך לזכור את כל השלבים בעל פה — מה שחשוב כרגע זה לראות את הקצב.",
                ],
            },
            {
                type: "workflow",
                title: "המסלול שתחזור עליו שוב ושוב",
                stages: [
                    { label: "כוונה", description: "אתה מתאר את המטרה במשפט אחד, בלי לכתוב קוד" },
                    { label: "חקירה", description: "Claude קורא את הקבצים הרלוונטיים ומבין את ההקשר של הפרויקט" },
                    { label: "תכנון", description: "הוא מציע תוכנית פעולה — אתה מאשר, מתקן, או מבקש כיוון אחר" },
                    { label: "עריכה", description: "השינויים נכתבים ישירות בקבצים, לא בצ׳אט. שום העתק־הדבק" },
                    { label: "אימות", description: "בדיקות, סריקת איכות וקומפילציה — הכול רץ אוטומטית בסוף" },
                ],
            },
            {
                type: "reflection",
                eyebrow: "רגע לעצור",
                questions: [
                    "איזה שלב במסלול הזה — כוונה, חקירה, תכנון, ביצוע, אימות — אתה עושה היום הכי פחות?",
                    "איפה זה היה יכול לעזור לך בפרויקט אמיתי שעבדת עליו לאחרונה?",
                ],
                note: "אין צורך להגיב, אין מה לרשום. אלה שאלות פתוחות — לעצור איתן לרגע, ולהמשיך כשיתאים לך.",
            },
            {
                type: "prose",
                title: "מה אתה כן עושה — ומה אתה כבר לא",
                paragraphs: [
                    "לא תפתח שלושה טאבים של Stack Overflow רק כדי לזכור תחביר. לא תכתוב ביטוי רגולרי בניסוי וטעייה. לא תעשה שינוי שם ל־47 קבצים בעריכה ידנית.",
                    "אבל — וזה חשוב — Claude Code לא מחליף שיקול דעת. הוא מאיץ ביצוע. ההכרעות הקשות באמת — איזו מערכת לבנות, איזו ארכיטקטורה לבחור, מתי לעצור ולחשוב — נשארות שלך. בקורס הזה אתה לומד גם איך לדעת מתי לסמוך עליו, ומתי לעצור אותו.",
                ],
            },
            {
                type: "callout",
                tone: "practice",
                title: "רגע, לפני שממשיכים",
                body: "אל תחפש להתקין כלום עדיין. המטרה של השיעור הזה היא לעצב את התפיסה. ההתקנה תקרה בשיעור הבא, צעד אחר צעד, ביחד.",
            },
            {
                type: "prose",
                paragraphs: [
                    "בכל זאת, כדי שתדע לאן אנחנו הולכים, ככה ייראו שלוש השורות הראשונות שתעבוד איתן בקרוב. אין צורך לרוץ ולנסות עכשיו — זה רק טעימה ויזואלית של מה שמחכה. תסתכל על המבנה, לא על הפרטים.",
                ],
            },
            {
                type: "code",
                title: "המבט הראשון על Claude Code",
                language: "bash",
                code: `# התקנה
npm install -g @anthropic-ai/claude-code

# חיבור חד־פעמי לחשבון
claude auth login

# פתיחה בתוך פרויקט קיים
cd ~/projects/my-app
claude

> תקן את הבאג ב־checkout שגורם לכפילות חיוב
`,
            },
            {
                type: "callout",
                tone: "next",
                title: "מה לומדים בשיעור הבא",
                body: "התקנת Claude על המחשב שלך, חיבור חד־פעמי לחשבון, והפיכת התיקייה הראשונה שלך לסביבת עבודה חיה. נעבור את זה יחד — בלי קיצורי דרך, ובלי לפחד מהטרמינל.",
            },
        ],
    },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getLesson(lessonId) {
    return lessons[lessonId] || null;
}

// Returns the chapter that owns this lesson, plus whether this lesson is the
// first lesson in that chapter — used by the viewport to render the chapter intro.
export function getChapterContext(lessonId) {
    for (const chapter of chapters) {
        const idx = chapter.lessons.findIndex(l => l.id === lessonId);
        if (idx === -1) continue;
        return {
            chapter,
            isFirstLessonOfChapter: idx === 0,
            isFirstLessonOfCourse: chapter.index === 1 && idx === 0,
            lessonIndexInChapter: idx + 1,
            lessonsInChapter: chapter.lessons.length,
        };
    }
    return null;
}

export function getLessonNeighbors(lessonId) {
    const flat = chapters.flatMap(ch => ch.lessons.map(l => ({ ...l, chapterTitle: ch.title })));
    const idx = flat.findIndex(l => l.id === lessonId);
    return {
        prev: idx > 0 ? flat[idx - 1] : null,
        next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
        total: flat.length,
        current: idx + 1,
    };
}

export function getProgress() {
    const flat = chapters.flatMap(ch => ch.lessons);
    const completed = flat.filter(l => l.status === "completed").length;
    return {
        completed,
        total: flat.length,
        percent: Math.round((completed / flat.length) * 100),
    };
}
