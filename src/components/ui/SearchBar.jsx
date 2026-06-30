"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/movies?search=${encodeURIComponent(query.trim())}`);
      setQuery(""); // Clear after search
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300">
        <Search className="h-4.5 w-4.5 text-slate-500 group-focus-within:text-cyan-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies, series..."
        className="block w-full pl-10 pr-4 py-2 border border-white/6 rounded-full bg-white/3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/6 transition-all duration-300 shadow-inner"
      />
    </form>
  );
}
