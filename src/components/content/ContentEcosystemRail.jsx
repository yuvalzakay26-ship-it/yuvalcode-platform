import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Youtube,
    Bot,
    Layers,
    GraduationCap,
    Compass,
    Mail,
    MessagesSquare,
    ArrowLeft,
    Network,
} from "lucide-react";
import { SITE, WHATSAPP_LINK } from "../../lib/constants";

const EASE = [0.16, 1, 0.3, 1];

const NODES = [
    {
        id: "youtube",
        eyebrow: "Source",
        label: "YouTube",
        body: "הלב של הערוץ — תוכן ארוך, סדרות, וההסבר העמוק.",
        icon: Youtube,
        href: SITE.youtubeChannelUrl,
        external: true,
        rgb: "239, 68, 68",
        accent: "from-red-500/22 to-rose-500/12",
        ring: "group-hover:ring-red-400/40",
    },
    {
        id: "ai",
        eyebrow: "Track",
        label: "AI Track",
        body: "המסלול החי על Claude Code, סוכנים, RAG ומערכות.",
        icon: Bot,
        href: "/ai",
        external: false,
        rgb: "168, 85, 247",
        accent: "from-purple-500/22 to-pink-500/12",
        ring: "group-hover:ring-purple-400/40",
    },
    {
        id: "projects",
        eyebrow: "Systems",
        label: "Projects",
        body: "מערכות אמיתיות בייצור — case studies וארכיטקטורה.",
        icon: Layers,
        href: "/projects",
        external: false,
        rgb: "129, 140, 248",
        accent: "from-indigo-500/22 to-violet-500/12",
        ring: "group-hover:ring-indigo-400/40",
    },
    {
        id: "programming",
        eyebrow: "Foundation",
        label: "Programming",
        body: "C# ומה״ט — שכבת היסוד של כל מה שבא אחר כך.",
        icon: GraduationCap,
        href: "/exams",
        external: false,
        rgb: "56, 189, 248",
        accent: "from-sky-500/22 to-cyan-500/12",
        ring: "group-hover:ring-sky-400/40",
    },
    {
        id: "creator-journey",
        eyebrow: "Story",
        label: "Creator Journey",
        body: "המסע — החלטות, רגעי ספק, ושינויי כיוון בפומבי.",
        icon: Compass,
        href: "/about",
        external: false,
        rgb: "236, 72, 153",
        accent: "from-pink-500/22 to-rose-500/12",
        ring: "group-hover:ring-pink-400/40",
    },
    {
        id: "newsletter",
        eyebrow: "Soon",
        label: "Newsletter",
        body: "סיכום חודשי של מה שנלמד, נבנה, ושובר את הראש.",
        icon: Mail,
        href: "/contact?subject=newsletter",
        external: false,
        rgb: "139, 92, 246",
        accent: "from-violet-500/22 to-indigo-500/12",
        ring: "group-hover:ring-violet-400/40",
        soon: true,
    },
    {
        id: "community",
        eyebrow: "Community",
        label: "WhatsApp",
        body: "הקהילה — שאלות, פתרונות, ותחושת המסע יחד.",
        icon: MessagesSquare,
        href: WHATSAPP_LINK,
        external: true,
        rgb: "16, 185, 129",
        accent: "from-emerald-500/22 to-teal-500/12",
        ring: "group-hover:ring-emerald-400/40",
        conditional: true,
        soon: !WHATSAPP_LINK,
    },
];

function NodeCard({ node, index }) {
    const Icon = node.icon;
    const isLink = !node.external;
    const isExternal = node.external && node.href;
    const isStub = node.conditional && !node.href;

    const className = `group relative block h-full rounded-2xl glass-panel-1 p-5 lg:p-6 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 ring-1 ring-transparent ${node.ring} overflow-hidden ${isStub ? "opacity-60 pointer-events-none" : ""}`;

    const inner = (
        <>
            <div
                aria-hidden="true"
                className={`absolute -top-14 -right-14 w-40 h-40 rounded-full bg-gradient-to-br ${node.accent} blur-[60px] opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
            />
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                        <Icon className="h-4.5 w-4.5 text-white" strokeWidth={1.75} aria-hidden="true" style={{ width: 18, height: 18 }} />
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                        <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                            {node.eyebrow}
                        </span>
                        {node.soon && (
                            <span dir="ltr" className="inline-flex items-center px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.035] text-[9.5px] font-mono uppercase tracking-[0.18em] text-ink-muted">
                                soon
                            </span>
                        )}
                    </div>
                </div>
                <h3 dir="ltr" className="text-base lg:text-lg font-bold text-white text-left mb-2 group-hover:text-primary-200 transition-colors">
                    {node.label}
                </h3>
                <p className="text-[13.5px] text-ink-muted leading-relaxed mb-4">
                    {node.body}
                </p>
                {!isStub && (
                    <div className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/70 group-hover:text-white transition-colors">
                        חבר
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                    </div>
                )}
            </div>
        </>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.05, duration: 0.55, ease: EASE }}
            className="h-full"
        >
            {isStub ? (
                <div className={className}>{inner}</div>
            ) : isExternal ? (
                <a href={node.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {inner}
                </a>
            ) : isLink ? (
                <Link to={node.href} className={className}>
                    {inner}
                </Link>
            ) : (
                <div className={className}>{inner}</div>
            )}
        </motion.div>
    );
}

export function ContentEcosystemRail() {
    return (
        <section
            id="content-ecosystem-rail"
            className="py-24 relative z-10"
            aria-labelledby="content-ecosystem-rail-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        <Network className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        Connected Ecosystem
                    </div>
                    <h2 id="content-ecosystem-rail-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        <span className="text-brand-gradient">הכל</span> מתחבר.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        כל ערוץ הוא נקודה אחת ברשת. צופה אחד יכול להיכנס מהיוטיוב, לעבור ל-AI Track, ולסיים בקהילה — בלי לאבד את החוט.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                    {NODES.map((n, i) => (
                        <NodeCard key={n.id} node={n} index={i} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-ink-dim max-w-xl mx-auto">
                        כל קצה במפה הזו מקבל context משלו ולא חי בנפרד. זה מה שמייצר אקוסיסטם — לא רשימת ערוצים מקבילים.
                    </p>
                </div>
            </div>
        </section>
    );
}
