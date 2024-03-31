import React from 'react';

interface CloneButtonProps {
  collection: string;
  level: string;
  userId: string;
}

const CloneButton: React.FC<CloneButtonProps> = ({collection, level, userId }) => {
  const handleButtonClick = async () => {

    // TODO: replace with env variable
    let url = 'http://localhost:5100/f-api/v1/';
    //const collection = 'kanji';

    switch (collection) {
      case 'kanji':
        url += 'clone-static-collection-kanji';
        break;
      case 'vocab':
        url += 'clone-static-collection-vocab';
        break;
      case 'grammar':
        url += 'clone-static-collection-grammar';
        break;
      default:
        console.error('Invalid collection type');
        return; // Exit the function if the collection type is not recognized
    }

    
    const data = {
      userId: userId,
      collection: collection,
      p_tag: level,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log('Success:', json);
      alert(`Cloned collection for ${level}`);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error cloning collection for ${level}`);
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className="bg-gray-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded m-2"
    >
      Clone Kanji {level}
    </button>
  );
};

export default CloneButton;
