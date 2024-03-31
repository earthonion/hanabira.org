# How to generate random sentences containing specific keyword in any language with python

For certain applications it might be useful to generate random sentences containing specific word. One of such cases can be generation of some examples for language learning website.

Generating such sentences manually is time consuming task, hence for this purpose we can leverage generative AI.

Will be using OpenAI API. We can communicate with the API in plain English.

Register for your openai API key at https://beta.openai.com/account/api-keys. For more info about the API see https://beta.openai.com/docs/quickstart/build-your-application.


First, create python virtual environment and install the `openai` package using pip:

```bash
~/Desktop/openai_API$ python3 -m venv .env
~/Desktop/openai_API$ source .env/bin/activate
~/Desktop/openai_API$ pip install openai
```

Create a `config.py` file with the openai private API key and add following contents into it:
`OPENAI_API_KEY = "YOUR_API_KEY_HERE"`

Next, import the `openai` module and set your API key in the main script:

```python
import openai

openai.api_key = config.OPENAI_API_KEY
```

Now you can call the OpenAI GPT API using the `openai.Completion.create()` method. 

Our main Python script `app_sentences_jap_kword.py` that is calling the OpenAI API
```python
import sys
import os
import openai

import config  # config.py file in the same directory as our app.py

openai.api_key = config.OPENAI_API_KEY

model = "text-davinci-003"
max_tokens = 850


keyword = sys.argv[1]
print('CLI param: ', keyword)


language = 'Japanese'
#keyword = '空港'

prompt = f"Create 5 example sentences in {language} language containing keyword {keyword}. \
For each sentence show transcription to romaji and translation to English. \
Example sentences should be medium length, sometimes even longer. \
Output format should be: \
japanese keyword | \
Kanji: japanese sentence | \
Romaji: romaji transcription | \
Translation: english translation | \
"


response = openai.Completion.create(
    engine=model, 
    prompt=prompt, 
    max_tokens=max_tokens, 
    n=1, 
    stop=None, 
    temperature=0.4,
    top_p=1.0,
    frequency_penalty=0.3,
    presence_penalty=0.0,
)



#print('--- Response payload: ---')
#print(response)
#print()

#print('--- Prompt: ---')
#print(prompt)
#print()

# parse the response payload dictionary and printout the output
print('--- Response text: ---')
print(response["choices"][0]["text"].strip())

```

Detailed article about possible model parameters:
https://towardsdatascience.com/gpt-3-parameters-and-prompt-design-1a595dc5b405.


Shell `wrapper.sh` scipt takes the keywords from the file and spawns new python subprocess for each API call.
Wrapper makes sure we are not overwriting our previously captured data, since in general, 
each API call costs money (above free tier).
```bash
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
    python3 "${current_dir}/app_sentences_jap_kword.py" "${first_word}" | sed '/^$/d' | tee -a "${current_dir}/${outfile}"
    echo "-----------------------------" | tee -a "${current_dir}/${outfile}"
    # sleep so we do not overload the API
    sleep 5

done < "${current_dir}/${file}"

exit 0
```



Run the app with our shell wrapper as follows.

```bash
(.env) coil@coil-VM:~/Desktop/openai_API$ ./wrapper.sh openai_N3_tango_p172-191_verbs_1.txt output_openai_N3_tango_p172-191_verbs_1.txt
CLI param:  助ける
--- Response text: ---
1. 助ける | Kanji: 彼は彼女を助ける | Romaji: Kare wa kanojo o tasukeru | Translation: He will help her. |
2. 助ける | Kanji: 私たちは彼らを助けることができます | Romaji: Watashitachi wa karera o tasukeru koto ga dekimasu | Translation: We can help them. |
3. 助ける | Kanji: 私たちは子供たちを助ける必要があります | Romaji: Watashitachi wa kodomotachi o tasukeru hitsuyou ga arimasu | Translation: We need to help the children. |
4. 助ける | Kanji: 私は犬を助けることができました | Romaji: Watashi wa inu o tasukeru koto ga dekimashita | Translation: I was able to help the dog. |
5. 助ける | Kanji: 彼らは私たちを助けてくれました | Romaji: Karera wa watashitachi o tasukete kuremashita | Translation: They helped us.
-----------------------------
CLI param:  訪ねる
--- Response text: ---
1. 訪ねる | Kanji: 彼女を訪ねることにした | Romaji: Kanojo o tazuneru koto ni shita | Translation: I decided to visit her | 
2. 訪ねる | Kanji: 私は彼に訪ねてきた | Romaji: Watashi wa kare ni tazunete kita | Translation: I went to visit him | 
3. 訪ねる | Kanji: 彼らは日本を訪ねた | Romaji: Karera wa Nihon o tazuneta | Translation: They visited Japan | 
4. 訪ねる | Kanji: 私は友達の家を訪ねた | Romaji: Watashi wa tomodachi no ie o tazuneta| Translation: I visited my friend's house| 
5. 訪ねる | Kanji: 私は彼女の家を訪ねてきた| Romaji: Watashi wa kanojo no ie o tazunete kita| Translation: I went to visit her house|
-----------------------------
```

You can monitor your API usage via https://beta.openai.com/account/usage.

### Source
- https://chat.openai.com/chat
- https://medium.com/nerd-for-tech/create-ai-application-in-minutes-with-openai-api-5e84bd3ec5d0
- https://medium.com/geekculture/hey-chatgpt-solve-these-coding-tasks-using-python-b2e7482f2c18
- https://towardsdatascience.com/gpt-3-parameters-and-prompt-design-1a595dc5b405
- https://beta.openai.com/examples
