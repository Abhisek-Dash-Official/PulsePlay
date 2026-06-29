"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAvatarImgUrl } from "@/lib/constants";

export default function AdminSettings() {
    const router = useRouter();

    const [profile, setProfile] = useState({ username: "", email: "", avatar_id: "" });
    const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

    const [loading, setLoading] = useState(true);
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const availableAvatars = ["admin", ...Array.from({ length: 17 }, (_, i) => String(i + 1))];

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const res = await fetch("/api/admin/profile");
                const data = await res.json();

                if (data.success) {
                    setProfile({
                        username: data.user.username,
                        email: data.user.email,
                        avatar_id: data.user.avatar_id,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminProfile();
    }, []);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        setMessage({ type: "", text: "" });

        try {
            const res = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...profile, role: "admin" }),
            });
            const data = await res.json();

            if (data.success) {
                setMessage({ type: "success", text: "Profile updated successfully!" });
            } else {
                setMessage({ type: "error", text: data.error || "Failed to update profile." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong." });
        } finally {
            setSavingProfile(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessage({ type: "error", text: "New passwords do not match!" });
            return;
        }

        setSavingPassword(true);
        setMessage({ type: "", text: "" });

        try {
            const res = await fetch("/api/user/password", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword,
                    role: "admin",
                }),
            });
            const data = await res.json();

            if (data.success) {
                setMessage({ type: "success", text: "Password changed successfully!" });
                setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                setMessage({ type: "error", text: data.error || "Failed to change password." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong." });
        } finally {
            setSavingPassword(false);
        }
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const res = await fetch("/api/admin/logout", {
                method: "POST",
            });

            if (res.ok) {
                router.push("/admin/login");
                router.refresh();
            } else {
                setMessage({ type: "error", text: "Failed to sign out." });
                setIsLoggingOut(false);
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong during sign out." });
            setIsLoggingOut(false);
        }
    };

    if (loading) {
        return <div className="text-white p-8 flex items-center justify-center min-h-screen">Loading Command Center...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-300 p-4 sm:p-6 lg:p-8">

            {/* Header */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Settings</h1>
                    <p className="text-sm sm:text-base text-slate-400 mt-2">Manage your command center profile and security credentials.</p>
                </div>

                {/* Sign Out Button */}
                <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 whitespace-nowrap w-full sm:w-auto"
                >
                    {isLoggingOut ? (
                        "Signing out..."
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Sign Out
                        </>
                    )}
                </button>
            </div>

            {/* Alert Message */}
            {message.text && (
                <div className={`mb-6 p-4 rounded-lg text-sm sm:text-base font-medium border ${message.type === 'success' ? 'bg-green-900/20 border-green-500/50 text-green-400' : 'bg-red-900/20 border-red-500/50 text-red-400'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

                {/* Section 1: Basic Info & Avatar */}
                <div className="bg-[#1e293b] rounded-xl p-5 sm:p-6 border border-slate-800 shadow-xl">
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-5 sm:mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-5 sm:h-6 bg-cyan-500 rounded-full inline-block"></span>
                        Profile Information
                    </h2>

                    <form onSubmit={handleProfileSubmit} className="space-y-5 sm:space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-3">Choose Avatar</label>
                            <div className="flex flex-wrap gap-2 sm:gap-3 items-center max-h-60 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                                {availableAvatars.map((id) => (
                                    <div
                                        key={id}
                                        onClick={() => setProfile({ ...profile, avatar_id: id })}
                                        className={`cursor-pointer rounded-full p-1 transition-all duration-200 ${profile.avatar_id === id ? 'ring-2 ring-cyan-500 bg-cyan-900/30 scale-105' : 'hover:bg-slate-700 opacity-60 hover:opacity-100 hover:scale-105'}`}
                                    >
                                        <img
                                            src={getAvatarImgUrl(id)}
                                            alt={`Avatar ${id}`}
                                            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full object-cover shadow-md"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Username</label>
                            <input
                                type="text"
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={savingProfile}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base transition-colors disabled:opacity-50"
                        >
                            {savingProfile ? 'Saving...' : 'Update Profile'}
                        </button>
                    </form>
                </div>

                {/* Section 2: Password Change */}
                <div className="bg-[#1e293b] rounded-xl p-5 sm:p-6 border border-slate-800 shadow-xl h-fit">
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-5 sm:mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-5 sm:h-6 bg-rose-500 rounded-full inline-block"></span>
                        Security Settings
                    </h2>

                    <form onSubmit={handlePasswordSubmit} className="space-y-5 sm:space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Current Password</label>
                            <input
                                type="password"
                                value={passwords.currentPassword}
                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">New Password</label>
                            <input
                                type="password"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={savingPassword}
                            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base transition-colors disabled:opacity-50"
                        >
                            {savingPassword ? 'Updating...' : 'Change Password'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}