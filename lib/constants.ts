export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@google.com';
export const PRODUCT_CATEGORIES = [
  'Solar Generators', 'Solar Panels', 'Inverters', 'Battery & Storage', 'Generators', 'Lift & Elevator', 'UPS & Power Backup'
];
export const NAV_SOLUTIONS = [
  ['Solar Energy','solar-energy'], ['Generator & Backup Power','generator-backup-power'], ['Lift & Elevator','lift-elevator'],
  ['Electrical Engineering','electrical-engineering'], ['Lightning Protection','lightning-protection'], ['Maintenance & Support','maintenance-support']
] as const;
