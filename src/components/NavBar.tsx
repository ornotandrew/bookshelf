"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <nav className="relative z-10 flex items-center justify-between p-4">
        <a
          href="https://andrewvr.dev"
          className="text-sm text-[#8a847a] hover:text-white/60 transition-colors font-mono"
        >
          ← Home
        </a>
        <a
          href="#top"
          className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold tracking-wide hover:text-white/80 transition-colors"
        >
          Bookshelf
        </a>
        <div className="w-16" />
      </nav>
    );
  }

  return (
    <nav className="relative z-10 flex items-center justify-between p-4">
      <Link
        href="/"
        className="text-sm text-[#8a847a] hover:text-white/60 transition-colors font-mono"
      >
        ← Bookshelf
      </Link>
      <div className="w-16" />
    </nav>
  );
}
