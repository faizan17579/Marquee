"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Users,
  Package,
  Palette,
  Camera,
  Flame,
  Plus,
  Minus,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const packageOptions = [
  { value: "250000", label: "Silver - Rs 250,000" },
  { value: "500000", label: "Gold - Rs 500,000" },
  { value: "1000000", label: "Royal - Rs 1,000,000" },
];

const decorationOptions = [
  { value: "0", label: "Standard (Included)" },
  { value: "50000", label: "Premium (+Rs 50,000)" },
  { value: "150000", label: "Luxury (+Rs 150,000)" },
];

const photographyOptions = [
  { value: "0", label: "None" },
  { value: "30000", label: "Basic (+Rs 30,000)" },
  { value: "80000", label: "Professional (+Rs 80,000)" },
  { value: "150000", label: "Cinematic (+Rs 150,000)" },
];

const bbqOptions = [
  { value: "0", label: "No" },
  { value: "40000", label: "Yes (+Rs 40,000)" },
];

const perHeadRates: Record<string, number> = {
  "250000": 800,
  "500000": 1200,
  "1000000": 1800,
};

export default function CostEstimatorPage() {
  const [guests, setGuests] = useState(300);
  const [packagePrice, setPackagePrice] = useState("500000");
  const [decoration, setDecoration] = useState("0");
  const [photography, setPhotography] = useState("0");
  const [bbq, setBbq] = useState("0");
  const [extraServices, setExtraServices] = useState(0);

  const breakdown = useMemo(() => {
    const hallCharges = Number(packagePrice);
    const foodCost = guests * (perHeadRates[packagePrice] ?? 1200);
    const decorationCost = Number(decoration);
    const photographyCost = Number(photography);
    const bbqCost = Number(bbq);
    const extra = Number(extraServices) || 0;

    const subtotal =
      hallCharges + foodCost + decorationCost + photographyCost + bbqCost + extra;
    const tax = Math.round(subtotal * 0.16);
    const grandTotal = subtotal + tax;

    return {
      hallCharges,
      foodCost,
      decorationCost,
      photographyCost,
      bbqCost,
      extra,
      subtotal,
      tax,
      grandTotal,
    };
  }, [guests, packagePrice, decoration, photography, bbq, extraServices]);

  const adjustGuests = (delta: number) => {
    setGuests((prev) => Math.max(50, prev + delta));
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Header */}
      <section className="pt-28 pb-16 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-charcoal/95" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Cost Estimator"
            subtitle="Get an instant estimate for your dream event at Royal Palace Marquee. Customize every detail and see your total in real time."
            light
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column - Inputs */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Number of Guests */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold" />
                    Number of Guests
                  </Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustGuests(-50)}
                      disabled={guests <= 50}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      value={guests}
                      onChange={(e) =>
                        setGuests(Math.max(50, Number(e.target.value) || 50))
                      }
                      min={50}
                      className="text-center text-lg font-semibold"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustGuests(50)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Per-head rate adjusts with selected package
                  </p>
                </div>

                {/* Package Selection */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gold" />
                    Package
                  </Label>
                  <Select
                    options={packageOptions}
                    value={packagePrice}
                    onChange={(e) => setPackagePrice(e.target.value)}
                  />
                </div>

                {/* Decoration Level */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-gold" />
                    Decoration Level
                  </Label>
                  <Select
                    options={decorationOptions}
                    value={decoration}
                    onChange={(e) => setDecoration(e.target.value)}
                  />
                </div>

                {/* Photography */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-gold" />
                    Photography
                  </Label>
                  <Select
                    options={photographyOptions}
                    value={photography}
                    onChange={(e) => setPhotography(e.target.value)}
                  />
                </div>

                {/* Live BBQ */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-gold" />
                    Live BBQ
                  </Label>
                  <Select
                    options={bbqOptions}
                    value={bbq}
                    onChange={(e) => setBbq(e.target.value)}
                  />
                </div>

                {/* Extra Services */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-gold" />
                    Extra Services
                  </Label>
                  <Input
                    type="number"
                    value={extraServices}
                    onChange={(e) => setExtraServices(Number(e.target.value) || 0)}
                    min={0}
                    placeholder="Additional amount (PKR)"
                  />
                  <p className="text-xs text-gray-400">
                    Add any additional services or custom requirements
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card className="overflow-hidden border-0 shadow-xl">
                {/* Gradient Gold Top Border */}
                <div className="h-2 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-charcoal">
                        Pricing Summary
                      </h3>
                      <p className="text-sm text-gray-400">
                        Estimated cost breakdown
                      </p>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Package className="w-4 h-4 text-gold/50" />
                        Hall Charges
                      </span>
                      <span className="font-medium text-charcoal">
                        {formatCurrency(breakdown.hallCharges)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Users className="w-4 h-4 text-gold/50" />
                        Food ({guests} guests)
                      </span>
                      <span className="font-medium text-charcoal">
                        {formatCurrency(breakdown.foodCost)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Palette className="w-4 h-4 text-gold/50" />
                        Decoration
                      </span>
                      <span className="font-medium text-charcoal">
                        {formatCurrency(breakdown.decorationCost)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-gold/50" />
                        Photography
                      </span>
                      <span className="font-medium text-charcoal">
                        {formatCurrency(breakdown.photographyCost)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-gold/50" />
                        Live BBQ
                      </span>
                      <span className="font-medium text-charcoal">
                        {formatCurrency(breakdown.bbqCost)}
                      </span>
                    </div>

                    {breakdown.extra > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Plus className="w-4 h-4 text-gold/50" />
                          Extra Services
                        </span>
                        <span className="font-medium text-charcoal">
                          {formatCurrency(breakdown.extra)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-gray-200 my-6" />

                  {/* Subtotal & Tax */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium text-charcoal">
                        {formatCurrency(breakdown.subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Tax (16% GST)</span>
                      <span className="font-medium text-charcoal">
                        {formatCurrency(breakdown.tax)}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t-2 border-gold/20 my-6" />

                  {/* Grand Total */}
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-serif font-bold text-charcoal">
                      Grand Total
                    </span>
                    <span className="text-2xl font-bold text-gold">
                      {formatCurrency(breakdown.grandTotal)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mb-6 text-center">
                    This is an estimate. Final pricing may vary based on
                    availability and specific requirements.
                  </p>

                  {/* Book Now Button */}
                  <Button asChild size="lg" className="w-full">
                    <Link href="/contact">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
