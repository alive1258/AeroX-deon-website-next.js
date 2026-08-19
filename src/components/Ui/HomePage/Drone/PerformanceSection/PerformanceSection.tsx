import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BatteryCharging, MapPin, ShieldCheck } from "lucide-react";
import SlideLeft from "@/src/components/Common/Animaation/SlideLeft";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";
import { DRONE_IMAGES, TESTIMONIAL_AVATARS } from "@/src/constants/droneImages";

const FEATURES = [
  {
    icon: MapPin,
    title: "GPS Assisted Flight",
    description: "Stay locked. Fly with confidence.",
  },
  {
    icon: ShieldCheck,
    title: "Smart Obstacle Avoidance",
    description: "Detects and avoids in real-time.",
  },
  {
    icon: BatteryCharging,
    title: "Modular Battery System",
    description: "Power that goes the distance.",
  },
];

const PerformanceSection = () => {
  return (
    <section className="bg-ink-900 py-16 md:py-24">
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <SlideRight delay={1}>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
            Next-Gen Aerial System
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Built for Performance. Designed for Explorers.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            AeroX Max Pro delivers best-in-class stability, intelligent flight
            modes, and pro-grade imaging in a rugged, portable design.
          </p>

          <ul className="mt-8 space-y-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-orange-500">
                  <Icon size={19} />
                </span>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-0.5 text-sm text-white/50">{description}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/features"
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Explore Features
            <ArrowRight size={15} />
          </Link>
        </SlideRight>

        <SlideLeft delay={1} className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src={DRONE_IMAGES.droneStudioPale}
              alt="AeroX Max Pro drone in stable flight against an open sky"
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
            />
          </div>

          <div className="absolute right-5 top-5 flex items-center gap-2 rounded-2xl bg-ink-950/90 px-4 py-3 backdrop-blur">
            <span className="text-lg font-extrabold text-white">4.9/5</span>
            <span className="text-[11px] leading-tight text-white/60">
              from verified
              <br />
              pilots
            </span>
          </div>

          <div className="absolute -bottom-6 left-1/2 flex w-[calc(100%-2.5rem)] -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/10 bg-ink-950 px-5 py-4 shadow-xl">
            <div className="flex -space-x-3">
              {Object.values(TESTIMONIAL_AVATARS).map((src) => (
                <span
                  key={src}
                  className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-ink-950"
                >
                  <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </div>
            <p className="text-xs font-semibold text-white">
              Join 12,000+
              <br />
              <span className="font-normal text-white/50">Happy Flyers</span>
            </p>
          </div>
        </SlideLeft>
      </div>
    </section>
  );
};

export default PerformanceSection;
