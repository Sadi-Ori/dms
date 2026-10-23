import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})

        # 1. Homepage & Quick Donate
        print("Visiting homepage...")
        await page.goto("http://localhost:3000", wait_until="networkidle")
        
        # Click Quick Donate button
        print("Clicking Quick Donate...")
        await page.click('button:has-text("Donate $85 Now")')
        await page.wait_for_timeout(1000)

        # 2. Click Proceed to Checkout in Cart Drawer
        print("Proceeding to checkout...")
        await page.click('a:has-text("Proceed to Checkout")')
        await page.wait_for_timeout(1000)
        
        # Screenshot checkout with items
        await page.screenshot(path="local_checkout_with_items.png", full_page=False)
        print("Saved local_checkout_with_items.png")

        # 3. Fill donor info
        print("Filling donor info...")
        await page.fill('input[placeholder="First Name"]', "Ahmed")
        await page.fill('input[placeholder="Last Name"]', "Mansoor")
        await page.fill('input[placeholder="donor@example.com"]', "ahmed.mansoor@example.com")
        await page.fill('input[placeholder="+1 (555) 000-0000"]', "+1 212 555 0199")

        # 4. Click Complete Donation
        print("Submitting donation...")
        await page.click('button:has-text("Complete")')
        await page.wait_for_timeout(2000)

        # 5. Take screenshot of official receipt page
        await page.screenshot(path="local_receipt_success.png", full_page=False)
        print("Saved local_receipt_success.png!")

        await browser.close()

asyncio.run(main())
