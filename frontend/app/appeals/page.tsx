import { fetchAppeals } from "@/lib/api";
import { UrgentAppeals } from "@/components/UrgentAppeals";
import { Flame } from "lucide-react";

export const metadata = {
  title: "All Humanitarian Appeals | Ihsan Global Relief",
  description: "Browse all active emergency appeals, clean water initiatives, orphan sponsorships, and Zakat-eligible campaigns.",
};

export default async function AppealsPage() {
  const appeals = await fetchAppeals();

  return (
    <div className="bg-[#f4f6fa] min-h-screen">
      {/* Page Hero Header */}
      <div className="bg-gradient-to-r from-[#00a3da] to-[#093484] text-white py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-black uppercase px-3 py-1 rounded-full mb-3">
            <Flame className="w-3.5 h-3.5 fill-white" />
            <span>Active Field Missions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            All Humanitarian Appeals
          </h1>
          <p className="text-sky-100 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            100% of every donation goes directly to the field. Choose an appeal below to deliver immediate life-saving food, clean water, medical aid, or ongoing Sadaqah.
          </p>
        </div>
      </div>

      <div className="py-8">
        <UrgentAppeals appeals={appeals} />
      </div>
    </div>
  );
}
