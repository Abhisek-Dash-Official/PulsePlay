"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_LOGO_URL } from "@/lib/constants";
import SearchBar from "@/components/ui/SearchBar";
import UserDropdown from "@/components/layout/UserDropdown";
import DesktopNavbar from "@/components/layout/DesktopNavbar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for adding dark background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-xl shadow-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      {/* Top Bar */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0 group"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-105">
              <Image
                src={SITE_LOGO_URL}
                alt={SITE_NAME}
                fill
                className="object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight hidden sm:block">
              {SITE_NAME}
            </span>
          </Link>

          {/* Search Bar (Hidden on very small screens, takes remaining space on tablet/desktop) */}
          <div className="flex-1 max-w-xl hidden sm:flex justify-center px-4">
            <SearchBar />
          </div>

          {/* User Profile / Auth */}
          <div className="flex items-center shrink-0">
            <UserDropdown />
          </div>
        </div>

        {/* Mobile Search Bar (Shows below the top bar on mobile only) */}
        <div className="sm:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Bottom Bar: Desktop Navigation */}
      <DesktopNavbar />
    </header>
  );
}
