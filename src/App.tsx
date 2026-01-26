
import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import AboutUs from './components/sections/AboutUs';
import Evolution from './components/sections/Evolution';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import DiagnosticWizard from './components/diagnostic/DiagnosticWizard';

function App() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <div className="bg-obsidian min-h-screen text-white">
      <Navbar onOpenWizard={() => setIsWizardOpen(true)} />
      <main>
        <Hero onOpenWizard={() => setIsWizardOpen(true)} />
        <Evolution />
        <Services />
        <AboutUs />
        <Contact />
      </main>
      <DiagnosticWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </div>
  );
}


export default App;
