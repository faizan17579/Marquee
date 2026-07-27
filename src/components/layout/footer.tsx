import Link from "next/link";
import { Crown, Phone, Mail, MapPin, Globe, Camera, Video } from "lucide-react";
import { businessSettings } from "@/data/mock-data";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-serif text-lg font-bold">Royal Palace</div>
                <div className="text-xs text-gold tracking-widest uppercase">Marquee</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Islamabad&apos;s premier marquee venue for weddings, walima, mehndi nights, and corporate events. Creating unforgettable moments since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gold mb-6 tracking-wide uppercase text-sm">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/gallery", label: "Gallery" },
                { href: "/packages", label: "Packages" },
                { href: "/availability", label: "Check Availability" },
                { href: "/cost-estimator", label: "Cost Estimator" },
                { href: "/booking", label: "Book Now" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gold mb-6 tracking-wide uppercase text-sm">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{businessSettings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>{businessSettings.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>{businessSettings.email}</span>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="font-semibold text-gold mb-6 tracking-wide uppercase text-sm">Hours</h3>
            <p className="text-gray-400 text-sm mb-6">{businessSettings.workingHours}</p>
            <h3 className="font-semibold text-gold mb-4 tracking-wide uppercase text-sm">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { icon: Globe, label: "Facebook" },
                { icon: Camera, label: "Instagram" },
                { icon: Video, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors cursor-pointer"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">&copy; 2026 Royal Palace Marquee. All rights reserved.</p>
          <Link
            href="/dashboard"
            className="text-gray-500 hover:text-gold text-xs transition-colors"
          >
            Owner Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
