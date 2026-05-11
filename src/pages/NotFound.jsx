import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { PageMeta } from "../components/PageMeta";

const SUGGESTED = [
    { name: "דף הבית", path: "/", desc: "חזרה למרכז" },
    { name: "קטלוג מה״ט", path: "/exams", desc: "מבחנים ופתרונות" },
    { name: "כל הסרטונים", path: "/videos", desc: "מאגר חיפוש" },
    { name: "אודות", path: "/about", desc: "מי אני" },
];

export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-20">
            <PageMeta
                title="העמוד לא נמצא (404)"
                description="העמוד שביקשתם לא קיים. חזרו לדף הבית או לקטלוג השיעורים."
                noindex
            />
            <h1 className="text-9xl font-bold text-primary/20 leading-tight">404</h1>
            <h2 className="text-3xl font-bold text-white mt-4">העמוד לא נמצא</h2>
            <p className="text-gray-400 mt-2 mb-10 max-w-md">
                הקישור הזה לא מוביל לשום דבר אצלי. אולי אחד מהבאים יעזור?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl w-full mb-10">
                {SUGGESTED.map((s) => (
                    <Link
                        key={s.path}
                        to={s.path}
                        className="group glass-panel-1 rounded-2xl p-4 text-right hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    >
                        <div className="font-bold text-ink group-hover:text-primary-200 transition-colors">{s.name}</div>
                        <div className="text-xs text-ink-dim mt-1">{s.desc}</div>
                    </Link>
                ))}
            </div>

            <Link to="/">
                <Button size="lg">חזרה לדף הבית</Button>
            </Link>
        </div>
    );
}
