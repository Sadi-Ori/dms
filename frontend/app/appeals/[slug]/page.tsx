import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchAppealBySlug, fetchAppeals } from "@/lib/api";
import { AppealDetailClient } from "./AppealDetailClient";
import { ShieldCheck, MapPin, Flame, CheckCircle, ArrowLeft } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const appeal = await fetchAppealBySlug(params.slug);
  if (!appeal) return { title: "Appeal Not Found" };
  return {
    title: `${appeal.title} | 100% Policy | Ihsan Global Relief`,
    description: appeal.short_description,
  };
}

export default async function SingleAppealPage({ params }: Props) {
  const appeal = await fetchAppealBySlug(params.slug);
  if (!appeal) notFound();

  return (
    <div className="bg-[#f4f6fa] min-h-screen font-sans pb-16">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500">
        <div className="container mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/appeals" className="hover:text-slate-900">Appeals</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate">{appeal.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLS: Image, Story, Impact Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80">
              <div className="relative h-72 sm:h-96 w-full">
                <Image
                  src={appeal.featured_image}
                  alt={appeal.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                <div className="absolute top-4 left-4 flex gap-2">
                  {appeal.is_urgent && (
                    <span className="bg-[#f60362] text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-white" /> Urgent Need
                    </span>
                  )}
                  {appeal.is_zakat_eligible && (
                    <span className="bg-emerald-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow">
                      Zakat Eligible
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-sky-200 font-bold uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{appeal.location}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black leading-tight drop-shadow">
                    {appeal.title}
                  </h1>
                </div>
              </div>

              {/* Story Narrative */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-black text-[#093484] uppercase tracking-wide mb-3">
                    About This Mission
                  </h2>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {appeal.full_story}
                  </p>
                </div>

                {/* 100% Policy Guarantee Callout */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-emerald-950">
                      100% Donation Policy Guarantee
                    </h3>
                    <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                      Every single dollar you donate is directly deployed to field relief for this appeal. Zero administrative or payment processing fees are deducted from your donation.
                    </p>
                  </div>
                </div>

                {/* Impact Metric Banner */}
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-center gap-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="text-xs text-sky-800 font-bold uppercase tracking-wider">
                      Tangible Aid Metric:
                    </p>
                    <p className="text-sm font-black text-sky-950">
                      {appeal.impact_metric}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: Interactive Donation Box Client Component */}
          <div className="lg:col-span-5">
            <AppealDetailClient appeal={appeal} />
          </div>
        </div>
      </div>
    </div>
  );
}
