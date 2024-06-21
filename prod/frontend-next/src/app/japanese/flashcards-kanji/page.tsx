"use client";

import { useState } from "react";
import { useEffect } from "react";

import useSWR from "swr";

// import LearningProgressFlask from "@/components/LearningProgressFlask";
// import ComplexFlashcardModalKanjiFlask from "@/components/ComplexFlashcardModalKanjiFlask";
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

const CloneButton = dynamic(() => import("@/components/CloneButton"), {
  ssr: false,
});

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

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
            <CloneButton collection="kanji" level="JLPT_N5" userId="testUser" />
            <CloneButton collection="kanji" level="JLPT_N4" userId="testUser" />
            <CloneButton collection="kanji" level="JLPT_N3" userId="testUser" />
            <CloneButton collection="kanji" level="JLPT_N2" userId="testUser" />
            <CloneButton collection="kanji" level="JLPT_N1" userId="testUser" />
          </div>
        </div>

        <br></br>
        <br></br>

        <h1 className="text-xl font-bold mb-2">
          Kanji JLPT N3 (with one reading)
        </h1>

        <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
          {["part_1", "part_2", "part_3", "part_4", "part_5", "part_6"].map(
            (part, index) => (
              <div
                key={index}
                className="w-full max-w-xs shadow-md rounded-lg"
              >
                <ComplexFlashcardModalKanjiFlask
                  userId="testUser"
                  collectionName="kanji"
                  p_tag="JLPT_N3"
                  s_tag={part}
                />
              </div>
            )
          )}
        </div>

        <br></br>
        <br></br>

        <h1 className="text-xl font-bold mb-2">
          Kanji JLPT N4 (with one reading)
        </h1>

        <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
          {["part_1", "part_2", "part_3"].map(
            (part, index) => (
              <div
                key={index}
                className="w-full max-w-xs shadow-md rounded-lg"
              >
                <ComplexFlashcardModalKanjiFlask
                  userId="testUser"
                  collectionName="kanji"
                  p_tag="JLPT_N4"
                  s_tag={part}
                />
              </div>
            )
          )}
        </div>

        <br></br>
        <br></br>

        <h1 className="text-xl font-bold mb-2">
          Kanji JLPT N5 (with one reading)
        </h1>

        <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
          {["part_1"].map(
            (part, index) => (
              <div
                key={index}
                className="w-full max-w-xs shadow-md rounded-lg"
              >
                <ComplexFlashcardModalKanjiFlask
                  userId="testUser"
                  collectionName="kanji"
                  p_tag="JLPT_N5"
                  s_tag={part}
                />
              </div>
            )
          )}
        </div>









        <br></br>
        <br></br>
        <br></br>
        <br></br>

        {/* <h1 className="text-2xl">Learning Progress DASHBOARD</h1>
        <br></br>
        <div>
          <LearningProgressFlask
            userId="testUser"
            collectionName="kanji"
            p_tag="JLPT_N3"
            s_tag="part_1"
          />
        </div>

        <div>
          <LearningProgressFlask
            userId="testUser"
            collectionName="kanji"
            p_tag="JLPT_N3"
            s_tag="part_2"
          />
        </div> */}
      </div>
    </div>
  );
}
