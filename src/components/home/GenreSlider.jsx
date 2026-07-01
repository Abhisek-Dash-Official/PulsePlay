"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react";
import { GENRES, genreImgUrl } from "@/lib/constants";

export default function GenreSlider() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -380 : 380,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 350);
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <style>{`.genre-scroll::-webkit-scrollbar { display: none; }`}</style>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-linear-to-br from-cyan-500/10 to-violet-500/10 border border-white/10">
            <LayoutGrid size={18} className="text-[#22d3ee]" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Browse by Genre
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Explore All */}
          <Link
            href="/genre"
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-cyan-400 transition-colors group"
          >
            Explore all
            <ChevronRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-40 hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-40 hover:bg-white/10 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="genre-scroll flex gap-4 overflow-x-auto scroll-smooth pb-4"
      >
        {GENRES.map((genre) => {
          const Icon = genre.icon;
          return (
            <Link
              key={genre.id}
              href={`/movies?genre=${genre.id}`}
              className="shrink-0 w-40.5"
            >
              <div
                className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl"
                style={{
                  aspectRatio: "3/4",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Image
                  src={genreImgUrl(genre.name)}
                  alt={genre.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="162px"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <div className="text-cyan-400 mb-2">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-white font-semibold text-[15px] leading-tight">
                    {genre.name}
                  </h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
