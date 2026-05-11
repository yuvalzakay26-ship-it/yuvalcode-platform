import { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        if (typeof window !== "undefined" && import.meta.env.DEV) {
            console.error("[ErrorBoundary]", error, errorInfo);
        }
        // Production hook: forward to analytics / Sentry once wired
        if (typeof window !== "undefined" && window.plausible) {
            window.plausible("ErrorBoundary", { props: { message: String(error?.message || error) } });
        }
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (!this.state.hasError) return this.props.children;

        return (
            <div role="alert" className="min-h-[60vh] flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full text-center glass-panel-2 rounded-3xl p-10">
                    <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
                        <AlertTriangle className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-ink mb-3">משהו השתבש</h2>
                    <p className="text-sm text-ink-muted leading-relaxed mb-8">
                        אירעה שגיאה בעת טעינת התוכן. אפשר לרענן את הדף או לחזור לדף הבית.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                            <RefreshCw className="h-4 w-4" strokeWidth={2} />
                            רענון הדף
                        </button>
                        <button
                            onClick={this.handleReset}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-ink text-sm font-semibold hover:bg-white/[0.08] transition-colors"
                        >
                            נסה שוב
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
