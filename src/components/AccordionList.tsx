"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqItems = [
  {
    question: "Who uses Ember?",
    answer:
      "Anyone with an audience. YouTubers, musicians, podcasters, writers, programmers, artists, cosplayers — you name it. Ember is built for creators who want a direct, simple way to receive support from their community.",
  },
  {
    question: "How do I get paid?",
    answer:
      "You request a payout from your profile dashboard and our team processes it to your preferred wallet or account. We currently support cryptocurrency payouts.",
  },
  {
    question: "How can my audience pay?",
    answer:
      "Ember supports cryptocurrency payments including Bitcoin (BTC), Ethereum (ETH), and Litecoin (LTC). More payment methods are on the way.",
  },
  {
    question: "Is there a fee to use Ember?",
    answer:
      "Ember charges a small 5% platform fee per donation. There are no monthly fees and no hidden charges. We only make money when you do.",
  },
  {
    question: "Is Ember safe and reliable?",
    answer:
      "Yes. Payments are processed through a secure crypto payment gateway. Profile images and media are stored on AWS S3. Your account is protected by Google OAuth — we never store passwords.",
  },
  {
    question: "Do I have complete ownership of my supporters?",
    answer:
      "Absolutely. Your supporters are yours. Ember does not contact them on your behalf. You can see all donations and supporter messages directly in your profile dashboard.",
  },
  {
    question: "How is Ember different from other creator platforms?",
    answer:
      "Ember is focused on simplicity and crypto-native payments. No subscriptions, no complex tiers — just a clean profile page and a straightforward way for supporters to contribute.",
  },
  {
    question: "Can I build a serious income using Ember?",
    answer:
      "Ember is designed to be a reliable supplementary income stream for creators. As crypto adoption grows, so does the potential for meaningful support from a global audience.",
  },
  {
    question: "Who built Ember?",
    answer:
      "Ember is an independent project built by a developer who wanted a cleaner, crypto-friendly alternative to existing creator support platforms.",
  },
  {
    question: "How do I contact Ember support?",
    answer:
      "You can reach us through the Contact page. We aim to respond to all messages within 48 hours.",
  },
];

export default function AccordionList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col">
      {faqItems.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.07,
            }}
            className="border-b border-gray-200 last:border-b-0"
          >
            <button
              className="group w-full flex items-start gap-4 md:gap-6 py-5 text-left"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <span
                className={`font-display text-2xl md:text-3xl tracking-tight w-10 md:w-12 shrink-0 transition-colors ${
                  isOpen ? "text-orange-500" : "text-gray-300"
                } group-hover:text-orange-400`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2
                className={`flex-1 text-base md:text-lg font-medium transition-colors ${
                  isOpen ? "text-black" : "text-gray-800"
                }`}
              >
                {item.question}
              </h2>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="mt-1 text-gray-400"
                aria-hidden
              >
                <FontAwesomeIcon icon={faPlus} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pl-14 md:pl-[4.5rem] pr-8 text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
