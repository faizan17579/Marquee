"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "success" | "warning" | "danger" | "outline";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-gray-100 text-gray-700": variant === "default",
          "bg-amber-50 text-amber-700 border border-amber-200": variant === "gold",
          "bg-emerald-50 text-emerald-700 border border-emerald-200": variant === "success",
          "bg-yellow-50 text-yellow-700 border border-yellow-200": variant === "warning",
          "bg-red-50 text-red-700 border border-red-200": variant === "danger",
          "border border-gray-200 text-gray-600": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge };
