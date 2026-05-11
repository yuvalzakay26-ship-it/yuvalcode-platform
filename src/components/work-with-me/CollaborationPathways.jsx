import { motion } from "framer-motion";
import { Users, Cpu, GraduationCap, BookOpen, Megaphone, ArrowLeft } from "lucide-react";
import { Tilt3D, CardGlow } from "../ui/Tilt3D";

const EASE = [0.16, 1, 0.3, 1];

const PATHWAYS = [
    {
        id: "creator-collaborations",
        number: "01",
        eyebrow: "Creator Collaborations",
        title: "שיתופי פעולה עם יוצרים.",
        forWhom: "For · יוצרים, מורים, ומובילי תוכן טכנולוגי בישראל ומחוצה לה.",
        looksLike:
            "סדרות משותפות, אורחים בערוץ, פרויקטים הדדיים, ופורמטים חדשים שמחברים בין קהלים. עבודה ממוקדת ערך — לא חילופי שמות.",
        philosophy:
            "הקהל הוא לא מטבע. שיתוף פעולה טוב נולד מסקרנות אמיתית, מסכים שלמים זה את זה, ומסיפור שלא היה מסופר בלי שני הצדדים.",
        future: "Future · /work-with-me/collaborations · sub-brand series · creator-to-creator residencies.",
        icon: Users,
        rgb: "129, 140, 248",
        accent: "from-indigo-500/25 to-violet-500/15",
        ring: "group-hover:ring-indigo-400/40",
    },
    {
        id: "ai-experiments",
        number: "02",
        eyebrow: "AI Workflow Experiments",
        title: "ניסויי AI ו-Workflows יחד.",
        forWhom: "For · יוצרים וצוותים שמתחילים לשלב סוכנים בשרשרת העבודה ורוצים שותף שיחקור את זה איתם בפומבי.",
        looksLike:
            "מיפוי משותף של זרימת עבודה קיימת, ניסויים מתועדים עם Claude / Claude Code / Anti Gravity, ובחינה כנה של איפה AI עוזר ב-stack שלכם — בלי להבטיח playbook מוכן.",
        philosophy:
            "AI לא מחליף שיקול דעת — הוא מאיץ אותו. כל ניסוי מתועד, כל החלטה ניתנת להגנה. זה learning-in-public משותף, לא ייעוץ enterprise.",
        future: "Future · /work-with-me/experiments · public lessons · co-explored workflows.",
        icon: Cpu,
        rgb: "251, 146, 60",
        accent: "from-orange-500/25 to-amber-500/15",
        ring: "group-hover:ring-amber-400/40",
    },
    {
        id: "private-lessons",
        number: "03",
        eyebrow: "Private Lessons & Mentorship",
        title: "שיעורים פרטיים ו-Mentorship.",
        forWhom: "For · סטודנטים, מפתחים מתחילים, ויוצרי תוכן שרוצים ליווי 1:1 לאורך זמן.",
        looksLike:
            "מסלול אישי — לא חבילת שעות. מתחילים בשיחת היכרות, בונים תכנית של 6–12 שבועות, ומלווים בין מפגשים ב-Obsidian משותף.",
        philosophy:
            "ההוראה הטובה ביותר היא 1:1, עם פרויקט אמיתי בידיים. מטרת הליווי היא שתסיים עצמאי — לא שתישאר תלוי.",
        future: "Future · /work-with-me/private-lessons · cohort-based programs · alumni community.",
        icon: GraduationCap,
        rgb: "168, 85, 247",
        accent: "from-purple-500/25 to-fuchsia-500/15",
        ring: "group-hover:ring-purple-400/40",
    },
    {
        id: "educational-partnerships",
        number: "04",
        eyebrow: "Educational Partnerships",
        title: "שיתופי פעולה חינוכיים.",
        forWhom: "For · בתי ספר, מכללות, מסגרות לימוד, ופלטפורמות תוכן חינוכי.",
        looksLike:
            "סדנאות, הרצאות אורח, סדרות תוכן ייעודיות, ובניית curriculum למסלולי תכנות ו-AI שעובדים בכיתה ובערוץ במקביל.",
        philosophy:
            "חינוך טכנולוגי שעובד הוא public-by-default — אם אפשר ללמד אותו בכיתה ובערוץ באותה רמת איכות, זה הסטנדרט.",
        future: "Future · /work-with-me/partnerships · co-built curricula · school-to-channel pipelines.",
        icon: BookOpen,
        rgb: "16, 185, 129",
        accent: "from-emerald-500/25 to-teal-500/15",
        ring: "group-hover:ring-emerald-400/40",
    },
    {
        id: "sponsorships",
        number: "05",
        eyebrow: "Future Sponsorships",
        title: "Sponsorships עתידיים.",
        forWhom: "For · חברות שבונות כלים אמיתיים — AI, dev tooling, knowledge systems, creator infrastructure.",
        looksLike:
            "Sponsorship סלקטיבי, רק לכלים שאני משתמש בהם בפועל. סקירות כנות, integrations מתועדות, ו-long-form content שלא מרגיש כמו מודעה.",
        philosophy:
            "Sponsorship בערוץ הזה הוא endorsement. אם הכלי לא נכנס ל-stack — הוא לא נכנס לסרטון. הקהל נבנה על אמון, ולא נמכר על clicks.",
        future: "Future · /work-with-me/sponsorships · annual partner roster · transparent disclosure.",
        icon: Megaphone,
        rgb: "236, 72, 153",
        accent: "from-pink-500/25 to-rose-500/15",
        ring: "group-hover:ring-pink-400/40",
    },
];

