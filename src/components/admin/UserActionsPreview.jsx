"use client";
import { useState, useEffect } from "react";
import {
  X,
  Activity,
  Loader2,
  Clock,
  Film,
  Tv,
  PlayCircle,
  Download,
} from "lucide-react";
import { toast } from "react-toastify";

export default function UserActionsPreview({ userId, username, onClose }) {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    const fetchUserActions = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/admin/users/actions?userId=${userId}`);
        const json = await res.json();
        if (!res.ok || !json.success)
          throw new Error(json.error || "Failed to fetch actions");
        setLogs(json.data || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserActions();
    return () => window.removeEventListener("keydown", handleEsc);
  }, [userId, onClose]);

  const getActionDetails = (actionType) => {
    const type = actionType.toLowerCase();
    if (type.includes("download"))
      return {
        icon: <Download className="w-4 h-4 text-emerald-400" />,
        color: "text-emerald-400",
      };
    if (type.includes("watch"))
      return {
        icon: <PlayCircle className="w-4 h-4 text-cyan-400" />,
        color: "text-cyan-400",
      };
    return {
      icon: <Activity className="w-4 h-4 text-indigo-400" />,
      color: "text-indigo-400",
    };
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-[95%] sm:w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[80vh]">
        <div className="flex items-start justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950">
          <div className="flex-1 pr-2">
            <h3 className="font-bold text-white flex items-start gap-2 wrap-break-word leading-tight">
              <Activity className="text-cyan-400 w-5 h-5 shrink-0 mt-0.5" />
              <span>
                Logs: <span className="text-cyan-400">{username}</span>
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto flex-1 bg-slate-900 custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-12 space-y-3">
              <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
              <p className="text-sm text-slate-500">Loading activity logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="w-10 h-10 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">
                No recent activity found.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => {
                const media = log.media_id;
                const details = getActionDetails(log.action_type);

                return (
                  <div
                    key={log._id}
                    className="p-3.5 bg-slate-950 hover:bg-slate-800/80 transition-colors border border-slate-800 rounded-xl flex items-start gap-3 sm:gap-4"
                  >
                    <div
                      className={`p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-1 ${details.color}`}
                    >
                      {details.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 leading-snug">
                        <span className="font-bold text-white capitalize wrap-break-word">
                          {log.action_type.replace("_", " ")}
                        </span>{" "}
                        on{" "}
                        <span className="font-bold text-cyan-400 wrap-break-word">
                          {media ? media.title : "Unknown Media"}
                        </span>
                      </p>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-1.5 text-[11px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          {new Date(log.timestamp).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {media && (
                          <span className="flex items-center gap-1 border-l border-slate-700 pl-3 whitespace-nowrap">
                            {media.media_type === "movie" ? (
                              <Film className="w-3 h-3" />
                            ) : (
                              <Tv className="w-3 h-3" />
                            )}
                            <span className="capitalize">
                              {media.media_type}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>

                    {media?.poster_url && (
                      <img
                        src={media.poster_url}
                        alt={media.title}
                        className="w-10 h-14 object-cover rounded border border-slate-700 shrink-0 hidden sm:block"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
