"use client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DonationStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "1") {
      setShowMessage(true);
      const timeout = setTimeout(() => {
        setShowMessage(false);
        toast.success("Thank you for your support!");
        router.replace(window.location.pathname);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [searchParams, router]);

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-0 top-20 z-10 w-full h-full bg-gray-100/80"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-40 left-1/2 -translate-x-1/2 bg-yellow-100 border
              border-yellow-300 text-yellow-800 px-6 py-3 rounded-xl shadow-lg flex
              items-center gap-4 z-50"
          >
            <span>Processing your payment...</span>
            <FontAwesomeIcon className="animate-spin w-5 h-5" icon={faSpinner} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
