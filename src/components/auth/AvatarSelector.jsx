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
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeft(scrollLeft > 0);
    setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  };

  useEffect(() => {
    checkScroll();

    window.addEventListener("resize", checkScroll);

    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -240 : 240,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 350);
  };

  return (
    <div className="relative">
      {/* Label */}

      <label
        style={{
          display: "block",
          marginBottom: "12px",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.35)",
        }}
      >
        Choose Your Avatar
      </label>

      <div className="relative flex items-center">
        {" "}
        {/* Left Button */}
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className={`absolute -left-3 z-20 transition-all duration-200 ${
            showLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            width: 28,
            height: 28,
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,.10)",
            background: "rgba(255,255,255,.06)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            color: "rgba(255,255,255,.7)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,.12)";
            e.currentTarget.style.borderColor = "rgba(6,182,212,.30)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,.10)";
          }}
        >
          <ChevronLeft size={16} style={{ margin: "auto" }} />
        </button>{" "}
        {/* Avatar List */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto px-1 py-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            div::-webkit-scrollbar{
              display:none;
            }
          `}</style>

          {availableAvatars.map((id) => {
            const selected = selectedId === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelect(id)}
                className="shrink-0 transition-all duration-200"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  opacity: selected ? 1 : 0.4,
                  transform: selected ? "scale(1)" : "scale(.98)",
                }}
                onMouseEnter={(e) => {
                  if (!selected) {
                    e.currentTarget.style.opacity = ".85";
                    e.currentTarget.style.transform = "scale(1.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selected) {
                    e.currentTarget.style.opacity = ".4";
                    e.currentTarget.style.transform = "scale(.98)";
                  }
                }}
              >
                {selected ? (
                  <div
                    style={{
                      padding: "2.5px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#06B6D4,#7C3AED)",
                      boxShadow: "0 0 20px rgba(6,182,212,.40)",
                    }}
                  >
                    <div
                      style={{
                        borderRadius: "50%",
                        overflow: "hidden",
                        transform: "scale(1.08)",
                      }}
                    >
                      <Image
                        src={getAvatarImgUrl(id)}
                        alt={`Avatar ${id}`}
                        width={52}
                        height={52}
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={getAvatarImgUrl(id)}
                    alt={`Avatar ${id}`}
                    width={52}
                    height={52}
                    className="rounded-full object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>{" "}
        {/* Right Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className={`absolute -right-3 z-20 transition-all duration-200 ${
            showRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            width: 28,
            height: 28,
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,.10)",
            background: "rgba(255,255,255,.06)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            color: "rgba(255,255,255,.7)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,.12)";
            e.currentTarget.style.borderColor = "rgba(6,182,212,.30)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,.10)";
          }}
        >
          <ChevronRight size={16} style={{ margin: "auto" }} />
        </button>
      </div>
    </div>
  );
}
