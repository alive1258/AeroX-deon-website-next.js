import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  MapPin,
  Navigation,
  Radio,
  RefreshCw,
  ShieldCheck,
  Timer,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import SlideLeft from "@/src/components/Common/Animaation/SlideLeft";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { DRONE_IMAGES } from "@/src/constants/droneImages";

export const metadata: Metadata = {
  title: "Features & Specs",
  description:
    "A closer look at the camera, gimbal, flight intelligence, battery, and build quality behind AeroX Max Pro.",
};

const CAMERA_SPECS = [
  "1/1.3\" CMOS sensor, 48MP stills",
  "4K/60fps video, HDR support",
  "3-axis mechanical gimbal stabilization",
  "±0.01° stabilization accuracy",
  "3x lossless zoom",
];

const FLIGHT_INTELLIGENCE = [
  {
    icon: MapPin,
    title: "GPS-Assisted Flight",
    description: "Dual-band GPS keeps position locked, even in wind.",
  },
  {
    icon: ShieldCheck,
    title: "Smart Obstacle Avoidance",
    description: "Omnidirectional sensors detect and reroute in real time.",
  },
  {
    icon: Navigation,
    title: "Follow Me Mode",
    description: "Tracks a subject automatically, hands-free.",
  },
  {
    icon: RefreshCw,
    title: "Waypoint Flight",
    description: "Plan a route on the map — AeroX flies it precisely.",
  },
];

const PERFORMANCE_STATS = [
  { icon: Gauge, value: "65 km/h", label: "Max Speed" },
  { icon: Timer, value: "30 min", label: "Max Flight Time" },
  { icon: Radio, value: "10 km", label: "Transmission Range" },
  { icon: RefreshCw, value: "< 10 sec", label: "Battery Swap" },
];

const FULL_SPECS: { category: string; rows: [string, string][] }[] = [
  {
    category: "Camera",
    rows: [
      ["Sensor", "1/1.3\" CMOS, 48MP"],
      ["Video Resolution", "4K/60fps, HDR"],
      ["ISO Range", "100–6400"],
      ["Zoom", "3x lossless"],
    ],
  },
  {
    category: "Gimbal",
    rows: [
      ["Stabilization", "3-axis mechanical"],
      ["Controllable Range (Tilt)", "-90° to +30°"],
      ["Angular Vibration Range", "±0.01°"],
    ],
  },
  {
    category: "Battery & Flight",
    rows: [
      ["Max Flight Time", "30 minutes"],
      ["Max Speed", "65 km/h"],
      ["Max Transmission Range", "10 km"],
      ["Operating Temperature", "-10°C to 40°C"],
    ],
  },
  {
    category: "Build",
    rows: [
      ["Weight", "1.2 kg"],
      ["Folded Dimensions", "214 × 91 × 84 mm"],
      ["Weather Resistance", "IPX5"],
      ["Frame Material", "Aerospace-grade magnesium alloy"],
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Every Detail, Engineered"
        subtitle="From the sensor to the airframe, AeroX Max Pro is built around one goal — giving pilots a machine they can trust completely."
        image={DRONE_IMAGES.gimbalCloseup}
        alt="Close-up of the AeroX Max Pro camera and gimbal"
      />

      {/* CAMERA & GIMBAL */}
      <section className="bg-ink-950 py-16 md:py-24">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <SlideRight delay={1}>
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src={DRONE_IMAGES.lensMacro}
                alt="Macro shot of the AeroX Max Pro camera lens"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            </div>
          </SlideRight>

          <SlideLeft delay={1}>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              Camera & Gimbal
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              A Camera System That Doesn&apos;t Miss
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/60 sm:text-base">
              A 48MP sensor paired with a mechanically stabilized 3-axis
              gimbal means every frame stays locked, sharp, and cinematic —
              whether you&apos;re hovering still or flying at full speed.
            </p>

            <ul className="mt-7 space-y-3">
              {CAMERA_SPECS.map((spec) => (
                <li key={spec} className="flex items-start gap-2.5 text-sm text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                  {spec}
                </li>
              ))}
            </ul>
          </SlideLeft>
        </div>
      </section>

      {/* FLIGHT INTELLIGENCE */}
      <section className="bg-ink-900 py-16 md:py-24">
        <div className="container">
          <SlideUp delay={1} className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              Flight Intelligence
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              Smarter in the Air
            </h2>
          </SlideUp>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FLIGHT_INTELLIGENCE.map(({ icon: Icon, title, description }) => (
              <SlideUp key={title} delay={1}>
                <div className="h-full rounded-2xl border border-white/10 bg-ink-950 p-6">
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

      {/* PERFORMANCE STATS */}
      <section className="bg-ink-950 py-12">
        <div className="container grid grid-cols-2 gap-8 sm:grid-cols-4">
          {PERFORMANCE_STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <Icon size={22} className="text-orange-400" />
              <p className="text-2xl font-extrabold text-white">{value}</p>
              <p className="text-xs uppercase tracking-wide text-white/50">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BUILD & DURABILITY */}
      <section className="bg-ink-900 py-16 md:py-24">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <SlideRight delay={1} className="order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              Build & Durability
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Foldable. Rugged. Ready Anywhere.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
              An aerospace-grade magnesium alloy frame folds down to fit in a
              jacket pocket, yet holds up through rain, dust, and altitude
              swings that would ground lesser drones.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Shop AeroX Max Pro
              <ArrowRight size={15} />
            </Link>
          </SlideRight>

          <SlideLeft delay={1} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white/5">
              <Image
                src={DRONE_IMAGES.droneGreenBlur}
                alt="AeroX Max Pro drone folded for travel"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            </div>
          </SlideLeft>
        </div>
      </section>

      {/* FULL SPECS */}
      <section className="bg-ink-950 py-16 md:py-24">
        <div className="container max-w-4xl">
          <SlideUp delay={1} className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              The Fine Print
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              Full Specifications
            </h2>
          </SlideUp>

          <div className="grid gap-6 sm:grid-cols-2">
            {FULL_SPECS.map(({ category, rows }) => (
              <div
                key={category}
                className="rounded-2xl border border-white/10 bg-ink-900 p-6"
              >
                <h3 className="text-sm font-bold uppercase tracking-wide text-orange-400">
                  {category}
                </h3>
                <dl className="mt-4 divide-y divide-white/10">
                  {rows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 py-2.5 text-sm"
                    >
                      <dt className="text-white/50">{label}</dt>
                      <dd className="text-right font-medium text-white">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
