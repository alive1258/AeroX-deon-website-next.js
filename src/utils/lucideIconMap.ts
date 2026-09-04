import {
  Aperture,
  Award,
  Backpack,
  BatteryCharging,
  Briefcase,
  Camera,
  Compass,
  Gauge,
  Gift,
  Leaf,
  LucideIcon,
  MapPin,
  Navigation,
  Radio,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Users,
  Zap,
} from "lucide-react";

/**
 * Maps a Lucide icon name (stored as plain text on admin-editable stats /
 * feature-list content, e.g. Hero.stats[].icon) to its component. Extend as
 * new icon names are used from the dashboard.
 */
export const lucideIconMap: Record<string, LucideIcon> = {
  Aperture,
  Award,
  Backpack,
  BatteryCharging,
  Briefcase,
  Camera,
  Compass,
  Gauge,
  Gift,
  Leaf,
  MapPin,
  Navigation,
  Radio,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Users,
  Zap,
};

export const resolveLucideIcon = (name?: string): LucideIcon =>
  (name && lucideIconMap[name]) || Sparkles;
