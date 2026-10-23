import Link from "next/link";
import { ShieldCheck, Award, Eye, CheckCircle2, HeartHandshake, HelpCircle } from "lucide-react";

export const metadata = {
  title: "100% Donation Policy | Our Sacred Promise | Ihsan Global Relief",
  description: "Learn how our 100% Donation Policy works. 100% of your donation delivers aid on the ground with zero administrative deductions.",
};

export default function PromisePage() {
  const steps = [
    {
      num: "01",
      title: "You Donate",
      desc: "Whether you give $10 for clean drinking water or $1,000 for a deep village solar well, 100% of your designated contribution goes to that humanitarian project.",
    },
    {
      num: "02",
      title: "Zero Admin Deductions",
      desc: "No overhead, no staff salaries, and no marketing costs are subtracted from your donation.",
    },
    {
      num: "03",
      title: "Separate Operating Endowment",
      desc: "Our operational expenses are funded completely separately through dedicated corporate partners, institutional patrons, and separate gift aid.",
    },
    {
      num: "04",
      title: "Direct Field Delivery",
      desc: "Our own ground logistical teams purchase food, drill wells, and deliver emergency medical trauma boxes directly to the families in crisis.",
    },
  ];

  return (
    <div className="bg-[#f4f6fa] min-h-screen font-sans pb-16">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#00a3da] to-[#093484] text-white py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-emerald-400 text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-full mb-3 shadow">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audited & Certified</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Our 100% Donation Policy
          </h1>
          <p className="text-sky-100 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Your charity is a sacred trust (Amanah). We guarantee that every single dollar you donate reaches the people in need.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-5xl space-y-12">
        {/* How It Works Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
          <h2 className="text-2xl sm:text-3xl font-black text-[#093484] tracking-tight uppercase text-center mb-8">
            How The 100% Policy Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-3xl font-black text-[#00a3da]">{s.num}</span>
                <h3 className="font-extrabold text-base text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why 100% Matters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Total Transparency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We publish independent audited annual accounts showing the exact dollar flow from donor checkout to field implementation.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">100% Zakat Fulfilled</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zakat funds are ring-fenced and overseen by scholarly councils to ensure compliance with strict Islamic jurisprudence.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Maximum Human Impact</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              By removing administrative friction, more meals are delivered, more water pumps are installed, and more lives are saved.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-[#00a3da] to-[#093484] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black uppercase">
            Give with complete peace of heart today
          </h2>
          <p className="text-sky-100 text-sm max-w-xl mx-auto">
            Choose an emergency appeal or calculate your Zakat with 100% confidence.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/appeals"
              className="bg-[#f60362] hover:bg-[#d90255] text-white font-extrabold uppercase text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition"
            >
              Browse Active Appeals
            </Link>
            <Link
              href="/zakat-calculator"
              className="bg-white text-[#093484] hover:bg-sky-50 font-extrabold uppercase text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition"
            >
              Calculate Zakat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
