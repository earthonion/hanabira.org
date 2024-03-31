import sys
import os
import openai

import config  # config.py file in the same directory as our app.py
import time

openai.api_key = config.OPENAI_API_KEY


keyword = sys.argv[1]
print('CLI param: ', keyword)


language = 'Japanese'
#keyword = '空港'


#Example sentences should be medium length, not very long, but also not very short. \

prompt=f"Create 5 example sentences in {language} language containing keyword {keyword}."

system_message="You are helpful assistant that teaches Japanese JLPT N3 vocabulary points to students. \
For given keyword provide example sentences with Kanji, Romaji and Translation. \
Example sentences should be medium length, sometimes even longer. \
Use exactly 5 example sentences. \
\
Follow below example structure exactly, do not add new fields or subfields. \
Example for vocabulary point 客観的: \
\
1. 客観的 | Kanji: 客観的な見方を取ることが重要だ。 | Romaji: Kyakkanteki na mikata o toru koto ga juuyou da | Translation: It is important to take an objective view. \
2. 客観的 | Kanji: 客観的な判断を下すことが大切です。 | Romaji: Kyakkanteki na handan o kudasu koto ga taisetsu desu | Translation: It is important to make an objective judgement. \
3. 客観的 | Kanji: 感情に左右されず、客観的な分析を行うことが大切です。 | Romaji: Kanjou ni sayuu sarezu, kyakkanteki na bunseki o okonau koto ga taisetsu desu | Translation: It is important to conduct an objective analysis without being influenced by emotions. \
4. 客観的 | Kanji: 客観的な立場から物事を考えることが必要です。 | Romaji: Kyakkanteki na tachiba kara monogoto o kangaeru koto ga hitsuyou desu | Translation: It is necessary to think about things from an objective standpoint. \
5. 客観的 | Kanji: 状況を客観的に捉えることが重要です。 | Romaji: Joukou o kyakkanteki ni toraeru koto ga juuyou desu | Translation: It is important to perceive the situation objectively. \
\
Write output exactly as in the example, nothing else. \
"





def call_api(prompt):
    #print(f"PROMPT: {prompt}")
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
            print('--- Response text: ---')
            print(f"{response}")
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












