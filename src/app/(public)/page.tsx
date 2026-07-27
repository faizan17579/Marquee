"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  Star,
  Users,
  UtensilsCrossed,
  Camera,
  Car,
  Clock,
  Shield,
  Sparkles,
  ChevronRight,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { packages, testimonials, galleryImages } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const whyChooseUs = [
  { icon: Crown, title: "Premium Venue", desc: "Islamabad's most elegant marquee with stunning interiors and grand architecture" },
  { icon: UtensilsCrossed, title: "Exquisite Cuisine", desc: "Master chefs crafting traditional & continental menus with live counters" },
  { icon: Camera, title: "Photography", desc: "Professional photography & videography with cinematic drone coverage" },
  { icon: Car, title: "Valet Parking", desc: "Complimentary valet parking for up to 200 vehicles" },
  { icon: Shield, title: "Trusted Service", desc: "15+ years of creating unforgettable celebrations for thousands of families" },
  { icon: Users, title: "1000+ Capacity", desc: "Spacious halls accommodating intimate gatherings to grand celebrations" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')",
            }}
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-8">
              <Sparkles className="w-4 h-4 text-gold" />
              Islamabad&apos;s Premier Wedding Venue
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Celebrate Your{" "}
            <span className="text-gradient-gold">Special Moments</span> at Royal
            Palace Marquee
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Book weddings, walima, mehndi, corporate events and family gatherings
            in our luxurious venue with world-class service.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="xl">
              <Link href="/availability">Check Availability</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-charcoal">
              <Link href="/packages">View Packages</Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gold rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* About Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold/40" />
                <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">
                  About Us
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-6">
                A Legacy of Elegance &{" "}
                <span className="text-gold">Excellence</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Established in 2010, Royal Palace Marquee has been the premier
                wedding and event venue in Islamabad. Our stunning 50,000 sq.ft
                venue features grand banquet halls, beautiful gardens, and
                state-of-the-art facilities.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With over 2,000 successful events hosted, we take pride in
                turning your dreams into unforgettable celebrations. Our
                dedicated team ensures every detail is perfect — from exquisite
                cuisine to breathtaking decorations.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "15+", label: "Years" },
                  { value: "2000+", label: "Events" },
                  { value: "98%", label: "Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-serif text-3xl font-bold text-gold">{stat.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`rounded-2xl bg-gradient-to-br from-cream to-cream-dark overflow-hidden ${
                      i === 1 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                    }`}
                  >
                    <div className="w-full h-full bg-gold/5 flex items-center justify-center">
                      <Crown className="w-8 h-8 text-gold/30" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose Us"
            subtitle="Experience the finest hospitality with premium facilities and dedicated service"
          />
          <motion.div {...staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} {...fadeUp}>
                  <Card className="h-full border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:-translate-y-1">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mb-6 shadow-lg shadow-gold/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg text-charcoal mb-3">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Gallery"
            subtitle="Glimpses of celebrations we've brought to life"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.filter(g => g.featured).map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-cream-dark aspect-square group cursor-pointer ${
                  i === 0 ? "md:col-span-2 md:row-span-2 aspect-auto" : ""
                }`}
              >
                <div className="w-full h-full bg-gold/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <Camera className="w-10 h-10 text-gold/30 group-hover:scale-110 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/gallery">
                View Full Gallery <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Packages"
            subtitle="Choose from our carefully curated event packages"
            light
          />
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className={`h-full border-0 relative overflow-hidden ${pkg.popular ? "ring-2 ring-gold shadow-2xl shadow-gold/20" : "bg-white"}`}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gold text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                      pkg.tier === "royal" ? "gradient-gold" : pkg.tier === "gold" ? "bg-gold/10" : "bg-gray-100"
                    }`}>
                      <Crown className={`w-6 h-6 ${pkg.tier === "royal" ? "text-white" : pkg.tier === "gold" ? "text-gold" : "text-gray-500"}`} />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-charcoal mb-2">{pkg.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{pkg.capacity}</p>
                    <div className="mb-6">
                      <span className="font-serif text-3xl font-bold text-gold">{formatCurrency(pkg.price)}</span>
                      <span className="text-gray-400 text-sm"> / event</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.slice(0, 5).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-gold shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant={pkg.popular ? "default" : "outline"} className="w-full">
                      <Link href="/packages">View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Hear from the families who celebrated with us"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-0 bg-white">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-gold/20 mb-4" />
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{t.text}</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className={`w-4 h-4 ${si < t.rating ? "text-gold fill-gold" : "text-gray-200"}`} />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-white text-xs font-bold">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-charcoal">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.event}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gold/30">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-6">
              Ready to Plan Your Dream Event?
            </h2>
            <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
              Let us help you create memories that last a lifetime. Contact us today to
              book your date and start planning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="xl">
                <Link href="/booking">Book Now</Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/contact">
                  <Clock className="w-5 h-5" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
