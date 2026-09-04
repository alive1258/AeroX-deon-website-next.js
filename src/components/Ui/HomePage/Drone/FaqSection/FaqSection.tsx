import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import type { ApiResponse } from "@/src/types/axios";
import type { QuestionAnswer } from "@/src/redux/api/questionAnswerApi";
import FaqAccordion from "./FaqAccordion";

async function getActiveFaqs(): Promise<QuestionAnswer[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/question-answers/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: ApiResponse<QuestionAnswer[]> = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

const FaqSection = async () => {
  const faqs = await getActiveFaqs();

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
          <FaqAccordion faqs={faqs} />
        </SlideUp>
      </div>
    </section>
  );
};

export default FaqSection;
