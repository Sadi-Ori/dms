from bs4 import BeautifulSoup
import re

with open("matw_rendered_home.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# Let's inspect the top-level container in root
root = soup.find("div", {"id": "root"})
if root:
    children = [c for c in root.children if c.name]
    print(f"Direct children of #root: {len(children)}")
    for i, c in enumerate(children):
        print(f"Child {i}: tag={c.name}, id={c.get('id')}, class={c.get('class')}")

# Find header or first nav
print("\n--- Header details ---")
header_el = soup.find(lambda el: el.name in ['header', 'nav'] or (el.name == 'div' and ('header' in ' '.join(el.get('class', [])).lower() or 'nav' in ' '.join(el.get('class', [])).lower())))
if header_el:
    print(f"Found tag: {header_el.name}, class: {header_el.get('class')}")
    # print text of first 300 chars
    print(header_el.get_text(separator=' | ', strip=True)[:400])

# Search for the Quick Donation box / Donation widget
print("\n--- Donation Widget ---")
donate_boxes = soup.find_all(lambda el: any(kw in el.get_text() for kw in ['Single', 'Monthly']) and any(kw in el.get_text() for kw in ['Donate Now', 'Give Now', '$50', '$100', 'Give Zakat']))
print(f"Possible donation widgets: {len(donate_boxes)}")
if donate_boxes:
    # Pick the most specific one
    print("Donation widget snippet:")
    print(donate_boxes[0].get_text(separator=' | ', strip=True)[:500])

# Search for Cart
print("\n--- Cart Elements ---")
cart_els = soup.find_all(lambda el: 'cart' in ' '.join(el.get('class', [])).lower() or 'cart' in str(el.get('id', '')).lower())
print(f"Elements with 'cart' in class/id: {len(cart_els)}")
for ce in cart_els[:5]:
    print(f"  tag={ce.name}, id={ce.get('id')}, class={ce.get('class')}")

# Search for Footer
print("\n--- Footer details ---")
footer_el = soup.find(lambda el: el.name == 'footer' or (el.name == 'div' and 'footer' in ' '.join(el.get('class', [])).lower()))
if footer_el:
    print(f"Footer tag: {footer_el.name}, class: {footer_el.get('class')}")
    print(footer_el.get_text(separator=' | ', strip=True)[:500])
