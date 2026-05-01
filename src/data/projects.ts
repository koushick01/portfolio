import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'open-fiesta',
    name: 'Open Fiesta',
    date: 'Sep 2025',
    description:
      'A multi-model AI chat platform enabling users to interact with 200+ AI models (OpenAI, Claude, Gemini, Grok, and more) simultaneously in real-time, with side-by-side response comparison for better decision-making.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Vercel AI SDK'],
    githubUrl: 'https://github.com/koushick01/open-fiesta-app',
  },
  {
    id: 'opencut',
    name: 'OpenCut',
    date: 'Feb 2026',
    description:
      'An AI-powered video generation platform that transforms prompts or URLs into fully produced short-form videos — automating script writing, narration, and visual generation using Vertex AI, ElevenLabs, and Firecrawl.',
    tech: ['Next.js', 'Remotion', 'Bun', 'Hono', 'Vertex AI', 'Cloudflare R2'],
    githubUrl: 'https://github.com/koushick01/opencut',
  },
  {
    id: 'customer-support-voice-agent',
    name: 'Customer Support Voice Agent',
    date: 'Nov 2025',
    description:
      "A real-time AI-powered voice support agent using LiveKit's WebRTC infrastructure and a FastAPI backend, enabling low-latency bidirectional audio streaming with full session management and persistent data storage.",
    tech: ['Next.js', 'FastAPI', 'LiveKit', 'PostgreSQL', 'SQLAlchemy', 'Docker'],
    githubUrl: 'https://github.com/koushick01/customer_support_agent',
  },
]
