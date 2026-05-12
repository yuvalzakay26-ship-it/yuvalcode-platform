export function RuntimeViewport({ children }) {
    return (
        <main className="flex-1 relative flex flex-col min-w-0 bg-[#0B0C10]">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#0B0C10] to-[#0B0C10] pointer-events-none"></div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
                {children}
            </div>
        </main>
    );
}
