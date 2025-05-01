"use client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// export default function DonationStatus() {
//   const [show, setShow] = useState(false)
//   useEffect(()=>{
//     if (location.href.includes('?success=1') && !show) {
//       setShow(true)
//     }
//     if (show) {
//       toast.success('Thank for your donation')
//     }
//   }, [show])
//   return (
//     <>
//     </>
//   )
// }

// export default function DonationStatus() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [alreadyHandled, setAlreadyHandled] = useState(false);

//   useEffect(() => {
//     const success = searchParams.get('success');
//     if (success === '1' && !alreadyHandled) {
//       toast.success('🎉 Thank you for your donation!');
//       setAlreadyHandled(true);

//       setTimeout(() => {
//         router.replace(window.location.pathname);
//       }, 3000);
//     }
//   }, [searchParams, alreadyHandled, router]);

//   return null;
// }

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
        toast.success("🎉 Thank you for your donation!");
        router.replace(window.location.pathname);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [searchParams, router]);

  if (!showMessage) return null;

  return (
    <div className="absolute left-0 top-20 z-10 w-full h-full bg-gray-100">
      <div
      className="fixed top-40 left-1/2 -translate-x-1/2 bg-yellow-100 border
    border-yellow-300 text-yellow-800 px-6 py-3 rounded-xl shadow-lg flex
    items-center gap-4 z-50 animate-fade-in"
    >
      <span>Processing your payment...</span>
      <FontAwesomeIcon className="animate-spin w-5 h-5" icon={faSpinner} />
    </div>
    </div>
  );
}
