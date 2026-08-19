import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import ContactForm from "@/src/components/Ui/ContactPage/ContactForm";
import { DRONE_IMAGES } from "@/src/constants/droneImages";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AeroX — preorder questions, product support, or a wholesale inquiry.",
};

// TODO: same placeholders as Navbar/Footer — replace with the drone
// company's real contact details.
const CONTACT_PHONE = "+1 (202) 555-0198";
const CONTACT_EMAIL = "hello@aerox-drones.com";
const OFFICE_ADDRESS = "480 Skyline Drive, Austin, TX";
const OPEN_HOURS = "Mon – Fri, 9am – 6pm EST";

const INFO_ITEMS = [
  { icon: Phone, label: "Phone", value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}` },
  { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: MapPin, label: "Office", value: OFFICE_ADDRESS },
  { icon: Clock, label: "Hours", value: OPEN_HOURS },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Get You Flying"
        subtitle="Questions about a preorder, a bundle, or wholesale? Reach out and we'll get back to you within one business day."
        image={DRONE_IMAGES.heroFlightForest}
        alt="AeroX drone in flight above a forest canopy"
      />

      <section className="bg-ink-950 py-16 md:py-24">
        <div className="container grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                Get in Touch
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">
                We&apos;re Here to Help
              </h2>
            </div>

            <ul className="space-y-5">
              {INFO_ITEMS.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="font-medium text-white hover:text-orange-400 transition"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-medium text-white">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="AeroX office location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-97.79%2C30.24%2C-97.71%2C30.30&layer=mapnik&marker=30.2672%2C-97.7431"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
