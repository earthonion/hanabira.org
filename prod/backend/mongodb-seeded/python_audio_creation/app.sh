#!/bin/bash

# Import the words from the JSON file
words=`cat words.js | grep vocabulary_japanese | cut -d ":" -f 2 | tr -d '", '`

# Loop through each word
for word in $words; do
  # Run the gtts-cli command with the current word
  /home/coil/.local/bin/gtts-cli "$word" --lang ja --output "v_$word.mp3"
done
