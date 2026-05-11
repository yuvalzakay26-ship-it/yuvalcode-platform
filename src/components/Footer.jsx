import { Youtube, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { YZMonogram } from "./ui/YZMonogram";
import { SITE, MAILTO } from "../lib/constants";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socials = [
        { icon: Youtube, href: SITE.youtubeChannelUrl, color: "hover:bg-[#FF0000]", shadow: "hover:shadow-[#FF0000]/40", bg: "hover:border-[#FF0000]/30", label: "ערוץ היוטיוב" },
        SITE.linkedinUrl && { icon: Linkedin, href: SITE.linkedinUrl, color: "hover:bg-[#0a66c2] hover:text-white", shadow: "hover:shadow-[#0a66c2]/40", bg: "hover:border-[#0a66c2]/30", label: "LinkedIn" },
        SITE.githubUrl && { icon: Github, href: SITE.githubUrl, color: "hover:bg-white hover:text-black", shadow: "hover:shadow-white/25", bg: "hover:border-white/30", label: "GitHub" },
        { icon: Mail, href: MAILTO, color: "hover:bg-primary", shadow: "hover:shadow-primary/40", bg: "hover:border-primary/30", label: "שליחת אימייל" },
    ].filter(Boolean);

    const footerSections = [
        {
            title: "ניווט מהיר",
            links: [
                { name: "דף הבית", path: "/" },
                { name: "קטלוג מה״ט", path: "/exams" },
                { name: "אודות", path: "/about" },
                { name: "צור קשר", path: "/contact" },
            ]
        },
        {
            title: "תכנים",
            links: [
                { name: "פתרונות מה״ט", path: "/exams" },
                { name: "כל הסרטונים", path: "/videos" },
                { name: "ערוץ היוטיוב", path: SITE.youtubeChannelUrl, external: true },
            ]
        }
    ];

    return (
        <footer className="relative bg-background pt-24 pb-12 overflow-hidden mt-auto border-t border-white/5 group/footer">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-background overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] origin-top" />
            </div>

            {/* Ambient Omni-Light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Brand Column */}
                    <div className="lg:col-span-4 flex flex-col items-start gap-8">
                        <Link to="/" className="flex items-center gap-4 group/brand">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary blur-lg opacity-30 group-hover/brand:opacity-60 transition-opacity duration-500" />
                                <YZMonogram size={52} className="relative z-10 group-hover/brand:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display text-2xl font-bold tracking-normal bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 group-hover/brand:to-white transition-all duration-500">
                                    Yuval Zakay
                                </span>
                                <span className="text-[11px] font-mono text-ink-dim tracking-widest uppercase mt-0.5">
                                    תכנות · AI · מערכות
                                </span>
                            </div>
                        </Link>
                        <p className="text-ink-muted leading-relaxed text-sm max-w-sm border-l-2 border-white/5 pl-4 ml-1">
                            מפתח ומלמד תכנות מישראל.
                            מלמד תכנות אמיתי,
                            עובד עם <span dir="ltr">AI</span> בפרויקטים חיים,
                            ומתעד את מה שהוא לומד בדרך.
                        </p>

                        <div className="flex items-center gap-4 mt-2">
                            {socials.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={`relative h-12 w-12 rounded-xl bg-white/[0.03] border border-white/5 text-gray-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${social.color} ${social.shadow} ${social.bg} shadow-lg backdrop-blur-sm group overflow-hidden`}
                                >
                                    <span className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <social.icon className="h-5 w-5 relative z-10" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="lg:col-span-2 md:col-span-1">
                            <h3 className="font-bold text-white mb-8 text-sm tracking-[0.2em] uppercase flex items-center gap-3 opacity-80">
                                <span className="w-8 h-[1px] bg-primary/50" />
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        {link.external ? (
                                            <a
                                                href={link.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-white text-sm transition-all duration-300 flex items-center gap-3 group relative overflow-hidden py-1"
                                            >
                                                <span className="absolute left-0 w-full h-[1px] bottom-0 bg-gradient-to-r from-primary/50 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary group-hover:shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-all duration-300" />
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                            </a>
                                        ) : (
                                            <Link
                                                to={link.path}
                                                className="text-gray-400 hover:text-white text-sm transition-all duration-300 flex items-center gap-3 group relative overflow-hidden py-1"
                                            >
                                                <span className="absolute left-0 w-full h-[1px] bottom-0 bg-gradient-to-r from-primary/50 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary group-hover:shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-all duration-300" />
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Subscribe Card */}
                    <div className="lg:col-span-4 group/card">
                        <div className="relative bg-gradient-to-br from-white/[0.03] to-transparent rounded-3xl p-8 border border-white/10 backdrop-blur-xl transition-all duration-500 shadow-2xl overflow-hidden hover:border-primary/30">

                            {/* Card Effects */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[64px] group-hover/card:bg-primary/30 transition-all duration-700" />

                            <div className="relative z-10">
                                <h3 className="font-bold text-2xl text-white mb-3 flex items-center gap-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">עוקבים אחרי הערוץ</span>
                                </h3>
                                <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-[90%]">
                                    סרטונים חדשים עולים באופן קבוע.
                                    אם אתם רוצים להישאר מעודכנים, הדרך הכי פשוטה:
                                </p>

                                <a
                                    href={SITE.youtubeChannelUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-full group/btn inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#ec1c24] text-white shadow-[0_10px_20px_-5px_rgba(236,28,36,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(236,28,36,0.5)] transition-all duration-300 transform hover:-translate-y-1 font-bold tracking-wide overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover/btn:translate-x-[200%] transition-transform duration-[1.5s] ease-in-out" />
                                    <Youtube className="h-5 w-5 transition-transform duration-300 group-hover/btn:scale-[1.05]" />
                                    <span className="relative z-10">הרשמו לערוץ ביוטיוב</span>
                                    <ExternalLink className="h-4 w-4 opacity-70 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative">
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium bg-white/[0.02] px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                        <span>&copy; {currentYear} YuvalCode.</span>
                        <div className="w-1 h-1 rounded-full bg-gray-700" />
                        <span className="flex items-center gap-1.5">
                            Developed by Yuval Zakay
                        </span>
                    </div>

                    <div className="flex items-center gap-8 text-xs font-medium text-gray-500">
                        <Link to="/terms" className="hover:text-white transition-colors relative group">
                            תנאי שימוש
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                        </Link>
                        <Link to="/privacy" className="hover:text-white transition-colors relative group">
                            מדיניות פרטיות
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
