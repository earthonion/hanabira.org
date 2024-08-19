'use client';

//call like:
//https://localhost/text-parser?type=youtube&url=https://www.youtube.com/watch?v=-cbuS40rNSw
//https://localhost/text-parser?type=custom_text



import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import axios from "axios";
import ReactMarkdown from "react-markdown";

import DictionaryEntryWrapper from "@/components-parser/DictionaryEntryWrapper"; // needs rework, api data inconsistency
import KanjiDisplay from "@/components-parser/KanjiDisplay";
import CreateReadingFlashcard from "@/components-parser/CreateReadingFlashcard";
import RadicalInfo from "@/components-parser/RadicalInfo";
import UnifiedGptComponent from "@/components-parser/UnifiedGptComponent";
import KuroShiroPropsConverter from "@/components-parser/KuroShiroPropsConverter";
import WordDetailsSidebar from "@/components-parser/WordDetailsSidebar";
import DisplayHoveredWord from "@/components-parser/DisplayHoveredWord";
import DisplaySentence from "@/components-parser/DisplaySentence";
import DisplaySentenceV2 from "@/components-parser/DisplaySentenceV2";
import DisplayWord from "@/components-parser/DisplayWord";
import JapaneseTextParser from "@/components-parser/JapaneseTextParser";
import GrammarExplanation from "@/components-parser/GrammarExplanation";


import YouTubeComponent from '@/components-parser/YouTubeComponent';
import FuriganaConverter from '@/components-parser/FuriganaConverter';
import FuriganaConverterV2 from '@/components-parser/FuriganaConverterV2';
import Tabs from "@/components-parser/Tabs";
import Tab from "@/components-parser/Tab";

interface Word {
  original: string;
  dictionary: string;
  furigana: string;
  status: string;
}

interface WordDetails {
  original: string;
  dictionary: string;
  furigana: string;
  status: string;
}

interface WordDetailsSidebarProps {
  clickedWordDetails: WordDetails | null;
  username: string;
  url0: string;
  url1: string;
}



export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeComponent />
    </Suspense>
  );
}






