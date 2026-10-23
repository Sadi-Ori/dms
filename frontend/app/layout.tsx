import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { fetchSiteSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Ihsan Global Relief | 100% Donation Policy | Islamic Humanitarian Aid",
  description:
    "Delivering life-saving food, clean water, orphan sponsorship, and emergency surgical aid across Palestine, Yemen, and 30+ countries with a certified 100% Donation Policy.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSiteSettings();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-sky-500 selection:text-white">
        <CartProvider>
          <Navbar
            siteName={settings.site_name}
            phone={settings.phone}
            announcementTicker={settings.announcement_ticker}
            announcementLink={settings.announcement_link}
          />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer
            siteName={settings.site_name}
            phone={settings.phone}
            email={settings.email}
            address={settings.address}
            charityRegistration={settings.charity_registration}
          />
        </CartProvider>
      </body>
    </html>
  );
}
