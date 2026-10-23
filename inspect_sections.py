from bs4 import BeautifulSoup
import json

with open("matw_rendered_home.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

layout = soup.find("div", {"id": "main_layout"})
children = list(layout.find_all(recursive=False))

# 1. Navbar
print("=== 1. NAVBAR ===")
nav = children[0]
with open("navbar_extracted.html", "w", encoding="utf-8") as f:
    f.write(str(nav))
print("Navbar saved to navbar_extracted.html (size:", len(str(nav)), ")")

# 2. Cart Drawer
print("\n=== 2. CART DRAWER ===")
cart = children[2]
with open("cart_extracted.html", "w", encoding="utf-8") as f:
    f.write(str(cart))
print("Cart drawer saved to cart_extracted.html (size:", len(str(cart)), ")")

# 3. Main content child 3
print("\n=== 3. MAIN CONTENT ===")
main_c = children[3]
# list direct or high-level sections in main_c
sections = main_c.find_all(["section", "div"], recursive=False)
print(f"Direct children in main content: {len(sections)}")
for i, s in enumerate(sections):
    h = s.find(["h1", "h2", "h3"])
    h_text = h.get_text(strip=True) if h else "No heading"
    print(f"  Section {i}: <{s.name}> class='{' '.join(s.get('class', []))[:50]}' -> {h_text}")

with open("main_content_extracted.html", "w", encoding="utf-8") as f:
    f.write(str(main_c))
print("Main content saved to main_content_extracted.html (size:", len(str(main_c)), ")")

# 4. Top Footer & Bottom Footer
print("\n=== 4. FOOTER ===")
with open("footer_top_extracted.html", "w", encoding="utf-8") as f:
    f.write(str(children[5]))
with open("footer_bottom_extracted.html", "w", encoding="utf-8") as f:
    f.write(str(children[6]))
print("Footers saved (sizes:", len(str(children[5])), len(str(children[6])), ")")
