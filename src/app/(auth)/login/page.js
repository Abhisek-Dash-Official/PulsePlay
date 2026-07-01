"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Mail,
    Lock,
    Loader2,
    Play,
} from "lucide-react";
import { toast } from "react-toastify";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";

import { useUserStore } from "@/store/userStore";
import { SITE_NAME } from "@/lib/constants";

const LoginBrandingHeading = () => (
    <>
        Resume your
        <br />

        <span
            style={{
                background:
                    "linear-gradient(90deg,#06B6D4,#7C3AED)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}
        >
            cinematic journey.
        </span>
    </>
);

export default function LoginPage() {
    const router = useRouter();

    const setUserData = useUserStore((state) => state.setUserData);

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

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

                toast.success(`Welcome back, ${data.user.username}!`);

                router.push("/");
                router.refresh();
            } else {
                toast.error(data.error || "Invalid credentials.");
            }
        } catch (error) {
            toast.error("Authentication service unavailable. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Enter your details to sign in to your account."
            bottomText="Don't have an account?"
            bottomLink="Sign up"
            bottomLinkHref="/signup"
            leftHeading={<LoginBrandingHeading />}
            leftText={`Welcome back to ${SITE_NAME}. Dive straight into your watchlist, pick up where you left off, and explore new blockbuster drops curated just for you.`}
        >
            <form
                onSubmit={handleLogin}
                className="space-y-4"
            >        <AuthInput
                    icon={Mail}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                />

                <AuthInput
                    icon={Lock}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-200 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                        background: "linear-gradient(90deg,#06B6D4,#7C3AED)",
                        boxShadow: "0 4px 24px rgba(124,58,237,.35)",
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading) {
                            e.currentTarget.style.filter = "brightness(1.08)";
                            e.currentTarget.style.boxShadow = "0 6px 30px rgba(124,58,237,.45)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.filter = "brightness(1)";
                        e.currentTarget.style.boxShadow = "0 4px 24px rgba(124,58,237,.35)";
                    }}
                >
                    {isLoading ? (
                        <Loader2
                            size={20}
                            className="animate-spin"
                        />
                    ) : (
                        <>
                            <span>Sign In</span>
                            <Play
                                size={16}
                                className="fill-current"
                            />
                        </>
                    )}
                </button>
            </form>
        </AuthLayout>
    );
}