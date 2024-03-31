#!/bin/bash

# we expect the files to be in the same directory as the wrapper script
# to maintain consistency
# call like:
# ./openai_API/wrapper.sh openai_vocab.txt output1.txt

# input file with vocabulary should have following format
# we take only the first word on each line to pass to subprocess
#愛する|あいする|to love| | | |
#飽きる|あきる|to lose interest| | | |

set -eu

# Check if a file was provided as an argument
if [[ $# -lt 2 ]]
then
    echo "Error: No file provided"
    exit 1
fi

# Get the current directory
current_dir=$(dirname $(readlink -f "$0"))


# Assign the file to a variable
file=$1
outfile=$2


# Check if the file already exists
if [ -e "$current_dir/$outfile" ]
then
    # Print an error message and exit
    echo "Error: File '$outfile' already exists in '$current_dir'"
    exit 1
else
    # Create the file
    touch "$current_dir/$outfile"
fi




# Iterate through each line in the file
while read -r line
do
    # Extract the first word from the line
    first_word=$(echo "${line}" | awk -F'|' '{print $1}')

    # Print the first word
    #echo "${first_word}"

    #call python script with the word as argument and filter empty lines, appends to a file
    python3 "${current_dir}/app_grammar_jap_kword.py" "${first_word}" | sed '/^$/d' | tee -a "${current_dir}/${outfile}"
    echo "-----------------------------" | tee -a "${current_dir}/${outfile}"
    # sleep so we do not overload the API
    sleep 2

done < "${current_dir}/${file}"

exit 0
