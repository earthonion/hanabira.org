import json
import re
from datetime import datetime
import sys

if len(sys.argv) != 3:
    print("Usage: python3 add_correct_audio_path_for_grammar_payload.py <input_file> <output_file> <jp>")
    sys.exit(1)

#lang:
# 'jp'
# 'th'
# 'kr'
# 'vt'
# 'ch'

# Set input and output file names
input_file = sys.argv[1]
output_file = sys.argv[2]
lang = sys.argv[3]
#input_file = "grammars.json"
#output_file = "grammars_updated.json"

# Function to clean a string
def clean_string(s):
    return re.sub(r'[\s!"?？～〜。、,\.\[\]()（）]', '', s)

# Read input file
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add grammar_audio key to each example
ddate = datetime.now().strftime("%Y%m%d")
for grammar in data:
    title_cleaned = clean_string(grammar['title'])
    for example in grammar['examples']:
        jp_cleaned = clean_string(example[lang])
        example['grammar_audio'] = f"/audio/grammar/s_{title_cleaned}_{ddate}_{jp_cleaned}.mp3"

# Write modified data to output file
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
