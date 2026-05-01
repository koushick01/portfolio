import { Github } from 'lucide-react'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-surface border border-border-custom rounded-xl p-6 flex flex-col hover:-translate-y-1 hover:border-accent transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-text-primary">{project.name}</h3>
        <span className="text-sm text-muted ml-4 shrink-0">{project.date}</span>
      </div>

      <p className="text-muted text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="bg-surface-elevated text-muted text-xs px-2 py-1 rounded-md"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-accent text-sm font-medium">
        <Github className="w-4 h-4" />
        <span>View on GitHub →</span>
      </div>
    </a>
  )
}
