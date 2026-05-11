import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Film, RefreshCcw, Sparkles } from "lucide-react";
import { FiltersBar } from "../components/FiltersBar";
import { VideoCard } from "../components/VideoCard";
import { VideoSkeleton } from "../components/VideoSkeleton";
import { Button } from "../components/ui/Button";
import { fetchPlaylistVideos, fetchPlaylistsManifest } from "../lib/youtubeService";
import { sortExams } from "../lib/examsSort";
import { PageMeta } from "../components/PageMeta";

export function Videos() {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    const routerLocation = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFallback, setIsFallback] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedExam, setSelectedExam] = useState(null);
    const [sortBy, setSortBy] = useState("newest");

    // State for pagination
    const [nextPageToken, setNextPageToken] = useState(null);
    const [currentPid, setCurrentPid] = useState(null);

    // Fetch Data
    const loadVideos = async (pageToken = "") => {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams(routerLocation.search);
        const pid = params.get("pid");
        const examTitle = params.get("exam");

        // Reset if switching playlists (no pageToken provided implies clean load)
        const isInitial = !pageToken;
        if (isInitial) {
            setVideos([]);
            setCurrentPid(pid);
        }

        let resultData = [];
        let resultError = null;
        let isResultFallback = false;
        let nextToken = null;

        // Strategy A: We have a Playlist ID
        if (pid) {
            const { data, nextPageToken: token, error, isFallback } = await fetchPlaylistVideos(pid, pageToken);
            resultData = data;
            nextToken = token;
            resultError = error;
            setIsFallback(!!isFallback);

            // Inject Title Context if needed
            if (examTitle && resultData.length > 0) {
                resultData = resultData.map(v => {
                    // Ensure primary is correct for display
                    if (!v.primaryExamTitle || v.primaryExamTitle === "סרטון כללי") {
                        v.primaryExamTitle = examTitle;
                    }
                    return v;
                });
            }
        }
        // Strategy B & C (Legacy/No Params) - Keep existing simple logic or minimal fallback
        // ... (Omitting complex legacy pagination for now to keep it safe, assuming Step 1 logic covers simple cases)
        else if (examTitle) {
            // Legacy
            const { data: playlists } = await fetchPlaylistsManifest();
            const playlist = playlists.find(p => p.title === examTitle);
            if (playlist) {
                // Redirect to PID URL to use proper logic?
                // For now, just fetch.
                const { data, nextPageToken: token, error, isFallback } = await fetchPlaylistVideos(playlist.id, pageToken);
                resultData = data;
                nextToken = token;
                resultError = error;
                setIsFallback(!!isFallback);
                resultData = resultData.map(v => ({ ...v, primaryExamTitle: v.primaryExamTitle || examTitle }));
            }
        }

        // Update State
        if (resultData) {
            setVideos(prev => isInitial ? resultData : [...prev, ...resultData]);
            setNextPageToken(nextToken);
        }
        if (resultError) setError(resultError);

        setLoading(false);
    };

    useEffect(() => {
        loadVideos(); // Initial load (pageToken = "")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routerLocation.search]); // Reload when URL params change

    // Parse query params for pre-filtering UI state
    useEffect(() => {
        const params = new URLSearchParams(routerLocation.search);
        const examParam = params.get("exam");

        if (examParam) {
            setSelectedExam(examParam);
        }
    }, [routerLocation.search]);

    // Extract unique exams (Playlists)
    const exams = useMemo(() => {
        return sortExams(Array.from(new Set(videos.map(v => v.primaryExamTitle).filter(Boolean))));
    }, [videos]);

    // Extract unique topics
    const topics = useMemo(() => {
        return Array.from(new Set(videos.map(v => v.topic).filter(Boolean))).sort();
    }, [videos]);

    // Filter and Sort Logic
    const filteredVideos = useMemo(() => {
        return videos
            .filter(video => {
                const searchLower = searchTerm.toLowerCase();
                const matchesSearch =
                    (video.primaryExamTitle?.toLowerCase() || "").includes(searchLower) ||
                    (video.topic?.toLowerCase() || "").includes(searchLower) ||
                    (video.questionNumber?.toString() || "").includes(searchLower);

                const matchesTopic = selectedTopic ? video.topic === selectedTopic : true;
                const matchesExam = selectedExam ? video.primaryExamTitle === selectedExam : true;

                return matchesSearch && matchesTopic && matchesExam;
            })
            .sort((a, b) => {
                const dateA = new Date(a.publishedAt);
                const dateB = new Date(b.publishedAt);
                return sortBy === "newest" ? dateB - dateA : dateA - dateB;
            });
    }, [videos, searchTerm, selectedTopic, selectedExam, sortBy]);

    const handleReset = () => {
        setSearchTerm("");
        setSelectedTopic(null);
        setSelectedExam(null);
        setSortBy("newest");
    };

    return (
        <div className="py-24 min-h-screen relative overflow-hidden">
            <PageMeta
                title={selectedExam ? `פתרונות — ${selectedExam}` : "מאגר הפתרונות"}
                description="כל סרטוני הפתרונות לשאלות מבחני מה״ט. חיפוש, סינון לפי נושא, וצפייה ישירה ביוטיוב."
                path="/videos"
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "מוסד הלמידה", path: "/content" },
                    { name: "MAT Systems", path: "/exams" },
                    { name: selectedExam || "מאגר סרטונים", path: "/videos" },
                ]}
            />
            {/* Background Mesh */}
            <div className="absolute inset-0 bg-background">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Sparkles className="h-5 w-5" />
                            </span>
                            <span className="text-primary font-bold tracking-wide uppercase text-sm">הספרייה</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-snug">
                            מאגר <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">הפתרונות</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/exams">
                            <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5 backdrop-blur-sm">
                                <ArrowRight className="h-4 w-4 rotate-180" />
                                חזרה לקטלוג
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* API Error / Fallback Notice */}
                {isFallback && !loading && (
                    <div className="mb-8 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-orange-200 text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                            <span className="font-bold">שים לב:</span>
                            מציג נתונים לדוגמה (חיבור ליוטיוב לא זמין).
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={loadVideos}
                        >
                            <RefreshCcw className="h-3 w-3 ml-2" />
                            נסה שוב
                        </Button>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-surface/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 mb-12 shadow-2xl">
                    <FiltersBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedTopic={selectedTopic}
                        setSelectedTopic={setSelectedTopic}
                        topics={topics}
                        selectedExam={selectedExam}
                        setSelectedExam={(value) => {
                            if (!value) {
                                navigate("/exams");
                            } else {
                                setSelectedExam(value);
                            }
                        }}
                        exams={exams}
                        videos={videos} // Pass videos for autocomplete
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                </div>

                {/* Selected Exam Title (Dynamic Location) */}
                {selectedExam && (
                    <div className="mb-8 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="h-px bg-primary/50 flex-1 md:flex-none md:w-12"></span>
                            <span className="text-primary/80 uppercase text-xs font-bold tracking-widest">מבחן נבחר</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-snug">
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">{selectedExam}</span>
                        </h2>
                        <p className="text-gray-400 mt-2 text-lg">
                            צפו בכל הפתרונות המלאים עבור מבחן זה
                        </p>
                    </div>
                )}

                {/* Results Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <VideoSkeleton key={n} />
                        ))}
                    </div>
                ) : filteredVideos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}

                        {/* Load More Trigger */}
                        {nextPageToken && !searchTerm && (
                            <div className="col-span-full flex justify-center py-8">
                                <Button
                                    onClick={() => loadVideos(nextPageToken)}
                                    isLoading={loading}
                                    variant="outline"
                                    className="border-white/10 hover:bg-white/5"
                                >
                                    טען עוד סרטונים
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-32 bg-surface/20 rounded-[2rem] border border-white/5 border-dashed">
                        <div className="h-20 w-20 bg-surface/50 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/10">
                            <Film className="h-10 w-10 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">לא נמצאו תוצאות</h3>
                        <p className="text-gray-400 mb-8 max-w-sm text-center text-lg">
                            נסו לשנות את מילות החיפוש או לאפס את הסינונים כדי לראות תוצאות.
                        </p>
                        <Button onClick={handleReset} variant="outline" size="lg" className="border-white/10 hover:bg-white/5">
                            <RefreshCcw className="h-4 w-4 ml-2" />
                            איפוס סינונים
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

