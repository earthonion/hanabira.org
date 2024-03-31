from __future__ import unicode_literals
from fastapi import FastAPI, HTTPException
#import youtube_dl   # old
import yt_dlp as youtube_dl # new replacement  https://pypi.org/project/yt-dlp/
import re
import asyncio
import os
import sys
import whisper  # pip install openai-whisper
import subprocess
import threading
import urllib.parse
from starlette.middleware.cors import CORSMiddleware
import logging
import psutil
import subprocess
import multiprocessing

app = FastAPI(port=8000)


# How to fix following error:
# basically we need to use https, at least self signed on nginx level for now 
# Access to fetch at '' from origin '' has been blocked by CORS policy: 
# The request client is not a secure context and the resource is in more-private address space `local`.
# https://stackoverflow.com/questions/66534759/cors-error-on-request-to-localhost-dev-server-from-remote-site
# https://kb.tableau.com/articles/Issue/cors-error-the-request-client-is-not-a-secure-context-and-the-resource-is-in-more-private-address-space-occurs-in-the-browser-devtools-console-and-embedded-views-cannot-be-displayed
# https://www.appeon.com/developers/get-help/knowledgebase/failed-start-application-http-connection-edgechrome-due-cors-policy.html
# https://community.homey.app/t/at-recovery-homey-not-responding-rootcause-cors-policy-enforced-by-chrome-v94-and-higher-how-to-disable-cors/54166/7
# https://developer.okta.com/blog/2021/08/02/fix-common-problems-cors
# https://talk.observablehq.com/t/blocked-by-cors-policy-at-chrome/5654/8



# Yes, allowing all origins on the backend is not enough. You also need to 
# set the appropriate CORS headers on the frontend to allow the request to go through.

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/api/videos//download")
async def transcribe_audio(payload: dict):
    video_url = payload.get("video_url")
    if not video_url:
        raise HTTPException(status_code=400, detail="video_url is required")
    if "youtube.com" not in video_url and "youtu.be" not in video_url:
        raise HTTPException(
            status_code=400, detail="The provided URL is not a valid YouTube video URL"
        )

    async def clean_filename(filename):
        # removes all whitespaces, special characters and emojis from the youtube filename
        # keeps dots for '.mp3'
        filename = re.sub(r"[^\w\d\.]+", "", filename)
        filename = re.sub(r"\s+", "_", filename)
        return filename

    async def download_video(url: str):
        class MyLogger(object):
            def debug(self, msg):
                pass

            def warning(self, msg):
                pass

            def error(self, msg):
                print(msg)

        def my_hook(d):
            if d["status"] == "finished":
                print("Done downloading, now converting ...")

        cleaned_filename = await clean_filename(
            youtube_dl.YoutubeDL({}).prepare_filename(
                youtube_dl.YoutubeDL({}).extract_info(video_url, download=False)
            )
        )

        # make text file that contains the youtube video link
        youtube_cleaned_filename = 'youtube_' + cleaned_filename + '.txt'
        with open(youtube_cleaned_filename, 'w') as file:
            file.write(video_url)

        ydl_opts = {
            "format": "bestaudio/best",
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "192",
                }
            ],
            "logger": MyLogger(),
            "progress_hooks": [my_hook],
            "outtmpl": cleaned_filename,
        }

        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, youtube_dl.YoutubeDL(ydl_opts).download, [url])
        
    try:
        await download_video(video_url)
        return {"status": "download started"}
    except Exception as exc:
        raise HTTPException(status_code=422, detail="File not found")









@app.get("/api/videos/files/audio")
async def get_files():
    import os

    path = "./"  # directory containing .mp3 files
    files = [f for f in os.listdir(path) if f.endswith(".mp3")]
    return {"files": files}


@app.get("/api/videos/files/text")
async def get_files():
    import os

    path = "./"  # directory containing .mp3 files
    files = [f for f in os.listdir(path) if f.endswith(".txt")]
    return {"files": files}


