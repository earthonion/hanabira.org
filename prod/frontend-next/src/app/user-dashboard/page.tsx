"use client";

import { useState } from "react";
import { useEffect } from "react";

// import LoginStreakGraph from "@/components/LoginStreakGraph";
// import LearningProgressFlask from "@/components/LearningProgressFlask";

import dynamic from "next/dynamic";

const LoginStreakGraph = dynamic(
  () => import("@/components/LoginStreakGraph"),
  {
    ssr: false,
  }
);

const LearningProgressFlask = dynamic(
  () => import("@/components/LearningProgressFlask"),
  {
    ssr: false,
  }
);

interface LoginData {
  date: string;
  count: number;
}

interface LoginResponse {
  message?: string;
  error?: string;
}

const loginData = [
  { date: "2024-02-01", count: 1 },
  { date: "2024-02-02", count: 2 },
  { date: "2024-02-03", count: 3 },
  { date: "2024-02-04", count: 4 },
  { date: "2024-02-05", count: 5 },
  // Add more data points here
];

export default function Home() {
  // const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("testUser"); // in prod we should look into local storage if there is anything and populate based on that
  // so checking local storage will be trigger for user dashboard

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
  // }, [darkMode]);

  // useEffect(() => {
  //   // if (darkMode) {
  //   //   document.documentElement.classList.add("dark");
  //   // } else {
  //   //   document.documentElement.classList.remove("dark");
  //   // }

  //   const fetchLoginStreakData = async () => {
  //     try {
  //       const response = await fetch(
  //         `/f-api/v1/get-logins/${username}`,
  //         { method: "GET" }
  //       );
  //       const data: LoginData[] = await response.json();
  //       console.log(data);
  //       setLoginStreakData(data);
  //     } catch (error) {
  //       console.error("Error fetching login streak data:", error);
  //     }
  //   };

  //   fetchLoginStreakData();
  // }, [username]); // You might want to adjust this dependency array based on your needs

  useEffect(() => {
    // Exit the hook if username is null, undefined, or an empty string
    if (!username) {
      return;
    }

    const fetchLoginStreakData = async () => {
      try {
        const response = await fetch(`/f-api/v1/get-logins/${username}`, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setLoginStreakData(data);
      } catch (error) {
        console.error("Error fetching login streak data:", error);
      }
    };

    fetchLoginStreakData();
  }, [username]); // This effect depends on 'username', so it will re-run when 'username' changes

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

  const fetchLoginHistory = async () => {
    const username = "testUser"; // Dynamically set this to the logged-in user's username
    try {
      const response = await fetch(`/f-api/v1/get-logins/${username}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setLoginHistory(data);
      // Use the data as needed
    } catch (error) {
      console.error("Error fetching login history:", error);
    }
  };

  const fetchLongestStreak = async () => {
    const username = "testUser"; // Adjust according to your app logic
    try {
      const response = await fetch(`/f-api/v1/streak/${username}`, {
        method: "GET",
      });
      const data = await response.json();
      if (data.longest_streak !== undefined) {
        setLongestStreak(data.longest_streak);
      } else {
        console.error("Could not fetch the longest streak", data.error);
      }
    } catch (error) {
      console.error("Error fetching the longest streak:", error);
    }
  };

  return (
    <div className="bg-gray-300 text-black dark:bg-gray-900 dark:text-white">
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="bg-gray-300 dark:bg-gray-900 min-h-screen relative">
        {/* <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded"
        >
          Toggle Theme
        </button> */}

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

        <button onClick={fetchLoginHistory}>Show Login History</button>
        <div>
          {loginHistory.map((login, index) => (
            <div
              key={index}
            >{`date: ${login.date}, count: ${login.count}`}</div>
          ))}
        </div>

        <br></br>
        <br></br>

        <div>
          {/* Other UI elements */}
          <button onClick={fetchLongestStreak}>Show Longest Streak</button>
          {longestStreak > 0 && <p>Longest Streak: {longestStreak} days</p>}
        </div>

        <br></br>
        <br></br>

        <div className="flex flex-col items-center px-2 py-4">
          <h1 className="text-lg font-bold mb-2">User Login Streak</h1>
          <div className="w-full">
            {" "}
            {/* <LoginStreakGraph data={loginData} /> this has static hardcoded data*/}
            <LoginStreakGraph data={loginStreakData} />
            {/* <LoginStreakGraph data={loginHistory} /> */}
          </div>
        </div>

        <div className="flex flex-col items-center px-2 py-4">
          <h1 className="text-lg font-bold mb-2">
            Deck learning progress (set of small cards with graphs, flex)
          </h1>

          <h1 className="text-xl font-bold mb-2">Kanji</h1>

          <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
            {["part_1", "part_2", "part_3", "part_4", "part_5", "part_6"].map(
              (part, index) => (
                <div
                  key={index}
                  className="w-full max-w-xs p-2 bg-white shadow-md rounded-lg"
                >
                  <LearningProgressFlask
                    userId="testUser"
                    collectionName="kanji"
                    p_tag="JLPT_N3"
                    s_tag={part}
                  />
                </div>
              )
            )}
          </div>

          <h1 className="text-xl font-bold mb-2">Vocabulary</h1>

          <h2 className="text-lg font-bold mb-2">Essential verbs</h2>

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
              <div
                key={index}
                className="w-full max-w-xs p-2 bg-white shadow-md rounded-lg"
              >
                <LearningProgressFlask
                  userId="testUser"
                  collectionName="words"
                  p_tag="essential_600_verbs"
                  s_tag={part}
                />
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold mb-2">Essential suru verbs</h2>

          <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
            {[
              "verbs-1",
              "verbs-2",
              "verbs-3",
              "verbs-4",
              "verbs-5",
              "verbs-6",
            ].map((part, index) => (
              <div
                key={index}
                className="w-full max-w-xs p-2 bg-white shadow-md rounded-lg"
              >
                <LearningProgressFlask
                  userId="testUser"
                  collectionName="words"
                  p_tag="suru_essential_600_verbs"
                  s_tag={part}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- OLD CODE -----------------------------

// const handleLogin = () => {
//   // Simulate login process, here you'd usually authenticate user credentials
//   const user = "testUser";
//
//   // Set logged in user to cookies
//   localStorage.setItem("loggedInUser", user);
//   setLoggedIn(true);
//   setUsername(user);
// };

// const loginData = [
//     { date: '2024-01-01', count: 5 },
//     { date: '2024-01-02', count: 4 },
//     { date: '2024-01-03', count: 2 },
//     { date: '2024-01-04', count: 5 },
//     { date: '2024-01-05', count: 3 },
//     { date: '2024-01-06', count: 4 },
//     { date: '2024-01-07', count: 0 },
//     { date: '2024-01-08', count: 4 },
//     { date: '2024-01-09', count: 5 },
//     { date: '2024-01-10', count: 3 },
//     { date: '2024-01-11', count: 1 },
//     { date: '2024-01-12', count: 1 },
//     { date: '2024-01-13', count: 5 },
//     { date: '2024-01-19', count: 1 },
//     { date: '2024-01-20', count: 2 },
//     { date: '2024-01-21', count: 1 },
//     { date: '2024-01-22', count: 4 },
//     { date: '2024-01-23', count: 1 },
//     { date: '2024-01-24', count: 4 },
//     { date: '2024-01-25', count: 2 },
//     { date: '2024-01-26', count: 1 },
//     { date: '2024-01-27', count: 0 },
//     { date: '2024-01-28', count: 5 },
//     { date: '2024-01-29', count: 2 },
//     { date: '2024-01-30', count: 1 }
//   ];
