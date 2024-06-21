#call like
#python add_tags_to_payload.py JLPT_N3 missing_tags.json missing_tags_updated.json


import json
import json5
import sys

if len(sys.argv) != 4:
    print("Usage: python3 add_keys_to_payload.py <jlpt_tag> <input_file> <output_file>")
    sys.exit(1)

jlpt_tag = sys.argv[1]
input_file = sys.argv[2]
output_file = sys.argv[3]

# Load the JSON data from the input file using json5
with open(input_file, "r", encoding="utf-8") as file:
    data = json5.load(file)

# Add the new keys to each dictionary in the list
for index, item in enumerate(data):
    item["p_tag"] = jlpt_tag
    item["s_tag"] = str(((index // 25) * 25) + 25)

# Save the updated JSON data to the output file using the standard json module
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print("Keys added successfully.")













# --- #


#call like
#python add_tags_to_payload.py JLPT_N3 missing_tags.json missing_tags_updated.json

# import json
# import sys

# if len(sys.argv) != 4:
#     print("Usage: python add_keys_to_payload.py <jlpt_tag> <input_file> <output_file>")
#     sys.exit(1)

# jlpt_tag = sys.argv[1]
# input_file = sys.argv[2]
# output_file = sys.argv[3]

# # Load the JSON data from the input file
# with open(input_file, "r") as file:
#     data = json.load(file)

# # Add the new keys to each dictionary in the list
# for index, item in enumerate(data):
#     item["p_tag"] = jlpt_tag
#     item["s_tag"] = str(((index // 25) * 25) + 25)

# # Save the updated JSON data to the output file
# with open(output_file, "w") as file:
#     json.dump(data, file, ensure_ascii=False, indent=4)

# print("Keys added successfully.")

