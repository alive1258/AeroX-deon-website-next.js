/**
 * Curated stock photography for the AeroX drone site (Unsplash, hotlinked via
 * next/image — `images.unsplash.com` is already whitelisted in next.config).
 * Centralized here so every page pulls from the same vetted set.
 */

const unsplash = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const DRONE_IMAGES = {
  heroFlightWater: unsplash("1507582020474-9a35b7d455d9", 1800),
  heroFlightForest: unsplash("1473968512647-3e447244af8f", 1800),
  heroFlightMountainSilhouette: unsplash("1521405924368-64c5b84bec60", 1800),
  handsCatchDrone: unsplash("1490117015722-b105f0b51407", 1800),
  droneStudioPale: unsplash("1487219116710-23ffcb172b2b", 1400),
  droneGreenBlur: unsplash("1527977966376-1c8408f9f108", 1400),
  pilotWheatField: unsplash("1506947411487-a56738267384", 1400),
  gimbalCloseup: unsplash("1614358108424-04d03647e343", 1200),
  lensMacro: unsplash("1584591085084-239509bc9743", 1400),
  auroraNightSky: unsplash("1443926818681-717d074a57af", 1200),
  aerialTuscanySunset: unsplash("1518098268026-4e89f1a2cd8e", 1800),
  gearFlatlayBackpack: unsplash("1536584754829-12214d404f32", 1400),
  droneDuskMavic: unsplash("1611878583599-5a1ba474063b", 1400),
} as const;

export const TESTIMONIAL_AVATARS = {
  amelia: unsplash("1506863530036-1efeddceb993", 200),
  daniel: unsplash("1587397845856-e6cf49176c70", 200),
  sophia: unsplash("1601412436009-d964bd02edbc", 200),
  marcus: unsplash("1535713875002-d1d0cf377fde", 200),
} as const;
