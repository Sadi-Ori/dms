"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart, Currency } from "@/context/CartContext";
import {
  Phone,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Globe,
  Flame,
  Droplets,
  Coins,
  Users,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

interface NavbarProps {
  siteName?: string;
  phone?: string;
  announcementTicker?: string;
  announcementLink?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  siteName = "Ihsan Global Relief",
  phone = "+1 (800) 456-7890",
  announcementTicker = "🚨 EMERGENCY FAMINE RELIEF: Immediate warm meals, clean water, and medical aid needed in Gaza & Yemen. 100% reaches the ground.",
  announcementLink = "/appeals/gaza-emergency",
}) => {
  const { items, openCart, currency, setCurrency } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItemCount = items.length;

  return (
    <header className="w-full z-50 sticky top-0 font-sans shadow-md">
      {/* 1. TOP EMERGENCY ANNOUNCEMENT TICKER */}
      <div className="bg-gradient-to-r from-red-700 via-rose-600 to-red-700 text-white text-xs sm:text-sm py-2 px-3 sm:px-6 flex justify-between items-center transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-white text-red-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex items-center animate-pulse">
              Urgent Aid
            </span>
            <Link
              href={announcementLink}
              className="hover:underline font-medium truncate max-w-[280px] sm:max-w-xl md:max-w-3xl"
            >
              {announcementTicker}
            </Link>
          </div>
          <Link
            href={announcementLink}
            className="hidden sm:inline-flex items-center gap-1 font-bold text-xs bg-white/20 hover:bg-white text-white hover:text-red-700 px-3 py-1 rounded transition whitespace-nowrap ml-4"
          >
            <span>Give Now</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* 2. TOP UTILITY BAR (MATW-style desktop top bar) */}
      <div className="hidden lg:block bg-[#062258] text-white text-xs border-b border-white/10 py-1.5 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 text-slate-300">
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold text-white">{phone}</span>
            </a>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Donation Policy Certified</span>
            </div>
            <span className="text-white/20">|</span>
            <Link href="/about" className="hover:text-white transition">
              Our Vision & Legacy
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/zakat-calculator"
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold transition"
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Calculate Zakat</span>
            </Link>
            <span className="text-white/20">|</span>

            {/* Currency selector */}
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer text-xs"
              >
                <option value="USD" className="text-slate-900">USD ($)</option>
                <option value="GBP" className="text-slate-900">GBP (£)</option>
                <option value="EUR" className="text-slate-900">EUR (€)</option>
                <option value="CAD" className="text-slate-900">CAD ($)</option>
                <option value="AUD" className="text-slate-900">AUD ($)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN NAVBAR (MATW Gradient: Sky Blue to Navy) */}
      <nav
        className={`w-full bg-gradient-to-r from-[#00a3da] to-[#093484] text-white transition-all duration-300 ${
          isScrolled ? "py-2.5 shadow-lg" : "py-3.5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#093484] shadow-md group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-[#f60362] text-[#f60362]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight leading-none text-white drop-shadow-sm">
                {siteName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-sky-200">
                100% Policy Humanitarian Aid
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14px] font-semibold">
            {/* Urgent Appeals */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("appeals")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/10 transition">
                <Flame className="w-4 h-4 text-amber-300" />
                <span>Urgent Appeals</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
              {activeDropdown === "appeals" && (
                <div className="absolute top-full left-0 w-64 bg-white text-slate-800 rounded-xl shadow-2xl py-2 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/appeals/gaza-emergency"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-sky-50 text-slate-800 font-medium text-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Gaza Crisis Emergency
                  </Link>
                  <Link
                    href="/appeals/yemen-famine-relief"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-sky-50 text-slate-800 font-medium text-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Yemen Malnutrition Crisis
                  </Link>
                  <Link
                    href="/appeals/gaza-hospital-rebuild"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-sky-50 text-slate-800 font-medium text-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Field Hospital Medical Kits
                  </Link>
                  <div className="border-t my-1"></div>
                  <Link
                    href="/appeals"
                    className="block px-4 py-2 text-sky-600 hover:text-sky-700 font-bold text-xs uppercase tracking-wider"
                  >
                    View All Appeals &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Islamic Giving */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("zakat")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/10 transition">
                <Coins className="w-4 h-4 text-emerald-300" />
                <span>Islamic Giving</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
              {activeDropdown === "zakat" && (
                <div className="absolute top-full left-0 w-64 bg-white text-slate-800 rounded-xl shadow-2xl py-2 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/zakat"
                    className="block px-4 py-2.5 hover:bg-sky-50 font-medium text-sm"
                  >
                    Give 100% Zakat
                  </Link>
                  <Link
                    href="/zakat-calculator"
                    className="block px-4 py-2.5 hover:bg-sky-50 font-medium text-sm text-sky-600 font-bold"
                  >
                    🧮 Interactive Zakat Calculator
                  </Link>
                  <Link
                    href="/appeals/build-a-masjid"
                    className="block px-4 py-2.5 hover:bg-sky-50 font-medium text-sm"
                  >
                    Sadaqah Jariyah Projects
                  </Link>
                  <Link
                    href="/our-promise"
                    className="block px-4 py-2.5 hover:bg-sky-50 font-medium text-sm text-slate-600"
                  >
                    100% Zakat Guarantee
                  </Link>
                </div>
              )}
            </div>

            {/* Our Work */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("work")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/10 transition">
                <Droplets className="w-4 h-4 text-sky-200" />
                <span>Our Work</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
              {activeDropdown === "work" && (
                <div className="absolute top-full left-0 w-64 bg-white text-slate-800 rounded-xl shadow-2xl py-2 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/appeals/build-a-water-well"
                    className="block px-4 py-2.5 hover:bg-sky-50 font-medium text-sm"
                  >
                    Clean Water Wells & Solar Pumps
                  </Link>
                  <Link
                    href="/appeals/sponsor-an-orphan"
                    className="block px-4 py-2.5 hover:bg-sky-50 font-medium text-sm"
                  >
                    Orphan Holistic Sponsorship
                  </Link>
                  <Link
                    href="/where-we-work"
                    className="block px-4 py-2.5 hover:bg-sky-50 font-medium text-sm text-slate-600"
                  >
                    Where We Work (30+ Countries)
                  </Link>
                </div>
              )}
            </div>

            {/* About & Promise */}
            <Link
              href="/our-promise"
              className="px-3 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-1 text-sky-100"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>100% Policy</span>
            </Link>

            <Link
              href="/about"
              className="px-3 py-2 rounded-lg hover:bg-white/10 transition"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="px-3 py-2 rounded-lg hover:bg-white/10 transition"
            >
              Contact
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Basket Button (Slideout trigger) */}
            <button
              onClick={openCart}
              aria-label="Open donation basket"
              className="relative flex items-center gap-2 bg-white/15 hover:bg-white/25 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full transition cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="hidden sm:inline font-bold text-xs uppercase tracking-wide">
                Basket
              </span>
              {totalItemCount > 0 && (
                <span className="bg-[#f60362] text-white text-xs font-black rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center animate-bounce">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Primary High-Contrast Donate Button */}
            <Link
              href="/appeals"
              className="bg-[#f60362] hover:bg-[#d90255] text-white font-extrabold uppercase tracking-wider text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              Donate Now
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#062258] border-t border-white/10 px-4 py-6 space-y-4 text-white">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-400">Currency</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-white/10 text-white rounded px-2 py-1 text-xs"
              >
                <option value="USD" className="text-slate-900">USD ($)</option>
                <option value="GBP" className="text-slate-900">GBP (£)</option>
                <option value="EUR" className="text-slate-900">EUR (€)</option>
                <option value="CAD" className="text-slate-900">CAD ($)</option>
                <option value="AUD" className="text-slate-900">AUD ($)</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <Link
                href="/appeals"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 font-bold text-base hover:text-sky-300"
              >
                <Flame className="w-5 h-5 text-amber-300" />
                Urgent Appeals
              </Link>
              <Link
                href="/zakat"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 font-bold text-base hover:text-sky-300"
              >
                <Coins className="w-5 h-5 text-emerald-300" />
                Give Zakat
              </Link>
              <Link
                href="/zakat-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 font-bold text-base text-sky-300"
              >
                🧮 Zakat Calculator
              </Link>
              <Link
                href="/appeals/build-a-water-well"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 font-bold text-base hover:text-sky-300"
              >
                <Droplets className="w-5 h-5 text-sky-400" />
                Clean Water Wells
              </Link>
              <Link
                href="/appeals/sponsor-an-orphan"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 font-bold text-base hover:text-sky-300"
              >
                <Users className="w-5 h-5 text-purple-300" />
                Sponsor an Orphan
              </Link>
              <Link
                href="/our-promise"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 font-bold text-base hover:text-sky-300"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                100% Donation Policy
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 font-medium text-base hover:text-sky-300"
              >
                About Us & Vision
              </Link>
              <Link
                href="/where-we-work"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 font-medium text-base hover:text-sky-300"
              >
                Where We Work
              </Link>
              <Link
                href="/volunteer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 font-medium text-base hover:text-sky-300"
              >
                Volunteer With Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 font-medium text-base hover:text-sky-300"
              >
                Contact Support
              </Link>
            </div>

            <div className="pt-2">
              <Link
                href="/appeals"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center bg-[#f60362] py-3 rounded-xl font-bold uppercase tracking-wider text-sm shadow-lg"
              >
                Make a Donation Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
