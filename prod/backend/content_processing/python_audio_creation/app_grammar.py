import os
import subprocess
import json
from datetime import datetime
import time
import logging
import sys

# Set up logging
logging.basicConfig(filename="grammar_conversion.log", level=logging.INFO)

# Get the current date and time in the format yyyy-mm-dd-hh-mm-ss
now = datetime.now()
date_time = now.strftime("%Y-%m-%d-%H-%M-%S")

# get the input json file
input_file = sys.argv[1]

# check if input file exists
if not os.path.exists(input_file):
    raise Exception("Input file not found")

# Create a new directory to save the mp3 files
dir_name = f"grammar_{date_time}"
if not os.path.exists(dir_name):
    os.makedirs(dir_name)

# Input validation: Check that the input file exists
if not os.path.exists(input_file):
    logging.error("Input file not found")
    print("Input file not found")
    exit()

# Load the JSON file
try:
    with open(input_file) as json_file:
        data = json.load(json_file)
except json.decoder.JSONDecodeError as e:
    logging.error(f"Error decoding JSON file: {e}")
    print(f"Error decoding JSON file: {e}")
    exit()

# Iterate through each grammar object
examples_processed = 0
examples_failed = 0
for grammar in data:
    for example in grammar['examples']:
        try:
            # Extract the file name from the full path of grammar_audio
            file_name = os.path.basename(example["grammar_audio"])
            # Create the mp3 file using gtts-cli and save it to the new directory
            subprocess.run(
                [
                    "gtts-cli",
                    example["jp"],
                    "--lang",
                    "ja",
                    "--output",
                    f"{dir_name}/{file_name}",
                ]
            )
            examples_processed += 1

            print(
                f'Converted {example["jp"]} to mp3 and saved to {dir_name}/{file_name}'
            )
            # Add a sleep time to avoid overloading the system
            time.sleep(0.5)
        except Exception as e:
            logging.error(
                f"Error processing example: {example['jp']}, Error: {e}"
            )
            print(f"Error processing example: {example['jp']}")
            examples_failed += 1

logging.info(
    f"Examples processed: {examples_processed}, Examples failed: {examples_failed}"
)
print(
    f"Examples processed: {examples_processed}, Examples failed: {examples_failed}"
)
