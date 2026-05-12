import { RuntimeModuleTree } from "./RuntimeModuleTree";

export function RuntimeSidebar() {
    return (
        <aside className="w-72 md:w-80 border-r border-white/5 bg-[#09090D]/80 backdrop-blur-md flex flex-col shrink-0 h-full z-10 relative">
            <div className="p-6 border-b border-white/5 bg-black/20">
                <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono mb-2">Operation Status</div>
                <div className="text-sm text-indigo-400 font-medium tracking-wide">System Initialization</div>
                
                <div className="mt-5 w-full bg-white/5 h-0.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 w-[15%] h-full shadow-[0_0_10px_rgba(99,102,241,0.5)] relative">
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                </div>
                <div className="mt-2 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-600 tracking-widest">PROGRESS</span>
                    <span className="text-indigo-400/70">15%</span>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <RuntimeModuleTree />
            </div>
        </aside>
    );
}
