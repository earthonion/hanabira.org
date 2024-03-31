# call script like
# python3 split_file.py input.txt 30

import sys

filename = sys.argv[1]
num_lines = int(sys.argv[2])

with open(filename, 'r') as file:
    lines = file.readlines()
    for i in range(0, len(lines), num_lines):
        with open("output_" + str(i // num_lines) + ".txt", 'w') as outfile:
            outfile.writelines(lines[i:i + num_lines])





