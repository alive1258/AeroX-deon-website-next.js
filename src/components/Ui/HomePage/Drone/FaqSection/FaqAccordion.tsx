"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How far can AeroX Max Pro fly from the controller?",
    answer:
      "Up to 10 km of stable video transmission in open, interference-free conditions. Actual range depends on local airspace regulations and environmental factors.",
  },
  {
    question: "How long does the battery last per flight?",
    answer:
      "Up to 30 minutes on a single charge with the standard battery. The modular battery system lets you swap in a spare in seconds for extended sessions.",
  },
  {
    question: "Is AeroX Max Pro beginner-friendly?",
    answer:
      "Yes. GPS-assisted flight, smart obstacle avoidance, and one-tap intelligent modes like Follow Me and Waypoint Flight make it easy to fly confidently from your first takeoff.",
  },
  {
    question: "What's covered under the warranty?",
    answer:
      "Every AeroX Max Pro ships with a 1-year manufacturer warranty covering defects in materials and workmanship. Extended care plans are available at checkout.",
  },
  {
    question: "When will preorders ship?",
    answer:
      "Preorders are fulfilled in the order they're received, with shipping updates sent to your email. Preordering now also locks in the current bundle pricing.",
  },
];

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-ink-900">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-sm font-semibold text-white sm:text-base">
                {faq.question}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-orange-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5">
                <p className="text-sm leading-relaxed text-white/60">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
