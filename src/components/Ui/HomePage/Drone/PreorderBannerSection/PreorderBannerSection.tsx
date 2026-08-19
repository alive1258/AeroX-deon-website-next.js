import Link from "next/link";
import { ArrowRight, BatteryCharging, Briefcase, ShieldCheck } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";

const BUNDLE_ITEMS = [
  { icon: BatteryCharging, label: "Extra Battery" },
  { icon: ShieldCheck, label: "Propeller Guard" },
  { icon: Briefcase, label: "Carrying Case" },
];

const PreorderBannerSection = () => {
  return (
    <section className="bg-ink-900 py-16 md:py-24">
      <div className="container">
        <SlideUp delay={1}>
          <div className="overflow-hidden rounded-3xl bg-ink-950 p-8 sm:p-12">
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-lg">
                <span className="inline-block rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  Limited Offer
                </span>
                <h2 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                  Preorder Now &amp; Get Exclusive Accessories
                </h2>
                <p className="mt-3 text-sm text-white/60 sm:text-base">
                  Be the first to fly smarter.
                </p>
                <Link
                  href="/shop"
                  className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Preorder Now
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="grid w-full grid-cols-3 gap-4 sm:w-auto">
                {BUNDLE_ITEMS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-ink-900 px-5 py-6 text-center"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                      <Icon size={20} />
                    </span>
                    <span className="text-xs font-semibold text-white/80">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
};

export default PreorderBannerSection;
