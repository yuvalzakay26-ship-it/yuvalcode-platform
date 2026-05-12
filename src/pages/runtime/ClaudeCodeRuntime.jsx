import { RuntimeLayout } from "../../components/runtime/RuntimeLayout";

export function ClaudeCodeRuntime() {
    return (
        <RuntimeLayout>
            <div className="h-full flex flex-col p-8">
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-sm shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                        <div className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] font-mono">Module 01 // Environment setup</div>
                    </div>
                    <h1 className="text-3xl text-white font-medium tracking-wide">Initialization Sequence</h1>
                </header>
                
                <div className="flex-1 bg-black/40 border border-white/5 rounded-lg p-8 relative overflow-hidden backdrop-blur-sm">
                    {/* Glowing effect */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                    
                    <div className="max-w-3xl">
                        <h2 className="text-xl text-white mb-4 font-medium tracking-wide">System Engineering Base</h2>
                        <p className="text-sm text-gray-400 mb-8 font-mono leading-relaxed">
                            Welcome to the Claude Code environment. This runtime serves as your operational base. 
                            It is designed to facilitate high-velocity system engineering with native AI integration.
                            Prepare your local workspace to mirror this initialization.
                        </p>

                        <div className="bg-[#060609] border border-white/10 rounded-md font-mono text-sm p-5 text-indigo-200/80 shadow-inner">
                            <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <code className="block leading-loose">
                                <span className="text-gray-500">$</span> <span className="text-white">claude authenticate --workspace="yuvalcode-core"</span><br/>
                                <span className="text-indigo-400">[OK]</span> Establishing secure connection...<br/>
                                <span className="text-indigo-400">[OK]</span> Credentials verified.<br/>
                                <span className="text-emerald-400">[SUCCESS]</span> Workspace synchronized. Ready for input.
                            </code>
                        </div>
                        
                        <div className="mt-10 flex gap-4">
                            <button className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-medium text-sm rounded transition-colors tracking-wide shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                                Execute Setup
                            </button>
                            <button className="px-6 py-2.5 bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 font-medium text-sm rounded transition-colors tracking-wide">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </RuntimeLayout>
    );
}
