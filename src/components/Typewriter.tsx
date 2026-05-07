"use client";
import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  showCursor?: boolean;
  blinkOnDone?: boolean;
  onDone?: () => void;
  className?: string;
}

export default function Typewriter({
  text,
  speed = 60,
  startDelay = 0,
  showCursor = true,
  blinkOnDone = true,
  onDone,
  className = "",
}: TypewriterProps) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay, onDone]);

  return (
    <span className={className}>
      {shown}
      {showCursor && !(done && !blinkOnDone) && (
        <span
          className={`inline-block ml-0.5 ${done ? "animate-blink" : ""}`}
          aria-hidden
        >
          |
        </span>
      )}
    </span>
  );
}
