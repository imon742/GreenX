import AdminShell from '@/components/AdminShell'; import { requireAdminPage } from '@/lib/auth';
export default async function AdminLayout({children}:{children:React.ReactNode}){const user=await requireAdminPage();return <AdminShell email={user.email||'admin'}>{children}</AdminShell>}
