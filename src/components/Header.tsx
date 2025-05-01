"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMugHot,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import { parseFullName } from "parse-full-name";
import Image from "next/image";
import { useState } from "react";
import SearchButton from "./SearchButton";

export default function Header({ session }: { session: Session | null }) {
  const userAvatar = session?.user?.image as string;
  const name = session?.user?.name || "";
  const { first } = parseFullName(name);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-white">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="sm:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faBars} className="h-5 mt-3" />
            </button>
            <Link href={"/"} className="inline-flex items-center gap-1">
              <FontAwesomeIcon
                icon={faMugHot}
                className="h-8 sm:mb-0 text-yellow-400"
              />
              <span className="mt-2 text-lg text-nowrap hidden sm:inline-block font-pacifico">
                Buy me a coffee
              </span>
            </Link>
          </div>
          <nav className="flex items-center justify-between mt-2">
            <div className="hidden sm:flex items-center gap-4 md:gap-8 md:text-lg text-sm font-semibold">
              <Link href={"/about"}>About</Link>
              <Link href={"/faq"}>FAQ</Link>
              <Link href={"/contact"}>Contact</Link>
            </div>

            <SearchButton />

            <div className="flex gap-4 ml-4">
              {session ? (
                <Link
                  href={"/profile"}
                  className="bg-yellow-300 rounded-full flex items-center gap-2 p-1 pr-4"
                >
                  {userAvatar ? (
                    <Image
                      src={userAvatar}
                      alt="avatar"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} />
                  )}
                  {first || "User"}
                </Link>
              ) : (
                <>
                  <button
                    className="border-2 rounded-full md:px-4 px-2 md:py-2 py-1 text-xs md:text-base"
                    onClick={() => signIn("google")}
                  >
                    Login
                  </button>
                  <button
                    className="bg-yellow-300 rounded-full md:px-4 px-2 md:py-2 py-1 text-xs md:text-base"
                    onClick={() => signIn("google")}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>

          <div
            className={`sm:hidden fixed top-0 left-0 w-full h-full bg-gray-100 z-20
              transform transition-transform duration-300
              ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="gap-4 flex flex-col items-start p-4 text-xl font-semibold">
              <button onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faXmark} className="h-5 mt-6" />
              </button>
              <Link href={"/about"} onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href={"/faq"} onClick={() => setIsOpen(false)}>
                FAQ
              </Link>
              <Link href={"/contact"} onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
