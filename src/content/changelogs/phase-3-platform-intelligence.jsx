import { Callout } from "../../components/editorial/Callout";
import { CONTENT_TYPES } from "../../lib/content/schema";

export const entry = {
    id: "phase-3-platform-intelligence",
    slug: "phase-3-platform-intelligence",
    type: CONTENT_TYPES.CHANGELOG,
    pillar: "creator-journey",
    title: "Phase 3.0 — Platform Intelligence Layer.",
    summary: "Search · content schema · newsletter abstraction · typed analytics · AI graph + recommendation engine. ה-invisible intelligence שמתחת ל-creator HQ.",
    eyebrow: "Build in Public · Shipped",
    tags: ["build-in-public", "shipping", "release-notes"],
    status: "live",
    visibility: "public",
    date: "2026-05-07",
    href: "/content/changelog/phase-3-platform-intelligence",
    related: [
        "phase-3-1-editorial-activation",
        "phase-2-5-work-with-me",
    ],
    readingMinutes: 3,
    Body,
};

function Body() {
    return (
        <>
            <p>
                Phase 3.0 — שכבת ה-intelligence שמתחת לפלטפורמה. אפס דפים חדשים, אפס redesigns. כל מה שהשתנה — בתשתית.
            </p>

            <Callout variant="shipping" title="חמש מערכות, +4.12 kB gzip.">
                Search engine, content pipeline, newsletter, analytics, ו-AI foundations — בתשתית אחת משותפת. כל מערכת נכנסת לפלטפורמה דרך אותה <code dir="ltr">src/lib/content</code> shape.
            </Callout>

            <h2>מה שיגרנו</h2>
            <ul>
                <li>
                    <strong>Search & Discovery</strong> — Cmd/Ctrl + K global search, route + pillar + content + video corpus, lazy modal (<code dir="ltr">8.60 kB</code> raw / <code dir="ltr">3.27 kB</code> gzip).
                </li>
                <li>
                    <strong>Content Pipeline</strong> — frontmatter contract, taxonomy registry, 6 typed collections, <code dir="ltr">defineCollection()</code> validator. Pillars first-class. Tags governed.
                </li>
                <li>
                    <strong>Newsletter Infrastructure</strong> — provider abstraction (4 adapters: deferred / webhook / beehiiv / convertkit), <code dir="ltr">NewsletterSignup</code> component, segmentation.
                </li>
                <li>
                    <strong>Analytics Layer</strong> — typed <code dir="ltr">EVENTS</code> taxonomy, traversal tracker, search/CTA/recommendation hooks, privacy-conscious scrubber.
                </li>
                <li>
                    <strong>AI Foundations</strong> — ecosystem graph, graph-based recommendation engine, <code dir="ltr">CreatorAssistant</code> interface (<code dir="ltr">NullAssistant</code>), semantic-metadata contract.
                </li>
            </ul>

            <h2>מה <em>לא</em> שיגרנו (בכוונה)</h2>
            <ul>
                <li>אין chatbot UI — ה-assistant הוא חוזה, לא surface.</li>
                <li>אין vector DB — הגרף עובד today, embeddings — מחר.</li>
                <li>אין dashboard — analytics זה observability, לא surveillance.</li>
            </ul>

            <h2>נתונים</h2>
            <ul>
                <li>Main bundle gzip: 85.10 → <strong>89.22 kB</strong> (+4.12 kB).</li>
                <li>Lazy chunks: 13 → 14.</li>
                <li>Build time: 2.32 s → 2.33 s (+10 ms).</li>
            </ul>
        </>
    );
}
