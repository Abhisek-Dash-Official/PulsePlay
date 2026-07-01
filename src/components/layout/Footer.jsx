"use client";
import Link from "next/link";
import Image from "next/image";

import { MessageCircle } from "lucide-react";
import { XIcon, GithubIcon } from "@/lib/customIcons";

import {
  SITE_NAME,
  SITE_LOGO_URL,
  exploreLinks,
  accountLinks,
  companyLinks,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="mt-24 border-t"
      style={{
        background: "rgba(4,4,10,.95)",
        borderColor: "rgba(255,255,255,.06)",
        boxShadow:
          "0 -1px 40px rgba(6,182,212,.04),0 -1px 80px rgba(124,58,237,.03)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={SITE_LOGO_URL}
                alt={SITE_NAME}
                width={40}
                height={40}
                className="drop-shadow-[0_0_12px_rgba(6,182,212,.35)]"
              />

              <span className="text-xl font-bold text-white">{SITE_NAME}</span>
            </Link>

            <p className="mt-4 text-sm text-white/40">
              Discover. Stream. Experience.
            </p>

            {/* Social */}

            <div className="mt-6 flex gap-3">
              {[
                {
                  href: "#",
                  icon: GithubIcon,
                },
                {
                  href: "#",
                  icon: XIcon,
                },
                {
                  href: "#",
                  icon: MessageCircle,
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 hover:scale-105"
                    style={{
                      borderColor: "rgba(255,255,255,.08)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg,rgba(6,182,212,.15),rgba(124,58,237,.15))";

                      e.currentTarget.style.borderColor = "rgba(6,182,212,.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";

                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,.08)";
                    }}
                  >
                    <Icon size={18} className="text-white/70" />
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Explore */}
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/25">
              Explore
            </h4>

            <ul className="space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/45 transition-all duration-200 hover:pl-1 hover:text-white/85"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>{" "}
          {/* Account */}
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/25">
              Account
            </h4>

            <ul className="space-y-3">
              {accountLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/45 transition-all duration-200 hover:pl-1 hover:text-white/85"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/25">
              Company
            </h4>

            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/45 transition-all duration-200 hover:pl-1 hover:text-white/85"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-center md:flex-row md:text-left"
          style={{
            borderColor: "rgba(255,255,255,.06)",
          }}
        >
          <p className="text-[13px] text-white/35">
            &copy; 2026 {SITE_NAME}. All rights reserved.
          </p>

          <p className="text-[13px] text-white/35">
            Made with ❤️ for cinema lovers
          </p>
        </div>{" "}
      </div>
    </footer>
  );
}
