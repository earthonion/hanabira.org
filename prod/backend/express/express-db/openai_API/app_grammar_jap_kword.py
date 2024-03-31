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

prompt=f"Generate grammar explanation for following grammar point {keyword}"

system_message="You are helpful assistant that teaches Japanese JLPT N5 grammar points to students. \
Explain the grammar points as clearly as possible. Do not complicate it. \
Use exactly 4 example sentences. \
\
Follow below example JSON structure exactly, do not add new fields or subfields to the JSON. \
Example for grammar point ～としたら: \
\
  { \
    \"title\": \"～としたら (〜to shitara)\", \
    \"short_explanation\": \"Express a hypothetical situation; 'if', 'suppose', 'assuming'.\", \
    \"long_explanation\": \"The ～としたら grammar point is used to express a hypothetical situation or assumption. It can be translated as 'if', 'suppose', or 'assuming' in English. The formation differs depending on whether it is used with a verb, い-adjective, な-adjective, or noun.\", \
    \"formation\": \"Verb-casual + としたら, い-Adjective + としたら,な-Adjective + だとしたら, Noun + だとしたら\", \
    \"examples\": [ \
      { \
        \"jp\": \"明日雨が降るとしたら、傘を持って行きましょう。\", \
        \"romaji\": \"Ashita ame ga furu to shitara, kasa wo motte ikimashou.\", \
        \"en\": \"If it rains tomorrow, let's bring an umbrella.\", \
      }, \
      { \
        \"jp\": \"このケーキが美味しくないとしたら、誰も食べないでしょう。\", \
        \"romaji\": \"Kono keeki ga oishikunai to shitara, daremo tabenai deshou.\", \
        \"en\": \"If this cake is not delicious, nobody will eat it.\", \
      }, \
      { \
        \"jp\": \"彼が病気だとしたら、すぐに病院に行かせてあげてください。\", \
        \"romaji\": \"Kare ga byouki da to shitara, sugu ni byouin ni ikasete agete kudasai.\", \
        \"en\": \"If he is sick, please take him to the hospital right away.\", \
      }, \
      { \
        \"jp\": \"彼女が学生だとしたら、このレストランは割引があるでしょう。\", \
        \"romaji\": \"Kanojo ga gakusei da to shitara, kono resutoran wa waribiki ga aru deshou.\", \
        \"en\": \"If she is a student, there will be a discount at this restaurant.\", \
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

