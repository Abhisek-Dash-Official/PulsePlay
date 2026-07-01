"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = query.trim();

    if (!value) return;

    router.push(`/movies?search=${encodeURIComponent(value)}`);

    setQuery("");
    setFocused(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Gradient Border Wrapper */}
      <div
        className="rounded-xl p-px transition-all duration-300"
        style={
          focused
            ? {
                background: "linear-gradient(90deg,#06B6D4,#7C3AED)",
                boxShadow: "0 0 0 3px rgba(6,182,212,.12)",
              }
            : {
                background: "rgba(255,255,255,.08)",
              }
        }
      >
        {/* Inner Container */}
        <div className="relative rounded-xl bg-[#07070F]">
          {/* Search Icon */}

          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
            style={{
              color: focused ? "#06B6D4" : "rgba(255,255,255,.3)",
            }}
          />

          <input
            type="text"
            value={query}
            placeholder="Search movies, series..."
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="h-11 w-full rounded-xl border-none bg-transparent pl-11 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300"
            style={{
              background: focused
                ? "rgba(255,255,255,.07)"
                : "rgba(255,255,255,.04)",
            }}
          />
        </div>
      </div>
    </form>
  );
}
