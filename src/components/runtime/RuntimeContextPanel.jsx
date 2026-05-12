export function RuntimeContextPanel() {
    return (
        <footer className="h-8 border-t border-white/5 bg-[#060609] flex items-center justify-between px-4 shrink-0 relative z-20">
            <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
                    Environment Initialized
                </span>
                <span className="opacity-40">|</span>
                <span>AI Context Synchronized</span>
                <span className="opacity-40">|</span>
                <span>Module State Loaded</span>
            </div>
            
            <div className="flex items-center gap-4 text-[10px] font-mono text-gray-600 tracking-wider">
                <span className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    2ms
                </span>
                <span className="opacity-40">|</span>
                <span>SYS: CLAUDE-OS</span>
            </div>
        </footer>
    );
}
