interface SectionHeadersProps {
  title: string,
  subtitle: string
}

export default function SectionHeaders({title, subtitle}: SectionHeadersProps) {
  return (
    <div className="flex flex-col text-center gap-8">
      <h1 className="text-5xl font-pacifico">{title}</h1>
      <span className="block font-semibold italic">{subtitle}</span>
    </div>
  )
}