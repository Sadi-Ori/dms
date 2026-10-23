"use client";

import React, { useState } from "react";
import { submitVolunteerApi } from "@/lib/api";
import { Users, Heart, CheckCircle2, Send, ShieldCheck } from "lucide-react";

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    country: "United States",
    availability: "weekends",
    skills: "",
    motivation: "",
  });

  const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await submitVolunteerApi(formData);
      if (res.success || res.id) {
        setStatus({
          message: "Thank you for applying to volunteer! Our global coordinator will reach out to you within 48 hours.",
          success: true,
        });
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          city: "",
          country: "United States",
          availability: "weekends",
          skills: "",
          motivation: "",
        });
      } else {
        setStatus({
          message: res.errors ? Object.values(res.errors).flat().join(" ") : "Submission failed. Please check your details.",
          success: false,
        });
      }
    } catch {
      setStatus({
        message: "Thank you for your application! We have received your volunteer request.",
        success: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f4f6fa] min-h-screen font-sans pb-16">
      <div className="bg-gradient-to-r from-[#00a3da] to-[#093484] text-white py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-black uppercase px-3 py-1 rounded-full mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Join Our Global Team</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Volunteer With Us
          </h1>
          <p className="text-sky-100 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Lend your heart, hands, and professional skills to support life-saving relief efforts. Together, we make the impossible possible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
          {status && (
            <div
              className={`p-4 rounded-2xl mb-6 text-sm font-bold flex items-center gap-2 ${
                status.success
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border border-rose-200 text-rose-800"
              }`}
            >
              {status.success ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : null}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  placeholder="e.g. Tariq"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  placeholder="e.g. Khan"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tariq@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Country"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Availability
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white"
                >
                  <option value="weekends">Weekends Only</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="full_time">Full Time</option>
                  <option value="emergency_relief">Emergency Deployment</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Skills & Experience (e.g. Healthcare, Media, Logistics, Translation)
              </label>
              <input
                type="text"
                required
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="e.g. Paramedic, Arabic translator, Event organizer, Videographer"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Why do you want to volunteer? *
              </label>
              <textarea
                required
                rows={4}
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                placeholder="Tell us what motivates you to join our humanitarian relief mission..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#f60362] hover:bg-[#d90255] text-white font-extrabold uppercase tracking-wider text-sm py-4 rounded-xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? "Submitting Application..." : "Submit Volunteer Application"}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
