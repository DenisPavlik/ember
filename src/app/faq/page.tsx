import AccordionList from "@/components/AccordionList";
import SectionHeaders from "@/components/SectionHeaders";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section>
      <div className="max-w-2xl mx-auto mt-10">
        <SectionHeaders title="Frequently Asked Questions" subtitle="If you can't find an answer that you're looking for, feel free to drop
          us a line." />
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            href="/about"
            className="relative inline-block text-sm font-semibold px-4 py-2
            before:absolute before:inset-0 before:rounded-full before:border-2 before:border-black
            before:transition-transform before:duration-300 hover:before:scale-105"
          >
            About the company
          </Link>
          <Link
            href="/contact"
            className="relative inline-block text-sm font-semibold px-4 py-2
            before:absolute before:inset-0 before:rounded-full before:border-2 before:border-black
            before:transition-transform before:duration-300 hover:before:scale-105"
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
