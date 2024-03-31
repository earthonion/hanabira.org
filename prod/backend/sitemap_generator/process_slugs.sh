#!/bin/bash

input_file="grammar_slugs.txt"
output_file="output_slugs.txt"

# Check if the input file exists
if [ ! -f "$input_file" ]; then
  echo "Input file '$input_file' not found."
  exit 1
fi

# Create or overwrite the output file
> "$output_file"

# Read each line from the input file and process it
while IFS= read -r line; do
  # Remove trailing comma, whitespace, and double quotes
  line=$(echo "$line" | sed 's/, *$//; s/"//g')

  # Convert the line to the desired format
  output_line="{ url: '/grammarpoint/${line}' },"
  echo "$output_line" >> "$output_file"
done < "$input_file"

echo "Conversion completed. Output saved to '$output_file'."
