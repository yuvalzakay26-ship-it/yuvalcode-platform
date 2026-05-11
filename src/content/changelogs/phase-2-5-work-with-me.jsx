import { CONTENT_TYPES } from "../../lib/content/schema";

export const entry = {
    id: "phase-2-5-work-with-me",
    slug: "phase-2-5-work-with-me",
    type: CONTENT_TYPES.CHANGELOG,
    pillar: "creator-journey",
    title: "Phase 2.5 — Work With Me System.",
    summary: "Partnership system. הצטרף שיתופי-פעולה / consulting / private lessons / sponsorships בנקודה אחת. הסעיף /contact עבר לסטטוס משני.",
    eyebrow: "Build in Public · Shipped",
    tags: ["build-in-public", "shipping", "release-notes"],
    status: "live",
    visibility: "public",
    date: "2026-05-07",
    href: "/content/changelog/phase-2-5-work-with-me",
    related: ["phase-3-platform-intelligence"],
    readingMinutes: 2,
    Body,
};

function Body() {
    return (
        <>
            <p>
                Phase 2.5 — איחוד הסעיפים &quot;hire me&quot; / &quot;private lessons&quot; / &quot;collab&quot; ל-route אחד: <code dir="ltr">/work-with-me</code>.
            </p>

            <h2>מה שיגרנו</h2>
            <ul>
                <li>
                    <code dir="ltr">/work-with-me</code> כ-route first-class.
                </li>
                <li>
                    9 sections — Hero · CollaborationPathways (5) · HowIWork (6 שלבים) · CurrentFocus (5 פתוחים + רשימת &quot;לא פתוח אליה&quot;) · TrustAuthorityLayer (6 trust pillars) · ConnectionEcosystem (7 nodes) · WhyIBuildPublicly (3 principles) · ContactExperience (4 channels) · FinalCTA.
                </li>
                <li>
                    Navbar — &quot;להעסיק אותי&quot; כ-persistent CTA → <code dir="ltr">/work-with-me</code> במקום <code dir="ltr">/contact</code>.
                </li>
                <li>
                    <code dir="ltr">/contact</code> עבר ל-secondary — נשאר כ-form, אבל הכניסה הראשונית היא דרך partnership system.
                </li>
            </ul>
        </>
    );
}
