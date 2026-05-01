import SectionHeader from '@/components/ui/SectionHeader'
import { experiences } from '@/data/experience'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Experience" />

        <div className="relative border-l-2 border-border-custom ml-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 pb-12 last:pb-0">
              {/* Timeline dot */}
              <span className="absolute -left-[7px] top-1.5 w-3 h-3 bg-accent rounded-full" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">{exp.company}</h3>
                  <p className="text-sm text-muted mt-0.5">{exp.role}</p>
                </div>
                <p className="text-sm text-muted sm:text-right shrink-0">
                  {exp.startDate} – {exp.endDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
