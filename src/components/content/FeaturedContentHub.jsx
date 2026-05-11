import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Play,
    ArrowLeft,
    Clock,
    Sparkles,
    Bot,
    Layers,
    GraduationCap,
    Library,
    Compass,
} from "lucide-react";
import { fetchLatestVideos } from "../../lib/youtubeService";

const EASE = [0.16, 1, 0.3, 1];

const CONTINUE_EXPLORING = [
    {
        id: "ai",
        eyebrow: "Track · AI",
        title: "מסלול AI",
        body: "איך אני משתמש בכלים וסוכנים בעבודה היומיומית.",
        href: "/ai",
        icon: Bot,
        accent: "from-purple-500/22 to-pink-500/12",
        rgb: "168, 85, 247",
        external: false,
    },
    {
        id: "projects",
        eyebrow: "Track · Systems",
        title: "פרויקטים",
        body: "פרויקטים שבניתי — מהתכנון ועד לקוד אמיתי שרץ.",
        href: "/projects",
        icon: Layers,
        accent: "from-indigo-500/22 to-violet-500/12",
        rgb: "129, 140, 248",
        external: false,
    },
    {
        id: "programming",
        eyebrow: "Track · Programming",
        title: "מבחני מה״ט ב-C#",
        body: "מאות פתרונות וידאו, ממוינים לפי שנה ונושא.",
        href: "/exams",
        icon: GraduationCap,
        accent: "from-blue-500/22 to-cyan-500/12",
        rgb: "56, 189, 248",
        external: false,
    },
];

function FeaturedHero({ video }) {
    if (!video) return null;
    return (
        <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-[2rem] glass-panel-2 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
        >
            <div className="relative aspect-video w-full overflow-hidden">
                <img
                    src={video.thumbnailUrl}
                    alt={video.examTitle || video.title || "סרטון מומלץ"}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] opacity-90 group-hover:opacity-100"
                    loading="lazy"
                />

                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    Featured
                </div>

                {video.durationLabel && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                        <Clock className="w-3 h-3 text-gray-300" aria-hidden="true" />
                        {video.durationLabel}
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-95" aria-hidden="true" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                    <div className="w-20 h-20 rounded-full bg-primary/95 flex items-center justify-center shadow-2xl shadow-primary/40 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-8 w-8 text-white fill-current" />
                    </div>
                </div>
            </div>

            <div className="p-7 lg:p-8 relative">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-3">
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    הסרטון האחרון
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-primary-200 transition-colors leading-snug mb-3 line-clamp-2">
                    {video.examTitle
                        ? `שאלה ${video.questionNumber} · ${video.examTitle}`
                        : (video.title || "התוכן האחרון בערוץ")}
                </h3>
                <p className="text-gray-400 leading-relaxed line-clamp-2 mb-6">
                    {video.topic
                        ? `נושא: ${video.topic}. צפייה מומלצת למי שמתכונן למבחן.`
                        : "נקודת התחלה טובה. צפו ותראו אם זה רלוונטי למה שאתם לומדים."}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary-300 group-hover:text-white transition-colors">
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                    צפה ביוטיוב
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                </div>
            </div>
        </a>
    );
}

function StripCard({ video, index }) {
    return (
        <motion.a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.05, duration: 0.55, ease: EASE }}
            className="group relative flex items-stretch gap-4 p-3 rounded-2xl glass-panel-1 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
        >
            <div className="relative w-32 sm:w-40 aspect-video flex-shrink-0 overflow-hidden rounded-xl">
                <img
                    src={video.thumbnailUrl}
                    alt={video.examTitle || "סרטון"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-85 group-hover:opacity-100"
                    loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                    <div className="w-9 h-9 rounded-full bg-primary/95 flex items-center justify-center shadow-lg shadow-primary/40">
                        <Play className="h-4 w-4 text-white fill-current" />
                    </div>
                </div>
                {video.durationLabel && (
                    <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-bold text-white">
                        {video.durationLabel}
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0 py-1">
                <div dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-dim mb-1.5 text-left">
                    {video.topic || "Latest"}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-primary-200 transition-colors line-clamp-2 leading-snug">
                    {video.examTitle
                        ? `שאלה ${video.questionNumber} · ${video.examTitle}`
                        : (video.title || "סרטון")}
                </h4>
            </div>
        </motion.a>
    );
}

function FallbackHero() {
    return (
        <div className="rounded-[2rem] glass-panel-2 p-10 lg:p-12 flex flex-col justify-end aspect-video relative overflow-hidden">
            <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 bg-primary/15 rounded-full blur-[100px]" />
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    הסרטון האחרון
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-snug">
                    לא הצלחנו לטעון תוכן כרגע. נסו לרענן את הדף.
                </h3>
                <p className="text-ink-muted leading-relaxed">
                    בינתיים, אפשר להמשיך לאחד המסלולים למטה.
                </p>
            </div>
        </div>
    );
}

export function FeaturedContentHub() {
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
        <section
            id="featured-content-hub"
            className="py-24 relative z-10"
            aria-labelledby="featured-content-hub-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-12">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        <Library className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        סרטונים מומלצים
                    </div>
                    <h2 id="featured-content-hub-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        התוכן <span className="text-brand-gradient">המומלץ</span>.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        הסרטון האחרון שעלה לערוץ, ונקודות כניסה למי שרוצה להתחיל ללמוד.
                    </p>
                </div>

                {/* Hero featured + secondary strip */}
                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 aspect-[16/11] rounded-[2rem] bg-surface/30 animate-pulse" aria-hidden="true" />
                        <div className="space-y-3" aria-hidden="true">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-28 rounded-2xl bg-surface/30 animate-pulse" />
                            ))}
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                        <div className="lg:col-span-2">
                            {featured ? <FeaturedHero video={featured} /> : <FallbackHero />}
                        </div>

                        <div className="flex flex-col gap-3">
                            {rest.length > 0 ? (
                                rest.map((v, i) => (
                                    <StripCard key={v.id || v.videoId} video={v} index={i} />
                                ))
                            ) : (
                                <div className="flex-1 flex items-center justify-center rounded-2xl glass-panel-1 p-6 text-center text-sm text-ink-muted">
                                    סרטונים נוספים יעלו בקרוב
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Continue exploring */}
                <div className="mt-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="hairline flex-1" />
                        <span dir="ltr" className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                            <Compass className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                            המשיכו ללמוד
                        </span>
                        <div className="hairline flex-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {CONTINUE_EXPLORING.map((c, i) => {
                            const Icon = c.icon;
                            return (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ delay: i * 0.06, duration: 0.55, ease: EASE }}
                                >
                                    <Link
                                        to={c.href}
                                        className="group relative block h-full rounded-2xl glass-panel-1 p-6 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                                    >
                                        <div
                                            aria-hidden="true"
                                            className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${c.accent} blur-[60px] opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                                        />
                                        <div className="relative z-10">
                                            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                                                <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                                            </div>
                                            <div dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-2 text-left">
                                                {c.eyebrow}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-200 transition-colors leading-snug">
                                                {c.title}
                                            </h3>
                                            <p className="text-sm text-ink-muted leading-relaxed mb-5">
                                                {c.body}
                                            </p>
                                            <div className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                                                המשך
                                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
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
