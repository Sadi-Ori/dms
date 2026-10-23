import re

with open('matw_main.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Search for react router paths
routes = set(re.findall(r'path:\s*["\'](/[^"\'\s<>{}$]+)["\']', text))
print('Found routes count:', len(routes))
for r in sorted(routes):
    if len(r) < 60:
        print('  ', r)

# Search for common links
links = set(re.findall(r'to:\s*["\'](/[^"\'\s<>{}$]+)["\']', text))
print('\nFound "to" links count:', len(links))
for l in sorted(links)[:40]:
    if len(l) < 60:
        print('  ', l)

# Let's search for navigation items or menu structures
print('\nChecking for navigation keywords:')
for kw in ['Where We Work', 'Our Work', 'Emergency', 'Zakat', 'About Us', 'Get Involved', 'Appeals', 'Campaigns']:
    matches = len(re.findall(re.escape(kw), text, re.I))
    print(f'  {kw}: {matches} occurrences')
