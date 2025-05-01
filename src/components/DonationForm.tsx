"use client";

import createDonation from "@/actions/donationActions";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function DonationForm({email}: {email: string}) {
  const [numberInValue, setNumberInValue] = useState("");
  const [amount, setAmount] = useState(1);
  const [crypto, setCrypto] = useState("btc");

  useEffect(() => {
    if (numberInValue) {
      const intValue = parseInt(numberInValue);
      if (intValue > 5 && intValue <= 1000) {
        setAmount(intValue);
      } else if (intValue === 1 || intValue === 3 || intValue === 5) {
        setAmount(intValue);
      } else {
        setAmount(1);
      }
    }
  }, [numberInValue]);

  async function handleFormSubmit (formData: FormData) {
    formData.set('amount', amount.toString())
    formData.set('crypto', crypto)
    formData.set('email', email)
    const url = await createDonation(formData)
    if (!url) {
      return
    }
    if (window && window.location) {
      window.location.href = url;
    }
  }

  return (
    <form action={handleFormSubmit}>
      <div className="border border-yellow-300 bg-yellow-300/10 rounded-xl p-4 flex gap-2 items-center">
        <FontAwesomeIcon icon={faCoffee} />
        <span>x</span>
        <button
          type="button"
          onClick={() => {
            setAmount(1);
            setNumberInValue("1");
          }}
          className={"amount " + (amount === 1 ? "active" : "")}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => {
            setAmount(3);
            setNumberInValue("3");
          }}
          className={"amount " + (amount === 3 ? "active" : "")}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => {
            setAmount(5);
            setNumberInValue("5");
          }}
          className={"amount " + (amount === 5 ? "active" : "")}
        >
          5
        </button>
        <input
          className="w-12 h-12 border border-yellow-300 rounded-xl text-center"
          placeholder="10"
          type="number"
          value={numberInValue}
          onChange={(e) => setNumberInValue(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <input type="text" name="name" placeholder="Your name" required />
      </div>
      <div className="mt-2">
        <textarea name="message" placeholder="Say something nice"></textarea>
      </div>
      <div className="mt-2">
        <h3 className="text-xs mb-1 text-gray-500">Pay with selected crypto or credit card</h3>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setCrypto("btc")}
          className={"crypto " + (crypto === "btc" ? "active" : "")}
        >
          <span>BTC</span>
          <p>Bitcoin</p>
        </button>
        <button
          type="button"
          onClick={() => setCrypto("eth")}
          className={"crypto " + (crypto === "eth" ? "active" : "")}
        >
          <span>ETH</span>
          <p>Ethereum</p>
        </button>
        <button
          type="button"
          onClick={() => setCrypto("ltc")}
          className={"crypto " + (crypto === "ltc" ? "active" : "")}
        >
          <span>LTC</span>
          <p>Litecoin</p>
        </button>
      </div>
      </div>
      <div className="mt-2">
        <button className="bg-yellow-300 w-full py-2 rounded-xl font-semibold">
          Support ${amount * 5}
        </button>
      </div>
    </form>
  );
}
