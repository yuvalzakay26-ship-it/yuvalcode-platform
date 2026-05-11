import { cn } from "../../lib/utils";

export function Badge({ className, variant = "default", size = "default", ...props }) {
    const variants = {
        // shadow uses literal RGB (Tailwind --primary holds HSL channels, so rgba(var(--primary)…) silently fails)
        default: "bg-primary/10 text-primary-300 border-primary/20 shadow-[0_0_10px_-4px_rgba(99,102,241,0.5)]",
        secondary: "bg-secondary/10 text-secondary border-secondary/20",
        outline: "text-gray-300 border-white/10 hover:border-white/20 hover:bg-white/5",
        success: "bg-green-500/10 text-green-400 border-green-500/20",
        warning: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        new: "bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse",
    };

    const sizes = {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-4 py-1.5 text-sm",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center justify-center rounded-full border font-semibold transition-colors duration-200 selection:bg-none",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
}
