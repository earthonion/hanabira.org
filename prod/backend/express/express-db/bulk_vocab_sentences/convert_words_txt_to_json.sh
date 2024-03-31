#!/bin/bash

# Script to convert a text file of Japanese vocabulary to JSON format

# Usage: ./convert_words_txt_to_json.sh input_file output_file
# $1 and $2 are assigned within script


# Word type, p_tag and s_tag are hardcoded variables
WORD_TYPE=$3
P_TAG=$4
S_TAG=$5

#WORD_TYPE="Verb"
#P_TAG="JLPT_N3"
#S_TAG="100"

#example:
#./convert_words_txt_to_json.sh openai_N3_tango_verbs_aa.txt openai_N3_tango_verbs_xaa.json "Verb" "JLPT_N3" "verbs-1"


# Check that the input file exists
if [ ! -f "$1" ]; then
    echo "Error: Input file not found."
    exit 1
fi


trim() {
    # remove leading and trailing whitespaces from input string
    echo "$1" | awk '{gsub(/^[ \t\r\n]+|[ \t\r\n]+$/, ""); print}'
}



# Read each line of the input file and format as JSON
JSON=""
while read line; do
    # Remove leading and trailing whitespaces from the line
    line=$(echo "$line" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
    
    # Skip empty lines or lines that start with #
    if [[ -z "$line" || "${line:0:1}" == "#" ]]; then
        continue
    fi

    # Parse the line using | as the delimiter
    IFS='|' read -r -a fields <<< "$line"

    # Format the fields as a JSON object
    #vocabulary_japanese="${fields[0]}"
    #vocabulary_simplified="${fields[1]}"
    #vocabulary_english="${fields[2]}"

    # assign variables after trimming whitespaces
    vocabulary_japanese=$(trim "${fields[0]}")
    vocabulary_simplified=$(trim "${fields[1]}")
    vocabulary_english=$(trim "${fields[2]}")

    vocabulary_audio="/audio/vocab/v_${vocabulary_japanese}.mp3"
    p_tag="$P_TAG"
    s_tag="$S_TAG"
    
    # Add the formatted object to the JSON string
    JSON="$JSON
      {
        \"vocabulary_japanese\": \"$vocabulary_japanese\",
        \"vocabulary_simplified\": \"$vocabulary_simplified\",
        \"vocabulary_english\": \"$vocabulary_english\",
        \"word_type\": \"$WORD_TYPE\",
        \"vocabulary_audio\": \"$vocabulary_audio\",
        \"p_tag\": \"$p_tag\",
        \"s_tag\": \"$s_tag\"
      },"
done < "$1"

# Remove the trailing comma and add square brackets to make the JSON valid
JSON="[${JSON%?}
]"

# Write the JSON to the output file
echo "$JSON" > "$2"
