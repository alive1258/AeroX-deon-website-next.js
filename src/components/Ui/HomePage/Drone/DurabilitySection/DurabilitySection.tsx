import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SlideLeft from "@/src/components/Common/Animaation/SlideLeft";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";
import { DRONE_IMAGES } from "@/src/constants/droneImages";

const SPECS = [
  { value: "1.2 kg", label: "Lightweight" },
  { value: "30 min", label: "Max Flight Time" },
  { value: "IPX5", label: "Weather Resistant" },
];

const DurabilitySection = () => {
  return (
    <section className="bg-ink-900 py-16 md:py-24">
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <SlideRight delay={1} className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl bg-white/5">
            <Image
              src={DRONE_IMAGES.droneGreenBlur}
              alt="AeroX Max Pro folded into its compact travel form"
              fill
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover"
            />
          </div>
        </SlideRight>

        <SlideLeft delay={1} className="order-1 lg:order-2">
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Made to Move.
            <br />
            Built to Last.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            Foldable design. Aerospace-grade materials. Ready for every
            adventure.
          </p>

          <div className="mt-8 flex flex-wrap gap-8">
            {SPECS.map(({ value, label }) => (
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
            href="/features"
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            View Specifications
            <ArrowRight size={15} />
          </Link>
        </SlideLeft>
      </div>
    </section>
  );
};

export default DurabilitySection;
