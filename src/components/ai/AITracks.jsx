import { motion } from "framer-motion";
import { Terminal, Bot, Hexagon, Rocket, ArrowLeft } from "lucide-react";
import { Tilt3D, CardGlow } from "../ui/Tilt3D";

const EASE = [0.16, 1, 0.3, 1];

const TRACKS = [
    {
        id: "claude-code",
        number: "01",
        eyebrow: "Claude Code",
        title: "Workflows של מפתח עם סוכן",
        body: "איך עובדים יום-יום עם Claude Code: תכנון פיצ׳ר, קריאת קוד מורכב, מיגרציות, וסקירות. הגישה שמשנה את הקצב של פרויקטים אמיתיים.",
        bullets: ["Sub-agents · MCP · Skills", "Slash commands ו-hooks", "מקצב של commit-per-feature"],
        icon: Terminal,
        rgb: "251, 146, 60",
        accent: "from-orange-500/25 to-amber-500/15",
        ring: "group-hover:ring-amber-400/40",
        status: "פעיל",
        statusTone: "live",
    },
    {
        id: "agents",
        number: "02",
        eyebrow: "AI Agents · Exploring",
        title: "סוכנים, RAG, וניסויים אמיתיים",
        body: "סדרה של ניסויים מתועדים: איך מתכננים סוכן שלא נשבר, איך מחברים RAG בלי לטעות, ואיפה גבולות ההבנה של מודלים גדולים — דרך פרויקטים אישיים, לא תיאוריה.",
        bullets: ["Agent loops · tool use · memory", "RAG patterns · vector stores", "Eval harness · prompt regression"],
        icon: Bot,
        rgb: "168, 85, 247",
        accent: "from-purple-500/25 to-pink-500/15",
        ring: "group-hover:ring-purple-400/40",
        status: "בבנייה",
        statusTone: "building",
    },
    {
        id: "obsidian",
        number: "03",
        eyebrow: "Obsidian",
        title: "מערכת ידע של יוצר",
        body: "המוח השני שמחזיק כל סקריפט סרטון, כל לקח, וכל החלטה אדריכלית. איך בונים vault שבאמת מחזיק לאורך שנים.",
        bullets: ["Vault structure ל-creators", "Daily notes שעובדים", "Linked thinking · graph view"],
        icon: Hexagon,
        rgb: "139, 92, 246",
        accent: "from-violet-500/25 to-indigo-500/15",
        ring: "group-hover:ring-violet-400/40",
        status: "בקרוב",
        statusTone: "soon",
    },
    {
        id: "building",
        number: "04",
        eyebrow: "Building with AI · Learning",
        title: "מוצרים אמיתיים בעידן AI",
        body: "תיעוד למידה דרך פרויקטים אישיים: החלטות arch, עלויות, ולקחים על מה לא עובד כשמנסים להוציא מוצר מבוסס-AI מ-demo למשתמש אמיתי.",
        bullets: ["Architecture decisions בפועל", "Cost · latency · safety", "Ship every week"],
        icon: Rocket,
        rgb: "236, 72, 153",
        accent: "from-pink-500/25 to-rose-500/15",
        ring: "group-hover:ring-pink-400/40",
        status: "בקרוב",
        statusTone: "soon",
    },
];

const STATUS_STYLES = {
    live: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    building: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    soon: "text-ink-muted bg-white/[0.04] border-white/10",
};

function TrackCard({ track, index }) {
    const Icon = track.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.06, duration: 0.7, ease: EASE }}
            className="h-full"
        >
            <Tilt3D className="h-full">
                <article
                    className={`relative h-full rounded-[1.75rem] glass-panel-2 p-7 lg:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-white/20 ring-1 ring-transparent ${track.ring}`}
                >
                    <CardGlow rgb={track.rgb} />

                    <div className={`absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${track.accent} blur-[80px] opacity-80 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                                <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                    Track · {track.number}
                                </span>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-[0.18em] ${STATUS_STYLES[track.statusTone]}`}>
                                    {track.statusTone === "live" && (
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        </span>
                                    )}
                                    {track.status}
                                </span>
                            </div>
                        </div>

                        <div dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-3 text-left">
                            {track.eyebrow}
                        </div>

                        <h3 className="text-2xl lg:text-[26px] font-bold text-white mb-3 group-hover:text-primary-200 transition-colors leading-snug">
                            {track.title}
                        </h3>

                        <p className="text-ink-muted leading-relaxed mb-6 flex-grow text-[15px]">
                            {track.body}
                        </p>

                        <ul className="space-y-2 mb-6">
                            {track.bullets.map((b) => (
                                <li key={b} className="flex items-center gap-2.5 text-sm text-ink-muted">
                                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/30" />
                                    <span dir="auto">{b}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center justify-between pt-5 border-t border-white/5">
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-primary-200 transition-colors">
                                סדרת התוכן
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                            </span>
                        </div>
                    </div>
                </article>
            </Tilt3D>
        </motion.div>
    );
}

export function AITracks() {
    return (
        <section id="ai-tracks" className="py-24 relative z-10" aria-labelledby="ai-tracks-heading">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        Content Tracks · Roadmap
                    </div>
                    <h2 id="ai-tracks-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        ארבעה <span className="text-brand-gradient">מסלולי AI</span>.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        כל מסלול הוא סדרת תוכן עם עומק. תוכן מתפרסם לפי הקצב של בנייה אמיתית — לא לפי לוח שיווק.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
                    {TRACKS.map((t, i) => (
                        <TrackCard key={t.id} track={t} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
