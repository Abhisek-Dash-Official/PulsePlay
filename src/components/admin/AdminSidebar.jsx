"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import {
  SITE_NAME,
  SITE_LOGO_URL,
  ADMIN_NAV_LINKS,
  getAvatarImgUrl,
} from "@/lib/constants";
import { useAdminStore } from "@/store/adminStore";
import { toast } from "react-toastify";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const adminData = useAdminStore((state) => state.adminData);
  const clearAdminData = useAdminStore((state) => state.clearAdminData);

  const handleLogout = async () => {
    const logoutRequest = fetch("/api/admin/logout", { method: "POST" }).then(
      (res) => {
        if (!res.ok) throw new Error("Logout failed");
        return res;
      },
    );

    toast.promise(logoutRequest, {
      pending: "Logging out securely...",
      success: "Command Center Disconnected 🔒",
      error: "Failed to disconnect. Try again.",
    });

    try {
      await logoutRequest;

      clearAdminData();
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout process error:", error);
    }
  };

  return (
    <>
      {/* --- MOBILE TOP NAVBAR --- */}
      <div className="md:hidden flex items-center justify-between px-4 h-16 bg-slate-900 border-b border-slate-800 sticky top-0 z-40 w-full shrink-0">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="p-1 bg-slate-950 rounded-md border border-slate-800">
            <Image src={SITE_LOGO_URL} alt="Logo" width={24} height={24} />
          </div>
          <span className="font-bold text-base text-white tracking-tight">
            {SITE_NAME}
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors border border-slate-700"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* --- MOBILE OVERLAY BACKGROUND --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- THE SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800/60">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="p-1.5 bg-slate-950 rounded-lg border border-slate-800">
              <Image src={SITE_LOGO_URL} alt="Logo" width={28} height={28} />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              {SITE_NAME}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
                Admin
              </span>
            </span>
          </Link>
          {/* Close button for mobile */}
          <button
            className="md:hidden p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {ADMIN_NAV_LINKS.map((link) => {
            const Icon = link.icon;
            // Check if current route matches the link
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin" // For Dashboard
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`); // For other links

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-slate-800/80 text-cyan-400 border border-slate-700/50 shadow-inner"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}`}
                />
                <span className="font-medium text-sm">{link.name}</span>

                {/* Glowing active indicator */}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Profile & Logout Section */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-900/50">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
              <Image
                src={getAvatarImgUrl(adminData?.avatar_id)}
                alt="Admin Avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {adminData?.username || "The Admin"}
              </p>
              <p className="text-xs text-slate-500 truncate capitalize">
                {adminData?.role || "Admin"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 text-sm font-medium transition-colors border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
