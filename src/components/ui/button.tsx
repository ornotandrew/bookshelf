import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-white/30",
  {
    variants: {
      variant: {
        default:
          "bg-white/20 text-white shadow-sm hover:bg-white/30 border border-white/10",
        destructive:
          "bg-red-500/20 text-red-300 shadow-sm hover:bg-red-500/30 border border-red-500/20",
        outline:
          "border border-white/20 bg-transparent shadow-sm hover:bg-white/10 text-[#e8e8ed]",
        secondary:
          "bg-[#0f0f14] text-[#e8e8ed] shadow-sm hover:bg-[#0f0f14]/80 border border-[#1a1a24]",
        ghost:
          "hover:bg-white/10 text-[#e8e8ed]",
        link: "text-[#e8e8ed] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
