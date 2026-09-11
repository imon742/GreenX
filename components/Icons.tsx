import type { SVGProps } from 'react';

type IconName =
  | 'solar' | 'generator' | 'lift' | 'electrical' | 'lightning' | 'maintenance'
  | 'battery' | 'inverter' | 'ups' | 'arrow' | 'check' | 'phone' | 'mail'
  | 'location' | 'whatsapp' | 'download' | 'menu' | 'close' | 'building' | 'factory' | 'home';

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export default function Icon({ name, ...props }: Props) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (name) {
    case 'solar': return <svg {...common} {...props}><circle cx="18" cy="5" r="2.4"/><path d="M4 10.5h11l2 8H2l2-8Z"/><path d="M5.5 14h10M8 10.5l-1 8M12 10.5l1 8M18 1.5v1M18 7.5v1M14.5 5h1M20.5 5h1"/></svg>;
    case 'generator': return <svg {...common} {...props}><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="8" cy="12" r="2.3"/><path d="M13 10h5M13 13h3M5 18v2M19 18v2M6 6V4h4v2"/></svg>;
    case 'lift': return <svg {...common} {...props}><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M12 3v18M8 8l2-2 2 2M16 16l-2 2-2-2"/></svg>;
    case 'electrical': return <svg {...common} {...props}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 6 9.5 12H13l-1 6 3.5-7H12l0-5Z"/></svg>;
    case 'lightning': return <svg {...common} {...props}><path d="M13 2 5 14h6l-1 8 9-13h-6l0-7Z"/><path d="M4 21h16"/></svg>;
    case 'maintenance': return <svg {...common} {...props}><path d="M14.8 6.2a4.2 4.2 0 0 0-5.1 5.1L3 18l3 3 6.7-6.7a4.2 4.2 0 0 0 5.1-5.1l-2.7 2.7-2.9-.8-.8-2.9 2.7-2.7.7.7Z"/></svg>;
    case 'battery': return <svg {...common} {...props}><rect x="4" y="7" width="15" height="10" rx="2"/><path d="M19 10h2v4h-2M8 12h7M11.5 8.5v7"/></svg>;
    case 'inverter': return <svg {...common} {...props}><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M7 13c1.3-3 2.7-3 4 0s2.7 3 4 0 2.7-3 4 0M8 8h8"/></svg>;
    case 'ups': return <svg {...common} {...props}><rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="8" r="2"/><path d="M9 14h6M9 17h6"/></svg>;
    case 'arrow': return <svg {...common} {...props}><path d="M5 12h14M14 7l5 5-5 5"/></svg>;
    case 'check': return <svg {...common} {...props}><path d="m5 12 4 4L19 6"/></svg>;
    case 'phone': return <svg {...common} {...props}><path d="M7 3h3l1.2 4-2 1.5a15 15 0 0 0 6.3 6.3l1.5-2L21 14v3c0 2-2 4-4 4C9.3 20.5 3.5 14.7 3 7c0-2 2-4 4-4Z"/></svg>;
    case 'mail': return <svg {...common} {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
    case 'location': return <svg {...common} {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'whatsapp': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>;
    case 'download': return <svg {...common} {...props}><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>;
    case 'menu': return <svg {...common} {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'close': return <svg {...common} {...props}><path d="m6 6 12 12M18 6 6 18"/></svg>;
    case 'building': return <svg {...common} {...props}><path d="M4 21V5l8-3v19M12 8h8v13M7 8h2M7 12h2M7 16h2M15 11h2M15 15h2M15 19h2"/></svg>;
    case 'factory': return <svg {...common} {...props}><path d="M3 21V10l6 3V9l6 4V6l6 4v11H3Z"/><path d="M7 17h2M12 17h2M17 17h2"/></svg>;
    case 'home': return <svg {...common} {...props}><path d="m3 11 9-8 9 8v10h-6v-6H9v6H3V11Z"/></svg>;
  }
}

export function serviceIconName(slug: string): IconName {
  if (slug === 'solar-energy') return 'solar';
  if (slug === 'generator-backup-power') return 'generator';
  if (slug === 'lift-elevator') return 'lift';
  if (slug === 'electrical-engineering') return 'electrical';
  if (slug === 'lightning-protection') return 'lightning';
  return 'maintenance';
}

export function productIconName(slug: string): IconName {
  if (slug === 'solar-generators') return 'solar';
  if (slug === 'solar-panels') return 'solar';
  if (slug === 'inverters') return 'inverter';
  if (slug === 'battery-storage') return 'battery';
  if (slug === 'generators') return 'generator';
  if (slug === 'lift-elevator') return 'lift';
  return 'ups';
}
