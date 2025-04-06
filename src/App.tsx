import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'

// Pages
import Home from './pages/Home'
import Explore from './pages/Explore'
import Agents from './pages/Agents'
import TokenInfo from './pages/TokenInfo'
import NotFound from './pages/NotFound'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/token" element={<TokenInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App