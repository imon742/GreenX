export type CategoryMeta = {
  name: string;
  slug: string;
  short: string;
  description: string;
  asset: string;
  accent: string;
};

export const PRODUCT_CATEGORY_META: CategoryMeta[] = [
  { name:'Solar Generators', slug:'solar-generators', short:'Portable and stationary solar backup.', description:'Portable and fixed solar generator systems combining battery storage, inverter output and solar charging for homes, offices and field operations.', asset:'/assets/product-powerstation.svg', accent:'01' },
  { name:'Solar Panels', slug:'solar-panels', short:'PV modules for rooftop and project use.', description:'High-efficiency photovoltaic modules selected for rooftop, commercial and industrial solar projects.', asset:'/assets/product-panel.svg', accent:'02' },
  { name:'Inverters', slug:'inverters', short:'Hybrid, on-grid and backup power control.', description:'Solar and power inverters for grid-tied, hybrid and backup applications with monitoring and storage integration.', asset:'/assets/product-inverter.svg', accent:'03' },
  { name:'Battery & Storage', slug:'battery-storage', short:'Energy storage for solar and backup systems.', description:'LiFePO4 and deep-cycle storage solutions designed around runtime, cycle life and application requirements.', asset:'/assets/product-battery.svg', accent:'04' },
  { name:'Generators', slug:'generators', short:'Standby and prime power generation.', description:'Generator solutions for commercial, industrial and residential standby power, including installation and control integration.', asset:'/assets/generator.svg', accent:'05' },
  { name:'Lift & Elevator', slug:'lift-elevator', short:'Vertical transportation equipment.', description:'Passenger, hospital, cargo and building lift solutions supported by installation, commissioning and maintenance.', asset:'/assets/lift.svg', accent:'06' },
  { name:'UPS & Power Backup', slug:'ups-power-backup', short:'Clean continuity for critical loads.', description:'UPS and power backup systems for IT, office, commercial and critical equipment applications.', asset:'/assets/product-ups.svg', accent:'07' },
];

export const PROJECT_CATEGORY_META: CategoryMeta[] = [
  { name:'Solar Energy', slug:'solar-energy', short:'Rooftop, hybrid and off-grid energy projects.', description:'Solar generation and storage projects designed around site conditions, load profile and long-term energy goals.', asset:'/assets/solar-project.svg', accent:'01' },
  { name:'Generator & Backup Power', slug:'generator-backup-power', short:'Standby generation and backup integration.', description:'Generator and backup projects covering sizing, supply, installation, control integration and commissioning.', asset:'/assets/generator-project.svg', accent:'02' },
  { name:'Lift & Elevator', slug:'lift-elevator', short:'Passenger and building lift delivery.', description:'Lift projects covering planning, supply, installation, testing, handover and ongoing maintenance.', asset:'/assets/lift-project.svg', accent:'03' },
  { name:'Electrical Engineering', slug:'electrical-engineering', short:'Distribution, protection and electrical works.', description:'Electrical engineering projects for facilities requiring dependable distribution, protection and system improvement.', asset:'/assets/electrical-project.svg', accent:'04' },
  { name:'Lightning Protection', slug:'lightning-protection', short:'Protection, earthing and safety improvement.', description:'Lightning and earthing projects focused on facility protection, risk reduction, testing and compliance.', asset:'/assets/lightning.svg', accent:'05' },
  { name:'Maintenance & Support', slug:'maintenance-support', short:'Lifecycle care and AMC assignments.', description:'Planned and corrective maintenance engagements designed to protect uptime and extend equipment life.', asset:'/assets/maintenance.svg', accent:'06' },
];

export function productCategoryFromSlug(slug:string){ return PRODUCT_CATEGORY_META.find(x=>x.slug===slug); }
export function projectCategoryFromSlug(slug:string){ return PROJECT_CATEGORY_META.find(x=>x.slug===slug); }
export function productCategorySlug(name?:string|null){ return PRODUCT_CATEGORY_META.find(x=>x.name===name)?.slug || ''; }
export function projectCategorySlug(name?:string|null){ return PROJECT_CATEGORY_META.find(x=>x.name===name)?.slug || ''; }
