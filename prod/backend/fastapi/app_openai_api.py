import sys
import os
import openai

import config  # config.py file in the same directory as our app.py
import time

openai.api_key = config.OPENAI_API_KEY


#model = "text-ada-001"     #max 2048 tokens, Ada     $0.0004  / 1K tokens, ultra cheap
#model = "text-babbage-001" #max 2048 tokens, Babbage $0.0005  / 1K tokens, ultra cheap
#model = "text-curie-001"   #max 2048 tokens, Curie   $0.0020  / 1K tokens, rather capable and 10x cheaper than DaVinci
model = "text-davinci-003" #max 4000 tokens, DaVinci $0.0200  / 1K tokens


max_tokens = 2000   # this is the length of the response ada, has total 2048, davinci 4000
#so request lenght + max_tokens should be at most 4000 for davinci

worktype = sys.argv[1] # translation, summary, vocabulary, grammar
infile = sys.argv[2]
outfile = sys.argv[3]
print('infile:  ', infile)
print('outfile: ', outfile)

with open(infile, "r") as file:
    content = file.read()


question = ''

if worktype == "translation":
    question = f"Translate following Japanese text into English. \
For each sentence write \
Japanese original, Romaji transcription, English translation. \
Translate line by line, not by paragraph. \
\
Example output format for each sentence: \
Repeat original Japanese sentence in Japanese with kanji, hiragana, katakana. \
Romaji transcription. \
English translation. \
Empty line as divider. \
\
Strictly follow example output formatting: \
あんまり勉強してなくては？ \
Anmari benkyou shite naku te wa? \
You havent studied much, have you? \
\
今日もiPadでクリエイトしてますか? \
Kyou mo iPad de kurieito shite masu ka? \
Are you creating with the iPad today? \
\
今日も動画を見てくれてありがとうございます \
Kyou mo douga o mite kurete arigatou gozaimasu \
Thank you for watching the video today. \
\
Do not use any other output formating than the one stated above.\
Repeated Japanese sentence needs to use Kanji, Hiragana, Katakana, it must. There is no other way.\
Do not use Romaji for repeated japanese sentence. Do not use Romaji. Do not use Romaji for repeated sentence. \
Use kanji, use kanji, use kanji, use kanji, use kanji, use kanji. \
\
Japanese text to be translated with proper formatting: \
"
elif worktype == "summary": 
    question = f"Summarize following Japanese text into English. \
"
elif worktype == "vocabulary":
    question = f"In following Japanese text, find vocabulary that is more difficult than JLPT N4 level. \
Translate show the japanese vocabulary, show Romaji transcription and translate to English. \
"
elif worktype == "grammar":
    question = f"In following Japanese text, find grammar points that are more difficult than JLPT N4 level. \
Explain those grammar points. \
"


prompt = question + content


while True:
    try:
        response = openai.Completion.create(
            engine=model, 
            prompt=prompt, 
            max_tokens=max_tokens, 
            n=1, 
            stop=None, 
            temperature=0.05,
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
        #res = response["choices"][0]["text"].strip()  # strips newlines
        res = response["choices"][0]["text"]
        print(res)

        with open(outfile, 'w') as file:
            file.write(res)


    except Exception as exc:
        time.sleep(20)
        print(exc)
        print('GPT API error, retrying ...')
        continue
    break


