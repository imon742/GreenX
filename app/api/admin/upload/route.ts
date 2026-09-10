import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/auth';

export const runtime = 'nodejs';

type CloudinaryCredentials = {
  apiKey: string;
  apiSecret: string;
  cloudName: string;
};

function getCloudinaryCredentials(): CloudinaryCredentials {
  let raw = (process.env.CLOUDINARY_URL ?? '').trim();

  // Be forgiving if the value was copied as `CLOUDINARY_URL=cloudinary://...`
  // or was wrapped in quotes in the hosting dashboard.
  raw = raw.replace(/^['"]|['"]$/g, '').trim();
  if (raw.startsWith('CLOUDINARY_URL=')) {
    raw = raw.slice('CLOUDINARY_URL='.length).trim();
  }

  if (!raw.startsWith('cloudinary://')) {
    throw new Error("CLOUDINARY_URL must start with 'cloudinary://'");
  }

  const payload = raw.slice('cloudinary://'.length);
  const atIndex = payload.lastIndexOf('@');
  const colonIndex = payload.indexOf(':');

  if (colonIndex <= 0 || atIndex <= colonIndex + 1 || atIndex === payload.length - 1) {
    throw new Error('CLOUDINARY_URL format is invalid');
  }

  const apiKey = decodeURIComponent(payload.slice(0, colonIndex));
  const apiSecret = decodeURIComponent(payload.slice(colonIndex + 1, atIndex));
  const cloudName = payload.slice(atIndex + 1).split(/[/?#]/, 1)[0];

  if (!apiKey || !apiSecret || !cloudName) {
    throw new Error('CLOUDINARY_URL is missing a required value');
  }

  return { apiKey, apiSecret, cloudName };
}

export async function POST(req: Request) {
  const user = await requireAdminApi();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let credentials: CloudinaryCredentials;
  try {
    credentials = getCloudinaryCredentials();
  } catch (error) {
    console.error('Cloudinary configuration error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Cloudinary is not configured correctly in Vercel.' },
      { status: 500 },
    );
  }

  const form = await req.formData();
  const file = form.get('file');
  const folder = String(form.get('folder') || 'general').replace(/[^a-z0-9-_]/gi, '-');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  if (file.size > 12 * 1024 * 1024) {
    return NextResponse.json({ error: 'File must be under 12MB' }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const cloudFolder = `greenx/${folder}`;
  const signatureBase = `folder=${cloudFolder}&timestamp=${timestamp}${credentials.apiSecret}`;
  const signature = createHash('sha1').update(signatureBase).digest('hex');

  const uploadForm = new FormData();
  uploadForm.append('file', file);
  uploadForm.append('api_key', credentials.apiKey);
  uploadForm.append('timestamp', String(timestamp));
  uploadForm.append('folder', cloudFolder);
  uploadForm.append('signature', signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(credentials.cloudName)}/auto/upload`,
    { method: 'POST', body: uploadForm },
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error('Cloudinary upload failed:', result?.error?.message ?? response.statusText);
    return NextResponse.json(
      { error: result?.error?.message ?? 'Media upload failed' },
      { status: 502 },
    );
  }

  return NextResponse.json({
    url: result.secure_url,
    public_id: result.public_id,
    resource_type: result.resource_type,
  });
}
