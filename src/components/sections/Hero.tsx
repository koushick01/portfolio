import { ChevronDown } from 'lucide-react'
import { personal } from '@/data/personal'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
      <div className="max-w-3xl mx-auto">
        <p className="text-muted text-xl mb-4">Hi, I&apos;m</p>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary mb-4">
          {personal.name}
        </h1>

        <p className="text-xl md:text-2xl font-semibold text-accent mb-6">
          {personal.title}
        </p>

        <p className="text-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10">
          {personal.tagline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-hover transition-colors duration-150 w-full sm:w-auto text-center"
          >
            View My Work
          </a>
          <a
            href={personal.resumeUrl}
            download="Koushick-Padmanabhan-Resume.pdf"
            className="border border-border-custom text-text-primary px-6 py-3 rounded-lg font-medium hover:border-accent hover:text-accent transition-colors duration-150 w-full sm:w-auto text-center"
          >
            Download Resume
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors duration-150"
        aria-label="Scroll to About"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </a>
    </section>
  )
}
