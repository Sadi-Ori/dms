"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X, Award, Globe2, Heart, Users } from "lucide-react";

export const LegacyStorySection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const stats = [
    { label: "Countries Active", value: "34+", icon: Globe2 },
    { label: "Meals Distributed", value: "18M+", icon: Heart },
    { label: "Water Wells Drilled", value: "650+", icon: Award },
    { label: "Orphans Sponsored", value: "28,000+", icon: Users },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#093484] via-[#062258] to-slate-950 text-white font-sans relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f60362]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Video Thumbnail with Play Button */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer aspect-video bg-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
                alt="Humanitarian Legacy Field Work"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Play Button Trigger */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                aria-label="Play documentary video"
                className="absolute inset-0 flex items-center justify-center m-auto w-20 h-20 rounded-full bg-[#f60362] text-white shadow-2xl group-hover:scale-110 group-hover:bg-[#d90255] transition-all duration-300"
              >
                <Play className="w-8 h-8 fill-white ml-1" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300 bg-sky-950/70 px-3 py-1 rounded-full border border-sky-400/30">
                  Featured Documentary
                </span>
                <p className="font-extrabold text-lg sm:text-xl text-white mt-2">
                  A Legacy of Compassion: Serving the Needy Across 34 Countries
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-sky-400">
              <span>Our Founding Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              A Heart Dedicated to Leaving No One Behind.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Born from a steadfast vision to empower the most vulnerable, our humanitarian foundation was created to bridge deep empathy with rapid on-the-ground action. When natural disasters, displacement, and extreme famine strike, we do not hesitate.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              From building resilient water wells in remote African villages to delivering daily hot meals and surgical equipment into conflict zones, every initiative is driven by our sacred 100% Donation Policy.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-black text-sky-400">
                      {s.value}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Humanitarian Documentary"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};