function HomeComponent() {
  const [clickedWord, setClickedWord] = useState<string | null>(null);
  const [clickedWordDictForm, setClickedWordDictForm] = useState<string | null>(
    null
  );
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const [hoveredSentence, setHoveredSentence] = useState<Word[] | null>(null);
  const [clickedWordSentence, setClickedWordSentence] = useState<Word[] | null>(
    null
  );

  const [clickedWordDetails, setClickedWordDetails] =
    useState<WordDetails | null>(null);

  //const [inputMode, setInputMode] = useState(`book`);
  const [inputMode, setInputMode] = useState(`lyrics`);

  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const url = searchParams.get('url');
  console.log(`type: ${type}`)
  console.log(`url:  ${url}`)

  // text for parser testing:
  // https://www.dreamslandlyrics.com/2020/04/yorushika-hana-ni-bourei-lyrics.html

  useEffect(() => {
    if (type === 'youtube' && url) {
      setinputUrl(url as string);
    }
  }, [type, url]);


  const [inputText, setInputText] = useState(
    `
    Example Japanese text (Iroha poem):
    
    いろは歌

    色は匂えど
    散りぬるを
    我が世誰ぞ
    常ならん
    有為の奥山
    今日越えて
    浅き夢見じ
    酔いもせず
  `
  );









  const [parsedData, setParsedData] = useState<string | null>(null); // State to store parsed data
  const [enhancedData, setEnhancedData] = useState<any | null>(null); // State to store enhanced data

  const [username] = useState("testUser"); // Define username

  // JS Backend (parsing, translations, dictionaries, mecab, kuroshiro, ...)
  // localhost port 5200, redirections by nginx for /d-api/v1/
  const extractKanjiUrl = "/d-api/v1/extract-kanji";
  const kanjiUrl = "/d-api/v1/kanji";
  const mecabApiUrl = "/d-api/v1/parse-split";
  const convertAllUrl = "/d-api/v1/convert/all";
  const deeplUrl = "/d-api/v1/deepl-translate"; // url0 - deeplUrl
  const simpleVocabUrl = "/d-api/v1/simple-vocabulary"; // url1
  const convertHiraganaUrl = "/d-api/v1/convert/hiragana"; // url2
  const furiganaUrl = "/d-api/v1/convert/all";
  const radicalUrl = '/d-api/v1/radical-info';

  // we have this on separate prototype GPT js backend
  const gptGrammarUrl = "/d-api/v1/grammar";
  const gptTranslateUrl = "/d-api/v1/translate";
  const gptTranslateSbSUrl = "/d-api/v1/translate-side-by-side";
  const gptSummaryUrl = "/d-api/v1/summary";
  const gptSentimentUrl = "/d-api/v1/sentiment";

  // Python Backend (user specific) - dynamic backend
  const userVocabApiUrl = "/f-api/v1/enhance-vocabulary";
  const userVocabUrl = "/f-api/v1/user-vocabulary";
  const storeVocabUrl = "/f-api/v1/store-vocabulary-data"; // url3


  // --- functions --- //

  const handleModeChange = (event: any) => {
    setInputMode(event.target.value);
  };

  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // just sets inputText globally, so we can pass it to parser component
    e.preventDefault();
    console.log(inputText); // Example of handling the input text
  };


  // --- form and youtube player logic --- //

  const [inputUrl, setinputUrl] = useState<string | null>(null);
  const [currentJapaneseSubtitle, setCurrentJapaneseSubtitle] = useState<string>("");
  const [currentEnglishSubtitle, setCurrentEnglishSubtitle] = useState<string>("");
  const [currentCustomSubtitle, setCurrentCustomSubtitle] = useState<string>("");

  const handleInputChangeYT = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputUrl(e.target.value);
  };

  const handleSubmitYT = (e: React.FormEvent) => {
    e.preventDefault();
    // handle the submit
  };

  const handleSubtitleUpdate = (japaneseSubtitle: string, englishSubtitle: string, customSubtitle: string) => {
    setCurrentJapaneseSubtitle(japaneseSubtitle);
    setCurrentEnglishSubtitle(englishSubtitle);
    setCurrentCustomSubtitle(customSubtitle);
  };



  // --- global japanese subtitles dependant on youtube url


  const [japaneseSubtitles, setJapaneseSubtitles] = useState([]);
  const [japaneseSubtitlesPlainText, setJapaneseSubtitlesPlainText] = useState('');
  const [englishSubtitles, setEnglishSubtitles] = useState([]);
  const [englishSubtitlesPlainText, setEnglishSubtitlesPlainText] = useState('');

  useEffect(() => {
    if (inputUrl) {
      fetchSubtitles(inputUrl, "ja", setJapaneseSubtitles, setJapaneseSubtitlesPlainText);
      fetchSubtitles(inputUrl, "en", setEnglishSubtitles, setEnglishSubtitlesPlainText);
    }
  }, [inputUrl]);

  const fetchSubtitles = async (url, lang, setSubtitles, setSubtitlesPlainText) => {
    try {
      const response = await axios.get(`/d-api/v1/get-transcript?url=${url}&lang=${lang}`);
      setSubtitles(formatSubtitles(response.data.transcript));
      setSubtitlesPlainText(formatSubtitles(response.data.transcript).map((sub) => `${sub.text}`).join("\n"));

    } catch (error) {
      console.error(`Failed to fetch ${lang} subtitles:`, error);
    }
  };

  const formatSubtitles = (subtitles) => {
    return subtitles.map((sub) => ({
      time: new Date(sub.offset * 1000).toISOString().substr(11, 8),
      text: sub.text,
    }));
  };


  useEffect(() => {
    if (japaneseSubtitlesPlainText) {
      setInputText(japaneseSubtitlesPlainText);
    }
  }, [japaneseSubtitlesPlainText]);









  // ---

  const [leftWidth, setLeftWidth] = useState<string>("66.6667%"); // Initial width 2/3
  const [leftHeight, setLeftHeight] = useState<string>("50%"); // Initial height for mobile
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [isHorizontal, setIsHorizontal] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsHorizontal(window.innerWidth >= 768); // Switch to vertical on mobile screens
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (leftPaneRef.current && rightPaneRef.current && dividerRef.current) {
        if (isHorizontal) {
          const containerOffsetLeft =
            leftPaneRef.current.parentElement!.getBoundingClientRect().left;
          const newLeftWidth =
            ((e.clientX - containerOffsetLeft) / window.innerWidth) * 100;
          if (newLeftWidth > 20 && newLeftWidth < 80) {
            // Optional: set min/max width
            setLeftWidth(`${newLeftWidth}%`);
          }
        } else {
          const containerOffsetTop =
            leftPaneRef.current.parentElement!.getBoundingClientRect().top;
          const newLeftHeight =
            ((e.clientY - containerOffsetTop) / window.innerHeight) * 100;
          if (newLeftHeight > 20 && newLeftHeight < 80) {
            // Optional: set min/max height
            setLeftHeight(`${newLeftHeight}%`);
          }
        }
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = () => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const divider = dividerRef.current; // Store the reference in a variable

    if (divider) {
      divider.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (divider) {
        divider.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, [isHorizontal]);

  // ---

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="h-full w-full">



      <Head>
        <title>Responsive Split Layout with TailwindCSS</title>
      </Head>

      {/* <div
        className={`flex ${isHorizontal ? "h-full flex-col md:flex-row" : "h-full w-full flex-col"
          } h-screen`}
      > */}

      {/* Looks like this one gives us full height while allowing for reasonable mobile experience 
          LOL, but then we are not scrolling through the text, so we would need to paginate long texts
          because we scroll away from the vocabulary widget on the right
          so it is always tradeoff
          maybe we could make the widget follow wieport on the right, so it will always be accessible
          alternatively pagination of the text*/}
      <div
        className={`flex ${isHorizontal ? "h-full flex-col md:flex-row" : "h-full w-full flex-col"
          } min-h-screen`}
      >


        {/* <div
         className={`flex ${isHorizontal ? "flex-col md:flex-row" : "flex-col"} min-h-screen w-screen`}
      > */}




        <div
          ref={leftPaneRef}
          style={{
            width: isHorizontal ? leftWidth : "100%",
            height: isHorizontal ? "100%" : leftHeight,
          }}
          className="flex-shrink-0 bg-slate-100 text-gray-800 overflow-auto p-4"
        >
          {/* <p>
            This is the left div, taking full width on mobile and 2/3 of the
            space on wider screens.
          </p> */}

          <h1 className="text-3xl font-bold mr-5">Japanese Reading Assistant</h1>
          <h2 className="text-2xl mr-5">YouTube subtitle parser</h2>
          <br />




          <Disclaimer />

          <br />

          <p className="text-xl">username: {username}</p>


          {/* TEXT FORMATTING APPROACH */}
          <div className="p-4">
            <h1 className="text-lg font-medium mb-2">Text Formatting Options</h1>
            <p className="text-xs mb-2">(you need to press Submit to take effect)</p>
            <div className="flex space-x-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="book"
                  checked={inputMode === 'book'}
                  onChange={handleModeChange}
                  className="hidden"
                />
                <span
                  className={`px-3 py-1 rounded-full transition-colors duration-300 ${inputMode === 'book' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                >
                  Book/Paragraph
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="lyrics"
                  checked={inputMode === 'lyrics'}
                  onChange={handleModeChange}
                  className="hidden"
                />
                <span
                  className={`px-3 py-1 rounded-full transition-colors duration-300 ${inputMode === 'lyrics' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                >
                  Lyrics/Line by line
                </span>
              </label>
            </div>
          </div>







          <Tabs>

            <Tab label="Custom text input">



              {/* CUSTOM TEXT INPUT */}
              <form onSubmit={handleSubmit}>
                <textarea
                  value={inputText}
                  onChange={handleInputChange}
                  className="w-full h-40 p-2 mt-4 mb-2 rounded-md resize text-black"
                  placeholder="Enter Japanese text here..."
                />
                <button
                  type="submit"
                  className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600"
                >
                  Submit
                </button>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-2"
                >
                  Refresh word knowledge status
                </button>
              </form>



            </Tab>

            <Tab label="YouTube video subtitle parser">





              {/* URL FORM AND YOUTUBE PART */}

              <h1 className="text-3xl font-bold text-slate-600">YouTube video subtitle analyzer</h1>

              <br></br>
              <ExampleVideos />
              <br />


              {/* actual url input form */}
              <div className="flex justify-center gap-4 pt-5">
                <div className="max-w-lg w-full">
                  <div className="flex items-center border border-gray-300 rounded bg-white text-gray-800">
                    <span className="px-3 py-2 bg-gray-200 border-r border-gray-300">URL</span>
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 focus:outline-none"
                      placeholder="Paste URL"
                      value={inputUrl || ""}
                      onChange={handleInputChangeYT}
                    />
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700" onClick={handleSubmitYT}>Fetch Video and Subtitles</button>
              </div>

              {inputUrl && (
                <YouTubeComponent videoUrl={inputUrl} onSubtitleUpdate={handleSubtitleUpdate} />
              )}



              <h1>Current japanese subtitle mecab handled:</h1>
              <JapaneseTextParser
                inputText={currentJapaneseSubtitle}
                inputMode={inputMode}
                setClickedWord={setClickedWord}
                setClickedWordDictForm={setClickedWordDictForm}
                setHoveredWord={setHoveredWord}
                setHoveredSentence={setHoveredSentence}
                setClickedWordSentence={setClickedWordSentence}
                setClickedWordDetails={setClickedWordDetails}
              />


              {/* <h1>Current subtitle with furigana:</h1>
              <FuriganaConverterV2 japaneseSubtitle={currentJapaneseSubtitle} /> */}


              {/* subtitles part */}

              <br></br>

              <div>
                <div className="border border-gray-300 rounded-md">
                  <button
                    onClick={toggleAccordion}
                    className="w-full text-left px-4 py-2 bg-gray-100 rounded-md focus:outline-none"
                  >
                    {isOpen ? 'Hide Subtitles' : 'Show Subtitles - Japanese/English side by side'}
                  </button>
                  {isOpen && (
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <h2>Just Japanese text without timestamps</h2>
                          <h3>Japanese Plain Text</h3>
                          <pre className="whitespace-pre-wrap break-words">{japaneseSubtitlesPlainText}</pre>
                        </div>

                        <div>
                          <h2>Just English text without timestamps</h2>
                          <h3>English Plain Text</h3>
                          <pre className="whitespace-pre-wrap break-words">{englishSubtitlesPlainText}</pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>


            </Tab>

          </Tabs>













          {/* COMMON STANDARD CONTENT */}



          <br />






          <Tabs>
            <Tab label="Japanese Mecab Parser">
              <JapaneseTextParser
                inputText={inputText}
                inputMode={inputMode}
                setClickedWord={setClickedWord}
                setClickedWordDictForm={setClickedWordDictForm}
                setHoveredWord={setHoveredWord}
                setHoveredSentence={setHoveredSentence}
                setClickedWordSentence={setClickedWordSentence}
                setClickedWordDetails={setClickedWordDetails}
              />
            </Tab>
            <Tab label="Kuroshiro Text Converter">
              <KuroShiroPropsConverter text={inputText} url={convertAllUrl} />
            </Tab>


            <Tab label="Translation">
              <UnifiedGptComponent
                japaneseText={inputText}
                url={gptTranslateUrl}
                task="translate"
              />
            </Tab>

            <Tab label="Translation Side by Side">
              <UnifiedGptComponent
                japaneseText={inputText}
                url={gptTranslateSbSUrl}
                task="translate"
              />
            </Tab>

            <Tab label="Summary">
              <UnifiedGptComponent
                japaneseText={inputText}
                url={gptSummaryUrl}
                task="summarize"
              />
            </Tab>

            <Tab label="Sentiment">
              <UnifiedGptComponent
                japaneseText={inputText}
                url={gptSentimentUrl}
                task="analyzeSentiment"
              />
            </Tab>
          </Tabs>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />


        </div>




        <div
          ref={dividerRef}
          className={`w-1 md:w-1 bg-gray-300 cursor-${isHorizontal ? "col" : "row"
            }-resize ${isHorizontal ? "h-full" : "w-full"}`}
        ></div>




        <div
          ref={rightPaneRef}
          style={{
            width: isHorizontal ? "100%" : "100%",
            height: isHorizontal ? "100%" : `calc(100% - ${leftHeight})`,
          }}
          className="flex-1 flex-shrink-0 bg-zinc-100 flex flex-col justify-start items-center text-gray-600 overflow-y-auto p-2"
        >
          <p className="fixed top-50">
            This is the right div, taking full width on mobile and 1/3 of the
            space on wider screens.
          </p>


          <div className="lg:fixed lg:top-50 lg:overflow-y-auto">
            <Tabs>
              <Tab label="Word Details">
                <WordDetailsSidebar
                  clickedWordDetails={clickedWordDetails}
                  username={username}
                  url0={userVocabUrl}
                  url1={simpleVocabUrl}
                />
              </Tab>
              <Tab label="Hovered Data">
                <DisplayHoveredWord hoveredWord={hoveredWord} />
                <DisplaySentence sentence={hoveredSentence} />
                <DisplaySentenceV2 sentence={hoveredSentence} url={furiganaUrl} />
              </Tab>
              <Tab label="Create Flashcard">
                <CreateReadingFlashcard
                  word={clickedWord}
                  wordDictForm={clickedWordDictForm}
                  sentence={clickedWordSentence}
                  url0={deeplUrl}
                  url1={simpleVocabUrl}
                  url2={convertHiraganaUrl}
                  url3={storeVocabUrl}
                />
              </Tab>
              <Tab label="Translate sentence">
                <DisplayWord
                  word={clickedWord}
                  sentence={clickedWordSentence}
                  url={deeplUrl}
                />
              </Tab>
              <Tab label="Kanji">
                <KanjiDisplay
                  word={clickedWord || ""}
                  url0={extractKanjiUrl}
                  url1={kanjiUrl}
                />
              </Tab>
              <Tab label="Radicals">
                <RadicalInfo word={clickedWord || ""} url={radicalUrl} />
              </Tab>
              <Tab label="Grammar">
                <GrammarExplanation
                  word={clickedWord}
                  sentence={clickedWordSentence}
                  url={gptGrammarUrl}
                />
              </Tab>
            </Tabs>



          </div>

        </div>
      </div>




    </div>
  );
}

// ---------------------------------------------------------------------------------------- //
// -------------------------------- Independent components -------------------------------- //
// ---------------------------------------------------------------------------------------- //


//import { useState } from "react";


function ExampleVideos() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-left text-sm font-bold flex items-center justify-between w-full p-4 bg-gray-100 text-gray-800 rounded-md border border-gray-200 hover:bg-gray-200 transition-colors"
      >
        Example Videos
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-white text-gray-700 rounded-md border border-gray-200 shadow-sm">
          <p className="text-bold mb-2">Example videos:</p>
          <table className="min-w-full table-auto border-collapse">
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-2 py-2 font-semibold text-slate-600">(BSJ Podcast) 仕事:</td>
                <td className="px-2 py-2 text-slate-600">https://www.youtube.com/watch?v=-cbuS40rNSw</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-2 py-2 font-semibold text-slate-600">(BSJ Podcast) 外国人:</td>
                <td className="px-2 py-2 text-slate-600">https://www.youtube.com/watch?v=UQ05S65tKPc</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-2 py-2 font-semibold text-slate-600">(BSJ Podcast) 日本人が使うSNS:</td>
                <td className="px-2 py-2 text-slate-600">https://www.youtube.com/watch?v=2ySIJ1wj4UE</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-2 py-2 font-semibold text-slate-600">(BSJ Podcast) 日本でイライラすること:</td>
                <td className="px-2 py-2 text-slate-600">https://www.youtube.com/watch?v=7_6OMDtbA7E</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-2 py-2 font-semibold text-slate-600">(BSJ Podcast):</td>
                <td className="px-2 py-2 text-slate-600">https://www.youtube.com/watch?v=mjzZ5i9i2rY</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-2 py-2 font-semibold text-slate-600">(Akane):</td>
                <td className="px-2 py-2 text-slate-600">https://www.youtube.com/watch?v=r20IdWOSBFE</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-2 py-2 font-semibold text-slate-600">(Yoshie):</td>
                <td className="px-2 py-2 text-slate-600">https://www.youtube.com/watch?v=jSTH9NQoSUs</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}



    </div>
  );
}







// ----------------------------------------------- //

//import { useState } from "react";


function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mr-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-left text-sm font-bold flex items-center justify-between w-full p-4 bg-blue-100 text-blue-800 rounded-md border border-blue-200 hover:bg-blue-200 transition-colors"
      >
        Disclaimer
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-blue-50 text-blue-900 rounded-md border border-blue-200 shadow-sm">
          <p className="text-xs">
            Japanese text parser is using Mecab, KuroShiro, Jitendex, JMDICT,
            KANJIDIC, Deepl (for translations) and Chat GPT for grammar
            explanations. We have noticed that Mecab parser is sometimes
            injecting incorrect furigana above single kanji words. But when we
            use KuroShiro on the whole sentence, we typically get correct
            furigana injections. Also Chat GPT and Deepl sometimes make
            mistakes. But overall we would say that the text reading assistant
            is reliable tool in general. It is expected that reader will have
            some basic knowledge of Japanese when using this tool.
          </p>
          <p className="text-xs mt-2">
            Keep in mind that automatic translations made by DEEPL/Chat GPT may
            be misleading. The same applies to grammar and sentiment
            explanations made by Chat GPT. Do not use for translations of
            materials of high importance—such as medical, legal, and so on.
          </p>
        </div>
      )}
    </div>
  );
}




