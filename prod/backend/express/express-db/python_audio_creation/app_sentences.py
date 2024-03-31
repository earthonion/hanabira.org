import os
import subprocess
import json
from datetime import datetime
import time
import logging
import sys

# Set up logging
logging.basicConfig(filename="sentence_conversion.log", level=logging.INFO)

# Get the current date and time in the format yyyy-mm-dd-hh-mm-ss
now = datetime.now()
date_time = now.strftime("%Y-%m-%d-%H-%M-%S")


# get the input json file
input_file = sys.argv[1]

# check if input file exists
if not os.path.exists(input_file):
    raise Exception("Input file not found")

# Create a new directory to save the mp3 files
dir_name = f"sentences_{date_time}"
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

# Iterate through each sentence object
sentences_processed = 0
sentences_failed = 0
for sentence in data:
    try:
        # Extract the file name from the full path of sentence_audio
        file_name = os.path.basename(sentence["sentence_audio"])
        # Create the mp3 file using gtts-cli and save it to the new directory
        subprocess.run(
            [
                "gtts-cli",
                sentence["sentence_japanese"],
                "--lang",
                "ja",
                "--output",
                f"{dir_name}/{file_name}",
            ]
        )
        sentences_processed += 1

        print(
            f'Converted {sentence["sentence_japanese"]} to mp3 and saved to {dir_name}/{file_name}'
        )
        # Add a sleep time to avoid overloading the system
        time.sleep(0.5)
    except Exception as e:
        logging.error(
            f"Error processing sentence: {sentence['sentence_japanese']}, Error: {e}"
        )
        print(f"Error processing sentence: {sentence['sentence_japanese']}")
        sentences_failed += 1

logging.info(
    f"Sentences processed: {sentences_processed}, Sentences failed: {sentences_failed}"
)
print(
    f"Sentences processed: {sentences_processed}, Sentences failed: {sentences_failed}"
)
