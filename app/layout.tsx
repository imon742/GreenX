import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://green-x-lake.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:{default:'Green X Power Engineering',template:'%s | Green X'},
  description:'Solar, generator, lift, electrical engineering and maintenance solutions in Bangladesh.',
  icons:{icon:'/assets/mark.svg'},
  openGraph:{
    type:'website',
    locale:'en_BD',
    siteName:'Green X Power Engineering',
    title:'Green X Power Engineering',
    description:'Reliable power, smarter energy and stronger infrastructure for Bangladesh.',
    images:[{url:'/opengraph-image',width:1200,height:630,alt:'Green X Power Engineering'}]
  },
  twitter:{card:'summary_large_image',title:'Green X Power Engineering',description:'Reliable power, smarter energy and stronger infrastructure for Bangladesh.',images:['/opengraph-image']}
};

export const viewport: Viewport = { width:'device-width', initialScale:1, themeColor:'#07131a' };

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><head><link rel="preconnect" href="https://images.pexels.com"/><link rel="preconnect" href="https://res.cloudinary.com"/></head><body>{children}</body></html>;
}