// --- 




// ---------------------------- cookies ----------------------------- //




// ---------------------- data structures --------------------- //

// const [inputText, setInputText] = useState(
//   "感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！"
// );

//   const [inputText, setInputText] = useState(
//     `
//     花に亡霊

//     もう忘れて しまったかな 夏の木陰に 座ったまま、
//     氷菓を口に 放り込んで 風を 待っていた

//     もう忘れてしまったかな世の中の全部嘘だらけ
//     本当の価値を二人で探しに行こうと笑ったこと

//     忘れないように色褪せないように
//     形に残るものが全てじゃないように

//     言葉をもっと教えて夏が来るって教えて
//     僕は描いてる眼に映ったのは夏の亡霊だ

//     風にスカートが揺れて想い出なんて忘れて
//     浅い呼吸をする、汗を拭って夏めく

//     もう忘れてしまったかな夏の木陰に座った頃、
//     遠くの丘から顔出した雲があったじゃないか

//     君はそれを掴もうとして、馬鹿みたいに空を切った手で
//     僕は紙に雲一つを書いて、笑って握って見せて

//     忘れないように色褪せないように歴史に残るものが全てじゃないから
//     今だけ顔も失くして言葉も全部忘れて君は笑ってる

//     夏を待っている僕ら亡霊だ心をもっと教えて
//     夏の匂いを教えて浅い呼吸をする

