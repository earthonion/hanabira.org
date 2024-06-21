"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface LoginData {
  date: string;
  count: number;
}

interface LoginResponse {
  message?: string;
  error?: string;
}



export default function Sidebar() {

  const [active, setActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");


  const [loginStreakData, setLoginStreakData] = useState<LoginData[]>([]);
  const [loginHistory, setLoginHistory] = useState<LoginData[]>([]);
  const [longestStreak, setLongestStreak] = useState(0);




  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }

  //   // Check if user is already logged in from cookies
  //   const loggedInUser = localStorage.getItem("loggedInUser");
  //   if (loggedInUser) {
  //     setLoggedIn(true);
  //     setUsername(loggedInUser);
  //   }
  // }, [darkMode]); // Re-run when darkMode changes


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


    const fetchLoginStreakData = async () => {
      try {
        const response = await fetch(
          `/f-api/v1/get-logins/${username}`,
          { method: "GET" }
        );
        const data: LoginData[] = await response.json();
        console.log(data);
        setLoginStreakData(data);
      } catch (error) {
        console.error("Error fetching login streak data:", error);
      }
    };

    fetchLoginStreakData();
  }, [username, darkMode]); // You might want to adjust this dependency array based on your needs




















  const showMenu = () => {
    setActive(!active);
  };

  // Inside your component, add this to the handleLogin function
  const handleLogin = () => {
    const user = "testUser";
    localStorage.setItem("loggedInUser", user);
    setLoggedIn(true);
    setUsername(user);
    notifyLogin(user); // Notify backend
  };

  const handleLogout = () => {
    // Remove user from cookies and set logged out
    localStorage.removeItem("loggedInUser");
    setLoggedIn(false);
    setUsername("");
  };

  const notifyLogin = async (username: string): Promise<void> => {
    try {
      const response = await fetch(`/f-api/v1/notify-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data: LoginResponse = await response.json();
      if (data.message) {
        console.log(data.message); // Success message
      } else if (data.error) {
        console.error("Error notifying login:", data.error); // Error handling
      }
    } catch (error) {
      console.error("Error notifying login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-3 border-r border-gray-200 dark:border-gray-600 fixed w-full bg-slate-100 dark:bg-gray-800 lg:sticky top-0 z-10">
      <div className="flex lg:flex-col items-center justify-between w-full p-1 px-4 lg:p-0">
        <div className="text-center lg:mt-3">
          <Link href="/" className="dashboardOption">
            <h1 className="text-blue-900 dark:text-blue-300 text-3xl font-bold">
              Hanabira 花びら
            </h1>
          </Link>
          <p className="hidden lg:flex ml-3 text-blue-900/60 dark:text-blue-300/60">
            hanabira.org
          </p>
          <p className=" lg:flex ml-3 text-blue-900/60 dark:text-blue-300/60 text-left">
            Public Alpha v0.3.1
          </p>
          <p className="lg:hidden mt-2 ml-3 text-sm text-blue-900/60 dark:text-blue-300/60">
            Your journey to Japanese fluency (JLPT N5-N1).
          </p>
        </div>

        <div className="hidden lg:flex flex-col w-full">
          <div className="flex flex-col items-center justify-center space-y-4 mt-4">
            {/* Conditionally render login/logout button based on login status */}
            {loggedIn ? (
              <div className="text-center">
                <p className="text-lg font-bold text-primary dark:text-white mb-2">
                  Welcome, {username}!
                </p>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white font-bold text-lg rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-slate-500 text-white font-bold text-lg rounded hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              >
                Login
              </button>
            )}
          </div>

          <div className="flex flex-col w-full mt-20">
            <Link href="/" className="dashboardOption">
              Home
            </Link>
            <Link href="/about" className="dashboardOption">
              About
            </Link>
            <Link href="/user-dashboard" className="dashboardOption">
              User Dashboard
            </Link>
            <Link href="/blog" className="dashboardOption">
              Blog
            </Link>
            <Link href="/japanese/kanji" className="dashboardOption">
              Kanji
            </Link>
            <Link href="/japanese/reading" className="dashboardOption">
              Reading
            </Link>
            <Link href="/japanese/grammarlist" className="dashboardOption">
              JLPT Grammar List
            </Link>
            <Link
              href="/japanese/vocabulary_selection/essential_verbs"
              className="dashboardOption"
            >
              Essential Japanese verbs
            </Link>

            <Link href="/japanese/flashcards-kanji" className="dashboardOption">
              SRS Flashcards - Kanji
            </Link>
            <Link href="/japanese/flashcards-words" className="dashboardOption">
              SRS Flashcards - Vocabulary
            </Link>

            <Link href="/japanese/reading" className="dashboardOption">
              Japanese Reading
            </Link>
            <br></br>
            <hr />
            <br></br>
            <Link
              href="/langs/vietnamese/grammarlist"
              className="dashboardOption"
            >
              Vietnamese Grammar
            </Link>
            <Link
              href="/langs/mandarin/grammarlist"
              className="dashboardOption"
            >
              Chinese Grammar
            </Link>
            <Link href="/langs/korean/grammarlist" className="dashboardOption">
              Korean Grammar
            </Link>
            <Link href="/langs/thai/grammarlist" className="dashboardOption">
              Thai Grammar
            </Link>
          </div>
        </div>
        <div>
          {/* Conditionally render login/logout button based on login status */}
          {loggedIn ? (
            <div>
              <p className="block text-primary dark:text-white text-lg font-bold lg:hidden focus:outline-none">
                {username}
              </p>
              <button
                onClick={handleLogout}
                className="block text-primary dark:text-white text-lg font-bold lg:hidden focus:outline-none"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="block text-primary dark:text-white text-lg font-bold lg:hidden focus:outline-none"
            >
              Login
            </button>
          )}
        </div>
        <div>
          <button
            onClick={showMenu}
            className="block text-primary dark:text-white text-lg font-bold lg:hidden focus:outline-none"
          >
            {active ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>
      {/* Phone Bar */}
      <div
        id="menu"
        className={
          active
            ? "relative lg:hidden mt-6 text-l w-11/12 text-black dark:text-white rounded-lg flex-auto h-screen"
            : "hidden"
        }
      >
        <div
          className="ml-2 p-1 border-2 h-9 w-9 flex items-center justify-center rounded-full cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        >
          {/* Display SunIcon or MoonIcon based on darkMode */}
          {darkMode ? <MoonIcon /> : <SunIcon />}
        </div>

        {/* <div className="flex flex-col justify-center text-start mt-6">
          <Link onClick={showMenu} className="border-b py-4 text-black dark:text-white" href="/"> Home </Link>
          <Link onClick={showMenu} className="border-b py-4 text-black dark:text-white" href="/about"> About </Link>
          <Link onClick={showMenu} className="border-b py-4 text-black dark:text-white" href="/blog"> Blog </Link>
          <Link onClick={showMenu} className="border-b py-4 text-black dark:text-white" href="/japanese/kanji"> Kanji </Link>
          <Link onClick={showMenu} className="border-b py-4 text-black dark:text-white" href="/japanese/vocabulary_selection/JLPT_N3"> Vocabulary JLPT N3 </Link>
          <Link onClick={showMenu} className="border-b py-4 text-black dark:text-white" href="/japanese/grammarlist"> JLPT Grammar List </Link>
          <Link onClick={showMenu} className="border-b py-4 text-black dark:text-white" href="/japanese/vocabulary_selection/essential_verbs"> Essential Japanese verbs </Link>
          <div className="flex flex-col text-center mt-16">
            <Link href="/" className="py-3 px-8 border text-primary font-medium border-primary dark:border-white dark:text-white rounded-md"> Logout </Link>
          </div>
        </div> */}

        <div className="grid grid-cols-2 gap-4 p-4">
          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/"
          >
            {" "}
            Home{" "}
          </Link>
          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/about"
          >
            {" "}
            About{" "}
          </Link>
          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/blog"
          >
            {" "}
            Blog{" "}
          </Link>
          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/japanese/kanji"
          >
            {" "}
            Kanji{" "}
          </Link>
          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/japanese/vocabulary_selection/JLPT_N3"
          >
            {" "}
            Vocabulary JLPT N3{" "}
          </Link>
          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/japanese/grammarlist"
          >
            {" "}
            JLPT Grammar List{" "}
          </Link>
          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/japanese/vocabulary_selection/essential_verbs"
          >
            {" "}
            Essential Japanese verbs{" "}
          </Link>

          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/japanese/flashcards-kanji"
          >
            {" "}
            Kanji flashcards{" "}
          </Link>

          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/japanese/flashcards-words"
          >
            {" "}
            Vocabulary flashcards{" "}
          </Link>

          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/japanese/reading"
          >
            {" "}
            Japanese reading{" "}
          </Link>

          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/japanese/kana"
          >
            {" "}
            Kana{" "}
          </Link>

          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/japanese/quick_kanji"
          >
            {" "}
            Quick Kanji{" "}
          </Link>

          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/japanese/quick_vocab"
          >
            {" "}
            Quick Vocabulary{" "}
          </Link>

          <Link
            onClick={showMenu}
            className="border-b py-2 text-black dark:text-white"
            href="/user-dashboard"
          >
            {" "}
            User Dashboard{" "}
          </Link>


          {/* Add empty div if you have an odd number of links to maintain the structure */}
          <div></div>
        </div>
        <div className="flex justify-center mt-16">
          <Link
            href="/"
            className="py-3 px-8 border text-primary font-medium border-primary dark:border-white dark:text-white rounded-md"
          >
            {" "}
            Logout{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

// SunIcon component
const SunIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
};

// MoonIcon component
const MoonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
};
