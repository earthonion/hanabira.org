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

prompt=f"Generate grammar explanation for following Vietnamese grammar point: {keyword}"

system_message="You are helpful assistant that teaches Vietnamese grammar points to students. \
Explain the grammar points as clearly as possible. Do not complicate it. \
Generate long sentences that are interesting to students. \
Use exactly 4 example sentences. \
\
Follow below example JSON structure exactly, do not add new fields or subfields to the JSON. \
Example for grammar point Interrogative word 'bao lâu': \
\
  { \
    \"title\": \"Interrogative word 'bao lâu'\", \
    \"short_explanation\": \"Used to ask about the duration or length of time.\", \
    \"long_explanation\": \"The Vietnamese phrase 'bao lâu' is an interrogative expression used to inquire about the duration or length of time. It is equivalent to asking 'how long' in English. This phrase is often used to seek information about the duration of an action, event, or period.\", \
    \"formation\": \"example of grammar formation for given grammar point\", \
    \"examples\": [ \
      { \
        \"vn\": \"Bao lâu bạn dự định du lịch ở châu Âu? Tôi dự định sẽ du lịch ở đây khoảng một tháng.\", \
        \"en\": \"How long are you planning to travel in Europe? I'm planning to travel here for about a month.\", \
      }, \
      { \
        \"vn\": \"Bao lâu từ khi bạn bắt đầu học đến khi bạn thành thạo tiếng Pháp?\", \
        \"en\": \"How long does it take from when you start learning to when you become proficient in French?\", \
      }, \
      { \
        \"vn\": \"Bao lâu từ Hà Nội đến thành phố Hồ Chí Minh bằng tàu hỏa?\", \
        \"en\": \"How long does it take to travel from Hanoi to Ho Chi Minh City by train?\", \
      }, \
      { \
        \"vn\": \"Bao lâu từ khi bạn bắt đầu học piano đến khi bạn có thể biểu diễn một bản nhạc khó? Tôi nghĩ sẽ mất khoảng năm năm để đạt được điều đó.\", \
        \"en\": \"How long does it take from when you start learning piano to when you can perform a difficult piece? I think it will take about five years to achieve that.\", \
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

