import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import Header from './sections/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Journey from './sections/Journey'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#121212',
            border: '2px solid #262626',
            color: '#FFFFFF',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            borderRadius: 0,
          },
        }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </BrowserRouter>
  )
}
