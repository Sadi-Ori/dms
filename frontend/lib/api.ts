export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface SiteSettings {
  id: number;
  site_name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  charity_registration: string;
  donation_policy_percentage: number;
  announcement_ticker: string;
  announcement_link: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
}

export interface Appeal {
  id: number;
  title: string;
  slug: string;
  category: number;
  category_name?: string;
  short_description: string;
  full_story: string;
  featured_image: string;
  target_amount: string | number;
  raised_amount: string | number;
  percentage_raised?: number;
  is_urgent: boolean;
  is_zakat_eligible: boolean;
  is_featured: boolean;
  location: string;
  impact_metric: string;
  preset_amounts: number[];
  order: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon_name: string;
  description: string;
  order: number;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface AnnualReport {
  id: number;
  title: string;
  year: number;
  summary: string;
  beneficiaries_served: string;
  total_aid_delivered: string;
  countries_reached: number;
}

// Fallback seed data in case Django is starting
export const FALLBACK_SETTINGS: SiteSettings = {
  id: 1,
  site_name: "Ihsan Global Relief",
  tagline: "100% Donation Policy | Serving Humanity with Dignity",
  phone: "+1 (800) 456-7890",
  email: "support@ihsanglobal.org",
  address: "750 Humanitarian Plaza, Suite 900, New York, NY 10001",
  charity_registration: "Registered 501(c)(3) Nonprofit #84-9182371 | 100% Policy Certified",
  donation_policy_percentage: 100,
  announcement_ticker: "🚨 EMERGENCY FAMINE RELIEF: Deliver vital food parcels, clean drinking water, and trauma kits now. 100% of your donation reaches the field.",
  announcement_link: "/appeals/gaza-emergency",
  primary_color: "#00a3da",
  secondary_color: "#093484",
  accent_color: "#f60362",
};

export const FALLBACK_APPEALS: Appeal[] = [
  {
    id: 1,
    title: "Gaza & Palestine Emergency Response",
    slug: "gaza-emergency",
    category: 1,
    category_name: "Urgent Appeals",
    short_description: "Deliver immediate warm hot meals, clean drinking water tankers, medical trauma kits, and shelter tents to displaced families.",
    full_story: "The humanitarian crisis in Gaza has reached catastrophic levels. Millions of displaced civilians face extreme food insecurity and lack of potable drinking water. Our dedicated frontline logistics crews are operating daily community kitchens providing over 25,000 hot meals, trucking in desalinated water, and delivering trauma surgical packages.",
    featured_image: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80",
    target_amount: 1500000,
    raised_amount: 1184500,
    percentage_raised: 79,
    is_urgent: true,
    is_zakat_eligible: true,
    is_featured: true,
    location: "Gaza, Palestine",
    impact_metric: "Provides 50 hot meals & clean water pack ($85)",
    preset_amounts: [50, 85, 200, 500, 1000],
    order: 1,
  },
  {
    id: 2,
    title: "Build a Deep Water Well & Solar Pump",
    slug: "build-a-water-well",
    category: 3,
    category_name: "Food & Water Aid",
    short_description: "Provide a lifelong source of clean, safe drinking water to an entire village of 1,000+ people. Sadaqah Jariyah in your or a loved one's name.",
    full_story: "More than 785 million people worldwide survive without accessible clean water. By funding a community solar water station, you bestow health, prevent deadly typhoid and cholera, and liberate girls to attend school instead of carrying heavy water containers for miles.",
    featured_image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=1200&q=80",
    target_amount: 350000,
    raised_amount: 284000,
    percentage_raised: 81,
    is_urgent: false,
    is_zakat_eligible: true,
    is_featured: true,
    location: "Rural Yemen & West Africa",
    impact_metric: "Builds 1 deep village solar well ($1,200)",
    preset_amounts: [100, 300, 600, 1200, 2500],
    order: 2,
  },
  {
    id: 3,
    title: "Sponsor an Orphaned Child",
    slug: "sponsor-an-orphan",
    category: 4,
    category_name: "Orphan & Family Care",
    short_description: "Grant a vulnerable child full healthcare, education, nutritious daily meals, clothes, and safe psychological care.",
    full_story: "Vulnerable orphans caught in disasters deserve love, dignity, and a future. Your monthly or yearly sponsorship ensures a child has books, uniforms, warm bedding, pediatric checkups, and loving caregiver supervision.",
    featured_image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    target_amount: 500000,
    raised_amount: 395200,
    percentage_raised: 79,
    is_urgent: true,
    is_zakat_eligible: true,
    is_featured: true,
    location: "Lebanon, Palestine, Bangladesh",
    impact_metric: "Sponsors 1 child for a full month ($60)",
    preset_amounts: [60, 120, 360, 720],
    order: 3,
  },
  {
    id: 4,
    title: "Gaza Emergency Field Hospital & Medical Kits",
    slug: "gaza-hospital-rebuild",
    category: 1,
    category_name: "Urgent Appeals",
    short_description: "Equip field triage tents, trauma surgical units, burn treatment dressings, and essential intravenous medicines.",
    full_story: "Healthcare facilities in crisis zones desperately need intravenous anesthetics, antibiotics, surgical tools, and power fuel. Our medical convoys resupply triage wards and clinics to save lives around the clock.",
    featured_image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    target_amount: 750000,
    raised_amount: 512000,
    percentage_raised: 68,
    is_urgent: true,
    is_zakat_eligible: true,
    is_featured: false,
    location: "Southern Gaza Clinics",
    impact_metric: "Emergency surgical trauma box ($250)",
    preset_amounts: [50, 150, 250, 500, 1000],
    order: 4,
  },
  {
    id: 5,
    title: "Yemen Famine Relief & Malnutrition Clinics",
    slug: "yemen-famine-relief",
    category: 3,
    category_name: "Food & Water Aid",
    short_description: "Provide therapeutic peanut paste (Plumpy'Nut), infant emergency formula, and staples for families on the brink of starvation.",
    full_story: "Acute malnutrition threatens children throughout Yemen. Our community nutrition hubs administer lifesaving high-calorie nutrient pastes, monitor infant vitals, and provide maternal food packs.",
    featured_image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    target_amount: 400000,
    raised_amount: 310000,
    percentage_raised: 78,
    is_urgent: true,
    is_zakat_eligible: true,
    is_featured: false,
    location: "Hodeidah & Sana'a, Yemen",
    impact_metric: "Therapeutic nutrition for 1 infant ($45)",
    preset_amounts: [45, 90, 180, 450],
    order: 5,
  },
  {
    id: 6,
    title: "Build a Community Mosque & Education Centre",
    slug: "build-a-masjid",
    category: 5,
    category_name: "Sadaqah Jariyah",
    short_description: "Construct a spiritual sanctuary and community learning academy for impoverished villages. Earn eternal reward for every prayer uttered.",
    full_story: "Build a durable brick Masjid with wudu ablution stations, clean solar energy, loudspeaker systems, and a Quranic academy for hundreds of villagers to worship together with pride.",
    featured_image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    target_amount: 250000,
    raised_amount: 187500,
    percentage_raised: 75,
    is_urgent: false,
    is_zakat_eligible: false,
    is_featured: true,
    location: "Togo, West Africa",
    impact_metric: "Complete community masjid brick share ($150)",
    preset_amounts: [50, 150, 500, 1500, 5000],
    order: 6,
  },
];

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${API_BASE}/core/settings/`, { next: { revalidate: 60 } });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback settings due to API fetch error", err);
  }
  return FALLBACK_SETTINGS;
}

export async function fetchAppeals(params?: { category?: string; urgent?: boolean; featured?: boolean }): Promise<Appeal[]> {
  try {
    const query = new URLSearchParams();
    if (params?.category) query.set("category", params.category);
    if (params?.urgent !== undefined) query.set("urgent", String(params.urgent));
    if (params?.featured !== undefined) query.set("featured", String(params.featured));

    const url = `${API_BASE}/appeals/appeals/${query.toString() ? `?${query.toString()}` : ""}`;
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (res.ok) {
      const json = await res.json();
      return json.results || json;
    }
  } catch (err) {
    console.warn("Using fallback appeals due to API fetch error", err);
  }
  return FALLBACK_APPEALS;
}

export async function fetchAppealBySlug(slug: string): Promise<Appeal | null> {
  try {
    const res = await fetch(`${API_BASE}/appeals/appeals/${slug}/`, { next: { revalidate: 30 } });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback appeal by slug due to API fetch error", err);
  }
  return FALLBACK_APPEALS.find((a) => a.slug === slug) || null;
}

export async function fetchFAQs(): Promise<FAQ[]> {
  try {
    const res = await fetch(`${API_BASE}/core/faqs/`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      return json.results || json;
    }
  } catch {
    // fallback
  }
  return [
    {
      id: 1,
      question: "What is our mission and 100% Donation Policy?",
      answer: "Under our strict 100% Donation Policy, every single cent (100%) of your designated donation goes directly to the humanitarian project on the ground. Operational and administrative costs are funded separately through separate dedicated business sponsorships, Gift Aid, and institutional endowments.",
      category: "policy",
      order: 1,
    },
    {
      id: 2,
      question: "Can I give my 100% Zakat through this platform?",
      answer: "Yes! All our Zakat-eligible projects are reviewed by verified Islamic scholars. 100% of your Zakat is distributed strictly to qualifying recipients (the poor, destitute, debtors, and displaced) with zero administrative deductions.",
      category: "zakat",
      order: 2,
    },
    {
      id: 3,
      question: "How does the Zakat Calculator work?",
      answer: "Our interactive Zakat Calculator takes your liquid cash, bank balances, gold, silver, investments, and business stock, deducts your immediate debts and bills, and compares your net wealth against the current silver/gold Nisab threshold. If your wealth exceeds Nisab, it automatically calculates the exact 2.5% obligation, which you can add straight into your donation basket.",
      category: "zakat",
      order: 3,
    },
    {
      id: 4,
      question: "What is Sadaqah Jariyah and which projects qualify?",
      answer: "Sadaqah Jariyah is continuous, ongoing charity whose rewards continue long after the donor has passed away. Projects such as building deep clean-water wells, constructing community masjids, planting olive trees, building schools, and installing solar generators qualify as Sadaqah Jariyah.",
      category: "appeals",
      order: 4,
    },
  ];
}

export async function fetchNisabRates() {
  try {
    const res = await fetch(`${API_BASE}/zakat/nisab/`, { next: { revalidate: 60 } });
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  return {
    silver_threshold: 563.37,
    gold_threshold: 6867.18,
    silver: { price_per_gram: 0.92, nisab_grams: 612.36 },
    gold: { price_per_gram: 78.50, nisab_grams: 87.48 },
    currency: "USD",
  };
}

export async function calculateZakatApi(payload: any) {
  const res = await fetch(`${API_BASE}/zakat/calculate/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function submitDonationApi(payload: any) {
  const res = await fetch(`${API_BASE}/appeals/donations/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function submitContactApi(payload: any) {
  const res = await fetch(`${API_BASE}/core/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function submitVolunteerApi(payload: any) {
  const res = await fetch(`${API_BASE}/appeals/volunteers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function subscribeNewsletterApi(email: string) {
  const res = await fetch(`${API_BASE}/core/newsletter/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await res.json();
}
