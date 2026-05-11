import { motion, useReducedMotion } from "framer-motion";
import { Play, FileVideo, Youtube, Terminal } from "lucide-react";
import { Button } from "../ui/Button";
import { SITE } from "../../lib/constants";

const EASE = [0.16, 1, 0.3, 1];

const MEDIA_TYPES = [
    {
        id: "implementation",
        title: "Implementation Clips",
        description: "הדגמות קצרות של יישום מנגנונים טכניים בסביבת ייצור.",
        icon: Terminal
    },
    {
        id: "engineering",
        title: "Engineering Snippets",
        description: "קוד, ארכיטקטורה, והסברים ויזואליים של מערכות תוכנה.",
        icon: FileVideo
    },
    {
        id: "youtube",
        title: "YouTube Integration",
        description: "ההרצאות המלאות, סיכומי בנייה (Build Logs) ווולוגים טכניים.",
        icon: Youtube
    }
];

export function SupportingMediaLayer() {
    const reduced = useReducedMotion();

    return (
        <section className="py-24 relative overflow-hidden bg-black/40">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

            <div className="container px-4 mx-auto max-w-5xl relative z-10">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div dir="ltr" className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest uppercase text-slate-400 mb-6">
                            <Play className="w-3 h-3" />
                            Supporting Media
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight">
                            מדיה תומכת מערכות
                        </h2>
                        <p className="text-ink-muted text-lg font-light leading-relaxed">
                            תוכן הוידאו אינו המוצר. הוא שכבת התמיכה. סרטונים, קטעי קוד וויזואליזציות נועדו להמחיש את המערכות הנלמדות במסלולי ההתמחות ולהראות את תהליכי הפיתוח מאחורי הקלעים.
                        </p>
                    </div>

                    <a href={SITE.youtubeChannelUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="gap-2 bg-black/50 border-white/10 hover:border-white/20 hover:bg-white/5 backdrop-blur-sm">
                            <Youtube className="w-4 h-4 text-red-500/80" />
                            ערוץ היוטיוב המלא
                        </Button>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MEDIA_TYPES.map((media, index) => {
                        const Icon = media.icon;
                        return (
                            <motion.div
                                key={media.id}
                                initial={reduced ? false : { opacity: 0, y: 15 }}
                                whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
                                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-display font-medium text-slate-200 mb-2">
                                    {media.title}
                                </h3>
                                <p className="text-slate-500 text-sm font-light leading-relaxed">
                                    {media.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Cinematic Viewer Placeholder (or subtle visual) */}
                <motion.div
                    initial={reduced ? false : { opacity: 0, scale: 0.98 }}
                    whileInView={reduced ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 1.2, ease: EASE }}
                    className="mt-12 rounded-2xl overflow-hidden border border-white/10 bg-black relative aspect-video md:aspect-[21/9]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-950" />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4 opacity-50">
                            <div className="w-16 h-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                                <Play className="w-6 h-6 text-white translate-x-0.5" strokeWidth={1.5} />
                            </div>
                            <span dir="ltr" className="text-[10px] font-mono tracking-widest uppercase text-white/50">Media Viewer System</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
