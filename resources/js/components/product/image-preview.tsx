import { cn } from "@/lib/utils";

export function ImageGallery({
    mainImage,
    thumbnails,
    alt,
    onThumbClick,
}: {
    mainImage: string;
    thumbnails: string[];
    alt: string;
    onThumbClick: (src: string) => void;
}) {
    return (
        <div className="space-y-5">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-[#0f0f0f] shadow-2xl">
                <img
                    src={mainImage}
                    alt={alt}
                    className="h-full w-full object-contain p-8 transition-transform duration-700 hover:scale-105 md:p-12"
                    loading="eager"
                />
            </div>

            {thumbnails.length > 1 && (
                <div className="scrollbar-thin scrollbar-thumb-white/10 flex gap-3 overflow-x-auto pb-2">
                    {thumbnails.map((src, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => onThumbClick(src)}
                            className={cn(
                                'h-20 w-20 flex-shrink-0 rounded-xl border-2 bg-[#121212] p-2 transition-all',
                                mainImage === src
                                    ? 'border-primary shadow-[0_0_15px_rgba(var(--primary),0.4)]'
                                    : 'border-transparent opacity-60 hover:opacity-90',
                            )}
                        >
                            <img
                                src={src}
                                alt={`${alt} preview ${idx + 1}`}
                                className="h-full w-full object-contain"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}