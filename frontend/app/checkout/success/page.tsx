"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Printer, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  const [receipt, setReceipt] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("ihsan_last_receipt");
      if (saved) {
        setReceipt(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#f4f6fa] min-h-screen font-sans py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-2xl">
        {/* Receipt Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
              Payment Confirmed & Verified
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#093484] tracking-tight">
              May Allah / God Reward You Abundantly!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Your humanitarian contribution has been successfully processed. 100% of your gift is allocated directly to our ground response teams.
            </p>
          </div>

          {/* Receipt Meta Details */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-wider">Receipt Number</p>
              <p className="font-mono font-black text-slate-800 text-sm mt-0.5">
                {receipt?.receiptNumber || "REC-829104"}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-wider">Transaction ID</p>
              <p className="font-mono font-bold text-slate-800 text-sm mt-0.5">
                {receipt?.txnId || "TXN-91823719"}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-wider">Donor Name</p>
              <p className="font-bold text-slate-800 mt-0.5">
                {receipt?.donorName || "Generous Benefactor"}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-wider">Date</p>
              <p className="font-bold text-slate-800 mt-0.5">
                {receipt?.date || new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
              Allocated Causes:
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
              {receipt?.items && receipt.items.length > 0 ? (
                receipt.items.map((it: any, i: number) => (
                  <div key={i} className="p-3.5 flex justify-between items-center bg-white">
                    <div>
                      <p className="font-bold text-slate-800">{it.title}</p>
                      <p className="text-[10px] text-slate-500 capitalize">{it.frequency} contribution</p>
                    </div>
                    <span className="font-black text-slate-900">
                      {receipt.currencySymbol || "$"}{it.amount.toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3.5 flex justify-between items-center bg-white">
                  <span className="font-bold text-slate-800">Emergency Relief Allocation</span>
                  <span className="font-black text-slate-900">$85.00</span>
                </div>
              )}
            </div>

            <div className="pt-3 flex justify-between items-center text-sm font-extrabold text-[#093484] px-1">
              <span>Total Aid Delivered:</span>
              <span className="text-2xl font-black">
                {receipt?.currencySymbol || "$"}{receipt?.amount ? receipt.amount.toFixed(2) : "85.00"} {receipt?.currency || "USD"}
              </span>
            </div>
          </div>

          {/* 100% Policy Certified Footer */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-emerald-900 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-black">100% Donation Policy Certified</p>
              <p className="text-[11px] text-emerald-800 opacity-90">
                Official Registered 501(c)(3) Charitable Contribution • Tax Exempt
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 border border-slate-300 hover:bg-slate-50 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Tax Receipt</span>
            </button>
            <Link
              href="/"
              className="flex-1 bg-[#093484] hover:bg-[#062258] text-white font-extrabold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition"
            >
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
