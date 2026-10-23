import React from "react";
import Link from "next/link";
import { FileText, Download, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Annual Financial & Impact Reports | Ihsan Global Relief",
  description: "Download audited financial statements and annual impact reviews. Full transparency for our 100% donation policy.",
};

export default function ReportsPage() {
  const reports = [
    {
      year: 2025,
      title: "2025 Global Impact & Financial Transparency Audit",
      beneficiaries: "1,850,000+",
      aid: "$24,500,000",
      countries: 34,
      desc: "Full comprehensive audit of emergency Gaza food and medical convoys, 420 completed community water wells, and 12,000 sponsored orphans.",
    },
    {
      year: 2024,
      title: "2024 Annual Humanitarian Progress Report",
      beneficiaries: "1,420,000+",
      aid: "$19,200,000",
      countries: 31,
      desc: "Expansion of mobile pediatric nutrition clinics in Yemen, construction of 15 community centers and water filtration stations.",
    },
    {
      year: 2023,
      title: "2023 Financial Audit & Disaster Response Summary",
      beneficiaries: "1,150,000+",
      aid: "$15,800,000",
      countries: 28,
      desc: "Rapid deployment during Turkey/Syria earthquakes and Morocco relief operations with emergency warm shelter containers.",
    },
  ];

  return (
    <div className="bg-[#f4f6fa] min-h-screen font-sans pb-16">
      <div className="bg-gradient-to-r from-[#00a3da] to-[#093484] text-white py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-black uppercase px-3 py-1 rounded-full mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Audited Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Annual Reports & Financial Audits
          </h1>
          <p className="text-sky-100 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            We operate with complete open-book accountability. Download our official annual reports to see how 100% of your donations are deployed.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl space-y-6">
        {reports.map((r, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="bg-sky-100 text-[#093484] text-xs font-black px-2.5 py-0.5 rounded-full">
                  FY {r.year}
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Policy Certified
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {r.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {r.desc}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-700 pt-1">
                <span>Beneficiaries: <span className="text-[#00a3da]">{r.beneficiaries}</span></span>
                <span>•</span>
                <span>Total Aid Delivered: <span className="text-emerald-600">{r.aid}</span></span>
                <span>•</span>
                <span>Countries: <span className="text-[#093484]">{r.countries}</span></span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/our-promise"
                className="inline-flex items-center gap-2 bg-[#093484] hover:bg-[#062258] text-white text-xs font-extrabold uppercase tracking-wider px-5 py-3 rounded-xl shadow transition"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
