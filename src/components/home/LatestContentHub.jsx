import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Youtube, Play, ArrowLeft, Clock, Sparkles, GraduationCap, Bot, LibraryBig } from "lucide-react";
import { Button } from "../ui/Button";
import { fetchLatestVideos } from "../../lib/youtubeService";
import { SITE } from "../../lib/constants";

const EASE = [0.16, 1, 0.3, 1];

const START_POINTS = [
    {
        id: "programming",
        title: "כל מבחני מה״ט ב-C#",
        subtitle: "הבסיס",
        description: "מאות פתרונות וידאו למבחני מה״ט, ממוינים לפי שנה ונושא.",
        icon: GraduationCap,
        href: "/exams",
        bloomClass: "bloom-blue",
    },
    {
        id: "ai",
        title: "הכלים של 2026",
        subtitle: "AI וסביבות עבודה",
        description: "איך אני משתמש ב-AI כדי לכתוב קוד מהר יותר ולנהל פרויקטים.",
        icon: Bot,
        href: "/ai",
        bloomClass: "bloom-violet",
    },
    {
        id: "browse",
        title: "כל הסרטונים",
        subtitle: "הקטלוג המלא",
        description: "כל הסרטונים שעלו אי פעם לערוץ, מרוכזים במקום אחד.",
        icon: LibraryBig,
        href: "/exams",
        bloomClass: "bloom-amber",
    },
];

function FeaturedVideoCard({ video }) {
    if (!video) return null;
    return (
        <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-3xl surface-warm card-ambient bloom-blue"
        >
            {/* 16:9 thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden card-content-layer">
                <img
                    src={video.thumbnailUrl}
                    alt={video.examTitle || video.title || "סרטון אחרון"}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] opacity-90 group-hover:opacity-100"
                    loading="lazy"
                />

                {/* Top-right featured badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-30 shadow-[0_0_8px_white]" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    חדש בערוץ
                </div>

                {/* Duration */}
                {video.durationLabel && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                        <Clock className="w-3 h-3 text-gray-300" />
                        {video.durationLabel}
                    </div>
                )}

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-95" />

                {/* Hover play */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-8 w-8 text-white fill-current" />
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-7 lg:p-8 relative card-content-layer">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-ink-muted mb-3">
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                    Featured · הסרטון האחרון
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-primary-200 transition-colors leading-snug mb-3 line-clamp-2">
                    {video.examTitle
                        ? `שאלה ${video.questionNumber} · ${video.examTitle}`
                        : (video.title || "הסרטון האחרון בערוץ")}
                </h3>
                <p className="text-ink-dim leading-relaxed line-clamp-2 mb-6">
                    {video.topic
                        ? `נושא: ${video.topic}. צפה בהסבר מלא ומעמיק עם דגשים שיעזרו לך לעבור את המבחן.`
                        : "צפה בהסבר המלא ביוטיוב, עם דגשים מעשיים שתוכל ליישם מיד."}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    <Play className="h-4 w-4 fill-current" />
                    צפה עכשיו ביוטיוב
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </div>
            </div>
        </a>
    );
}

function CompactVideoCard({ video }) {
    return (
        <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-stretch gap-4 p-3 rounded-2xl surface-warm card-ambient bloom-blue"
        >
            <div className="relative w-32 sm:w-40 aspect-video flex-shrink-0 overflow-hidden rounded-xl card-content-layer">
                <img
                    src={video.thumbnailUrl}
                    alt={video.examTitle || "סרטון"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05] opacity-90 group-hover:opacity-100"
                    loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Play className="h-4 w-4 text-white fill-current" />
                    </div>
                </div>
                {video.durationLabel && (
                    <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-bold text-white">
                        {video.durationLabel}
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0 py-1 card-content-layer">
                <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-ink-dim mb-1.5">
                    {video.topic || "Latest"}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-ink group-hover:text-white transition-colors line-clamp-2 leading-snug">
                    {video.examTitle
                        ? `שאלה ${video.questionNumber} · ${video.examTitle}`
                        : (video.title || "סרטון")}
                </h4>
            </div>
        </a>
    );
}

export function LatestContentHub() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        (async () => {
            const { data } = await fetchLatestVideos();
            if (alive && data) setVideos(data.slice(0, 4));
            if (alive) setLoading(false);
        })();
        return () => { alive = false; };
    }, []);

    const featured = videos[0];
    const rest = videos.slice(1, 4);

    return (
        <section className="py-24 relative z-10">
            <div className="container px-4 mx-auto">
                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-30 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-400" />
                            </span>
                            סרטונים אחרונים
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-3">
                            מרכז <span className="text-brand-gradient">התוכן</span>
                        </h2>
                        <p className="text-lg text-ink-muted max-w-xl leading-relaxed">
                            הסרטונים האחרונים שעלו לערוץ, ונקודות התחלה מסודרות למי שרוצה להתחיל ללמוד.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href={SITE.youtubeSubscribeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="lg"
                                className="gap-2 px-6 bg-red-600 hover:bg-red-700 from-red-600 to-red-600 shadow-xl shadow-red-900/25 border-0"
                            >
                                <Youtube className="h-5 w-5 fill-current" />
                                הירשם לערוץ
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Featured + compact list */}
                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 aspect-[16/11] rounded-3xl bg-surface/30 animate-pulse" />
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-28 rounded-2xl bg-surface/30 animate-pulse" />
                            ))}
                        </div>
                    </div>
                ) : featured ? (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                        <div className="lg:col-span-2">
                            <FeaturedVideoCard video={featured} />
                        </div>
                        <div className="flex flex-col gap-3">
                            {rest.length > 0 ? (
                                rest.map((v) => <CompactVideoCard key={v.id || v.videoId} video={v} />)
                            ) : (
                                <div className="flex-1 flex items-center justify-center rounded-2xl glass-panel-1 p-6 text-center text-sm text-ink-muted">
                                    סרטונים נוספים יעלו בקרוב
                                </div>
                            )}

                            <Link to="/exams" className="mt-auto">
                                <Button
                                    variant="outline"
                                    className="w-full gap-2 border-white/10 hover:border-white/25"
                                >
                                    כל הסרטונים בקטלוג
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <div className="rounded-3xl glass-panel-1 p-12 text-center">
                        <p className="text-ink-muted">לא הצלחנו לטעון סרטונים כרגע. נסו לרענן את הדף.</p>
                    </div>
                )}

                {/* Recommended start points */}
                <div className="mt-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="hairline flex-1" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                            נקודות התחלה
                        </span>
                        <div className="hairline flex-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {START_POINTS.map((sp, i) => {
                            const Icon = sp.icon;
                            return (
                                <motion.div
                                    key={sp.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                                >
                                    <Link
                                        to={sp.href}
                                        className={`group block h-full rounded-2xl p-6 surface-warm card-ambient ${sp.bloomClass}`}
                                    >
                                        <div className="relative card-content-layer">
                                            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-[1.02] group-hover:border-white/20 transition-all duration-300">
                                                <Icon className="h-5 w-5 text-ink" strokeWidth={1.75} />
                                            </div>
                                            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-dim mb-2">
                                                {sp.subtitle}
                                            </div>
                                            <h3 className="text-xl font-bold text-ink group-hover:text-white transition-colors">
                                                {sp.title}
                                            </h3>
                                            <p className="text-sm text-ink-muted leading-relaxed mb-5">
                                                {sp.description}
                                            </p>
                                            <div className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted group-hover:text-white transition-colors">
                                                התחל
                                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
