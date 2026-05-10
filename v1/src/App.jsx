import { useState } from 'react'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import Drawer from './components/Drawer'

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Cursor />
      <Hero
        onOpenDrawer={() => setDrawerOpen(true)}
        drawerOpen={drawerOpen}
      />
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}

export default App
