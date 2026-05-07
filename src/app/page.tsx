import CreatorCarousel from "@/components/CreatorCarousel";
import HeroContent from "@/components/HeroContent";
import SuggestionCard from "@/components/SuggestionCard";

const creators = [
  { img: "/images/bogdan.jpeg", description: "Bohdan is creating absurd comedy videos and sketches on YouTube!", supporters: "5,300", className: "left-20 xl:-left-40 -top-10 rotate-3" },
  { img: "/images/jeens.jpg", description: "JeensOff is creating entertaining Twitch streams and community events!", supporters: "2,100", className: "left-14 xl:-left-20 top-32 -rotate-6" },
  { img: "/images/mark.jpg", description: "Mark Tilbury is creating educational content about business and investing.", supporters: "7,800", className: "left-0 xl:-left-44 top-80 rotate-12" },
  { img: "/images/geek.jpg", description: "Tyler is creating movie and TV show reviews on YouTube!", supporters: "3,200", className: "right-12 xl:-right-32 -top-10 rotate-12" },
  { img: "/images/dawid.jpg", description: "Dawid is creating coding tutorials and web development content!", supporters: "1,500", className: "right-4 xl:-right-44 top-32 rotate-6" },
  { img: "/images/sonnyk.jpg", description: "SonnyK is creating deep-dive videos about gaming lore and story analysis!", supporters: "1,200", className: "right-20 xl:-right-20 top-80 -rotate-6" },
];


export default function Home() {
  return (
    <section className="max-w-5xl mx-auto text-center mt-8 md:mt-16 relative px-4">
      {/* Desktop: floating absolute cards */}
      <div className="hidden lg:block">
        {creators.map((c, i) => (
          <SuggestionCard key={i} className={c.className} img={c.img} description={c.description} supporters={c.supporters} />
        ))}
      </div>

      <HeroContent />

      <CreatorCarousel creators={creators} />
    </section>
  );
}
