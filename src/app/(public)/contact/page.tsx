"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { businessSettings } from "@/data/mock-data";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: businessSettings.phone,
    action: "Call Now",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: businessSettings.whatsapp,
    action: "Chat on WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    value: businessSettings.email,
    action: "Send Email",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: businessSettings.workingHours,
    action: "",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              Get In Touch
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              Contact <span className="text-gold">Us</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              We&apos;d love to hear from you. Reach out to us for inquiries,
              bookings, or just to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map & Contact */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-xl overflow-hidden h-full">
                <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-cream to-cream-dark flex flex-col items-center justify-center gap-4 p-8">
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-charcoal text-center">
                    Royal Palace Marquee
                  </h3>
                  <p className="text-gray-500 text-center text-sm max-w-xs">
                    {businessSettings.address}
                  </p>
                  <p className="text-gray-400 text-sm">{businessSettings.city}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <ExternalLink className="w-4 h-4" />
                    Open in Google Maps
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">
                  Get in Touch
                </h2>
                <p className="text-gray-500">
                  Our team is available to assist you with any inquiries.
                </p>
              </div>

              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Card className="border-0 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-gold" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-400 mb-1">
                            {item.title}
                          </div>
                          <div className="font-medium text-charcoal">
                            {item.value}
                          </div>
                        </div>
                        {item.action && (
                          <Button variant="ghost" size="sm" className="text-gold shrink-0">
                            {item.action}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}

              {/* Address */}
              <Card className="border-0 bg-charcoal">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white mb-1">Our Address</div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {businessSettings.address}
                        <br />
                        {businessSettings.city}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
