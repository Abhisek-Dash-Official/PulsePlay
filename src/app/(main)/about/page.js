import { SITE_NAME, STATS, HOW_IT_WORKS, VALUES } from "@/lib/constants";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: `About | ${SITE_NAME}`,
    description: `Discover the mission and story behind ${SITE_NAME}, your ultimate cinematic discovery platform.`,
};

export default function AboutPage() {
    return (
        <div className="relative min-h-screen overflow-hidden" style={{ background: "#07070F" }}>
            {/* Background Atmosphere */}
            <div
                aria-hidden="true"
                className="absolute w-150 h-150 pointer-events-none"
                style={{ top: "-20%", left: "-15%", filter: "blur(70px)", background: "radial-gradient(circle, rgba(6,182,212,0.13) 0%, transparent 65%)" }}
            />
            <div
                aria-hidden="true"
                className="absolute w-150 h-150 pointer-events-none"
                style={{ bottom: "-20%", right: "-15%", filter: "blur(70px)", background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 65%)" }}
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-100"
                style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "30px 30px" }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

                {/* Hero Section */}
                <div className="relative text-center max-w-4xl mx-auto mb-24 pt-12">

                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/38 mb-6 relative z-10">About {SITE_NAME}</p>
                    <h1 className="font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl mb-8 text-white relative z-10 leading-tight">
                        We're redefining how you discover <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #06B6D4, #7C3AED)" }}>cinema.</span>
                    </h1>
                    <p className="text-xl text-white/75 relative z-10 max-w-2xl mx-auto">
                        Your gateway to endless entertainment. No friction, no fake buttons. Just the content you want, instantly.
                    </p>
                </div>

                {/* Mission Statement Card */}
                <div className="rounded-2xl p-px mb-24" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.3), rgba(124,58,237,0.3))" }}>
                    <div className="rounded-[calc(1rem-1px)] p-10 sm:p-16 bg-[rgba(10,10,20,0.9)] text-center relative overflow-hidden">
                        <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-80" style={{ color: "#22d3ee" }} />
                        <p className="text-2xl sm:text-3xl font-bold text-white leading-relaxed">
                            "We believe that finding a great movie shouldn't be harder than watching it. Our mission is to build the ultimate, unobstructed bridge between you and global entertainment."
                        </p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                    {STATS.map((stat, idx) => (
                        <div key={idx} className="bg-white/4 border border-white/8 rounded-2xl p-8 text-center hover:bg-white/[0.07] hover:border-white/[0.14] transition-colors">
                            <div className="text-4xl sm:text-5xl font-bold mb-2 bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #06B6D4, #7C3AED)" }}>
                                {stat.value}
                            </div>
                            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/38">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* How it Works */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/38 mb-4">The Process</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">How {SITE_NAME} Works</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {HOW_IT_WORKS.map((step, idx) => (
                            <div key={idx} className="relative bg-white/4 border border-white/8 rounded-2xl p-8 pt-12">
                                <div className="absolute -top-6 left-8 bg-[#07070F] px-2">
                                    <span className="text-4xl font-black bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #06B6D4, #7C3AED)" }}>
                                        {step.step}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-white/75">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Grid */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/38 mb-4">Our Core</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">Platform Values</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {VALUES.map((value, idx) => (
                            <div key={idx} className="bg-white/4 border border-white/8 rounded-2xl p-8 flex gap-6 hover:bg-white/[0.07] hover:border-white/[0.14] transition-colors">
                                <div className="shrink-0">
                                    <value.icon className="w-8 h-8 text-[#22d3ee]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-white/75">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Banner */}
                <div className="rounded-2xl p-px" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.3), rgba(124,58,237,0.3))" }}>
                    <div className="rounded-[calc(1rem-1px)] p-12 bg-[rgba(10,10,20,0.9)] text-center flex flex-col items-center">
                        <h2 className="text-3xl font-bold text-white mb-8">Ready to start watching?</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-white transition-all hover:brightness-110"
                                style={{ background: "linear-gradient(90deg, #06b6d4, #7c3aed)", boxShadow: "0 4px 24px rgba(124,58,237,0.3)" }}
                            >
                                Start Exploring
                            </Link>
                            <Link
                                href="/movies"
                                className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-white/12 text-white/65 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                Browse Movies
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}