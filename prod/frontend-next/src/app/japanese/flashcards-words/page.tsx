"use client";

import { useState } from "react";
import { useEffect } from "react";

import useSWR from "swr";

// import LearningProgressFlask from "@/components/LearningProgressFlask";
// import ComplexFlashcardModalKanjiFlask from "@/components/ComplexFlashcardModalKanjiFlask";
// import ComplexFlashcardModalVocabFlask from "@/components/ComplexFlashcardModalVocabFlask";
// import CloneButton from "@/components/CloneButton";

import dynamic from "next/dynamic";

const LearningProgressFlask = dynamic(
  () => import("@/components/LearningProgressFlask"),
  { ssr: false }
);

const ComplexFlashcardModalKanjiFlask = dynamic(
  () => import("@/components/ComplexFlashcardModalKanjiFlask"),
  { ssr: false }
);

const ComplexFlashcardModalVocabFlask = dynamic(
  () => import("@/components/ComplexFlashcardModalVocabFlask"),
  { ssr: false }
);


const ComplexFlashcardModalVocabFlaskSentenceMining = dynamic(
  () => import("@/components/ComplexFlashcardModalVocabFlaskSentenceMining"),
  { ssr: false }
);


const CloneButton = dynamic(() => import("@/components/CloneButton"), {
  ssr: false,
});

//const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

interface Question {
  kanji: string;
  onYomi: string;
  kunYomi: string;
  reading: string;
  k_audio: string;
  exampleWord: string;
  exampleReading: string;
  translation: string;
  audio: string;
  p_tag: string;
  s_tag: string;
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Check if user is already logged in from cookies
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setLoggedIn(true);
      setUsername(loggedInUser);
    }
  }, [darkMode]);

  const handleLogin = () => {
    // Simulate login process, here you'd usually authenticate user credentials
    const user = "testUser";

    // Set logged in user to cookies
    localStorage.setItem("loggedInUser", user);
    setLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    // Remove user from cookies and set logged out
    localStorage.removeItem("loggedInUser");
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="bg-gray-300 text-black dark:bg-gray-900 dark:text-white">
      <div className="bg-gray-300 dark:bg-gray-900 min-h-screen relative">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded"
        >
          Toggle Theme
        </button>

        <br></br>
        <br></br>

        {/* Conditionally render login/logout button based on login status */}
        {loggedIn ? (
          <div>
            <p>Welcome, {username}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}

        <br></br>
        <br></br>

        <div className="p-4">
          <h1 className="text-xl font-semibold mb-4">Clone JLPT Collections</h1>
          <div className="flex flex-wrap">
            <CloneButton
              collection="words"
              level="essential_600_verbs"
              userId="testUser"
            />
            <CloneButton
              collection="words"
              level="suru_essential_600_verbs"
              userId="testUser"
            />
          </div>
        </div>

        <br></br>
        <br></br>

        <h1 className="text-xl font-bold mb-2">Essential Japanese verbs</h1>

        <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
          {[
            "verbs-1",
            "verbs-2",
            "verbs-3",
            "verbs-4",
            "verbs-5",
            "verbs-6",
            "verbs-7",
            "verbs-8",
          ].map((part, index) => (
            <div key={index}>
              <ComplexFlashcardModalVocabFlask
                userId="testUser"
                collectionName="words"
                p_tag="essential_600_verbs"
                s_tag={part}
              />
            </div>
          ))}
        </div>


        <br></br>
        <br></br>


        <h1 className="text-xl font-bold mb-2">Essential Suru Japanese verbs</h1>

        <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
          {[
            "verbs-1",
            "verbs-2",
            "verbs-3",
            "verbs-4",
            "verbs-5",
            "verbs-6",
          ].map((part, index) => (
            <div key={index}>
              <ComplexFlashcardModalVocabFlask
                userId="testUser"
                collectionName="words"
                p_tag="suru_essential_600_verbs"
                s_tag={part}
              />
            </div>
          ))}
        </div>


        <br></br>
        <br></br>
        <br></br>
        <br></br>




        <h1 className="text-xl font-bold mb-2">SENTENCE MINING</h1>

        <ComplexFlashcardModalVocabFlaskSentenceMining
                userId="testUser"
                collectionName="vocabulary"
                p_tag="sentence_mining"
                s_tag="verbs-1"
              />







        {/* <h1 className="text-2xl">Learning Progress DASHBOARD</h1>
        <br></br>
        <div>
          <LearningProgressFlask
            userId="testUser"
            collectionName="words"
            p_tag="essential_600_verbs"
            s_tag="verbs-1"
          />
        </div>

        <div>
          <LearningProgressFlask
            userId="testUser"
            collectionName="words"
            p_tag="essential_600_verbs"
            s_tag="verbs-2"
          />
        </div>

        <br></br>
        <div>
          <LearningProgressFlask
            userId="testUser"
            collectionName="words"
            p_tag="suru_essential_600_verbs"
            s_tag="verbs-1"
          />
        </div>

        <div>
          <LearningProgressFlask
            userId="testUser"
            collectionName="words"
            p_tag="suru_essential_600_verbs"
            s_tag="verbs-2"
          />
        </div> */}
      </div>
    </div>
  );
}
