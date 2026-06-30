"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon, Heart, ListVideo } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { getAvatarImgUrl } from "@/lib/constants";

export default function UserDropdown() {
  const { userData, clearUserData } = useUserStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear Zustand state and redirect
    clearUserData();
    setIsOpen(false);
    router.push("/login");
  };

  // If not logged in, show Sign In button
  if (!userData) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-full transition-colors shadow-lg shadow-cyan-500/20"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 hover:border-cyan-400 transition-colors">
          <Image
            src={getAvatarImgUrl(userData.avatar_id)}
            alt={userData.username}
            width={36}
            height={36}
            className="object-cover"
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-[#121217]/95 backdrop-blur-xl border border-white/8 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-white/5 bg-white/2">
            <p className="text-sm font-semibold text-white truncate">
              {userData.username}
            </p>
            <p className="text-xs text-slate-400 truncate capitalize">
              {userData.role || "User"}
            </p>
          </div>

          {/* Links */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/4 transition-colors"
            >
              <UserIcon className="w-4 h-4 text-cyan-400" />
              My Profile
            </Link>
            <Link
              href="/watchlist"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/4 transition-colors"
            >
              <ListVideo className="w-4 h-4 text-cyan-400" />
              Watchlist
            </Link>
            <Link
              href="/favourites"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/4 transition-colors"
            >
              <Heart className="w-4 h-4 text-cyan-400" />
              Favourites
            </Link>
          </div>

          {/* Sign Out */}
          <div className="py-2 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
