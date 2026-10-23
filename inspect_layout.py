from bs4 import BeautifulSoup

with open("matw_rendered_home.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

layout = soup.find("div", {"id": "main_layout"})
if layout:
    print(f"Children of #main_layout: {len(layout.find_all(recursive=False))}")
    for i, child in enumerate(layout.find_all(recursive=False)):
        c_class = " ".join(child.get("class", []))
        c_id = child.get("id", "")
        text_preview = child.get_text(separator=' | ', strip=True)[:150]
        print(f"Child {i}: <{child.name}> id='{c_id}' class='{c_class}'")
        print(f"    Text: {text_preview}\n")
