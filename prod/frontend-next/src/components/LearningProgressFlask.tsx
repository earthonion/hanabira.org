"use client";

import { useState, useEffect, FC } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

interface ProgressData {
  _id: string;
  question: string;
  answer: string;
  difficulty?: "easy" | "medium" | "hard" | "unknown";
}

interface DifficultyCounts {
  easy: number;
  medium: number;
  hard: number;
  unknown: number;
}

interface LearningProgressProps {
  userId: string;
  collectionName: string;
  p_tag: string;
  s_tag: string;
}

const LearningProgress: FC<LearningProgressProps> = ({
  userId,
  collectionName,
  p_tag,
  s_tag,
}) => {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [difficultyCounts, setDifficultyCounts] = useState<DifficultyCounts>({
    easy: 0,
    medium: 0,
    hard: 0,
    unknown: 0,
  });

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // TODO: expand with tags and collection name
        const response = await axios.get<ProgressData[]>(
          `http://localhost:5100/f-api/v1/flashcard/${userId}?collectionName=${collectionName}&p_tag=${p_tag}&s_tag=${s_tag}`
        );
        setProgressData(response.data);
      } catch (error) {
        console.log("Failed to fetch learning progress data:", error);
      }
    };

    fetchProgressData();
  }, [userId]);

  useEffect(() => {
    const countDifficultyOccurrences = () => {
      const counts: DifficultyCounts = {
        easy: 0,
        medium: 0,
        hard: 0,
        unknown: 0,
      };

      progressData.forEach((data) => {
        const difficulty = data.difficulty || "unknown";
        if (difficulty in counts) {
          counts[difficulty] += 1;
        }
      });

      setDifficultyCounts(counts);
    };

    countDifficultyOccurrences();
  }, [progressData]);

  const difficultyLabels = Object.keys(difficultyCounts);
  const difficultyValues = Object.values(difficultyCounts);

  return (
    <div>
      {/* <h2>Learning Progress</h2>
      {progressData.map((data) => (
        <div key={data._id}>
          <p>Question: {data.question}</p>
          <p>Answer: {data.answer}</p>
          <p>Difficulty: {data.difficulty}</p>
        </div>
      ))} */}

      <h2>Difficulty Counts</h2>
      <Plot
        data={[
          {
            x: difficultyLabels,
            y: difficultyValues,
            type: "bar",
            marker: { color: ["#99c2e8", "#bdd7ee", "#d3e1f3", "#e8eff8"] },
          },
        ]}
        layout={{ title: "Difficulty Counts", yaxis: { title: "Count" } }}
      />

      <h2>Difficulty Count Dictionary</h2>
      <pre>{JSON.stringify(difficultyCounts, null, 2)}</pre>
    </div>
  );
};

export default LearningProgress;
