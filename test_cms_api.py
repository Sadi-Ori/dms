import urllib.request
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*'
}

endpoints = [
    'https://cms-service.prod.matwproject.org/api/v1/routes',
    'https://cms-service.prod.matwproject.org/api/v1/products/cms/products-list',
    'https://cms-service.prod.matwproject.org/api/v1/exchange-rates'
]

for url in endpoints:
    print(f"Testing {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as res:
            data = res.read().decode('utf-8')
            print(f"Success! Status: {res.status}, Length: {len(data)}")
            # Try to parse json
            parsed = json.loads(data)
            fname = url.split('/')[-1] + '.json'
            with open(fname, 'w', encoding='utf-8') as out:
                json.dump(parsed, out, indent=2)
            print(f"Saved to {fname}")
    except Exception as e:
        print(f"Failed: {e}")
