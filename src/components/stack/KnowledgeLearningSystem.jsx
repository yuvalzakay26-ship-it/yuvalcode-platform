import { motion, useReducedMotion } from "framer-motion";
import { Hexagon, Network, BookOpen, Brain, GitBranch, FileText } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const PRACTICES = [
    {
        icon: FileText,
        eyebrow: "Daily Notes",
        title: "כל יום מתחיל בעמוד אחד.",
        body: "Daily note הוא נקודת הכניסה. שאלות פתוחות, החלטות, ולקחים נכנסים שם — ומשם מתפצלים לקבצים נפרדים כשהרעיון בשל.",
    },
    {
        icon: Network,
        eyebrow: "Linked Thinking",
        title: "Graph לפני folders.",
        body: "אין מבנה היררכי קשיח. כל note מחובר לאחרים דרך wikilinks, וה-graph view מראה איך הרעיונות מתחברים — לפעמים דרך מקור שלא ציפיתי.",
    },
    {
        icon: BookOpen,
        eyebrow: "Decision Records",
        title: "ההחלטות חיות לנצח.",
        body: "כל החלטה אדריכלית או החלטת מוצר נכתבת — context, options, choice, consequences. בעוד שנה אני יכול להחזיר את המחשבה המקורית בדיוק.",
    },
    {
        icon: GitBranch,
        eyebrow: "Learning in Public",
        title: "סקריפטים לסרטונים.",
        body: "כל סרטון מתחיל ב-vault — מבנה, נקודות מפתח, ודמואים. הציבור מקבל את התוצר; ה-vault מחזיק את החשיבה שמאחוריו.",
    },
    {
        icon: Brain,
        eyebrow: "AI-assisted",
        title: "Claude קורא את ה-vault.",
        body: "הסקירות, הסיכומים, וההצלבות מתבצעות מול Claude. ה-AI הוא reader-לא-writer — הוא מסייע לקרוא 1000 notes, לא לכתוב מה לחשוב.",
    },
    {
        icon: Hexagon,
        eyebrow: "Long-term Vault",
        title: "Vault שמחזיק עשור.",
        body: "מבנה שמתוכנן ל-2030. plain Markdown, גיבויים אוטומטיים ל-iCloud, ו-version control על ה-vault עצמו. הידע לא תלוי בכלי שמפעיל אותו.",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function VaultGraph({ reduced }) {
    return (
        <motion.svg
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            aria-hidden="true"
            viewBox="0 0 320 220"
            className="w-full h-[200px] opacity-90"
        >
            <defs>
                <linearGradient id="vault-edge" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(168,85,247,0.85)" />
                    <stop offset="100%" stopColor="rgba(129,140,248,0.45)" />
                </linearGradient>
                <radialGradient id="vault-node" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(196,181,253,1)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0.75)" />
                </radialGradient>
            </defs>

            {[
                ["160", "30", "80", "90"],
                ["160", "30", "240", "90"],
                ["160", "30", "160", "120"],
                ["80", "90", "60", "180"],
                ["80", "90", "160", "120"],
                ["240", "90", "260", "180"],
                ["240", "90", "160", "120"],
                ["160", "120", "120", "180"],
                ["160", "120", "200", "180"],
                ["60", "180", "120", "180"],
                ["200", "180", "260", "180"],
            ].map(([x1, y1, x2, y2], i) => (
                <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#vault-edge)"
                    strokeWidth="1"
                    strokeOpacity="0.55"
                />
            ))}

            {[
                ["160", "30", 6],
                ["80", "90", 5],
                ["240", "90", 5],
                ["160", "120", 4.5],
                ["60", "180", 4],
                ["120", "180", 4],
                ["200", "180", 4],
                ["260", "180", 4],
            ].map(([cx, cy, r], i) => (
                <circle key={i} cx={cx} cy={cy} r={r} fill="url(#vault-node)" />
            ))}
        </motion.svg>
    );
}

export function KnowledgeLearningSystem() {
    const reduced = useReducedMotion();

    return (
        <section
            id="knowledge-system"
            className="py-24 relative z-10"
            aria-labelledby="knowledge-system-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16 items-center">
                    <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                            Knowledge & Learning System
                        </div>
                        <h2
                            id="knowledge-system-heading"
                            className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-5 leading-[1.05]"
                        >
                            <span className="text-brand-gradient">Vault</span> שמחזיק את כל מה שלמדתי.
                        </h2>
                        <p className="text-lg text-ink-muted leading-relaxed">
                            מערכת ידע של יוצר. <span dir="ltr" className="text-ink font-medium">Obsidian</span>, לא Notion. plain
                            Markdown, לא lock-in. <span dir="ltr" className="text-ink font-medium">Graph view</span>, לא folders. הידע נבנה לאורך זמן,
                            מתחבר עם עצמו, ונגיש בכל פרויקט.
                        </p>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="relative rounded-[1.75rem] glass-panel-2 p-6 lg:p-7 overflow-hidden">
                            <div
                                aria-hidden="true"
                                className="absolute -top-24 -right-24 w-60 h-60 bg-purple-500/15 rounded-full blur-[80px]"
                            />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-primary-300">
                                        Vault graph · live
                                    </span>
                                    <Hexagon className="h-4 w-4 text-purple-300" strokeWidth={1.75} aria-hidden="true" />
                                </div>
                                <VaultGraph reduced={reduced} />
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    variants={container}
                    initial={reduced ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
                >
                    {PRACTICES.map((p) => {
                        const Icon = p.icon;
                        return (
                            <motion.article
                                key={p.title}
                                variants={item}
                                className="group relative rounded-2xl glass-panel-1 p-6 overflow-hidden hover:border-white/15 transition-colors duration-500"
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute -top-12 -right-12 w-36 h-36 bg-purple-500/[0.10] rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="relative z-10">
                                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/[0.04] border border-white/10 text-purple-300 mb-5">
                                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                    </div>
                                    <span dir="ltr" className="block text-[10.5px] font-mono text-ink-dim tracking-[0.22em] uppercase mb-2">
                                        {p.eyebrow}
                                    </span>
                                    <h3 className="font-display text-lg lg:text-[19px] font-bold text-ink mb-2.5 leading-snug">
                                        {p.title}
                                    </h3>
                                    <p className="text-[13.5px] text-ink-muted leading-relaxed">
                                        {p.body}
                                    </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
