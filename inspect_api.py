import re

with open('matw_main.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Look for REACT_APP or API base URLs
endpoints = set(re.findall(r'https?://[a-zA-Z0-9.\-_/:]+api[a-zA-Z0-9.\-_/:]*', text, re.I))
print("Endpoints containing 'api':", len(endpoints))
for ep in sorted(endpoints)[:30]:
    print(' ', ep)

# Look for json or data structures
urls = set(re.findall(r'https?://(?:api|backend|admin|give)[a-zA-Z0-9.\-_/:]*', text, re.I))
print("\nBackend URLs:", len(urls))
for u in sorted(urls)[:30]:
    print(' ', u)
