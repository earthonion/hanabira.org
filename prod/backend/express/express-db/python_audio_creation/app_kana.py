import os
import subprocess
import json
from datetime import datetime
import time
import logging
import sys

# Set up logging
logging.basicConfig(filename="kana_conversion.log", level=logging.INFO)

# Get the current date and time in the format yyyy-mm-dd-hh-mm-ss
now = datetime.now()
date_time = now.strftime("%Y-%m-%d-%H-%M-%S")

# Define the input file
input_file = "kana.json"

# Create a new directory to save the mp3 files
dir_name = f"kana_audio_{date_time}"
if not os.path.exists(dir_name):
    os.makedirs(dir_name)

# Load the JSON file
try:
    with open(input_file) as json_file:
        kana_chars = json.load(json_file)
except FileNotFoundError:
    logging.error(f"Input file {input_file} not found")
    print(f"Input file {input_file} not found")
    exit()
except json.decoder.JSONDecodeError as e:
    logging.error(f"Error decoding JSON file: {e}")
    print(f"Error decoding JSON file: {e}")
    exit()

# Iterate through each character object
chars_processed = 0
chars_failed = 0
for char_obj in kana_chars:
    try:
        # Generate the mp3 file name based on the character
        mp3_file_name = f"v_{char_obj['char']}.mp3"
        # Create the mp3 file using gtts-cli and save it to the new directory
        subprocess.run(
            [
                "gtts-cli",
                char_obj["char"],
                "--lang",
                "ja",
                "--output",
                f"{dir_name}/{mp3_file_name}",
            ]
        )
        chars_processed += 1

        print(
            f'Converted {char_obj["char"]} to mp3 and saved to {dir_name}/{mp3_file_name}'
        )
        # Add a sleep time to avoid overloading the system
        time.sleep(0.5)
    except Exception as e:
        logging.error(f"Error processing character: {char_obj['char']}, Error: {e}")
        print(f"Error processing character: {char_obj['char']}")
        chars_failed += 1

logging.info(f"Characters processed: {chars_processed}, Characters failed: {chars_failed}")
print(f"Characters processed: {chars_processed}, Characters failed: {chars_failed}")

