import re

with open('translations.js', 'r') as f:
    text = f.read()

import ast
# We can extract the JS object text and parse it roughly.
def extract_keys(js_text):
    # This is a bit tricky, let's just find lines with 'key':
    matches = re.findall(r"^\s*'([^']+)'\s*:", js_text, re.MULTILINE)
    return set(matches)

en_match = re.search(r"'en':\s*{(.*?)\n\s*},\s*'ru':", text, re.DOTALL)
ru_match = re.search(r"'ru':\s*{(.*?)\n\s*},\s*'fr':", text, re.DOTALL)
fr_match = re.search(r"'fr':\s*{(.*?)\n\s*}\s*};", text, re.DOTALL)

en_keys = extract_keys(en_match.group(1)) if en_match else set()
ru_keys = extract_keys(ru_match.group(1)) if ru_match else set()
fr_keys = extract_keys(fr_match.group(1)) if fr_match else set()

print('EN count:', len(en_keys))
print('RU count:', len(ru_keys))
print('FR count:', len(fr_keys))

print('Missing in RU:', en_keys - ru_keys)
print('Missing in FR:', en_keys - fr_keys)
