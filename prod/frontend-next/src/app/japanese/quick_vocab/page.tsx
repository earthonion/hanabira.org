"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

//http://localhost:3000/japanese/kanji_overview

// pages/index.js

export default function Home() {
  // Define your hiragana characters and their romaji
  const hiragana = [
    // { kanji: "末", reading: "マツ", k_audio: "/audio/japanese/kanji/k_末.mp3" },
    // {
    //   kanji: "若い",
    //   reading: "わかい",
    //   k_audio: "/audio/japanese/kanji/k_若い.mp3",
    // },
    // { kanji: "晩", reading: "バン", k_audio: "/audio/japanese/kanji/k_晩.mp3" },
    // { kanji: "皿", reading: "さら", k_audio: "/audio/japanese/kanji/k_皿.mp3" },

    {
      kanji: "表す",
      reading: "あらわす",
      en: "to express,to show,to reveal",
      k_audio: "/audio/vocab/v_表す.mp3",
    },
    {
      kanji: "現す",
      reading: "あらわす",
      en: "to show,to indicate,to display",
      k_audio: "/audio/vocab/v_現す.mp3",
    },
    {
      kanji: "現れ",
      reading: "あらわれ",
      en: "embodiment,materialization",
      k_audio: "/audio/vocab/v_現れ.mp3",
    },
    {
      kanji: "現れる",
      reading: "あらわれる",
      en: "(1) to appear,to come in sight,to become visible,(2) to express oneself",
      k_audio: "/audio/vocab/v_現れる.mp3",
    },

    //... add all characters
  ];

  interface HiraganaCardProps {
    kanji: string;
    reading: string;
    en: string;
    k_audio: string;
  }

  const HiraganaCard: React.FC<HiraganaCardProps> = ({
    kanji,
    reading,
    en,
    k_audio,
  }) => {
    // Function to play audio
    const playAudio = () => {
      const audioElement = new Audio(k_audio);
      audioElement.play();
    };

    return (
      <div className="w-48 h-40" onClick={playAudio}>
        <div className="relative w-full h-full">
          {/* Front of the Card */}
          <div className="bg-slate-100 transition duration-75 ease-in-out transform hover:opacity-0 rounded-lg shadow-md p-4 border border-gray-200 absolute inset-0 flex flex-col items-center justify-center">
            <h5 className="text-sm text-gray-600">[{reading}]</h5>
            <h5 className="text-4xl text-gray-900">{kanji}</h5>
          </div>

          {/* Back of the Card */}
          <div className="bg-slate-300 transition duration-75 ease-in-out transform opacity-0 hover:opacity-100 rounded-lg shadow-md p-4 border border-gray-200 absolute inset-0 flex flex-col items-center justify-center">
            <h5 className="text-2xl font-bold text-gray-900">{kanji}</h5>
            <h5 className="text-md text-gray-600">{reading}</h5>
            <h5 className="text-md text-gray-700">{en}</h5>
          </div>
        </div>
      </div>
    );
  };

  // Define the type for a single item of Kanji data
  // interface KanjiItem {
  //   kanji: string;
  //   reading: string;
  //   en: string;
  //   k_audio: string;
  // }

  interface KanjiItem {
    vocabulary_japanese: string;
    vocabulary_simplified: string;
    vocabulary_english: string;
    vocabulary_audio: string;
  }

  interface KanjiTableProps {
    p_tag: string; // Explicitly stating p_tag is of any type
    s_tag: string;
  }

  const KanjiTable: React.FC<KanjiTableProps> = ({ p_tag, s_tag }) => {
    const [kanjiData, setKanjiData] = useState<KanjiItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Initialize with specific values for p_tag and s_tag
    const [activeJLPTTab, setActiveJLPTTab] = useState("jlpt_n4"); // Example initial value
    const [activeVocabTab, setActiveVocabTab] = useState(200); // Example initial value

    useEffect(() => {
      const fetchData = async () => {
        if (!p_tag) return; // If no p_tag is provided, don't attempt to fetch data
        if (!s_tag) return;

        setLoading(true);
        try {
          console.log(
            "##################################  ENV VARS  #######################################"
          );
          console.log(process.env.REACT_APP_HOST_IP);

          const host = "localhost";
          const port = 8000;

          let apiUrl;
          //If REACT_APP_HOST_IP is defined, use it. Otherwise default to localhost:8000 for VM
          if (process.env.REACT_APP_HOST_IP) {
            apiUrl = `http://${process.env.REACT_APP_HOST_IP}/api/v1/tanos_words?p_tag=${p_tag}&s_tag=${s_tag}`;
          } else {
            //apiUrl = `http://${host}:${port}/api/v1/tanos_words?p_tag=${p_tag}&s_tag=${s_tag}`;
            apiUrl = `/api/v1/tanos_words?p_tag=${p_tag}&s_tag=${s_tag}`;     // use for client component
          }


          //apiUrl = `localhost:8000/api/v1/tanos_words?p_tag=${p_tag}&s_tag=${s_tag}`;

          // response is object and list is under words key
          // {"words":[{"_id":"65be8e71233807ecceb66aa3",
          //"vocabulary_japanese":"お土産",
          //"vocabulary_simplified":"おみやげ",
          // "vocabulary_english":"souvenir",
          //"vocabulary_audio":"/audio/vocab/v_お土産.mp3",
          // "word_type":"nan",
          //"p_tag":"JLPT_N4",
          //"s_tag":"200","__v":

          const response = await fetch(`${apiUrl}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`); // Throw error for bad response
          }
          //const data: KanjiItem[] = await response.json();
          //console.log(data); // Add this line to check the data format
          //setKanjiData(data.words); // Assuming the API returns the array of kanji data

          const { words } = await response.json(); // Directly destructure 'words' from the response
          console.log(words);
          setKanjiData(words); // Assumes words is directly an array of KanjiItem

        } catch (error) {
          console.error("Error fetching kanji data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [p_tag, s_tag]); // Only re-run the effect if p_tag changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div>
        <div className="flex flex-wrap justify-center gap-4">
          {/* {hiragana.map((item, index) => ( */}
          {kanjiData.map((item, index) => (
            // <HiraganaCard
            //   key={index}
            //   kanji={item.kanji}
            //   reading={item.reading}
            //   en={item.en}
            //   k_audio={item.k_audio}
            // />
            <HiraganaCard
              key={index}
              kanji={item.vocabulary_japanese}
              reading={item.vocabulary_simplified}
              en={item.vocabulary_english}
              k_audio={item.vocabulary_audio}
            />
          ))}
        </div>
      </div>
    );
  };

  const TabComponent = () => {
    const [activeJLPTTab, setActiveJLPTTab] = useState("jlpt_n4");
    const [activeVocabTab, setActiveVocabTab] = useState(200);

    const jlptLevels = ["JLPT_N5", "JLPT_N4", "JLPT_N3", "JLPT_N2", "JLPT_N1"];
    const vocabSets = [
      100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
      1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000,
      3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000
    ]; // Adjust as needed
    // const vocabSets = [
    //   100, 200, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    // ]; // Adjust as needed

    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex border-b overflow-auto">
          {jlptLevels.map((level, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-lg font-medium ${
                activeJLPTTab === level.toLowerCase()
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => {
                setActiveJLPTTab(level.toLowerCase());
                setActiveVocabTab(100); // Reset to first set when switching JLPT levels
              }}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-10 gap-1 overflow-auto border-b mt-2">
          {vocabSets.map((set) => (
            <button
              key={set}
              className={`px-2 py-1 text-sm font-medium ${
                activeVocabTab === set
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveVocabTab(set)}
            >
              {set}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {/* Render the KanjiTable based on active JLPT and Vocab Tab */}
          <KanjiTable
            p_tag={`${activeJLPTTab.toUpperCase()}`}
            s_tag={`${activeVocabTab}`}
          />
        </div>
      </div>
    );
  };

  // this part will need to be more like p_tag=JLPT_N3 s_tag=100
  // <KanjiTable p_tag={`${activeJLPTTab.toUpperCase()}_${activeVocabTab}`} />

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto p-5">
        <h1 className="text-xl font-bold text-gray-800 mb-4 mt-4">
          Quick JLPT N5-N1 Vocabulary overview
        </h1>
        <p className="text-gray-700 text-sm">Intended as quick refresh.</p>
        <br></br>
        <p className="text-gray-700 text-sm">
          Here is full vocabulary list for JLPT N5-N1. The cards are intended
          for quick vocabulary review. These are not SRS flashcards (SRS
          functionality implemented in different part of the platform). The idea
          is that we scroll through the cards and make sure that we are familiar
          with the word. If not, we can quickly check reading and english
          translation. So this section should ideally be visited once you are
          already familiar with majority of vocabulary for given JLPT level. For
          example we can just quickly scroll through 100 N3 words per day to
          make sure we remember them.
        </p>
      </div>

      <TabComponent />
    </div>
  );
}

// ------------------------------- OLD CODE -------------------------------------

//   return (
//     <div>
//       <div className="flex flex-wrap justify-center gap-4">
//         {kanjiData.map((item, index) => (
//           <HiraganaCard
//             key={index}
//             kanji={item.kanji}
//             reading={item.reading}
//             k_audio={item.k_audio}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// ---

//   return (
//     <div className="w-24 h-24" onClick={playAudio}>
//       <div className="relative w-full h-full">
//         <div className="bg-slate-100 absolute inset-0 transition duration-75 ease-in-out transform hover:opacity-0 rounded-lg shadow-md flex items-center justify-center p-2 border border-gray-200">
//           <h5 className="text-2xl text-gray-900">{kanji}</h5>
//         </div>
//         <div className="bg-slate-300 absolute inset-0 transition duration-75 ease-in-out transform opacity-0 hover:opacity-100 rounded-lg shadow-md flex items-center justify-center p-2 border border-gray-200">
//           <h5 className="text-xs text-gray-700">{reading}</h5>
//           <h5 className="text-xs text-gray-700">{en}</h5>
//         </div>
//       </div>
//     </div>
//   );
// };

// not that bad
//   return (
//     <div className="max-w-xs w-full" onClick={playAudio}>
//       <div className="relative">
//         <div className="bg-slate-100 transition duration-75 ease-in-out transform hover:opacity-0 rounded-lg shadow-md p-4 border border-gray-200">
//           <h5 className="text-2xl text-gray-900">{kanji}</h5>
//         </div>
//         <div className="bg-slate-300 transition duration-75 ease-in-out transform opacity-0 hover:opacity-100 rounded-lg shadow-md p-4 border border-gray-200 absolute top-0">
//           <h5 className="text-sm text-gray-700">{reading}</h5>
//           <h5 className="text-sm text-gray-700">{en}</h5>
//         </div>
//       </div>
//     </div>
//   );
// };

// ---

// const TabComponent = () => {
//   const [activeTab, setActiveTab] = useState("jlpt n3");

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <div className="flex border-b overflow-auto">
//         {["JLPT N5", "JLPT N4", "JLPT N3"].map((tab, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 text-lg font-medium ${
//               activeTab === tab.toLowerCase()
//                 ? "text-blue-500 border-b-2 border-blue-500"
//                 : "text-gray-600"
//             }`}
//             onClick={() => setActiveTab(tab.toLowerCase())}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       <div className="mt-4">
//         {activeTab === "jlpt n5" && <KanjiTable p_tag="JLPT_N5" />}
//         {activeTab === "jlpt n4" && <KanjiTable p_tag="JLPT_N4" />}
//         {activeTab === "jlpt n3" && <KanjiTable p_tag="JLPT_N3" />}
//       </div>
//     </div>
//   );
// };

// we will need also mapping
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
// const vocabSets = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900];
// that it corresponds to subtag 100, 200 and so on

// const TabComponent = () => {
//   const [activeJLPTTab, setActiveJLPTTab] = useState("jlpt n3");
//   const [activeVocabTab, setActiveVocabTab] = useState(100);

//   const jlptLevels = ["JLPT N5", "JLPT N4", "JLPT N3"];
//   const vocabSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

//   const renderVocabTabs = () => {
//     if (activeJLPTTab === "jlpt n5") {
//       // Adjust the range according to the number of words in JLPT N5
//       return vocabSets.slice(0, 5).map(set => (
//         <button
//           key={set}
//           className={`px-4 py-2 text-lg font-medium ${
//             activeVocabTab === set ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"
//           }`}
//           onClick={() => setActiveVocabTab(set)}
//         >
//           {set}
//         </button>
//       ));
//     } else if (activeJLPTTab === "jlpt n4") {
//       // Adjust the range for JLPT N4
//       return vocabSets.slice(0, 6).map(set => (
//         <button
//           key={set}
//           className={`px-4 py-2 text-lg font-medium ${
//             activeVocabTab === set ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"
//           }`}
//           onClick={() => setActiveVocabTab(set)}
//         >
//           {set}
//         </button>
//       ));
//     } else {
//       // Default to JLPT N3
//       return vocabSets.map(set => (
//         <button
//           key={set}
//           className={`px-4 py-2 text-lg font-medium ${
//             activeVocabTab === set ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"
//           }`}
//           onClick={() => setActiveVocabTab(set)}
//         >
//           {set}
//         </button>
//       ));
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <div className="flex border-b overflow-auto">
//         {jlptLevels.map((level, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 text-lg font-medium ${
//               activeJLPTTab === level.toLowerCase() ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"
//             }`}
//             onClick={() => {
//               setActiveJLPTTab(level.toLowerCase());
//               setActiveVocabTab(100); // Reset to first set when switching JLPT levels
//             }}
//           >
//             {level}
//           </button>
//         ))}
//       </div>

//       <div className="flex border-b overflow-auto mt-2">
//         {renderVocabTabs()}
//       </div>

//       <div className="mt-4">
//         {/* Render the KanjiTable based on active JLPT and Vocab Tab */}
//         <KanjiTable p_tag={`${activeJLPTTab.toUpperCase()}_${activeVocabTab}`} />
//       </div>
//     </div>
//   );
// };

// WORKS GREAT< JUST NOT FLEX FOR 100, 200, 300, otherwise amazing
// const TabComponent = () => {
//   const [activeJLPTTab, setActiveJLPTTab] = useState("jlpt n3");
//   const [activeVocabTab, setActiveVocabTab] = useState(100);

//   const jlptLevels = ["JLPT N5", "JLPT N4", "JLPT N3"];
//   const vocabSets = [100, 200, 300, 400, 500, 600, 700, 800]; // Adjust as needed

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <div className="flex border-b overflow-auto">
//         {jlptLevels.map((level, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 text-lg font-medium ${
//               activeJLPTTab === level.toLowerCase() ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"
//             }`}
//             onClick={() => {
//               setActiveJLPTTab(level.toLowerCase());
//               setActiveVocabTab(100); // Reset to first set when switching JLPT levels
//             }}
//           >
//             {level}
//           </button>
//         ))}
//       </div>

//       <div className="flex overflow-auto border-b mt-2">
//         {vocabSets.map(set => (
//           <button
//             key={set}
//             className={`px-4 py-2 text-lg font-medium ${
//               activeVocabTab === set ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"
//             }`}
//             onClick={() => setActiveVocabTab(set)}
//           >
//             {set}
//           </button>
//         ))}
//       </div>

//       <div className="mt-4">
//         {/* Render the KanjiTable based on active JLPT and Vocab Tab */}
//         <KanjiTable p_tag={`${activeJLPTTab.toUpperCase()}_${activeVocabTab}`} />
//       </div>
//     </div>
//   );
// };
