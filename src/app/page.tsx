import SugessionCard from "@/components/SugessionCard";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto text-center mt-16 relative">
      <div className="hidden lg:block hover:cursor-pointer">
        <SugessionCard
          className="left-20 xl:-left-40 -top-10 rotate-3"
          img="/images/bogdan.jpeg"
          description="Bohdan is creating absurd comedy videos and sketches on YouTube!"
          supporters="5,300"
        />
        <SugessionCard
          className="left-14 xl:-left-20 top-32 -rotate-6"
          img="/images/jeens.jpg"
          description="JeensOff is creating entertaining Twitch streams and community events!"
          supporters="2,100"
        />
        <SugessionCard
          className="left-0 xl:-left-44 top-80 rotate-12"
          img="/images/mark.jpg"
          description="Mark Tilbury is creating educational content about business, investing, and success on YouTube."
          supporters="7,800"
        />
        <SugessionCard
          className="right-12 xl:-right-32 -top-10 rotate-12"
          img="/images/geek.jpg"
          description="Tyler is creating movie and TV show reviews on YouTube!"
          supporters="3,200"
        />
        <SugessionCard
          className="right-4 xl:-right-44 top-32 rotate-6"
          img="/images/dawid.jpg"
          description="Dawid is creating coding tutorials and web development content!"
          supporters="1,500"
        />
        <SugessionCard
          className="right-20 xl:-right-20 top-80 -rotate-6"
          img="/images/sonnyk.jpg"
          description="SonnyK is creating deep-dive videos about gaming lore and story analysis!"
          supporters="1,200"
        />
      </div>
      <div className="pt-10">
        <p className="text-emerald-600">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </p>
        <p className="mt-2 text-gray-600">Loved by 1,000,000+ creators</p>
      </div>
      <h1 className="text-7xl font-extrabold mt-12">
        Fund your <br />
        creative works
      </h1>
      <h2 className="mt-4 mb-12 text-lg">
        Accept support for your work. <br />
        It&apos;s easier than you think.
      </h2>
      <Link
        href={"/profile"}
        className="inline-block bg-yellow-300 px-8 py-4 text-xl font-bold rounded-full
  hover:bg-yellow-300/60 duration-300 hover:scale-105"
      >
        Start my page
      </Link>
      <p className="mt-8 text-sm">
        It&apos;s free and takes less than a minute!
      </p>
    </section>
  );
}
