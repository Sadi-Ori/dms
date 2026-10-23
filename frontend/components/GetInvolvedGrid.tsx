"use client";

import React from "react";
import Link from "next/link";
import { FileText, Users, HeartHandshake, Share2, ArrowRight } from "lucide-react";

export const GetInvolvedGrid: React.FC = () => {
  const cards = [
    {
      title: "VIEW OUR REPORTS",
      subtitle: "Full Financial & Field Audits",
      desc: "Download our audited annual financial statements and see how 100% of your donations are spent.",
      href: "/annual-reports",
      icon: FileText,
      bg: "from-[#00a3da] to-[#093484]",
    },
    {
      title: "VOLUNTEER WITH US",
      subtitle: "Join Frontline Relief",
      desc: "Lend your professional medical, logistical, or community outreach skills to our global movement.",
      href: "/volunteer",
      icon: Users,
      bg: "from-[#093484] to-[#062258]",
    },
    {
      title: "VIEW ALL APPEALS",
      subtitle: "Every Active Campaign",
      desc: "Explore all ongoing humanitarian appeals across Palestine, Yemen, Sudan, and Africa.",
      href: "/appeals",
      icon: HeartHandshake,
      bg: "from-[#f60362] to-[#b30043]",
    },
    {
      title: "FOLLOW OUR FIELD WORK",
      subtitle: "Live Ground Distributions",
      desc: "Watch daily video updates, food convoy distributions, and water well handovers directly on social media.",
      href: "https://instagram.com",
      icon: Share2,
      bg: "from-sky-700 to-indigo-900",
      external: true,
    },
  ];

  return (
    <section className="py-16 bg-[#f4f6fa] font-sans">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black text-[#f60362] uppercase tracking-widest">
            Be the Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#093484] tracking-tight uppercase mt-1">
            Get Involved Today!
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Whether through financial contributions, professional volunteering, or spreading awareness, your voice saves lives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${c.bg} text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
                    {c.title}
                  </h3>
                  <p className="text-xs font-bold text-[#00a3da] mt-0.5">
                    {c.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-6">
                  {c.external ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#093484] group-hover:text-[#f60362] transition"
                    >
                      <span>Connect Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={c.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#093484] group-hover:text-[#f60362] transition"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
