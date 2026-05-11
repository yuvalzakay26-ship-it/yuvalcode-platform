import { cn } from "../lib/utils";

export function SectionHeader({ title, subtitle, className, align = "center" }) {
    return (
        <div className={cn("mb-12", align === "center" ? "text-center" : "text-start", className)}>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 sm:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
            <div className={cn("mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary", align === "center" && "mx-auto")} />
        </div>
    );
}