# @app.post("/transcribe")
# def transcribe_audio(payload: dict):
#    file_name = payload.get("file_name")
#    if not file_name:
#        raise HTTPException(status_code=400, detail="file_name is required")
#
#    file_path = os.path.join('./', file_name)
#    if not os.path.exists(file_path):
#        raise HTTPException(status_code=400, detail="file not found")
#
#    print('file_name: ', file_name)
#
#    # https://github.com/openai/whisper
#    # Run some long running AI transcription process on the .mp3 file
#    # ...
#    #model = whisper.load_model("tiny")     # 1GB RAM
#    #model = whisper.load_model("base")     # 1GB RAM
#    #model = whisper.load_model("small")    # 2GB RAM
#    #model = whisper.load_model("medium")   # 5GB RAM
#    #model = whisper.load_model("large")    # 10GB RAM
#    # we need to use threading,
#    # using asyncio did not like that we are using the model
#    # and the process kept crashing
#    import threading
#    def run_transcription():
#        model = whisper.load_model("tiny")
#        result = model.transcribe(file_name)
#        print(result["text"])
#        text = result["text"]
#        print(text)
#        text_file_name = file_name.replace(".mp3", ".txt")
#        with open(text_file_name, "w") as f:
#            f.write(text)
#        print("Transcription result saved to output.txt")
#
#    thread = threading.Thread(target=run_transcription)
#    thread.start()
#
#    return {"status": "transcription started"}





# @app.post("/transcribe")
# def transcribe_audio(payload: dict):
#    file_name = payload.get("file_name")
#    if not file_name:
#        raise HTTPException(status_code=400, detail="file_name is required")
#
#    if not file_name.endswith(".mp3"):
#        raise HTTPException(status_code=400, detail="File must be of type .mp3")
#
#    logging.info(f"Starting transcription for file: {file_name}")
#
#    # 100% CPU approach
#    #thread = threading.Thread(target=transcribe_audio_as_thread, args=(file_name,))
#    #thread.start()
#
#   # low process priority approach
#    #thread = threading.Thread(target=transcribe_audio_as_thread, args=(file_name,))
#    #process = psutil.Process(thread.ident)
#    #process.nice(psutil.IDLE_PRIORITY_CLASS)
#    #thread.start()
#
#    thread = threading.Thread(target=transcribe_audio_as_thread, args=(file_name,))
#    p = psutil.Process(thread.ident)  # GPT says that thread does not have the .ident, so psutil does not help here
#    p.nice(19) # 19 is the nicest
#    p.ionice(psutil.IOPRIO_CLASS_IDLE)
#    thread.start()
#
#    logging.info(f"Transcription started for file: {file_name}")
#    return {"status": "transcription started"}


# def transcribe_audio_as_thread(file_name):
#     # needs to be standalone function, do not nest this function
#     # otherwise multiprocessing cannot pickle this
#     file_path = os.path.join("./", file_name)
#     if not os.path.exists(file_path):
#         raise HTTPException(status_code=400, detail="file not found")

#     result_file = file_name.replace(".mp3", ".txt")
#     result_file_path = os.path.join("./", result_file)

#     command = f"whisper {file_path} --model tiny > {result_file_path}"
#     process = subprocess.Popen(command, shell=True)
#     process.wait()

# @app.post("/transcribe")
# def transcribe_audio(payload: dict):
#     file_name = payload.get("file_name")
#     if not file_name:
#         raise HTTPException(status_code=400, detail="file_name is required")

#     if not file_name.endswith(".mp3"):
#         raise HTTPException(status_code=400, detail="File must be of type .mp3")

#     logging.info(f"Starting transcription for file: {file_name}")
#     process = multiprocessing.Process(
#         target=transcribe_audio_as_thread, args=(file_name,)
#     )

#     p = psutil.Process(process.pid)
#     p.nice(19)  # 19 is the nicest
#     p.ionice(psutil.IOPRIO_CLASS_IDLE)

#     process.start()
#     logging.info(f"Transcription started for file: {file_name}")
#     return {"status": "transcription started"}



