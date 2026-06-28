"use client";
import { useState } from "react";
import {
  Shield,
  ShieldAlert,
  Trash2,
  Mail,
  Calendar,
  Activity,
  UserCog,
} from "lucide-react";
import { toast } from "react-toastify";
import { getAvatarImgUrl } from "@/lib/constants";
import UserActionsPreview from "./UserActionsPreview";

export default function UserCard({ user, onActionSuccess }) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const isAdmin = user.role === "admin";

  // DELETE
  const performDelete = async () => {
    try {
      const res = await fetch(`/api/admin/users/${user._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("User deleted successfully.");
      onActionSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClick = () => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-4 p-2">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-400" /> Delete User?
          </h3>
          <p className="text-sm text-slate-400">
            Are you sure you want to delete{" "}
            <span className="font-bold text-cyan-400">{user.username}</span>?
            This action cannot be undone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={() => {
                closeToast();
                performDelete();
              }}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg transition-all"
            >
              Yes, Delete
            </button>
            <button
              onClick={closeToast}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 px-4 rounded-lg transition-all"
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

  // TOGGLE ROLE
  const performRoleToggle = async () => {
    const newRole = isAdmin ? "user" : "admin";
    try {
      const res = await fetch(`/api/admin/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newRole }),
      });
      if (!res.ok) throw new Error("Role update failed");
      toast.success(`User successfully updated to ${newRole.toUpperCase()}.`);
      onActionSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleToggleClick = () => {
    const actionText = isAdmin ? "Revoke Admin Access" : "Promote to Admin";
    const highlightColor = isAdmin ? "text-red-400" : "text-cyan-400";
    const buttonBg = isAdmin
      ? "bg-red-500 hover:bg-red-600 text-white"
      : "bg-cyan-500 hover:bg-cyan-600 text-slate-900";

    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-4 p-2">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <UserCog className={`w-5 h-5 ${highlightColor}`} /> Change User
            Role?
          </h3>
          <p className="text-sm text-slate-400 wrap-break-word text-center">
            Are you sure you want to{" "}
            <span className={`font-bold ${highlightColor}`}>
              {actionText.toLowerCase()}
            </span>{" "}
            for <span className="font-bold text-white">{user.username}</span>?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={() => {
                closeToast();
                performRoleToggle();
              }}
              className={`flex-1 font-bold py-2.5 px-4 rounded-lg transition-all ${buttonBg}`}
            >
              Yes, Confirm
            </button>
            <button
              onClick={closeToast}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 px-4 rounded-lg transition-all"
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

  return (
    <>
      <div
        className={`flex flex-col p-5 rounded-2xl bg-slate-900 border transition-all duration-300 ${isAdmin ? "border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:border-cyan-400" : "border-slate-800 hover:border-slate-600 shadow-lg"}`}
      >
        <div className="flex flex-col items-center text-center w-full">
          <img
            src={getAvatarImgUrl(user.avatar_id)}
            alt="avatar"
            className="w-16 h-16 rounded-xl border-2 border-slate-800 object-cover mb-3"
          />
          <h3 className="text-xl font-bold text-white wrap-break-word leading-tight w-full">
            {user.username}
          </h3>
          <div className="flex items-start justify-center gap-1.5 mt-2 text-sm text-slate-400 w-full">
            <Mail size={16} className="shrink-0 mt-0.5" />
            <span className="break-all leading-snug">{user.email}</span>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50 flex flex-col items-center gap-3 mt-5">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${isAdmin ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" : "bg-slate-800 text-slate-400 border-slate-700"}`}
          >
            {isAdmin ? <Shield size={14} /> : <ShieldAlert size={14} />}
            <span className="capitalize">{user.role}</span>
          </div>

          <div className="flex flex-col items-center gap-2 w-full border-t border-slate-800/50 pt-3">
            <span className="font-mono text-[11px] text-slate-500 break-all text-center">
              ID: {user._id}
            </span>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400">
              <Calendar size={14} />
              Joined{" "}
              {new Date(user.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          <button
            onClick={handleToggleClick}
            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all border border-slate-700"
          >
            <UserCog
              size={14}
              className={isAdmin ? "text-red-400" : "text-cyan-400"}
            />
            {isAdmin ? "Revoke Admin" : "Promote Admin"}
          </button>
          <button
            onClick={() => setIsActionsOpen(true)}
            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold transition-all border border-indigo-500/20"
          >
            <Activity size={14} /> Activity Logs
          </button>
        </div>

        <button
          onClick={handleDeleteClick}
          className="w-full flex items-center justify-center gap-2 py-2.5 mt-3 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-bold transition-all border border-red-500/20"
        >
          <Trash2 size={14} /> Delete User Account
        </button>
      </div>

      {isActionsOpen && (
        <UserActionsPreview
          userId={user._id}
          username={user.username}
          onClose={() => setIsActionsOpen(false)}
        />
      )}
    </>
  );
}
