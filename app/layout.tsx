import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyAnnouncement } from "@/components/StickyAnnouncement";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCT.DEV | Full-Stack Developer & Thesis Specialist",
  description: "Mark Christian Trajano - Professional Full-Stack Web & Mobile Developer and Academic Research Specialist in the Philippines. Expert in React, Next.js, and Thesis Systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col pt-16 md:pt-20">
        <ConvexClientProvider>
          {/* Ambient Global Glow matching OpenClaw */}
          <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#3b82f6]/10 blur-[120px] rounded-full pointer-events-none z-[-2]"></div>
          
          <Navbar />
          <main className="flex-grow">{children}</main>
          <StickyAnnouncement />
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
