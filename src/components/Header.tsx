"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import { parseFullName } from "parse-full-name";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SearchButton from "./SearchButton";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ session }: { session: Session | null }) {
  const userAvatar = session?.user?.image as string;
  const name = session?.user?.name || "";
  const { first } = parseFullName(name);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden"
              aria-label="Open menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faBars} className="h-5 mt-3" />
            </button>
            <Link href={"/"} className="inline-flex items-center gap-1">
              <Image
                src="/images/logo.png"
                alt="Ember logo"
                width={80}
                height={80}
                priority
                className="h-14 w-auto sm:h-16"
              />
              <span className="mt-2 text-2xl sm:text-3xl text-nowrap hidden sm:inline-block font-display font-semibold tracking-tight">
                Ember
              </span>
            </Link>
          </div>
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="flex items-center justify-end gap-6 md:gap-10 mt-2 flex-1"
          >
            <div className="hidden md:flex items-center gap-6 lg:gap-10 md:text-lg text-sm font-semibold">
              <Link href={"/about"}>About</Link>
              <Link href={"/faq"}>FAQ</Link>
              <Link href={"/contact"}>Contact</Link>
            </div>

            <SearchButton />

            <div className="flex gap-2">
              {session ? (
                <Link
                  href={"/profile"}
                  className="bg-yellow-300 rounded-full flex items-center gap-2 p-1 pr-4"
                >
                  {userAvatar ? (
                    <Image
                      src={userAvatar}
                      alt="Your avatar"
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
                <div className="flex items-stretch rounded-full border border-amber-400 overflow-hidden divide-x divide-amber-400 whitespace-nowrap">
                  <button
                    onClick={() => signIn("google")}
                    className="px-3 md:px-5 py-1.5 md:py-2 text-sm md:text-base font-semibold transition-colors duration-300 hover:bg-amber-50"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => signIn("google")}
                    className="bg-amber-400 px-3 md:px-5 py-1.5 md:py-2 text-sm md:text-base font-semibold transition-colors duration-300 hover:bg-amber-500"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40"
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-gradient-to-b from-amber-50 to-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src="/images/logo.png"
                    alt="Ember logo"
                    width={48}
                    height={48}
                    className="h-10 w-auto"
                  />
                  <span className="text-2xl font-display font-semibold tracking-tight">
                    Ember
                  </span>
                </Link>
                <button
                  aria-label="Close menu"
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-5" />
                </button>
              </div>

              <motion.nav
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
                }}
                className="flex flex-col px-6 mt-4 divide-y divide-amber-200/60"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                    }}
                  >
                    <Link
                      href={link.href}
                      className="block py-4 font-display text-3xl font-semibold tracking-tight hover:text-amber-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-auto px-6 pb-8"
              >
                {session ? (
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-full bg-amber-400 hover:bg-amber-500 transition-colors p-1 pr-5"
                  >
                    {userAvatar ? (
                      <Image
                        src={userAvatar}
                        alt="Your avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    )}
                    <span className="font-semibold">
                      {first || "User"}&apos;s profile
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-stretch rounded-full border border-amber-400 overflow-hidden divide-x divide-amber-400">
                    <button
                      onClick={() => signIn("google")}
                      className="flex-1 px-4 py-3 font-semibold transition-colors hover:bg-amber-50"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => signIn("google")}
                      className="flex-1 bg-amber-400 px-4 py-3 font-semibold transition-colors hover:bg-amber-500"
                    >
                      Sign up
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
