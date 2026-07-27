"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search bookings..." className="pl-10 bg-gray-50 border-0" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center text-white text-sm font-bold">
            RP
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-charcoal">Admin</div>
            <div className="text-xs text-gray-400">Royal Palace</div>
          </div>
        </div>
      </div>
    </header>
  );
}
