"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Appeal } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { Flame, ArrowRight, ShieldCheck, Heart } from "lucide-react";

interface UrgentAppealsProps {
  appeals: Appeal[];
}

export const UrgentAppeals: React.FC<UrgentAppealsProps> = ({ appeals }) => {
  const { addToCart, formatPrice, currencySymbol } = useCart();
  const [selectedAmounts, setSelectedAmounts] = useState<Record<number, number>>({});

  const handleSelectAmount = (appealId: number, amount: number) => {
    setSelectedAmounts((prev) => ({ ...prev, [appealId]: amount }));
  };

  const handleDonateNow = (appeal: Appeal) => {
    const amt = selectedAmounts[appeal.id] || (appeal.preset_amounts?.[0] || 50);
    addToCart({
      appeal_id: appeal.id,
      title: appeal.title,
      amount: amt,
      frequency: "once",
      image: appeal.featured_image,
      isZakatEligible: appeal.is_zakat_eligible,
    });
  };

  return (
    <section className="py-16 bg-[#f4f6fa] font-sans">
      <div className="container mx-auto px-4 sm:px-6">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#f60362] mb-2">
              <Flame className="w-4 h-4 fill-[#f60362]" />
              <span>Immediate Humanitarian Need</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#093484] tracking-tight">
              Urgent Appeals
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mt-2 font-normal">
              Food, clean water, and emergency medical kits are urgently needed on the frontline. Every dollar goes directly to the field with our 100% Policy.
            </p>
          </div>

          <Link
            href="/appeals"
            className="inline-flex items-center gap-1.5 font-bold text-sm text-[#00a3da] hover:text-[#093484] transition"
          >
            <span>View All Active Appeals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* APPEALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appeals.map((appeal) => {
            const currentAmount =
              selectedAmounts[appeal.id] || (appeal.preset_amounts?.[0] || 50);

            const percentage =
              appeal.percentage_raised ||
              Math.min(
                100,
                Math.round(
                  (Number(appeal.raised_amount) / Number(appeal.target_amount)) * 100
                )
              );

            return (
              <div
                key={appeal.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={appeal.featured_image}
                    alt={appeal.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {appeal.is_urgent && (
                      <span className="bg-[#f60362] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-white" /> Urgent
                      </span>
                    )}
                    {appeal.is_zakat_eligible && (
                      <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                        Zakat Eligible
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">
                      {appeal.location}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <Link
                      href={`/appeals/${appeal.slug}`}
                      className="font-extrabold text-lg text-slate-900 group-hover:text-[#00a3da] transition line-clamp-2"
                    >
                      {appeal.title}
                    </Link>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-2">
                      {appeal.short_description}
                    </p>
                  </div>

                  {/* Raised vs Target Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-[#093484]">
                        {formatPrice(Number(appeal.raised_amount))} raised
                      </span>
                      <span className="text-slate-400">
                        Goal: {formatPrice(Number(appeal.target_amount))}
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#00a3da] to-[#093484] h-full rounded-full transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>{percentage}% funded</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> 100% Policy
                      </span>
                    </div>
                  </div>

                  {/* Preset Amount Pills */}
                  <div className="pt-2">
                    <div className="grid grid-cols-4 gap-1.5">
                      {(appeal.preset_amounts || [50, 85, 200, 500]).slice(0, 4).map((amt) => {
                        const isSelected = currentAmount === amt;
                        return (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => handleSelectAmount(appeal.id, amt)}
                            className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                              isSelected
                                ? "bg-[#093484] border-[#093484] text-white"
                                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            {currencySymbol}
                            {amt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleDonateNow(appeal)}
                      className="flex-1 bg-[#f60362] hover:bg-[#d90255] text-white font-extrabold uppercase text-xs py-3 rounded-xl shadow-md transition-all active:scale-[0.99] text-center"
                    >
                      Donate {currencySymbol}{currentAmount}
                    </button>
                    <Link
                      href={`/appeals/${appeal.slug}`}
                      className="px-3 py-3 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-600 hover:text-slate-900 transition flex items-center justify-center text-xs font-bold"
                      title="View details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
