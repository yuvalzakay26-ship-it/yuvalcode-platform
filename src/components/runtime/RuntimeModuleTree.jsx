export function RuntimeModuleTree() {
    const phases = [
        {
            title: "Foundations",
            status: "active",
            modules: [
                { title: "Environment Setup", status: "active" },
                { title: "Authentication Flow", status: "locked" },
                { title: "Context Injection", status: "locked" }
            ]
        },
        {
            title: "Claude Workflows",
            status: "locked",
            modules: [
                { title: "Batch Processing", status: "locked" },
                { title: "Codebase Analysis", status: "locked" },
                { title: "Automated Refactoring", status: "locked" }
            ]
        },
        {
            title: "Prompt Architecture",
            status: "locked",
            modules: [
                { title: "System Prompts", status: "locked" },
                { title: "Advanced Scaling", status: "locked" },
                { title: "Prompt Repositories", status: "locked" }
            ]
        },
        {
            title: "Production Infrastructure",
            status: "locked",
            modules: [
                { title: "CI/CD Pipelines", status: "locked" },
                { title: "Vercel Integration", status: "locked" },
                { title: "Production Monitoring", status: "locked" }
            ]
        }
    ];

    return (
        <div className="space-y-8 mt-2">
            {phases.map((phase, i) => (
                <div key={i} className="flex flex-col">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className={`text-[10px] font-mono tracking-[0.2em] uppercase ${phase.status === 'active' ? 'text-indigo-400' : 'text-gray-600'}`}>
                            Phase 0{i + 1}
                        </div>
                        <div className="flex-1 h-px bg-white/5"></div>
                    </div>
                    
                    <div className="space-y-2">
                        <div className={`px-3 py-1.5 text-sm font-medium tracking-wide ${phase.status === 'active' ? 'text-white' : 'text-gray-500'}`}>
                            {phase.title}
                        </div>
                        
                        <div className="flex flex-col gap-1 relative ml-1.5">
                            {/* Connecting line */}
                            <div className="absolute top-4 bottom-4 left-4 w-px bg-white/5 z-0"></div>
                            
                            {phase.modules.map((mod, j) => (
                                <button key={j} className="relative z-10 flex items-center gap-3 px-3 py-2 hover:bg-white/[0.02] rounded transition-colors text-left group w-full">
                                    <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center shrink-0 bg-[#09090D] border ${mod.status === 'completed' ? 'border-indigo-500/50 bg-indigo-500/10' : mod.status === 'active' ? 'border-indigo-400 bg-indigo-400/20' : 'border-white/10 group-hover:border-white/20'}`}>
                                        {mod.status === 'completed' && <div className="w-1.5 h-1.5 bg-indigo-400 rounded-sm"></div>}
                                        {mod.status === 'active' && <div className="w-1.5 h-1.5 bg-indigo-400 rounded-sm animate-pulse"></div>}
                                    </div>
                                    <span className={`text-xs tracking-wide ${mod.status === 'active' ? 'text-indigo-200' : mod.status === 'completed' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {mod.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