function PathwayCard({ pathway, index }) {
    const Icon = pathway.icon;
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
                    className={`relative h-full rounded-[1.75rem] glass-panel-2 p-7 lg:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-white/20 ring-1 ring-transparent ${pathway.ring}`}
                >
                    <CardGlow rgb={pathway.rgb} />

                    <div
                        className={`absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${pathway.accent} blur-[80px] opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                                <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                            </div>
                            <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                Pathway · {pathway.number}
                            </span>
                        </div>

                        {/* Eyebrow */}
                        <div dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-3 text-left">
                            {pathway.eyebrow}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl lg:text-[26px] font-bold text-white mb-3 group-hover:text-primary-200 transition-colors leading-snug">
                            {pathway.title}
                        </h3>

                        {/* For whom */}
                        <p dir="ltr" className="text-[11.5px] font-mono uppercase tracking-[0.18em] text-ink-dim mb-4 text-left">
                            {pathway.forWhom}
                        </p>

                        {/* What it looks like */}
                        <p className="text-ink-muted leading-relaxed mb-5 text-[14.5px]">
                            {pathway.looksLike}
                        </p>

                        {/* Philosophy callout */}
                        <div className="rounded-xl bg-white/[0.025] border border-white/[0.06] px-4 py-3 mb-5">
                            <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-1.5">
                                Approach
                            </span>
                            <p className="text-[13.5px] text-ink leading-relaxed">{pathway.philosophy}</p>
                        </div>

                        {/* Future direction */}
                        <p dir="ltr" className="text-[11px] font-mono uppercase tracking-[0.16em] text-ink-dim mb-6 text-left leading-relaxed">
                            {pathway.future}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-5 mt-auto border-t border-white/5">
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-primary-200 transition-colors">
                                Explore pathway
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                            </span>
                            <span dir="ltr" className="inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.18em] text-ink-dim">
                                Selective intake
                            </span>
                        </div>
                    </div>
                </article>
            </Tilt3D>
        </motion.div>
    );
}

export function CollaborationPathways() {
    return (
        <section
            id="collaboration-pathways"
            className="py-24 relative z-10"
            aria-labelledby="collaboration-pathways-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        Collaboration Pathways
                    </div>
                    <h2
                        id="collaboration-pathways-heading"
                        className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4"
                    >
                        חמש <span className="text-brand-gradient">דרכים</span> לעבוד יחד.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        אין כאן חבילות שירות, ואין מחירונים. כל pathway היא תיאור כן של איך נראית עבודה משותפת —
                        עבור מי היא נכונה, מה היא כוללת, ולאיזה כיוון היא הולכת.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
                    {PATHWAYS.map((p, i) => (
                        <PathwayCard key={p.id} pathway={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
