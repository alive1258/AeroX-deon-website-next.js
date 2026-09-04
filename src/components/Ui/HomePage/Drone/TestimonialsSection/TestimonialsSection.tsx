import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Star, User } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { TESTIMONIAL_AVATARS } from "@/src/constants/droneImages";
import type { ApiResponse } from "@/src/types/axios";
import type { TestimonialItem } from "@/src/types/testimonialType";

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "fallback-1",
    name: "Jason Miller",
    designation: "Travel Filmmaker",
    description: "AeroX Max Pro changed the way I capture the world.",
    image: TESTIMONIAL_AVATARS.daniel,
    rating: 5,
    position: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-2",
    name: "Amelia Cross",
    designation: "Landscape Photographer",
    description:
      "The gimbal stabilization is unreal — every clip is buttery smooth.",
    image: TESTIMONIAL_AVATARS.amelia,
    rating: 5,
    position: 2,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-3",
    name: "Marcus Webb",
    designation: "Real Estate Agent",
    description:
      "Waypoint flight makes property tours look like a Hollywood shoot.",
    image: TESTIMONIAL_AVATARS.marcus,
    rating: 5,
    position: 3,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-4",
    name: "Sophia Reyes",
    designation: "Adventure Vlogger",
    description:
      "30 minutes of flight time means I never miss the golden hour shot.",
    image: TESTIMONIAL_AVATARS.sophia,
    rating: 5,
    position: 4,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

async function getActiveTestimonials(): Promise<TestimonialItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/testimonials/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: ApiResponse<TestimonialItem[]> = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialItem }) => (
  <div className="w-[260px] shrink-0 rounded-2xl border border-white/10 bg-ink-950 p-6 sm:w-[320px]">
    <Quote size={22} className="text-orange-500/60" />
    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/70">
      &ldquo;{testimonial.description}&rdquo;
    </p>
    <div className="mt-4 flex gap-1 text-orange-400">
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
    <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
      {testimonial.image ? (
        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="36px"
            className="object-cover"
          />
        </span>
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60">
          <User size={15} />
        </span>
      )}
      <div className="text-left">
        <p className="text-sm font-bold text-white">{testimonial.name}</p>
        {testimonial.designation && (
          <p className="text-xs text-white/50">{testimonial.designation}</p>
        )}
      </div>
    </div>
  </div>
);

const TestimonialsSection = async () => {
  const fetched = await getActiveTestimonials();
  const testimonials = fetched.length ? fetched : FALLBACK_TESTIMONIALS;

  return (
    <section className="overflow-hidden bg-ink-900 py-16 md:py-24">
      <div className="container mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SlideUp delay={1}>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
            Trusted by Explorers
          </span>
          <h2 className="mt-4 max-w-md text-3xl font-extrabold text-white sm:text-4xl">
            Loved by Pilots. Trusted Globally.
          </h2>
        </SlideUp>
        <Link
          href="/#faq"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          See All Reviews
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="testimonial-fade overflow-hidden">
        <div className="flex w-max gap-6 animate-testimonial-left">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
