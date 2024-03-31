#!/bin/bash

# Set input and output file names
input_file=$1
output_file=$2

#input_file="output_openai_N3_tango_p172-191_verbs_1.txt"
#output_file="output_openai_N3_tango_p172-191_verbs_1.json"


ddate=$(date "+%Y%m%d")

# Initialize empty array to store sentences
sentences=()

# Read input file line by line
while IFS= read -r line; do
  # Check if line starts with "CLI param:"
  if [[ $line == "CLI param:"* ]]; then
    # Extract key from line
    key=$(echo $line | cut -d' ' -f3)
  # Check if line starts with a digit
  elif [[ $line == [0-9]* ]]; then
    # Extract sentence, kanji, romaji, and translation from line
    sentence=$(echo $line | cut -d'|' -f2 | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | sed 's/Kanji: //g')
    sentence_cleaned=$(echo $line | cut -d'|' -f2 | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | sed 's/Kanji: //g' | sed 's/ //g' | sed 's/!//g' | sed 's/?//g'| sed 's/？//g'| sed 's/。//g' | sed 's/、//g' )
    kanji=$(echo $line | cut -d'|' -f1 | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    romaji=$(echo $line | cut -d'|' -f3 | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | sed 's/Romaji: //g')
    translation=$(echo $line | cut -d'|' -f4 | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | sed 's/Translation: //g')
    audio_path="/audio/sentences/s_${key}_${ddate}_${sentence_cleaned}.mp3"
    # Add new sentence object to array
    sentences+=("{\"sentence_japanese\": \"$sentence\", \"sentence_kanji\": \"$kanji\", \"sentence_romaji\": \"$romaji\", \"sentence_simplified\": \"\", \"sentence_english\": \"$translation\", \"sentence_audio\": \"$audio_path\", \"sentence_picture\": \"\", \"key\": \"$key\"}")
  fi
done < "$input_file"

# Write sentences array to output file
echo "[" > "$output_file"
echo "${sentences[0]}" >> "$output_file"
for ((i=1;i<${#sentences[@]};i++)); do
  echo ",${sentences[i]}" >> "$output_file"
done
echo "]" >> "$output_file"
