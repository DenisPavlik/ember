import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faYoutube,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import SectionHeaders from "@/components/SectionHeaders";

export default function ContactPage() {
  return (
    <section>
      <div className="max-w-xl mx-auto mt-10">
        <SectionHeaders title="Contacts" subtitle="Feel free to reach out to us through our social media channels.
          We&apos;re always happy to connect and hear from you!" />
        <div className="flex justify-center gap-10 mt-8">
          <a href="https://www.facebook.com/" className="hover:-translate-y-2 duration-300">
            <FontAwesomeIcon className="h-10 text-blue-500 p-1" icon={faFacebook} />
          </a>
          <a href="https://linkedin.com/" className="hover:-translate-y-2 duration-300">
            <FontAwesomeIcon className="h-10 text-sky-600 p-1" icon={faLinkedin} />
          </a>
          <a href="https://www.youtube.com/" className="hover:-translate-y-2 duration-300">
            <FontAwesomeIcon className="h-10 text-red-500 p-1" icon={faYoutube} />
          </a>
          <a href="https://www.instagram.com/" className="hover:-translate-y-2 duration-300">
            <FontAwesomeIcon className="h-10 text-white py-1 px-1.5 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" icon={faInstagram} />
          </a>
          <a href="https://www.tiktok.com/en/" className="hover:-translate-y-2 duration-300">
            <FontAwesomeIcon className="h-10 p-1" icon={faTiktok} />
          </a>
        </div>
      </div>
    </section>
  );
}
