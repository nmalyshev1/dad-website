import re

with open('translations.js', 'r', encoding='utf-8') as f:
    t = f.read()

# I will just write a python script to insert new keys into translations.js
# First, let's find out what keys are missing in index.html

import json
