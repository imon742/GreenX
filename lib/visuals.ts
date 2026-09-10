// Curated Pexels stock photography used only as representative visual content.
// Replace any of these through the Green X Admin CMS when real project/product photos are available.
export const PHOTO_SOLAR_BD = 'https://images.pexels.com/photos/11645008/pexels-photo-11645008.jpeg?auto=compress&cs=tinysrgb&w=1800';
export const PHOTO_SOLAR_ROOFTOP = 'https://images.pexels.com/photos/8783541/pexels-photo-8783541.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_SOLAR_FACTORY = 'https://images.pexels.com/photos/35454187/pexels-photo-35454187.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_GENERATOR = 'https://images.pexels.com/photos/18816918/pexels-photo-18816918.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_ELEVATOR = 'https://images.pexels.com/photos/12780906/pexels-photo-12780906.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_ELEVATOR_INTERIOR = 'https://images.pexels.com/photos/8243095/pexels-photo-8243095.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_ELECTRICAL = 'https://images.pexels.com/photos/33694019/pexels-photo-33694019.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const PHOTO_MAINTENANCE = 'https://images.pexels.com/photos/39174676/pexels-photo-39174676.jpeg?auto=compress&cs=tinysrgb&w=1600';

export const SOLUTION_PHOTOS: Record<string, string> = {
  'solar-energy': PHOTO_SOLAR_FACTORY,
  'generator-backup-power': PHOTO_GENERATOR,
  'lift-elevator': PHOTO_ELEVATOR,
  'electrical-engineering': PHOTO_ELECTRICAL,
  'lightning-protection': PHOTO_ELECTRICAL,
  'maintenance-support': PHOTO_MAINTENANCE,
};

export const PRODUCT_PHOTOS: Record<string, string> = {
  'Solar Generators': PHOTO_SOLAR_BD,
  'Solar Panels': PHOTO_SOLAR_ROOFTOP,
  'Inverters': PHOTO_ELECTRICAL,
  'Battery & Storage': PHOTO_SOLAR_FACTORY,
  'Generators': PHOTO_GENERATOR,
  'Lift & Elevator': PHOTO_ELEVATOR_INTERIOR,
  'UPS & Power Backup': PHOTO_MAINTENANCE,
};

export function solutionPhoto(slug?: string | null) {
  return (slug && SOLUTION_PHOTOS[slug]) || PHOTO_SOLAR_BD;
}

export function productFallbackPhoto(category?: string | null) {
  return (category && PRODUCT_PHOTOS[category]) || PHOTO_SOLAR_BD;
}

export function projectFallbackPhoto(category?: string | null) {
  if (category === 'Generator & Backup Power') return PHOTO_GENERATOR;
  if (category === 'Lift & Elevator') return PHOTO_ELEVATOR;
  if (category === 'Electrical Engineering' || category === 'Lightning Protection') return PHOTO_ELECTRICAL;
  if (category === 'Maintenance & Support') return PHOTO_MAINTENANCE;
  return PHOTO_SOLAR_ROOFTOP;
}
