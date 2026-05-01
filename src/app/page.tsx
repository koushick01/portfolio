import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import FadeInSection from '@/components/ui/FadeInSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FadeInSection><About /></FadeInSection>
        {/* Experience, Projects, Skills, Contact — added in next phases */}
      </main>
      <Footer />
    </>
  )
}
