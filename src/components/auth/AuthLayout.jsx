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
    <div
      className="relative min-h-screen flex overflow-hidden"
      style={{ background: "#07070F" }}
    >
      {/* Global Background Layers */}

      {/* Cyan Orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(6,182,212,.13) 0%, transparent 65%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      {/* Violet Orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(124,58,237,.13) 0%, transparent 65%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      {/* Dot Grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          pointerEvents: "none",
        }}
      />

      {/* LEFT PANEL */}

      <aside
        className="hidden lg:flex relative w-[55%] flex-col justify-between overflow-hidden"
        style={{
          padding: "56px 72px",
          borderRight: "1px solid rgba(255,255,255,.05)",
        }}
      >
        {/* Strong Cyan Orb */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(6,182,212,.18) 0%, transparent 70%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-4">
          <Image
            src={SITE_LOGO_URL}
            alt={SITE_NAME}
            width={40}
            height={40}
            style={{
              filter: "drop-shadow(0 0 14px rgba(6,182,212,.5))",
            }}
          />

          <span className="text-2xl font-bold tracking-tight text-white">
            {SITE_NAME}
          </span>
        </div>

        {/* Branding Content */}
        <div className="relative z-10 max-w-xl">
          <h1
            className="font-bold text-white leading-none"
            style={{
              fontSize: "60px",
              letterSpacing: "-.04em",
              marginBottom: "28px",
            }}
          >
            {leftHeading}
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,.5)",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            {leftText}
          </p>
          {features && (
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div key={index} className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="flex items-center justify-center rounded-lg shrink-0"
                      style={{
                        width: 44,
                        height: 44,
                        background: "rgba(6,182,212,.10)",
                        border: "1px solid rgba(6,182,212,.20)",
                      }}
                    >
                      <Icon
                        size={18}
                        style={{
                          color: "#22D3EE",
                        }}
                      />
                    </div>

                    {/* Text */}
                    <div>
                      <h3
                        style={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "15px",
                          marginBottom: 4,
                        }}
                      >
                        {feature.title}
                      </h3>

                      <p
                        style={{
                          color: "rgba(255,255,255,.45)",
                          fontSize: "14px",
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="relative z-10"
          style={{
            color: "rgba(255,255,255,.35)",
            fontSize: 12,
            letterSpacing: ".02em",
          }}
        >
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </aside>

      {/* RIGHT PANEL */}

      <section className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <Image
              src={SITE_LOGO_URL}
              alt={SITE_NAME}
              width={56}
              height={56}
              style={{
                filter: "drop-shadow(0 0 16px rgba(6,182,212,.5))",
              }}
            />

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
              {SITE_NAME}
            </h1>
          </div>

          {/* Gradient Border Wrapper */}
          <div
            style={{
              padding: "1px",
              borderRadius: "1.25rem",
              background:
                "linear-gradient(135deg, rgba(6,182,212,.25), rgba(124,58,237,.20))",
            }}
          >
            {/* Glass Card */}
            <div
              style={{
                background: "rgba(8,8,16,.92)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRadius: "calc(1.25rem - 1px)",
                padding: "40px",
              }}
              className="max-sm:p-7"
            >
              {/* Heading */}
              <div className="mb-8">
                <h2
                  style={{
                    color: "#fff",
                    fontSize: "22px",
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  {title}
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,.42)",
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  {subtitle}
                </p>
              </div>

              {children}

              {/* Bottom Divider */}
              <div
                style={{
                  marginTop: 32,
                  paddingTop: 24,
                  borderTop: "1px solid rgba(255,255,255,.06)",
                }}
              >
                <p
                  className="text-center"
                  style={{
                    color: "rgba(255,255,255,.42)",
                    fontSize: 14,
                  }}
                >
                  {bottomText}{" "}
                  <Link
                    href={bottomLinkHref}
                    className="transition-colors duration-200"
                    style={{
                      background: "linear-gradient(90deg,#06B6D4,#7C3AED)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "brightness(1.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "brightness(1)";
                    }}
                  >
                    {bottomLink}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
