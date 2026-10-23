# Ihsan Global Relief - Full-Stack Humanitarian Donation Platform
Modeled after **[MATW Project (Muslims Around The World)](https://matwproject.org/)** with custom branding, 100% Donation Policy, full Django REST backend, and pixel-perfect Next.js 14 frontend.

---

## 🚀 Live Local Servers

- **Frontend (Next.js 14)**: [http://localhost:3000](http://localhost:3000)
- **Backend API (Django REST Framework)**: [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)
- **Django Admin Panel**: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
  - **Username**: `admin`
  - **Password**: `admin123456`

---

## 🌟 Feature & Section Mapping from matwproject.org

| Section / Page | Implementation in Project | Description |
|---|---|---|
| **Emergency Ticker** | `<Navbar />` | Urgent famine & medical alert bar with link to priority appeal |
| **Top Utility Bar** | `<Navbar />` | Clickable toll-free phone, 100% Policy Certified badge, currency selector (`USD`, `GBP`, `EUR`, `CAD`, `AUD`) |
| **Main Header & Mega Menu** | `<Navbar />` | High-contrast gradient bar with dropdowns for Urgent Appeals, Islamic Giving, Our Work, 100% Policy, About, Contact, Basket trigger, and `Donate Now` CTA |
| **Sliding Donation Basket** | `<CartDrawer />` | Slide-in drawer (`z-[1040]`) with item removal, frequency switch (Once vs Monthly), amount edit, suggested additions, and checkout trigger |
| **Hero Slider & Quick Donate** | `<HeroSlider />` | Full-width hero image with emergency alert badge, headline, and embedded quick donation widget (Single/Monthly tabs, amount presets $50-$700, custom amount, cause dropdown) |
| **Urgent Appeals Carousel** | `<UrgentAppeals />` | Campaign cards with progress bars (raised vs goal), percentage badges, amount selection pills, and instant add-to-basket |
| **Featured Projects** | `<FeaturedProjects />` | Deep-water wells, Gaza field hospital trauma kits, and orphan sponsorship |
| **Our Promise (100% Policy)** | `<PromiseSection />` & `/our-promise` | 4 pillars: 100% direct aid delivery, zero admin deduction, scholar supervision, total transparency |
| **Legacy & Documentary Story** | `<LegacyStorySection />` | Founder narrative, impact statistics (34+ countries, 18M+ meals, 650+ wells, 28k+ orphans), responsive video modal |
| **Get Involved Action Grid** | `<GetInvolvedGrid />` | 4 visual action tiles: View Reports, Volunteer, All Appeals, Social Media |
| **FAQ Accordion** | `<FaqSection />` & `/faq` | Interactive expandable questions covering 100% policy, Zakat eligibility, Sadaqah Jariyah, and receipts |
| **Footer** | `<Footer />` | Brand gradient top footer with live newsletter subscription form, 5 categorized link columns, and bottom charcoal bar with 501(c)(3) legal disclaimer and payment method badges |
| **Zakat Calculator** | `/zakat-calculator` & `/zakat` | Live Silver ($563) and Gold ($6,867) Nisab thresholds, asset inputs, deduction calculations, live 2.5% computation, and one-click basket addition |
| **Single Appeal Details** | `/appeals/[slug]` | Dedicated story, photo gallery, impact metrics, progress bar, and donation form |
| **Where We Work** | `/where-we-work` | Operational footprint across Palestine, Yemen, Lebanon, Togo, Sudan, Bangladesh |
| **Volunteer Registration** | `/volunteer` | Complete volunteer form submitting directly to Django backend `/api/appeals/volunteers/` |
| **Contact Support** | `/contact` | Inquiry message form submitting to Django backend `/api/core/contact/` |
| **Financial Reports** | `/annual-reports` | Audited financial statements and impact transparency reviews |
| **Checkout & Receipts** | `/checkout` & `/checkout/success` | Multi-step donor info, payment method selector, batch donation processing, and printable official tax-deductible receipt |

---

## 🛠️ Technology Stack

### Backend (Django 6.0 & Python 3.12)
- **Django REST Framework**: REST endpoints for appeals, categories, donations, volunteer submissions, contact inquiries, site settings, and Nisab rates.
- **Django CORS Headers**: Configured for `localhost:3000`.
- **Apps**:
  - `core`: Site settings, branding, FAQs, annual reports, contact messages, newsletter subscribers.
  - `appeals`: Categories, appeals, donations (with unique transaction and receipt numbers), and volunteer applications.
  - `zakat`: Metal Nisab thresholds (Gold & Silver) and zakat calculation engine.
- **Database**: SQLite3 pre-seeded with rich, realistic humanitarian campaigns and admin user.

### Frontend (Next.js 14 & React 18)
- **Next.js App Router**: Optimized server and client components.
- **Tailwind CSS**: Custom color palette matching MATW aesthetic (`#00a3da` sky blue, `#093484` deep navy, `#f60362` vibrant pink CTA).
- **Lucide React**: Clean, modern iconography.
- **Context API (`CartContext`)**: Global persistent donation basket state, currency switching, and instant drawer management.

---

## 🏃 Running the Application

### Option A: One-Click (Windows)
Double-click `start_servers.bat` in the root folder.

### Option B: Manual Command Line

**1. Start Django Backend:**
```bash
cd backend
python manage.py runserver 127.0.0.1:8000
```

**2. Start Next.js Frontend:**
```bash
cd frontend
npm run start -- -p 3000
# Or for development with live reload:
# npm run dev
```
