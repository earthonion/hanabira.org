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

system_message="You are helpful assistant that teaches Thai language CU-TFL grammar points to students. \
Explain the grammar points as clearly as possible. Do not complicate it. \
Generate very long sentences that are interesting to students. \
Generate very long Thai sentences. \
You are teaching students to pass Thai CU-TFL test. \
Use spaces between Thai words so it is easier for students to read. \
Use exactly 4 example sentences. \
\
Follow below example JSON structure exactly, do not add new fields or subfields to the JSON. \
Example for grammar point เสมอ (sà-mǒer) - Always: \
\
{ \
  \"title\": \"เสมอ (sà-mǒer) - Always\", \
  \"short_explanation\": \"Indicates habitual action or a general truth; 'always'.\", \
  \"long_explanation\": \"The term 'เสมอ (sà-mǒer)' is commonly used in Thai to indicate habitual actions or general truths, similar to the English 'always'. It is typically placed at the end of sentences to denote the regularity or consistency of an action or state. It is versatile and can be used with a wide range of verbs, adjectives, and phrases to express continuity or habitual occurrence.\", \
  \"formation\": \"Statement + เสมอ\", \
  \"examples\": [ \
    { \
      \"th\": \"แม้ว่า จะ มี หลาย สิ่ง เปลี่ยน แปลง ไป แต่ เธอ ยัง คง เป็น เพื่อน ที่ ดี ของ ฉัน เสมอ\", \
      \"romaji\": \"Mae wa ja mee lai sing plian plaeng pai, tae thoe yang kong pen pheuan thi di kong chan sà-mǒer\", \
      \"en\": \"Even though many things have changed, she has always been my good friend.\" \
    }, \
    { \
      \"th\": \"เขา ทำงาน อย่าง หนัก และ มุ่งมั่น เสมอ เพื่อ บรรลุ เป้าหมาย ที่ ตั้ง ไว้\", \
      \"romaji\": \"Khao tham ngan yang nak lae mung man sà-mǒer phuea banlu pao mai thi tang wai\", \
      \"en\": \"He always works hard and is determined to achieve the goals he has set.\" \
    }, \
    { \
      \"th\": \"ไม่ว่า อากาศ จะ เป็น อย่างไร เธอ สวมใส่ เสื้อผ้า สีสัน สดใส เสมอ\", \
      \"romaji\": \"Mai wa a-gat ja pen yang rai, thoe suam sai seu pha see san sot sai sà-mǒer\", \
      \"en\": \"No matter what the weather is like, she always wears brightly colored clothes.\" \
    }, \
    { \
      \"th\": \"ผม เชื่อมั่น ใน ความสามารถ ของ ตัวเอง และ พยายาม ทำ ให้ ดี ที่สุด เสมอ\", \
      \"romaji\": \"Phom cheu man nai khwam samart kong tua eng lae pha-yam tam hai dee thi sut sà-mǒer\", \
      \"en\": \"I always believe in my abilities and try to do my best.\" \
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

