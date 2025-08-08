import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PasswordSection from './components/PasswordSection';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <main>
          <Hero />
          <PasswordSection />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
