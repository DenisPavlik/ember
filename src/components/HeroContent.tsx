"use client";
import { motion, type Variants } from "framer-motion";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroContent() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="pt-4 md:pt-10">
        <p className="text-emerald-600">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} />
          ))}
        </p>
        <p className="mt-2 text-gray-600">Loved by 1,000,000+ creators</p>
      </motion.div>
      <motion.h1
        variants={item}
        className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mt-8 md:mt-12"
      >
        Fund your <br />
        creative works
      </motion.h1>
      <motion.h2 variants={item} className="mt-4 mb-8 md:mb-12 text-base md:text-lg">
        Accept support for your work. <br />
        It&apos;s easier than you think.
      </motion.h2>
      <motion.div variants={item}>
        <Link
          href="/profile"
          className="inline-block bg-yellow-300 px-8 py-4 text-xl font-bold rounded-full
            hover:bg-yellow-300/60 duration-300 hover:scale-105"
        >
          Start my page
        </Link>
      </motion.div>
      <motion.p variants={item} className="mt-8 text-sm">
        It&apos;s free and takes less than a minute!
      </motion.p>
    </motion.div>
  );
}
