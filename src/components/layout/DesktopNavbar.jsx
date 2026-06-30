"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export default function DesktopNavbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block w-full border-t border-white/4 bg-[#050505]/40 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <ul className="flex items-center justify-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 py-3 text-sm font-medium transition-all duration-300 border-b-2 ${
                    isActive
                      ? "border-cyan-500 text-white"
                      : "border-transparent text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
