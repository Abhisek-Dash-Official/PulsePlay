import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200">

            <div className="hidden lg:block h-screen sticky top-0 shrink-0">
                <AdminSidebar />
            </div>

            <main className="flex-1 h-screen overflow-y-auto">
                <div className="max-w-7xl mx-auto p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}