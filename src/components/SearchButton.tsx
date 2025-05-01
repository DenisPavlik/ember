"use client";

import {
  faFire,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [users, setUsers] = useState<Users[]>([]);
  const searchUsers = users.filter((user) =>
    user.username.toLowerCase().includes(userName.toLowerCase()) ||
    user.displayName?.toLowerCase().includes(userName.toLowerCase())
  );

  useEffect(() => {
    fetch("/api/users")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch random users");
        }
        return res.json();
      })
      .then(setUsers)
      .catch((err) => {
        console.error(err);
      });

    function handleCkickOutside(event: MouseEvent) {
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
      }
    }

    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleCkickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleCkickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleCkickOutside);
      document.addEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-gray-100 py-2 px-4 rounded-full
            text-gray-500 ml-4 text-xs md:text-base text-nowrap hover:cursor-text"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span>Search creators</span>
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-50 px-4">
          <div
            ref={wrapperRef}
            className="relative bg-white mt-64 max-w-lg min-h-96 rounded-xl
        mx-auto w-full"
          >
            <div
              className="flex items-center gap-2 bg-gray-100 rounded-t-xl px-4 py-3
          text-gray-400"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                ref={inputRef}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Search creators"
                className="border-none bg-transparent outline-none focus:ring-0 text-black"
              />
              {userName && (
                <button type="button" onClick={() => setUserName("")}>
                  <FontAwesomeIcon className="w-5 h-5" icon={faXmark} />
                </button>
              )}
            </div>
            <div className="px-6 py-4 flex flex-col gap-2">
              {!userName && (
                <span className="text-xs text-amber-600">
                <FontAwesomeIcon icon={faFire} /> Trending
              </span>
              )}
              <div className="flex flex-col gap-2">
                {(userName ? searchUsers : [...users])
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 10)
                  .map((user, index) => (
                    <Link
                      href={`/${user.username}`}
                      key={user.username}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 px-2 overflow-auto hover:bg-gray-100
            duration-300 rounded-lg hover:cursor-pointer"
                    >
                      {!userName && <span className="text-xs">#{index + 1}</span>}
                      <Image
                        src={user.avatarUrl || "/images/avatar.png"}
                        width={1000}
                        height={1000}
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>{user.displayName || user.username}</span>
                    </Link>
                  ))}
                  {(userName ? searchUsers : users).length === 0 && (
  <p className="text-sm text-gray-400 px-2">Nothing found</p>
)}
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
              <FontAwesomeIcon
                className="absolute -right-16 -top-1 text-white h-8 w-8 p-2 hover:bg-gray-100/20
            rounded-full duration-300"
                icon={faXmark}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
