import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Cpu,
    FolderKanban,
    Layers,
    Wrench,
    Youtube,
    Mail,
    MessagesSquare,
    Network,
    ArrowLeft,
} from "lucide-react";
import { SITE, WHATSAPP_LINK } from "../../lib/constants";

const EASE = [0.16, 1, 0.3, 1];

const NODES = [
    {
        id: "ai",
        eyebrow: "AI Track",
        title: "מסלול AI",
        body: "Claude Code, Anti Gravity, Obsidian — כיצד נראית עבודה עם AI כיוצר.",
        href: "/ai",
        external: false,
        rgb: "129, 140, 248",
        icon: Cpu,
    },
    {
        id: "projects",
        eyebrow: "Projects",
        title: "מערכות חיות",
        body: "YuvalCode, Mahat Library, AI Workflow Systems — מערכות שעובדות ב-air.",
        href: "/projects",
        external: false,
        rgb: "236, 72, 153",
        icon: FolderKanban,
    },
    {
        id: "content",
        eyebrow: "Content OS",
        title: "אקוסיסטם תוכן",
        body: "8 pillars · graph-shaped · binge-engine של היוצר.",
        href: "/content",
        external: false,
        rgb: "168, 85, 247",
        icon: Layers,
    },
    {
        id: "stack",
        eyebrow: "Creator Stack",
        title: "מערכת ההפעלה",
        body: "ה-stack הציבורי — workflows, tools, automation streams.",
        href: "/stack",
        external: false,
        rgb: "251, 146, 60",
        icon: Wrench,
    },
    {
        id: "youtube",
        eyebrow: "YouTube",
        title: "לב הערוץ",
        body: "תוכן שבועי על תכנות, AI, ו-creator systems. הקהל שמשמש כ-feedback loop.",
        href: SITE.youtubeChannelUrl,
        external: true,
        rgb: "239, 68, 68",
        icon: Youtube,
    },
    {
        id: "newsletter",
        eyebrow: "Newsletter",
        title: "סיכום חודשי",
        body: "סיכום של מה שנבנה, מה שנלמד, ומה שמגיע. ערוץ שיחה אישי יותר.",
        href: "/contact?subject=newsletter",
        external: false,
        rgb: "16, 185, 129",
        icon: Mail,
        soon: true,
    },
    {
        id: "community",
        eyebrow: "Community",
        title: "WhatsApp",
        body: "קהילת בונים — שיחות, שאלות, ו-quick feedback מקרובים.",
        href: WHATSAPP_LINK,
        external: true,
        rgb: "34, 197, 94",
        icon: MessagesSquare,
        conditional: true,
    },
];

function NodeCard({ node, index, reduced }) {
    const Icon = node.icon;
    const isInternal = !node.external;
    const isSoon = !!node.soon;

    const inner = (
        <article
            className="group relative h-full rounded-2xl glass-panel-2 p-6 lg:p-7 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
            style={{
                "--node-rgb": node.rgb,
            }}
        >
            <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[60px]"
                style={{ background: `rgba(${node.rgb}, 0.18)` }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-5">
                    <div
                        className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                        style={{
                            background: `rgba(${node.rgb}, 0.08)`,
                            borderColor: `rgba(${node.rgb}, 0.25)`,
                        }}
                    >
                        <Icon className="h-4.5 w-4.5 text-white" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                        {node.eyebrow}
                    </span>
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-white mb-2 leading-snug group-hover:text-primary-200 transition-colors">
                    {node.title}
                </h3>
                <p className="text-[14px] text-ink-muted leading-relaxed mb-5 flex-grow">
                    {node.body}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-primary-200 transition-colors">
                        חבר
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                    </span>
                    {isSoon && (
                        <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-dim">
                            soon
                        </span>
                    )}
                </div>
            </div>
        </article>
    );

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: EASE }}
            className="h-full"
        >
            {isInternal ? (
                <Link to={node.href} className="block h-full focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none rounded-2xl">
                    {inner}
                </Link>
            ) : (
                <a
                    href={node.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none rounded-2xl"
                >
                    {inner}
                </a>
            )}
        </motion.div>
    );
}

export function ConnectionEcosystem() {
    const reduced = useReducedMotion();
    const visibleNodes = NODES.filter((n) => !n.conditional || (n.conditional && n.href));

    return (
        <section
            id="connection-ecosystem"
            className="py-24 relative z-10"
            aria-labelledby="connection-ecosystem-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        <Network className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        Connection Ecosystem
                    </div>
                    <h2
                        id="connection-ecosystem-heading"
                        className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4"
                    >
                        הכל <span className="text-brand-gradient">מחובר</span>.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        שיתוף פעולה כאן לא חי בוואקום — הוא חלק ממערכת. ה-AI track, ה-Projects, ה-Content OS, וה-Stack מזינים זה את זה.
                        כל פרויקט נשען על האקוסיסטם, וכל קשר חדש מתווסף אליו.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
                    {visibleNodes.map((node, i) => (
                        <NodeCard key={node.id} node={node} index={i} reduced={reduced} />
                    ))}
                </div>
            </div>
        </section>
    );
}
