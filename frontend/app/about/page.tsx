import Image from "next/image";
import Link from "next/link";
import { Heart, Globe2, ShieldCheck, Users, Award } from "lucide-react";

export const metadata = {
  title: "About Us & Our Vision | Ihsan Global Relief",
  description: "Learn about our mission, founding story, 100% donation policy, and humanitarian relief across 34 countries.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#f4f6fa] min-h-screen font-sans pb-16">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#00a3da] to-[#093484] text-white py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-black uppercase px-3 py-1 rounded-full mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#f60362] text-[#f60362]" />
            <span>Our Origin & Purpose</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            About Our Humanitarian Mission
          </h1>
          <p className="text-sky-100 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Driven by profound faith and radical transparency, we exist to deliver immediate relief and lasting self-reliance to vulnerable communities worldwide.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-5xl space-y-12">
        {/* Story Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-black text-[#00a3da] uppercase tracking-widest">
              The Founding Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#093484] tracking-tight">
              Transforming Compassion into Direct Field Action
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our organization was founded on a simple yet revolutionary principle: <strong>when someone donates to save lives, 100% of their money must reach the ground</strong>. We saw too many humanitarian organizations weighed down by excessive overhead, executive bonuses, and bureaucratic delays.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We established a model where independent benefactors, endowments, and business partners cover our operating overhead. This allows every donor—giving $5 or $50,000—to know that their entire gift feeds starving children in Gaza, drills solar water wells in Africa, or sponsors an orphan.
            </p>
          </div>

          <div className="md:col-span-6 relative h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
              alt="Aid distribution"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-[#00a3da]">34+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Countries Active</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-[#f60362]">18M+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hot Meals Served</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-[#093484]">650+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Water Wells Built</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-emerald-600">100%</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Donation Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
