"use client";

import Image from "next/image";
import { Play, Plus, Check, Star, Heart } from "lucide-react";

export default function MediaCard({ item }) {
  const isMovie = item.media_type === "movie";

  const isWatchlisted = false; // Placeholder for watchlist state; replace with actual logic as needed
  const isFavorited = false; // Placeholder for favorite state; replace with actual logic as needed

  const toggleWatchlist = () => {};
  const toggleFavorite = () => {};

  return (
    <div
      className="group relative overflow-hidden shrink-0 cursor-pointer rounded-xl border border-white/[0.07] transition-all duration-250 ease-in-out hover:border-cyan-400/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(6,182,212,0.1)]"
      style={{ width: "180px", height: "270px" }}
    >
      {/* Base Image */}
      <div className="absolute inset-0 bg-white/4">
        <Image
          src={item.poster_url}
          alt={item.title}
          fill
          className="object-cover"
          sizes="180px"
        />
      </div>

      {/* Top Left Badge */}
      <div
        className="absolute top-2 left-2 z-10 font-mono uppercase tracking-[0.12em]"
        style={{
          background: "rgba(7,7,15,0.7)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "6px",
          padding: "2px 6px",
          fontSize: "9px",
          color: isMovie ? "#22d3ee" : "#a78bfa",
        }}
      >
        {item.media_type}
      </div>

      {/* Top Right Favorite Button */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 z-40 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
          isFavorited
            ? "bg-pink-500/20 border border-pink-500/50 opacity-100"
            : "bg-black/40 border border-white/10 opacity-0 group-hover:opacity-100 hover:bg-black/70"
        }`}
      >
        <Heart
          size={14}
          className={
            isFavorited ? "fill-pink-500 text-pink-500" : "text-white/70"
          }
        />
      </button>

      {/* Default Bottom Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(7,7,15,0.95) 0%, transparent 100%)",
        }}
      />

      {/* Default State Content */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-3 flex flex-col justify-end transition-opacity duration-250 ease-in-out opacity-100 group-hover:opacity-0 pointer-events-none">
        <h3 className="text-white font-semibold text-[13px] line-clamp-2 leading-snug mb-1">
          {item.title}
        </h3>
        <div className="flex items-center gap-1 text-[#22d3ee] text-[11px] font-bold">
          <Star size={10} className="fill-[#06B6D4] stroke-none" />
          {item.rating?.toFixed(1) || "NR"}
        </div>
      </div>

      {/* Hover Overlay */}
      <div
        className="absolute inset-0 z-30 flex flex-col justify-end p-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-in-out"
        style={{
          background:
            "linear-gradient(to top, rgba(7,7,15,0.98) 0%, rgba(7,7,15,0.85) 60%, rgba(7,7,15,0.4) 100%)",
        }}
      >
        <div className="flex items-center gap-1.5 text-[11px] text-white/50 mb-1">
          <Star
            size={12}
            className="fill-[#06B6D4] stroke-none text-[#22d3ee]"
          />
          <span className="font-bold text-white/80">
            {item.rating?.toFixed(1) || "NR"}
          </span>
          <span>·</span>
          <span>
            {item.release_date ? new Date(item.release_date).getFullYear() : ""}
          </span>
        </div>

        <h3 className="text-[14px] font-bold text-white mb-1.5 leading-tight line-clamp-2">
          {item.title}
        </h3>
        <p className="text-[11px] text-white/45 leading-relaxed line-clamp-2 mb-2.5">
          {item.plot}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.genres?.slice(0, 2).map((genre, idx) => (
            <span
              key={idx}
              className="text-[10px] capitalize"
              style={{
                padding: "2px 8px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {genre}
            </span>
          ))}
        </div>

        {/* CTA Row */}
        <div className="flex gap-1.5 items-center relative z-40">
          <a
            href={item.watch_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 transition-all hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(90deg, #06b6d4, #7c3aed)",
              boxShadow: "0 2px 12px rgba(124,58,237,0.35)",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "12px",
              fontWeight: "700",
              color: "white",
            }}
          >
            <Play size={12} className="fill-white" /> Watch
          </a>

          {/* Toggle Watchlist Button */}
          <button
            onClick={toggleWatchlist}
            className={`flex items-center justify-center transition-all active:scale-95 ${
              isWatchlisted
                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                : "bg-white/5 text-white/65 border-white/10 hover:bg-white/10 hover:text-white"
            }`}
            style={{
              border: "1px solid",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          >
            {isWatchlisted ? <Check size={14} /> : <Plus size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
