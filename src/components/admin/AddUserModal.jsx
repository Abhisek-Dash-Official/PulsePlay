"use client";
import { useState } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { getAvatarImgUrl } from "@/lib/constants";

export default function AddUserModal({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    avatar_id: "1",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create user");

      toast.success("User created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <UserPlus className="text-cyan-400" /> Create New User
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          <input
            required
            placeholder="Username"
            className="w-full bg-slate-950 border border-slate-700 p-3 rounded-lg text-white text-sm"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full bg-slate-950 border border-slate-700 p-3 rounded-lg text-white text-sm"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="w-full bg-slate-950 border border-slate-700 p-3 rounded-lg text-white text-sm"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <select
            className="w-full bg-slate-950 border border-slate-700 p-3 rounded-lg text-white text-sm"
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="user">Role: User</option>
            <option value="admin">Role: Admin</option>
          </select>

          {/* Avatar Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Select Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {[...Array(17).keys()].map((i) => (
                <img
                  key={i + 1}
                  src={getAvatarImgUrl(i + 1)}
                  className={`cursor-pointer rounded-lg border-2 transition-all ${formData.avatar_id == i + 1 ? "border-cyan-500 scale-105" : "border-slate-800"}`}
                  onClick={() =>
                    setFormData({ ...formData, avatar_id: (i + 1).toString() })
                  }
                />
              ))}
              {formData.role === "admin" && (
                <img
                  src={getAvatarImgUrl("admin")}
                  className={`cursor-pointer rounded-lg border-2 transition-all ${formData.avatar_id == "admin" ? "border-cyan-500 scale-105" : "border-slate-800"}`}
                  onClick={() =>
                    setFormData({ ...formData, avatar_id: "admin" })
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Create User"
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
