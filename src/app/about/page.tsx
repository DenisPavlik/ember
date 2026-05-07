"use client";
import Typewriter from "@/components/Typewriter";
import { motion } from "framer-motion";
import { useState } from "react";

const paragraphs = [
  `Ember was built out of a simple frustration: existing monetization platforms were either too complex, took too large a cut, or locked creators into ecosystems that didn't serve them. We wanted something different — a direct, honest way for supporters to say "your work matters to me."`,
  `The name comes from the idea of keeping a creative spark alive. A single ember can reignite a fire. A single supporter, at the right moment, can give a creator the motivation to keep going. That's what Ember is about.`,
  `We support cryptocurrency donations because we believe in giving creators and their audiences freedom of choice. No gatekeepers, no unnecessary middlemen — just a straightforward connection between creators and the people who value their work.`,
  `Keep the spark alive.`,
];

const TYPE_SPEED = 18;
const PARAGRAPH_PAUSE = 700;

export default function AboutPage() {
  const [active, setActive] = useState(0);

  const handleDone = () => {
    if (active < paragraphs.length - 1) {
      setTimeout(() => setActive((a) => a + 1), PARAGRAPH_PAUSE);
    }
  };

  return (
    <section className="font-typewriter">
      <div className="max-w-2xl mx-auto mt-10">
        <div className="flex flex-col text-center gap-8">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl"
          >
            Our Story.
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="block italic"
          >
            We believe everyone is a creator. Our goal is to help creators earn
            from their craft — one supporter at a time.
          </motion.span>
        </div>

        <div className="flex flex-col gap-8 my-10 leading-7 text-black mx-4 md:mx-0">
          {paragraphs.map((p, i) => {
            if (i > active) return null;
            const text = i === 0 ? p.slice(1) : p;
            const isLast = i === paragraphs.length - 1;
            return (
              <p key={i}>
                {i === 0 && (
                  <span className="text-5xl font-medium float-left mr-2 leading-none">
                    E
                  </span>
                )}
                {i < active ? (
                  text
                ) : (
                  <Typewriter
                    text={text}
                    speed={TYPE_SPEED}
                    startDelay={i === 0 ? 800 : 0}
                    showCursor
                    blinkOnDone={isLast}
                    onDone={handleDone}
                  />
                )}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
