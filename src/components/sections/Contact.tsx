import { Mail, Github, Linkedin } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { personal } from '@/data/personal'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader title="Let's Connect" />

        <p className="text-muted mt-4 max-w-md mx-auto leading-relaxed">
          I&apos;m currently open to full-time Software Engineering opportunities. Feel free to reach out.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-10">
          <a
            href={`mailto:${personal.email}`}
            className="flex flex-col items-center gap-2 text-muted hover:text-accent hover:-translate-y-0.5 transition-all duration-150"
          >
            <Mail className="w-6 h-6" />
            <span className="text-sm font-medium">{personal.email}</span>
          </a>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-muted hover:text-accent hover:-translate-y-0.5 transition-all duration-150"
          >
            <Github className="w-6 h-6" />
            <span className="text-sm font-medium">github.com/koushick01</span>
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-muted hover:text-accent hover:-translate-y-0.5 transition-all duration-150"
          >
            <Linkedin className="w-6 h-6" />
            <span className="text-sm font-medium">Koushick Padmanabhan</span>
          </a>
        </div>
      </div>
    </section>
  )
}
