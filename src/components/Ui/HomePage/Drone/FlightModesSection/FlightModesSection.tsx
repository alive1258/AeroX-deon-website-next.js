import Image from "next/image";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import { DRONE_IMAGES } from "@/src/constants/droneImages";

const MODES = [
  {
    title: "Follow Me",
    description: "Your drone. Your shadow.",
    image: DRONE_IMAGES.pilotWheatField,
    featured: false,
  },
  {
    title: "Waypoint Flight",
    description: "Plan. Tap. Fly.",
    image: DRONE_IMAGES.handsCatchDrone,
    featured: true,
  },
  {
    title: "Circle Mode",
    description: "Focus on what matters.",
    image: DRONE_IMAGES.heroFlightMountainSilhouette,
    featured: false,
  },
];

const FlightModesSection = () => {
  return (
    <section className="bg-ink-900 py-16 md:py-24">
      <div className="container">
        <SlideUp delay={1} className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
            Intelligent Modes
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Fly Smarter. Not Harder.
          </h2>
        </SlideUp>

        <div className="grid gap-6 sm:grid-cols-3">
          {MODES.map(({ title, description, image, featured }) => (
            <ZoomIn key={title}>
              <div
                className={`group relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ${
                  featured ? "ring-orange-500" : "ring-white/10"
                }`}
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    featured
                      ? "from-orange-600/90 via-orange-600/20"
                      : "from-black via-black/10"
                  } to-transparent`}
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  {featured && (
                    <span className="mb-2 inline-block rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-600">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <p className="mt-1 text-sm text-white/70">{description}</p>
                </div>
              </div>
            </ZoomIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlightModesSection;