//     忘れないように色褪せないように
//     心に響くものが全てじゃないから

//     言葉をもっと教えてさよならだって教えて
//     今も見るんだよ夏に咲いてる花に亡霊を言葉じゃなくて

//     時間を時間じゃなくて心を浅い呼吸をする、
//     汗を拭って夏めく夏の匂いがする

//     もう忘れてしまったかな夏の木陰に座ったまま、
//     氷菓を口に放り込んで風を待っていた
// `
//   );

//   const [inputText, setInputText] = useState(
//     `
//     https://www.youtube.com/watch?v=msLkh1fE8Os&list=RDMZIJ2vFxu9Y&index=15

//     レイメイ（黎明）

//     作詞：さユり＆ Hiro
//     作曲：さユり＆ Sho
//     編曲：MY FIRST STORY
//     歌：さユり＆ Hiro

//     哀しい欲望に手を伸ばし続けて夢を見る
//     何もかも嘘に塗れた眼の中に真相が隠れたまま

//     希望の淵に飲まれて
//     沈んでしまった本当の答えを
//     探し続けながら

//     何百回でも遮るモノに翳してみせる僕の願い
//     必ず君に伝える日まで
//     正しさは譲れないから進み続けてゆくの
//     何度でも彷徨いながら目指して

//     いつか黎明の元へ帰る時まで
//     痛む泥濘の中で祈りを描くよ
//     心配ないと言い聞かせながら今
//     歩き出すの

