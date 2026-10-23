import Link from "next/link";
import { Globe2, MapPin, ArrowRight, ShieldCheck, Flame } from "lucide-react";

export const metadata = {
  title: "Where We Work | Countries in Crisis | Ihsan Global Relief",
  description: "Explore our active humanitarian missions across Palestine, Yemen, Syria, Lebanon, Sudan, Bangladesh, and West Africa.",
};

export default function WhereWeWorkPage() {
  const regions = [
    {
      country: "Palestine (Gaza & West Bank)",
      crisis: "Catastrophic famine, displacement, and medical system destruction.",
      operations: "Hot community kitchens, water desalination tankers, trauma surgery kits, and shelter tents.",
      tag: "Active Emergency",
      urgent: true,
      link: "/appeals/gaza-emergency",
    },
    {
      country: "Yemen (Hodeidah & Sana'a)",
      crisis: "Acute malnutrition affecting millions of children and lactating mothers.",
      operations: "Therapeutic Plumpy'Nut distribution, pediatric nutrition clinics, and emergency water trucking.",
      tag: "Famine Relief",
      urgent: true,
      link: "/appeals/yemen-famine-relief",
    },
    {
      country: "Lebanon (Beirut & Bekaa Valley)",
      crisis: "Overwhelming refugee influx and economic collapse leaving families destitute.",
      operations: "Orphan education sponsorships, winter thermal blankets, and food security packages.",
      tag: "Refugee Support",
      urgent: false,
      link: "/appeals/sponsor-an-orphan",
    },
    {
      country: "Togo & West Africa",
      crisis: "Chronic groundwater scarcity, lack of electricity, and remote village isolation.",
      operations: "Deep solar-powered community water wells, brick Masjids, and vocational apprentice schools.",
      tag: "Sadaqah Jariyah",
      urgent: false,
      link: "/appeals/build-a-water-well",
    },
    {
      country: "Sudan & East Africa",
      crisis: "Internal conflict displacing hundreds of thousands across desert border crossings.",
      operations: "Emergency refugee food ration bags, potable water bladders, and mobile emergency medicine.",
      tag: "Crisis Response",
      urgent: true,
      link: "/appeals/gaza-emergency",
    },
    {
      country: "Bangladesh (Cox's Bazar & Sylhet)",
      crisis: "Flood vulnerability and the world's densest refugee camp settlements.",
      operations: "Deep tube wells, monsoon-resistant bamboo shelters, and orphan education complexes.",
      tag: "Water & Orphan Care",
      urgent: false,
      link: "/appeals/build-a-water-well",
    },
  ];

  return (
    <div className="bg-[#f4f6fa] min-h-screen font-sans pb-16">
      <div className="bg-gradient-to-r from-[#00a3da] to-[#093484] text-white py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-black uppercase px-3 py-1 rounded-full mb-3">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Field Footprint</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Where We Work: 34+ Countries
          </h1>
          <p className="text-sky-100 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Our logistical networks and volunteer corps operate on the ground in the world&apos;s most severe crisis zones.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regions.map((r, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                      r.urgent
                        ? "bg-[#f60362] text-white"
                        : "bg-sky-100 text-[#093484]"
                    }`}
                  >
                    {r.tag}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Global Mission</span>
                  </div>
                </div>

                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  {r.country}
                </h2>

                <div className="space-y-1.5 text-xs sm:text-sm">
                  <p className="text-slate-500 font-medium">
                    <strong className="text-slate-800">The Challenge:</strong> {r.crisis}
                  </p>
                  <p className="text-slate-600">
                    <strong className="text-slate-800">Our Action:</strong> {r.operations}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Policy
                </span>
                <Link
                  href={r.link}
                  className="inline-flex items-center gap-1.5 font-bold text-xs text-[#00a3da] hover:text-[#093484] transition uppercase tracking-wider"
                >
                  <span>Support Mission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
