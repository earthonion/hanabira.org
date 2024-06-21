import json5
import json
import re
from datetime import datetime
import sys
import os

if len(sys.argv) != 4:
    print("Usage: python3 add_correct_audio_path_for_grammar_payload.py <input_file> <output_file> <lang>")
    sys.exit(1)

# Set input and output file names
input_file = sys.argv[1]
output_file = sys.argv[2]
lang = sys.argv[3]

# Define language paths
lang_paths = {
    'jp': '/audio/japanese/grammar/',
    'th': '/audio/thai/grammar/',
    'kr': '/audio/korean/grammar/',
    'vn': '/audio/vietnamese/grammar/',
    'cn': '/audio/mandarin/grammar/'
}

# Function to clean a string and replace spaces with underscores
def clean_string(s):
    # First, replace all specified characters with nothing
    cleaned = re.sub(r'[/!"?\'？~，，‘’〜。、;,\.\[\]…()（）]', '', s)
    # Then, replace spaces with underscores
    cleaned = re.sub(r'\s', '_', cleaned)
    return cleaned

# Read input file using json5
with open(input_file, 'r', encoding='utf-8') as f:
    data = json5.load(f)

# Add grammar_audio key to each example
ddate = datetime.now().strftime("%Y%m%d")
for grammar in data:
    title_cleaned = clean_string(grammar['title'])
    for example in grammar['examples']:
        jp_cleaned = clean_string(example[lang])
        # Use variable path based on language
        audio_path = lang_paths.get(lang, '/audio/grammar/')  # Default to '/audio/grammar/' if lang not found
        example['grammar_audio'] = f"{audio_path}s_{title_cleaned}_{ddate}_{jp_cleaned}.mp3"

# Create parent directory of the output file if it does not exist
os.makedirs(os.path.dirname(output_file), exist_ok=True)

# Write modified data to output file using standard json module
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)












# --- #

# import json
# import re
# from datetime import datetime
# import sys

# if len(sys.argv) != 4:
#     print("Usage: python3 add_correct_audio_path_for_grammar_payload.py <input_file> <output_file> <lang>")
#     sys.exit(1)

# # Set input and output file names
# input_file = sys.argv[1]
# output_file = sys.argv[2]
# lang = sys.argv[3]

# # Define language paths
# lang_paths = {
#     'jp': '/audio/japanese/grammar/',
#     'th': '/audio/thai/grammar/',
#     'kr': '/audio/korean/grammar/',
#     'vn': '/audio/vietnamese/grammar/',
#     'cn': '/audio/mandarin/grammar/'
# }

# # Function to clean a string and replace spaces with underscores
# def clean_string(s):
#     # First, replace all specified characters with nothing
#     cleaned = re.sub(r'[!"?\'？~，，‘’〜。、;,\.\[\]…()（）]', '', s)
#     # Then, replace spaces with underscores
#     cleaned = re.sub(r'\s', '_', cleaned)
#     return cleaned

# # Read input file
# with open(input_file, 'r', encoding='utf-8') as f:
#     data = json.load(f)

# # Add grammar_audio key to each example
# ddate = datetime.now().strftime("%Y%m%d")
# for grammar in data:
#     title_cleaned = clean_string(grammar['title'])
#     for example in grammar['examples']:
#         jp_cleaned = clean_string(example[lang])
#         # Use variable path based on language
#         audio_path = lang_paths.get(lang, '/audio/grammar/')  # Default to '/audio/grammar/' if lang not found
#         example['grammar_audio'] = f"{audio_path}s_{title_cleaned}_{ddate}_{jp_cleaned}.mp3"

# # Write modified data to output file
# with open(output_file, 'w', encoding='utf-8') as f:
#     json.dump(data, f, ensure_ascii=False, indent=2)
