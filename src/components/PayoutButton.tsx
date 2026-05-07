"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

export default function PayoutButton() {
  function handleClick() {
    toast(
      "Payouts go live once the Cryptomus integration is enabled. Coming soon.",
      { icon: "🚧", duration: 4000 }
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded-lg
      flex items-center gap-2 text-sm transition-colors"
    >
      Request a payout
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );
}
