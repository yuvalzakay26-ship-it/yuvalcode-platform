import { normalizeVideo } from "./videoNormalizer";
import { videos as fallbackVideos } from "../data/videos";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

// Cache Configuration
const CACHE_PREFIX = "yuvalcode_v2_";
const TTL_PLAYLISTS = 1000 * 60 * 60 * 24; // 24 Hours
const TTL_VIDEOS = 1000 * 60 * 60 * 1;    // 1 Hour
const TTL_LATEST = 1000 * 60 * 15;        // 15 Minutes

// --- Public API ---

/**
 * Step 1: Fetch list of all playlists (Exams/Categories)
 * Costs: 1 API Unit
 */
export async function fetchPlaylistsManifest() {
    const CACHE_KEY = `${CACHE_PREFIX}manifest`;

    // 1. Try Cache
    const cached = getFromCache(CACHE_KEY, TTL_PLAYLISTS);
    if (cached) return { data: cached, fromCache: true };

    if (!API_KEY || !CHANNEL_ID) return { data: [], error: "Missing Credentials" };

    try {
        const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails,id&channelId=${CHANNEL_ID}&maxResults=50&key=${API_KEY}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch playlists");

        const data = await res.json();
        const playlists = (data.items || []).map(item => ({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
            itemCount: item.contentDetails?.itemCount || 0
        }));

        saveToCache(CACHE_KEY, playlists);
        return { data: playlists, fromCache: false };

    } catch (error) {
        console.error("Manifest Fetch Error:", error);
        return { data: [], error: error.message };
    }
}

/**
 * Step 2: Fetch videos for a specific playlist (Pagination Support)
 * Costs: 1 API Unit per 50 videos
 */
