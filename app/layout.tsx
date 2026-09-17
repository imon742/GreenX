import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://green-x-lake.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:{default:'Greenex Power Engineering',template:'%s | Greenex'},
  description:'Sustainable and innovative solar, generator, lift, electrical engineering and maintenance solutions in Bangladesh.',
  icons:{icon:'/icon.png',apple:'/apple-icon.png'},
  openGraph:{
    type:'website',
    locale:'en_BD',
    siteName:'Greenex Power Engineering',
    title:'Greenex Power Engineering',
    description:'Sustainable & Innovative Engineering Solutions for Bangladesh.',
    images:[{url:'/opengraph-image',width:1200,height:630,alt:'Greenex Power Engineering'}]
  },
  twitter:{card:'summary_large_image',title:'Greenex Power Engineering',description:'Sustainable & Innovative Engineering Solutions for Bangladesh.',images:['/opengraph-image']}
};

export const viewport: Viewport = { width:'device-width', initialScale:1, themeColor:'#0D1F1A' };

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><head><link rel="preconnect" href="https://images.pexels.com"/><link rel="preconnect" href="https://res.cloudinary.com"/></head><body>{children}</body></html>;
}
