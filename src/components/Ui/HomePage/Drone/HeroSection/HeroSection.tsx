import Image from "next/image";
import Link from "next/link";
import { Camera, Gauge, Play, Radio, Timer } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";
import { DRONE_IMAGES } from "@/src/constants/droneImages";

const STATS = [
  { icon: Gauge, value: "65 KM/H", label: "Max Speed" },
  { icon: Timer, value: "30 MIN", label: "Flight Time" },
  { icon: Radio, value: "10 KM", label: "Transmission" },
  { icon: Camera, value: "4K ULTRA HD", label: "Stabilized Camera" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div className="relative flex min-h-[560px] items-center sm:min-h-[640px] lg:min-h-[720px]">
        <Image
          src={DRONE_IMAGES.heroFlightWater}
          alt="AeroX Max Pro drone in flight over open water"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/60 to-ink-900/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />

        <div className="container relative py-24">
          <SlideRight delay={1} className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
              AeroX Max Pro
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Engineered for What&apos;s Next
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
              Meet AeroX Max Pro — a new era of aerial intelligence. Capture
              more. See farther. Do beyond.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Preorder Now
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2.5 text-sm font-semibold text-white transition hover:text-orange-400"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30">
                  <Play size={14} fill="currentColor" />
                </span>
                Watch Video
              </Link>
            </div>
          </SlideRight>
        </div>
      </div>

      {/* STAT STRIP */}
      <SlideUp delay={1}>
        <div className="border-t border-white/10 bg-ink-950">
          <div className="container grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-6 sm:justify-center"
              >
                <Icon size={20} className="shrink-0 text-orange-500" />
                <div className="leading-tight">
                  <p className="text-sm font-bold text-white sm:text-base">
                    {value}
                  </p>
                  <p className="text-[11px] uppercase tracking-wide text-white/50">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideUp>
    </section>
  );
};

export default HeroSection;
