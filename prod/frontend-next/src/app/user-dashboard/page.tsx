"use client";

import { useState } from "react";
import { useEffect } from "react";

import useSWR from "swr";

import LearningProgressFlask from "@/components/LearningProgressFlask";

import ComplexFlashcardModalFlask from "@/components/ComplexFlashcardModalKanjiFlask";

import CloneButton from "@/components/CloneButton";

//const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function Home() {
  //const apiUrl_1 = "http://localhost:8000/api/kanji?p_tag=JLPT_N3&s_tag=part_1";
  //const { data: complexQuestions_1, error } = useSWR(apiUrl_1, fetcher);
  //if (error) return <div>Failed to load</div>;
  //if (!complexQuestions_1) return <div>Loading...</div>;

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
    <div className="bg-gray-300 text-black dark:bg-gray-900 dark:text-white p-6">
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
            <CloneButton level="JLPT_N5" userId="testUser" />
            <CloneButton level="JLPT_N4" userId="testUser" />
            <CloneButton level="JLPT_N3" userId="testUser" />
            <CloneButton level="JLPT_N2" userId="testUser" />
            <CloneButton level="JLPT_N1" userId="testUser" />
          </div>
        </div>

        <br></br>
        <br></br>

        <div>
          <p className="text-2xl">Show ComplexFlashcardModal JLPT_N3 part_1</p>
          <ComplexFlashcardModalFlask
            userId="testUser"
            collectionName="kanji"
            p_tag="JLPT_N3"
            s_tag="part_1"
          />
        </div>

        <div>
          <p className="text-2xl">Show ComplexFlashcardModal JLPT_N3 part_2</p>
          <ComplexFlashcardModalFlask
            userId="testUser"
            collectionName="kanji"
            p_tag="JLPT_N3"
            s_tag="part_2"
          />
        </div>

        <div>
          <p className="text-2xl">Show ComplexFlashcardModal JLPT_N3 part_3</p>
          <ComplexFlashcardModalFlask
            userId="testUser"
            collectionName="kanji"
            p_tag="JLPT_N3"
            s_tag="part_3"
          />
        </div>

        <div>
          <p className="text-2xl">Show ComplexFlashcardModal JLPT_N3 part_4</p>
          <ComplexFlashcardModalFlask
            userId="testUser"
            collectionName="kanji"
            p_tag="JLPT_N3"
            s_tag="part_4"
          />
        </div>

        <div>
          <p className="text-2xl">Show ComplexFlashcardModal JLPT_N3 part_5</p>
          <ComplexFlashcardModalFlask
            userId="testUser"
            collectionName="kanji"
            p_tag="JLPT_N3"
            s_tag="part_5"
          />
        </div>

        <div>
          <p className="text-2xl">Show ComplexFlashcardModal JLPT_N3 part_6</p>
          <ComplexFlashcardModalFlask
            userId="testUser"
            collectionName="kanji"
            p_tag="JLPT_N3"
            s_tag="part_6"
          />
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h1 className="text-2xl">Learning Progress DASHBOARD</h1>
        <br></br>
        <div>
          <h1 className="text-2xl">
            Learning Progress Dashboard JLPT_N3 part_1
          </h1>
          <LearningProgressFlask
            userId="testUser"
            collectionName="kanji"
            p_tag="JLPT_N3"
            s_tag="part_1"
          />
        </div>

        <div>
          <h1 className="text-2xl">
            Learning Progress Dashboard JLPT_N3 part_2
          </h1>
          <LearningProgressFlask
            userId="testUser"
            collectionName="kanji"
            p_tag="JLPT_N3"
            s_tag="part_2"
          />
        </div>
      </div>
    </div>
  );
}