//     –

//     冷たい約束の絵を繋ぎ合わせた道を往く
//     重ね合う夢に息吐く場所など無いと心は怯えながら

//     鼓動は光求めて不自由な軌道を選んだ
//     それが今を苦しめても

//     もう一回はない！
//     愚かな程に望んでしまう光る世界
//     抱えて押し潰されかけても

//     後悔なら呆れる程に繰り返してきたけど
//     真実はもう失いたくないから

//     歪な運命の中に囚われている
//     荒ぶ人生を共にあなたと歩くよ
//     涙の果ては此処ではないとまた
//     夜を渡ってゆく

//     –

//     あの日僕らが出会った時に見た大きな夢は
//     二人のレンズにはそれぞれ別の景色だった
//     それでも何故か二人には美しく見えて心が緊くなって
//     どうしようもなく叫びたくなったのを今でも覚えてる

//     主題はきっとそれだけで過不足ないから
//     美しい問いを限りある足で永遠に追いかけながら
//     “何も間違いじゃない" 声を震わせ歌いながら
//     “君の手を引く" 今を生き抜くことが出来たら

//     –

//     深い深い旅をしよう
//     (その先はほとんどが罪かもしれないし)
//     (その先はほとんどが失ってばかりかもしれないけれど)

//     永い永い地図を記そう
//     (分かってたって僕らきっと逃げることなんて出来なかったから)

