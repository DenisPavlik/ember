interface SectionHeadersProps {
  title: string,
  subtitle: string
}

export default function SectionHeaders({title, subtitle}: SectionHeadersProps) {
  return (
    <div className="flex flex-col text-center gap-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight">{title}</h1>
      <span className="block font-semibold italic">{subtitle}</span>
    </div>
  )
}