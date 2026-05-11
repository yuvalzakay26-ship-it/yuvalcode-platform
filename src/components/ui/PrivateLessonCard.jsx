import { motion } from "framer-motion";
import { Calendar, CheckCircle2, ArrowRight, Star, Rocket, Zap, Code2 } from "lucide-react";
import { Button } from "./Button";
import { Link } from "react-router-dom";

export function PrivateLessonCard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-2xl group overflow-hidden"
        >
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[100px] -ml-32 -mb-32 pointer-events-none" />

            {/* Glowing Border Animation */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 group-hover:border-primary/30 transition-colors duration-500" />

            <div className="relative z-10 flex flex-col h-full">

                {/* Header Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                    <Star className="w-3 h-3 fill-primary" />
                    <span>פרימיום</span>
                </div>

                {/* Title & Price */}
                <div className="mb-6">
                    <h3 className="text-3xl font-bold text-white mb-2">שיעורים פרטיים</h3>
                    <p className="text-gray-400 text-lg">
                        1-on-1 Mentorship
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                {/* Features List */}
                <div className="space-y-4 mb-8 flex-grow">
                    {[
                        { icon: Rocket, text: "הכנה ממוקדת למבחני מה\"ט 2025" },
                        { icon: Code2, text: "Code Reviews ושיפור איכות הקוד" },
                        { icon: Zap, text: "פתרון חסמים וחיזוק לוגיקה" },
                        { icon: Calendar, text: "גמישות בשעות (בוקר/ערב)" }
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 group/item">
                            <div className="p-2 rounded-lg bg-white/5 text-secondary group-hover/item:bg-secondary/10 group-hover/item:text-secondary-300 transition-colors">
                                <feature.icon className="h-4 w-4" />
                            </div>
                            <span className="text-gray-300 group-hover/item:text-white transition-colors">{feature.text}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <Link to="/contact">
                    <Button className="w-full h-14 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 rounded-xl relative overflow-hidden group/btn">
                        <span className="relative z-10 flex items-center gap-2">
                            קבע שיעור היכרות
                            <ArrowRight className="h-5 w-5 group-hover/btn:-translate-x-1 transition-transform" />
                        </span>
                        {/* Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    </Button>
                </Link>

                <p className="text-center text-gray-500 text-sm mt-4">
                    מספר המקומות מוגבל
                </p>
            </div>
        </motion.div>
    );
}
