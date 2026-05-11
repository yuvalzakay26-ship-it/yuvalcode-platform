# BRAND_BLUEPRINT.md
**Project:** Yuval Zakai — Personal Brand Platform (evolution of YuvalCode)
**Audience:** Recruiters · Hiring Managers · Israeli Tech Companies · Students · 1-on-1 Clients · Collaborators
**Date:** 2026-04-29
**Companion document:** `PROJECT_BRAIN.md` (technical audit — read first)

> **⚠️ SUPERSEDED 2026-04-30 by `BRAND_V2.md`.**
> The user explicitly corrected the recruiter-first thesis below: the site is the premium HQ of Yuval's YouTube + AI creator brand, not a recruiter portfolio. Read `BRAND_V2.md` for the current contract. The bug/SEO/a11y/perf observations in this file are still valid; the strategic positioning is not.

> This is the strategic blueprint for transforming the existing site into a world-class personal brand platform. It is not an implementation. It is the contract that every implementation PR will be measured against.

---

## 0. Strategic Pivot (read first)

The site today is **product-centric** — "YuvalCode" is positioned as a learning library, with the human as a footnote.

The site needs to become **person-centric** — Yuval Zakai is positioned as the asset, with the learning library as one of several proof points.

| Dimension | Today | After pivot |
|---|---|---|
| Brand subject | "YuvalCode" (the channel) | **Yuval Zakai** (the person) |
| First impression | "Hebrew Mahat video catalog" | "Developer · Educator · Future AI Builder" |
| Hero CTA | "Start learning" / "Subscribe" | "Hire me" / "See my work" / "Book intro call" |
| Primary metric | Channel subscribers | Recruiter intent (interview requests, CV downloads) |
| Catalog role | The site | A single proof-of-impact section |
| Secondary metric | Lessons booked | YouTube subscribers, student wins |

The Mahat catalog stays — it is a rare and credible proof of teaching at scale — but it stops being the front door. The front door becomes Yuval himself.

**Brand wordmark stays "YuvalCode"** (it has equity on YouTube and the domain), but **the human name "Yuval Zakai" leads** in the hero, the meta, and the CV.

---

## 1. Full Upgraded Website Structure

### 1.1 Sitemap (after pivot)
```
/                          → Personal hero + condensed proof of every section
/about                     → Long-form story, journey, values, headshot, intro video
/work                      → Builder mindset: real projects, case studies, GitHub
/teaching                  → Teaching philosophy + ORT + YouTube + private lessons
/teaching/exams            → Mahat catalog (was /exams)
/teaching/exams/:slug      → Crawlable per-exam page (was /videos?pid=)
/contact                   → Hiring CTA + Cal.com booking + form
/cv                        → Static one-page resume (HTML + downloadable PDF)
/privacy                   → unchanged
/terms                     → unchanged
*                          → 404 with smart suggestions
```

### 1.2 Routes vs. responsibilities
| Route | Primary visitor | Primary goal |
|---|---|---|
| `/` | Recruiter (30 s scan) | Decide "worth an interview?" → click `/cv` or `/contact` |
| `/about` | Hiring manager / collaborator | Build conviction: "this person is serious" |
| `/work` | Recruiter / engineering manager | Verify "can he actually build?" |
| `/teaching` | Student / lesson client | Trust "can he actually teach me?" |
| `/teaching/exams/*` | Student | Find a specific video |
| `/cv` | Recruiter / ATS scraper | Print / download / forward |
| `/contact` | Anyone with intent | Convert (interview / lesson / collab) |

