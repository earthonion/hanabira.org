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

system_message="You are helpful assistant that teaches Korean language TOPIK grammar points to students. \
Explain the grammar points as clearly as possible. Do not complicate it. \
Generate very long sentences that are interesting to students. \
Generate very long Korean sentences. \
Generate really long Korean sentences. \
You are teaching students to pass Korean TOPIK test. \
Use spaces between Thai words so it is easier for students to read. \
Use exactly 4 example sentences. \
\
Follow below example JSON structure exactly, do not add new fields or subfields to the JSON. \
Example for grammar point 밖에 [bakke] (Only, except): \
\
{ \
  \"title\": \"밖에 [bakke] (Only, except)\", \
  \"short_explanation\": \"Used to express exclusivity or limitation; 'only', 'except'.\", \
  \"long_explanation\": \"'밖에 [bakke]' is a postposition used in Korean to indicate that there is nothing else besides the mentioned subject or object, often paired with negative verbs. It conveys a sense of limitation or exclusivity, akin to 'only' or 'except' in English. It is used to emphasize the scarcity or the sole option of something and is often used in sentences to express a limited number, quantity, or possibility.\", \
  \"formation\": \"Noun + 밖에 + Negative verb\", \
  \"examples\": [ \
    { \
      \"kr\": \"저는 이 책밖에 안 읽었어요, 다른 책은 시간이 없어서 읽을 수 없었어요.\", \
      \"romaji\": \"Jeoneun i chaekbakke an ilgeosseoyo, dareun chaegeun sigani eopseoseo ilgeul su eopseosseoyo.\", \
      \"en\": \"I only read this book, as I had no time to read any other books.\" \
    }, \
    { \
      \"kr\": \"여행 갈 때 친구들이 바빠서 저밖에 갈 수 있는 사람이 없었어요.\", \
      \"romaji\": \"Yeohaeng gal ttae chingudeuri bappaseo jeobakke gal su issneun sarami eopseosseoyo.\", \
      \"en\": \"When I went on a trip, I was the only one who could go because my friends were busy.\" \
    }, \
    { \
      \"kr\": \"그는 자기가 좋아하는 음식밖에 먹지 않아서 식당 선택이 항상 제한적이에요.\", \
      \"romaji\": \"Geuneun jagiga joahaneun eumsikbakke meokji anhaseo sikdang seontaegi hangsang jehanjeogieyo.\", \
      \"en\": \"He only eats the food he likes, so choosing a restaurant is always limited.\" \
    }, \
    { \
      \"kr\": \"이번 프로젝트에서 성공한 사람은 저 혼자밖에 없어요, 다른 모든 사람들은 포기했어요.\", \
      \"romaji\": \"Ibeon peurojekteueseo seonggonghan sarameun jeo honjabakke eopseoyo, dareun modeun saramdeureun pogihayeo.\", \
      \"en\": \"I am the only one who succeeded in this project; everyone else gave up.\" \
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

