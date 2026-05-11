import { useState, useRef, useEffect } from "react";
import { Search, X, SlidersHorizontal, ArrowUpDown, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

export function FiltersBar({
    searchTerm,
    setSearchTerm,
    selectedTopic,
    setSelectedTopic,
    topics,
    selectedExam,
    setSelectedExam,
    exams,
    videos = [], // Default to empty array
    sortBy,
    setSortBy
}) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    // Close suggestions on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    // Generate suggestions based on searchTerm
    const suggestions = searchTerm.length > 1 ? videos
        .filter(v => {
            const lowerTerm = searchTerm.toLowerCase();
            return (v.title?.toLowerCase().includes(lowerTerm) ||
                v.questionNumber?.toString().includes(lowerTerm));
        })
        .slice(0, 5) // Limit to 5
        .map(v => ({
            id: v.id,
            text: `שאלה ${v.questionNumber}: ${v.title}`,
            cleanTerm: `${v.questionNumber}` // Or title, depending on what we want to fill
        })) : [];

    return (
        <div className="flex flex-col gap-8 w-full">

            {/* Top Bar: Controls */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">

                {/* Left Side: Search & Exam Select */}
                <div className="flex flex-col md:flex-row gap-4 flex-1">

                    {/* Search Input */}
                    <div className="relative w-full md:max-w-md group" ref={wrapperRef}>
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <Search className="h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            placeholder="חפש נושא, שאלה או מבחן..."
                            className="w-full bg-black/20 border border-white/10 rounded-2xl py-3.5 pr-12 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:bg-black/40 focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute top-1/2 left-4 -translate-y-1/2 p-1 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}

                        {/* Autocomplete Suggestions */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1b26] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                                {suggestions.map((suggestion) => (
                                    <button
                                        key={suggestion.id}
                                        onClick={() => {
                                            setSearchTerm(suggestion.text); // Populate with full text or just query? using text for now
                                            setShowSuggestions(false);
                                        }}
                                        className="w-full text-right px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0 flex items-center justify-between group/item"
                                    >
                                        <span>{suggestion.text}</span>
                                        <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-primary" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Exam Filter (Select) */}
                    <div className="w-full md:w-72 relative">
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ArrowUpDown className="h-4 w-4" />
                        </div>
                        <select
                            value={selectedExam || ""}
                            onChange={(e) => setSelectedExam(e.target.value || null)}
                            className="w-full h-full bg-black/20 border border-white/10 rounded-2xl py-3.5 pr-11 pl-4 text-white focus:outline-none focus:border-primary/50 focus:bg-black/40 focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
                        >
                            <option value="" className="bg-surface text-gray-400">כל המבחנים</option>
                            {exams.map(exam => (
                                <option key={exam} value={exam} className="bg-surface">
                                    {exam}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Right Side: Sort Toggle */}
                <div className="flex items-center self-end md:self-auto bg-black/20 border border-white/10 rounded-2xl p-1.5">
                    <button
                        onClick={() => setSortBy("newest")}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                            sortBy === "newest"
                                ? "bg-white/10 text-white shadow-sm"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        חדש ביותר
                    </button>
                    <button
                        onClick={() => setSortBy("oldest")}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                            sortBy === "oldest"
                                ? "bg-white/10 text-white shadow-sm"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        ישן ביותר
                    </button>
                </div>
            </div>

            {/* Topics Filter (Chips) */}
            <div>
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>סינון לפי נושאים:</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedTopic(null)}
                        className={cn(
                            "px-5 py-2 rounded-full text-sm font-medium transition-all border",
                            !selectedTopic
                                ? "bg-primary/20 text-primary border-primary/30 shadow-lg shadow-primary/10"
                                : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white hover:bg-white/10"
                        )}
                    >
                        הכל
                    </button>

                    {topics.map(topic => (
                        <button
                            key={topic}
                            onClick={() => setSelectedTopic(topic === selectedTopic ? null : topic)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-medium transition-all border",
                                topic === selectedTopic
                                    ? "bg-primary/20 text-primary border-primary/30 shadow-lg shadow-primary/10"
                                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white hover:bg-white/10"
                            )}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
