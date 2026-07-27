"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
  Phone,
  Package,
} from "lucide-react";
import { calendarEvents } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { CalendarEvent } from "@/types";

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

function isToday(year: number, month: number, day: number): boolean {
  const now = new Date();
  return (
    now.getFullYear() === year &&
    now.getMonth() === month &&
    now.getDate() === day
  );
}

function getEventsForDate(dateStr: string): CalendarEvent[] {
  return calendarEvents.filter((event) => event.date === dateStr);
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

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
    const events = getEventsForDate(dateStr);
    if (events.length > 0) {
      setSelectedDate(dateStr);
      setSelectedEvents(events);
    }
  }

  function closeDrawer() {
    setSelectedDate(null);
    setSelectedEvents([]);
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
    <div className="space-y-6 relative">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Booking Calendar</h1>
        <p className="text-gray-500 text-sm mt-1">
          View and manage all upcoming events at a glance.
        </p>
      </div>

      <div className="relative">
        {/* Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPreviousMonth}
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gold" />
                  {monthLabel}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNextMonth}
                  aria-label="Next month"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
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
                    return (
                      <div
                        key={`empty-${idx}`}
                        className="min-h-[60px] md:min-h-[80px]"
                      />
                    );
                  }

                  const dateStr = formatDateString(year, month, day);
                  const dayEvents = getEventsForDate(dateStr);
                  const hasEvents = dayEvents.length > 0;
                  const isTodayDate = isToday(year, month, day);
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={dateStr}
                      onClick={() => handleDayClick(day)}
                      className={`
                        min-h-[60px] md:min-h-[80px] flex flex-col items-center justify-start pt-2 gap-1
                        rounded-xl text-sm font-medium transition-all duration-200
                        ${isTodayDate ? "ring-2 ring-gold" : ""}
                        ${isSelected ? "bg-gold/10" : "hover:bg-gray-50"}
                        ${hasEvents ? "cursor-pointer" : "cursor-default"}
                      `}
                      aria-label={`${day} ${monthLabel}${hasEvents ? ` - ${dayEvents.length} event(s)` : ""}`}
                    >
                      <span
                        className={`
                          w-7 h-7 flex items-center justify-center rounded-full text-sm
                          ${isTodayDate ? "bg-gold text-white font-bold" : "text-charcoal"}
                        `}
                      >
                        {day}
                      </span>
                      {hasEvents && (
                        <div className="flex items-center gap-1">
                          {dayEvents.map((event, i) => (
                            <span
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                event.status === "confirmed"
                                  ? "bg-gold"
                                  : "bg-amber-400"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gold" />
                  <span className="text-sm text-charcoal/70">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-sm text-charcoal/70">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full ring-2 ring-gold bg-white" />
                  <span className="text-sm text-charcoal/70">Today</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Event Details Drawer */}
        <AnimatePresence>
          {selectedDate && selectedEvents.length > 0 && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                onClick={closeDrawer}
              />

              {/* Drawer Panel */}
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                className="fixed right-0 top-0 h-full w-full max-w-md z-50 lg:absolute lg:top-0 lg:right-0 lg:h-auto lg:z-30"
              >
                <Card className="h-full lg:h-auto border-0 shadow-xl rounded-none lg:rounded-2xl overflow-auto">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Calendar className="w-5 h-5 text-gold" />
                        {formatDate(selectedDate)}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={closeDrawer}
                        aria-label="Close drawer"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedEvents.map((event, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3"
                        >
                          {/* Customer Name & Status */}
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-charcoal">
                              {event.customerName}
                            </h4>
                            <Badge
                              variant={
                                event.status === "confirmed"
                                  ? "success"
                                  : "warning"
                              }
                            >
                              {event.status}
                            </Badge>
                          </div>

                          {/* Event Type */}
                          <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-gold shrink-0" />
                            <span className="text-sm text-charcoal/70">
                              {event.eventType}
                            </span>
                          </div>

                          {/* Package */}
                          <div className="flex items-center gap-3">
                            <Package className="w-4 h-4 text-gold shrink-0" />
                            <span className="text-sm text-charcoal/70">
                              {event.packageName}
                            </span>
                          </div>

                          {/* Guests */}
                          <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-gold shrink-0" />
                            <span className="text-sm text-charcoal/70">
                              {event.guests} Guests
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
