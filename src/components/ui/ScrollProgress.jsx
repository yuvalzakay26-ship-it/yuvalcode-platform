import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 25,
        mass: 0.3,
    });

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX, transformOrigin: "100% 50%" }}
            className="fixed top-0 inset-x-0 h-[2px] origin-right z-[60] bg-gradient-to-l from-primary via-secondary to-accent"
        />
    );
}
