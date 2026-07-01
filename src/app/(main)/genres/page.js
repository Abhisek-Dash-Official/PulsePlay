"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { GENRES, genreImgUrl } from "@/lib/constants";

export default function GenrePage() {
    return (
        <div className="min-h-screen bg-[#07070F]">
            {/* Header */}
            <div className="pt-5 pb-12 border-b border-white/10">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-2xl bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-white/10">
                            <LayoutGrid size={36} className="text-cyan-400" />
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-4">
                        Browse by Genre
                    </h1>

                    <div className="inline-block text-white/60 px-8 rounded-2xl text-lg">
                        Discover movies and shows across every genre. Find your next favorite story.
                    </div>
                </div>
            </div>

            {/* Cards */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                    {GENRES.map((genre) => {
                        const Icon = genre.icon;
                        return (
                            <Link
                                key={genre.id}
                                href={`/movies?genre=${genre.id}`}
                                className="group"
                            >
                                <div className="relative overflow-hidden rounded-3xl aspect-2/3 border border-white/10 shadow-2xl transition-all duration-500 hover:border-cyan-400/60 hover:scale-[1.03] hover:-translate-y-2">

                                    <Image
                                        src={genreImgUrl(genre.name)}
                                        alt={genre.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent" />

                                    {/* Icon */}
                                    <div className="absolute top-6 right-6 p-3.5 bg-black/70 backdrop-blur-xl rounded-2xl border border-white/20 transition-all group-hover:scale-110">
                                        <Icon size={34} className="text-cyan-400" />
                                    </div>

                                    {/* Genre Name */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                                        <h3 className="text-[42px] font-bold text-white tracking-tighter drop-shadow-2xl">
                                            {genre.name}
                                        </h3>
                                    </div>

                                    {/* Bottom Glow */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-r from-cyan-400 via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}