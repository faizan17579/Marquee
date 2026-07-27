"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  Upload,
  Trash2,
  Eye,
  Plus,
  Camera,
  Filter,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { galleryImages } from "@/data/mock-data";
import type { GalleryImage } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const categories = [
  { value: "all", label: "All" },
  { value: "weddings", label: "Weddings" },
  { value: "walima", label: "Walima" },
  { value: "mehndi", label: "Mehndi" },
  { value: "corporate", label: "Corporate" },
];

export default function GalleryManagementPage() {
  const [images, setImages] = useState<GalleryImage[]>(galleryImages);
  const [filter, setFilter] = useState("all");
  const [previewImage, setPreviewImage] = useState<GalleryImage | null>(null);
  const [deleteImage, setDeleteImage] = useState<GalleryImage | null>(null);

  const filtered =
    filter === "all" ? images : images.filter((i) => i.category === filter);

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((i) => i.id !== id));
    setDeleteImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">
            Gallery Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {images.length} photos across all categories
          </p>
        </div>
        <Button>
          <Upload className="w-4 h-4" />
          Upload Photos
        </Button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-gray-400" />
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={filter === cat.value ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter(cat.value)}
          >
            {cat.label}
            {cat.value !== "all" && (
              <span className="ml-1 text-xs opacity-70">
                ({images.filter((i) => cat.value === "all" || i.category === cat.value).length})
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <button className="w-full aspect-square rounded-2xl border-2 border-dashed border-gray-200 hover:border-gold hover:bg-gold/5 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-gray-100 group-hover:bg-gold/10 flex items-center justify-center transition-colors">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-gold transition-colors" />
            </div>
            <span className="text-sm text-gray-400 group-hover:text-gold transition-colors">
              Upload Image
            </span>
          </button>
        </motion.div>

        <AnimatePresence>
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-cream-dark aspect-square">
                <div className="w-full h-full bg-gold/5 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gold/30" />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                    onClick={() => setPreviewImage(img)}
                  >
                    <Eye className="w-4 h-4 text-charcoal" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-red-500/90 flex items-center justify-center hover:bg-red-500 transition-colors cursor-pointer"
                    onClick={() => setDeleteImage(img)}
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="gold" className="capitalize text-xs">
                    {img.category}
                  </Badge>
                </div>
                {img.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="success" className="text-xs">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-gray-500 truncate px-1">
                {img.alt}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-16 text-center">
            <Image className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-charcoal mb-2">
              No images in this category
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Upload images to populate this category.
            </p>
            <Button size="sm">
              <Upload className="w-4 h-4" />
              Upload Photos
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Preview Modal */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{previewImage?.alt}</DialogTitle>
            <DialogDescription className="capitalize">
              Category: {previewImage?.category}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video rounded-xl bg-gradient-to-br from-cream to-cream-dark flex items-center justify-center mt-4">
            <Camera className="w-16 h-16 text-gold/30" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteImage} onOpenChange={() => setDeleteImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteImage?.alt}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => deleteImage && handleDelete(deleteImage.id)}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDeleteImage(null)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
