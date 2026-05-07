"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faYoutube,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const CONTACT_EMAIL = "hello@ember.cc";

const topics: { label: string; emoji: string; subject: string }[] = [
  { label: "Bug report", emoji: "🐛", subject: "Bug report" },
  { label: "Feature idea", emoji: "💡", subject: "Feature idea" },
  { label: "Partnership", emoji: "🤝", subject: "Partnership inquiry" },
  { label: "Just saying hi", emoji: "👋", subject: "Hello!" },
];

const socials: {
  href: string;
  icon: IconDefinition;
  label: string;
  hoverClass: string;
}[] = [
  {
    href: "https://www.facebook.com/",
    icon: faFacebook,
    label: "Facebook",
    hoverClass: "hover:text-blue-600",
  },
  {
    href: "https://linkedin.com/",
    icon: faLinkedin,
    label: "LinkedIn",
    hoverClass: "hover:text-sky-700",
  },
  {
    href: "https://www.youtube.com/",
    icon: faYoutube,
    label: "YouTube",
    hoverClass: "hover:text-red-600",
  },
  {
    href: "https://www.instagram.com/",
    icon: faInstagram,
    label: "Instagram",
    hoverClass: "hover:text-pink-600",
  },
  {
    href: "https://www.tiktok.com/en/",
    icon: faTiktok,
    label: "TikTok",
    hoverClass: "hover:text-black",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ContactPage() {
  const mailto = (subject: string) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

  return (
    <section>
      <div className="max-w-2xl mx-auto mt-16 px-4 text-center">
        <motion.h1
          {...fadeUp(0)}
          className="font-display text-4xl md:text-6xl font-semibold tracking-tight"
        >
          Hi! How can we help?
        </motion.h1>
        <motion.p
          {...fadeUp(0.15)}
          className="mt-4 text-gray-600 md:text-lg"
        >
          Pick a topic and we&apos;ll get back to you within 48 hours.
        </motion.p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {topics.map((t, i) => (
            <motion.a
              key={t.label}
              href={mailto(t.subject)}
              {...fadeUp(0.25 + i * 0.08)}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-6 text-sm font-semibold transition-shadow hover:shadow-md hover:border-gray-300"
            >
              <span className="text-3xl transition-transform group-hover:scale-110">
                {t.emoji}
              </span>
              <span>{t.label}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          {...fadeUp(0.6)}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-display text-lg md:text-xl underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-sm text-gray-500">or DM us anywhere ↓</p>
        </motion.div>

        <div className="mt-6 flex justify-center gap-8">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              {...fadeUp(0.7 + i * 0.06)}
              whileHover={{ y: -4 }}
              className={`text-gray-500 transition-colors ${s.hoverClass}`}
            >
              <FontAwesomeIcon className="h-7" icon={s.icon} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
