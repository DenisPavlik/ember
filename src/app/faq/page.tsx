import AccordionList from "@/components/AccordionList";
import SectionHeaders from "@/components/SectionHeaders";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section>
      <div className="max-w-2xl mx-auto mt-10 px-4 md:px-6">
        <SectionHeaders title="Frequently Asked Questions" subtitle="If you can't find an answer that you're looking for, feel free to drop
          us a line." />
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            href="/about"
            className="inline-block text-sm font-semibold px-5 py-2 rounded-full border border-gray-300 bg-white transition-colors duration-300 hover:bg-black hover:text-white hover:border-black"
          >
            About the company
          </Link>
          <Link
            href="/contact"
            className="inline-block text-sm font-semibold px-5 py-2 rounded-full border border-gray-300 bg-white transition-colors duration-300 hover:bg-black hover:text-white hover:border-black"
          >
            Contact support
          </Link>
        </div>
        <div className="my-8">
          <AccordionList />
        </div>
      </div>
    </section>
  );
}
