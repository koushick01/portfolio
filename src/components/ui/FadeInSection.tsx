'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useInView, type Variants } from 'framer-motion'

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
}

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1.0] } },
}

export default function FadeInSection({ children, className }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}
