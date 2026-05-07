"use client";

import { faCheck, faCopy, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ProfileLinkCard({ username }: { username: string }) {
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const fullUrl = `${origin}/${username}`;
  const displayUrl = origin
    ? fullUrl.replace(/^https?:\/\//, "")
    : `…/${username}`;

  async function handleCopy() {
    if (!origin) return;
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-4 my-4
      flex items-center justify-between gap-3"
    >
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-gray-500">
          Your public page
        </div>
        <a
          href={`/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium truncate block hover:underline"
        >
          {displayUrl}
        </a>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          type="button"
          onClick={handleCopy}
          className="bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2
          flex items-center gap-2 text-sm transition-colors"
        >
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          {copied ? "Copied" : "Copy"}
        </button>
        <a
          href={`/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-300 hover:bg-yellow-400 rounded-lg px-3 py-2
          flex items-center gap-2 text-sm transition-colors"
        >
          Visit
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </a>
      </div>
    </div>
  );
}
