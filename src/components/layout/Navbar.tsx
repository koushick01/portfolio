'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const sectionIds = ['about', 'experience', 'projects', 'skills', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md bg-surface/80 border-b border-border-custom shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-lg font-bold text-text-primary hover:text-accent transition-colors duration-150"
        >
          KP
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href }) => {
            const id = href.replace('#', '')
            return (
              <a
                key={href}
                href={href}
                className={cn(
                  'text-sm font-medium transition-colors duration-150',
                  activeSection === id
                    ? 'text-accent'
                    : 'text-muted hover:text-text-primary'
                )}
              >
                {label}
              </a>
            )
          })}
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-surface-elevated transition-colors duration-150"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-muted" />
            ) : (
              <Menu className="w-5 h-5 text-muted" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-border-custom px-4 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, href }) => {
            const id = href.replace('#', '')
            return (
              <a
                key={href}
                href={href}
                onClick={handleNavClick}
                className={cn(
                  'text-sm font-medium transition-colors duration-150',
                  activeSection === id
                    ? 'text-accent'
                    : 'text-muted hover:text-text-primary'
                )}
              >
                {label}
              </a>
            )
          })}
        </div>
      )}
    </header>
  )
}
