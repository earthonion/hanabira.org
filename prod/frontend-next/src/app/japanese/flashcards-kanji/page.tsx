"use client";

import ComplexFlashcardModal from "@/components/ComplexFlashcardModal";

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

export default function Flashcards() {
  return (
    <>

<br></br>
          <br></br>
          <br></br>
          <br></br>

      <div className="flex flex-wrap justify-center">
      {/* <div className="flex flex-wrap dark:bg-gray-900 dark:text-white"> */}



        {/* <div className="bg-gray-100 dark:bg-gray-900 min-h-screen relative">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div> */}

        <div>
          <ComplexFlashcardModal p_tag="JLPT_N3" s_tag="part_1" />
        </div>

        <div>
          <ComplexFlashcardModal p_tag="JLPT_N3" s_tag="part_2" />
        </div>

        <div>
          <ComplexFlashcardModal p_tag="JLPT_N3" s_tag="part_3" />
        </div>

        <div>
          <ComplexFlashcardModal p_tag="JLPT_N3" s_tag="part_4" />
        </div>

        <div>
          <ComplexFlashcardModal p_tag="JLPT_N3" s_tag="part_5" />
        </div>

        <div>
          <ComplexFlashcardModal p_tag="JLPT_N3" s_tag="part_6" />
        </div>

        <div>
          <ComplexFlashcardModal p_tag="JLPT_N4" s_tag="part_1" />
        </div>

        <div>
          <ComplexFlashcardModal p_tag="JLPT_N4" s_tag="part_2" />
        </div>

        <div>
          <ComplexFlashcardModal p_tag="JLPT_N4" s_tag="part_3" />
        </div>

        <div>
          <ComplexFlashcardModal p_tag="JLPT_N5" s_tag="part_1" />
        </div>



      </div>

      <br></br>
          <br></br>
      </>
  );
}
