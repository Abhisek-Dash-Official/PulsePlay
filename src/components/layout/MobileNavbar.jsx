"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MOBILE_NAV_LINKS } from "@/lib/constants";

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
      style={{
        background: "rgba(7,7,15,.92)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,.07)",
        paddingBottom: "env(safe-area-inset-bottom,12px)",
      }}
    >
      {/* Brand Accent */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg,#06B6D4,#7C3AED)",
        }}
      />

      <div className="flex items-center justify-around px-2 py-2">
        {MOBILE_NAV_LINKS.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center py-1"
            >
              {/* Active Dot */}
              <div className="mb-1 h-1 w-1">
                {active && (
                  <span
                    className="block h-1 w-1 rounded-full"
                    style={{
                      background: "linear-gradient(90deg,#06B6D4,#7C3AED)",
                      boxShadow: "0 0 10px rgba(6,182,212,.5)",
                    }}
                  />
                )}
              </div>
              <Icon
                size={20}
                className="transition-all duration-200"
                style={{
                  color: active ? "#06B6D4" : "rgba(255,255,255,.3)",

                  filter: active
                    ? "drop-shadow(0 0 6px rgba(6,182,212,.6))"
                    : "none",
                }}
              />
              <span
                className="mt-1 text-[10px] font-medium tracking-wide"
                style={
                  active
                    ? {
                        background: "linear-gradient(90deg,#06B6D4,#7C3AED)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : {
                        color: "rgba(255,255,255,.3)",
                      }
                }
              >
                {item.name}
              </span>{" "}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
