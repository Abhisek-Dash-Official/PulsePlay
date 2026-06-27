"use client";

import { useState, useEffect } from 'react';
import { Film, Users, PlayCircle, Download, TrendingUp, Loader2, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function AdminDashboard() {
    const [statsData, setStatsData] = useState({
        totalMovies: 0,
        totalUsers: 0,
        totalWatches: 0,
        totalDownloads: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                const json = await res.json();

                if (!res.ok || !json.success) {
                    throw new Error(json.error || "Failed to fetch stats");
                }

                setStatsData(json.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load dashboard stats.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Formatting numbers (e.g., 1200 -> 1.2K)
    const formatNumber = (num) => {
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const statsConfig = [
        {
            title: "Total Movies",
            value: formatNumber(statsData.totalMovies),
            trend: "Live Database",
            icon: Film,
            color: "text-cyan-400",
            bg: "bg-cyan-400/10",
            borderHover: "hover:border-cyan-500/30"
        },
        {
            title: "Total Users",
            value: formatNumber(statsData.totalUsers),
            trend: "Registered Users",
            icon: Users,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            borderHover: "hover:border-purple-500/30"
        },
        {
            title: "Total Watches",
            value: formatNumber(statsData.totalWatches),
            trend: "External Streams",
            icon: PlayCircle,
            color: "text-green-400",
            bg: "bg-green-400/10",
            borderHover: "hover:border-green-500/30"
        },
        {
            title: "Total Downloads",
            value: formatNumber(statsData.totalDownloads),
            trend: "External Links Used",
            icon: Download,
            color: "text-rose-400",
            bg: "bg-rose-400/10",
            borderHover: "hover:border-rose-500/30"
        },
    ];

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                    <p>Decrypting Data Center...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Dashboard Overview
                </h1>
                <p className="text-slate-400 text-sm mt-1.5">
                    Live telemetry from the PulsePlay Command Center.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {statsConfig.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className={`p-6 rounded-2xl bg-slate-900 border border-slate-800 transition-all duration-300 shadow-lg group ${stat.borderHover}`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                                    <h3 className="text-3xl font-bold text-white mt-2 group-hover:scale-105 transform transition-transform origin-left duration-300">
                                        {stat.value}
                                    </h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg} transition-colors duration-300`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-500">{stat.trend}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Actions & Media Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Main Wide Section: Recently Added Media */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white">Recently Added Media</h2>
                        <Link href="/admin/movies" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                            View All
                        </Link>
                    </div>

                    {statsData.recentMedia?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-400">
                                <thead className="text-xs uppercase bg-slate-800/50 text-slate-300">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg font-semibold">Title</th>
                                        <th className="px-4 py-3 font-semibold">Type</th>
                                        <th className="px-4 py-3 font-semibold">Origin</th>
                                        <th className="px-4 py-3 rounded-r-lg font-semibold">Added On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statsData.recentMedia.map((media) => (
                                        <tr key={media._id} className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors">
                                            <td className="px-4 py-3 font-medium text-slate-200">{media.title}</td>
                                            <td className="px-4 py-3 capitalize">{media.media_type}</td>
                                            <td className="px-4 py-3 capitalize">{media.origin}</td>
                                            <td className="px-4 py-3">
                                                {new Date(media.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-10 border border-slate-800 border-dashed rounded-xl bg-slate-950/50">
                            <Film className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                            <p className="text-slate-400 font-medium">No media found.</p>
                            <p className="text-sm text-slate-500">Your database is currently empty.</p>
                        </div>
                    )}
                </div>

                {/* Side Section: Live Activity Logs */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <Clock className="w-5 h-5 text-cyan-400" />
                        <h2 className="text-lg font-bold text-white">Live Activity Logs</h2>
                    </div>

                    {statsData.recentActions?.length > 0 ? (
                        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                            {statsData.recentActions.map((action) => (
                                <div key={action._id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
                                    <div className="mt-0.5">
                                        {action.action_type === 'watch'
                                            ? <PlayCircle className="w-5 h-5 text-green-400" />
                                            : <Download className="w-5 h-5 text-rose-400" />
                                        }
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-300">
                                            <span className="font-semibold text-cyan-400">{action.user_id?.username || 'Unknown User'}</span>
                                            {` ${action.action_type} `}
                                            <span className="font-medium text-white">
                                                {`Movie: ${action.media_id?.title || 'Unknown Media'}`}</span>
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {new Date(action.timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center items-center text-center py-10 border border-slate-800 border-dashed rounded-xl bg-slate-950/50">
                            <Clock className="w-8 h-8 text-slate-600 mb-2" />
                            <p className="text-slate-400 font-medium">No recent actions.</p>
                            <p className="text-sm text-slate-500">Waiting for user telemetry.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}