import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import { DRONE_IMAGES } from "@/src/constants/droneImages";
import type { ApiResponse } from "@/src/types/axios";
import type { GimbalBannerItem } from "@/src/types/gimbalBannerType";

async function getActiveGimbalBanner(): Promise<GimbalBannerItem | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/gimbal-banner/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return null;

    const body: ApiResponse<GimbalBannerItem> = await res.json();
    return body.data ?? null;
  } catch {
    return null;
  }
}

const GimbalBannerSection = async () => {
  const banner = await getActiveGimbalBanner();

  const eyebrow = banner?.eyebrow || "Precision Engineering";
  const title = banner?.title || "Stabilized.\nPrecise.\nProfessional.";
  const description =
    banner?.description ||
    "Advanced gimbal + EIS ensure buttery smooth footage, every time.";
  const buttonText = banner?.button_text || "Learn More";
  const buttonLink = banner?.button_link || "/features";
  const image = banner?.image || DRONE_IMAGES.gimbalCloseup;

  return (
    <section className="bg-ink-950 pb-16 md:pb-24">
      <div className="container">
        <ZoomIn>
          <div className="grid overflow-hidden rounded-3xl bg-ink-900 sm:grid-cols-2">
            <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                {eyebrow}
              </span>
              <h2 className="whitespace-pre-line text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                {title}
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-white/60">
                {description}
              </p>
              <Link
                href={buttonLink}
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-orange-400 transition hover:gap-3"
              >
                {buttonText}
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="relative min-h-[280px]">
              <Image
                src={image}
                alt="AeroX Max Pro 3-axis gimbal and camera close-up"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </ZoomIn>
      </div>
    </section>
  );
};

export default GimbalBannerSection;
