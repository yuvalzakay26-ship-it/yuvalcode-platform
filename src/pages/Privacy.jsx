import { Shield, Lock, Eye, FileText, Database, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";

export default function Privacy() {
    const lastUpdate = new Date().toLocaleDateString("he-IL");

    const sections = [
        {
            icon: Shield,
            title: "כללי",
            content: "ברוכים הבאים ל-YuvalCode. אני מכבד את הפרטיות שלכם ורואה חשיבות עליונה בשמירה עליה. מסמך זה מפרט בצורה שקופה אילו נתונים אני אוסף, ולמה הם משמשים."
        },
        {
            icon: Database,
            title: "איסוף מידע",
            content: "בעת השימוש באתר נאסף מידע טכני בסיסי (כתובת IP, סוג דפדפן, זמני שהייה) כדי להבין אילו תכנים עובדים טוב יותר. בנוסף, מידע שתמסרו ביוזמתכם — כמו כתובת אימייל בהרשמה לניוזלטר — נשמר במערכת."
        },
        {
            icon: Eye,
            title: "עוגיות (Cookies)",
            content: "האתר משתמש בעוגיות לצורך תפעול תקין ושיפור חווית המשתמש (למשל, שמירת העדפות חיפוש או מניעת קופצים חוזרים). אני משתמש בשירותי צד-שלישי ממוקדי פרטיות ככל האפשר. ניתן לחסום זאת דרך הגדרות הדפדפן שלכם."
        },
        {
            icon: Lock,
            title: "אבטחת מידע",
            content: "המידע שלכם מוצפן תמיד ולא נמכר לעולם לשום גורם. אני משתמש בתשתיות אירוח מאובטחות ברמת Enterprise (כמו Vercel ו-Netlify) ומקפיד על הסטנדרטים הגבוהים ביותר."
        },
        {
            icon: FileText,
            title: "הזכויות שלכם",
            content: "המידע הוא שלכם. עומדת לכם הזכות לעיין בו, לבקש לתקן אותו או לדרוש את מחיקתו המוחלטת מהמערכות שלי בכל עת. לשם כך, פשוט שלחו לי הודעה."
        },
        {
            icon: Mail,
            title: "יצירת קשר",
            content: "לכל שאלה או בקשה בנושא פרטיות, אפשר לכתוב לי ישירות לכתובת: yuval@yuvalcode.co.il"
        }
    ];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden font-sans pb-20">
            <PageMeta
                title="מדיניות פרטיות"
                description="שקיפות היא הכל. מידע על האופן שבו אני אוסף, שומר ומגן על המידע שלכם בפלטפורמה."
                path="/privacy"
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "מדיניות פרטיות", path: "/privacy" },
                ]}
            />
            
            {/* Ambient Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] opacity-40" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            <div className="container mx-auto px-4 pt-32 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
                        <Lock className="w-4 h-4" />
                        <span>פרטיות ואבטחה</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-normal drop-shadow-2xl">
                        מדיניות <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">הפרטיות</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        שקיפות חשובה לי. כאן תמצאו את כל המידע על האופן שבו האתר אוסף, שומר ומגן על המידע שלכם.
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                        עודכן לאחרונה: {lastUpdate}
                    </div>
                </div>

                {/* Content Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="glass-panel-1 group relative rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
                        >
                            {/* Card Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-primary/30">
                                    <section.icon className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                    {section.title}
                                </h2>
                                <p className="text-gray-400 leading-relaxed whitespace-pre-line text-sm">
                                    {section.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Navigation */}
                <div className="mt-16 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm"
                    >
                        חזרה לדף הבית
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
