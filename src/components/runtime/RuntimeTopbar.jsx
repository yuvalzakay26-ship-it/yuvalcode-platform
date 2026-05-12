import { useNavigate } from "react-router-dom";

export function RuntimeTopbar() {
    const navigate = useNavigate();

    return (
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#09090D] relative z-10 shrink-0">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate('/courses/claude-code')}
                    className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/5 transition-colors group"
                >
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <div className="w-px h-4 bg-white/10 mx-2"></div>
                <div className="w-5 h-5 rounded-sm bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-sm"></div>
                </div>
                <span className="font-mono text-sm font-medium text-white tracking-widest uppercase">Claude Code Runtime</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-gray-500 uppercase tracking-widest ml-2">v1.0.0-alpha</span>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-4 text-xs font-mono">
                    <div className="px-3 py-1 rounded bg-black/40 border border-white/5 text-gray-400 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="opacity-50">Cmd + K</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] text-emerald-500/70 font-mono uppercase tracking-[0.2em]">System Online</span>
                </div>
            </div>
        </header>
    );
}
