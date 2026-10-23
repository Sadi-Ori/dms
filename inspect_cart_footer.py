from bs4 import BeautifulSoup

with open("cart_extracted.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")
print("=== CART DRAWER TEXT & STRUCTURE ===")
print(soup.prettify()[:1500])

with open("footer_top_extracted.html", "r", encoding="utf-8") as f:
    soup_foot = BeautifulSoup(f.read(), "html.parser")
print("\n=== FOOTER TOP TEXT & HEADINGS ===")
for col in soup_foot.find_all("div", recursive=False):
    print("Col:", col.get_text(separator=' | ', strip=True)[:300])
