"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAvatarImgUrl } from "@/lib/constants";

export default function AvatarSelector({ selectedId, onSelect }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const availableAvatars = Array.from({ length: 17 }, (_, i) => String(i + 1));

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="space-y-2 relative group">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
        Choose your Avatar
      </label>

      <div className="relative flex items-center">
        {/* Left Scroll Button */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className={`absolute -left-4 z-10 p-1.5 rounded-full bg-slate-800/90 border border-slate-600 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-slate-700 hover:scale-110 ${showLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Avatar List */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-3 pb-2 pt-1 px-1 snap-x w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `::-webkit-scrollbar { display: none; }`,
            }}
          />

          {availableAvatars.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={`relative shrink-0 snap-center rounded-full transition-all duration-300 ${
                selectedId === id
                  ? "ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-900 scale-110 opacity-100 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  : "opacity-50 hover:opacity-100 hover:scale-105"
              }`}
            >
              <Image
                src={getAvatarImgUrl(id)}
                alt={`Avatar ${id}`}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className={`absolute -right-4 z-10 p-1.5 rounded-full bg-slate-800/90 border border-slate-600 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-slate-700 hover:scale-110 ${showRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
