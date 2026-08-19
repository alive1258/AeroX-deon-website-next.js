import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import { DRONE_IMAGES } from "@/src/constants/droneImages";

const GimbalBannerSection = () => {
  return (
    <section className="bg-ink-950 pb-16 md:pb-24">
      <div className="container">
        <ZoomIn>
          <div className="grid overflow-hidden rounded-3xl bg-ink-900 sm:grid-cols-2">
            <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                Precision Engineering
              </span>
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Stabilized.
                <br />
                Precise.
                <br />
                Professional.
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-white/60">
                Advanced gimbal + EIS ensure buttery smooth footage, every
                time.
              </p>
              <Link
                href="/features"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-orange-400 transition hover:gap-3"
              >
                Learn More
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="relative min-h-[280px]">
              <Image
                src={DRONE_IMAGES.gimbalCloseup}
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
