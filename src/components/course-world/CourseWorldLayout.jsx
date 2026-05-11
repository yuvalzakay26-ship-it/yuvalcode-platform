import { useEffect } from 'react';

export function CourseWorldLayout({ children, identity }) {
    useEffect(() => {
        // Enforce dark theme isolation for course worlds
        const originalBg = document.body.style.backgroundColor;
        document.body.style.backgroundColor = '#000000';
        return () => {
            document.body.style.backgroundColor = originalBg;
        };
    }, []);

    return (
        <div className={`relative min-h-screen w-full overflow-hidden ${identity.baseBg}`}>
            {/* Global Cinematic Volumetric Light */}
            <div 
                className={`absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] md:w-[800px] h-[600px] md:h-[800px] opacity-[0.08] blur-[100px] md:blur-[140px] pointer-events-none transform-gpu ${identity.glowColor}`} 
            />
            
            <div className="relative z-10 flex flex-col w-full pb-20">
                {children}
            </div>
        </div>
    );
}
