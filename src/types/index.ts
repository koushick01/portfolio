export interface Project {
  id: string
  name: string
  date: string
  description: string
  tech: string[]
  githubUrl: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
}

export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  location: string
  email: string
  github: string
  linkedin: string
  resumeUrl: string
  bio: string
  stats: { label: string; value: string }[]
}
