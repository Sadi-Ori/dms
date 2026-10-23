import re

with open('matw_home.html', 'r', encoding='utf-8') as f:
    text = f.read()

print('Title:', re.findall(r'<title>(.*?)</title>', text, re.I))
scripts = re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', text)
print('External Scripts:', scripts[:10])
links = re.findall(r'<link[^>]*href=["\']([^"\']+)["\']', text)
print('Links (css/icons):', [l for l in links if '.css' in l or 'icon' in l][:10])
print('Root div or app element:', re.findall(r'<div id=["\']([^"\']+)["\']', text))
print('Total characters:', len(text))
# Let's see some text content
print('Body excerpt:')
body_match = re.search(r'<body[^>]*>(.*?)</body>', text, re.DOTALL | re.I)
if body_match:
    body = body_match.group(1)
    print(body[:2000])
else:
    print('No body tag matched')
