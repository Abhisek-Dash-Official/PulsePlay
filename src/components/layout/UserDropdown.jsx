"use client";
import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import {
  User,
  Heart,
  ListVideo,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useUserStore } from "@/store/userStore";
import { getAvatarImgUrl } from "@/lib/constants";

export default function UserDropdown() {
  const router = useRouter();

  const { userData, clearUserData } = useUserStore();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    clearUserData();
    setOpen(false);
    router.push("/login");
  };

  if (!userData) {
    return (
      <Link
        href="/login"
        className="rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
        style={{
          background: "linear-gradient(90deg,#06B6D4,#7C3AED)",
          boxShadow: "0 4px 18px rgba(124,58,237,.35)",
        }}
      >
        Sign In
      </Link>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Avatar Trigger */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="group flex items-center gap-2"
      >
        <div
          className="rounded-full p-[1.5px] transition-all duration-300 group-hover:scale-105"
          style={{
            background: "linear-gradient(135deg,#06B6D4,#7C3AED)",
            boxShadow: open
              ? "0 0 18px rgba(6,182,212,.35)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
        >
          <div className="overflow-hidden rounded-full bg-[#07070F]">
            <Image
              src={getAvatarImgUrl(userData.avatar_id)}
              alt={userData.username}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`hidden text-white/50 transition-all duration-300 md:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-4 w-55 overflow-hidden rounded-2xl border z-50"
          style={{
            background: "rgba(10,10,18,.96)",
            backdropFilter: "blur(24px)",
            borderColor: "rgba(255,255,255,.08)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,.6),0 0 0 1px rgba(6,182,212,.08)",
            animation: "dropdownIn .18s ease-out",
          }}
        >
          <style>{`
            @keyframes dropdownIn{
              from{
                opacity:0;
                transform:translateY(-8px);
              }
              to{
                opacity:1;
                transform:translateY(0);
              }
            }
          `}</style>

          {/* Header */}

          <div className="flex items-center gap-3 px-4 py-4">
            <div
              className="rounded-full p-[1.5px]"
              style={{
                background: "linear-gradient(135deg,#06B6D4,#7C3AED)",
              }}
            >
              <div className="overflow-hidden rounded-full bg-[#07070F]">
                <Image
                  src={getAvatarImgUrl(userData.avatar_id)}
                  alt={userData.username}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {userData.username}
              </p>

              <span
                className="mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium"
                style={{
                  color: "#06B6D4",
                  background: "rgba(6,182,212,.12)",
                  borderColor: "rgba(6,182,212,.20)",
                }}
              >
                User
              </span>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,.06)",
            }}
          />

          {/* Menu */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-white/5"
            >
              <User size={16} className="text-cyan-400" />

              <span className="text-white/65 transition-colors duration-150 hover:text-white">
                My Profile
              </span>
            </Link>

            <Link
              href="/watchlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-white/5"
            >
              <ListVideo size={16} className="text-cyan-400" />

              <span className="text-white/65">Watchlist</span>
            </Link>

            <Link
              href="/favourites"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-white/5"
            >
              <Heart size={16} className="text-cyan-400" />

              <span className="text-white/65">Favourites</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-white/5"
            >
              <Settings size={16} className="text-cyan-400" />

              <span className="text-white/65">Settings</span>
            </Link>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,.05)",
            }}
          />

          {/* Logout */}
          <div className="py-2">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 hover:bg-red-500/10"
            >
              <LogOut size={16} className="text-red-400" />

              <span
                style={{
                  color: "rgba(248,113,113,.85)",
                }}
              >
                Sign Out
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
