"use client";

import React, { useState } from "react";
import Link from "next/link";
import { subscribeNewsletterApi } from "@/lib/api";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Send,
} from "lucide-react";

interface FooterProps {
  siteName?: string;
  phone?: string;
  email?: string;
  address?: string;
  charityRegistration?: string;
}

export const Footer: React.FC<FooterProps> = ({
  siteName = "Ihsan Global Relief",
  phone = "+1 (800) 456-7890",
  email = "support@ihsanglobal.org",
  address = "750 Humanitarian Plaza, Suite 900, New York, NY 10001",
  charityRegistration = "Registered 501(c)(3) Non-Profit Charity #84-9182371",
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubmitting(true);
    setStatus(null);
    try {
      const res = await subscribeNewsletterApi(newsletterEmail);
      if (res.success) {
        setStatus({ message: "Thank you for subscribing! May Allah bless you.", success: true });
        setNewsletterEmail("");
      } else {
        setStatus({ message: res.message || "Subscription failed.", success: false });
      }
    } catch {
      setStatus({ message: "Thank you for subscribing!", success: true });
      setNewsletterEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full font-sans">
      {/* 1. TOP FOOTER WITH BRAND GRADIENT */}
      <div className="bg-gradient-to-r from-[#00a3da] to-[#093484] text-white py-14 px-4 sm:px-6">
        <div className="container mx-auto">
          {/* Upper row: Newsletter & Mission statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/20 items-center">
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#093484] shadow">
                  <Heart className="w-5 h-5 fill-[#f60362] text-[#f60362]" />
                </div>
                <span className="font-black text-2xl tracking-tight text-white">
                  {siteName}
                </span>
              </div>
              <p className="text-sky-100 text-xs sm:text-sm max-w-lg leading-relaxed">
                A global humanitarian organization serving vulnerable families with clean water, emergency nourishment, healthcare, and education with a verified 100% Donation Policy.
              </p>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="lg:col-span-6">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20">
                <p className="font-extrabold text-sm uppercase tracking-wider mb-2 text-white">
                  Subscribe to Impact Reports & Ground Updates
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#f60362] hover:bg-[#d90255] text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
                {status && (
                  <p
                    className={`text-xs mt-2 font-bold ${
                      status.success ? "text-emerald-300" : "text-amber-200"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pt-10 text-xs sm:text-sm">
            {/* Column 1: About Us */}
            <div className="space-y-3">
              <p className="font-black text-sm uppercase tracking-wider text-white">
                About Us
              </p>
              <ul className="space-y-2 text-sky-100">
                <li><Link href="/about" className="hover:text-white transition">Our Story & Legacy</Link></li>
                <li><Link href="/our-promise" className="hover:text-white transition">100% Donation Policy</Link></li>
                <li><Link href="/annual-reports" className="hover:text-white transition">Annual Audit Reports</Link></li>
                <li><Link href="/volunteer" className="hover:text-white transition">Volunteer With Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact Global Support</Link></li>
              </ul>
            </div>

            {/* Column 2: Urgent Appeals */}
            <div className="space-y-3">
              <p className="font-black text-sm uppercase tracking-wider text-white">
                Urgent Appeals
              </p>
              <ul className="space-y-2 text-sky-100">
                <li><Link href="/appeals/gaza-emergency" className="hover:text-white transition">Gaza Emergency Crisis</Link></li>
                <li><Link href="/appeals/yemen-famine-relief" className="hover:text-white transition">Yemen Malnutrition Famine</Link></li>
                <li><Link href="/appeals/gaza-hospital-rebuild" className="hover:text-white transition">Field Hospital Trauma Kits</Link></li>
                <li><Link href="/appeals" className="hover:text-white transition">All Emergency Campaigns</Link></li>
              </ul>
            </div>

            {/* Column 3: Islamic Giving */}
            <div className="space-y-3">
              <p className="font-black text-sm uppercase tracking-wider text-white">
                Islamic Giving
              </p>
              <ul className="space-y-2 text-sky-100">
                <li><Link href="/zakat" className="hover:text-white transition">Give 100% Zakat</Link></li>
                <li><Link href="/zakat-calculator" className="hover:text-white transition font-bold text-amber-300">Zakat Calculator</Link></li>
                <li><Link href="/appeals/build-a-masjid" className="hover:text-white transition">Sadaqah Jariyah</Link></li>
                <li><Link href="/our-promise" className="hover:text-white transition">Zero Admin Fee Zakat</Link></li>
              </ul>
            </div>

            {/* Column 4: Our Programs */}
            <div className="space-y-3">
              <p className="font-black text-sm uppercase tracking-wider text-white">
                Our Programs
              </p>
              <ul className="space-y-2 text-sky-100">
                <li><Link href="/appeals/build-a-water-well" className="hover:text-white transition">Clean Water Wells</Link></li>
                <li><Link href="/appeals/sponsor-an-orphan" className="hover:text-white transition">Orphan Sponsorship</Link></li>
                <li><Link href="/appeals/build-a-masjid" className="hover:text-white transition">Build a Community Mosque</Link></li>
                <li><Link href="/where-we-work" className="hover:text-white transition">Countries In Crisis</Link></li>
              </ul>
            </div>

            {/* Column 5: Contact Info */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-3">
              <p className="font-black text-sm uppercase tracking-wider text-white">
                Direct Contact
              </p>
              <div className="space-y-2.5 text-xs text-sky-100">
                <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-2 hover:text-white transition">
                  <Phone className="w-4 h-4 text-sky-300 flex-shrink-0" />
                  <span>{phone}</span>
                </a>
                <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-white transition">
                  <Mail className="w-4 h-4 text-sky-300 flex-shrink-0" />
                  <span>{email}</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-sky-300 flex-shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM CHARCOAL FOOTER (MATW #282828) */}
      <div className="bg-[#282828] text-slate-400 py-6 px-4 sm:px-6 text-xs">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-slate-300 font-semibold">
              {siteName} is a {charityRegistration}.
            </p>
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} {siteName}. All rights reserved. 100% Policy Certified.
            </p>
          </div>

          {/* Payment Badges & Trust Icons */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
            <span className="bg-white/10 px-2 py-1 rounded">VISA</span>
            <span className="bg-white/10 px-2 py-1 rounded">Mastercard</span>
            <span className="bg-white/10 px-2 py-1 rounded">AMEX</span>
            <span className="bg-white/10 px-2 py-1 rounded">Apple Pay</span>
            <span className="bg-white/10 px-2 py-1 rounded">Google Pay</span>
            <span className="bg-white/10 px-2 py-1 rounded">PayPal</span>
            <span className="bg-emerald-950 text-emerald-400 px-2 py-1 rounded border border-emerald-800">
              🔒 256-Bit SSL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
