import { useMemo } from "react";
import { Rss } from "lucide-react";
import { cn } from "../../lib/utils";
import { feedsForRoute } from "../../lib/distribution/distribution";

/**
 * FeedSubscribeLink — quiet, route-aware feed affordance.
 *
 * Renders a single RSS pill that links to the canonical feed for the
 * current path. The component reads the distribution registry; consumers
 * never hardcode a feed URL.
 *
 * UX rules (per the brief — invisible, elegant, integrated):
 *   - 1 link, not three. RSS readers handle Atom and JSON Feed via the same
 *     <link rel="alternate"> tags emitted by PageMeta. Surface the *idea*
 *     of subscribing once — the format choice is for the reader.
 *   - Mono caption, glass tier, no animation. Looks like part of the page.
 *   - Hidden when no feed is associated with the route.
 */
export function FeedSubscribeLink({ path, label = "Subscribe via RSS", className }) {
    const feed = useMemo(() => {
        const descriptors = feedsForRoute(path);
        if (!descriptors || descriptors.length === 0) return null;
        return descriptors.find((d) => d.type === "application/rss+xml") || descriptors[0];
    }, [path]);

    if (!feed) return null;

    return (
        <a
            href={feed.href}
            className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
                "text-[11px] font-mono tracking-wider uppercase text-ink-soft",
                "glass-panel-1 ring-1 ring-white/10",
                "transition-colors hover:text-white hover:ring-white/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                className,
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (${feed.slug})`}
            data-feed-slug={feed.slug}
        >
            <Rss size={12} aria-hidden="true" />
            <span>{label}</span>
        </a>
    );
}
