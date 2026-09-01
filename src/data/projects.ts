import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'open-fiesta',
    name: 'Open Fiesta',
    date: 'Sep 2025',
    description:
      'A multi-model AI chat platform enabling users to interact with 100+ AI models (OpenAI, Claude, Gemini, Grok, etc.) in parallel with real-time streaming, allowing side-by-side comparison of responses for improved decision-making. Built with Next.js, TypeScript, PostgreSQL, and the Vercel AI SDK, with authentication, persistent chat history, and configurable model parameters (temperature, top-p).',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Vercel AI SDK'],
    githubUrl: 'https://github.com/koushick01/open-fiesta-app',
  },
  {
    id: 'opencut',
    name: 'OpenCut',
    date: 'Feb 2026',
    description:
      'An end-to-end AI-powered video generation platform that transforms user prompts or URLs into fully generated short-form videos by integrating Vertex AI (Gemini), ElevenLabs, and Firecrawl for automated script, narration, and visual generation. A scalable rendering pipeline built on Remotion with a dedicated render worker (Bun + Hono) enables real-time preview and MP4 export, with storage and retrieval on Cloudflare R2.',
    tech: ['Next.js', 'Remotion', 'Bun', 'Hono', 'Vertex AI', 'ElevenLabs', 'Cloudflare R2'],
    githubUrl: 'https://github.com/koushick01/opencut',
  },
  {
    id: 'customer-support-voice-agent',
    name: 'Customer Support Voice Agent',
    date: 'Nov 2025',
    description:
      "A real-time AI-powered customer support voice agent integrating LiveKit's WebRTC infrastructure with a FastAPI backend, enabling low-latency bidirectional audio streaming and token-based session authentication via a Next.js frontend. A full-stack persistence layer uses SQLAlchemy ORM with PostgreSQL and 3 incremental Alembic migrations, with the multi-service architecture (agent, server, web) containerized using Docker Compose.",
    tech: ['Next.js', 'FastAPI', 'LiveKit', 'PostgreSQL', 'SQLAlchemy', 'Docker'],
    githubUrl: 'https://github.com/koushick01/customer_support_agent',
  },
]
