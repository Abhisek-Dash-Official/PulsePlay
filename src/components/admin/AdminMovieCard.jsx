"use client";

import { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  Save,
  X,
  Plus,
  Link as LinkIcon,
  Trash,
  ImageIcon,
} from "lucide-react";
import { toast } from "react-toastify";

export default function AdminMovieCard({
  movie,
  onUpdateSuccess,
  onDeleteSuccess,
  onCancelNew,
}) {
  const isNew = movie._id === "new";
  const [isEditing, setIsEditing] = useState(isNew);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Form State (Converting arrays to comma-separated strings for easy input)
  const [formData, setFormData] = useState({
    ...movie,
    genres: movie.genres?.join(", ") || "",
    tags: movie.tags?.join(", ") || "",
    cast: movie.cast?.join(", ") || "",
    download_links: movie.download_links || [],
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setPreviewImage(null);
      }
    };

    if (previewImage) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addDownloadLink = () => {
    setFormData((prev) => ({
      ...prev,
      download_links: [
        ...prev.download_links,
        { resolution_label: "", file_size: "", external_url: "" },
      ],
    }));
  };

  const updateDownloadLink = (index, field, value) => {
    const newLinks = [...formData.download_links];
    newLinks[index][field] = value;
    setFormData((prev) => ({ ...prev, download_links: newLinks }));
  };

  const removeDownloadLink = (index) => {
    const newLinks = formData.download_links.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, download_links: newLinks }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        genres: formData.genres
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        tags: formData.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        cast: formData.cast
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        rating: Number(formData.rating) || 0,
        priority: Number(formData.priority) || 0,
      };

      const url = isNew
        ? "/api/admin/movies"
        : `/api/admin/movies/${movie._id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to save");

      toast.success(isNew ? "Movie Added Successfully" : "Movie Updated");
      setIsEditing(false);
      onUpdateSuccess();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-4 p-2">
          <h3 className="font-bold text-lg text-white">Delete Movie?</h3>
          <p className="text-sm text-slate-400">
            Are you sure you want to delete{" "}
            <span className="font-bold text-cyan-400">{movie.title}</span>? This
            action cannot be undone.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={async () => {
                closeToast();
                performDelete();
              }}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-lg transition-all"
            >
              Yes, Delete
            </button>
            <button
              onClick={closeToast}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      },
    );
  };

  const performDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/movies/${movie._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Movie Deleted successfully! 🗑️");
      onDeleteSuccess(movie._id);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      onCancelNew();
    } else {
      setFormData({
        ...movie,
        genres: movie.genres?.join(", ") || "",
        tags: movie.tags?.join(", ") || "",
        cast: movie.cast?.join(", ") || "",
        download_links: movie.download_links || [],
      });
      setIsEditing(false);
    }
  };

  // READ MODE UI
  if (!isEditing) {
    return (
      <div
        className={`flex flex-col sm:flex-row gap-6 p-4 sm:p-6 rounded-2xl bg-slate-900 border ${movie.is_featured ? "border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:border-cyan-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]" : "border-slate-800 shadow-lg hover:border-slate-700"} transition-colors group`}
      >
        {/* Poster */}
        <div className="w-full sm:w-32 md:w-48 shrink-0 relative aspect-2/3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
          <div className="absolute top-2 left-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImage(movie.poster_url);
              }}
              className="bg-black/60 hover:bg-cyan-500 text-white p-1.5 rounded-full backdrop-blur-sm transition-all"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>
          {movie.poster_url ? (
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-700 font-medium">
              No Poster
            </div>
          )}
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-yellow-400 border border-yellow-500/30">
            ⭐ {movie.rating}
          </div>
          {movie.is_featured && (
            <div className="absolute bottom-2 right-2 bg-cyan-500/20 backdrop-blur px-2 py-1 rounded text-xs font-bold text-cyan-400 border border-cyan-500/30 space-x-1">
              <span>Featured</span>
              <span className="bg-cyan-500 text-slate-900 px-1 rounded-full text-[10px]">
                #{movie.priority || 0}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white truncate">
                {movie.title}
              </h3>
              <div className="flex items-center gap-3 mt-2 text-sm text-slate-400 capitalize">
                <span>{movie.media_type}</span> • <span>{movie.origin}</span> •
                <span>
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-300 line-clamp-3 leading-relaxed">
            {movie.plot}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres?.map((g) => (
              <span
                key={g}
                className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20 capitalize"
              >
                {g}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap mt-4 pt-4 border-t border-slate-800/60 items-center gap-4 text-xs text-slate-500">
            <span className="font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
              ID: {movie._id}
            </span>
            <span>{movie.download_links?.length || 0} Download Links</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewImage(movie.backdrop_url)}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-400 px-2 py-1 rounded border border-slate-700 transition-all flex items-center gap-1"
              >
                <ImageIcon className="w-3 h-3" /> Backdrop
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 shrink-0 justify-start">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center h-10 gap-2 py-2 px-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 font-medium transition-all"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center h-10 gap-2 py-2 px-4 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white font-medium transition-all"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
        {previewImage && (
          <PreviewModal
            image={previewImage}
            onClose={() => setPreviewImage(null)}
          />
        )}
      </div>
    );
  }

  // EDIT MODE UI
  return (
    <div className="flex flex-col gap-6 p-6 rounded-2xl bg-slate-950 border-2 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)] relative">
      {/* Edit Content */}
      <div className="flex-1 space-y-5">
        {/* IMAGE PREVIEW SECTION */}
        <div className="flex gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="w-1/2 space-y-2">
            <p className="text-[10px] uppercase font-bold text-slate-500">
              Current Poster
            </p>
            {formData.poster_url ? (
              <img
                src={formData.poster_url}
                alt="Poster"
                className="w-full h-24 object-cover rounded border border-slate-700"
                onClick={() => setPreviewImage(formData.poster_url)}
              />
            ) : (
              <div className="w-full h-24 bg-slate-950 rounded border border-dashed border-slate-800 flex items-center justify-center text-xs text-slate-600">
                No Poster
              </div>
            )}
          </div>
          <div className="w-1/2 space-y-2">
            <p className="text-[10px] uppercase font-bold text-slate-500">
              Current Backdrop
            </p>
            {formData.backdrop_url ? (
              <img
                src={formData.backdrop_url}
                alt="Backdrop"
                className="w-full h-24 object-cover rounded border border-slate-700"
                onClick={() => setPreviewImage(formData.backdrop_url)}
              />
            ) : (
              <div className="w-full h-24 bg-slate-950 rounded border border-dashed border-slate-800 flex items-center justify-center text-xs text-slate-600">
                No Backdrop
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder="Movie Name here"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="space-y-1.5 flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Type *
              </label>
              <select
                name="media_type"
                value={formData.media_type || "movie"}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="movie">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Origin *
              </label>
              <select
                name="origin"
                value={formData.origin || "hollywood"}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="hollywood">Hollywood</option>
                <option value="bollywood">Bollywood</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Plot / Synopsis *
          </label>
          <textarea
            name="plot"
            value={formData.plot || ""}
            onChange={handleChange}
            rows={4}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Director
            </label>
            <input
              type="text"
              name="director"
              value={formData.director || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Cast (Comma separated)
            </label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              placeholder="Actor A, Actor B"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating || 0}
              onChange={handleChange}
              step="0.1"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Priority
            </label>
            <input
              type="number"
              name="priority"
              value={formData.priority || 0}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Release Date
            </label>
            <input
              type="date"
              name="release_date"
              value={
                formData.release_date
                  ? new Date(formData.release_date).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Tags (Comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Trending, New"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_featured"
            checked={formData.is_featured || false}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                is_featured: e.target.checked,
              }))
            }
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
          />
          <label className="text-sm font-medium text-slate-300">
            Is Featured Movie?
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Poster URL
            </label>
            <input
              type="text"
              name="poster_url"
              value={formData.poster_url || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Backdrop URL
            </label>
            <input
              type="text"
              name="backdrop_url"
              value={formData.backdrop_url || ""}
              onChange={handleChange}
              placeholder="/images/backdrops/movie.jpg"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Watch Link (Stream)
            </label>
            <input
              type="text"
              name="watch_link"
              value={formData.watch_link || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Genres (Comma separated)
          </label>
          <input
            type="text"
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            placeholder="Action, Sci-Fi, Thriller"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
          />
        </div>

        {/* Download Links Array */}
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-cyan-400" /> External Download
              Links
            </h4>
            <button
              type="button"
              onClick={addDownloadLink}
              className="text-xs bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" /> Add Link
            </button>
          </div>
          <div className="space-y-3">
            {formData.download_links.map((link, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-2 items-start md:items-center"
              >
                <input
                  type="text"
                  placeholder="Resolution (e.g. 1080p)"
                  value={link.resolution_label}
                  onChange={(e) =>
                    updateDownloadLink(idx, "resolution_label", e.target.value)
                  }
                  className="w-full md:w-1/4 bg-slate-950 border border-slate-700 rounded text-sm px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Size (e.g. 1.2GB)"
                  value={link.file_size}
                  onChange={(e) =>
                    updateDownloadLink(idx, "file_size", e.target.value)
                  }
                  className="w-full md:w-1/4 bg-slate-950 border border-slate-700 rounded text-sm px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="External URL"
                  value={link.external_url}
                  onChange={(e) =>
                    updateDownloadLink(idx, "external_url", e.target.value)
                  }
                  className="w-full flex-1 bg-slate-950 border border-slate-700 rounded text-sm px-3 py-2 text-white"
                />
                <button
                  type="button"
                  onClick={() => removeDownloadLink(idx)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
            {formData.download_links.length === 0 && (
              <p className="text-xs text-slate-500 italic">
                No download links added yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions (Save/Cancel) */}
      <div className="flex gap-4 w-full justify-end h-14 pt-4 border-t border-slate-800">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-bold transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {isLoading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white font-medium transition-all"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
      {previewImage && (
        <PreviewModal
          image={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  );
}

function PreviewModal({ image, onClose }) {
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={onClose}
    >
      <button className="absolute top-5 right-5 text-white bg-slate-800 p-2 rounded-full hover:bg-slate-700">
        <X className="w-6 h-6" />
      </button>
      <img
        src={image}
        alt="Preview"
        className="max-w-full max-h-[90vh] w-full h-full object-contain rounded-lg border border-slate-700"
      />
    </div>
  );
}
