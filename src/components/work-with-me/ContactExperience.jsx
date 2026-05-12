import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    MessageSquare,
    Mail,
    Linkedin,
    MessagesSquare,
    ArrowLeft,
    Sparkles,
    Clock,
    ShieldCheck,
} from "lucide-react";
import { Button } from "../ui/Button";
import { SITE, MAILTO, WHATSAPP_LINK, RECRUITER_CONTACT_PATH } from "../../lib/constants";

const EASE = [0.16, 1, 0.3, 1];

const CHANNELS = [
    {
        id: "form",
        eyebrow: "Primary channel",
        title: "בקשת שיתוף פעולה",
        body: "טופס קצר כדי להבין מה אתם בונים ואיך אפשר לעזור. בלי flow של מכירות, רק תיאום ציפיות.",
        cta: "שלח פנייה",
        icon: MessageSquare,
        href: RECRUITER_CONTACT_PATH,
        internal: true,
        rgb: "129, 140, 248",
    },
    {
        id: "email",
        eyebrow: "Direct email",
        title: "מייל ישיר",
        body: "מעדיפים לשמור על שיחה אסינכרונית? המייל ההיסטורי הטוב ביותר.",
        cta: SITE.email,
        ctaLtr: true,
        icon: Mail,
        href: MAILTO,
        internal: false,
        external: false,
        rgb: "16, 185, 129",
    },
    {
        id: "linkedin",
        eyebrow: "LinkedIn",
        title: "פרופיל מקצועי",
        body: "התחברו, שלחו הודעה, או עקבו אחרי המסע המקצועי. רלוונטי במיוחד לפניות עסקיות וארגוניות.",
        cta: "פתח LinkedIn",
        icon: Linkedin,
        href: SITE.linkedinUrl,
        internal: false,
        external: true,
        rgb: "14, 165, 233",
        conditional: true,
    },
    {
        id: "whatsapp",
        eyebrow: "Community",
        title: "קהילה ו-WhatsApp",
        body: "המקום לשאלות מהירות, התייעצות פתוחה, וחיבורים אמיתיים עם בונים אחרים.",
        cta: "הצטרף לקהילה",
        icon: MessagesSquare,
        href: WHATSAPP_LINK,
        internal: false,
        external: true,
        rgb: "34, 197, 94",
        conditional: true,
    },
];

const NOTES = [
    { icon: Clock, text: "מענה תוך 3–5 ימי עבודה" },
    { icon: ShieldCheck, text: "כל פנייה נקראת אישית" },
    { icon: Sparkles, text: "סלקטיבי לפי התאמה" },
];

function ChannelCard({ channel, index, reduced }) {
    const Icon = channel.icon;
    const isInternal = !!channel.internal;

    const inner = (
        <article
            className="group relative h-full rounded-2xl glass-panel-2 p-6 lg:p-7 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
        >
            <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[60px]"
                style={{ background: `rgba(${channel.rgb}, 0.18)` }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-5">
                    <div
                        className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                        style={{
                            background: `rgba(${channel.rgb}, 0.08)`,
                            borderColor: `rgba(${channel.rgb}, 0.25)`,
                        }}
                    >
                        <Icon className="h-4.5 w-4.5 text-white" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                        {channel.eyebrow}
                    </span>
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-white mb-2 leading-snug group-hover:text-primary-200 transition-colors">
                    {channel.title}
                </h3>
                <p className="text-[14px] text-ink-muted leading-relaxed mb-5 flex-grow">
                    {channel.body}
                </p>

                <div className="pt-4 border-t border-white/5">
                    <span
                        dir={channel.ctaLtr ? "ltr" : undefined}
                        className="inline-flex items-center gap-2 text-sm font-medium text-white/90 group-hover:text-primary-200 transition-colors"
                    >
                        {channel.cta}
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                    </span>
                </div>
            </div>
        </article>
    );

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.06, duration: 0.6, ease: EASE }}
            className="h-full"
        >
            {isInternal ? (
                <Link
                    to={channel.href}
                    className="block h-full focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none rounded-2xl"
                >
                    {inner}
                </Link>
            ) : (
                <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="block h-full focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none rounded-2xl"
                >
                    {inner}
                </a>
            )}
        </motion.div>
    );
}

export function ContactExperience() {
    const reduced = useReducedMotion();
    const visibleChannels = CHANNELS.filter((c) => !c.conditional || (c.conditional && c.href));

    return (
        <section
            id="contact-experience"
            className="py-24 relative z-10 overflow-hidden"
            aria-labelledby="contact-experience-heading"
        >
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-primary/8 rounded-full blur-[140px] mix-blend-screen" />
                <div className="absolute bottom-0 right-1/3 w-[380px] h-[380px] bg-secondary/6 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-12">
                    {/* Left — framing */}
                    <div className="lg:col-span-5">
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                            <MessageSquare className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                            Start the Conversation
                        </div>
                        <h2
                            id="contact-experience-heading"
                            className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-5 leading-[1.05]"
                        >
                            בוא <span className="text-brand-gradient">נדבר</span>.
                        </h2>
                        <p className="text-lg text-ink-muted leading-relaxed mb-7">
                            בלי משפכי מכירות, בלי אנשי קשר זמניים.
                            אני קורא כל הודעה בעצמי. ספרו מה אתם בונים, ואיך אתם חושבים שאפשר לעבוד יחד.
                        </p>

                        <div className="space-y-3">
                            {NOTES.map((note) => {
                                const Icon = note.icon;
                                return (
                                    <div key={note.text} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                                            <Icon className="h-3.5 w-3.5 text-primary-300" strokeWidth={1.75} aria-hidden="true" />
                                        </div>
                                        <span className="text-[14px] text-ink-muted">{note.text}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8">
                            <Link to={RECRUITER_CONTACT_PATH}>
                                <Button
                                    size="lg"
                                    className="gap-2.5 px-7 text-[15px]"
                                >
                                    <MessageSquare className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                                    פתח שיחה
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right — channel cards */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                            {visibleChannels.map((c, i) => (
                                <ChannelCard key={c.id} channel={c} index={i} reduced={reduced} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
