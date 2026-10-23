import { ZakatCalculator } from "@/components/ZakatCalculator";
import { Coins } from "lucide-react";

export const metadata = {
  title: "Zakat Calculator | Gold & Silver Nisab | Ihsan Global Relief",
  description: "Calculate your exact 2.5% Zakat obligation with live Gold and Silver Nisab rates. 100% of your Zakat reaches verified recipients.",
};

export default function ZakatCalculatorPage() {
  return (
    <div className="bg-[#f4f6fa] min-h-screen font-sans pb-16">
      <div className="bg-gradient-to-r from-[#00a3da] to-[#093484] text-white py-14 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-full mb-3 shadow">
            <Coins className="w-3.5 h-3.5" />
            <span>Fulfill Your Religious Obligation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Official Zakat Calculator
          </h1>
          <p className="text-sky-100 text-sm sm:text-base mt-2 max-w-lg mx-auto">
            Input your cash, gold, silver, investments, and business stock to accurately determine your Zakat with 100% Policy guarantee.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-5xl">
        <ZakatCalculator />
      </div>
    </div>
  );
}
