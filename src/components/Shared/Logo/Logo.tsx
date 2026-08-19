/* ================= LOGO MARK ================= */
/* A propeller/aperture glyph — four angled blades around a center hub,
   evokes a drone rotor without needing an external asset. */
export const LogoMark = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="20" fill="#F97316" />
    <g stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round">
      <path d="M20 20 8 12" />
      <path d="M20 20 32 12" />
      <path d="M20 20 8 28" />
      <path d="M20 20 32 28" />
    </g>
    <circle cx="20" cy="20" r="4" fill="#0A0A0A" />
  </svg>
);

/* ================= LOGO (MARK + WORDMARK) ================= */
const SIZES = {
  sm: { icon: "w-6 h-6", text: "text-lg" },
  md: { icon: "w-8 h-8", text: "text-xl" },
  lg: { icon: "w-10 h-10", text: "text-2xl" },
} as const;

interface LogoProps {
  variant?: "dark" | "light";
  size?: keyof typeof SIZES;
  className?: string;
}

const Logo = ({ variant = "dark", size = "md", className = "" }: LogoProps) => {
  const { icon, text } = SIZES[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={icon} />
      <span
        className={`font-extrabold uppercase leading-none whitespace-nowrap tracking-tight ${text} ${
          variant === "dark" ? "text-neutral-900" : "text-white"
        }`}
      >
        Aero<span className="text-orange-500">X</span>
      </span>
    </span>
  );
};

export default Logo;
