import glob
import re
import sys
import os
import openai
import time
import json
import config

openai.api_key = config.OPENAI_API_KEY

#if len(sys.argv) < 4:
#    print("Please provide keyword, headline, and output file as arguments.")
#    sys.exit()

keyword = sys.argv[1]
#headline = sys.argv[2]
#output_file = sys.argv[3]

print(f'keyword: {keyword}')



#Example sentences should be medium length, not very long, but also not very short. \

prompt=f"Generate grammar explanation for following Mandarin Chinese grammar point: {keyword}"

system_message="You are helpful assistant that teaches Mandarin Chinese grammar points to students. \
Explain the grammar points as clearly as possible. Do not complicate it. \
Generate very long sentences that are interesting to students. \
Generate very long Mandarin Chinese sentences. \
You are teaching students to pass Chinese Mandarin HSK test. \
Use exactly 4 example sentences. \
\
Follow below example JSON structure exactly, do not add new fields or subfields to the JSON. \
Example for grammar point: 为什么 (wèishénme) - Why \
\
  { \
    \"title\": \"为什么 (wèishénme) - Why\", \
    \"short_explanation\": \"Used to ask the reason or cause of something.\", \
    \"long_explanation\": \"The Mandarin Chinese phrase '为什么 (wèishénme)' is an interrogative expression used to inquire about the reason or cause of a particular event, action, or situation. It is equivalent to asking 'why' in English. This phrase is often used to seek clarity or understanding about the motive or reason behind an occurrence.\", \
    \"formation\": \"Subject + 为什么 + Verb/Adjective + Rest of the sentence?\", \
    \"examples\": [ \
      { \
        \"cn\": \"为什么你喜欢学习中文？因为我觉得中文很有趣。\", \
        \"pinyin\": \"Wèishénme nǐ xǐhuān xuéxí Zhōngwén? Yīnwèi wǒ juédé Zhōngwén hěn yǒuqù.\", \
        \"en\": \"Why do you like studying Chinese? Because I find Chinese very interesting.\", \
      }, \
      { \
        \"cn\": \"为什么他今天没来上班？他生病了。\", \
        \"pinyin\": \"Wèishénme tā jīntiān méi lái shàngbān? Tā shēngbìng le.\", \
        \"en\": \"Why didn't he come to work today? He's sick.\", \
      }, \
      { \
        \"cn\": \"为什么你们要早点离开派对？我们明天早上有一个重要的会议。\", \
        \"pinyin\": \"Wèishénme nǐmen yào zǎodiǎn líkāi pàiduì? Wǒmen míngtiān zǎoshang yǒu yīgè zhòngyào de huìyì.\", \
        \"en\": \"Why do you want to leave the party early? We have an important meeting tomorrow morning.\", \
      }, \
      { \
        \"cn\": \"为什么你喜欢听古典音乐？它使我感到放松。\", \
        \"pinyin\": \"Wèishénme nǐ xǐhuān tīng gǔdiǎn yīnyuè? Tā shǐ wǒ gǎndào fàngsōng.\", \
        \"en\": \"Why do you like listening to classical music? It makes me feel relaxed.\", \
      } \
    ] \
  }, \
\
Write output JSON format, write only JSON, nothing else. \
"





def call_api(prompt):
    print(f"PROMPT: {prompt}")
    retries = 0
    while retries < 5:
        try:
            completion = openai.ChatCompletion.create(
                #model="gpt-3.5-turbo",
                model="gpt-4",
                messages=[
                    {
                        "role": "system",
                        "content": system_message,
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    },
                ],
                #temperature=0.7,
            )

            response = completion["choices"][0]["message"]["content"].strip()
            print(f"RESPONSE: {response}")
            return response

        except Exception as exc:
            print(exc)
            print("GPT API error, retrying in several seconds...")
            time.sleep(10)

            retries = retries + 1
            print("retries: ", retries)
            continue

        break


call_api(prompt)


#with open(output_file, "w") as f:
#    f.write(context)
#print(f"Article saved to {output_file}")

