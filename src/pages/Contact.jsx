import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Youtube, ExternalLink, Send, Loader2, CheckCircle2, AlertCircle, User, FileText, Briefcase } from "lucide-react";
import { Button } from "../components/ui/Button";
import { PageMeta } from "../components/PageMeta";
import { SITE, MAILTO, WHATSAPP_LINK } from "../lib/constants";

const VALID_SUBJECTS = ["general", "recruitment", "partnership", "private-lesson", "bug-report"];

export function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [subject, setSubject] = useState("");
    const [searchParams] = useSearchParams();

    // Prefill the subject dropdown from ?subject= deep links (e.g. recruiter CTA).
    useEffect(() => {
        const param = searchParams.get("subject");
        if (param && VALID_SUBJECTS.includes(param)) {
            setSubject(param);
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        setIsLoading(true);
        setErrorMessage(null);

        const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

        if (!endpoint) {
            if (import.meta.env.DEV) {
                console.error("VITE_CONTACT_ENDPOINT is not configured.");
            }
            setErrorMessage(`טופס יצירת הקשר אינו מוגדר כרגע. אפשר לכתוב לי ישירות ל-${SITE.email}.`);
            setIsLoading(false);
            return;
        }

        try {
            const formData = new FormData(form);
            const res = await fetch(endpoint, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (!res.ok) {
                throw new Error(`Submission failed (${res.status})`);
            }

            setIsSuccess(true);
            form.reset();
            setSubject("");
        } catch (err) {
            if (import.meta.env.DEV) {
                console.error("Contact submission error:", err);
            }
            setErrorMessage(`לא הצלחתי לשלוח את ההודעה. אפשר לנסות שוב או לכתוב ישירות ל-${SITE.email}.`);
        } finally {
            setIsLoading(false);
        }
    };

    const contactMethods = [
        {
            icon: Mail,
            title: "אימייל",
            value: SITE.email,
            link: MAILTO,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "group-hover:border-primary/50"
        },
        {
            icon: Youtube,
            title: "יוטיוב",
            value: SITE.name,
            link: SITE.youtubeChannelUrl,
            color: "text-red-500",
            bg: "bg-red-500/10",
            border: "group-hover:border-red-500/50"
        },
        WHATSAPP_LINK && {
            icon: MessageCircle,
            title: "ווטסאפ",
            value: "זמין בהודעות",
            link: WHATSAPP_LINK,
            color: "text-green-500",
            bg: "bg-green-500/10",
            border: "group-hover:border-green-500/50"
        }
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-background relative overflow-hidden font-sans pb-20 pt-32">
            <PageMeta
                title="צור קשר"
                description="רוצים לדבר על משרה, שיתוף פעולה או שיעור פרטי? שלחו לי הודעה — אחזור תוך 24 שעות."
                path="/contact"
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "צור קשר", path: "/contact" },
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "צור קשר עם Yuval Zakay",
                    "url": `${SITE.url}/contact`,
                }}
            />
            {/* Ambient Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] opacity-40" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6 animate-fade-in backdrop-blur-md">
                        <span aria-hidden="true" className="w-2 h-2 rounded-full bg-green-500 animate-pulse motion-reduce:animate-none" />
                        <span>פתוח לפרויקטים ושיתופי פעולה</span>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-black text-white mb-6 tracking-normal drop-shadow-2xl">
                        בוא <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-500 animate-gradient-x">נדבר</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                        שאלה? רעיון לפרויקט? הצעת עבודה?
                        אני כאן — שלחו הודעה ואחזור תוך <span dir="ltr">24</span> שעות.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">

                    {/* Left Column: Contact Cards */}
                    <div className="lg:col-span-5 space-y-6 perspective-1000">
                        {contactMethods.map((method, index) => (
                            <a
                                key={index}
                                href={method.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`glass-panel-1 group relative flex items-center gap-6 p-6 rounded-2xl transition-all duration-500 hover:transform hover:translate-x-2 hover:-translate-y-1 hover:shadow-2xl ${method.border} overflow-hidden`}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${method.bg.replace('/10', '/5')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className={`relative h-14 w-14 rounded-xl ${method.bg} flex items-center justify-center ${method.color} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <method.icon className="w-7 h-7" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-gray-400 text-sm font-medium mb-1">{method.title}</h3>
                                    <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">{method.value}</p>
                                </div>
                                <div className="mr-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                    <Send className={`w-5 h-5 ${method.color} rotate-180`} />
                                </div>
                            </a>
                        ))}

                        {/* Additional Info Card */}
                        <div className="glass-panel-1 mt-8 p-6 rounded-2xl border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-colors">
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                                <span aria-hidden="true" className="p-2 rounded-lg bg-primary/20 text-primary"><Briefcase className="w-5 h-5" /></span>
                                קריירה ושיתופי פעולה
                            </h3>
                            <p className="text-gray-400 text-sm mb-2">
                                מחפשים מפתח? מציעים שיתוף פעולה עסקי?
                            </p>
                            <p className="text-primary text-sm font-bold">
                                בחרו "הצעת עבודה" או "שיתוף פעולה" בטופס — אגיע אליכם מהר.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7 relative">
                        <div className="glass-panel-2 relative rounded-3xl p-8 md:p-10 shadow-2xl">
                            {/* Form Glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-3xl opacity-20 blur group-hover:opacity-40 transition duration-1000" />

                            <div className="relative h-full">
                                {isSuccess ? (
                                    <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-fade-in" role="status" aria-live="polite">
                                        <motion.div 
                                            initial={{ scale: 0.8, opacity: 0 }} 
                                            animate={{ scale: 1, opacity: 1 }} 
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6"
                                        >
                                            <CheckCircle2 className="w-10 h-10" />
                                        </motion.div>
                                        <h3 className="text-3xl font-bold text-white mb-2">תודה רבה!</h3>
                                        <p className="text-gray-400 text-lg">ההודעה שלך נשלחה בהצלחה.<br />אחזור אליך בהקדם.</p>
                                        <Button
                                            onClick={() => setIsSuccess(false)}
                                            className="mt-8 bg-white/5 hover:bg-white/10 text-white border border-white/10"
                                        >
                                            שלח הודעה נוספת
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2 group">
                                                <label htmlFor="contact-name" className="text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">שם מלא</label>
                                                <input
                                                    id="contact-name"
                                                    name="name"
                                                    required
                                                    type="text"
                                                    autoComplete="name"
                                                    placeholder="ישראל ישראלי"
                                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 hover:bg-white/[0.07]"
                                                />
                                            </div>
                                            <div className="space-y-2 group">
                                                <label htmlFor="contact-company" className="text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">חברה / ארגון</label>
                                                <input
                                                    id="contact-company"
                                                    name="company"
                                                    type="text"
                                                    autoComplete="organization"
                                                    placeholder="שם החברה (אופציונלי)"
                                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 hover:bg-white/[0.07]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2 group">
                                            <label htmlFor="contact-email" className="text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">כתובת אימייל</label>
                                            <div className="relative">
                                                <Mail className="absolute right-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    id="contact-email"
                                                    name="email"
                                                    required
                                                    type="email"
                                                    autoComplete="email"
                                                    inputMode="email"
                                                    placeholder="your@email.com"
                                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pr-12 pl-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 hover:bg-white/[0.07]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2 group">
                                            <label htmlFor="contact-subject" className="text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">נושא הפנייה</label>
                                            <div className="relative">
                                                <div className="absolute right-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors pointer-events-none">
                                                    <Briefcase className="w-5 h-5" />
                                                </div>
                                                <select
                                                    id="contact-subject"
                                                    name="subject"
                                                    required
                                                    value={subject}
                                                    onChange={(e) => setSubject(e.target.value)}
                                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pr-12 pl-4 text-white text-base focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 hover:bg-white/[0.07] appearance-none cursor-pointer"
                                                >
                                                    <option value="" className="bg-surface text-gray-400">בחר נושא...</option>
                                                    <option value="general" className="bg-surface">שאלה כללית / ייעוץ</option>
                                                    <option value="recruitment" className="bg-surface text-primary font-bold">הצעת עבודה (Recruitment)</option>
                                                    <option value="partnership" className="bg-surface text-primary font-bold">שיתוף פעולה עסקי</option>
                                                    <option value="private-lesson" className="bg-surface">שיעור פרטי</option>
                                                    <option value="bug-report" className="bg-surface">דיווח על באג באתר</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2 group">
                                            <label htmlFor="contact-message" className="text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">ההודעה שלך</label>
                                            <textarea
                                                id="contact-message"
                                                name="message"
                                                required
                                                rows="5"
                                                placeholder="ספרו לי איך אפשר לעזור — מה הפרויקט, מה הציפיות, איפה לוחצים."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 hover:bg-white/[0.07] resize-none"
                                            />
                                        </div>

                                        {errorMessage && (
                                            <div role="alert" className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                                <span>{errorMessage}</span>
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            isLoading={isLoading}
                                            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-6 h-6 animate-spin" />
                                            ) : (
                                                <>
                                                    שלח הודעה
                                                    <Send className="w-5 h-5 mr-2 -ml-1" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
