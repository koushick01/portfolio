import SectionHeader from '@/components/ui/SectionHeader'
import SkillBadge from '@/components/ui/SkillBadge'
import { skills } from '@/data/skills'

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Skills" />

        <div className="flex flex-col gap-8">
          {skills.map((group, index) => (
            <div key={group.category}>
              <div className="flex flex-col gap-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-muted">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              </div>
              {index < skills.length - 1 && (
                <div className="mt-8 border-b border-border-custom" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
