interface SkillBadgeProps {
  skill: string
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="bg-surface border border-border-custom text-text-primary text-sm font-medium px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-colors duration-150 cursor-default">
      {skill}
    </span>
  )
}
