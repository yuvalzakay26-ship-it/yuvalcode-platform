import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Button = forwardRef(({ className, variant = "primary", size = "default", isLoading, ...props }, ref) => {
    const variants = {
        primary:
            "btn-shine bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-primary/45 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]",
        outline:
            "border border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-white/30 active:bg-white/10",
        ghost:
            "text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10",
        secondary:
            "bg-surface text-white hover:bg-surface/80 hover:shadow-md active:scale-[0.98]",
    };

    const sizes = {
        default: "h-11 px-6 py-2.5 text-base",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-14 rounded-xl px-8 text-lg",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11 p-0",
    };

    return (
        <button
            ref={ref}
            disabled={isLoading || props.disabled}
            className={cn(
                "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:pointer-events-none disabled:opacity-50 disabled:grayscale",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});
Button.displayName = "Button";

export { Button };
