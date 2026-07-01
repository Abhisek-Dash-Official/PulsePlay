import Image from "next/image";
import Link from "next/link";
import { Play, Info } from "lucide-react";

export default function HeroBannerSlide({ item, isActive, isExiting }) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ease-out ${
        isActive
          ? "opacity-100 translate-x-0"
          : isExiting
            ? "opacity-0 -translate-x-6"
            : "opacity-0 translate-x-6"
      }`}
    >
      {/* IMAGE SWAP LOGIC: 
        Mobile -> Poster (Vertical)
        Desktop (md+) -> Backdrop (Horizontal)
      */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={item.poster_url}
          alt={item.title}
          fill
          priority={isActive}
          className="object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={item.backdrop_url}
          alt={item.title}
          fill
          priority={isActive}
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_top,#07070F_0%,rgba(7,7,15,0.6)_40%,transparent_100%)] md:bg-[linear-gradient(to_top,#07070F_0%,rgba(7,7,15,0.5)_35%,transparent_80%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,7,15,0.9)_0%,rgba(7,7,15,0.5)_40%,transparent_80%)] md:bg-[linear-gradient(to_right,rgba(7,7,15,0.85)_0%,rgba(7,7,15,0.3)_45%,transparent_70%)]" />

      <div className="absolute inset-0 bg-linear-to-b from-[#07070F]/60 to-transparent h-32" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-end px-6 md:px-16 pb-28">
        <div className="max-w-150">
          {/* TITLE */}
          <h1 className="text-white font-extrabold leading-[1.05] tracking-[-0.02em] text-[clamp(2.2rem,5vw,4rem)] line-clamp-2 mb-4 drop-shadow-lg">
            {item.title}
          </h1>

          {/* PLOT */}
          <p className="text-white/70 text-[15px] md:text-[16px] leading-relaxed line-clamp-2 max-w-125 mb-8 drop-shadow-md">
            {item.plot}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={item.watch_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm tracking-wide transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95"
              style={{
                background: "linear-gradient(90deg, #06b6d4, #7c3aed)",
                boxShadow: "0 4px 28px rgba(124,58,237,0.4)",
              }}
            >
              <Play size={16} className="fill-white" />
              Watch Now
            </a>

            <Link
              href={`/${item.media_type === "movie" ? "movies" : "series"}/${item._id}`}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-white/90 font-semibold text-sm transition-all hover:bg-white/10 hover:text-white hover:border-white/20 border border-white/10 bg-white/5 backdrop-blur shadow-lg"
            >
              <Info size={16} />
              More Info
            </Link>
          </div>
        </div>
      </div>

      {/* POSTER THUMBNAIL (Desktop only) */}
      <div className="hidden lg:block absolute right-20 bottom-28 z-20">
        <div className="p-px rounded-xl bg-[linear-gradient(135deg,rgba(6,182,212,0.3),rgba(124,58,237,0.3))]">
          <div className="rounded-xl overflow-hidden shadow-2xl bg-[#07070F]">
            <Image
              src={item.poster_url}
              alt={`${item.title} Thumbnail`}
              width={160}
              height={240}
              className="object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
