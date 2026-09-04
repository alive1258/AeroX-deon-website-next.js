import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import { DRONE_IMAGES } from "@/src/constants/droneImages";
import type { ApiResponse } from "@/src/types/axios";
import type { AccessoriesBannerItem } from "@/src/types/accessoriesBannerType";

async function getActiveAccessoriesBanner(): Promise<AccessoriesBannerItem | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accessories-banner/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return null;

    const body: ApiResponse<AccessoriesBannerItem> = await res.json();
    return body.data ?? null;
  } catch {
    return null;
  }
}

const AccessoriesSection = async () => {
  const banner = await getActiveAccessoriesBanner();

  const eyebrow = banner?.eyebrow || "Upgrade Your View";
  const title = banner?.title || "Accessories That Elevate Every Flight";
  const buttonText = banner?.button_text || "Shop Accessories";
  const buttonLink = banner?.button_link || "/shop";
  const image = banner?.image || DRONE_IMAGES.gearFlatlayBackpack;

  return (
    <section className="bg-ink-950 pb-16 md:pb-24">
      <div className="container">
        <ZoomIn>
          <div className="relative overflow-hidden rounded-3xl">
            <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
              <Image
                src={image}
                alt={title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/60 to-transparent" />
            </div>

            <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-center gap-4 p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                {eyebrow}
              </span>
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                {title}
              </h2>
              <Link
                href={buttonLink}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                {buttonText}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </ZoomIn>
      </div>
    </section>
  );
};

export default AccessoriesSection;
