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
    case 'whatsapp': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.52 0 .18 5.33.18 11.9c0 2.1.55 4.14 1.58 5.94L0 24l6.33-1.66a11.9 11.9 0 0 0 5.75 1.48h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.44Zm-8.44 18.3h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.76.99 1-3.67-.23-.37A9.86 9.86 0 0 1 2.2 11.9c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.12 1.03 6.98 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.44 9.9-9.9 9.9Zm5.43-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.38-.27.3-1.04 1.01-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.11.58-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>;
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
