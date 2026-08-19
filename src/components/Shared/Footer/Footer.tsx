"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, PhoneCall } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import Logo from "../Logo/Logo";

/* ================= CONSTANTS ================= */
// TODO: replace with the drone company's real contact details — same
// placeholders used in Navbar.
const CONTACT_PHONE = "+1 (202) 555-0198";
const CONTACT_EMAIL = "hello@aerox-drones.com";
const OFFICE_ADDRESS = "480 Skyline Drive, Austin, TX";

const MAIN_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Features", href: "/features" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// TODO: no dedicated pages yet for these support topics — point them at
// real help-center content once it exists.
const SUPPORT_LINKS = [
  { label: "FAQs", href: "/#faq" },
  { label: "Shipping", href: "#" },
  { label: "Returns", href: "#" },
  { label: "Warranty", href: "#" },
  { label: "Track Order", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Terms of Use", href: "/terms-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
];

// TODO: swap in the drone company's real social profile URLs
const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
  { icon: FaXTwitter, label: "X", href: "#" },
];

/* ================= COMPONENT ================= */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: no newsletter backend yet — wire this up once one exists.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-ink-900 text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14 pb-14 border-b border-white/10">
          {/* NEWSLETTER */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Stay in the Loop
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
              Get the latest updates, product drops, and exclusive offers.
            </h3>

            {subscribed ? (
              <p className="text-sm font-medium text-white/70">
                You&apos;re on the list — thanks for subscribing.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex w-full max-w-sm overflow-hidden rounded-lg border border-white/15 bg-ink-950 focus-within:border-orange-500 transition"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex shrink-0 items-center gap-1.5 bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Subscribe
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

          {/* LINK COLUMNS */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <Link href="/" className="inline-flex">
                <Logo variant="light" size="md" />
              </Link>
              <p className="text-sm text-white/50 leading-relaxed max-w-[16rem]">
                Precision drones engineered for pilots who won&apos;t settle
                for average altitude.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">
                Main
              </h4>
              <ul className="space-y-3">
                {MAIN_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">
                Support
              </h4>
              <ul className="space-y-3">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">
                Legal
              </h4>
              <ul className="space-y-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CONTACT STRIP */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 text-sm text-white/50">
          <a
            href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <PhoneCall size={14} />
            {CONTACT_PHONE}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <Mail size={14} />
            {CONTACT_EMAIL}
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={14} />
            {OFFICE_ADDRESS}
          </span>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/40 text-center md:text-left order-2 md:order-1">
            © {currentYear}{" "}
            <span className="font-semibold text-white/80">
              AeroX Drones
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-3 order-1 md:order-2">
            <span className="text-xs text-white/40 mr-1 hidden sm:inline">
              Follow us on
            </span>
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                onClick={href === "#" ? (e) => e.preventDefault() : undefined}
                aria-label={label}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white/60 hover:bg-orange-500 hover:text-white transition-colors"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
