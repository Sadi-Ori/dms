"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { calculateZakatApi, fetchNisabRates } from "@/lib/api";
import { Coins, ShieldCheck, CheckCircle2, HelpCircle, ArrowRight, RotateCcw } from "lucide-react";

export const ZakatCalculator: React.FC = () => {
  const { addToCart, currencySymbol } = useCart();

  // Assets
  const [cash, setCash] = useState<string>("");
  const [bank, setBank] = useState<string>("");
  const [gold, setGold] = useState<string>("");
  const [silver, setSilver] = useState<string>("");
  const [stocks, setStocks] = useState<string>("");
  const [business, setBusiness] = useState<string>("");
  const [moneyOwed, setMoneyOwed] = useState<string>("");

  // Deductions
  const [debts, setDebts] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");

  // Nisab
  const [nisabStandard, setNisabStandard] = useState<"silver" | "gold">("silver");
  const [silverNisab, setSilverNisab] = useState<number>(563.37);
  const [goldNisab, setGoldNisab] = useState<number>(6867.18);

  useEffect(() => {
    fetchNisabRates().then((data) => {
      if (data) {
        setSilverNisab(data.silver_threshold || 563.37);
        setGoldNisab(data.gold_threshold || 6867.18);
      }
    });
  }, []);

  const num = (v: string) => parseFloat(v) || 0;

  const totalAssets =
    num(cash) +
    num(bank) +
    num(gold) +
    num(silver) +
    num(stocks) +
    num(business) +
    num(moneyOwed);

  const totalDeductions = num(debts) + num(expenses);
  const netZakatable = Math.max(0, totalAssets - totalDeductions);

  const activeNisabThreshold = nisabStandard === "silver" ? silverNisab : goldNisab;
  const isEligible = netZakatable >= activeNisabThreshold;
  const zakatPayable = isEligible ? Math.round(netZakatable * 0.025 * 100) / 100 : 0;

  const handleAddZakatToCart = () => {
    if (zakatPayable <= 0) return;
    addToCart({
      title: "100% Zakat Obligation Payment",
      amount: zakatPayable,
      frequency: "once",
      isZakatEligible: true,
    });
  };

  const handleReset = () => {
    setCash("");
    setBank("");
    setGold("");
    setSilver("");
    setStocks("");
    setBusiness("");
    setMoneyOwed("");
    setDebts("");
    setExpenses("");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#00a3da] tracking-widest mb-1">
            <Coins className="w-4 h-4 text-amber-500" />
            <span>Fulfill the 3rd Pillar of Islam</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#093484] tracking-tight">
            Accurate Zakat Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Calculate your exact 2.5% wealth obligation with zero admin deduction under our 100% Zakat Policy.
          </p>
        </div>

        {/* Nisab Selector */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setNisabStandard("silver")}
            className={`px-3 py-1.5 rounded-xl transition ${
              nisabStandard === "silver"
                ? "bg-white text-[#093484] shadow"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Silver Nisab ({currencySymbol}{silverNisab.toFixed(0)}) <span className="text-[10px] text-emerald-600 font-extrabold ml-1">★ Recommended</span>
          </button>
          <button
            type="button"
            onClick={() => setNisabStandard("gold")}
            className={`px-3 py-1.5 rounded-xl transition ${
              nisabStandard === "gold"
                ? "bg-white text-[#093484] shadow"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Gold Nisab ({currencySymbol}{goldNisab.toFixed(0)})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* LEFT COLUMN: INPUT FIELDS */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Assets */}
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 mb-3 flex items-center justify-between">
              <span>1. Your Zakatable Assets ({currencySymbol})</span>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 lowercase font-normal"
              >
                <RotateCcw className="w-3 h-3" /> reset fields
              </button>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">
                  Cash in Hand & at Home
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">
                  Bank Account Balances
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">
                  Gold Value (Jewelry/Bars)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={gold}
                  onChange={(e) => setGold(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">
                  Silver Value (Jewelry/Coins)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={silver}
                  onChange={(e) => setSilver(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">
                  Shares, Stocks, Cryptos
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={stocks}
                  onChange={(e) => setStocks(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">
                  Business Merchandise / Stock
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-600 mb-1">
                  Money Owed to You (Expected to be returned)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={moneyOwed}
                  onChange={(e) => setMoneyOwed(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Deductions */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 mb-3">
              2. Immediate Debts & Living Expenses ({currencySymbol})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">
                  Debts & Invoices Due Immediately
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={debts}
                  onChange={(e) => setDebts(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">
                  Current Month Living Expenses
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CALCULATION RESULTS CARD */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-[#093484] to-[#062258] text-white rounded-3xl p-6 sm:p-8 shadow-xl sticky top-28 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-sky-200">
                Calculation Summary
              </span>
              <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                100% Policy
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center text-slate-300">
                <span>Total Gross Assets:</span>
                <span className="font-bold text-white">
                  {currencySymbol}{totalAssets.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Total Deductions:</span>
                <span className="font-bold text-rose-300">
                  - {currencySymbol}{totalDeductions.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10 text-base">
                <span className="font-bold text-white">Net Zakatable Wealth:</span>
                <span className="font-black text-sky-300 text-lg">
                  {currencySymbol}{netZakatable.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Current Nisab ({nisabStandard}):</span>
                <span className="font-semibold text-slate-200">
                  {currencySymbol}{activeNisabThreshold.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Verdict Box */}
            <div
              className={`p-4 rounded-2xl border ${
                isEligible
                  ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-100"
                  : "bg-slate-800/60 border-slate-700 text-slate-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {isEligible ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-slate-400" />
                )}
                <span className="font-extrabold text-sm">
                  {isEligible ? "Zakat is Obligatory" : "Below Nisab Threshold"}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {isEligible
                  ? "Your net wealth has exceeded the Nisab threshold. You owe 2.5% of your net zakatable wealth."
                  : "Your net wealth is currently under the Nisab threshold. Zakat is not obligatory, but voluntary Sadaqah is deeply rewarded."}
              </p>
            </div>

            {/* Total Zakat Due Display */}
            <div className="text-center pt-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300">
                Your Zakat Obligation (2.5%)
              </span>
              <div className="text-4xl sm:text-5xl font-black text-amber-300 mt-1">
                {currencySymbol}{zakatPayable.toFixed(2)}
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              type="button"
              disabled={zakatPayable <= 0}
              onClick={handleAddZakatToCart}
              className={`w-full py-4 rounded-2xl font-extrabold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                zakatPayable > 0
                  ? "bg-[#f60362] hover:bg-[#d90255] text-white cursor-pointer active:scale-[0.99]"
                  : "bg-white/10 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>Pay Zakat ({currencySymbol}{zakatPayable.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-slate-400">
              100% Zakat Policy Guarantee: Distributed only to verified eligible recipients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
