import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

i18n_keys = re.findall(r'data-i18n="([^"]+)"', html)
i18n_keys = list(set(i18n_keys))

with open('translations.js', 'r', encoding='utf-8') as f:
    t = f.read()

# very rough check
for key in i18n_keys:
    parts = key.split('.')
    if len(parts) != 2:
        continue
    section, name = parts
    
    # check en
    if not re.search(r"'" + name + r"'\s*:", t):
        print("Missing in translations.js entirely:", key)
