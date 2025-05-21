import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import ScrollToTop from './components/common/ScrollToTop' // Import ScrollToTop

// Pages
import Home from './pages/Home'
import Chat from './pages/Chat' // Updated import
import Agents from './pages/Agents'
import TokenInfo from './pages/TokenInfo'
import NotFound from './pages/NotFound'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const App: React.FC = () => {
  const location = useLocation() // Get current location

  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <div className="app">
        <Navbar />
        <main style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 70px)' }}> {/* Adjust 70px if Navbar height is different; this helps ensure main content can fill height */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} /> {/* Updated route path and element */}
            <Route path="/agents" element={<Agents />} />
            <Route path="/token" element={<TokenInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* Conditionally render Footer */} 
        {location.pathname !== '/chat' && <Footer />} {/* Updated path for footer condition */}
      </div>
    </ThemeProvider>
  )
}

export default App