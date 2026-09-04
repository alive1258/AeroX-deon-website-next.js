import Image from "next/image";
import { Play } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { DRONE_IMAGES } from "@/src/constants/droneImages";
import type { ApiResponse } from "@/src/types/axios";
import type { VideoShowcaseItem } from "@/src/types/videoShowcaseType";

const FALLBACK_THUMBNAILS = [
  DRONE_IMAGES.heroFlightForest,
  DRONE_IMAGES.heroFlightWater,
  DRONE_IMAGES.droneGreenBlur,
  DRONE_IMAGES.pilotWheatField,
  DRONE_IMAGES.droneStudioPale,
];

async function getActiveVideoShowcase(): Promise<VideoShowcaseItem | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/video-showcase/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return null;

    const body: ApiResponse<VideoShowcaseItem> = await res.json();
    return body.data ?? null;
  } catch {
    return null;
  }
}

const VideoShowcaseSection = async () => {
  const videoShowcase = await getActiveVideoShowcase();

  const eyebrow = videoShowcase?.eyebrow || "Real Flight, Real Footage";
  const title = videoShowcase?.title || "Shot on AeroX Max Pro";
  const posterImage = videoShowcase?.image || DRONE_IMAGES.aerialTuscanySunset;
  const thumbnails = videoShowcase?.thumbnails?.length
    ? videoShowcase.thumbnails
    : FALLBACK_THUMBNAILS;

  return (
    <section className="bg-ink-950 py-16 md:py-24">
      <div className="container">
        <SlideUp delay={1} className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            {title}
          </h2>
        </SlideUp>

        <SlideUp delay={2}>
          <button
            type="button"
            aria-label="Play showcase reel"
            className="group relative block aspect-video w-full overflow-hidden rounded-2xl"
          >
            <Image
              src={posterImage}
              alt={`Aerial footage shot on ${title}`}
              fill
              sizes="100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink-950/25 transition group-hover:bg-ink-950/35" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-orange-600 shadow-xl transition group-hover:scale-110 sm:h-20 sm:w-20">
                <Play size={26} fill="currentColor" />
              </span>
            </span>
          </button>

          <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {thumbnails.map((src, i) => (
              <div
                key={src}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-32 ${
                  i === 0 ? "ring-2 ring-orange-500" : "opacity-60"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </SlideUp>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;
