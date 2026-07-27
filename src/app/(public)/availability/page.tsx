"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Users,
  Clock,
} from "lucide-react";
import { bookedDates } from "@/data/mock-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDateString(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isPastDate(year: number, month: number, day: number): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const check = new Date(year, month, day);
  return check < today;
}

export default function AvailabilityPage() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function goToPreviousMonth() {
    setCurrentMonth(new Date(year, month - 1, 1));
  }

  function goToNextMonth() {
    setCurrentMonth(new Date(year, month + 1, 1));
  }

  function handleDayClick(day: number) {
    const dateStr = formatDateString(year, month, day);
    if (isPastDate(year, month, day)) return;
    if (bookedDates.includes(dateStr)) return;
    setSelectedDate(dateStr);
  }

  // Build calendar grid cells
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Header */}
      <section className="pt-28 pb-16 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-charcoal/95" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Check Availability"
            subtitle="Select a date to see if Royal Palace Marquee is available for your special event"
            light
          />
        </div>
      </section>

      {/* Calendar + Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Calendar Panel */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 rounded-lg hover:bg-cream transition-colors text-charcoal"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gold" />
                    {monthLabel}
                  </h3>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 rounded-lg hover:bg-cream transition-colors text-charcoal"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Day-of-week headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-semibold text-charcoal/50 uppercase tracking-wider py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarCells.map((day, idx) => {
                    if (day === null) {
                      return <div key={`empty-${idx}`} className="aspect-square" />;
                    }

                    const dateStr = formatDateString(year, month, day);
                    const isBooked = bookedDates.includes(dateStr);
                    const isPast = isPastDate(year, month, day);
                    const isSelected = selectedDate === dateStr;

                    let cellClass =
                      "aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 relative";

                    if (isPast) {
                      cellClass += " text-gray-300 cursor-not-allowed bg-gray-50";
                    } else if (isBooked) {
                      cellClass +=
                        " bg-red-100 text-red-600 cursor-not-allowed";
                    } else if (isSelected) {
                      cellClass +=
                        " bg-gold text-white shadow-lg shadow-gold/25 cursor-pointer";
                    } else {
                      cellClass +=
                        " text-charcoal hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer";
                    }

                    return (
                      <button
                        key={dateStr}
                        onClick={() => handleDayClick(day)}
                        disabled={isPast || isBooked}
                        className={cellClass}
                        aria-label={`${day} ${monthLabel}${isBooked ? " - Booked" : isPast ? " - Past" : " - Available"}`}
                      >
                        <span>{day}</span>
                        {isBooked && !isPast && (
                          <span className="text-[9px] leading-none font-semibold mt-0.5">
                            Booked
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-emerald-50 border border-emerald-200" />
                    <span className="text-sm text-charcoal/70">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-100 border border-red-200" />
                    <span className="text-sm text-charcoal/70">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-50 border border-gray-200" />
                    <span className="text-sm text-charcoal/70">Past</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gold border border-gold" />
                    <span className="text-sm text-charcoal/70">Selected</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedDate ? (
                <motion.div
                  key={selectedDate}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Card className="border-emerald-200 bg-white">
                    <CardContent className="p-6 sm:p-8">
                      {/* Available badge */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Check className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-bold text-emerald-700">
                            Available!
                          </h3>
                          <p className="text-sm text-emerald-600/80">
                            This date is open for booking
                          </p>
                        </div>
                      </div>

                      {/* Selected date */}
                      <div className="bg-cream rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-gold" />
                          <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                            Selected Date
                          </span>
                        </div>
                        <p className="font-serif text-lg font-bold text-charcoal">
                          {formatDisplayDate(selectedDate)}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-gold" />
                          <div>
                            <p className="text-sm font-medium text-charcoal">
                              Estimated capacity available
                            </p>
                            <p className="text-sm text-charcoal/60">
                              1000 guests
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-gold" />
                          <div>
                            <p className="text-sm font-medium text-charcoal">
                              Full-day availability
                            </p>
                            <p className="text-sm text-charcoal/60">
                              Morning, afternoon, or evening slots
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button asChild size="lg" className="w-full">
                        <Link href="/booking">Book Now</Link>
                      </Button>

                      <p className="text-xs text-center text-charcoal/40 mt-4">
                        Dates are subject to confirmation. Advance booking recommended.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-dashed border-2 border-gray-200 bg-white/50">
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-cream mx-auto mb-4 flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-gold/40" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
                        Select a Date
                      </h3>
                      <p className="text-sm text-charcoal/50">
                        Click on an available date in the calendar to check
                        availability and proceed with booking.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-charcoal border-0">
            <CardContent className="p-8 sm:p-12">
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                Need Help Choosing a Date?
              </h3>
              <p className="text-gray-400 mb-6">
                Our event coordinators are here to help you find the perfect date
                for your celebration.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="outline" asChild className="border-gold text-gold hover:bg-gold hover:text-white">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild>
                  <Link href="/packages">View Packages</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
