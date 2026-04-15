import json
import re

with open('translations.js', 'r') as f:
    text = f.read()
    
# extremely basic matching, let's just extract all 'key': 'value' pairs and section headers
# Actually, since it's a js object, it's easier to just use node ... wait node isn't installed.
# We can use python's regex to find all keys in each section or evaluate it if we convert it to json

import rjsmin
# Wait, let's just make it valid JSON by replacing single quotes with double quotes
# and removing comments. No, the easiest is to just print it.
