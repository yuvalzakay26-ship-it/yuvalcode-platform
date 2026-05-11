import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "../../lib/utils";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback(({ title, description, variant = "default", duration = 3000 }) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, title, description, variant }]);

        setTimeout(() => {
            removeToast(id);
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const value = {
        toast: {
            success: (props) => addToast({ ...props, variant: "success" }),
            error: (props) => addToast({ ...props, variant: "destructive" }),
            info: (props) => addToast({ ...props, variant: "default" }),
        }
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                role="region"
                aria-label="הודעות מערכת"
                aria-live="polite"
                aria-atomic="false"
                className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 pointer-events-none"
            >
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context.toast;
};

function Toast({ title, description, variant, onClose }) {
    const icons = {
        success: <CheckCircle2 className="h-5 w-5 text-green-400" />,
        destructive: <AlertCircle className="h-5 w-5 text-red-400" />,
        default: <Info className="h-5 w-5 text-blue-400" />
    };

    const variants = {
        success: "bg-green-500/10 border-green-500/20",
        destructive: "bg-red-500/10 border-red-500/20",
        default: "bg-surface/80 border-white/10"
    };

    const role = variant === "destructive" ? "alert" : "status";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={cn(
                "pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl min-w-[300px] max-w-[400px]",
                variants[variant] || variants.default
            )}
            role={role}
        >
            <div className="shrink-0 mt-0.5" aria-hidden="true">{icons[variant] || icons.default}</div>
            <div className="flex-1">
                {title && <h3 className="text-sm font-bold text-white mb-1">{title}</h3>}
                {description && <p className="text-sm text-gray-300 leading-relaxed">{description}</p>}
            </div>
            <button
                type="button"
                onClick={onClose}
                className="shrink-0 text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
                aria-label="סגור התראה"
            >
                <X className="h-4 w-4" aria-hidden="true" />
            </button>
        </motion.div>
    );
}
