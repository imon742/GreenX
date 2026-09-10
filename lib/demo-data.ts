import type { Client, Product, Project, Service, SiteSettings } from './types';
import {
  PHOTO_ELECTRICAL,
  PHOTO_ELEVATOR,
  PHOTO_ELEVATOR_INTERIOR,
  PHOTO_GENERATOR,
  PHOTO_MAINTENANCE,
  PHOTO_SOLAR_BD,
  PHOTO_SOLAR_FACTORY,
  PHOTO_SOLAR_ROOFTOP,
} from './visuals';

export const defaultSettings: SiteSettings = {
  site_name: 'Green X Power Engineering',
  tagline: 'Powering the Future, Sustainably.',
  hero_title: "Powering Bangladesh's Industrial Future, Sustainably.",
  hero_subtitle: 'End-to-end solar, backup power, lift and electrical engineering solutions for resilient commercial and industrial operations across Bangladesh.',
  hero_image_url: PHOTO_SOLAR_BD,
  phone: '01717202172',
  whatsapp: '01717202172',
  email: null,
  address: 'Spring Rahmat-e Tuba Complex, House-132 (3rd Floor), Block-A, Road-2, Section-12, Mirpur, Dhaka-1216, Bangladesh.',
  about_short: 'Practical engineering, dependable equipment and lifecycle support for modern facilities.',
  about_full: 'Green X Power Engineering supports clients from consultation and site survey through design, supply, installation, commissioning and maintenance. Our focus is reliable power, safe engineering execution, sustainable energy and responsive after-sales support.',
  mission: 'Deliver high-quality, safe and efficient power solutions tailored to client needs while advancing sustainable energy use.',
  vision: 'Lead with sustainable and innovative power solutions for a reliable, green future.',
  years_experience: null,
  total_projects: null,
  total_clients: null
};

export const demoServices: Service[] = [
  { title:'Solar Energy', slug:'solar-energy', short_description:'Commercial rooftop, hybrid and off-grid solar designed around real site demand.', description:'Site survey, load review, system sizing, equipment selection, installation, testing and O&M for commercial, industrial and residential solar applications.', image_url:PHOTO_SOLAR_FACTORY, features:['Rooftop solar PV','Hybrid & off-grid systems','Battery storage integration','Solar generator solutions','Testing & commissioning','Operations & maintenance'], featured:true, published:true, display_order:1 },
  { title:'Generator & Backup Power', slug:'generator-backup-power', short_description:'Standby and prime power systems for business-critical operations.', description:'Generator sizing, supply, installation, ATS and backup integration, commissioning and preventive maintenance.', image_url:PHOTO_GENERATOR, features:['Diesel generator systems','ATS & changeover','UPS/IPS integration','Load assessment','Commissioning','Preventive maintenance'], featured:true, published:true, display_order:2 },
  { title:'Lift & Elevator', slug:'lift-elevator', short_description:'Passenger, hospital, cargo and building lift solutions with maintenance support.', description:'Lift planning, equipment selection, installation, modernization, testing, handover and scheduled maintenance.', image_url:PHOTO_ELEVATOR, features:['Passenger lift','Hospital lift','Cargo lift','Home lift','Modernization','AMC & maintenance'], featured:true, published:true, display_order:3 },
  { title:'Electrical Engineering', slug:'electrical-engineering', short_description:'Distribution, protection and electrical infrastructure for modern facilities.', description:'Electrical design and field implementation covering distribution, panels, protection, backup integration and system improvement.', image_url:PHOTO_ELECTRICAL, features:['LV distribution','Panels & protection','Cabling','Earthing','Power quality','Testing & handover'], featured:true, published:true, display_order:4 },
  { title:'Lightning Protection', slug:'lightning-protection', short_description:'Lightning protection, earthing and surge protection for buildings and facilities.', description:'Site assessment, protection planning, installation, earthing, surge protection, testing and maintenance.', image_url:PHOTO_ELECTRICAL, features:['Lightning protection','Earthing','Surge protection','Risk assessment','Testing','Maintenance'], featured:false, published:true, display_order:5 },
  { title:'Maintenance & Support', slug:'maintenance-support', short_description:'Preventive maintenance, repair and AMC support across critical engineering systems.', description:'Protect uptime with planned inspections, corrective service, emergency support and annual maintenance contracts.', image_url:PHOTO_MAINTENANCE, features:['Preventive maintenance','Corrective maintenance','AMC support','Emergency service','Inspection reports','Spare planning'], featured:true, published:true, display_order:6 }
];

