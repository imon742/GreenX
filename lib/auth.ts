import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';
import { ADMIN_EMAIL } from './constants';

export async function getAdminUser() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return null;
  return user;
}
export async function requireAdminPage() {
  const user = await getAdminUser();
  if (!user) redirect('/admin/login');
  return user;
}
export async function requireAdminApi() {
  const user = await getAdminUser();
  return user;
}
