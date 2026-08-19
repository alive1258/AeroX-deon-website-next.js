import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Leaf, Sparkles, Users } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import SlideLeft from "@/src/components/Common/Animaation/SlideLeft";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { DRONE_IMAGES } from "@/src/constants/droneImages";

export const metadata: Metadata = {
  title: "About AeroX",
  description:
    "Learn who's behind AeroX — our story, our mission, and why pilots around the world trust us to engineer what's next.",
};

const STATS = [
  { value: "2019", label: "Founded" },
  { value: "40+", label: "Countries Flown" },
  { value: "25K+", label: "Units Shipped" },
  { value: "4.9/5", label: "Average Rating" },
];

const VALUES = [
  {
    icon: Sparkles,
    title: "Relentless Innovation",
    description:
      "Every AeroX generation ships with technology that didn't exist in the last — never a rebrand, always a rebuild.",
  },
  {
    icon: Compass,
    title: "Precision First",
    description:
      "From gimbal calibration to flight firmware, we obsess over the details that separate a good shot from a great one.",
  },
  {
    icon: Leaf,
    title: "Responsible Flying",
    description:
      "Geofencing, noise-optimized props, and clear airspace guidance are built in — not bolted on.",
  },
  {
    icon: Users,
    title: "Built With Our Community",
    description:
      "Feature requests from real pilots shape our roadmap. Half of what ships this year came from customer feedback.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Built By Pilots, For Pilots"
        subtitle="AeroX exists to put professional-grade aerial imaging in the hands of everyone chasing the next great shot — without compromising on precision."
        image={DRONE_IMAGES.handsCatchDrone}
        alt="Hands reaching toward an AeroX drone flying over a mountain canyon"
      />

      {/* STORY */}
      <section className="bg-ink-950 py-16 md:py-24">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <SlideRight delay={1}>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              Our Story
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              From a Garage Prototype to a Global Flight Community
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/60 sm:text-base">
              AeroX started with three engineers frustrated that
              professional-grade stabilization was locked behind
              enterprise price tags. We built our first gimbal prototype
              on a kitchen table in 2019 — today it powers the AeroX Max
              Pro flown by creators, surveyors, and explorers in over 40
              countries.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
              We&apos;re still a small team by design. It keeps us close to
              the pilots who fly what we build, and fast enough to ship
              the features they actually ask for.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Get in Touch
              <ArrowRight size={15} />
            </Link>
          </SlideRight>

          <SlideLeft delay={1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src={DRONE_IMAGES.pilotWheatField}
                alt="A pilot flying an AeroX drone in an open field"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            </div>
          </SlideLeft>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-ink-900 py-14">
        <div className="container grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold text-orange-500 sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wide text-white/50 sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-ink-950 py-16 md:py-24">
        <div className="container">
          <SlideUp delay={1} className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              What Drives Us
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              Our Values
            </h2>
          </SlideUp>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <SlideUp key={title} delay={1}>
                <div className="h-full rounded-2xl border border-white/10 bg-ink-900 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {description}
                  </p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink-900 py-16 md:py-20">
        <div className="container flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Want to Talk to a Real Person?
          </h2>
          <p className="max-w-lg text-white/60">
            Our team is happy to walk you through specs, bundles, or a
            wholesale inquiry.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
