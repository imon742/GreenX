import { NextResponse } from 'next/server';
export function GET() {
  return NextResponse.json({
    ok: true,
    app: 'Greenex V3',
    supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabasePublishableKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    cloudinary: Boolean(process.env.CLOUDINARY_URL),
    adminEmail: process.env.ADMIN_EMAIL || 'admin@google.com'
  });
}
