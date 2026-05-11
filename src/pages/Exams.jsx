import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles, GraduationCap, Code, Cpu } from "lucide-react";
import { Button } from "../components/ui/Button";
import { fetchPlaylistsManifest } from "../lib/youtubeService";
import { sortExams } from "../lib/examsSort";
import { motion } from "framer-motion";

import { PageMeta } from "../components/PageMeta";

export function Exams() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("הכל");
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    const EASE = [0.16, 1, 0.3, 1];

    // Fetch Data
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const { data } = await fetchPlaylistsManifest();
            if (data) {
                // Sort the playlists using the shared logic
                const sorted = sortExams(data);

                // Filter out non-Mahat topics
                const filtered = sorted.filter(exam =>
                    !exam.title.toLowerCase().includes("unity") &&
                    !exam.title.toLowerCase().includes("reactnative") &&
                    !exam.title.includes("ליטקוד")
                );

                setExams(filtered);
            }
            setLoading(false);
        };
        load();
    }, []);

    // Helper to get icon/color based on exam type
    const getExamStyle = (title) => {
        const t = title.toLowerCase();
        if (t.includes("אלגוריתם") || t.includes("אלגוריתמיקה")) {
            return { icon: <Cpu className="h-6 w-6" />, color: "text-ink", bg: "bg-white/5", bloomClass: "bloom-crimson" };
        }
        if (t.includes("מבני נתונים")) {
            return { icon: <Code className="h-6 w-6" />, color: "text-ink", bg: "bg-white/5", bloomClass: "bloom-violet" };
        }
        return { icon: <GraduationCap className="h-6 w-6" />, color: "text-ink", bg: "bg-white/5", bloomClass: "bloom-blue" };
    };

    return (
        <div className="py-32 min-h-screen relative overflow-hidden bg-background">
            <PageMeta
                title="קטלוג מבחני מה״ט"
                description="מאגר מסודר של כל מבחני מה״ט בהנדסת תוכנה — מסודר לפי שנים, מועדים ונושאים, עם פתרון וידאו לכל שאלה."
                path="/exams"
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "מוסד הלמידה", path: "/content" },
                    { name: "MAT Systems", path: "/exams" },
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "מאגר פתרונות מה״ט",
                    "inLanguage": "he-IL",
                    "isPartOf": { "@type": "WebSite", "name": "YuvalCode", "url": "https://yuvalcode.co.il" }
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
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] opacity-20" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </motion.div>

            <div className="container px-4 mx-auto relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, y: isMobile ? 10 : 15, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: isMobile ? 1.4 : 1.8, delay: isMobile ? 0.2 : 0.3, ease: EASE }}
                            className="flex items-center gap-2 mb-3"
                        >
                            <span className="p-2 bg-white/5 border border-white/10 rounded-lg text-ink-muted">
                                <BookOpen className="h-5 w-5" />
                            </span>
                            <span className="text-ink-muted font-bold tracking-wide uppercase text-sm">קטלוג מבחני מה״ט</span>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: isMobile ? 15 : 20, filter: 'blur(12px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: isMobile ? 1.5 : 1.8, delay: isMobile ? 0.5 : 0.7, ease: EASE }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            מאגר <span className="text-brand-gradient">פתרונות מה״ט</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: isMobile ? 10 : 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 0.9 : 1.2, ease: EASE }}
                            className="text-ink-dim text-lg max-w-xl"
                        >
                            כל המבחנים והתרגולים מסודרים לפי נושאים ושנים. בחרו מבחן והתחילו לתרגל.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 1.3 : 1.7, ease: EASE }}
                    >
                        <Link to="/">
                            <Button variant="outline" className="border-white/10 hover:bg-white/5 gap-2 text-ink">
                                <ArrowRight className="h-4 w-4 rotate-180" />
                                חזרה לבית
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Grid */}
                {loading ? (
                    <motion.div 
                        initial={{ opacity: 0, filter: 'blur(8px)', y: isMobile ? 15 : 20 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ duration: isMobile ? 1.5 : 1.8, delay: isMobile ? 2.0 : 2.6, ease: EASE }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-48 rounded-3xl bg-surface/50 animate-pulse border border-white/5" />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, filter: 'blur(8px)', y: isMobile ? 15 : 20 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ duration: isMobile ? 1.5 : 1.8, delay: isMobile ? 2.0 : 2.6, ease: EASE }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {exams.map((exam, index) => {
                            const style = getExamStyle(exam.title);
                            return (
                                <Link
                                    key={exam.id}
                                    to={`/videos?exam=${encodeURIComponent(exam.title)}&pid=${exam.id}`}
                                    className="block"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        className={`group relative h-full p-8 rounded-3xl surface-warm card-ambient ${style.bloomClass}`}
                                    >
                                        <div className="relative card-content-layer">
                                            <div className={`w-14 h-14 rounded-2xl ${style.bg} ${style.color} flex items-center justify-center mb-6 text-xl shadow-lg border border-white/10 group-hover:scale-[1.02] group-hover:border-white/20 transition-all duration-300`}>
                                                {style.icon}
                                            </div>

                                            <h3 className="text-2xl font-bold text-ink mb-2 group-hover:text-white transition-colors">
                                                {exam.title}
                                            </h3>

                                            <div className="flex items-center text-sm font-medium text-ink-muted group-hover:text-white transition-colors mt-4">
                                                <span>לפתרון המלא</span> ({exam.itemCount} סרטונים)
                                                <ArrowRight className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
