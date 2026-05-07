import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <section className="max-w-md mx-auto text-center mt-24 px-4">
      <FontAwesomeIcon icon={faMugHot} className="h-16 text-yellow-400" />
      <h1 className="text-3xl font-bold mt-4">Page not found</h1>
      <p className="text-gray-600 mt-2">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-yellow-300 px-6 py-3 mt-6 rounded-full font-semibold hover:bg-yellow-300/60 duration-300"
      >
        Back home
      </Link>
    </section>
  );
}
