export function VideoSkeleton() {
    return (
        <div className="flex flex-col rounded-xl bg-surface border border-white/5 shadow-sm overflow-hidden h-full">
            {/* Thumbnail Skeleton */}
            <div className="relative aspect-video w-full bg-white/5 animate-pulse" />

            {/* Content Skeleton */}
            <div className="p-5 flex flex-col flex-1 gap-4">
                <div className="flex justify-between items-center">
                    <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
                </div>

                <div className="h-6 w-3/4 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />

                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                    <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                    <div className="h-8 w-24 bg-white/5 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}
