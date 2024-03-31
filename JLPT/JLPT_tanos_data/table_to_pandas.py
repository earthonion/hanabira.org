import pandas as pd
import docx


level = 'N5'



# Function to read a table from a Word document
def read_table(doc_path, table_index=0):
    # Load the Word document
    doc = docx.Document(doc_path)

    # Extract the specified table
    table = doc.tables[table_index]

    # Create a list to hold rows of the table
    data = []

    # Iterate over each row in the table
    for row in table.rows:
        row_data = [cell.text for cell in row.cells]
        data.append(row_data)

    return data

# Path to your .doc file
doc_path = f'VocabList_{level}.docx'

# Read the table (assuming the table you want is the first one in the document)
table_data = read_table(doc_path)

# Create a DataFrame
df = pd.DataFrame(table_data)

# If your table has headers, you might want to do:
# df = pd.DataFrame(table_data[1:], columns=table_data[0])

print('Loaded dataframe to memory ...')

# Update DataFrame if the first column is empty
# for words that have no kanji, then we just duplicate reading to first column for consistency
for index, row in df.iterrows():
    if pd.isna(row[0]) or row[0].strip() == '':
        df.at[index, 0] = row[1]




print(df)



print('Exporting dataframe to csv ...')
# Save the DataFrame to a new CSV file
csv_file_path = f'JLPT_{level}_tanos_vocab_list.csv'
df.to_csv(csv_file_path, sep='|', index=False)

print()
print(f"DataFrame saved to {csv_file_path}")
