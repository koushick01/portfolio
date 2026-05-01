import SectionHeader from '@/components/ui/SectionHeader'
import { personal } from '@/data/personal'

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <p className="text-text-primary text-base leading-relaxed">
            {personal.bio}
          </p>

          <div className="grid grid-cols-3 gap-4">
            {personal.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-surface border border-border-custom rounded-xl p-6 text-center"
              >
                <p className="text-3xl font-bold text-accent">{stat.value}</p>
                <p className="text-sm text-muted mt-2 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