def transcribe_audio_as_thread(file_name):
    # https://github.com/openai/whisper
    # Run some long running AI transcription process on the .mp3 file
    # ...
    #model = whisper.load_model("tiny")     # 1GB RAM
    #model = whisper.load_model("base")     # 1GB RAM
    #model = whisper.load_model("small")    # 2GB RAM
    #model = whisper.load_model("medium")   # 5GB RAM
    #model = whisper.load_model("large")    # 10GB RAM

    model_size = "small"

    try:
        file_path = os.path.join("./", file_name)
        if not os.path.exists(file_path):
            raise HTTPException(status_code=400, detail="file not found")

        result_file = file_name.replace(".mp3", ".txt")
        result_file_path = os.path.join("./", result_file)

        command = f"whisper {file_path} --model {model_size} > {result_file_path}"
        process = subprocess.Popen(command, shell=True)
        process.wait()
    except Exception as e:
        logging.error(f"Error while transcribing audio: {e}")
        raise HTTPException(status_code=500, detail="Error while transcribing audio")




@app.post("/api/videos/transcribe")
def transcribe_audio(payload: dict):
    #Another potential issue is that the code is starting a new multiprocessing process for each transcription request. 
    #This can be inefficient and may cause the server to become overloaded if there are many concurrent requests.
    #To address this, a better approach would be to use a task queue or job scheduler to manage the transcription requests. 
    #For example, you could use a message broker like RabbitMQ or Apache Kafka 
    #to receive incoming transcription requests and distribute them to a pool of worker processes. 
    #This would allow you to process multiple requests concurrently and avoid the overhead 
    #of starting and stopping Python processes for each request.
    try:
        file_name = payload.get("file_name")
        if not file_name:
            raise HTTPException(status_code=400, detail="file_name is required")

        if not file_name.endswith(".mp3"):
            raise HTTPException(status_code=400, detail="File must be of type .mp3")

        logging.info(f"Starting transcription for file: {file_name}")
        process = multiprocessing.Process(
            target=transcribe_audio_as_thread, args=(file_name,)
        )

        p = psutil.Process(process.pid)
        p.nice(19)  # 19 is the nicest
        p.ionice(psutil.IOPRIO_CLASS_IDLE)

        process.start()
        logging.info(f"Transcription started for file: {file_name}")
        return {"status": "transcription started"}
    except HTTPException as e:
        logging.error(f"Error while transcribing audio: {e}")
        raise
    except Exception as e:
        logging.error(f"Error while transcribing audio: {e}")
        raise HTTPException(status_code=500, detail="Error while transcribing audio")








# @app.get("/text_chunks/{file_name}")
# async def get_text_chunks(file_name: str, chunk_num: int = 0, chunk_size: int = 30):
#    file_path = os.path.join('./', file_name)
#    if not os.path.exists(file_path):
#        raise HTTPException(status_code=400, detail="file not found")
#
#    with open(file_path, 'r') as file:
#        text = file.read()
#        text_lines = text.splitlines()
#        total_chunks = len(text_lines) // chunk_size + 1
#        start_index = chunk_num * chunk_size
#        end_index = min(start_index + chunk_size, len(text_lines))
#        chunk = '\n'.join(text_lines[start_index:end_index])
#
#    return {"total_chunks": total_chunks, "chunk_num": chunk_num, "chunk": chunk}


@app.get("/api/videos/text_chunks/{file_name}")
async def get_text_chunks(file_name: str, chunk_num: int = 0, chunk_size: int = 30):
    file_name_decoded = urllib.parse.unquote(file_name)
    file_path = os.path.join("./", file_name_decoded)

    print("file_name: ", file_name)
    print("chunk_num: ", chunk_num)
    print("chunk_size: ", chunk_size)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=400, detail="file not found")
    with open(file_path, "r") as file:
        text = file.read()
        text_lines = text.splitlines()
        total_chunks = len(text_lines) // chunk_size + 1
        start_index = chunk_num * chunk_size
        end_index = min(start_index + chunk_size, len(text_lines))
        chunk = "\n".join(text_lines[start_index:end_index])

    response = {"total_chunks": total_chunks, "chunk_num": chunk_num, "chunk": chunk}
    print(response)

    return response


@app.get("/api/videos/textfiles/{filename}")
async def read_textfile(filename: str):
    # returns full contents of a file, preserves newlines
    # automatically looks for files in current dir
    try:
        with open(filename, "r") as file:
            content = file.read()
        return {"file_contents": content}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")