export const demoProjects: Project[] = [
  { title:'Industrial Rooftop Solar – 250 kWp Configuration', slug:'industrial-rooftop-solar-250kwp', category:'Solar Energy', client_name:'Industrial application', location:'Bangladesh', capacity:'250 kWp', short_description:'Commercial rooftop solar configuration focused on daytime load reduction, safe grid integration and maintainable design.', description:'An illustrative Green X engineering configuration for an industrial rooftop solar system shaped around daytime energy demand, roof availability, grid conditions and future maintenance access.', cover_image_url:PHOTO_SOLAR_ROOFTOP, services_provided:['Site survey','System design','Equipment selection','Installation','Testing & commissioning'], technical_details:{Capacity:'250 kWp',Application:'Industrial rooftop',Configuration:'Grid-tied / hybrid-ready'}, featured:true, published:true, demo:true, display_order:1 },
  { title:'Commercial Standby Power – 250 kVA Configuration', slug:'commercial-standby-power-250kva', category:'Generator & Backup Power', client_name:'Commercial application', location:'Bangladesh', capacity:'250 kVA', short_description:'Standby-power configuration with generator sizing, ATS integration and maintainable distribution planning.', description:'An illustrative commercial standby-power configuration structured around essential-load continuity, automatic changeover, safe distribution and long-term service access.', cover_image_url:PHOTO_GENERATOR, services_provided:['Load assessment','Generator selection','ATS integration','Installation','Commissioning'], technical_details:{Capacity:'250 kVA class',Application:'Commercial standby power',Control:'Automatic transfer'}, featured:true, published:true, demo:true, display_order:2 },
  { title:'Passenger Lift – 10 Person Building Configuration', slug:'passenger-lift-10-person', category:'Lift & Elevator', client_name:'Building application', location:'Bangladesh', capacity:'10 Persons', short_description:'Passenger-lift configuration covering planning, installation, testing, handover and maintenance readiness.', description:'An illustrative passenger-lift scope for residential and commercial buildings, focused on suitable capacity, smooth operation, safety and lifecycle support.', cover_image_url:PHOTO_ELEVATOR, services_provided:['Planning','Supply','Installation','Testing','Handover','AMC planning'], technical_details:{Capacity:'10 persons',Application:'Residential / commercial',Drive:'VVVF configuration'}, featured:true, published:true, demo:true, display_order:3 },
  { title:'Electrical Distribution & Control Upgrade', slug:'electrical-distribution-control-upgrade', category:'Electrical Engineering', client_name:'Industrial facility', location:'Bangladesh', capacity:'Custom Scope', short_description:'Distribution and control-panel improvement focused on safety, reliability and future expansion.', description:'An illustrative electrical engineering scope covering assessment, panel improvement, protection coordination and testing for a growing industrial facility.', cover_image_url:PHOTO_ELECTRICAL, services_provided:['Site assessment','Panel design','Protection review','Installation','Testing'], technical_details:{Application:'Industrial distribution',Scope:'LV panels & controls',Priority:'Reliability & safety'}, featured:false, published:true, demo:true, display_order:4 }
];

