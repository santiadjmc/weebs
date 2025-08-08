import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation/Navigation'
import Hero from './components/Hero/Hero'
import PasswordSection from './components/Sections/PasswordSection'
import PhishingSection from './components/Sections/PhishingSection'
import SocialMediaSection from './components/Sections/SocialMediaSection'
import PrivacySection from './components/Sections/PrivacySection'
import DeviceSection from './components/Sections/DeviceSection'
import Footer from './components/Footer/Footer'
import { ThemeProvider } from './utils/ThemeContext'
import './styles/App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navigation />
        <Hero />
        <PasswordSection />
        <PhishingSection />
        <SocialMediaSection />
        <PrivacySection />
        <DeviceSection />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App