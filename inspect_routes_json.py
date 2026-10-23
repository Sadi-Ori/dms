import json

with open('routes.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

items = data.get('data', [])
print("Total routes:", len(items))
for item in items[:40]:
    print(f"  {item.get('route')} ({item.get('route_type')})")
