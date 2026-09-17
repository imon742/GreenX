// Curated Pexels photography used as representative demo visuals.
// Images are intentionally generic stock photography, not claimed as Greenex client projects.
// Replace any image from the Greenex Admin CMS when verified Greenex field photos are available.
export const PHOTO_HERO_SOLAR = 'https://images.pexels.com/photos/19895880/pexels-photo-19895880/free-photo-of-man-standing-among-solar-panels.jpeg?auto=compress&cs=tinysrgb&w=2000';
export const PHOTO_SOLAR_BD = 'https://images.pexels.com/photos/19895867/pexels-photo-19895867/free-photo-of-engineer-standing-among-solar-panels.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_SOLAR_ROOFTOP = 'https://images.pexels.com/photos/8783541/pexels-photo-8783541.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_SOLAR_FACTORY = 'https://images.pexels.com/photos/30285845/pexels-photo-30285845/free-photo-of-technician-installing-solar-panels-on-rooftop.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_SOLAR_TECH = 'https://images.pexels.com/photos/8853541/pexels-photo-8853541.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_SOLAR_FIELD = 'https://images.pexels.com/photos/11645008/pexels-photo-11645008.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_GENERATOR = 'https://images.pexels.com/photos/18816918/pexels-photo-18816918.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_GENERATOR_ALT = 'https://images.pexels.com/photos/35042792/pexels-photo-35042792.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_ELEVATOR = 'https://images.pexels.com/photos/12105634/pexels-photo-12105634.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_ELEVATOR_INTERIOR = 'https://images.pexels.com/photos/8243095/pexels-photo-8243095.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_ELEVATOR_PREMIUM = 'https://images.pexels.com/photos/28951258/pexels-photo-28951258.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_ELECTRICAL = 'https://images.pexels.com/photos/39174676/pexels-photo-39174676.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_ELECTRICAL_ALT = 'https://images.pexels.com/photos/33694019/pexels-photo-33694019.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_BATTERY = 'https://images.pexels.com/photos/36085816/pexels-photo-36085816.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_SERVER = 'https://images.pexels.com/photos/17323801/pexels-photo-17323801.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_DATACENTER = 'https://images.pexels.com/photos/5408005/pexels-photo-5408005.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_MAINTENANCE = PHOTO_ELECTRICAL;

export const SOLUTION_PHOTOS: Record<string, string> = {
  'solar-energy': PHOTO_SOLAR_FACTORY,
  'generator-backup-power': PHOTO_GENERATOR,
  'lift-elevator': PHOTO_ELEVATOR_PREMIUM,
  'electrical-engineering': PHOTO_ELECTRICAL,
  'lightning-protection': PHOTO_ELECTRICAL_ALT,
  'maintenance-support': PHOTO_MAINTENANCE,
};

export const PRODUCT_PHOTOS: Record<string, string> = {
  'Solar Generators': PHOTO_SOLAR_BD,
  'Solar Panels': PHOTO_SOLAR_ROOFTOP,
  'Inverters': PHOTO_ELECTRICAL_ALT,
  'Battery & Storage': PHOTO_BATTERY,
  'Generators': PHOTO_GENERATOR,
  'Lift & Elevator': PHOTO_ELEVATOR_INTERIOR,
  'UPS & Power Backup': PHOTO_SERVER,
};

export function solutionPhoto(slug?: string | null) {
  return (slug && SOLUTION_PHOTOS[slug]) || PHOTO_HERO_SOLAR;
}

export function productFallbackPhoto(category?: string | null) {
  return (category && PRODUCT_PHOTOS[category]) || PHOTO_SOLAR_BD;
}

export function projectFallbackPhoto(category?: string | null) {
  if (category === 'Generator & Backup Power') return PHOTO_GENERATOR_ALT;
  if (category === 'Lift & Elevator') return PHOTO_ELEVATOR_PREMIUM;
  if (category === 'Electrical Engineering' || category === 'Lightning Protection') return PHOTO_ELECTRICAL;
  if (category === 'Maintenance & Support') return PHOTO_MAINTENANCE;
  return PHOTO_SOLAR_FACTORY;
}

export function projectGalleryFallback(category?: string | null) {
  if (category === 'Generator & Backup Power') return [PHOTO_GENERATOR, PHOTO_GENERATOR_ALT, PHOTO_ELECTRICAL];
  if (category === 'Lift & Elevator') return [PHOTO_ELEVATOR_PREMIUM, PHOTO_ELEVATOR_INTERIOR, PHOTO_ELEVATOR];
  if (category === 'Electrical Engineering' || category === 'Lightning Protection') return [PHOTO_ELECTRICAL, PHOTO_ELECTRICAL_ALT, PHOTO_MAINTENANCE];
  if (category === 'Maintenance & Support') return [PHOTO_MAINTENANCE, PHOTO_ELECTRICAL, PHOTO_SOLAR_TECH];
  return [PHOTO_SOLAR_ROOFTOP, PHOTO_SOLAR_FACTORY, PHOTO_SOLAR_TECH];
}