export const demoProducts: Product[] = [
  { name:'Portable Solar Power Station 600W', slug:'portable-solar-power-station-600w', category:'Solar Generators', brand:'Green X Selection', short_description:'Compact solar-ready backup power for field teams, small offices and emergency use.', description:'A portable solar generator class combining battery storage, inverter output and solar charging capability for practical backup applications.', image_url:PHOTO_SOLAR_BD, specifications:{Output:'600 W class',Battery:'LiFePO4 configuration',Charging:'AC + solar',Application:'Portable backup'}, featured:true, published:true, demo:true, display_order:1 },
  { name:'Mono PV Module 550W', slug:'mono-pv-module-550w', category:'Solar Panels', brand:'Project Selection', short_description:'High-output mono PV module format for rooftop and commercial solar projects.', description:'A representative high-power PV module class suitable for commercial rooftop and ground-mounted systems.', image_url:PHOTO_SOLAR_ROOFTOP, specifications:{RatedPower:'550 W class',Technology:'Mono crystalline',Application:'Commercial / industrial PV',Warranty:'Model dependent'}, featured:true, published:true, demo:true, display_order:2 },
  { name:'Hybrid Solar Inverter 10kW', slug:'hybrid-solar-inverter-10kw', category:'Inverters', brand:'Project Selection', short_description:'Hybrid inverter class for solar, battery and grid-connected applications.', description:'A representative hybrid inverter class for projects requiring PV generation, battery storage and grid interaction.', image_url:PHOTO_ELECTRICAL, specifications:{Output:'10 kW class',Topology:'Hybrid',Battery:'Compatible configuration',Monitoring:'Model dependent'}, featured:true, published:true, demo:true, display_order:3 },
  { name:'LiFePO4 Energy Storage 5.12kWh', slug:'lifepo4-energy-storage-5-12kwh', category:'Battery & Storage', brand:'Project Selection', short_description:'Modular lithium storage for solar backup and energy management applications.', description:'A representative LiFePO4 storage module designed for long-cycle backup and solar integration.', image_url:PHOTO_SOLAR_FACTORY, specifications:{Energy:'5.12 kWh class',Chemistry:'LiFePO4',Application:'Solar / backup',Expansion:'Model dependent'}, featured:true, published:true, demo:true, display_order:4 },
  { name:'Silent Diesel Generator 50kVA', slug:'silent-diesel-generator-50kva', category:'Generators', brand:'Project Selection', short_description:'Silent standby generator class for commercial and building backup applications.', description:'A representative silent-type generator configuration for standby power projects.', image_url:PHOTO_GENERATOR, specifications:{Standby:'50 kVA class',Enclosure:'Silent canopy',Control:'Auto-start capable',Application:'Commercial backup'}, featured:false, published:true, demo:true, display_order:5 },
  { name:'Passenger Lift P10', slug:'passenger-lift-p10', category:'Lift & Elevator', brand:'Green X Selection', short_description:'Passenger-lift configuration for residential and commercial buildings.', description:'A representative lift product configuration supported by installation, commissioning and maintenance services.', image_url:PHOTO_ELEVATOR_INTERIOR, specifications:{Capacity:'10 persons',Drive:'VVVF',Door:'Automatic',Service:'Installation + AMC'}, featured:false, published:true, demo:true, display_order:6 },
  { name:'Online UPS 10kVA', slug:'online-ups-10kva', category:'UPS & Power Backup', brand:'Project Selection', short_description:'Online double-conversion UPS class for IT and other critical loads.', description:'A representative UPS class for applications where clean and continuous power is essential.', image_url:PHOTO_MAINTENANCE, specifications:{Capacity:'10 kVA',Topology:'Online double conversion',Application:'IT / critical load',Battery:'External bank compatible'}, featured:false, published:true, demo:true, display_order:7 }
];

export const demoClients: Client[] = [
  {name:'Industrial Manufacturing', published:true, display_order:1},
  {name:'Commercial Buildings', published:true, display_order:2},
  {name:'Residential Developments', published:true, display_order:3},
  {name:'Infrastructure & Institutions', published:true, display_order:4}
];
