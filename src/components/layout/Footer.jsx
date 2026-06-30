import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_LOGO_URL, FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0c0c0e] border-t border-white/6 py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Branding + Logo */}
          <div className="flex items-center gap-4">
            <Image
              src={SITE_LOGO_URL}
              alt={SITE_NAME}
              width={32}
              height={32}
              className="object-contain"
            />
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold text-lg">{SITE_NAME}</h3>
              <p className="text-slate-600 text-xs">
                &copy; 2026 {SITE_NAME}. All rights reserved.
                <span className="mx-2">•</span>
                Built for ultimate streaming experience.
              </p>
            </div>
          </div>

          {/* Links */}
          <ul className="flex flex-wrap justify-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile spacing for fixed navbar */}
      <div className="h-16 md:h-0"></div>
    </footer>
  );
}
