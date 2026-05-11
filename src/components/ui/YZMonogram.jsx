import { cn } from "../../lib/utils";

/**
 * YZ — Yuval Zakay personal brand mark.
 *
 * Type-led monogram: "YZ" in Inter 900 with negative tracking, set inside
 * a rounded capsule. Uses a single shared <linearGradient> ID so multiple
 * marks on the page render without duplicate-id collisions in the DOM.
 *
 * @param {number} size  — square px size of the capsule (default 40)
 * @param {boolean} solid — when true, the capsule fills with the brand
 *                          gradient and the letters render in surface color.
 *                          When false (default), capsule is dark glass and
 *                          the letters carry the gradient.
 */
export function YZMonogram({ size = 40, solid = false, className = "" }) {
    // Unique-enough id per render to avoid clashing when multiple marks coexist
    const gid = `yz-grad-${solid ? "s" : "o"}`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width={size}
            height={size}
            role="img"
            aria-label="Yuval Zakay"
            className={cn("shrink-0", className)}
        >
            <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="55%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
            </defs>

            {/* Capsule */}
            {solid ? (
                <rect width="64" height="64" rx="16" fill={`url(#${gid})`} />
            ) : (
                <>
                    <rect width="64" height="64" rx="16" fill="#0a0c14" />
                    <rect
                        x="0.75"
                        y="0.75"
                        width="62.5"
                        height="62.5"
                        rx="15.25"
                        fill="none"
                        stroke={`url(#${gid})`}
                        strokeWidth="1.5"
                        opacity="0.55"
                    />
                </>
            )}

            {/* YZ wordmark — tight kerning, vertically optical-centered */}
            <text
                x="50%"
                y="52%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
                fontSize="30"
                fontWeight="900"
                letterSpacing="-2.4"
                fill={solid ? "#0a0c14" : `url(#${gid})`}
            >
                YZ
            </text>
        </svg>
    );
}
