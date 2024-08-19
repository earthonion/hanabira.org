"use client";







interface DisplaySentenceProps {
    sentence: { original: string }[] | null;
  }
  
  const DisplaySentence: React.FC<DisplaySentenceProps> = ({ sentence }) => {
    return (
      <div className="bg-white p-4 shadow-lg rounded-md text-black mb-4 w-full">
        <div>
          Sentence:{" "}
          {sentence && sentence.length > 0
            ? sentence.map((word, index) => (
              <span key={index}>{word.original + " "}</span>
            ))
            : "Hover over a sentence to see it here."}
        </div>
  
        <p>add automatic sentence translation to furigana as well</p>
      </div>
    );
  };

  export default DisplaySentence;