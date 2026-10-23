"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, Eye, Award, CheckCircle } from "lucide-react";

export const PromiseSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "100% Aid Delivery",
      description: "Every dollar given to a charitable cause is deployed directly to life-saving operations on the ground.",
    },
    {
      icon: Eye,
      title: "Total Transparency",
      description: "Annual reports, public audits, GPS coordinates, and completion reports for every well and masjid built.",
    },
    {
      icon: Award,
      title: "Scholar Supervised Zakat",
      description: "Our Zakat funds are strictly overseen by qualified Islamic scholars to ensure 100% Shariah compliance.",
    },
    {
      icon: HeartHandshake,
      title: "Direct Ground Operations",
      description: "Our own local logistics and volunteer teams manage distributions directly without unnecessary middlemen.",
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-200/70 font-sans">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Integrity & Accountability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#093484] tracking-tight uppercase">
            Our Promise To You: 100% Donation Policy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            We believe your generosity is a sacred trust (Amanah). Operational and administrative costs are funded separately through institutional endowments and dedicated business sponsors—guaranteeing 100% of your gift reaches the needy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-400 hover:bg-sky-50/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-[#00a3da] group-hover:bg-[#00a3da] group-hover:text-white shadow-sm flex items-center justify-center transition-colors mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/our-promise"
            className="inline-flex items-center gap-2 bg-[#093484] hover:bg-[#062258] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md transition"
          >
            <span>Learn How Our 100% Policy Works</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
