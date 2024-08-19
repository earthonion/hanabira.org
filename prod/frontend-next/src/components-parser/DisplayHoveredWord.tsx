"use client";

import React, { useState, useEffect } from "react";

// New separate component for displaying the hovered word
interface DisplayHoveredWordProps {
    hoveredWord: string | null;
  }
  
  const DisplayHoveredWord: React.FC<DisplayHoveredWordProps> = ({
    hoveredWord,
  }) => {
    return (
      <div className="bg-white p-4 shadow-lg rounded-md text-black mb-4 w-full">
        <div>Hovered Word: {hoveredWord || "Hover over a word..."}</div>
      </div>
    );
  };

export default DisplayHoveredWord;