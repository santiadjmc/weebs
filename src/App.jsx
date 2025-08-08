import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PasswordSection from './components/PasswordSection';
import PhishingSection from './components/PhishingSection';
import SocialSection from './components/SocialSection';
import PrivacySection from './components/PrivacySection';
import DevicesSection from './components/DevicesSection';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <main>
          <Hero />
          <PasswordSection />
          <PhishingSection />
          <SocialSection />
          <PrivacySection />
          <DevicesSection />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
