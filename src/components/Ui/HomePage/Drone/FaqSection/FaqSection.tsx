import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import FaqAccordion from "./FaqAccordion";

const FaqSection = () => {
  return (
    <section id="faq" className="scroll-mt-[100px] bg-ink-950 py-16 md:py-24">
      <div className="container max-w-3xl">
        <SlideUp delay={1} className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
            Good to Know
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </SlideUp>

        <SlideUp delay={2}>
          <FaqAccordion />
        </SlideUp>
      </div>
    </section>
  );
};

export default FaqSection;
