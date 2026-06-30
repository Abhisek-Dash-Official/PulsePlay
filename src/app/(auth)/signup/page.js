"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import AvatarSelector from '@/components/auth/AvatarSelector';
import { SIGNUP_FEATURES } from '@/lib/constants'

const SignupBrandingHeading = () => (
    <>
        Stop searching.<br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
            Start streaming.
        </span>
    </>
);

export default function SignupPage() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        avatar_id: '1'
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleAvatarSelect = (id) => setFormData({ ...formData, avatar_id: id });

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Account provisioned successfully. Please log in.");
                router.push('/login');
            } else {
                toast.error(data.error || "Account creation failed.");
            }
        } catch (error) {
            toast.error("Authentication service unavailable. Please try again later.");
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
            leftText="Tired of hunting for free movies across fake sites? We find the direct watch and download links so you don't have to. One premium interface, zero hassle."
            features={SIGNUP_FEATURES}
        >
            <form onSubmit={handleSignup} className="space-y-4">
                <div className="mb-6">
                    <AvatarSelector selectedId={formData.avatar_id} onSelect={handleAvatarSelect} />
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
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                </button>
            </form>
        </AuthLayout>
    );
}