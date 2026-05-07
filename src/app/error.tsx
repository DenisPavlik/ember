"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="max-w-md mx-auto text-center mt-24 px-4">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-gray-600 mt-2">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-block bg-yellow-300 px-6 py-3 mt-6 rounded-full font-semibold hover:bg-yellow-300/60 duration-300"
      >
        Try again
      </button>
    </section>
  );
}
