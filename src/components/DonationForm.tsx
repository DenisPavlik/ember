"use client";

import createDonation from "@/actions/donationActions";
import { COFFEE_PRICE } from "@/lib/config";
import {
  faCircleNotch,
  faLitecoinSign,
  faMugHot,
} from "@fortawesome/free-solid-svg-icons";
import { faBitcoin, faEthereum } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MESSAGE_MAX = 500;
const AMOUNT_MIN = 1;
const AMOUNT_MAX = 1000;
const QUICK_AMOUNTS = [1, 3, 5];

const CRYPTO_OPTIONS: {
  id: "btc" | "eth" | "ltc";
  label: string;
  name: string;
  icon: IconDefinition;
}[] = [
  { id: "btc", label: "BTC", name: "Bitcoin", icon: faBitcoin },
  { id: "eth", label: "ETH", name: "Ethereum", icon: faEthereum },
  { id: "ltc", label: "LTC", name: "Litecoin", icon: faLitecoinSign },
];

function coffeesLabel(n: number) {
  return n === 1 ? "coffee" : "coffees";
}

export default function DonationForm({ email }: { email: string }) {
  const [numberInValue, setNumberInValue] = useState("");
  const [amount, setAmount] = useState(1);
  const [crypto, setCrypto] = useState<"btc" | "eth" | "ltc">("btc");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedCustom = parseInt(numberInValue);
  const customValid =
    numberInValue !== "" &&
    !isNaN(parsedCustom) &&
    parsedCustom >= AMOUNT_MIN &&
    parsedCustom <= AMOUNT_MAX;
  const customInvalid = numberInValue !== "" && !customValid;

  useEffect(() => {
    if (customValid) setAmount(parsedCustom);
  }, [parsedCustom, customValid]);

  function selectQuickAmount(n: number) {
    setAmount(n);
    setNumberInValue("");
  }

  async function handleFormSubmit(formData: FormData) {
    formData.set("amount", amount.toString());
    formData.set("crypto", crypto);
    formData.set("email", email);
    setIsSubmitting(true);
    try {
      const url = await createDonation(formData);
      if (!url) {
        toast.error("Could not create donation. Please check your input.");
        return;
      }
      window.location.href = url;
    } catch (e: any) {
      toast.error(e.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleFormSubmit}>
      <h2 className="font-display text-2xl tracking-tight">Buy a coffee</h2>
      <p className="text-sm text-gray-500 mt-1">
        Support the creator with a one-off crypto tip.
      </p>

      <div className="mt-4">
        <label className="input-label !mt-0">Amount</label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {QUICK_AMOUNTS.map((n) => {
            const active = amount === n && numberInValue === "";
            return (
              <button
                key={n}
                type="button"
                onClick={() => selectQuickAmount(n)}
                aria-label={`${n} ${coffeesLabel(n)}`}
                aria-pressed={active}
                className={`group flex flex-col items-center justify-center gap-1
                py-3 rounded-xl border-2 transition-colors
                ${
                  active
                    ? "border-yellow-400 bg-yellow-300/20"
                    : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-300/5"
                }`}
              >
                <div className="flex items-center gap-0.5 text-yellow-600">
                  {Array.from({ length: n }).map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faMugHot} className="text-sm" />
                  ))}
                </div>
                <div className="font-semibold leading-none">
                  ${n * COFFEE_PRICE}
                </div>
                <div className="text-xs text-gray-500 leading-none">
                  {n} {coffeesLabel(n)}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 my-3 text-xs text-gray-400 uppercase tracking-wide">
          <div className="h-px bg-gray-200 flex-1" />
          <span>or enter custom</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <FontAwesomeIcon icon={faMugHot} />
          </span>
          <input
            type="number"
            placeholder="e.g. 10"
            min={AMOUNT_MIN}
            max={AMOUNT_MAX}
            value={numberInValue}
            onChange={(e) => setNumberInValue(e.target.value)}
            aria-invalid={customInvalid}
            aria-label="Custom coffee amount"
            className={`block w-full border rounded-md p-2 pl-9 pr-20 ${
              customInvalid ? "border-red-500 bg-red-50" : ""
            }`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wide text-gray-400 pointer-events-none">
            coffees
          </span>
        </div>

        <div className="text-xs mt-1 ml-1 h-4">
          {customValid && (
            <span className="text-gray-500">
              = ${parsedCustom * COFFEE_PRICE} total
            </span>
          )}
          {customInvalid && (
            <span className="text-red-500">
              Amount must be between {AMOUNT_MIN} and {AMOUNT_MAX}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="input-label !mt-0">Your details</label>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          maxLength={100}
        />
        <textarea
          name="message"
          placeholder="Say something nice (optional)"
          maxLength={MESSAGE_MAX}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2"
        ></textarea>
        <div
          className={`text-xs mt-1 ml-1 text-right ${
            message.length >= MESSAGE_MAX ? "text-red-500" : "text-gray-400"
          }`}
        >
          {message.length} / {MESSAGE_MAX}
        </div>
      </div>

      <div className="mt-2">
        <label className="input-label">Payment method</label>
        <div className="grid grid-cols-3 gap-1 mt-1">
          {CRYPTO_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setCrypto(opt.id)}
              aria-pressed={crypto === opt.id}
              className={"crypto " + (crypto === opt.id ? "active" : "")}
            >
              <span className="flex items-center justify-center gap-1.5">
                <FontAwesomeIcon icon={opt.icon} />
                {opt.label}
              </span>
              <p>{opt.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <button
          disabled={customInvalid || isSubmitting}
          className="bg-yellow-300 hover:bg-yellow-400 w-full py-3 rounded-xl
          font-semibold flex items-center justify-center gap-2
          disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
              Processing…
            </>
          ) : (
            <>Support ${amount * COFFEE_PRICE}</>
          )}
        </button>
      </div>
    </form>
  );
}
