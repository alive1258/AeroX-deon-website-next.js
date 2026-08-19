import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { TESTIMONIAL_AVATARS } from "@/src/constants/droneImages";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jason Miller",
    role: "Travel Filmmaker",
    quote: "AeroX Max Pro changed the way I capture the world.",
    avatar: TESTIMONIAL_AVATARS.daniel,
    rating: 5,
  },
  {
    name: "Amelia Cross",
    role: "Landscape Photographer",
    quote: "The gimbal stabilization is unreal — every clip is buttery smooth.",
    avatar: TESTIMONIAL_AVATARS.amelia,
    rating: 5,
  },
  {
    name: "Marcus Webb",
    role: "Real Estate Agent",
    quote: "Waypoint flight makes property tours look like a Hollywood shoot.",
    avatar: TESTIMONIAL_AVATARS.marcus,
    rating: 5,
  },
  {
    name: "Sophia Reyes",
    role: "Adventure Vlogger",
    quote: "30 minutes of flight time means I never miss the golden hour shot.",
    avatar: TESTIMONIAL_AVATARS.sophia,
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="w-[260px] shrink-0 rounded-2xl border border-white/10 bg-ink-950 p-6 sm:w-[320px]">
    <Quote size={22} className="text-orange-500/60" />
    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/70">
      &ldquo;{testimonial.quote}&rdquo;
    </p>
    <div className="mt-4 flex gap-1 text-orange-400">
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
    <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
        <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="36px" className="object-cover" />
      </span>
      <div className="text-left">
        <p className="text-sm font-bold text-white">{testimonial.name}</p>
        <p className="text-xs text-white/50">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
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
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
