"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, text }: { href: string; text: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative py-1 transition-colors hover:text-[#e8e8ed] ${
        isActive ? "text-white font-medium" : "text-[#6b6b7a]"
      }`}
    >
      {text}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/60" />
      )}
    </Link>
  );
}
