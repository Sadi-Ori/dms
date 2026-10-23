import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        # 1. Homepage
        print("Visiting http://localhost:3000...")
        await page.goto("http://localhost:3000", wait_until="networkidle", timeout=15000)
        await page.screenshot(path="local_homepage.png", full_page=False)
        await page.screenshot(path="local_homepage_full.png", full_page=True)
        print("Saved local_homepage.png and local_homepage_full.png")

        # 2. Test Cart Drawer
        print("Testing Cart Drawer...")
        # click basket button
        await page.click('button[aria-label="Open donation basket"]')
        await page.wait_for_timeout(1000)
        await page.screenshot(path="local_cart_drawer.png", full_page=False)
        print("Saved local_cart_drawer.png")

        # 3. Zakat Calculator page
        print("Visiting http://localhost:3000/zakat-calculator...")
        await page.goto("http://localhost:3000/zakat-calculator", wait_until="networkidle", timeout=15000)
        await page.screenshot(path="local_zakat_calculator.png", full_page=False)
        print("Saved local_zakat_calculator.png")

        # 4. Appeal Details page
        print("Visiting http://localhost:3000/appeals/gaza-emergency...")
        await page.goto("http://localhost:3000/appeals/gaza-emergency", wait_until="networkidle", timeout=15000)
        await page.screenshot(path="local_appeal_details.png", full_page=False)
        print("Saved local_appeal_details.png")

        # 5. Checkout page
        print("Visiting http://localhost:3000/checkout...")
        await page.goto("http://localhost:3000/checkout", wait_until="networkidle", timeout=15000)
        await page.screenshot(path="local_checkout.png", full_page=False)
        print("Saved local_checkout.png")

        await browser.close()
        print("All test screenshots successfully captured!")

asyncio.run(main())
