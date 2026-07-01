"use client";

import { useEffect, useRef, useState } from "react";
import HeroBannerSlide from "./HeroBannerSlide";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroBanner({ featuredItems = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  const total = featuredItems.length;

  const goToSlide = (index) => {
    setActiveIndex(index);
    setProgress(0);
    restartTimers(index);
  };

  const next = () => goToSlide((activeIndex + 1) % total);
  const prev = () => goToSlide((activeIndex - 1 + total) % total);

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const restartTimers = () => {
    clearTimers();

    if (isPaused || total === 0) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((p) => (p + 1) % total);
      setProgress(0);
    }, 6000);

    progressRef.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1));
    }, 60);
  };

  useEffect(() => {
    restartTimers();
    return clearTimers;
  }, [activeIndex, isPaused, total]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  if (!featuredItems || !featuredItems.length) {
    return (
      <section className="relative w-full h-[85svh] lg:h-[90svh] overflow-hidden bg-[#07070F] flex items-end px-6 md:px-16 pb-28">
        {/* Deep Background Pulse */}
        <div className="absolute inset-0 bg-[#0a0a10] animate-pulse" />

        <div className="absolute top-0 left-0 w-125 h-125 bg-cyan-500/5 blur-[120px] rounded-full animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-125 h-125 bg-violet-500/5 blur-[120px] rounded-full animate-pulse"
          style={{ animationDelay: "500ms" }}
        />

        {/* Skeleton Layout Content */}
        <div className="relative z-10 w-full max-w-150">
          {/* Title Skeleton */}
          <div className="space-y-3 mb-6">
            <div className="h-12 sm:h-14 md:h-16 w-3/4 bg-white/5 rounded-xl animate-pulse" />
            <div
              className="h-12 sm:h-14 md:h-16 w-1/2 bg-white/5 rounded-xl animate-pulse"
              style={{ animationDelay: "100ms" }}
            />
          </div>

          {/* Plot Skeleton */}
          <div className="space-y-3 mb-8">
            <div
              className="h-4 w-full bg-white/5 rounded-md animate-pulse"
              style={{ animationDelay: "200ms" }}
            />
            <div
              className="h-4 w-5/6 bg-white/5 rounded-md animate-pulse"
              style={{ animationDelay: "300ms" }}
            />
            <div
              className="h-4 w-2/3 bg-white/5 rounded-md animate-pulse"
              style={{ animationDelay: "400ms" }}
            />
          </div>

          {/* CTA Buttons Skeleton */}
          <div className="flex items-center gap-3">
            <div
              className="h-13 w-35 bg-white/5 rounded-xl animate-pulse"
              style={{ animationDelay: "500ms" }}
            />
            <div
              className="h-13 w-30 bg-white/5 rounded-xl animate-pulse"
              style={{ animationDelay: "600ms" }}
            />
          </div>
        </div>

        {/* Desktop Poster Skeleton */}
        <div className="hidden lg:block absolute right-20 bottom-28 z-20">
          <div
            className="w-40 h-60 bg-white/5 rounded-xl animate-pulse shadow-2xl border border-white/5"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full h-[75svh] lg:h-[85svh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* SLIDES */}
      {featuredItems.map((item, index) => (
        <HeroBannerSlide
          key={index}
          item={item}
          isActive={index === activeIndex}
          isExiting={index === activeIndex - 1}
        />
      ))}

      {/* CONTROLS */}
      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-16 z-20 flex items-center gap-4">
        {/* dots */}
        <div className="flex items-center gap-2">
          {featuredItems.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="relative h-2 rounded-full overflow-hidden transition-all"
              style={{
                width: i === activeIndex ? "32px" : "8px",
                background:
                  i === activeIndex
                    ? "linear-gradient(90deg,#06b6d4,#7c3aed)"
                    : "rgba(255,255,255,0.2)",
              }}
            >
              {i === activeIndex && (
                <div
                  className="absolute left-0 top-0 bottom-0 bg-white/30"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>

        {/* counter */}
        <div className="text-xs text-white/40 font-mono tracking-widest">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </div>
      </div>

      {/* arrows */}
      <div className="hidden md:flex absolute right-16 bottom-10 gap-2 z-20">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