export async function fetchPlaylistVideos(playlistId, pageToken = "") {
    if (!playlistId) return { data: [], error: "No Playlist ID" };

    // Cache Key includes pageToken to cache specific pages, OR we cache the "growing list".
    // Better strategy for "Load More": Cache the *pages* or cache the *accumulated list*.
    // User requirement: "Cache should store items[], nextPageToken".
    // Simplest approach: Cache is Keyed by Playlist. Object contains { videos: [], nextPageToken: "..." }
    const CACHE_KEY = `${CACHE_PREFIX}playlist_${playlistId}`;

    // 1. Try Cache (Only if fetching initial page, otherwise we trust caller to manage state or we append)
    // Actually, if we want to "resume" we need to know what we have.
    // Let's implement a "Smart Cache" that returns what we have.
    const cached = getFromCache(CACHE_KEY, TTL_VIDEOS);

    // If we request empty pageToken (initial load), and cache exists, return it.
    if (!pageToken && cached) {
        return {
            data: cached.videos,
            nextPageToken: cached.nextPageToken,
            fromCache: true
        };
    }

    // If we are loading more, we usually bypass cache or check if cache has *more* data than we have (unlikely if strictly linear).
    // So for "Load More", we hit API.

    try {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50&key=${API_KEY}&pageToken=${pageToken}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Failed to fetch items for ${playlistId}`);

        const data = await res.json();
        const newVideos = (data.items || []).map(item => normalizeVideo(item, null)); // Normalizer will default titles, we inject context later if needed or rely on parsing

        const nextToken = data.nextPageToken || null;

        // Fetch Durations for new video batch
        const enrichedVideos = await fetchVideoDurations(newVideos);

        // Update Cache: Merge new videos with existing cache if we are paginating
        let allVideos = enrichedVideos;

        if (cached && pageToken) {
            // If we are appending, we take cached videos and append new ones. 
            // Deduplication happens here.
            allVideos = mergeVideoLists(cached.videos, enrichedVideos);
        }

        // Save updated list to cache
        // We only save to cache if we successfully fetched. 
        // NOTE: If we are deep paginating, this object gets large. 
        // For Titanium architecture, this is acceptable for exam playlists (usually < 50 items, max 200).
        saveToCache(CACHE_KEY, { videos: allVideos, nextPageToken: nextToken });

        return {
            data: newVideos, // Return only the *new* videos for the caller to append, OR return all? 
            // Caller expects "videos for this page" usually, but our cache stores ALL.
            // Let's return the *accumulated* list from cache if that's the contract, 
            // OR return just new ones.
            // Requirement: "Fetch nextPageToken as needed".
            // Let's return just the NEW data + token, and let UI append.
            // BUT UI also needs to know if it should replace (initial load).
            nextPageToken: nextToken,
            fromCache: false
        };

    } catch (error) {
        console.error(`Playlist ${playlistId} Fetch Error:`, error);

        // Fallback: Try stale cache if initial load
        if (!pageToken) {
            const stale = getFromCache(CACHE_KEY, Infinity);
            if (stale) return {
                data: stale.videos,
                nextPageToken: stale.nextPageToken,
                error: error.message,
                isStale: true
            };
        }

        return { data: [], error: error.message };
    }
}

/**
 * Merge two video lists, deduplicating by videoId.
 * Updates examTitles array if same video exists in both.
 */
export function mergeVideoLists(existing, incoming) {
    const map = new Map();

    // Index existing
    existing.forEach(v => map.set(v.videoId, v));

    // Merge incoming
    incoming.forEach(v => {
        if (map.has(v.videoId)) {
            const existingVideo = map.get(v.videoId);
            // Merge arrays
            const combinedTitles = Array.from(new Set([...existingVideo.examTitles, ...v.examTitles]));
            existingVideo.examTitles = combinedTitles;

            // Keep existing primary title if set, or override? 
            // Usually keep existing unless generic.
        } else {
            map.set(v.videoId, v);
        }
    });

    return Array.from(map.values());
}

/**
 * Step 3: Fetch Latest Videos (for Home Page)
 * Uses the "Uploads" playlist of the channel.
 * Channel ID: UC... -> Uploads ID: UU...
 */
export async function fetchLatestVideos() {
    const CACHE_KEY = `${CACHE_PREFIX}latest`;

    const cached = getFromCache(CACHE_KEY, TTL_LATEST);
    if (cached) return { data: cached, fromCache: true };

    if (!API_KEY || !CHANNEL_ID) return { data: normalizeList(fallbackVideos).slice(0, 6), isFallback: true };

    const uploadsId = CHANNEL_ID.replace(/^UC/, 'UU'); // Convert Channel ID to Uploads Playlist ID

    try {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsId}&maxResults=10&key=${API_KEY}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch latest videos");

        const data = await res.json();
        const videos = (data.items || []).map(item => normalizeVideo(item, "Latest"));

        // Fetch Durations
        const enrichedVideos = await fetchVideoDurations(videos);

        saveToCache(CACHE_KEY, enrichedVideos);
        return { data: enrichedVideos, fromCache: false };

    } catch (error) {
        // Fallback to local data if API fails
        return { data: normalizeList(fallbackVideos).slice(0, 6), error: error.message, isFallback: true };
    }
}

// --- Internal Helpers ---

function getFromCache(key, ttl) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
        const { data, timestamp } = JSON.parse(raw);
        if (Date.now() - timestamp > ttl) return null;
        return data;
    } catch {
        return null;
    }
}

function saveToCache(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (e) {
        console.warn("Storage Full or Error", e);
    }
}

function normalizeList(list) {
    return list.map(v => ({
        ...v,
        titleRaw: v.examTitle + " " + v.questionNumber,
        source: "fallback",
        primaryExamTitle: v.examTitle,
        examTitles: [v.examTitle],
        contentType: "exam"
    }));
}

/**
 * Fetch Video Durations (Batch)
 * Step 2.5: Enrich video objects with duration from contentDetails
 * Costs: 1 API Unit per 50 videos
 */
async function fetchVideoDurations(videos) {
    if (!videos.length || !API_KEY) return videos;

    const uncachedVideos = videos.filter(v => !v.durationLabel);
    if (!uncachedVideos.length) return videos; // All cached

    // Chunk into batches of 50
    const batches = [];
    for (let i = 0; i < uncachedVideos.length; i += 50) {
        batches.push(uncachedVideos.slice(i, i + 50));
    }

    const videoMap = new Map(videos.map(v => [v.videoId, v]));

    try {
        await Promise.all(batches.map(async (batch) => {
            const ids = batch.map(v => v.videoId).join(",");
            const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();

            (data.items || []).forEach(item => {
                const durationIso = item.contentDetails.duration;
                const durationLabel = parseDuration(durationIso);
                const vid = videoMap.get(item.id);
                if (vid) {
                    vid.durationLabel = durationLabel;
                    // We can also store seconds if needed for sorting: vid.durationSeconds = ...
                }
            });
        }));
    } catch (e) {
        console.error("Failed to fetch durations", e);
    }

    return Array.from(videoMap.values());
}

function parseDuration(isoDuration) {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "";

    const hours = (match[1] || "").replace("H", "");
    const minutes = (match[2] || "").replace("M", "");
    const seconds = (match[3] || "").replace("S", "");

    let label = "";
    if (hours) label += `${hours}:`;
    label += `${hours ? minutes.padStart(2, '0') : minutes || '0'}:`;
    label += seconds.padStart(2, '0');

    return label;
}
