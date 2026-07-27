export interface Package {
  id: string;
  name: string;
  tier: "silver" | "gold" | "royal";
  capacity: string;
  price: number;
  priceLabel: string;
  menu: string[];
  decoration: string;
  photography: string;
  parking: string;
  features: string[];
  popular?: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  guests: number;
  packageId: string;
  packageName: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  advancePaid: number;
  totalAmount: number;
  remainingBalance: number;
  specialNotes: string;
  createdAt: string;
  menu: string[];
  decoration: string;
  paymentHistory: PaymentRecord[];
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  method: string;
  note: string;
}

export interface BookingRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  guests: number;
  requestedDate: string;
  packagePreference: string;
  specialNotes: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "weddings" | "walima" | "mehndi" | "corporate";
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export interface DashboardStats {
  todayEvents: number;
  upcomingEvents: number;
  pendingRequests: number;
  monthlyRevenue: number;
  totalBookings: number;
  conversionRate: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

export interface BusinessSettings {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  workingHours: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface CalendarEvent {
  date: string;
  customerName: string;
  eventType: string;
  packageName: string;
  guests: number;
  status: "confirmed" | "pending";
}

export interface CostEstimate {
  hallCharges: number;
  food: number;
  decoration: number;
  photography: number;
  liveBBQ: number;
  extraServices: number;
  subtotal: number;
  tax: number;
  grandTotal: number;
}
