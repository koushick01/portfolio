import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import FadeInSection from '@/components/ui/FadeInSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FadeInSection><About /></FadeInSection>
        <FadeInSection><Experience /></FadeInSection>
        <FadeInSection><Projects /></FadeInSection>
        {/* Skills, Contact — added in next phase */}
      </main>
      <Footer />
    </>
  )
}
