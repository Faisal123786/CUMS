"use client";
import React, { useEffect, useState } from "react";

function TextChanger() {
  const words = ["Zakat", "Donation", "Sadkat"];
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const word = words[wordIndex];

    if (charIndex < word.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + word.charAt(charIndex));
        setCharIndex(charIndex + 1);
      }, 150); 

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        
        setWordIndex((prev) => (prev + 1) % words.length);
        setCharIndex(0);
        setCurrentText("");
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, wordIndex]);

  return (
    <p className="text-gray-500 mt-4 px-2 text-sm sm:text-base">
      Empowering Villages helps you make a lasting impact through{" "}
      <span className="font-semibold text-[#0f5ef7]">{currentText}</span>,
      meaningful giving, and community collaboration — all from one simple
      platform.
    </p>
  );
}

export default TextChanger;
