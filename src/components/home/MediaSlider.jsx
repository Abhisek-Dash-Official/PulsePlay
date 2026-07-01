"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Flame, Star, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import MediaCard from "./MediaCard";

const ICON_MAP = { Flame, Star, Sparkles };

export default function MediaSlider({ title, icon, items = [], exploreHref }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const IconComponent = ICON_MAP[icon] || Flame;

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -600 : 600,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 400);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [items]);

  return (
    <div className="w-full">
      <style>{`
        .media-scroll::-webkit-scrollbar { display: none; }
        @keyframes sweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Section Heading Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              padding: "6px",
              borderRadius: "8px",
              background:
                "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(124,58,237,0.15))",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <IconComponent size={16} style={{ color: "#22d3ee" }} />
          </div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-6">
          {exploreHref && (
            <Link
              href={exploreHref}
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.38)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
              className="hover:text-cyan-400 transition-colors group"
            >
              Explore all
              <ChevronRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          )}

          {/* Desktop Nav Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <ChevronLeft size={16} color="rgba(255,255,255,0.7)" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <ChevronRight size={16} color="rgba(255,255,255,0.7)" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Track Wrapper */}
      <div className="relative">
        {/* Left Fade */}
        {canScrollLeft && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: "8px",
              width: "80px",
              pointerEvents: "none",
              background:
                "linear-gradient(to right, #07070F 0%, transparent 100%)",
              zIndex: 2,
            }}
          />
        )}

        {/* Right Fade */}
        {canScrollRight && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: "8px",
              width: "80px",
              pointerEvents: "none",
              background:
                "linear-gradient(to left, #07070F 0%, transparent 100%)",
              zIndex: 2,
            }}
          />
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="media-scroll"
          style={{
            display: "flex",
            gap: "14px",
            overflowX: "auto",
            paddingBottom: "8px",
            paddingTop: "4px",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
          }}
        >
          {items.length > 0
            ? items.map((item) => (
                <div
                  key={item._id}
                  style={{ scrollSnapAlign: "start", flexShrink: 0 }}
                >
                  <MediaCard item={item} />
                </div>
              ))
            : /* Skeleton Loading State */
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`skel-${i}`}
                  style={{
                    width: "180px",
                    height: "270px",
                    borderRadius: "12px",
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 100%)",
                    backgroundSize: "200% 100%",
                    animation: "sweep 2s infinite linear",
                  }}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
