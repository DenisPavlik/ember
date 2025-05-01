"use client";

import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const faqItems = [
  {
    question: "Who uses Buy Me a Coffee?",
    answer:
      "Anyone with an audience. Youtubers, musicians, podcasters, writers, programmers, nonprofits, cosplayers, you name it. More than a million creators and their supporters are on Buy Me a Coffee.",
  },
  {
    question: "How do I get paid?",
    answer:
      "You get paid to your local bank account. We currently offer bank deposits to creators from over 110 countries.",
  },
  {
    question: "How can my audience pay?",
    answer:
      "We support all major credit and debit cards, Apple Pay, Google Pay, Cash App and other global payment methods.",
  },
  {
    question: "Is there a fee to use Buy Me a Coffee?",
    answer:
      `We do not charge a monthly fee. All features including publishing and emails are free for everyone. We charge a 5% transaction fee, and creators keep 95% of the earnings. We make money only when you do. We'll never show ads and we'll never sell your data.`,
  },
  {
    question: "Is Buy Me a Coffee safe and reliable?",
    answer:
      "We take security seriously. Here are some measures we've taken to protect your and your supporter's data. We securely process payments through Stripe and Wise without storing credit card data. Our platform runs on Amazon's robust infrastructure with added protection from Cloudflare, SSL encryption, and regular backups. We also operate a bug bounty program to quickly address any security issues.",
  },
  {
    question: "Do I have complete ownership of my supporters?",
    answer:
      "Yes, your supporters are strictly yours. We do not email them. You can export their list any time you like.",
  },
  {
    question: "How is this different from other platforms for creators?",
    answer:
      "With Buy Me a Coffee, you get everything you need to run your creative business. You don't have to worry about paying for and stitching together a dozen services, from sending emails to charging for subscriptions.",
  },
  {
    question: "Can I build a serious business using Buy Me a Coffee?",
    answer:
      "Yes, there are many creators earning a six-figure income on Buy Me a Coffee. We will grow with you.",
  },
  {
    question: "Who are you folks?",
    answer:
      "Buy Me a Coffee is one of the leading creator economy companies in the world. It was founded in the UK in 2017 by a team of creators who turned their passion into a platform. Buy Me a Coffee is backed by Y Combinator and Stripe.",
  },
  {
    question: "How do I contact Buy Me a Coffee?",
    answer:
      "You can email us at support@buymeacoffee.com, or leave us a message on the Intercom chat. We also respond to every feature request submitted.",
  },
];

export default function AccordionList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <div className="flex flex-col gap-4 px-2 md:px-0">
      {faqItems.map((item, index) => (
        <div className="bg-gray-200/60 px-6 py-4 rounded-2xl" key={index}>
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleAccordion(index)}
          >
            <h2 className="font-semibold text-base md:text-lg text-left">{item.question}</h2>
            <FontAwesomeIcon
              className={`text-gray-500 transform transition-transform
              duration-300 ${activeIndex === index ? '' : 'rotate-180'}`}
              icon={faAngleUp}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300
              ${activeIndex === index ? 'max-h-96 opacity-100 delay-200' : 'max-h-0 opacity-0'}`}
          >
            <p className="mt-4 text-gray-800">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
