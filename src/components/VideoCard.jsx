import { Play, Calendar, FileText, ArrowRight, Clock } from "lucide-react";
import { Badge } from "./ui/Badge";
import { getThumbnail } from "../data/videos";
import { useToast } from "./ui/Toast";
import { useAudienceActions } from "../lib/audience";

export function VideoCard({ video }) {
    const { toast } = useToast();
    const { recordWatched } = useAudienceActions();

    const url = video.youtubeUrl;
    const videoId = video.videoId || video.id;
    const isUnavailable = !videoId || !url || url.includes("undefined");

    const handleClick = (e) => {
        if (isUnavailable) {
            e.preventDefault();
            toast.error({
                title: "שגיאה בניגון הסרטון",
                description: "הסרטון אינו זמין כרגע או שהקישור שבור."
            });
            return;
        }
        recordWatched({
            videoId,
            title: video.title,
            topic: video.topic,
            examTitle: video.examTitle,
        });
    };

    const accessibleLabel = `שאלה ${video.questionNumber} — ${video.topic} (פתיחה ביוטיוב בלשונית חדשה)`;

    return (
        <a
            href={isUnavailable ? "#" : url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            aria-label={accessibleLabel}
            aria-disabled={isUnavailable || undefined}
            className="group surface-warm card-ambient bloom-blue rounded-2xl flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:hover:translate-y-0 motion-reduce:transition-none"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden card-content-layer">
                <img
                    src={video.thumbnailUrl || getThumbnail(video.youtubeUrl)}
                    alt={video.examTitle ? `תמונה ממוזערת — ${video.examTitle}` : "תמונה ממוזערת של הסרטון"}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />

                {/* Duration Badge (Premium Pill) */}
                {video.durationLabel && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-lg">
                        <Clock className="w-3 h-3 text-gray-300" aria-hidden="true" />
                        <span className="sr-only">משך:</span>
                        {video.durationLabel}
                    </div>
                )}

                {/* Play Button Overlay */}
                <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:transition-none">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 motion-reduce:scale-100 transition-transform duration-500 motion-reduce:transition-none">
                        <Play className="h-6 w-6 text-white fill-current ml-1" />
                    </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Badge variant="secondary" className="shadow-lg backdrop-blur-md bg-black/60 border-white/10 text-white font-medium">
                        {video.topic}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6 relative card-content-layer">
                <div className="mb-4 flex items-center gap-3 text-xs font-medium text-ink-muted">
                    <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        {new Date(video.publishedAt || video.date).toLocaleDateString("he-IL")}
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5">
                        <FileText className="h-3 w-3" aria-hidden="true" />
                        {video.examTitle}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-ink group-hover:text-white transition-colors line-clamp-2 mb-3 leading-snug">
                    שאלה {video.questionNumber}: {video.topic}
                </h3>

                <p className="text-sm text-ink-dim line-clamp-2 leading-relaxed">
                    פתרון מלא ומוסבר לשאלה {video.questionNumber} מתוך {video.examTitle}. כולל הסברים מפורטים ודגשים חשובים.
                </p>

                <div className="mt-auto pt-6 flex items-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none">
                    צפה בפתרון <ArrowRight className="h-4 w-4 mr-2 rotate-180 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
                </div>
            </div>
        </a>
    );
}
