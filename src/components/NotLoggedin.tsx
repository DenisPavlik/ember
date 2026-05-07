"use client";

import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function NotLoggedin() {
  return (
    <section className="max-w-md mx-auto px-4 mt-16">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
        <div
          className="size-16 mx-auto rounded-full bg-yellow-300/30
          flex items-center justify-center text-yellow-600 mb-4"
        >
          <FontAwesomeIcon icon={faMugHot} className="text-2xl" />
        </div>

        <h1 className="font-display text-3xl tracking-tight">
          Sign in to Ember
        </h1>
        <p className="text-gray-500 mt-2">
          Log in to manage your creator profile, share your page, and track
          supporters.
        </p>

        <button
          onClick={() => signIn("google")}
          className="mt-6 w-full bg-yellow-300 hover:bg-yellow-400
          rounded-lg py-3 px-4 flex items-center justify-center gap-3
          font-medium transition-colors"
        >
          <FontAwesomeIcon icon={faGoogle} />
          Continue with Google
        </button>

        <p className="text-xs text-gray-400 mt-4">
          By signing in you agree to be a lovely human being.
        </p>
      </div>

      <div className="text-center mt-4">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
