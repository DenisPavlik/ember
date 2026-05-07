"use client";

import {
  faFire,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Users = {
  username: string;
  displayName?: string;
  avatarUrl?: string;
};

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [users, setUsers] = useState<Users[]>([]);

  const searchUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(userName.toLowerCase()) ||
      user.displayName?.toLowerCase().includes(userName.toLowerCase())
  );

  useEffect(() => {
    fetch("/api/users", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data: Users[]) => {
        setUsers([...data].sort(() => 0.5 - Math.random()));
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      // Focus trap: cycle Tab navigation within the modal
      if (event.key === "Tab" && wrapperRef.current) {
        const focusable = wrapperRef.current.querySelectorAll<HTMLElement>(
          'input, button, a, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      // Return focus to the trigger button when modal closes
      triggerRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Search creators"
        aria-expanded={isOpen}
        className="flex items-center gap-2 bg-gray-100 py-2 px-3 md:px-4 rounded-full
            text-gray-500 text-xs md:text-base text-nowrap hover:cursor-text"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span>Search creators</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 px-4 pt-20 md:pt-32 overflow-y-auto"
          >
            <motion.div
              ref={wrapperRef}
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-white max-w-lg w-full mx-auto rounded-xl shadow-xl flex flex-col max-h-[calc(100vh-6rem)] md:max-h-[calc(100vh-10rem)] overflow-hidden"
            >
              <div className="flex items-center gap-2 bg-gray-100 rounded-t-xl px-4 py-3 text-gray-400">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                  ref={inputRef}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder="Search creators"
                  aria-label="Search creators"
                  className="flex-1 min-w-0 border-none bg-transparent outline-none focus:ring-0 text-black"
                />
                {userName && (
                  <button
                    type="button"
                    onClick={() => setUserName("")}
                    aria-label="Clear search"
                    className="text-gray-500 hover:text-black"
                  >
                    <FontAwesomeIcon className="w-4 h-4" icon={faXmark} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close search"
                  className="text-gray-500 hover:text-black ml-1"
                >
                  <FontAwesomeIcon className="w-5 h-5" icon={faXmark} />
                </button>
              </div>
              <div className="px-4 md:px-6 py-4 flex flex-col gap-2 overflow-y-auto">
                {!userName && (
                  <span className="text-xs text-amber-600">
                    <FontAwesomeIcon icon={faFire} /> Trending
                  </span>
                )}
                <div className="flex flex-col gap-1">
                  {(userName ? searchUsers : users).slice(0, 10).map((user, index) => (
                    <Link
                      href={`/${user.username}`}
                      key={user.username}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {!userName && (
                        <span className="text-xs text-gray-400 w-5 shrink-0">
                          #{index + 1}
                        </span>
                      )}
                      <Image
                        src={user.avatarUrl || "/images/avatar.png"}
                        width={40}
                        height={40}
                        alt={user.displayName || user.username}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                      <span className="truncate">
                        {user.displayName || user.username}
                      </span>
                    </Link>
                  ))}
                  {(userName ? searchUsers : users).length === 0 && (
                    <p className="text-sm text-gray-400 px-2 py-4">Nothing found</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
