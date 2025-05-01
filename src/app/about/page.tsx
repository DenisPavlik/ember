import SectionHeaders from "@/components/SectionHeaders"

export default function AboutPage() {
  return (
    <section>
      <div className="max-w-2xl mx-auto mt-10">
      <SectionHeaders title="Our Story" subtitle="We believe everyone is a creator. Our goal is to help a million people
        earn from their creativity by 2030." />
      <div className="flex flex-col gap-8 my-10 leading-7 text-black mx-4 md:mx-0">
      <p>
      <span className="text-5xl font-medium float-left mr-2 leading-none">W</span>
        hen we started designing Buy Me a Coffee in 2017, our goal was to
        remove all the complexities and give creators a simple way to get paid
        and connect with their fans. But simple wasn&apos;t enough. Creators needed a
        product that was meaningful and enjoyable to use. This meant designing a
        payment platform that doesn&apos;t feel transactional—starting with the name
        itself.
      </p>
      <p>
        Where did the idea come from? Our founders, Jijo Sunny and Joseph Sunny,
        were creators who lived on a moderate advertising income from their
        creative gigs. Although $500 per month is what you pay for a gym
        membership in San Francisco, it&apos;s enough to make a living in many parts
        of the world. If it weren&apos;t for those AdSense checks, there would be no
        Buy Me a Coffee.
      </p>
      <p>
        That said, advertising model and algorithms have become too unreliable
        to pay creators what they&apos;re worth. It is far more reliable to build a
        direct relationship with the audience. Buy Me a Coffee gives fans a
        meaningful way to express gratitude to creators. Creators can also offer
        exclusive content and community access for their biggest fans.
      </p>
      <p>Sip sip hooray.</p>
      </div>
    </div>
    </section>
  );
}