//     青い青い星を巡って
//     (最後の最後にたった一つの答えにたどり着くまで)
//     (決して止めてはいけないのだときっと誰もが知っていた)

//     苦しみさえ引き連れて深層へ

//     –

//     何百回でも遮るモノに翳してみせる僕の願い
//     必ず君に伝える日まで
//     正しさは譲れないから進み続けてゆくの
//     何度でも彷徨いながら目指して

//     いつか黎明の元へ帰る時まで
//     痛む泥濘の中で祈りを描くよ
//     心配ないと言い聞かせながら今
//     歩き出すの

//     たった一つの朝焼けを手に入れるの
// `
//   );

// const sentencesRaw = [
//   [
//     { original: "彼女", dictionary: "彼女", furigana: "かのじょ" },
//     { original: "は", dictionary: "は", furigana: "" },
//   ],
//   [
//     { original: "今日", dictionary: "今日", furigana: "きょう" },
//     { original: "は", dictionary: "は", furigana: "" },
//   ],
//   [
//     { original: "寿司屋", dictionary: "寿司屋", furigana: "すしや" },
//     { original: "は", dictionary: "は", furigana: "" },
//   ],
// ];

// const sentences = [
//   [
//     {
//       dictionary: "彼女",
//       furigana: "かのじょ",
//       original: "彼女",
//       status: "known",
//     },
//     {
//       dictionary: "は",
//       furigana: "",
//       original: "は",
//       status: "unknown",
//     },
//   ],
//   [
//     {
//       dictionary: "今日",
//       furigana: "きょう",
//       original: "今日",
//       status: "known",
//     },
//     {
//       dictionary: "は",
//       furigana: "",
//       original: "は",
//       status: "unknown",
//     },
//   ],
//   [
//     {
//       dictionary: "寿司屋",
//       furigana: "すしや",
//       original: "寿司屋",
//       status: "known",
//     },
//     {
//       dictionary: "は",
//       furigana: "",
//       original: "は",
//       status: "unknown",
//     },
//   ],
// ];

// --- //

















