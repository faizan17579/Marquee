"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Phone,
  Mail,
  Calendar,
  Users,
  Package,
  Check,
  X,
  PhoneCall,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bookingRequests } from "@/data/mock-data";
import { formatDate } from "@/lib/utils";
import type { BookingRequest } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function RequestsPage() {
  const [requests, setRequests] = useState<BookingRequest[]>(bookingRequests);
  const [actionModal, setActionModal] = useState<{
    type: "approve" | "reject";
    request: BookingRequest;
  } | null>(null);

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action as BookingRequest["status"] } : r))
    );
    setActionModal(null);
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const processedRequests = requests.filter((r) => r.status !== "pending");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Booking Requests</h1>
          <p className="text-gray-500 text-sm mt-1">
            {pendingRequests.length} pending requests to review
          </p>
        </div>
        <Badge variant="warning" className="text-sm px-4 py-2">
          {pendingRequests.length} Pending
        </Badge>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-charcoal flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-gold" />
            Pending Requests
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <AnimatePresence>
              {pendingRequests.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-0 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                    <div className="h-1 gradient-gold" />
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center text-white font-bold">
                            {req.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="font-semibold text-charcoal">
                              {req.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {req.id} · {formatDate(req.createdAt)}
                            </div>
                          </div>
                        </div>
                        <Badge variant="warning">Pending</Badge>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gold" />
                          {req.phone}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gold" />
                          {req.email}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-gold" />
                          {formatDate(req.requestedDate)} · {req.eventType}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Users className="w-4 h-4 text-gold" />
                          {req.guests} guests
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Package className="w-4 h-4 text-gold" />
                          {req.packagePreference}
                        </div>
                        {req.specialNotes && (
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <FileText className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                            {req.specialNotes}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() =>
                            setActionModal({ type: "approve", request: req })
                          }
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                          onClick={() =>
                            setActionModal({ type: "reject", request: req })
                          }
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </Button>
                        <Button size="sm" variant="outline">
                          <PhoneCall className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Processed Requests */}
      {processedRequests.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-400 text-sm">
            Processed Requests
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {processedRequests.map((req) => (
              <Card key={req.id} className="border-0 shadow-sm opacity-60">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                    {req.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-charcoal">
                      {req.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {req.eventType} · {formatDate(req.requestedDate)}
                    </div>
                  </div>
                  <Badge
                    variant={
                      req.status === "approved" ? "success" : "danger"
                    }
                  >
                    {req.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {pendingRequests.length === 0 && processedRequests.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-16 text-center">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-charcoal mb-2">
              No Booking Requests
            </h3>
            <p className="text-gray-400 text-sm">
              New booking requests will appear here when customers submit them.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Modal */}
      <Dialog
        open={!!actionModal}
        onOpenChange={() => setActionModal(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionModal?.type === "approve"
                ? "Approve Request"
                : "Reject Request"}
            </DialogTitle>
            <DialogDescription>
              {actionModal?.type === "approve"
                ? `Are you sure you want to approve the booking request from ${actionModal?.request.name}?`
                : `Are you sure you want to reject the booking request from ${actionModal?.request.name}?`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button
              className="flex-1"
              variant={
                actionModal?.type === "approve" ? "default" : "destructive"
              }
              onClick={() =>
                actionModal &&
                handleAction(
                  actionModal.request.id,
                  actionModal.type === "approve" ? "approved" : "rejected"
                )
              }
            >
              {actionModal?.type === "approve" ? "Approve" : "Reject"}
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => setActionModal(null)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
