import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function Tilt3D({ children, intensity = 6, className = "", as: As = "div" }) {
    const ref = useRef(null);
    const reduced = useReducedMotion();
    const enabledRef = useRef(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        enabledRef.current =
            !reduced &&
            window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }, [reduced]);

    const handleMove = (e) => {
        const el = ref.current;
        if (!enabledRef.current || !el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        el.style.setProperty("--rx", `${(0.5 - y) * intensity}deg`);
        el.style.setProperty("--ry", `${(x - 0.5) * intensity}deg`);
        el.style.setProperty("--mx", `${x * 100}%`);
        el.style.setProperty("--my", `${y * 100}%`);
    };

    const handleLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
    };

    return (
        <As
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={`group tilt-3d ${className}`}
        >
            {children}
        </As>
    );
}

// Sits inside a Tilt3D-rooted element. Reads --mx / --my via CSS-var inheritance
// so the highlight follows the cursor across the card surface.
export function CardGlow({ rgb = "99, 102, 241", radius = 240, opacity = 0.18 }) {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
                background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), rgba(${rgb}, ${opacity}), transparent 60%)`,
            }}
        />
    );
}
