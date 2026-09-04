import Image from "next/image";
import Link from "next/link";
import { Check, Lock, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import { DRONE_IMAGES } from "@/src/constants/droneImages";
import { resolveLucideIcon } from "@/src/utils/lucideIconMap";
import type { ApiResponse } from "@/src/types/axios";
import type { ProductBundleItem } from "@/src/types/productBundleType";
import type { ShopAccessoryItem } from "@/src/types/shopAccessoryType";

const FALLBACK_BUNDLES: ProductBundleItem[] = [
  {
    id: "fallback-1",
    name: "Standard",
    price: 899,
    description: "The essential AeroX Max Pro kit.",
    image: DRONE_IMAGES.droneStudioPale,
    featured: false,
    includes: [
      "AeroX Max Pro drone",
      "1 intelligent flight battery",
      "Remote controller",
      "Propeller set",
      "USB-C charging cable",
    ],
    button_text: "Preorder",
    button_link: "/contact",
    position: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-2",
    name: "Fly More Combo",
    price: 1199,
    description: "Everything you need for full-day shoots.",
    image: DRONE_IMAGES.droneGreenBlur,
    featured: true,
    includes: [
      "Everything in Standard",
      "2 extra intelligent batteries",
      "Carrying case",
      "Propeller guards",
      "Fast charging hub",
    ],
    button_text: "Preorder",
    button_link: "/contact",
    position: 2,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-3",
    name: "Pro Bundle",
    price: 1499,
    description: "For working creators and pilots.",
    image: DRONE_IMAGES.droneDuskMavic,
    featured: false,
    includes: [
      "Everything in Fly More Combo",
      "ND filter set (4-pack)",
      "128GB microSD card",
      "2-year care plan",
    ],
    button_text: "Preorder",
    button_link: "/contact",
    position: 3,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

const FALLBACK_ACCESSORIES: ShopAccessoryItem[] = [
  { id: "fallback-1", name: "Extra Intelligent Battery", price: 89, icon: "BatteryCharging", button_link: "/contact", position: 1, is_active: true, created_at: "", updated_at: "" },
  { id: "fallback-2", name: "Propeller Guard Set", price: 29, icon: "ShieldCheck", button_link: "/contact", position: 2, is_active: true, created_at: "", updated_at: "" },
  { id: "fallback-3", name: "Carrying Case", price: 79, icon: "Briefcase", button_link: "/contact", position: 3, is_active: true, created_at: "", updated_at: "" },
  { id: "fallback-4", name: "ND Filter Set (4-Pack)", price: 59, icon: "Aperture", button_link: "/contact", position: 4, is_active: true, created_at: "", updated_at: "" },
  { id: "fallback-5", name: "Fast Charging Hub", price: 49, icon: "Zap", button_link: "/contact", position: 5, is_active: true, created_at: "", updated_at: "" },
  { id: "fallback-6", name: "Landing Pad", price: 19, icon: "BatteryCharging", button_link: "/contact", position: 6, is_active: true, created_at: "", updated_at: "" },
];

const TRUST_ITEMS = [
  { icon: Truck, label: "Free Shipping" },
  { icon: RotateCcw, label: "30-Day Returns" },
  { icon: ShieldCheck, label: "1-Year Warranty" },
  { icon: Lock, label: "Secure Checkout" },
];

async function getActiveProductBundles(): Promise<ProductBundleItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product-bundles/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: ApiResponse<ProductBundleItem[]> = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

async function getActiveShopAccessories(): Promise<ShopAccessoryItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shop-accessories/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: ApiResponse<ShopAccessoryItem[]> = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

const ShopPage = async () => {
  const [fetchedBundles, fetchedAccessories] = await Promise.all([
    getActiveProductBundles(),
    getActiveShopAccessories(),
  ]);

  const bundles = fetchedBundles.length ? fetchedBundles : FALLBACK_BUNDLES;
  const accessories = fetchedAccessories.length
    ? fetchedAccessories
    : FALLBACK_ACCESSORIES;

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Preorder AeroX Max Pro"
        subtitle="Choose the bundle that matches your flying style. Every preorder locks in current pricing and ships in the order it's received."
        image={DRONE_IMAGES.heroFlightWater}
        alt="AeroX Max Pro drone in flight over open water"
      />

      {/* TRUST STRIP */}
      <div className="border-b border-white/10 bg-ink-950">
        <div className="container grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-sm text-white/70">
              <Icon size={17} className="text-orange-400" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* BUNDLES */}
      <section className="bg-ink-900 py-16 md:py-24">
        <div className="container">
          <SlideUp delay={1} className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              Choose Your Kit
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              Bundles Built Around How You Fly
            </h2>
          </SlideUp>

          <div className="grid gap-6 lg:grid-cols-3">
            {bundles.map((bundle) => (
              <ZoomIn key={bundle.id}>
                <div
                  className={`flex h-full flex-col overflow-hidden rounded-3xl border bg-ink-950 ${
                    bundle.featured
                      ? "border-orange-500 shadow-lg shadow-orange-500/10"
                      : "border-white/10"
                  }`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={bundle.image || DRONE_IMAGES.droneStudioPale}
                      alt={bundle.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                    {bundle.featured && (
                      <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-lg font-bold text-white">
                      {bundle.name}
                    </h3>
                    {bundle.description && (
                      <p className="mt-1 text-sm text-white/60">
                        {bundle.description}
                      </p>
                    )}
                    <p className="mt-4 text-3xl font-extrabold text-white">
                      ${Number(bundle.price).toLocaleString()}
                    </p>

                    {bundle.includes && bundle.includes.length > 0 && (
                      <ul className="mt-6 flex-1 space-y-3">
                        {bundle.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-white/60"
                          >
                            <Check size={16} className="mt-0.5 shrink-0 text-orange-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={bundle.button_link || "/contact"}
                      className={`mt-7 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition ${
                        bundle.featured
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {bundle.button_text || "Preorder"} {bundle.name}
                    </Link>
                  </div>
                </div>
              </ZoomIn>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESSORIES */}
      <section className="bg-ink-950 py-16 md:py-24">
        <div className="container">
          <SlideUp delay={1} className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              Gear Up
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              Accessories
            </h2>
          </SlideUp>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {accessories.map((accessory) => {
              const Icon = resolveLucideIcon(accessory.icon);
              return (
                <div
                  key={accessory.id}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-900 p-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <Icon size={20} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{accessory.name}</p>
                    <p className="text-sm text-white/60">
                      ${Number(accessory.price).toLocaleString()}
                    </p>
                  </div>
                  <Link
                    href={accessory.button_link || "/contact"}
                    className="shrink-0 rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-orange-500 hover:text-orange-400"
                  >
                    Add
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
