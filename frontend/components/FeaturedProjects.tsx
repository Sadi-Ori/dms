"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Droplets, Users, Stethoscope, ArrowRight, ShieldCheck } from "lucide-react";

export const FeaturedProjects: React.FC = () => {
  const { addToCart, formatPrice } = useCart();

  const projects = [
    {
      title: "Build a Water Well in Gaza & Yemen",
      tag: "Sadaqah Jariyah",
      desc: "Water is the source of all life. In conflict and arid zones, clean water protects thousands of children from deadly waterborne diseases.",
      image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80",
      icon: Droplets,
      amount: 300,
      slug: "build-a-water-well",
      appeal_id: 2,
    },
    {
      title: "Gaza Hospital & Emergency Surgery Kits",
      tag: "Urgent Medical",
      desc: "Providing trauma burn dressings, surgical needles, IV fluids, and pediatric incubators to frontline field triage tents in Gaza.",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      icon: Stethoscope,
      amount: 250,
      slug: "gaza-hospital-rebuild",
      appeal_id: 4,
    },
    {
      title: "Feed Orphaned Children in Crisis",
      tag: "Orphan Sponsorship",
      desc: "Thousands of children have lost both parents. Your support delivers warm daily meals, education, health checkups, and loving caregiver supervision.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      icon: Users,
      amount: 60,
      slug: "sponsor-an-orphan",
      appeal_id: 3,
    },
  ];

  return (
    <section className="py-16 bg-white font-sans">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black text-[#00a3da] uppercase tracking-widest">
            High-Impact Humanitarian Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#093484] tracking-tight mt-1">
            Featured Life-Changing Initiatives
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Targeted long-term and emergency programs designed to restore dignity, water security, and medical stability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#093484] text-xs font-extrabold px-3 py-1 rounded-full shadow flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-[#00a3da]" />
                    <span>{proj.tag}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-[#00a3da] transition leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() =>
                        addToCart({
                          appeal_id: proj.appeal_id,
                          title: proj.title,
                          amount: proj.amount,
                          frequency: "once",
                          isZakatEligible: true,
                        })
                      }
                      className="flex-1 bg-[#093484] hover:bg-[#062258] text-white font-extrabold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow transition"
                    >
                      Donate {formatPrice(proj.amount)}
                    </button>

                    <Link
                      href={`/appeals/${proj.slug}`}
                      className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                      title="Read project story"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
