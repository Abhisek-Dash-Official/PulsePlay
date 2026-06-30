import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_LOGO_URL } from "@/lib/constants";

export default function AuthLayout({
  title,
  subtitle,
  bottomText,
  bottomLink,
  bottomLinkHref,
  children,
  leftHeading,
  leftText,
  features,
}) {
  return (
    <div className="min-h-screen flex w-full bg-[#121217]/70 selection:bg-cyan-500/30 font-sans">
      {/* LEFT SIDE: The Pitch & Branding */}
      <div className="hidden lg:flex w-[55%] relative flex-col justify-between p-16 overflow-hidden border-r border-white/5">
        {/* Backgrounds */}
        <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-cyan-900/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <Image
            src={SITE_LOGO_URL}
            alt={SITE_NAME}
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-2xl font-bold text-white tracking-tight">
            {SITE_NAME}
          </span>
        </div>

        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-tighter mb-6">
            {leftHeading}
          </h1>
          <p className="text-lg text-slate-400 font-light leading-relaxed mb-12 max-w-md">
            {leftText}
          </p>

          {features && (
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-white/5 rounded-lg border border-white/10">
                    <feature.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{feature.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: Form Container */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 relative">
        <div className="lg:hidden absolute top-0 right-0 w-full h-full bg-cyan-900/10 blur-[100px] pointer-events-none z-0" />

        <div className="w-full max-w-110 z-10">
          <div className="flex flex-col items-center text-center mb-10 lg:hidden">
            <Image
              src={SITE_LOGO_URL}
              alt={SITE_NAME}
              width={56}
              height={56}
              className="mb-4"
            />
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {SITE_NAME}
            </h1>
          </div>

          <div className="bg-[#0f0f13]/80 backdrop-blur-2xl rounded-2xl border border-white/8 p-8 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                {title}
              </h2>
              <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
            </div>

            {children}

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-center text-sm text-slate-400">
                {bottomText}{" "}
                <Link
                  href={bottomLinkHref}
                  className="text-white font-medium hover:text-cyan-400 transition-colors duration-200"
                >
                  {bottomLink}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
