export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100 text-black">
            {/* TODO: Import AdminSidebar Component here later */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                {/* Placeholder for Sidebar */}
                <div className="p-4 font-bold text-xl">Admin Panel</div>
            </aside>

            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}