### 1.3 Home page section order (the 30-second recruiter scan)
1. **Hero** — name, three-role headline, status pill ("Open to opportunities"), two CTAs
2. **Proof strip** — live numbers (YT subs, videos, students taught, years teaching)
3. **About snapshot** — 60-word bio + headshot + link to `/about`
4. **Why work with me** — 3-card differentiator block
5. **Skills & technologies** — categorized stack (not a tag-cloud; ranked)
6. **Selected work** — 3 featured projects with thumbnails (+ link to `/work`)
7. **Teaching presence** — ORT badge + YouTube card + Mahat catalog teaser
8. **Currently learning** — public "now" log (what I'm building / studying this month)
9. **Future AI vision** — 1 paragraph, 1 visual, 1 commitment
10. **Contact CTA** — single large block: "Hire me", "Book a call", "Send a message"
11. **Footer** — authority presence (real social profiles, real photo, real name)

This sequence is engineered so a recruiter who only reads sections 1, 2, and 5 still has enough to act. Every section below #5 deepens conviction; nothing below #5 is required for conversion.

### 1.4 What is removed
- `/coming-soon` — replaced by real `/work` content. Stop promising things that aren't shipping.
- `/videos?pid=` query-style routes — replaced by `/teaching/exams/:slug` (crawlable, shareable).
- "Latest videos on home" strip — kept, but reframed as proof of activity, not as a content shelf.

### 1.5 What is preserved
- `Layout` + `Outlet` model.
- The YouTube service layer (`fetchPlaylistsManifest`, `fetchPlaylistVideos`, `fetchLatestVideos`).
- The video normalizer.
- The exams sort.
- Tailwind + Framer Motion + react-helmet-async.
- The "Titanium" aesthetic direction — refined, not replaced.

---

## 2. New Premium Copy (Hebrew primary, English alt where useful)

### 2.1 Identity primitives
- **Name:** יובל זכאי / Yuval Zakai
- **Three-role headline:** מפתח · מורה · בונה לעבר AI / Developer · Educator · Building toward AI
- **One-sentence positioning:** מהנדס תוכנה ומורה שמלמד את הדור הבא של מפתחי ההייטק הישראליים, ובונה את הדרך אל מוצרי AI.
- **Domain status:** "פתוח להזדמנויות בתעשייה" / "Open to opportunities" — visible as a pulsing pill in the hero and in `/cv`.

### 2.2 Hero (above the fold)
**Eyebrow (small):** יובל זכאי · בן 26 · ת״א-ירושלים
**H1 (large, two lines):**
> מפתח. מורה.
> בדרך אל ה-**AI** הבא של ישראל.

**Subhead (one line, 2 sentences):**
> מהנדס תוכנה בוגר הנדסאי, מלמד סטודנטים במכללת אורט,
> ובונה כל יום את המסלול אל יצירת מוצרי AI אמיתיים.

**Primary CTA:** ראה פרויקטים ← `/work`
**Secondary CTA:** דבר איתי ← `/contact`
**Tertiary link (small):** הורד קורות חיים (PDF) ← `/cv`

**English variant (for og/title and recruiter pages):**
> *Software engineer · Educator · Building toward AI.*
> *I teach the next generation of Israeli developers, ship projects every week, and am training myself into AI product work.*

### 2.3 Proof strip (live numbers)
Format: four statistics, monospaced numerals, no fluff. Pull from YT API.
- **`{n}+`** מנויים בערוץ
- **`{m}+`** סרטונים פורסמו
- **`200+`** סטודנטים לימדתי באורט
- **`2022→היום`** מלמד תכנות ברצף

### 2.4 About snapshot (home)
> **נעים להכיר.**
> אני יובל. סיימתי הנדסאי הנדסת תוכנה ומיד התחלתי ללמד.
> שלוש שנים מאוחר יותר אני מעביר קורסים במכללת אורט, מנהל את ערוץ YuvalCode עם פתרונות וידאו לכל מבחני מה״ט,
> ומשקיע כל ערב בלמידה עצמית של AI, מערכות, ופיתוח מוצרים.
> **קרא עוד ←** `/about`

### 2.5 About full page (long-form)
Sections, in order, with copy direction:
- **הסיפור שלי** — short narrative arc: from student → educator at ORT → builder → AI direction. 3 paragraphs.
- **השנה שעברה במספרים** — five bullet milestones with dates.
- **איך אני עובד** — three principles: *learn in public · ship weekly · teach what I learn*.
- **מה הרציתי / קורסים שאני מעביר** — list of ORT courses, semesters, group sizes.
- **למה אני** — paragraph addressed to a hiring manager.
- **מחוץ לקוד** — one paragraph that humanizes (hobby, reading list, why teaching).
- **הצעד הבא** — explicit "what I'm looking for next" — full-time / part-time / contract / collab.

### 2.6 Why work with me (3 cards)
| Card | Title | Body (Hebrew, ~25 words) |
|---|---|---|
| 1 | **הסבר זה הסקיל שלי** | "כשהבנתי מהיסוד איך משהו עובד, אני יודע ללמד את זה. זה אותו שריר שמשפר תיעוד, code review, ועבודת צוות." |
| 2 | **בונה כל שבוע** | "כל שבוע אני שולח קוד אמיתי. הערוץ, הקורסים, פרויקטי הצד — הכל פומבי, הכל קומיט-בקומיט." |
| 3 | **חשיבה ארוכת טווח** | "המסלול שלי הוא AI ומוצרים חכמים. עד אז, אני בונה כלים שכבר היום פותרים בעיות אמיתיות." |

### 2.7 Skills & Technologies (categorized — not a tag-cloud)

Use four ranked tiers:

**Daily-driver:** C#, .NET, JavaScript, React, HTML, CSS, Git
**Working knowledge:** Python, TypeScript, Node.js, REST APIs, SQL
**Learning now (Q2 2026):** OpenAI/Anthropic SDKs, RAG patterns, Vector DBs, LangChain
**Foundations:** Data Structures, Algorithms, OOP, Complexity, System Design basics

Each tier should have a one-line label so a recruiter knows what "Working knowledge" means: "_used in real projects, can deliver with light onboarding_."

### 2.8 Selected work (3 featured projects on home → full grid on `/work`)

For each project, the format is:
```
[ Cover image ]
Project name · Year
1-line outcome ("a YouTube-API-backed video archive used by 100s of students/month")
Stack: React · Vite · Tailwind · YouTube Data API
[ Live ]  [ GitHub ]  [ Case study ]
```

Suggested initial three:
1. **YuvalCode** (this site) — case study of the build itself.
2. **Mahat exam library** — 200+ video solutions, search, filter, the actual catalog.
3. **One AI-flavored side project** (to be built — see roadmap §10) — e.g. "Mahat tutor" — a small RAG bot answering Mahat C# questions from past videos.

### 2.9 Teaching presence
> **מורה במכללת אורט · יוצר תוכן ב-YuvalCode**
> שלוש שנים שאני עומד מול כיתות. שנתיים שאני מנהל ערוץ פתוח שעוזר לאלפי סטודנטים לעבור את מבחני מה״ט.
> **הקטלוג המלא ←** `/teaching/exams`

Plus an embedded "latest 3 videos" strip pulled live from the channel.

### 2.10 Currently learning (the "now" log)
A small, dated, public list. Updated monthly. Honesty over polish:
> **אפריל 2026 · עכשיו על השולחן:**
> · קורא: "Designing Data-Intensive Applications" (פרק 3)
> · בונה: בוט שעונה על שאלות מה״ט עם RAG על תמלילי הסרטונים
> · לומד: Anthropic SDK + tool-use patterns
> · מסיים: רפקטור גדול לאתר הזה (פרויקט פומבי)

### 2.11 Future AI vision
> **המסלול הבא: מפתח AI שבונה מוצרים.**
> אני לא מאמין ב-"להיות AI engineer" כתואר. אני מאמין בלבנות מוצרים שפותרים בעיות אמיתיות עם הכלים הכי חזקים שיש —
> ובמקרה, הכלים האלה היום הם LLMs. בשנתיים הבאות אני בונה לכיוון תפקיד שמשלב מוצר, הוראה, ומערכות חכמות.

### 2.12 Contact CTA
Hierarchy of asks, ordered by visitor intent:
1. **גיוס / משרה ←** `mailto:` + WhatsApp + LinkedIn DM
2. **שיעור פרטי ←** Cal.com booking embed
3. **שיתוף פעולה / כתיבה / חסות לערוץ ←** form
4. **כל דבר אחר ←** generic message form

Single message at top:
> **בדרך כלל אני עונה תוך 24 שעות.**
> מעדיף אימייל לעניינים מקצועיים, ווטסאפ לדחיפות, וקפה לפגישה אמיתית.

### 2.13 Footer
> **נבנה ע״י יובל זכאי · {year} · ישראל**
> Real socials only. Verified email. ORT mention. Privacy + Terms.
> Tagline (small, in monospace): _"learn · ship · teach · repeat"_

---

## 3. UX/UI Redesign Plan

### 3.1 Visual system
- **Single canonical surface color.** Pick one: `#0A0B10` (recommended — deeper than current, more "Bloomberg Terminal premium"). Replace every `#02040a / #0b0c15 / #0f111a / #0a0c14` with this.
- **One accent color, used sparingly.** Reduce indigo→purple→pink rainbow to a single accent (recommend keeping `primary: #6366f1` indigo) used as a 5–10% wash, never as the dominant color.
- **Type scale.** Heebo stays. Define a strict scale: 12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 96. Do not invent in-between sizes.
- **Spacing.** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128. Same rule.
- **Border-radius.** 8 / 12 / 16 / 24 / 32. Stop inventing `rounded-[2.5rem]`.
- **Borders.** Single token `--border: rgba(255,255,255,0.08)`. Stop using `border-white/5` and `border-white/10` interchangeably.
- **Motion.** One easing curve for the whole site (`cubic-bezier(0.22, 1, 0.36, 1)` — "ease-out-expo"). One duration scale: 150 / 250 / 400 / 600 ms.

### 3.2 Typography hierarchy
| Level | Use | Size · weight |
|---|---|---|
| Display | Hero H1 | 64–96 / 800 |
| H1 | Page titles | 48 / 800 |
| H2 | Section titles | 36 / 700 |
| H3 | Card titles | 22 / 700 |
| Lead | Subheads | 18–22 / 400 |
| Body | Body | 16 / 400 |
| Caption | Meta | 14 / 500 |
| Mono | Code, numbers | 14 / 500 (JetBrains Mono) |

### 3.3 Component upgrades (no-rewrite refactors)
- **`Button`** — keep variants, add `size: xl` (already used but not declared), add `as` prop (`<Button as={Link}>`) so we stop wrapping `<Link>` around `<Button>`.
- **`Badge`** — add `tone="status"` for the "Open to opportunities" pulsing pill.
- **`PageMeta`** — extend to support `og:image`, `canonical`, `jsonLd`.
- **`VideoCard`** — convert from `<div onClick>` to `<a href>`. Solves accessibility.
- **`FloatingTechBackground`** — gate behind `prefers-reduced-motion` AND `IntersectionObserver`.
- **New: `ProofStrip`** — 4-stat bar with live YT numbers + ORT/years.
- **New: `SectionHeader v2`** — eyebrow + title + lead, RTL-aware.
- **New: `ProjectCard`** — for `/work`.
- **New: `NowList`** — for "Currently learning."
- **New: `StatusPill`** — for "Open to opportunities."

### 3.4 Page wireframes (ASCII, RTL flow)

**Home (above the fold):**
```
┌──────────────────────────── navbar (capsule) ────────────────────────────┐

                                  • Open to opportunities

                                מפתח. מורה.
                          בדרך אל ה-AI הבא של ישראל.

                  מהנדס תוכנה בוגר הנדסאי, מלמד באורט, ובונה...

                       [ ראה פרויקטים ]   [ דבר איתי ]
                              הורד קורות חיים →

────────────────── proof strip (4 stats, mono) ──────────────────
   1.2K+ מנויים     200+ סרטונים     200+ סטודנטים     2022→היום
─────────────────────────────────────────────────────────────────
```

**Home (about snapshot, ~scroll 1):**
```
┌────────────────────────┐  ┌─────────────────────────────────────┐
│                        │  │  נעים להכיר.                         │
│    [ headshot photo ]  │  │  אני יובל. סיימתי הנדסאי...         │
│                        │  │                                     │
│                        │  │  [ קרא עוד → /about ]               │
└────────────────────────┘  └─────────────────────────────────────┘
```

**Home (work, scroll 3):**
```
        עבודה נבחרת                                       כל הפרויקטים →

┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ [cover]      │   │ [cover]      │   │ [cover]      │
│ YuvalCode    │   │ Mahat Library│   │ AI Tutor     │
│ stack chips  │   │ stack chips  │   │ stack chips  │
│ live · github│   │ live · github│   │ live · github│
└──────────────┘   └──────────────┘   └──────────────┘
```

### 3.5 RTL specifics
- `dir="rtl"` stays at root.
- Icon "arrows that mean forward" must mirror — use `ArrowLeft` (visually points right) for "next" and `ArrowRight` (visually points left) for "back" in RTL. Currently mixed.
- Animations that translate horizontally need RTL-aware variants (use logical properties: `start`/`end`, not `left`/`right`).
- Number formatting: keep numerals LTR with `unicode-bidi: isolate` on `.mono` text.
- `text-align: start` instead of `left`/`right` everywhere.

---

## 4. Conversion Improvements

Goal: every visitor lands on a clear path to a single decision.

| Visitor type | Single decision | Site path | Conversion mechanism |
|---|---|---|---|
| Recruiter (30 s) | "Worth an interview?" | `/` → `/cv` | Open status pill + downloadable PDF + 1-click `mailto:` |
| Hiring manager (3 min) | "Should we screen?" | `/` → `/work` → `/about` → `/contact` | Project case studies + ORT credibility + Cal.com slot |
| Student | "Should I learn from him?" | `/` → `/teaching` → YouTube subscribe | Free Mahat catalog + free intro video + newsletter signup |
| Lesson client | "Can he help me pass?" | `/teaching` → `/contact` (private lesson) | Cal.com booking + transparent pricing + first-call-free hook |
| Collaborator | "Worth reaching out?" | `/work` → `/contact` | Long-form contact form + GitHub link |

Conversion mechanisms to add:
- **Sticky bottom-bar on mobile** with `Hire` / `Lesson` / `WhatsApp` (replaces current `BackToTopButton` on `/` and `/about`).
- **Cal.com / Calendly embed** on `/contact` for booking (15-min intro for recruiters; 30-min for lessons).
- **Real Contact backend** (Formspree free tier → migrate to Resend + a tiny Vercel/Netlify function later).
- **Resume PDF** at `/cv.pdf` (auto-generated from `/cv` route or manually maintained).
- **"Currently open / closed" toggle** in code — flip a single config to switch every "Open to opportunities" pill.
- **Multi-CTA hero** (one primary, one secondary, one tertiary). Today's hero has only one type of CTA.
- **Newsletter opt-in** — small form in footer ("Get a Mahat tip and one project update per month").
- **Lead magnets**: 1-page "Mahat C# cheat-sheet" PDF, gated behind email.

---

## 5. Trust-Building Improvements

Trust is the bottleneck. Today the site has none of these.

| Signal | Current | Target |
|---|---|---|
| Real headshot | none | Hero + About + Footer |
| Real intro video (60–90 s) | none | About page top |
| Real subscriber count | none (says "channel YuvalCode") | Live API number on home + about |
| Real student count | none | "200+ סטודנטים באורט" + "מאז 2022" |
| Verified social profiles | broken (`https://github.com`) | Real LinkedIn, real GitHub, verified YouTube channel |
| Verified email | yes (`yuval@yuvalcode.co.il`) | keep |
| Real WhatsApp | placeholder `+972501234567` | real number — _or remove the channel entirely_ |
| Testimonials | none | 3–6 real quotes (students who passed Mahat, ORT colleagues, recruiters who interviewed him) |
| Press / mentions | none | Add when real |
| ORT credential | weak ("teacher in some college") | Prominent: ORT logo + course names + semester dates |
| Open-source code | hidden | GitHub featured on home + every project linked |
| Last-active signal | none | "Pushed code yesterday · Last YT video 6 days ago" — pulled from API |
| Activity log | none | `/now`-style block on home (see §2.10) |
| Photo on every page | none | Headshot in nav (small) on every internal page |
| Real bio | partial (About) | Real, dated, with credentials |
| Real availability | unclear | Status pill + "מקבל פניות עד 5 בכל חודש" |

---

## 6. Recruiter-Focused Improvements

The recruiter journey gets a dedicated track. They scan, they bounce, they forward.

### 6.1 Things a recruiter looks for in 30 seconds
1. Name + role.
2. Years of experience + recent employer/school.
3. Stack (top 5 chips).
4. Location + work mode (remote/hybrid/on-site/Israel).
5. Status: open / passive / closed.
6. Proof of recent work (GitHub commits this month? videos this week?).
7. One-click contact.

The home hero must surface 1-7 within the first viewport. Today it surfaces only #1.

### 6.2 Recruiter-facing additions
- **Status pill** at top of hero: 🟢 *פתוח להצעות · ת״א-ירושלים · משרה מלאה / חלקית / חוזה*.
- **`/cv` HTML page** — recruiter-printable, semantic HTML, one-page, no animations, no music, no nonsense.
- **`/cv.pdf`** — same content, downloadable, ATS-friendly (text-based, no image-only PDFs, real h1/h2 structure for parsing).
- **`mailto:` with subject prefilled** (`?subject=הצעה%20-%20[שם%20החברה]`) on hero CTA.
- **Tech-stack chips on home** (visible without scroll on desktop; just below proof-strip).
- **"What I'm looking for" sentence** — on About + CV. e.g.: "_מחפש תפקיד Junior/Mid Developer בחברה שמתחילה ליגוע ב-AI, נמרצת על Code-quality ופתוחה לעובד שגם מלמד._"
- **English mirror** of the CV (`/cv?lang=en` or separate route) — Israeli recruiters often forward profiles in English to global teams.

### 6.3 Things to suppress for the recruiter view
- The cyber-grid floating background and FloatingTechBackground should auto-attenuate on `/cv` (use simpler, calmer surface).
- No autoplay video.
- No "subscribe to channel" CTA on `/cv`. The channel is a credential, not a sales pitch in this context.

---

## 7. SEO Improvements

Recap and extend `PROJECT_BRAIN.md` §9.

### 7.1 Per-route required surface
- `<title>`, `<meta description>`, `<link rel="canonical">`, `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card="summary_large_image"`.

### 7.2 JSON-LD structured data
Add to `<head>` per page:
- **Home + About:** `@type: Person`, with `name`, `jobTitle`, `affiliation` (ORT), `sameAs` (GitHub, LinkedIn, YouTube), `image`, `url`, `email`.
- **`/teaching`:** `@type: EducationalOrganization` for YuvalCode brand.
- **`/teaching/exams/:slug`:** `@type: Course` per exam.
- **Per-video display:** `@type: VideoObject` with `name`, `thumbnailUrl`, `uploadDate`, `duration`, `embedUrl`, `contentUrl`.
- **Every page:** `@type: BreadcrumbList`.

### 7.3 Hebrew SEO targets
Primary keyword clusters to win:
- "פתרון מבחן מה״ט C#"
- "סרטוני מה״ט"
- "מורה פרטי תכנות C#"
- "הנדסאי הנדסת תוכנה הכנה"
- "מבנה נתונים מה״ט"
- "Yuval Zakai" (own the SERP for the name)

### 7.4 Technical SEO
- `sitemap.xml` generated at build (1 entry per route + 1 per `/teaching/exams/:slug`).
- `robots.txt` allowing all + sitemap reference.
- Per-route canonical.
- 1 `<h1>` per page (currently most pages have one, but Privacy/Terms cards use h2 with no h1 in some loads).
- Pre-rendered HTML for `/`, `/about`, `/work`, `/teaching/exams/*`, `/cv` (use `vite-plugin-ssg`, or migrate static pages to Astro). Today the SPA returns an empty `<div id="root">` to crawlers — non-Google bots see nothing.
- Internal linking: every page links to `/cv` and `/contact` from the footer.
- `lang="he"` is set; add `lang="en"` on the CV English mirror.

---

## 8. Mobile-First Improvements

Default viewport for design review: 375×812 (iPhone 13/14 mini).

### 8.1 Hard rules
- Tap targets ≥ 48 × 48 px.
- Body text ≥ 16 px (current 14 px caption is too small).
- Single column below 768 px. Two-column splits collapse cleanly.
- Navbar capsule on mobile: simplify — show logo + hamburger only. Remove "התחל ללמוד" button on mobile (it's redundant with the drawer).
- **Sticky bottom action bar** on `/` and `/contact`: 3 buttons (Hire / WhatsApp / Subscribe), each 56 px tall.
- Hero H1 caps at `text-5xl` on mobile (currently `text-7xl/text-8xl` — overflows).
- Floating background `count={count}` reduces from 15 → 6 on mobile (use `useMediaQuery` hook).

### 8.2 Performance budgets (mobile)
- LCP ≤ 2.5 s on 4G.
- INP ≤ 200 ms.
- CLS ≤ 0.1.
- JS payload ≤ 180 kB gzipped (today's bundle: monolithic, exceeds).
- Image payload per page ≤ 600 kB (use YouTube thumbs `mqdefault.jpg` on mobile, `maxres` on desktop).

### 8.3 Mobile-specific wins
- One-handed reach: primary CTA in lower 2/3 of viewport.
- Navigation always thumb-reachable via sticky bottom bar, not top hamburger only.
- Use `inputmode` and `autocomplete` attributes on all form inputs.
- Replace `select` elements with custom listbox patterns where the design needs styling — but only after WCAG audit passes.

---

## 9. Accessibility Improvements

Targets: WCAG 2.2 AA, ISR 5568 minimums for an Israeli educational/professional site.

Recap and extend `PROJECT_BRAIN.md` §8.

### 9.1 Fix in code (semantics)
- `VideoCard`: `<div onClick>` → `<a href={youtubeUrl} target="_blank" rel="noopener noreferrer">`.
- All form fields: `<label htmlFor>` paired to `<input id>`.
- Contact `<select>`: add `name`, `value`, `onChange`, default to first option, mark required.
- Navbar mobile button: `aria-label="פתח תפריט"`, `aria-expanded={isOpen}`, `aria-controls="mobile-drawer"`.
- Mobile drawer: focus trap (use `react-aria` or a ~30-line custom hook). Restore focus on close.
- Toast container: `role="region" aria-live="polite" aria-label="הודעות מערכת"`.
- Add `<a href="#main" class="skip-link">דלג לתוכן הראשי</a>` as first focusable element. Visually hidden until focused.
- `aria-current="page"` on active `NavLink`.
- BackToTop `aria-label`: Hebrew, not English.
- Alt text discipline: never fall back to `null` — use `alt=""` for decorative, descriptive Hebrew otherwise.

### 9.2 Color & motion
- Verify all body copy meets 4.5:1 contrast against `#0A0B10`. Replace `text-gray-500` body uses with `text-gray-400` minimum.
- Wrap every Framer Motion variant + every CSS keyframe with `prefers-reduced-motion` query. The site should be silent and still under reduced-motion.
- Provide a `<noscript>` fallback for `/` so basic content is readable without JS (improves crawler accessibility too).

### 9.3 Keyboard navigation flow
- Tab order: skip link → logo → nav links → status pill → primary CTA → secondary CTA → main content → footer.
- Visible focus rings on every interactive element (a single token: `focus-visible:ring-2 ring-primary/60 ring-offset-2 ring-offset-background`).
- ESC closes the mobile drawer and any open modal.
- `Cmd/Ctrl + K` opens search (future feature).

### 9.4 Screen reader passes
- Manual audit on `/`, `/about`, `/contact`, `/teaching/exams` with NVDA (Windows) and VoiceOver (macOS).
- Every dynamic update (filter chip click, search result change) announces via `aria-live`.

---

## 10. Implementation Roadmap (Phases)

Ordered to maximize value, minimize risk, and build momentum. Every phase ships behind a working main; nothing leaves the branch broken.

### Phase 0 — Stabilize (1–2 days, no design changes)
**Goal:** turn the site from "demo with sharp edges" into "live, indexable, contactable."
- Fix the 3 latent crashes (`<Check>`, `<ArrowRight>`, `location.search`).
- Add `.env` to `.gitignore`. Rotate the YouTube API key. Restrict to domain + localhost.
- Replace placeholder data: WhatsApp, GitHub link, fallback rickroll videos.
- Wire Contact form to Formspree (free tier).
- Delete `App.css`, `src/assets/react.svg`, empty `src/hooks/`, `debug_youtube.cjs`, deprecated `fetchVideos()`.
- Pick one of `netlify.toml` / `vercel.json`.
- Add `<PageMeta>` to all 9 routes (Hebrew title + description for each).

### Phase 1 — Foundation (3–5 days)
**Goal:** make the existing UI deliver on its design promises before any redesign.
- Define Tailwind shade scales for `primary`/`secondary`/`accent`.
- Register all referenced animations as keyframes; gate behind `prefers-reduced-motion`.
- Add `/grid.svg` and `/grid-pattern.svg` (or remove references).
- Standardize background to a single token (`#0A0B10`).
- Centralize constants (`src/lib/constants.js`: channel URL, email, ORT info, status flag).
- Convert `Privacy`/`Terms` to named exports.
- Lazy-load all routes via `React.lazy` + `<Suspense>`.
- `VideoCard` → `<a>` (accessibility critical).
- Fix dynamic Tailwind classes in About.jsx (static color map).

### Phase 2 — Brand Pivot (1 week)
**Goal:** the strategic repositioning — site becomes person-centric.
- Rename and restructure routes per §1.1 (with redirects from old paths).
- Rebuild Home page with the section order from §1.3.
- Build new `/work` page (initial: 3 case studies — YuvalCode site, Mahat library, one AI side project to start).
- Build new `/teaching` page (consolidation of teaching narrative + Mahat catalog teaser).
- Build new `/cv` HTML route + downloadable PDF.
- Hero copy + about copy + why-work-with-me copy from §2.
- Add `StatusPill`, `ProofStrip`, `NowList`, `ProjectCard` components.
- Real headshot, real intro video (record on this phase or block on it).

### Phase 3 — Trust + SEO (4–5 days)
**Goal:** turn the live site into a discoverable, credible authority.
- Replace placeholder socials with verified profiles.
- Add `og.png` (1200×630) + full favicon set.
- Add `sitemap.xml`, `robots.txt`.
- Add JSON-LD per §7.2.
- Hook up Plausible (or GA4).
- Add live channel-stats API call (subscribers, video count, latest upload date).
- Add testimonials section (3–6 real quotes).
- Add ORT logo + course list + dates.
- Pre-render `/`, `/about`, `/work`, `/cv`, `/teaching/exams/*` (vite-plugin-ssg or migrate static pages to Astro).

### Phase 4 — Conversion Layer (3–5 days)
**Goal:** turn visitors into interviews, lessons, and subscribers.
- Real Contact backend with auto-reply email.
- Cal.com booking embed on `/contact` (15-min intro / 30-min lesson).
- Sticky bottom mobile action bar.
- Newsletter signup (Beehiiv or ConvertKit).
- "Mahat C# cheat-sheet" PDF as lead magnet.
- Per-exam crawlable pages (`/teaching/exams/:slug`).

### Phase 5 — Product Depth (1–2 weeks)
**Goal:** the site itself becomes destination-worthy.
- Embedded YouTube player (modal) with watched/bookmarked state in localStorage.
- Global search across all videos.
- Per-question pages with prev/next navigation.
- Topic pages (`/topics/:slug`).
- Build the AI side project (RAG-based "Mahat tutor") — adds proof to the AI vision claim.

### Phase 6 — Polish (ongoing)
**Goal:** maintain elite quality.
- Migrate to TypeScript.
- Playwright e2e for the 3 critical journeys (recruiter scan, lesson booking, video find).
- Lighthouse budget in CI.
- Quarterly content audit.
- A/B test hero copy with subscribers/leads as KPI.
- Open-source curriculum companion repo.

---

## 11. Definition of Done (per phase)

Every phase ships only when it passes:
1. ✅ All `npm run lint` warnings resolved.
2. ✅ All routes accessible without JS errors in console.
3. ✅ Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
4. ✅ Manual smoke test of 3 user journeys (recruiter scan, lesson booking, find Mahat video).
5. ✅ Screenshot diff at 375 px and 1440 px reviewed.
6. ✅ Hebrew copy reviewed by a native reader.
7. ✅ No new dead code (`unused-imports` lint clean).

---

## 12. Risks and Trade-offs

| Risk | Likelihood | Mitigation |
|---|---|---|
| Brand pivot confuses returning students | Medium | Add prominent "Mahat catalog" link in primary nav + on home; old `/exams` URLs redirect |
| API key exposure during rotation | Low | Rotate before pushing; restrict in Cloud Console first |
| YouTube quota blown on per-page loads | Medium | TTL caching already in place; add a low-priority "stale-while-revalidate" path |
| Pre-rendering breaks dynamic content | Medium | Pre-render only static surfaces; keep `/teaching/exams` SPA-rendered |
| Headshot/intro-video not yet recorded | High | Phase 2 cannot ship until photo + intro exist. **Block phase on this asset.** |
| Recruiter visits before phase 2 ships | High | Ship Phase 0+1 first, then `/cv` HTML even before full pivot |
| Hebrew typography on long-form blocks | Medium | Test with real ORT students before Phase 2 ships |

---

## 13. What This Site Is NOT

To stay disciplined, here is the explicit anti-scope:

- ❌ This is not a SaaS. No login. No accounts. No billing.
- ❌ This is not a learning platform. The platform is YouTube. The site is the index + brand.
- ❌ This is not a blog yet. `/writing` is reserved but deferred to phase 6.
- ❌ This is not multi-language. Hebrew primary; English mirror only on `/cv`.
- ❌ This is not gamified. No streaks, no badges, no XP.
- ❌ This is not "open in app." No PWA install prompts in phase 1–4.

Everything not listed in §10 is out of scope until those phases ship.

---

## 14. Recommendation: What to Do Next (concrete)

Start by shipping a single PR that completes **Phase 0 (Stabilize)**. It is low-risk, mostly bug fixes, and a recruiter visiting tomorrow will see a measurably better site than today.

Then run **Phase 1 (Foundation)** as a second PR. After that, before starting Phase 2, **block on three real assets** that will determine whether the brand pivot actually lands:

1. **A real headshot** — neutral background, eye-level, daylight, professional but not corporate.
2. **A 60–90 s intro video** — to camera, in Hebrew, in the format: "Hi, I'm Yuval. I [build / teach / am moving toward AI]. Here's what I'm working on this month."
3. **A real list of 3–6 testimonials** — students who passed Mahat thanks to the channel; an ORT colleague; ideally one engineer who has worked with you on a project.

Without those three assets, Phase 2 ships a beautifully designed, person-centric site **with nobody in it**. With them, it ships a site that does the job described in the brief: *"This person is serious."*

---

*End of BRAND_BLUEPRINT.md.*
