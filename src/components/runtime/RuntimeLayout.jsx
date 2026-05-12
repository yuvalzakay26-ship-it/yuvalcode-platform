import { RuntimeTopbar } from "./RuntimeTopbar";
import { RuntimeSidebar } from "./RuntimeSidebar";
import { RuntimeViewport } from "./RuntimeViewport";
import { RuntimeContextPanel } from "./RuntimeContextPanel";

export function RuntimeLayout({ children }) {
    // 100vh h-screen layout with Grid or Flex
    return (
        <div className="h-screen w-screen bg-[#060609] text-gray-300 overflow-hidden flex flex-col font-sans selection:bg-indigo-500/30 dir-ltr" style={{ direction: 'ltr' }}>
            <RuntimeTopbar />
            <div className="flex-1 flex overflow-hidden">
                <RuntimeSidebar />
                <RuntimeViewport>
                    {children}
                </RuntimeViewport>
            </div>
            <RuntimeContextPanel />
        </div>
    );
}
