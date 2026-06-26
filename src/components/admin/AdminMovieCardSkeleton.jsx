import { Image as ImageIcon } from "lucide-react";

export default function AdminMovieCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg animate-pulse">
      {/* Poster Placeholder */}
      <div className="w-full md:w-48 h-72 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
        <ImageIcon className="w-10 h-10 text-slate-700" />
      </div>

      {/* Content Placeholder */}
      <div className="flex-1 space-y-4 py-2">
        <div className="h-8 bg-slate-800 rounded-lg w-3/4"></div>
        <div className="h-4 bg-slate-800 rounded-lg w-1/4"></div>

        <div className="space-y-2 mt-6">
          <div className="h-4 bg-slate-800 rounded-lg w-full"></div>
          <div className="h-4 bg-slate-800 rounded-lg w-full"></div>
          <div className="h-4 bg-slate-800 rounded-lg w-5/6"></div>
        </div>

        <div className="flex gap-2 mt-6">
          <div className="h-6 bg-slate-800 rounded-full w-16"></div>
          <div className="h-6 bg-slate-800 rounded-full w-20"></div>
          <div className="h-6 bg-slate-800 rounded-full w-16"></div>
        </div>
      </div>

      {/* Action Buttons Placeholder */}
      <div className="flex md:flex-col gap-3 shrink-0 md:w-32 justify-end md:justify-start mt-4 md:mt-0">
        <div className="h-10 bg-slate-800 rounded-lg w-full"></div>
        <div className="h-10 bg-slate-800 rounded-lg w-full"></div>
      </div>
    </div>
  );
}
