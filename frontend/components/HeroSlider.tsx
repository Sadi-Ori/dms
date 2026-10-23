"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Appeal } from "@/lib/api";
import { ShieldCheck, Flame, HeartHandshake, CheckCircle2, ChevronRight } from "lucide-react";

interface HeroSliderProps {
  appeals: Appeal[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ appeals }) => {
  const { addToCart, currencySymbol } = useCart();

  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selectedAmount, setSelectedAmount] = useState<number>(85);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedAppealId, setSelectedAppealId] = useState<string>(
    appeals.length > 0 ? String(appeals[0].id) : "general"
  );

  const presetAmounts = [50, 85, 200, 500, 700];

  const handleAmountClick = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const num = parseFloat(e.target.value);
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
    }
  };

  const handleQuickDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (!finalAmount || finalAmount <= 0) return;

    const matched = appeals.find((a) => String(a.id) === selectedAppealId);
    const title = matched ? matched.title : "Emergency Famine & Water Relief";

    addToCart({
      appeal_id: matched ? matched.id : undefined,
      title,
      amount: finalAmount,
      frequency,
      isZakatEligible: true,
    });
  };

  return (
    <section className="relative bg-slate-900 text-white min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden">
      {/* Background Image with Dark Vignette & Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform transition duration-1000 ease-out"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1920&q=85')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-transparent lg:to-slate-900/40"></div>
        <div className="absolute inset-0 bg-[#093484]/35 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Mission & Impact Headlines */}
          <div className="lg:col-span-7 space-y-6">
            {/* Urgent Badge */}
            <div className="inline-flex items-center gap-2 bg-[#f60362] text-white text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-full shadow-lg uppercase tracking-wider animate-pulse-subtle">
              <Flame className="w-4 h-4 fill-white" />
              <span>Urgent Crisis Alert: Gaza & Yemen Famine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Every Dollar Given.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-white">
                100% Delivered
              </span>{" "}
              to the Field.
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
              When disaster strikes, every second matters. With our audited <strong>100% Donation Policy</strong>, not a single penny of your donation is taken for administrative costs. Delivering hot meals, water desalination, and emergency surgery to those clinging to life.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Donation Policy</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Scholar Verified Zakat</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Tax Deductible 501(c)(3)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Quick Donation Widget (MATW-style) */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-black">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-lg text-[#093484] uppercase tracking-wide">
                    Quick Donate
                  </h3>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  100% Policy
                </span>
              </div>

              <form onSubmit={handleQuickDonate} className="mt-5 space-y-5">
                {/* Frequency Switcher: Single vs Monthly */}
                <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl text-sm font-bold">
                  <button
                    type="button"
                    onClick={() => setFrequency("once")}
                    className={`py-2 rounded-lg transition-all ${
                      frequency === "once"
                        ? "bg-white text-[#093484] shadow-md"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Give Once
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("monthly")}
                    className={`py-2 rounded-lg transition-all ${
                      frequency === "monthly"
                        ? "bg-[#093484] text-white shadow-md"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Give Monthly (Best)
                  </button>
                </div>

                {/* Preset Amount Grid */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Select Donation Amount ({currencySymbol}):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {presetAmounts.map((amt) => {
                      const isSelected = selectedAmount === amt && !customAmount;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleAmountClick(amt)}
                          className={`py-2.5 px-3 rounded-xl font-extrabold text-sm border-2 transition-all ${
                            isSelected
                              ? "border-[#00a3da] bg-sky-50 text-[#093484] shadow-sm"
                              : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                          }`}
                        >
                          {currencySymbol}
                          {amt}
                        </button>
                      );
                    })}

                    {/* Custom Amount Field */}
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        {currencySymbol}
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Other"
                        value={customAmount}
                        onChange={handleCustomChange}
                        className={`w-full py-2 pl-7 pr-2 text-sm font-bold rounded-xl border-2 focus:outline-none transition-all ${
                          customAmount
                            ? "border-[#00a3da] bg-sky-50 text-[#093484]"
                            : "border-slate-200 focus:border-sky-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Cause Selector Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Select Cause / Program:
                  </label>
                  <select
                    value={selectedAppealId}
                    onChange={(e) => setSelectedAppealId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="general">🌟 Most Needed Emergency Relief</option>
                    {appeals.map((appeal) => (
                      <option key={appeal.id} value={appeal.id}>
                        {appeal.title}
                      </option>
                    ))}
                    <option value="zakat">🕌 100% Zakat General Fund</option>
                  </select>
                </div>

                {/* Submit Donate CTA */}
                <button
                  type="submit"
                  className="w-full bg-[#f60362] hover:bg-[#d90255] text-white font-extrabold text-base uppercase tracking-wider py-4 rounded-xl shadow-xl transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <span>Donate {currencySymbol}{customAmount || selectedAmount} Now</span>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <p className="text-[11px] text-center text-slate-500 font-medium">
                  Instant Official Tax Receipt • Secure 256-Bit SSL Checkout
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
