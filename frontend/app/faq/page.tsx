import { fetchFAQs } from "@/lib/api";
import { FaqSection } from "@/components/FaqSection";
import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | Ihsan Global Relief",
  description: "Answers to common questions regarding our 100% donation policy, Zakat calculations, tax receipts, and field operations.",
};

export default async function FaqPage() {
  const faqs = await fetchFAQs();

  return (
    <div className="bg-[#f4f6fa] min-h-screen font-sans pb-16">
      <div className="bg-gradient-to-r from-[#00a3da] to-[#093484] text-white py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-black uppercase px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Frequently Asked Questions
          </h1>
          <p className="text-sky-100 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Find answers to commonly asked questions about our 100% Policy, Islamic Giving, and field deployments.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
        <FaqSection faqs={faqs} />
      </div>
    </div>
  );
}
