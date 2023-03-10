import { useState, useEffect } from "react";

const TextScramble = ({ text, scrambleColor, unscrambleColor }) => {
  const [scrambledText, setScrambledText] = useState("");
  const [originalText, setOriginalText] = useState("");

  useEffect(() => {
    setOriginalText(text);
  }, [text]);

  useEffect(() => {
    const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.<>,/?;':{}[]!@#$%^&*()_+=-~`;
    let frame = 0;
    let queue = [];

    for (let i = 0; i < originalText.length; i++) {
      const from = scrambledText[i] || "";
      const to = originalText[i];
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }

    const update = () => {
      let output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.1) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span class="dud" style="color: ${scrambleColor}">${char}</span>`;
        } else {
          output += from;
        }
      }

      setScrambledText(output);

      if (complete === queue.length) {
        document.querySelector(".textScramble").classList.remove("scrambling");
        document.querySelectorAll(".dud").forEach(dud => dud.style.color = unscrambleColor);
        return;
      }

      document.querySelector(".textScramble").classList.add("scrambling");

      frame++;
      requestAnimationFrame(update);
    };

    if (originalText !== "") {
      requestAnimationFrame(update);
    }

    return () => {
      setScrambledText("");
    };
  }, [originalText]);

  return (
    <span 
      className="textScramble"
      onMouseLeave={() => setOriginalText(scrambledText)}
      dangerouslySetInnerHTML={{ __html: scrambledText }}
    />
  );
};

export default TextScramble;
