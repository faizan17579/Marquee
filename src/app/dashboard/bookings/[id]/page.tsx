"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Users,
  Package,
  FileText,
  CreditCard,
  CheckCircle2,
  Clock,
  Printer,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bookings } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function BookingDetailsPage() {
  const booking = bookings[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/dashboard/bookings">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-charcoal">
              Booking {booking.id}
            </h1>
            <p className="text-sm text-gray-500">
              Created on {formatDate(booking.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant={
              booking.status === "confirmed"
                ? "success"
                : booking.status === "pending"
                ? "warning"
                : "default"
            }
          >
            {booking.status}
          </Badge>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4" />
            Print Invoice
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5 text-gold" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center text-white font-bold text-lg">
                      {booking.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal">
                        {booking.customerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.eventType}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-gold" />
                      <span className="text-gray-600">{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-gold" />
                      <span className="text-gray-600">{booking.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-gold" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: Calendar,
                      label: "Event Date",
                      value: formatDate(booking.eventDate),
                    },
                    {
                      icon: Users,
                      label: "Guests",
                      value: `${booking.guests} people`,
                    },
                    {
                      icon: Package,
                      label: "Package",
                      value: booking.packageName,
                    },
                    {
                      icon: Clock,
                      label: "Event Type",
                      value: booking.eventType,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="text-center p-4 rounded-xl bg-gray-50">
                        <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
                        <div className="text-xs text-gray-400 mb-1">
                          {item.label}
                        </div>
                        <div className="font-semibold text-charcoal text-sm">
                          {item.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="w-5 h-5 text-gold" />
                  Menu & Decoration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-charcoal mb-3">Menu Items</h4>
                    <ul className="space-y-2">
                      {booking.menu.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle2 className="w-4 h-4 text-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal mb-3">
                      Decoration Theme
                    </h4>
                    <p className="text-sm text-gray-600 bg-gold/5 p-4 rounded-xl border border-gold/10">
                      {booking.decoration}
                    </p>
                    {booking.specialNotes && (
                      <div className="mt-4">
                        <h4 className="font-medium text-charcoal mb-3">
                          Special Notes
                        </h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                          {booking.specialNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar - Payment */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="h-2 gradient-gold" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="w-5 h-5 text-gold" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="font-semibold text-charcoal">
                    {formatCurrency(booking.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Advance Paid</span>
                  <span className="font-semibold text-emerald-600">
                    {formatCurrency(booking.advancePaid)}
                  </span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between">
                  <span className="font-medium text-charcoal">
                    Remaining Balance
                  </span>
                  <span className="font-bold text-lg text-gold">
                    {formatCurrency(booking.remainingBalance)}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Payment Progress</span>
                    <span>
                      {Math.round(
                        (booking.advancePaid / booking.totalAmount) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-gold rounded-full transition-all"
                      style={{
                        width: `${(booking.advancePaid / booking.totalAmount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-gold" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {booking.paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                    >
                      <div>
                        <div className="text-sm font-medium text-charcoal">
                          {formatCurrency(payment.amount)}
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatDate(payment.date)} · {payment.method}
                        </div>
                      </div>
                      <Badge variant="success">Paid</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 space-y-2">
              <Button className="w-full" size="sm">
                Record Payment
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                Edit Booking
              </Button>
              <Button variant="destructive" className="w-full" size="sm">
                Cancel Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
