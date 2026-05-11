import { motion, useReducedMotion } from "framer-motion";
import { EntryCard } from "./EntryCard";

const EASE = [0.16, 1, 0.3, 1];

/**
 * CollectionGrid — responsive grid of EntryCard items.
 *
 * Used by collection landing pages and the editorial hub's "Latest" rail.
 * Motion: stagger fade-in on first scroll-into-view (`whileInView`) — same
 * pattern as the AI / Projects / Stack / Content grids.
 */
export function CollectionGrid({ entries, columns = 2, showSource = false }) {
    const reduced = useReducedMotion();
    if (!Array.isArray(entries) || entries.length === 0) return null;

    const colClass =
        columns === 3
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : columns === 1
                ? ""
                : "sm:grid-cols-2";

    return (
        <div className={`grid grid-cols-1 ${colClass} gap-4 sm:gap-5`}>
            {entries.map((entry, i) => (
                <motion.div
                    key={entry.id}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.4), ease: EASE }}
                >
                    <EntryCard entry={entry} showSource={showSource} />
                </motion.div>
            ))}
        </div>
    );
}
