import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { resolveLucideIcon } from "@/src/utils/lucideIconMap";
import type { ApiResponse } from "@/src/types/axios";
import type {
  PreorderBannerItem,
  PreorderBundleItem,
} from "@/src/types/preorderBannerType";

const FALLBACK_BUNDLE_ITEMS: PreorderBundleItem[] = [
  { icon: "BatteryCharging", label: "Extra Battery" },
  { icon: "ShieldCheck", label: "Propeller Guard" },
  { icon: "Briefcase", label: "Carrying Case" },
];

async function getActivePreorderBanner(): Promise<PreorderBannerItem | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/preorder-banner/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return null;

    const body: ApiResponse<PreorderBannerItem> = await res.json();
    return body.data ?? null;
  } catch {
    return null;
  }
}

const PreorderBannerSection = async () => {
  const banner = await getActivePreorderBanner();

  const badgeText = banner?.badge_text || "Limited Offer";
  const title = banner?.title || "Preorder Now & Get Exclusive Accessories";
  const description = banner?.description || "Be the first to fly smarter.";
  const buttonText = banner?.button_text || "Preorder Now";
  const buttonLink = banner?.button_link || "/shop";
  const bundleItems = banner?.bundle_items?.length
    ? banner.bundle_items
    : FALLBACK_BUNDLE_ITEMS;

  return (
    <section className="bg-ink-900 py-16 md:py-24">
      <div className="container">
        <SlideUp delay={1}>
          <div className="overflow-hidden rounded-3xl bg-ink-950 p-8 sm:p-12">
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-lg">
                <span className="inline-block rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  {badgeText}
                </span>
                <h2 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                  {title}
                </h2>
                <p className="mt-3 text-sm text-white/60 sm:text-base">
                  {description}
                </p>
                <Link
                  href={buttonLink}
                  className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  {buttonText}
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="grid w-full grid-cols-3 gap-4 sm:w-auto">
                {bundleItems.map((item) => {
                  const Icon = resolveLucideIcon(item.icon);
                  return (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-ink-900 px-5 py-6 text-center"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                        <Icon size={20} />
                      </span>
                      <span className="text-xs font-semibold text-white/80">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
};

export default PreorderBannerSection;
