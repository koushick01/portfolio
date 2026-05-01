interface SectionHeaderProps {
  title: string
  subtitle?: string
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>
      <div className="mt-3 w-12 border-b-2 border-accent" />
      {subtitle && (
        <p className="mt-3 text-muted">{subtitle}</p>
      )}
    </div>
  )
}
