// PlayAudioButton.tsx

'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';


interface PlayAudioButtonProps {
  audioSrc: string;
}

const PlayAudioButton: React.FC<PlayAudioButtonProps> = ({ audioSrc }) => {
  const handlePlayAudio = () => {
    const audio = new Audio(audioSrc);
    audio.play();
  };

  return (
    <button className="mr-2" onClick={handlePlayAudio}>
      <FontAwesomeIcon icon={faPlayCircle} />
    </button>
  );
};

export default PlayAudioButton;
