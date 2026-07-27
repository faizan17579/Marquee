"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, SlidersHorizontal } from "lucide-react";
import { galleryImages } from "@/data/mock-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

const categories = [
  { label: "All", value: "all" },
  { label: "Weddings", value: "weddings" },
  { label: "Walima", value: "walima" },
  { label: "Mehndi", value: "mehndi" },
  { label: "Corporate Events", value: "corporate" },
] as const;

const aspectClasses = ["aspect-square", "aspect-[3/4]", "aspect-[4/3]"] as const;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Header */}
      <section className="pt-28 pb-16 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-charcoal/95" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Gallery"
            subtitle="A visual journey through the celebrations we have brought to life at Royal Palace Marquee"
            light
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gold/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            <SlidersHorizontal className="w-4 h-4 text-gold shrink-0 mr-1" />
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(cat.value)}
                className={
                  activeCategory === cat.value
                    ? ""
                    : "text-charcoal/70 hover:text-charcoal hover:bg-gold/10"
                }
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Count */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-charcoal">{filteredImages.length}</span>{" "}
          {filteredImages.length === 1 ? "photo" : "photos"}
          {activeCategory !== "all" && (
            <>
              {" "}in{" "}
              <span className="font-semibold text-gold">
                {categories.find((c) => c.value === activeCategory)?.label}
              </span>
            </>
          )}
        </p>
      </section>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-4"
          >
            {filteredImages.map((image, index) => {
              const aspectClass = aspectClasses[index % 3];
              return (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="mb-4 break-inside-avoid"
                >
                  <div
                    className={`group relative rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-cream-dark cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${aspectClass}`}
                  >
                    {/* Placeholder content */}
                    <div className="absolute inset-0 bg-gold/5 flex flex-col items-center justify-center gap-3 group-hover:bg-gold/10 transition-colors duration-300">
                      <Camera className="w-10 h-10 text-gold/30 group-hover:text-gold/50 transition-colors duration-300" />
                      <span className="text-xs text-gold/40 group-hover:text-gold/60 font-medium tracking-wide transition-colors duration-300">
                        {image.alt}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 rounded-2xl" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-block px-3 py-1 bg-gold/90 text-white text-xs font-semibold rounded-full capitalize">
                        {image.category}
                      </span>
                    </div>

                    {/* Featured badge */}
                    {image.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-block px-2 py-1 bg-charcoal/80 text-gold text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <Camera className="w-16 h-16 text-gold/20 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-charcoal mb-2">No photos found</h3>
            <p className="text-gray-500 mb-6">
              No images available in this category yet.
            </p>
            <Button variant="outline" onClick={() => setActiveCategory("all")}>
              View All Photos
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  );
}
