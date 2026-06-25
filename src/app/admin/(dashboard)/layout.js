import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
            {/* Sidebar Component */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}