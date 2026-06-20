import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PulsePlay",
  description: "An advanced media portal for algorithmic content discovery, seamless streaming, and direct downloading.",
  keywords: [
    "PulsePlay",
    "watch movies online",
    "free movie downloads",
    "online streaming portal",
    "stream and download",
    "HD media hub",
    "external download links",
    "watch web series",
    "latest movie streams",
    "dual action media player",
    "entertainment portal",
    "direct download movies"
  ],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
