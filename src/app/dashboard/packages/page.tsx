"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Edit,
  Crown,
  Star,
  Users,
  Camera,
  UtensilsCrossed,
  Save,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { packages } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function PackagesManagementPage() {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Packages Management</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your event packages, pricing, and inclusions
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all overflow-hidden h-full">
              <div
                className={`h-2 ${
                  pkg.tier === "royal"
                    ? "gradient-gold"
                    : pkg.tier === "gold"
                    ? "bg-gold"
                    : "bg-gray-300"
                }`}
              />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        pkg.tier === "royal"
                          ? "gradient-gold"
                          : pkg.tier === "gold"
                          ? "bg-gold/10"
                          : "bg-gray-100"
                      }`}
                    >
                      <Crown
                        className={`w-6 h-6 ${
                          pkg.tier === "royal"
                            ? "text-white"
                            : pkg.tier === "gold"
                            ? "text-gold"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {pkg.capacity}
                      </p>
                    </div>
                  </div>
                  {pkg.popular && <Badge variant="gold">Popular</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price */}
                {editingId === pkg.id ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Package Price (PKR)</Label>
                      <Input
                        type="number"
                        defaultValue={pkg.price}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Save className="w-3 h-3" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gold">
                        {formatCurrency(pkg.price)}
                      </span>
                      <span className="text-gray-400 text-sm"> / event</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingId(pkg.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Menu */}
                <div>
                  <h4 className="text-sm font-medium text-charcoal flex items-center gap-2 mb-3">
                    <UtensilsCrossed className="w-4 h-4 text-gold" />
                    Menu Items
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.menu.map((item) => (
                      <span
                        key={item}
                        className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400">Decoration: </span>
                      <span className="text-gray-600">{pkg.decoration}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400">Photography: </span>
                      <span className="text-gray-600">{pkg.photography}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400">Parking: </span>
                      <span className="text-gray-600">{pkg.parking}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setEditingId(pkg.id)}
                  >
                    <Edit className="w-3 h-3" />
                    Edit Package
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="w-3 h-3" />
                    Photos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
