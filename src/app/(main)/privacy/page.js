import { SITE_NAME, HIGHLIGHTS, PRIVACY_SECTIONS } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `Understand how ${SITE_NAME} protects and handles your data.`,
};

export default function PrivacyPage() {
    return (
        <div className="relative min-h-screen overflow-hidden" style={{ background: "#07070F" }}>
            {/* Background Atmosphere */}
            <div aria-hidden="true" className="absolute w-150 h-150 pointer-events-none" style={{ top: "-20%", left: "-15%", filter: "blur(70px)", background: "radial-gradient(circle, rgba(6,182,212,0.13) 0%, transparent 65%)" }} />
            <div aria-hidden="true" className="absolute w-150 h-150 pointer-events-none" style={{ bottom: "-20%", right: "-15%", filter: "blur(70px)", background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 65%)" }} />
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-100" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

                {/* Hero Section */}
                <div className="mb-16 border-b border-white/8 pb-12">
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#7C3AED] mb-4">Legal</p>
                    <h1 className="font-bold tracking-tight text-4xl sm:text-5xl text-white mb-6">Privacy Policy</h1>
                    <div className="inline-flex items-center rounded-full bg-white/4 border border-white/8 px-4 py-1.5 text-sm text-white/38">
                        Last updated: <span className="text-white/75 ml-2">July 01, 2026</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Sticky Sidebar Nav */}
                    <aside className="lg:w-72 shrink-0">
                        <div className="sticky top-32 bg-white/2 border border-white/8 rounded-2xl p-6 hidden lg:block">
                            <h3 className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/38 mb-6">Contents</h3>
                            <nav className="space-y-4">
                                {PRIVACY_SECTIONS.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="sidebar-link block text-sm text-white/65 hover:text-white transition-colors"
                                    >
                                        {section.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1">

                        {/* Privacy at a Glance Card */}
                        <div className="rounded-2xl p-px mb-16" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.3), rgba(124,58,237,0.3))" }}>
                            <div className="rounded-[calc(1rem-1px)] p-8 bg-[rgba(10,10,20,0.9)]">
                                <h3 className="text-xl font-bold text-white mb-6">Privacy at a Glance</h3>
                                <ul className="space-y-4">
                                    {HIGHLIGHTS.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <CheckCircle2 className="w-6 h-6 text-[#22d3ee] shrink-0 mt-0.5" />
                                            <span className="text-white/75">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-16">
                            {PRIVACY_SECTIONS.map((section) => (
                                <section key={section.id} id={section.id} className="scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-2">{section.title}</h2>
                                    <div className="h-0.5 w-10 mb-6" style={{ background: "linear-gradient(90deg, #06B6D4, #7C3AED)" }} />
                                    <p className="text-white/75 leading-relaxed text-lg">
                                        {section.content}
                                    </p>
                                </section>
                            ))}
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
}