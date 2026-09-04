import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import { DRONE_IMAGES } from "@/src/constants/droneImages";
import type { ApiResponse } from "@/src/types/axios";
import type { CaptureCardItem } from "@/src/types/captureCardType";

const FALLBACK_CARDS: CaptureCardItem[] = [
  {
    id: "fallback-1",
    title: "4K Ultra HD Camera",
    description: "Crisp, detailed visuals in every frame.",
    image: DRONE_IMAGES.lensMacro,
    button_link: "/features",
    position: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-2",
    title: "3-Axis Gimbal",
    description: "Smooth shots. Always stable.",
    image: DRONE_IMAGES.gimbalCloseup,
    button_link: "/features",
    position: 2,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-3",
    title: "Night Mode",
    description: "Low-light performance like never before.",
    image: DRONE_IMAGES.auroraNightSky,
    button_link: "/features",
    position: 3,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

async function getActiveCaptureCards(): Promise<CaptureCardItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/capture-cards/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: ApiResponse<CaptureCardItem[]> = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

const CaptureSection = async () => {
  const fetched = await getActiveCaptureCards();
  const cards = fetched.length ? fetched : FALLBACK_CARDS;

  return (
    <section className="bg-ink-950 py-16 md:py-24">
      <div className="container">
        <SlideUp delay={1} className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
            Capture Without Limits
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            See Everything. Capture Anything.
          </h2>
        </SlideUp>

        <div className="grid gap-6 sm:grid-cols-3">
          {cards.map((card, i) => (
            <ZoomIn key={card.id} className={i === 1 ? "sm:-mt-6" : ""}>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  {card.description && (
                    <p className="mt-1 text-sm text-white/60">{card.description}</p>
                  )}
                  <Link
                    href={card.button_link || "/features"}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 transition group-hover:gap-2.5"
                  >
                    Learn More
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </ZoomIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaptureSection;
