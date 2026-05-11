// Single source of truth for site-wide values.
// Components that consume socials MUST conditionally render only when truthy —
// nulls hide the link entirely so we never ship placeholders.

export const SITE = {
    // Master brand
    name: "Yuval Zakay",
    shortName: "YZ",
    role: "Software Educator · Learning & Building with AI · Modern Tech Creator",
    roleHe: "מורה לתכנות · לומד ובונה עם AI בפומבי · יוצר תוכן טכנולוגי",

    // Education sub-brand (kept — has SEO equity from the YouTube channel)
    educationBrand: "YuvalCode",

    // Canonical
    url: "https://yuvalcode.co.il",

    // Direct contact
    email: "yuval@yuvalcode.co.il",

    // YouTube
    youtubeChannelId: "UC0InPimb8JxKqhrH0CFWBwA",
    youtubeChannelUrl: "https://www.youtube.com/channel/UC0InPimb8JxKqhrH0CFWBwA",
    // One-click subscribe prompt — append to channel URL for the popup confirmation flow
    youtubeSubscribeUrl: "https://www.youtube.com/channel/UC0InPimb8JxKqhrH0CFWBwA?sub_confirmation=1",

    // Real social profiles — fill these in.
    githubUrl: null,
    linkedinUrl: null,

    // Public résumé — drop the file at /public/cv.pdf
    cvUrl: "/cv.pdf",

    // International format, digits only, no "+" (e.g. "972501234567").
    whatsappNumber: null,
};

export const MAILTO = `mailto:${SITE.email}`;

export const WHATSAPP_LINK = SITE.whatsappNumber
    ? `https://wa.me/${SITE.whatsappNumber}`
    : null;

// Recruiter / collaborator deep-link to the contact form (preselects subject in Contact.jsx)
export const RECRUITER_CONTACT_PATH = "/contact?subject=recruitment";

// Partnership / collaboration entry point — consolidates collab / consulting / lessons / sponsorships
export const WORK_WITH_ME_PATH = "/work-with-me";
