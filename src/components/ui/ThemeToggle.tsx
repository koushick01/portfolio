'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // suppressHydrationWarning is required by next-themes
  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-surface-elevated transition-colors duration-150"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-muted" />
      ) : (
        <Moon className="w-5 h-5 text-muted" />
      )}
    </button>
  )
}
