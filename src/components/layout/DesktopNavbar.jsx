"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_LINKS } from "@/lib/constants";

export default function DesktopNavbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex justify-center border-t border-white/5">
      <ul className="flex items-center justify-center gap-1 px-4">
        {NAV_LINKS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className="group flex flex-col items-center px-4 py-3"
              >
                <div className="flex items-center gap-2 transition-all duration-200">
                  <Icon
                    size={18}
                    className={`transition-all duration-200 ${
                      isActive
                        ? "text-cyan-400"
                        : "text-white/45 group-hover:text-cyan-400"
                    }`}
                    style={
                      isActive
                        ? {
                            filter: "drop-shadow(0 0 8px rgba(6,182,212,.45))",
                          }
                        : undefined
                    }
                  />

                  <span
                    className="text-sm font-medium tracking-tight transition-all duration-200"
                    style={
                      isActive
                        ? {
                            background:
                              "linear-gradient(90deg,#06B6D4,#7C3AED)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }
                        : {
                            color: "rgba(255,255,255,.45)",
                          }
                    }
                  >
                    {item.name}
                  </span>
                </div>

                {/* Active Underline */}
                <span
                  className={`mt-2 h-0.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-full scale-100 opacity-100"
                      : "w-full scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                  }`}
                  style={{
                    background: "linear-gradient(90deg,#06B6D4,#7C3AED)",
                    transformOrigin: "center",
                  }}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
