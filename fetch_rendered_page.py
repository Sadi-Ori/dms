import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        try:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                viewport={"width": 1440, "height": 900},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
            page = await context.new_page()
            print("Navigating to https://matwproject.org/...")
            await page.goto("https://matwproject.org/", wait_until="domcontentloaded", timeout=30000)
            print("DOM loaded, waiting 6 seconds for React to mount...")
            await page.wait_for_timeout(6000)
            
            title = await page.title()
            print("Page title:", title)
            
            # Take screenshots of full page and hero
            await page.screenshot(path="matw_homepage_above_fold.png", full_page=False)
            await page.screenshot(path="matw_homepage_full.png", full_page=True)
            print("Screenshots saved!")
            
            # Get full HTML content
            content = await page.content()
            with open("matw_rendered_home.html", "w", encoding="utf-8") as f:
                f.write(content)
            print("Rendered HTML saved, size:", len(content))
            
            # Extract nav structure
            nav_data = await page.evaluate('''() => {
                const header = document.querySelector('header');
                const links = Array.from(document.querySelectorAll('header a, nav a')).map(a => ({
                    text: a.innerText.trim().replace(/\\n/g, ' '),
                    href: a.href,
                    classes: a.className
                })).filter(x => x.text);
                
                const buttons = Array.from(document.querySelectorAll('header button, nav button')).map(b => ({
                    text: b.innerText.trim().replace(/\\n/g, ' '),
                    classes: b.className
                }));
                
                return { links, buttons };
            }''')
            print("\nHeader Links count:", len(nav_data['links']))
            for l in nav_data['links'][:25]:
                print(f"  {l['text']} -> {l['href']}")
                
            print("\nHeader Buttons:", nav_data['buttons'])
            
            # Extract section headings
            headings = await page.evaluate('''() => {
                return Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
                    tag: h.tagName,
                    text: h.innerText.trim().replace(/\\n/g, ' ')
                })).filter(h => h.text);
            }''')
            print("\nPage Headings:")
            for h in headings[:30]:
                print(f"  [{h['tag']}] {h['text']}")
                
            await browser.close()
        except Exception as e:
            import traceback
            traceback.print_exc()

asyncio.run(main())
