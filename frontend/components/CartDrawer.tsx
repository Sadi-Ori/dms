"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag, ShieldCheck, Plus, ArrowRight, Heart } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateAmount,
    toggleFrequency,
    totalAmount,
    formatPrice,
    currency,
    currencySymbol,
    addToCart,
  } = useCart();

  if (!isOpen) return null;

  const quickAdds = [
    { title: "Hot Nutritious Meal in Gaza", amount: 15, isZakatEligible: true },
    { title: "Family Clean Drinking Water Pack", amount: 25, isZakatEligible: true },
    { title: "Orphan Emergency Food Box", amount: 50, isZakatEligible: true },
  ];

  return (
    <div
      className="fixed inset-0 z-[1040] bg-black/60 backdrop-blur-sm flex justify-end transition-opacity duration-300"
      onClick={closeCart}
    >
      <div
        className="w-full sm:max-w-[440px] bg-white h-full flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base uppercase tracking-wider text-[#093484]">
                Your Donation Basket
              </h2>
              <p className="text-xs text-slate-500">
                {items.length} {items.length === 1 ? "cause" : "causes"} selected
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close donation basket"
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 100% Policy Guarantee Banner */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center gap-2 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>100% Donation Policy: Zero administrative fees deducted.</span>
        </div>

        {/* BASKET ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Your basket is empty</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto mt-1">
                  Millions in crisis are waiting for basic survival aid. Choose a cause below to make an immediate impact.
                </p>
              </div>

              {/* Suggestions in empty basket */}
              <div className="pt-4 text-left space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Quick Impact Suggestions:
                </p>
                {quickAdds.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-slate-200 rounded-xl hover:border-sky-400 transition flex items-center justify-between bg-slate-50/50"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{q.title}</p>
                      <p className="text-xs text-emerald-600 font-bold">{formatPrice(q.amount)}</p>
                    </div>
                    <button
                      onClick={() =>
                        addToCart({
                          title: q.title,
                          amount: q.amount,
                          frequency: "once",
                          isZakatEligible: q.isZakatEligible,
                        })
                      }
                      className="text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm space-y-3 relative hover:border-slate-300 transition"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">
                        {item.title}
                      </h4>
                      {item.isZakatEligible && (
                        <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Zakat Eligible
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Frequency toggle & Amount */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    {/* Once vs Monthly pill */}
                    <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => item.frequency === "monthly" && toggleFrequency(item.id)}
                        className={`px-2.5 py-1 rounded-md transition ${
                          item.frequency === "once"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Once
                      </button>
                      <button
                        type="button"
                        onClick={() => item.frequency === "once" && toggleFrequency(item.id)}
                        className={`px-2.5 py-1 rounded-md transition ${
                          item.frequency === "monthly"
                            ? "bg-sky-600 text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Monthly
                      </button>
                    </div>

                    {/* Amount adjuster */}
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <span className="text-xs text-slate-500">{currencySymbol}</span>
                      <input
                        type="number"
                        min="1"
                        value={item.amount}
                        onChange={(e) => updateAmount(item.id, Number(e.target.value))}
                        className="w-20 px-2 py-1 text-right text-sm font-bold border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add more impact quick section */}
              <div className="pt-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Enhance Your Reward:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      addToCart({
                        title: "10 Hot Meals in Gaza",
                        amount: 30,
                        frequency: "once",
                        isZakatEligible: true,
                      })
                    }
                    className="p-2 border border-dashed border-sky-300 rounded-lg text-left bg-sky-50/50 hover:bg-sky-50 text-xs transition"
                  >
                    <p className="font-semibold text-slate-800">+10 Hot Meals</p>
                    <p className="text-sky-600 font-bold">{formatPrice(30)}</p>
                  </button>
                  <button
                    onClick={() =>
                      addToCart({
                        title: "Clean Water Well Share",
                        amount: 50,
                        frequency: "once",
                        isZakatEligible: true,
                      })
                    }
                    className="p-2 border border-dashed border-sky-300 rounded-lg text-left bg-sky-50/50 hover:bg-sky-50 text-xs transition"
                  >
                    <p className="font-semibold text-slate-800">+Water Well Share</p>
                    <p className="text-sky-600 font-bold">{formatPrice(50)}</p>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FOOTER CHECKOUT CALLOUT */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
              <span>Total Impact:</span>
              <span className="text-2xl font-black text-slate-900">
                {formatPrice(totalAmount)}
                <span className="text-xs font-normal text-slate-500 ml-1">
                  ({currency})
                </span>
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-2 bg-[#f60362] hover:bg-[#d90255] text-white font-extrabold uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-transform active:scale-[0.99] text-center"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[11px] text-center text-slate-500">
              🔒 256-bit SSL Encrypted • Official Tax-Deductible Receipt Issued
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
