import { SITE_NAME, CONTACT_CARDS, FAQ } from "@/lib/constants";
import { ChevronDown, HelpCircle } from "lucide-react";

export const metadata = {
    title: `Contact Us | ${SITE_NAME}`,
    description: `Get in touch with the ${SITE_NAME} team for support, inquiries, or feedback.`,
};

export default function ContactPage() {
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
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/38 mb-4">Get In Touch</p>
                    <h1 className="font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl mb-6 text-white">
                        How can we <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #06B6D4, #7C3AED)" }}>help you?</span>
                    </h1>
                    <p className="text-lg text-white/75">
                        Whether you have a question about features, need support, or just want to join the community, we're here for you.
                    </p>
                </div>

                {/* Contact Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {CONTACT_CARDS.map((card, idx) => (
                        <div key={idx} className="rounded-2xl p-px transition-transform hover:-translate-y-1" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.3), rgba(124,58,237,0.3))" }}>
                            <div className="h-full rounded-[calc(1rem-1px)] p-8 bg-[rgba(10,10,20,0.9)] flex flex-col items-center text-center">
                                <div className="p-4 rounded-full bg-white/4 mb-6">
                                    <card.icon className="w-8 h-8 text-[#22d3ee]" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{card.label}</h3>
                                <p className="text-white/75 mb-6 grow">{card.value}</p>
                                <a
                                    href={card.href}
                                    className="text-[#22d3ee] hover:text-[#67e8f9] font-medium transition-colors"
                                >
                                    {card.linkText} &rarr;
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mb-24">
                    <div className="text-center mb-12">
                        <HelpCircle className="w-10 h-10 mx-auto text-[#7C3AED] mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {FAQ.map((item, idx) => (
                            <details key={idx} className="group bg-white/4 border border-white/8 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-medium hover:bg-white/2 transition-colors rounded-2xl">
                                    {item.question}
                                    <ChevronDown className="w-5 h-5 text-white/38 transition-transform duration-300 group-open:rotate-180" />
                                </summary>
                                <div className="px-6 pb-6 text-white/75 leading-relaxed border-t border-white/8 pt-4 mt-2 mx-6">
                                    {item.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center bg-white/4 border border-white/8 rounded-2xl p-12 hover:bg-white/[0.07] hover:border-white/[0.14] transition-colors">
                    <h2 className="text-2xl font-bold text-white mb-4">Still need help?</h2>
                    <p className="text-white/75 mb-8">Drop us an email and our support team will get back to you within 24 hours.</p>
                    <a
                        href="mailto:support@pulseplay.app"
                        className="inline-block px-8 py-3 rounded-xl font-semibold text-white transition-all hover:brightness-110"
                        style={{ background: "linear-gradient(90deg, #06b6d4, #7c3aed)", boxShadow: "0 4px 24px rgba(124,58,237,0.3)" }}
                    >
                        Send us a message
                    </a>
                </div>

            </div>
        </div>
    );
}