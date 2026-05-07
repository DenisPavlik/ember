"use client";
import { AnimatePresence, motion } from "framer-motion";
import { faChevronLeft, faChevronRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface Creator {
  img: string;
  description: string;
  supporters: string;
}

const AUTO_INTERVAL = 5000;

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: -dir * 80, opacity: 0 }),
};

function splitDescription(description: string) {
  const marker = " is creating ";
  const idx = description.indexOf(marker);
  if (idx === -1) return { name: description, bio: "" };
  return {
    name: description.slice(0, idx),
    bio: description.slice(idx + marker.length),
  };
}

export default function CreatorCarousel({ creators }: { creators: Creator[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = (next: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex(((next % creators.length) + creators.length) % creators.length);
  };

  const next = () => go(index + 1, 1);
  const prev = () => go(index - 1, -1);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % creators.length);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [index, creators.length, paused]);

  const c = creators[index];
  const { name, bio } = splitDescription(c.description);

  return (
    <div
      className="lg:hidden mt-12 mb-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative max-w-sm mx-auto px-12">
        <button
          onClick={prev}
          aria-label="Previous creator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border-2 border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-white transition-colors flex items-center justify-center z-10"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={next}
          aria-label="Next creator"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border-2 border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-white transition-colors flex items-center justify-center z-10"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        <div className="relative h-72 overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center gap-3 p-6 rounded-3xl bg-gradient-to-b from-amber-50 to-white shadow-lg ring-1 ring-amber-200/70"
            >
              <div className="rounded-full p-1 ring-2 ring-amber-300 bg-white">
                <Image
                  src={c.img}
                  alt={name}
                  width={72}
                  height={72}
                  className="w-18 h-18 rounded-full object-cover"
                />
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                {name}
              </h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed line-clamp-3">
                {bio}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                <FontAwesomeIcon icon={faHeart} />
                {c.supporters} supporters
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-1.5 mt-4">
          {creators.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Go to creator ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-amber-500" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
