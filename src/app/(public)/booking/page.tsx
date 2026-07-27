"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Users,
  Package,
  FileText,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function BookingPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    guests: "",
    eventDate: "",
    package: "",
    specialNotes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
              Book Your Event
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              Booking <span className="text-gold">Request</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Fill out the form below and our team will get back to you within 24
              hours to confirm your booking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gold" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Ahmed Hassan"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gold" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+92 3XX XXXXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gold" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Event Type */}
                    <div className="space-y-2">
                      <Label htmlFor="eventType" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold" />
                        Event Type
                      </Label>
                      <Select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        placeholder="Select event type"
                        options={[
                          { value: "wedding", label: "Wedding" },
                          { value: "walima", label: "Walima" },
                          { value: "mehndi", label: "Mehndi" },
                          { value: "corporate", label: "Corporate Event" },
                          { value: "family", label: "Family Gathering" },
                        ]}
                        required
                      />
                    </div>

                    {/* Guests */}
                    <div className="space-y-2">
                      <Label htmlFor="guests" className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gold" />
                        Number of Guests
                      </Label>
                      <Input
                        id="guests"
                        name="guests"
                        type="number"
                        placeholder="300"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Event Date */}
                    <div className="space-y-2">
                      <Label htmlFor="eventDate" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold" />
                        Event Date
                      </Label>
                      <Input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Package */}
                  <div className="space-y-2">
                    <Label htmlFor="package" className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gold" />
                      Preferred Package
                    </Label>
                    <Select
                      id="package"
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      placeholder="Select a package"
                      options={[
                        { value: "silver", label: "Silver Package" },
                        { value: "gold", label: "Gold Package" },
                        { value: "royal", label: "Royal Package" },
                      ]}
                      required
                    />
                  </div>

                  {/* Special Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="specialNotes" className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gold" />
                      Special Notes
                    </Label>
                    <Textarea
                      id="specialNotes"
                      name="specialNotes"
                      placeholder="Any special requirements, decoration preferences, dietary needs..."
                      value={formData.specialNotes}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="xl" className="w-full">
                    Submit Booking Request
                  </Button>

                  <p className="text-center text-xs text-gray-400">
                    Our team will contact you within 24 hours to confirm availability and
                    discuss details.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="text-center">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </motion.div>
            </div>
            <DialogTitle className="text-2xl font-serif">Request Sent Successfully!</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Your booking request has been sent successfully. Our team will review
              your request and contact you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-3">
            <Button asChild className="w-full">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setShowSuccess(false)}>
              Submit Another Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
