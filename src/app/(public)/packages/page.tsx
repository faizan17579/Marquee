"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import {
  Crown,
  Star,
  Check,
  Users,
  UtensilsCrossed,
  Camera,
  Car,
  Sparkles,
} from "lucide-react";
import { packages } from "@/data/mock-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const tierIconStyles: Record<string, string> = {
  royal: "bg-gradient-to-br from-gold to-amber-600 text-white",
  gold: "bg-gold/10 text-gold",
  silver: "bg-gray-100 text-gray-500",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } as Transition,
  },
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Header */}
      <section className="pt-28 pb-16 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-charcoal/95" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Packages"
            subtitle="Choose the perfect package for your celebration. From intimate gatherings to grand royal affairs, we have a plan tailored for every occasion."
            light
          />
        </div>
      </section>

      {/* Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              className={pkg.popular ? "md:-mt-4 md:mb-4" : ""}
            >
              <Card
                className={`relative overflow-hidden ${
                  pkg.popular
                    ? "ring-2 ring-gold scale-105 shadow-xl shadow-gold/10"
                    : ""
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-0 right-0 z-10">
                    <Badge
                      variant="gold"
                      className="rounded-none rounded-bl-xl px-4 py-1.5 text-xs font-semibold tracking-wide"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Card Header Area */}
                <div className="p-6 pb-4 text-center border-b border-gray-100">
                  {/* Tier Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                      tierIconStyles[pkg.tier]
                    }`}
                  >
                    <Crown className="w-8 h-8" />
                  </div>

                  {/* Package Name */}
                  <h3 className="font-serif text-2xl font-bold text-charcoal mb-1">
                    {pkg.name}
                  </h3>

                  {/* Capacity */}
                  <div className="flex items-center justify-center gap-1.5 text-sm text-gray-500 mb-4">
                    <Users className="w-4 h-4" />
                    <span>{pkg.capacity}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gold">
                      {formatCurrency(pkg.price)}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {pkg.priceLabel}
                    </p>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  {/* Menu Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <UtensilsCrossed className="w-4 h-4 text-gold" />
                      <h4 className="font-semibold text-charcoal text-sm uppercase tracking-wide">
                        Menu
                      </h4>
                    </div>
                    <ul className="space-y-1.5">
                      {pkg.menu.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <Check className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Decoration */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-gold" />
                      <h4 className="font-semibold text-charcoal text-sm uppercase tracking-wide">
                        Decoration
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">
                      {pkg.decoration}
                    </p>
                  </div>

                  {/* Photography */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-4 h-4 text-gold" />
                      <h4 className="font-semibold text-charcoal text-sm uppercase tracking-wide">
                        Photography
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">
                      {pkg.photography}
                    </p>
                  </div>

                  {/* Parking */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="w-4 h-4 text-gold" />
                      <h4 className="font-semibold text-charcoal text-sm uppercase tracking-wide">
                        Parking
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">{pkg.parking}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-gold" />
                      <h4 className="font-semibold text-charcoal text-sm uppercase tracking-wide">
                        Features
                      </h4>
                    </div>
                    <ul className="space-y-1.5">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <Star className="w-3.5 h-3.5 text-gold/60 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Book Now Button */}
                  <div className="pt-2">
                    <Button
                      asChild
                      className="w-full"
                      size="lg"
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      <Link href="/booking">Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
