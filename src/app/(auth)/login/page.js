"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, Play } from 'lucide-react';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/userStore';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import { SITE_NAME } from '@/lib/constants';

const LoginBrandingHeading = () => (
    <>
        Resume your<br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
            cinematic journey.
        </span>
    </>
);

export default function LoginPage() {
    const router = useRouter();
    const setUserData = useUserStore((state) => state.setUserData);

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success) {
                setUserData({
                    id: data.user.id,
                    username: data.user.username,
                    avatar_id: data.user.avatar_id,
                    role: data.user.role
                });

                toast.success(`Welcome back, ${data.user.username}!`);
                router.push('/');
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
            <form onSubmit={handleLogin} className="space-y-4">
                <AuthInput
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
                    className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0f0f13] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <Play className="w-4 h-4 fill-current" /></>}
                </button>
            </form>
        </AuthLayout>
    );
}