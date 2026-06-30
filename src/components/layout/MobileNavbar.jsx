"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_NAV_LINKS } from "@/lib/constants";

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
      {/* Gradient shadow to blend with the page */}
      <div className="absolute bottom-full left-0 w-full h-8 bg-linear-to-t from-[#09090b] to-transparent pointer-events-none" />

      <nav className="bg-[#0f0f13]/90 backdrop-blur-xl border-t border-white/8 pb-safe">
        <ul className="flex items-center justify-around px-2 py-3">
          {MOBILE_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className="flex-1">
                <Link
                  href={link.href}
                  className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <link.icon
                    className={`w-5 h-5 ${isActive ? "fill-cyan-400/20" : ""}`}
                  />
                  <span className="text-[10px] font-medium tracking-wide">
                    {link.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
