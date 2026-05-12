import { useRef } from 'react'
import Cursor from './components/Cursor.jsx'
import Curtain from './components/Curtain.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import InvitationSection from './components/InvitationSection.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const mainRef = useRef(null)
  const brandRef = useRef(null)

  return (
    <>
      <Cursor />
      <Curtain contentRef={mainRef} brandRef={brandRef} />
      <Nav brandRef={brandRef} />
      <main ref={mainRef}>
        <Hero />
        <InvitationSection />
        <Footer />
      </main>
    </>
  )
}
