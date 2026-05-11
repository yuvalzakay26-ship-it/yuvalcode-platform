/**
 * Logic for sorting exams/playlists.
 * 
 * Priorities:
 * 1. Special Keywords (Data Structures, Algorithms, etc.)
 * 2. Year (Descending)
 * 3. Alphabetical (Hebrew)
 */
export function sortExams(examsList) {
    if (!examsList) return [];
    
    return [...examsList].sort((a, b) => {
        // Handle both simple string arrays (from Videos.jsx filters) and object arrays (from Exams.jsx)
        const titleA = typeof a === 'string' ? a : a.title || a.examTitle;
        const titleB = typeof b === 'string' ? b : b.title || b.examTitle;

        if (!titleA || !titleB) return 0;

        const getPriority = (title) => {
            const t = title.toLowerCase();
            if (t.includes("מבני נתונים") || t.includes("מבנה נתונים")) return 1;
            if (t.includes("אלגוריתם") || t.includes("אלגוריתמיקה")) return 2;
            if (t.includes("leetcode") || t.includes("c#") || t.includes("מה\"ט") || t.includes("מגן")) return 3;
            // Add more priorities here if needed
            return 4;
        };

        const priorityA = getPriority(titleA);
        const priorityB = getPriority(titleB);

        // 1. Priority Group
        if (priorityA !== priorityB) return priorityA - priorityB;

        // 2. Year (Descending)
        const getYear = (str) => {
            const match = str.match(/\b20\d{2}\b/);
            return match ? parseInt(match[0], 10) : 0;
        };

        const yearA = getYear(titleA);
        const yearB = getYear(titleB);

        if (yearA !== yearB && yearA !== 0 && yearB !== 0) return yearB - yearA;

        // 3. Alphabetical
        return titleA.localeCompare(titleB, "he", { numeric: true });
    });
}
