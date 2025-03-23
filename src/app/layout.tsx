import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./globals.css";
import { NavLink } from "@/components/NavLink";
import Image from "next/image";
import booksIcon from "../../public/books.svg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = "An alternate UI for my Goodreads data";

export const metadata: Metadata = {
  title: "Bookshelf",
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen flex flex-col bg-background text-foreground`}
      >
        <nav className="flex items-center p-4 border-b border-gray-600">
          <Image
            priority
            src={booksIcon}
            alt={description}
            width={32}
            height={32}
          />
          <ul className="flex space-x-8 ml-8">
            <li>
              <NavLink href="/" text="Books" />
            </li>
            {/* <li>
              <NavLink href="/stats" text="Stats" />
            </li> */}
          </ul>
        </nav>
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
