"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { UserCog, Plus, Search, Loader2, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { toast } from 'react-toastify';
import UserCard from '@/components/admin/UserCard';
import AddUserModal from '@/components/admin/AddUserModal';

export default function AdminUsersPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasNext, setHasNext] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    // Read URL params
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 6;
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const sort = searchParams.get('sort') || 'username';
    const order = searchParams.get('order') || '1';

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/users?page=${page}&limit=${limit}&search=${search}&role=${role}&sort=${sort}&order=${order}`);
            const json = await res.json();
            if (!json.success) throw new Error(json.error);
            setUsers(json.data);
            setHasNext(json.hasNext);
            setTotalCount(json.count);
        } catch (error) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, [page, search, role, sort, order]);

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        if (key !== 'page') params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <UserCog className="text-cyan-400" /> User Management
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Total Assets: {totalCount}</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all"
                >
                    <Plus size={18} /> Add New User
                </button>
            </div>

            {/* Filter, Search & Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        placeholder="Search by username or email..."
                        className="w-full bg-slate-900 border border-slate-700 pl-10 pr-4 py-2.5 rounded-xl text-sm text-white focus:border-cyan-500 outline-none"
                        onChange={(e) => updateFilter('search', e.target.value)}
                    />
                </div>

                <select
                    className="bg-slate-900 border border-slate-700 px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                    onChange={(e) => updateFilter('role', e.target.value)}
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>

                <select
                    className="bg-slate-900 border border-slate-700 px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                    onChange={(e) => updateFilter('sort', e.target.value)}
                >
                    <option value="username">Sort by Username</option>
                    <option value="email">Sort by Email</option>
                    <option value="created_at">Sort by Date Joined</option>
                </select>
                <select
                    className="bg-slate-900 border border-slate-700 px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                    value={order}
                    onChange={(e) => {
                        const order = e.target.value;
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('order', order);
                        params.set('page', '1');
                        router.push(`?${params.toString()}`);
                    }}
                >
                    <option value="1"> sort order 1 </option>
                    <option value="-1"> sort order -1 </option>
                </select>
            </div>

            {/* Users Grid */}
            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-cyan-500" size={40} /></div>
            ) : users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(user => (
                        <UserCard key={user._id} user={user} onActionSuccess={fetchUsers} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                    <p className="text-slate-500">No users found matching your criteria.</p>
                </div>
            )}

            {/* Pagination */}
            {users.length > 0 && (
                <div className="flex justify-center items-center gap-4 pt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => updateFilter('page', page - 1)}
                        className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-50"
                    >
                        <ChevronLeft />
                    </button>
                    <span className="text-sm text-slate-400">Page {page}</span>
                    <button
                        disabled={!hasNext}
                        onClick={() => updateFilter('page', page + 1)}
                        className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-50"
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}

            {showModal && (
                <AddUserModal
                    onClose={() => setShowModal(false)}
                    onSuccess={() => { fetchUsers(); setShowModal(false); }}
                />
            )}
        </div>
    );
}