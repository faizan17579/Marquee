"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Edit, Trash2, MoreHorizontal, Plus } from "lucide-react";
import { bookings } from "@/data/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import Link from "next/link";

const statusTabs = ["All", "Confirmed", "Pending", "Cancelled", "Completed"] as const;

type StatusFilter = (typeof statusTabs)[number];

function getStatusVariant(status: string): "success" | "warning" | "danger" | "default" {
  switch (status) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "danger";
    case "completed":
    default:
      return "default";
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<StatusFilter>("All");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      activeTab === "All" || booking.status === activeTab.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track all your event bookings
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Add Booking
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search bookings by name, email, or package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="default">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? "bg-gold text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
            {tab === "All" && (
              <span className="ml-1.5 text-xs opacity-75">({bookings.length})</span>
            )}
            {tab !== "All" && (
              <span className="ml-1.5 text-xs opacity-75">
                ({bookings.filter((b) => b.status === tab.toLowerCase()).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <Card className="border-0 shadow-sm hidden md:block">
        <CardContent className="p-0">
          <div className="rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-4">
                    Customer
                  </th>
                  <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-4">
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-4">
                    Package
                  </th>
                  <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-4">
                    Guests
                  </th>
                  <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-4">
                    Amount
                  </th>
                  <th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBookings.map((booking, i) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {getInitials(booking.customerName)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-charcoal">
                            {booking.customerName}
                          </div>
                          <div className="text-xs text-gray-400">{booking.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-charcoal">
                        {formatDate(booking.eventDate)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="gold">{booking.packageName}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-charcoal">{booking.guests}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-charcoal">
                        {formatCurrency(booking.totalAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/dashboard/bookings/${booking.id}`}>
                          <Button variant="ghost" size="icon" title="View">
                            <Eye className="w-4 h-4 text-gray-500" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="w-4 h-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">No bookings found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredBookings.map((booking, i) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {getInitials(booking.customerName)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-charcoal">
                        {booking.customerName}
                      </div>
                      <div className="text-xs text-gray-400">{booking.email}</div>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <span className="text-xs text-gray-400 block">Date</span>
                    <span className="text-charcoal">{formatDate(booking.eventDate)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Guests</span>
                    <span className="text-charcoal">{booking.guests}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Package</span>
                    <Badge variant="gold">{booking.packageName}</Badge>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Amount</span>
                    <span className="font-semibold text-charcoal">
                      {formatCurrency(booking.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1 border-t border-gray-100 pt-3">
                  <Link href={`/dashboard/bookings/${booking.id}`}>
                    <Button variant="ghost" size="icon" title="View">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" title="Edit">
                    <Edit className="w-4 h-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Delete">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">No bookings found.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
