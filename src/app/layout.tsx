import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import Providers from "@/src/lib/providers/Providers";
import ToastProvider from "../components/Common/ToastProvider/ToastProvider";

// ✅ Font Optimization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Handwritten accent font for headline highlight words (e.g. "Journeys")
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// ✅ SEO Metadata
// NOTE: metadataBase/canonical use a placeholder domain — swap in the
// real domain once one is registered/deployed.
export const metadata: Metadata = {
  metadataBase: new URL("https://aerox-drones.com"),

  title: {
    default: "AeroX | Engineered for What's Next.",
    template: "%s | AeroX",
  },

  description:
    "AeroX Max Pro — a new era of aerial intelligence. Precision drones for pilots who won't settle for average altitude.",

  keywords: [
    "AeroX",
    "AeroX Max Pro",
    "drone",
    "camera drone",
    "quadcopter",
    "aerial photography drone",
  ],

  authors: [{ name: "AeroX" }],
  creator: "AeroX",
  publisher: "AeroX",

  category: "technology",

  // ✅ Open Graph (Facebook, LinkedIn)
  openGraph: {
    title: "AeroX | Engineered for What's Next.",
    description:
      "AeroX Max Pro — a new era of aerial intelligence. Capture more. See farther. Do beyond.",
    url: "https://aerox-drones.com",
    siteName: "AeroX",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=1600&q=80&auto=format&fit=crop",
        width: 1600,
        height: 1000,
        alt: "AeroX Max Pro drone in flight over open water",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ✅ Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "AeroX | Engineered for What's Next.",
    description:
      "AeroX Max Pro — a new era of aerial intelligence. Capture more. See farther. Do beyond.",
    images: [
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=1600&q=80&auto=format&fit=crop",
    ],
  },

  // ✅ Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ✅ Canonical
  alternates: {
    canonical: "https://aerox-drones.com",
  },

  // ✅ Icons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },

  // ✅ App Info
  applicationName: "AeroX",
  referrer: "origin-when-cross-origin",

  // ✅ Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} font-sans antialiased bg-ink-900 text-white`}
      >
        <Providers>
          {children}
          <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}
