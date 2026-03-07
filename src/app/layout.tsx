import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const description = "An alternate UI for my Goodreads data";

export const metadata: Metadata = {
  title: "Bookshelf",
  description,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased w-screen h-screen flex flex-col bg-[#08080c] text-[#e8e8ed] font-sans`}
      >
        {/* Background layers */}
        <div className="fixed inset-0 bg-grid z-0 pointer-events-none" />
        <div className="fixed inset-0 bg-gradient z-0 pointer-events-none" />
        <div className="fixed inset-0 bg-vignette z-0 pointer-events-none" />
        <NavBar />
        <main id="top" className="relative z-10 flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
