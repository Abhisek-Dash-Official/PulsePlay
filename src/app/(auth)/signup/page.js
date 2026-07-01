"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/userStore";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AvatarSelector from "@/components/auth/AvatarSelector";

import { SIGNUP_FEATURES } from "@/lib/constants";

const SignupBrandingHeading = () => (
    <>
        Stop searching.<br />
        <span
            style={{
                background: "linear-gradient(90deg, #06B6D4, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}
        >
            Start streaming.
        </span>
    </>
);

function getStrength(password) {
    if (!password) return 0;
    if (password.length < 6) return 1;

    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= 8 && (hasNumber || hasSpecial)) return 3;
    return 2;
}

function StrengthBar({ password }) {
    const strength = getStrength(password);

    const label = strength === 1 ? "Weak" : strength === 2 ? "Fair" : strength === 3 ? "Strong" : "";
    const color = strength === 1 ? "#ef4444" : strength === 2 ? "#f59e0b" : strength === 3 ? "#06B6D4" : "transparent";

    return (
        <div className="mt-2">
            <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-1 flex-1 rounded-full"
                        style={
                            {
                                background: i <= strength ? strength === 3 ? "linear-gradient(90deg,#06B6D4,#7C3AED)" : color : "rgba(255,255,255,0.08)",
                            }}
                    />
                ))}
            </div>

            {password && (
                <div
                    className="text-[11px] mt-1 text-right"
                    style={{ color }}
                >
                    {label}
                </div>
            )}
        </div>
    );
}

export default function SignupPage() {
    const router = useRouter();
    const setUserData = useUserStore((s) => s.setUserData);

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        avatar_id: "1",
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAvatarSelect = (id) => setFormData({ ...formData, avatar_id: id });

    const handleSignup = async (e) => {
        e.preventDefault(); setIsLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setUserData({
                    id: data.user.id,
                    username: data.user.username,
                    avatar_id: data.user.avatar_id,
                    role: data.user.role,
                });

                toast.success("Welcome to PulsePlay!");
                router.push("/");
                router.refresh();
            } else {
                toast.error(data.error || "Account creation failed.");
            }
        } catch {
            toast.error("Authentication service unavailable.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create an Account"
            subtitle="Join the ultimate movie hub today."
            bottomText="Already have an account?"
            bottomLink="Sign in"
            bottomLinkHref="/login"
            leftHeading={<SignupBrandingHeading />}
            leftText="Tired of hunting for movies across fake sites? We unify discovery, streaming, and downloads in one cinematic platform."
            features={SIGNUP_FEATURES}
        >
            <form onSubmit={handleSignup} className="space-y-4">
                {/* Avatar */}
                <div className="mb-6">
                    <AvatarSelector
                        selectedId={formData.avatar_id}
                        onSelect={handleAvatarSelect}
                    />
                </div>

                <AuthInput
                    icon={User}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                />

                <AuthInput
                    icon={Mail}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                />

                <div>
                    <AuthInput
                        icon={Lock}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />

                    <StrengthBar password={formData.password} />
                </div>

                {/* Primary CTA */}
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        background: "linear-gradient(90deg, #06b6d4, #7c3aed)",
                        boxShadow: "0 4px 24px rgba(124,58,237,0.35)",
                    }}
                    className="w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-wide transition-all hover:brightness-110 hover:shadow-[0_6px_30px_rgba(124,58,237,0.45)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Create Account <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>
        </AuthLayout>
    );
}