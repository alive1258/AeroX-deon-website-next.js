import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SlideLeft from "@/src/components/Common/Animaation/SlideLeft";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";
import { DRONE_IMAGES } from "@/src/constants/droneImages";
import type { ApiResponse } from "@/src/types/axios";
import type { DurabilityItem, DurabilitySpec } from "@/src/types/durabilityType";

const FALLBACK_SPECS: DurabilitySpec[] = [
  { value: "1.2 kg", label: "Lightweight" },
  { value: "30 min", label: "Max Flight Time" },
  { value: "IPX5", label: "Weather Resistant" },
];

async function getActiveDurability(): Promise<DurabilityItem | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/durability/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return null;

    const body: ApiResponse<DurabilityItem> = await res.json();
    return body.data ?? null;
  } catch {
    return null;
  }
}

const DurabilitySection = async () => {
  const durability = await getActiveDurability();

  const title = durability?.title || "Made to Move.\nBuilt to Last.";
  const description =
    durability?.description ||
    "Foldable design. Aerospace-grade materials. Ready for every adventure.";
  const image = durability?.image || DRONE_IMAGES.droneGreenBlur;
  const specs = durability?.specs?.length ? durability.specs : FALLBACK_SPECS;
  const buttonText = durability?.button_text || "View Specifications";
  const buttonLink = durability?.button_link || "/features";

  return (
    <section className="bg-ink-900 py-16 md:py-24">
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <SlideRight delay={1} className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl bg-white/5">
            <Image
              src={image}
              alt="AeroX Max Pro folded into its compact travel form"
              fill
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover"
            />
          </div>
        </SlideRight>

        <SlideLeft delay={1} className="order-1 lg:order-2">
          <h2 className="whitespace-pre-line text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-8">
            {specs.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-extrabold text-white">
                  {value}
                </p>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href={buttonLink}
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            {buttonText}
            <ArrowRight size={15} />
          </Link>
        </SlideLeft>
      </div>
    </section>
  );
};

export default DurabilitySection;
