from bs4 import BeautifulSoup
import json

with open("matw_rendered_home.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

print("--- ANALYZING MATW RENDERED HOME ---")

# 1. Header / Navbar
header = soup.find("header")
if header:
    print(f"\nHeader found! Classes: {header.get('class', [])}")
    # find top bar vs main nav
    navs = header.find_all("nav")
    print(f"Number of nav elements in header: {len(navs)}")
    for i, n in enumerate(navs):
        print(f"Nav {i} text: {n.get_text(strip=True)[:200]}")
    # find buttons
    btns = header.find_all("button")
    for b in btns:
        print(f"Header button: '{b.get_text(strip=True)}' classes: {b.get('class', [])}")

# 2. Main sections
main = soup.find("main") or soup.find("div", {"id": "root"})
sections = soup.find_all(["section", "article"])
print(f"\nTotal section/article tags: {len(sections)}")
for i, s in enumerate(sections):
    id_val = s.get("id", "")
    cls_val = " ".join(s.get("class", []))
    h2 = s.find(["h1", "h2", "h3"])
    h_text = h2.get_text(strip=True) if h2 else "No heading"
    print(f"Section {i} [id='{id_val}'] [class='{cls_val[:50]}']: {h_text}")

# 3. Footer
footer = soup.find("footer")
if footer:
    print(f"\nFooter found! Classes: {footer.get('class', [])}")
    footer_links = footer.find_all("a")
    print(f"Footer links count: {len(footer_links)}")
    for fl in footer_links[:20]:
        print(f"  {fl.get_text(strip=True)} -> {fl.get('href')}")

# 4. Color inspection from inline styles / classes
print("\nTailwind colors or custom classes in header:")
if header:
    classes = " ".join(header.get("class", []))
    for el in header.find_all(True):
        classes += " " + " ".join(el.get("class", []))
    color_classes = [c for c in set(classes.split()) if any(x in c for x in ['bg-', 'text-', 'border-', '#'])]
    print("Header color classes:", sorted(color_classes)[:30])
