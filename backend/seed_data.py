import os
import django
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'donation_backend.settings')
django.setup()

from django.contrib.auth.models import User
from core.models import SiteSetting, FAQ, AnnualReport
from appeals.models import Category, Appeal
from zakat.models import NisabRate

def seed():
    print("--- SEEDING DATABASE ---")

    # 1. Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@ihsanglobal.org', 'admin123456')
        print("Superuser 'admin' created (password: admin123456)")
    else:
        print("Superuser 'admin' already exists")

    # 2. Site Settings
    setting, created = SiteSetting.objects.get_or_create(id=1)
    setting.site_name = "Ihsan Global Relief"
    setting.tagline = "100% Donation Policy | Serving Humanity with Dignity"
    setting.phone = "+1 (800) 456-7890"
    setting.email = "support@ihsanglobal.org"
    setting.address = "750 Humanitarian Plaza, Suite 900, New York, NY 10001"
    setting.charity_registration = "Registered 501(c)(3) Nonprofit Org #84-9182371 | 100% Policy Certified"
    setting.donation_policy_percentage = 100
    setting.announcement_ticker = "🚨 EMERGENCY FAMINE RELIEF: Deliver vital food parcels, clean drinking water, and trauma kits now. 100% of your donation reaches the field."
    setting.announcement_link = "/appeals/gaza-emergency"
    setting.primary_color = "#0284c7"
    setting.secondary_color = "#0f172a"
    setting.accent_color = "#f43f5e"
    setting.save()
    print("Site settings saved")

    # 3. Nisab Rates
    NisabRate.objects.update_or_create(
        metal='gold',
        defaults={
            'price_per_gram': Decimal('78.50'),
            'nisab_grams': Decimal('87.48'),
            'currency': 'USD'
        }
    )
    NisabRate.objects.update_or_create(
        metal='silver',
        defaults={
            'price_per_gram': Decimal('0.92'),
            'nisab_grams': Decimal('612.36'),
            'currency': 'USD'
        }
    )
    print("Nisab rates updated")

    # 4. Categories
    categories_data = [
        {"name": "Urgent Appeals", "slug": "urgent-appeals", "icon_name": "flame", "order": 1, "description": "Immediate life-saving humanitarian response for conflict and natural disaster zones."},
        {"name": "Zakat Fund", "slug": "zakat-fund", "icon_name": "coins", "order": 2, "description": "100% Zakat policy ensuring every cent fulfills your religious obligation."},
        {"name": "Food & Water Aid", "slug": "food-water", "icon_name": "droplets", "order": 3, "description": "Sustainable deep-water wells, clean drinking plants, and hot meal distributions."},
        {"name": "Orphan & Family Care", "slug": "orphans", "icon_name": "users", "order": 4, "description": "Providing vulnerable orphans with nutritious food, education, healthcare, and safe shelter."},
        {"name": "Sadaqah Jariyah", "slug": "sadaqah-jariyah", "icon_name": "sparkles", "order": 5, "description": "Long-term ongoing charity: build a mosque, schools, water pipelines, and livelihood training."},
    ]

    cat_map = {}
    for c in categories_data:
        cat, _ = Category.objects.update_or_create(
            slug=c['slug'],
            defaults={'name': c['name'], 'icon_name': c['icon_name'], 'order': c['order'], 'description': c['description']}
        )
        cat_map[c['slug']] = cat
    print(f"Categories seeded: {len(cat_map)}")

    # 5. High-Impact Appeals
    appeals_data = [
        {
            "title": "Gaza & Palestine Emergency Response",
            "slug": "gaza-emergency",
            "category": cat_map["urgent-appeals"],
            "short_description": "Deliver immediate warm hot meals, clean drinking water tankers, medical trauma kits, and shelter tents to displaced families.",
            "full_story": "The humanitarian crisis in Gaza has reached unprecedented catastrophe. Millions of civilians face displacement, severe famine, and lack of clean drinking water. Our dedicated teams on the ground are operating community kitchens, delivering over 25,000 hot nutritious meals daily, running emergency water desalination trucks, and distributing life-saving surgical medical supplies to overwhelmed field hospitals. With our strict 100% Donation Policy, every dollar you give translates directly into life-saving aid on the ground.",
            "featured_image": "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80",
            "target_amount": Decimal("1500000.00"),
            "raised_amount": Decimal("1184500.00"),
            "is_urgent": True,
            "is_zakat_eligible": True,
            "is_featured": True,
            "location": "Gaza, Palestine",
            "impact_metric": "Provides 50 hot meals & water pack ($85)",
            "preset_amounts": [50, 85, 200, 500, 1000],
            "order": 1,
        },
        {
            "title": "Build a Deep Water Well & Solar Pump",
            "slug": "build-a-water-well",
            "category": cat_map["food-water"],
            "short_description": "Provide a lifelong source of clean, safe drinking water to an entire village of 1,000+ people. Sadaqah Jariyah in your or a loved one's name.",
            "full_story": "Over 785 million people worldwide lack access to clean drinking water. Women and children walk miles each day only to collect contaminated water that causes deadly waterborne illnesses. By funding a community solar water well, you provide reliable, clean drinking water, sanitation facilities, and water for agriculture. You receive a personalized completion plaque, GPS coordinates, and a comprehensive field photo report.",
            "featured_image": "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=1200&q=80",
            "target_amount": Decimal("350000.00"),
            "raised_amount": Decimal("284000.00"),
            "is_urgent": False,
            "is_zakat_eligible": True,
            "is_featured": True,
            "location": "Rural Yemen & West Africa",
            "impact_metric": "Builds 1 deep village solar well ($1,200)",
            "preset_amounts": [100, 300, 600, 1200, 2500],
            "order": 2,
        },
        {
            "title": "Sponsor an Orphaned Child",
            "slug": "sponsor-an-orphan",
            "category": cat_map["orphans"],
            "short_description": "Grant a vulnerable child full healthcare, education, nutritious daily meals, clothes, and safe psychological care.",
            "full_story": "War and crisis leave hundreds of thousands of children without parents or protectors. Our Orphan Sponsorship Programme delivers complete holistic care: enrolled in formal schooling, receiving balanced meals, regular medical checkups, and loving caregiver supervision. You receive an annual progress report, school report cards, and drawings from the child you sponsor.",
            "featured_image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
            "target_amount": Decimal("500000.00"),
            "raised_amount": Decimal("395200.00"),
            "is_urgent": True,
            "is_zakat_eligible": True,
            "is_featured": True,
            "location": "Lebanon, Palestine, Bangladesh",
            "impact_metric": "Sponsors 1 child for a full month ($60)",
            "preset_amounts": [60, 120, 360, 720],
            "order": 3,
        },
        {
            "title": "Gaza Emergency Field Hospital & Medical Kits",
            "slug": "gaza-hospital-rebuild",
            "category": cat_map["urgent-appeals"],
            "short_description": "Equip field triage tents, trauma surgical units, burn treatment dressings, and essential intravenous medicines.",
            "full_story": "Healthcare facilities in disaster and conflict areas face complete depletion of anesthetics, antibiotics, surgical tools, and power fuel. Our medical convoys supply frontline doctors and clinics with trauma treatment kits, portable incubators, and emergency fuel for hospital generators to keep intensive care units alive.",
            "featured_image": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
            "target_amount": Decimal("750000.00"),
            "raised_amount": Decimal("512000.00"),
            "is_urgent": True,
            "is_zakat_eligible": True,
            "is_featured": False,
            "location": "Southern Gaza Clinics",
            "impact_metric": "Emergency surgical trauma box ($250)",
            "preset_amounts": [50, 150, 250, 500, 1000],
            "order": 4,
        },
        {
            "title": "Yemen Famine Relief & Malnutrition Clinics",
            "slug": "yemen-famine-relief",
            "category": cat_map["food-water"],
            "short_description": "Provide therapeutic peanut paste (Plumpy'Nut), infant emergency formula, and staples for families on the brink of starvation.",
            "full_story": "Years of ongoing conflict have left millions of Yemeni children experiencing acute severe malnutrition. Our therapeutic feeding clinics evaluate malnourished babies, administer lifesaving nutrient pastes, and support mothers with clean maternity care.",
            "featured_image": "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
            "target_amount": Decimal("400000.00"),
            "raised_amount": Decimal("310000.00"),
            "is_urgent": True,
            "is_zakat_eligible": True,
            "is_featured": False,
            "location": "Hodeidah & Sana'a, Yemen",
            "impact_metric": "Therapeutic nutrition for 1 infant ($45)",
            "preset_amounts": [45, 90, 180, 450],
            "order": 5,
        },
        {
            "title": "Build a Community Mosque & Education Centre",
            "slug": "build-a-masjid",
            "category": cat_map["sadaqah-jariyah"],
            "short_description": "Construct a spiritual sanctuary and community learning academy for impoverished villages. Earn eternal reward for every prayer uttered.",
            "full_story": "The Prophet (ﷺ) said: 'Whoever builds a mosque for Allah, Allah will build for them a house in Paradise.' In remote regions of Togo and Bangladesh, communities pray under the scorching sun or monsoon rain. This project builds a durable, brick-and-mortar Masjid with wudu ablution stations, solar lighting, sound systems, and a Quran classroom.",
            "featured_image": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
            "target_amount": Decimal("250000.00"),
            "raised_amount": Decimal("187500.00"),
            "is_urgent": False,
            "is_zakat_eligible": False,
            "is_featured": True,
            "location": "Togo, West Africa",
            "impact_metric": "Complete community masjid brick share ($150)",
            "preset_amounts": [50, 150, 500, 1500, 5000],
            "order": 6,
        },
    ]

    for a in appeals_data:
        Appeal.objects.update_or_create(slug=a['slug'], defaults=a)
    print(f"Appeals seeded: {len(appeals_data)}")

    # 6. FAQs
    faqs_data = [
        {
            "question": "What is our mission and 100% Donation Policy?",
            "answer": "Our mission is to empower impoverished and crisis-stricken communities with life-saving relief, dignity, and sustainable development. Under our strict 100% Donation Policy, every single cent (100%) of your designated donation goes directly to the humanitarian project on the ground. Operational and administrative costs are funded separately through separate dedicated business sponsorships, Gift Aid, and distinct institutional endowments.",
            "category": "policy",
            "order": 1,
        },
        {
            "question": "Can I give my 100% Zakat through this platform?",
            "answer": "Yes! All our Zakat-eligible projects are reviewed by verified Islamic scholars. When you allocate funds to Zakat, 100% of your money is distributed strictly to qualifying recipients (the poor, destitute, debtors, and displaced) with zero administrative deductions.",
            "category": "zakat",
            "order": 2,
        },
        {
            "question": "How does the Zakat Calculator work?",
            "answer": "Our interactive Zakat Calculator takes your liquid cash, bank balances, gold, silver, investments, and business stock, deducts your immediate debts and bills, and compares your net wealth against the current silver/gold Nisab threshold. If your wealth exceeds Nisab, it automatically calculates the exact 2.5% obligation, which you can add straight into your donation basket.",
            "category": "zakat",
            "order": 3,
        },
        {
            "question": "What is Sadaqah Jariyah and which projects qualify?",
            "answer": "Sadaqah Jariyah is continuous, ongoing charity whose rewards continue long after the donor has passed away. Projects such as building deep clean-water wells, constructing community masjids, planting olive trees, building schools, and installing solar generators qualify as Sadaqah Jariyah.",
            "category": "appeals",
            "order": 4,
        },
        {
            "question": "Which countries do we currently operate in?",
            "answer": "We have active ground deployment missions in over 30 countries, with major active response programs across Palestine (Gaza & West Bank), Yemen, Lebanon, Syria, Bangladesh, Pakistan, Sudan, Morocco, and West Africa (including Togo, Ghana, and Nigeria).",
            "category": "general",
            "order": 5,
        },
        {
            "question": "How do I receive a tax-deductible receipt for my donation?",
            "answer": "Immediately upon completing your donation, an official electronic receipt containing your unique transaction ID, receipt reference number, and charity registration details is displayed on screen and emailed to your specified address.",
            "category": "general",
            "order": 6,
        },
    ]

    for f in faqs_data:
        FAQ.objects.update_or_create(question=f['question'], defaults=f)
    print(f"FAQs seeded: {len(faqs_data)}")

    # 7. Annual Reports
    reports_data = [
        {"title": "Global Impact & Financial Audit Report", "year": 2025, "beneficiaries_served": "1,850,000+", "total_aid_delivered": "$24,500,000", "countries_reached": 34, "summary": "Full transparency review showing 100% aid deployment in Gaza crisis response, 420 water wells built, and 12,000 orphans sponsored."},
        {"title": "Annual Humanitarian Progress Report", "year": 2024, "beneficiaries_served": "1,420,000+", "total_aid_delivered": "$19,200,000", "countries_reached": 31, "summary": "Expanded emergency medical convoys into Lebanon and Yemen; completed 15 community centers and mobile nutrition vans."},
        {"title": "Charity Transparency & Field Audit", "year": 2023, "beneficiaries_served": "1,150,000+", "total_aid_delivered": "$15,800,000", "countries_reached": 28, "summary": "Earthquake emergency responses across Turkey and Syria, delivering over 1.2M emergency meals and emergency winter tents."},
    ]

    for r in reports_data:
        AnnualReport.objects.update_or_create(title=r['title'], year=r['year'], defaults=r)
    print(f"Annual Reports seeded: {len(reports_data)}")

    print("--- SEEDING COMPLETED SUCCESSFULLY ---")

if __name__ == '__main__':
    seed()
