export const PHOTO_SOLAR_BD = 'https://images.unsplash.com/photo-1745321633881-d2d2218911bd?auto=format&fit=crop&w=1800&q=82';
export const PHOTO_GENERATOR = 'https://images.unsplash.com/photo-1705051278299-7e64ba21437a?auto=format&fit=crop&w=1600&q=80';
export const PHOTO_ELEVATOR = 'https://images.unsplash.com/photo-1758448721149-aa0ce8e1b2c9?auto=format&fit=crop&w=1600&q=80';
export const PHOTO_ELECTRICAL = 'https://images.unsplash.com/photo-1780034766295-43db0f2a0fb7?auto=format&fit=crop&w=1600&q=80';

export const SOLUTION_PHOTOS: Record<string, string> = {
  'solar-energy': PHOTO_SOLAR_BD,
  'generator-backup-power': PHOTO_GENERATOR,
  'lift-elevator': PHOTO_ELEVATOR,
  'electrical-engineering': PHOTO_ELECTRICAL,
  'lightning-protection': PHOTO_ELECTRICAL,
  'maintenance-support': PHOTO_GENERATOR,
};

export function solutionPhoto(slug?: string | null) {
  return (slug && SOLUTION_PHOTOS[slug]) || PHOTO_SOLAR_BD;
}

export function projectFallbackPhoto(category?: string | null) {
  if (category === 'Generator & Backup Power') return PHOTO_GENERATOR;
  if (category === 'Lift & Elevator') return PHOTO_ELEVATOR;
  if (category === 'Electrical Engineering' || category === 'Lightning Protection') return PHOTO_ELECTRICAL;
  if (category === 'Maintenance & Support') return PHOTO_GENERATOR;
  return PHOTO_SOLAR_BD;
}
