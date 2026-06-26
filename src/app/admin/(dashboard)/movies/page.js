"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Plus, Search, Clapperboard } from "lucide-react";
import AdminMovieCard from "@/components/admin/AdminMovieCard";
import AdminMovieCardSkeleton from "@/components/admin/AdminMovieCardSkeleton";
import { toast } from "react-toastify";

export default function AdminMoviesPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = parseInt(searchParams.get('page')) || 0;
    const query = searchParams.get('query') || '';

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasNext, setHasNext] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const [searchInput, setSearchInput] = useState(query);

    const fetchMovies = async () => {
        setIsLoading(true);
        try {
            const currentParams = new URLSearchParams(searchParams.toString());
            const res = await fetch(`/api/admin/movies?${currentParams.toString()}`);
            const json = await res.json();

            if (!res.ok || !json.success) throw new Error(json.error || "Failed to fetch");

            setMovies(json.data);
            setHasNext(json.hasNext);
            setTotalCount(json.count);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Refetch whenever the URL search params change
    useEffect(() => {
        fetchMovies();
    }, [searchParams]);

    // Handle Search Submission (Pushes to URL)
    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchInput) {
            params.set('query', searchInput);
        } else {
            params.delete('query');
        }
        params.set('page', '0'); // Reset to page 0 on new search
        router.push(`${pathname}?${params.toString()}`);
    };

    // Helper to update specific filter
    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set(key, value);
        else params.delete(key);

        params.set('page', '0'); // Reset page
        router.push(`${pathname}?${params.toString()}`);
    };

    // Handle Pagination
    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ADD NEW MOVIE LOGIC 
    const handleAddNewClick = () => {
        // Prevent adding multiple empty rows
        if (movies.length > 0 && movies[0]._id === "new") return;

        const emptyMovie = {
            _id: "new",
            title: "", plot: "", origin: "hollywood", media_type: "movie",
            poster_url: "", watch_link: "", genres: [], tags: [], cast: [], download_links: []
        };

        // Add to the top of the list
        setMovies([emptyMovie, ...movies]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelNew = () => {
        // Remove the top new item that is canceled now
        setMovies(movies.filter(m => m._id !== "new"));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-800 shadow-lg space-y-6">

                {/* Header + Search + Add Button */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="shrink-0">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Clapperboard className="w-6 h-6 text-cyan-400" /> Media Database
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">Managing {totalCount} total assets.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <form onSubmit={handleSearch} className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                            />
                        </form>
                        <button
                            onClick={handleAddNewClick}
                            className="flex items-center justify-center gap-2 px-5 py-2 bg-cyan-500 text-slate-900 font-bold rounded-lg hover:bg-cyan-400 transition-all shrink-0"
                        >
                            <Plus className="w-5 h-5" /> Add Media
                        </button>
                    </div>
                </div>

                {/* Filter & Sort Bar */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-slate-800">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Filters:</span>

                    <select onChange={(e) => updateFilter('media_type', e.target.value)} className="w-full sm:w-auto bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2">
                        <option value="">All Types</option>
                        <option value="movie">Movies</option>
                        <option value="series">Series</option>
                    </select>

                    <select onChange={(e) => updateFilter('origin', e.target.value)} className="w-full sm:w-auto bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2">
                        <option value="">All Origins</option>
                        <option value="bollywood">Bollywood</option>
                        <option value="hollywood">Hollywood</option>
                    </select>

                    <select onChange={(e) => updateFilter('sortBy', e.target.value)} className="w-full sm:w-auto bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2">
                        <option value="created_at">Newest First</option>
                        <option value="priority">Priority High</option>
                        <option value="rating">Top Rated</option>
                    </select>

                    <button
                        onClick={() => updateFilter('is_featured', searchParams.get('is_featured') === 'true' ? '' : 'true')}
                        className={`px-3 py-2 text-xs rounded-lg border ${searchParams.get('is_featured') === 'true' ? 'bg-cyan-500 text-slate-900 border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-700'}`}
                    >
                        Featured Only
                    </button>
                </div>
            </div>

            {/* Media List */}
            <div className="space-y-4">
                {isLoading ? (
                    <>
                        <AdminMovieCardSkeleton />
                        <AdminMovieCardSkeleton />
                        <AdminMovieCardSkeleton />
                    </>
                ) : movies.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                        <Clapperboard className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-slate-300">No media found</h3>
                        <p className="text-sm text-slate-500 mt-1">Try adjusting your search or add a new movie.</p>
                    </div>
                ) : (
                    movies.map((movie) => (
                        <AdminMovieCard
                            key={movie._id}
                            movie={movie}
                            onUpdateSuccess={fetchMovies}
                            onDeleteSuccess={fetchMovies}
                            onCancelNew={handleCancelNew}
                        />
                    ))
                )}
            </div>

            {/* Standard Pagination Controls */}
            {!isLoading && totalCount > 0 && (
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                    <p className="text-sm text-slate-500 font-medium">
                        Showing page index {page}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 0}
                            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={!hasNext}
                            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}