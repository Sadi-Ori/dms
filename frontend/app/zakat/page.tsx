import { ZakatCalculator } from "@/components/ZakatCalculator";
import { Coins, ShieldCheck, CheckCircle, BookOpen } from "lucide-react";

export const metadata = {
  title: "100% Zakat Policy | Calculate & Give Zakat | Ihsan Global Relief",
  description: "Fulfill your Zakat with 100% transparency. Supervised by verified Islamic scholars, zero administrative fees deducted.",
};

export default function ZakatPage() {
  const categories = [
    { title: "The Poor (Al-Fuqara)", desc: "Individuals living in extreme poverty without daily food." },
    { title: "The Destitute (Al-Masakin)", desc: "Those suffering acute displacement, loss of livelihood, and medical destitution." },
    { title: "The Debtors (Al-Gharimin)", desc: "People trapped in overwhelming emergency debts for food or shelter." },
    { title: "The Stranded Wayfarers (Ibn As-Sabil)", desc: "Refugees displaced by conflict far from home without resources." },
  ];

  return (
    <div className="bg-[#f4f6fa] min-h-screen font-sans pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#00a3da] to-[#093484] text-white py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-full mb-3 shadow">
            <Coins className="w-3.5 h-3.5" />
            <span>100% Zakat Policy Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Give Your Zakat With Complete Confidence
          </h1>
          <p className="text-sky-100 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Zakat is a sacred obligation. When you give your Zakat through our platform, 100% of your money goes straight to verified eligible recipients with zero administrative deductions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-5xl space-y-12">
        {/* Zakat Calculator */}
        <ZakatCalculator />

        {/* 8 Categories of Recipients */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex items-center gap-2 text-sky-600 font-extrabold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Quranic Foundation (Surah At-Tawbah 9:60)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#093484] tracking-tight">
            Who Receives Your Zakat?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Allah (SWT) specified eight categories entitled to Zakat. Our scholar board strictly verifies every recipient program:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {categories.map((c, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-extrabold text-slate-900 text-sm">{c.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
