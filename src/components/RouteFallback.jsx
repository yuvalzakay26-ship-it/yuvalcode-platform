import { Loader2 } from "lucide-react";

export function RouteFallback() {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="טוען..."
            className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 py-20"
        >
            <Loader2 className="h-8 w-8 text-primary animate-spin motion-reduce:animate-none" strokeWidth={1.75} />
            <span className="text-sm text-ink-muted">טוען תוכן…</span>
        </div>
    );
}
