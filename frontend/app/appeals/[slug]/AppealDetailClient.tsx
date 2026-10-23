"use client";

import React, { useState } from "react";
import { Appeal } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { ShieldCheck, ArrowRight, HeartHandshake, CheckCircle2 } from "lucide-react";

interface Props {
  appeal: Appeal;
}

export const AppealDetailClient: React.FC<Props> = ({ appeal }) => {
  const { addToCart, formatPrice, currencySymbol } = useCart();

  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selectedAmount, setSelectedAmount] = useState<number>(
    appeal.preset_amounts?.[1] || appeal.preset_amounts?.[0] || 85
  );
  const [customAmount, setCustomAmount] = useState<string>("");

  const presetAmounts = appeal.preset_amounts || [50, 85, 200, 500];

  const handlePresetClick = (amt: number) => {
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

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (!finalAmount || finalAmount <= 0) return;

    addToCart({
      appeal_id: appeal.id,
      title: appeal.title,
      amount: finalAmount,
      frequency,
      image: appeal.featured_image,
      isZakatEligible: appeal.is_zakat_eligible,
    });
  };

  const percentage =
    appeal.percentage_raised ||
    Math.min(
      100,
      Math.round(
        (Number(appeal.raised_amount) / Number(appeal.target_amount)) * 100
      )
    );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 sticky top-28 space-y-6">
      {/* Progress Section */}
      <div className="space-y-2 pb-5 border-b border-slate-100">
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-2xl font-black text-[#093484]">
              {formatPrice(Number(appeal.raised_amount))}
            </span>
            <span className="text-xs text-slate-500 ml-1.5 font-medium">
              raised of {formatPrice(Number(appeal.target_amount))}
            </span>
          </div>
          <span className="text-xs font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
            {percentage}% Funded
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#00a3da] to-[#093484] h-full rounded-full transition-all duration-700"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleDonate} className="space-y-5">
        {/* Frequency Tab Switcher */}
        <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl text-xs font-extrabold">
          <button
            type="button"
            onClick={() => setFrequency("once")}
            className={`py-2 rounded-lg transition-all ${
              frequency === "once"
                ? "bg-white text-[#093484] shadow-sm"
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
                ? "bg-[#093484] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Give Monthly
          </button>
        </div>

        {/* Preset Amounts */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Select Amount ({currencySymbol}):
          </label>
          <div className="grid grid-cols-3 gap-2">
            {presetAmounts.map((amt) => {
              const isSelected = selectedAmount === amt && !customAmount;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePresetClick(amt)}
                  className={`py-2.5 px-3 rounded-xl font-extrabold text-sm border-2 transition ${
                    isSelected
                      ? "border-[#00a3da] bg-sky-50 text-[#093484]"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {currencySymbol}
                  {amt}
                </button>
              );
            })}

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
                className={`w-full py-2 pl-7 pr-2 text-sm font-bold rounded-xl border-2 focus:outline-none transition ${
                  customAmount
                    ? "border-[#00a3da] bg-sky-50 text-[#093484]"
                    : "border-slate-200"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full bg-[#f60362] hover:bg-[#d90255] text-white font-black text-sm uppercase tracking-wider py-4 rounded-xl shadow-xl transition active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <span>
            Donate {currencySymbol}{customAmount || selectedAmount} Now
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="space-y-1.5 pt-2 text-[11px] text-slate-500">
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Policy Certified: No admin cut</span>
          </p>
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
            <span>Instant Official Tax-Deductible Receipt</span>
          </p>
        </div>
      </form>
    </div>
  );
};
