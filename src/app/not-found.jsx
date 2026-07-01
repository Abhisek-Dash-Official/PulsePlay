import Link from "next/link";
import { Home, Compass, Film } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes pulseGlow {
          0%,100%{
            filter: drop-shadow(0 0 18px rgba(6,182,212,.22))
                    drop-shadow(0 0 40px rgba(124,58,237,.16));
          }
          50%{
            filter: drop-shadow(0 0 32px rgba(6,182,212,.4))
                    drop-shadow(0 0 70px rgba(124,58,237,.3));
          }
        }

        @keyframes filmFlicker {
          0%,100%{
            transform: rotate(-4deg) translateY(0px);
            opacity:.95;
          }
          20%{
            opacity:.7;
          }
          45%{
            transform: rotate(-3deg) translateY(-5px);
          }
          60%{
            opacity:1;
          }
          80%{
            transform: rotate(-5deg) translateY(3px);
          }
        }

        .pulse-glow{
          animation:pulseGlow 4s ease-in-out infinite;
        }

        .film-flicker{
          animation:filmFlicker 5s ease-in-out infinite;
        }

        .dot-grid{
          background-image:
            radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px);
          background-size:32px 32px;
        }

        .scanlines::before{
          content:"";
          position:absolute;
          inset:0;
          pointer-events:none;
          background:repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,.02),
            rgba(255,255,255,.02) 1px,
            transparent 2px,
            transparent 4px
          );
          opacity:.15;
          mix-blend-mode:soft-light;
        }
      `}</style>

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070F] text-white">
        {/* Background */}
        <div className="absolute inset-0 dot-grid scanlines" />

        {/* Cyan Orb */}
        <div
          className="absolute -left-32 -top-32 h-112 w-md rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,.18), transparent 70%)",
          }}
        />

        {/* Violet Orb */}
        <div
          className="absolute -bottom-40 -right-32 h-136 w-136 rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,.18), transparent 72%)",
          }}
        />

        <section className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          {/* Decorative Film Icon */}
          <div className="film-flicker mb-8 rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl">
            <Film size={56} strokeWidth={1.5} className="text-cyan-400" />
          </div>

          {/* 404 */}
          <h1
            className="pulse-glow select-none text-[7rem] font-black tracking-[-0.08em] sm:text-[9rem] md:text-[12rem] lg:text-[15rem] leading-none"
            style={{
              background: "linear-gradient(90deg,#06B6D4 0%,#7C3AED 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            404
          </h1>

          {/* Heading */}
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            This scene got cut from the final edit.
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base leading-7 text-white/55 md:text-lg">
            The page you're looking for doesn't exist, was moved, or never made
            it past production.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-7 py-3 font-semibold tracking-tight text-white transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "linear-gradient(90deg,#06B6D4 0%,#7C3AED 100%)",
                boxShadow:
                  "0 0 35px rgba(6,182,212,.18),0 0 55px rgba(124,58,237,.16)",
              }}
            >
              <Home size={18} />
              Go Home
              <span
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg,rgba(255,255,255,.12),transparent)",
                }}
              />
            </Link>

            <Link
              href="/movies"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 px-7 py-3 font-medium tracking-tight text-white/85 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
            >
              <Compass size={18} />
              Browse Movies
            </Link>
          </div>

          {/* Gradient Card */}
          <div className="relative mt-14 w-full max-w-xl rounded-2xl p-px">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(90deg, rgba(6,182,212,.3), rgba(124,58,237,.3))",
              }}
            />

            <div className="relative rounded-2xl bg-[rgba(255,255,255,0.04)] px-6 py-5 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.28em] text-white/35">
                STREAM STATUS
              </p>

              <p className="mt-2 text-lg font-semibold text-white/90">
                Reel Missing • Scene Unavailable
              </p>

              <p className="mt-1 text-sm text-white/45">
                Return to the homepage or continue exploring the latest movies
                and series on PulsePlay.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
