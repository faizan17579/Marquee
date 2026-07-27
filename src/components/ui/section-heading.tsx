"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = true, light = false, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(centered && "text-center", "mb-12", className)}
    >
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px w-12 bg-gold/40" />
        <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Royal Palace</span>
        <div className="h-px w-12 bg-gold/40" />
      </div>
      <h2 className={cn("font-serif text-3xl sm:text-4xl font-bold mb-4", light ? "text-white" : "text-charcoal")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-lg max-w-2xl mx-auto", light ? "text-gray-300" : "text-gray-500")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
