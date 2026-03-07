import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-md border border-[#1a1a24] bg-[#0f0f14] px-3 py-2 text-sm text-[#e8e8ed] transition-colors outline-none placeholder:text-[#6b6b7a]/60 focus:border-white/20 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