# @app.post("/split")
# async def split_file(payload: dict):
#     # function receives name of the file and splits it into smaller files
#     # each containing max n lines
#     # this limits chunk size so GPT can translate it properly
#     filename = payload.get("filename")
#     num_lines = 60  # split into files per 30 lines

#     try:
#         with open(filename, "r") as file:
#             lines = file.readlines()
#             for i in range(0, len(lines), num_lines):
#                 with open("output_" + str(i // num_lines) + ".txt", "w") as outfile:
#                     outfile.writelines(lines[i : i + num_lines])
#         return {"status": "Splitting job started."}
#     except Exception as e:
#         print(e)
#         raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/videos/split")
async def split_file(payload: dict):
    # function receives name of the file and splits it into smaller files
    # each containing max n lines
    # this limits chunk size so GPT can translate it properly
    filename = payload.get("filename")
    num_lines = 15  # split into files per 30 lines, optimal length for cheaper GPT models

    try:
        with open(filename, "r") as file:
            lines = file.readlines()
            for i in range(0, len(lines), num_lines):
                file_num = i // num_lines
                outfile_name = "output_{:03d}.txt".format(file_num)
                with open(outfile_name, "w") as outfile:
                    outfile.writelines(lines[i : i + num_lines])
        return {"status": "Splitting job started."}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

















# @app.post("/process_split_files")
# async def process_files(payload: dict):
#    filename = payload.get("filename")
#    #call like
#    #curl -X POST http://localhost:8000/process_files -H "Content-Type: application/json" -d '{"filename": "output.txt"}'
#
#    #We send post payload as 'output.txt' (more like 'somejapanesestring.mp3.txt')
#    #we will recognize that we want to process all related split files
#    #At this point we have multiple files output_0.txt, output_1.txt, output_2.txt, ...
#    #that we want to translate with chat GPT, each original text file will have related translation file
#    try:
#        prefix, suffix = filename.split('.')
#        for file in os.listdir():
#            if file.startswith(prefix) and file.endswith(suffix):
#                os.system(f"python3 app_openai_api.py {file} translation_{file}")
#        return {"status": "Processing job started."}
#    except Exception as e:
#        print(e)
#        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/videos/process_split_files")
async def process_files(payload: dict):
    # How to get around token limits
    # https://blog.devgenius.io/how-to-get-around-openai-gpt-3-token-limits-b11583691b32

    # call like
    # curl -X POST http://localhost:8000/process_files -H "Content-Type: application/json" -d '{"filename": "output.txt", "worktype": "translation"}'

    # We send post payload as 'output.txt' (more like 'somejapanesestring.mp3.txt')
    # we will recognize that we want to process all related split files
    # At this point we have multiple files output_0.txt, output_1.txt, output_2.txt, ...
    # that we want to translate with chat GPT, each original text file will have related translation file

    # This way, the processing of the files will happen asynchronously in the background,
    # and the API call will return immediately with the response "Processing job started."
    # without waiting for the processing to complete.
    # Ok, now I understand, so we needed to define additional asynchronous functions.
    # Yes, that's correct. To make sure that the API returns the response immediately,
    # you need to run the processing of the files in an asynchronous manner.
    # The added process_file function allows for that.



    async def process_file(file, worktype):
        os.system(f"python3 app_openai_api.py {worktype} {file} {worktype}_{file}")

    async def join_files(prefix, suffix, worktype):
        await asyncio.gather(*tasks)
        with open(f"{worktype}_{prefix}.{suffix}", "w") as outfile:
            # we need to join the files in sequence
            for file in sorted(os.listdir()):
                if file.startswith(f"{worktype}_{prefix}"):
                    with open(file, "r") as infile:
                        outfile.write(infile.read())

    filename = payload.get("filename")
    worktype = payload.get("worktype") # translation, summary, vocabulary, grammar


    try:
        prefix, suffix = filename.split(".")
        tasks = []
        for file in sorted(os.listdir()):
            if file.startswith(prefix) and file.endswith(suffix):
                print(f"Processing file: {file}")
                task = asyncio.create_task(process_file(file, worktype))
                tasks.append(task)
                asyncio.create_task(join_files(prefix, suffix, worktype))
        return {"status": "Processing job started."}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))
