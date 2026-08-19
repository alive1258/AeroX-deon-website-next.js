"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const TOPICS = [
  "Preorder Question",
  "Product Support",
  "Wholesale & Partnerships",
  "Press & Media",
  "Something Else",
];

// TODO: no backend yet — wire this up to a real inbox/CRM once one exists.
const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-ink-900 px-6 py-16 text-center">
        <CheckCircle2 size={32} className="text-orange-400" />
        <h3 className="text-lg font-bold text-white">
          Thanks — we&apos;ve got your message.
        </h3>
        <p className="max-w-sm text-sm text-white/60">
          A member of our team will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-2xl border border-white/10 bg-ink-900 p-6 sm:p-8"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
            Full Name
          </span>
          <input
            type="text"
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
            Email
          </span>
          <input
            type="email"
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
            Phone
          </span>
          <input
            type="tel"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
            Topic
          </span>
          <select className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-orange-500 focus:outline-none">
            <option value="" className="text-neutral-900">
              Select a topic
            </option>
            {TOPICS.map((t) => (
              <option key={t} value={t} className="text-neutral-900">
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
          Message
        </span>
        <textarea
          required
          rows={5}
          placeholder="Tell us what you need — model interest, order number, or partnership details."
          className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        Send Message
        <Send size={15} />
      </button>
    </form>
  );
};

export default ContactForm;
