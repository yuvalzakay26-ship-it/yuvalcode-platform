import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Code2, Sparkles, Target, Zap, Youtube, ChevronRight } from "lucide-react";
import { PrivateLessonCard } from "../components/ui/PrivateLessonCard";
import { PageMeta } from "../components/PageMeta";
import { SITE } from "../lib/constants";

const COLOR_STYLES = {
    orange: {
        sweep: "from-orange-500/0 via-orange-500/5 to-orange-500/0",
        iconBg: "bg-orange-500/10",
        iconText: "text-orange-400",
        iconShadow: "shadow-orange-500/10",
    },
    blue: {
        sweep: "from-blue-500/0 via-blue-500/5 to-blue-500/0",
        iconBg: "bg-blue-500/10",
        iconText: "text-blue-400",
        iconShadow: "shadow-blue-500/10",
    },
    purple: {
        sweep: "from-purple-500/0 via-purple-500/5 to-purple-500/0",
        iconBg: "bg-purple-500/10",
        iconText: "text-purple-400",
        iconShadow: "shadow-purple-500/10",
    },
};

export function About() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    const EASE = [0.16, 1, 0.3, 1];

    const container = {
        hidden: { opacity: 0, filter: 'blur(8px)', y: isMobile ? 15 : 20 },
        show: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                duration: isMobile ? 1.5 : 1.8,
                delay: isMobile ? 1.5 : 2.0,
                ease: EASE,
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-background text-white overflow-hidden relative">
            <PageMeta
                title="אודות"
                description="יובל זכאי — מפתח, יוצר, וארכיטקט של מערכת הפעלה דיגיטלית ליוצרים וקוד."
                path="/about"
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "אודות", path: "/about" },
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "name": "אודות יובל זכאי",
                    "url": `${SITE.url}/about`,
                    "mainEntity": {
                        "@type": "Person",
                        "name": "Yuval Zakay",
                        "alternateName": "יובל זכאי",
                        "url": SITE.url
                    }
                }}
            />

            {/* Ambient Atmosphere */}
            <motion.div 
                aria-hidden="true" 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
            >
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] opacity-40" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </motion.div>

            <div className="container px-4 pt-32 mx-auto relative z-10">

                {/* Hero Section */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: isMobile ? 10 : 15, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: isMobile ? 1.4 : 1.8, delay: isMobile ? 0.2 : 0.3, ease: EASE }}
                        className="mb-6 p-3 glass-panel-2 rounded-2xl"
                    >
                        <Code2 className="h-12 w-12 text-primary" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: isMobile ? 15 : 20, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: isMobile ? 1.5 : 1.8, delay: isMobile ? 0.5 : 0.7, ease: EASE }}
                        className="text-5xl md:text-5xl font-bold text-white mb-6 tracking-normal"
                    >
                        נעים להכיר, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">יובל.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 0.9 : 1.2, ease: EASE }}
                        className="text-xl text-gray-400 max-w-2xl leading-relaxed"
                    >
                        מפתח, ויוצר ישראלי. בונה מערכות עם <span dir="ltr">AI</span>,
                        משתף את הארכיטקטורה בפומבי, ומתעד את כל הדרך —
                        מסקיצה ראשונית למערכת שרצה באוויר.
                    </motion.p>
                </div>

                {/* Main Content Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24"
                >
                    {/* Left: Values Cards */}
                    <div className="grid gap-6">
                        {[
                            {
                                icon: Target,
                                color: "orange",
                                title: "המטרה",
                                description: "לבנות תשתית ידע. לפרק בעיות הנדסיות מורכבות למערכות פשוטות, ולתת למפתחים וליוצרים כלים אמיתיים לבנות טוב יותר ומהר יותר עם כלים מודרניים."
                            },
                            {
                                icon: Zap,
                                color: "blue",
                                title: "השיטה",
                                description: "בלי תיאוריות באוויר. אני מאמין בלמידה פומבית (Build in Public) ובקוד אמיתי. כל פרויקט שאני בונה הופך לתהליך מתועד, משלב הארכיטקטורה ועד לדיפלוי."
                            },
                            {
                                icon: Sparkles,
                                color: "purple",
                                title: "החזון",
                                description: "להפוך את YuvalCode ממעבדת קוד אישית למערכת הפעלה דיגיטלית (Creator OS) למפתחים, ליוצרים ולקהילת ה-AI בישראל."
                            }
                        ].map((card, index) => {
                            const styles = COLOR_STYLES[card.color];
                            return (
                            <motion.div
                                key={index}
                                variants={item}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="glass-panel-1 group relative rounded-3xl p-6 transition-all duration-300 overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
                            >
                                {/* Hover Gradient bg */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${styles.sweep} translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none`} />

                                <div className="relative z-10 flex items-start gap-5">
                                    <div className={`p-4 rounded-2xl ${styles.iconBg} ${styles.iconText} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg ${styles.iconShadow}`}>
                                        <card.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                            {card.title}
                                        </h3>
                                        <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                            );
                        })}

                        {/* Tech Stack Redirect Card */}
                        <motion.div
                            variants={item}
                            whileHover={{ scale: 1.02 }}
                            className="p-8 rounded-3xl glass-panel-1 border-white/5 hover:border-primary/20 transition-all"
                        >
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />
                                המערכות שאני מריץ
                            </h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                הכלים שמפעילים את הערוץ, הפרויקטים והקוד. מסביבת הפיתוח (IDE) ועד לאוטומציות ה-AI שמריצות את הפלטפורמה הזו מאחורי הקלעים.
                            </p>
                            <a href="/stack" className="inline-flex items-center text-primary font-medium hover:text-primary-400 transition-colors group">
                                ראה את ה-Stack המלא 
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>

                        {/* Why Us / Stats Card */}
                        <motion.div
                            variants={item}
                            whileHover={{ scale: 1.02 }}
                            className="p-8 rounded-3xl glass-panel-1 border-primary/10"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-full bg-white/5" aria-hidden="true">
                                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">למה לעקוב?</h3>
                                    <p className="text-sm text-gray-400">ארכיטקטורה חשופה — קוד שעובד בעולם האמיתי.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="text-center p-4 rounded-2xl bg-black/20">
                                    <div className="text-xl font-bold text-white mb-1">Build in Public</div>
                                    <div className="text-xs text-gray-500">תיעוד תהליכים</div>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-black/20">
                                    <div className="text-xl font-bold text-white mb-1">AI-Native</div>
                                    <div className="text-xs text-gray-500">עבודה עם סוכנים</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Who is it for & Stats */}
                    <div className="space-y-8">
                        <motion.div variants={item} className="p-8 rounded-[2.5rem] glass-panel-2 border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] -mr-32 -mt-32 pointer-events-none" />

                            <h3 className="text-2xl font-bold text-white mb-6 relative z-10">הפלטפורמה מיועדת ל:</h3>
                            <div className="space-y-3 relative z-10">
                                {[
                                    "מפתחים בכל הרמות שמחפשים תוכן פרקטי",
                                    "יוצרים שמשלבים קוד ו-AI במערכות שלהם",
                                    "סטודנטים שצריכים חיבור לעולם האמיתי",
                                    "בוני ארכיטקטורות ומערכות מודרניות"
                                ].map((text, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-default border border-transparent hover:border-white/5"
                                        whileHover={{ x: 10 }}
                                    >
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                            <CheckCircle2 className="h-4 w-4 text-primary group-hover:text-white" />
                                        </div>
                                        <span className="text-gray-300 text-lg group-hover:text-white transition-colors">{text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                                <a
                                    href={SITE.youtubeChannelUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000]/20 transition-all font-medium border border-[#FF0000]/20 shadow-lg shadow-red-900/20 group"
                                >
                                    <Youtube className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                                    הצטרפו לערוץ היוטיוב
                                </a>
                            </div>
                        </motion.div>

                        {/* Private Lesson Card */}
                        <PrivateLessonCard />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
