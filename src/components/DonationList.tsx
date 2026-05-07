"use client";
import { motion } from "framer-motion";
import { Donation } from "@/models/Donation";

export default function DonationList({ donations }: { donations: Donation[] }) {
  if (donations.length === 0) {
    return <p className="text-sm text-gray-500 mt-4">No recent donations</p>;
  }

  return (
    <div className="mt-2">
      {donations.map((donation, i) => (
        <motion.div
          key={donation._id}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
          className="py-2"
        >
          <h3>
            <span className="font-semibold">{donation.name}</span>{" "}
            <span className="text-gray-400">
              sent{" "}
              {donation.amount > 1 ? `${donation.amount} coffees` : "a coffee"}
            </span>
          </h3>
          {donation.message && (
            <p className="bg-gray-100 rounded-md p-2 mt-1">{donation.message}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
