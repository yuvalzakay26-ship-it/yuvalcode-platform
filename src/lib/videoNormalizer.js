/**
 * Video Normalizer
 * Extracts structured data (Exam Title, Question Number, Topic) from raw YouTube data.
 * 
 * Pipeline:
 * 1. Parse description for explicit metadata keys (e.g. "מבחן: ...", "נושא: ...")
 * 2. Parse title using Regex patterns for common formats
 * 3. Fallback to default values
 */

export function normalizeVideo(youtubeVideo, playlistTitle = null) {
    const { id, snippet, contentDetails } = youtubeVideo;
    const { title, description, publishedAt, thumbnails, resourceId } = snippet;

    // Priority: 
    // 1. contentDetails.videoId (most reliable for playlist items)
    // 2. snippet.resourceId.videoId (standard fallback)
    // 3. id (if it's a raw video search result, id might be the ID string or object)
    const videoId = contentDetails?.videoId ||
        snippet?.resourceId?.videoId ||
        (typeof id === 'string' ? id : id?.videoId);

    // Default Object
    const videoItem = {
        id: videoId || id,
        videoId: videoId,
        youtubeUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : "",
        titleRaw: title,
        descriptionRaw: description,
        publishedAt: new Date(publishedAt).toISOString(),
        thumbnailUrl: getBestThumbnail(thumbnails),

        // Data Contracts
        primaryExamTitle: null, // For backward compatibility/main display
        examTitles: [],         // Array of all playlists/exams this video belongs to
        contentType: "lesson",  // "exam" | "lesson" | "tip" | "project"
        tags: [],
        seriesTitle: playlistTitle || null,

        questionNumber: null,
        topic: null,
        source: "youtube"
    };

    // 1. Try Parsing Description (Highest Priority)
    const descData = parseDescription(description);
    if (descData.examTitle) videoItem.primaryExamTitle = descData.examTitle;
    if (descData.questionNumber) videoItem.questionNumber = descData.questionNumber;
    if (descData.topic) videoItem.topic = descData.topic;

    // 2. Try Parsing Title (If missing data)
    const titleData = parseTitle(title);
    if (!videoItem.primaryExamTitle && titleData.examTitle) videoItem.primaryExamTitle = titleData.examTitle;
    if (!videoItem.questionNumber && titleData.questionNumber) videoItem.questionNumber = titleData.questionNumber;
    if (!videoItem.topic && titleData.topic) videoItem.topic = titleData.topic;

    // 3. Fallbacks / Context Overrides
    if (playlistTitle) {
        if (!videoItem.primaryExamTitle) videoItem.primaryExamTitle = playlistTitle;
        // Also populate the array
        if (!videoItem.examTitles.includes(playlistTitle)) {
            videoItem.examTitles.push(playlistTitle);
        }
    }

    if (!videoItem.primaryExamTitle) videoItem.primaryExamTitle = "סרטון כללי";
    if (!videoItem.questionNumber) videoItem.questionNumber = "";
    if (!videoItem.topic) videoItem.topic = "כללי";

    // Backward Compatibility Getter
    // We can't use a getter easily in a JSON serializable object if we stringify it for cache, 
    // so we just keep the property synced
    videoItem.examTitle = videoItem.primaryExamTitle;

    // Determine Content Type
    if (videoItem.questionNumber || videoItem.primaryExamTitle.includes("מבחן")) {
        videoItem.contentType = "exam";
    }

    // Ensure array is populated if empty (from parsing)
    if (videoItem.primaryExamTitle && !videoItem.examTitles.includes(videoItem.primaryExamTitle)) {
        videoItem.examTitles.push(videoItem.primaryExamTitle);
    }

    return videoItem;
}

function getBestThumbnail(thumbnails) {
    if (!thumbnails) return "";
    return thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url || "";
}

function parseDescription(description) {
    const result = {};
    if (!description) return result;

    const lines = description.split('\n');
    for (const line of lines) {
        if (line.includes("מבחן:")) result.examTitle = line.split("מבחן:")[1].trim();
        if (line.includes("שאלה:")) result.questionNumber = line.split("שאלה:")[1].trim();
        if (line.includes("נושא:")) result.topic = line.split("נושא:")[1].trim();
    }
    return result;
}

function parseTitle(title) {
    const result = {};

    // Pattern 1: "מבחן 2024 מועד א - שאלה 2 - שרשראות"
    // Regex for grabbing Year, Moed, Question, Topic

    // Extract Question Number (e.g. "שאלה 3", "q3", "Q3")
    const qMatch = title.match(/שאלה\s*(\d+)|q(\d+)/i);
    if (qMatch) {
        result.questionNumber = qMatch[1] || qMatch[2];
    }

    // Extract Exam Year/Semester (e.g. "2024 מועד א", "2023 אביב")
    const yearMatch = title.match(/(\d{4})\s*(מועד\s*[א-ת]|אביב|קיץ|חורף)?/);
    if (yearMatch) {
        result.examTitle = `מבחן ${yearMatch[1]} ${yearMatch[2] || ""}`.trim();
    }

    // Basic Topic Extraction (Heuristic: Look for text after the last dash if exists)
    // This is less reliable, but a decent fallback
    if (title.includes("-")) {
        const parts = title.split("-");
        const lastPart = parts[parts.length - 1].trim();
        // Avoid using "שאלה X" as topic
        if (!lastPart.includes("שאלה") && !lastPart.includes("מבחן")) {
            result.topic = lastPart;
        }
    }

    return result;
}
