"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { SITE_NAME, SITE_LOGO_URL } from "@/lib/constants";

import SearchBar from "@/components/ui/SearchBar";
import UserDropdown from "@/components/layout/UserDropdown";
import DesktopNavbar from "@/components/layout/DesktopNavbar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: "rgba(7,7,15,.88)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,.06)",
              boxShadow: "0 4px 30px rgba(0,0,0,.5)",
            }
          : {}
      }
    >
      {/* Top Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-18 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div
            className="relative h-9 w-9 transition-transform duration-300 group-hover:scale-110"
            style={{
              filter: "drop-shadow(0 0 12px rgba(6,182,212,.4))",
            }}
          >
            <Image
              src={SITE_LOGO_URL}
              alt={SITE_NAME}
              fill
              priority
              className="object-contain"
            />
          </div>

          <span className="hidden text-xl font-bold tracking-tight text-white sm:block">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="mx-8 hidden flex-1 justify-center md:flex">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        {/* User */}
        <div className="flex shrink-0 items-center">
          <UserDropdown />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-white/4 px-4 pb-4 md:hidden">
        <SearchBar />
      </div>

      {/* Desktop Navigation */}
      <DesktopNavbar />
    </header>
  );
}
