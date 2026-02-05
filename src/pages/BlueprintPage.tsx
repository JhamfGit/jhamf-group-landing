import { useRef } from 'react';
import { BlueprintProvider } from '../components/blueprint/context/BlueprintContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/seo/SEO';
import Hero from '../components/blueprint/Hero';
import ContextSelector from '../components/blueprint/ContextSelector';
import ProcessDiagram from '../components/blueprint/ProcessDiagram';
import ToolsSection from '../components/blueprint/ToolsSection';
import MultitenantSection from '../components/blueprint/MultitenantSection';
import AutomationDemo from '../components/blueprint/demos/AutomationDemo';
import Results from '../components/blueprint/Results';
import CTA from '../components/blueprint/CTA';

const BlueprintPageContent = () => {
    const demoRef = useRef<HTMLDivElement>(null);

    const handleStartDemo = () => {
        demoRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-obsidian text-white font-sans selection:bg-neon-lime selection:text-obsidian">
            <SEO
                title="Blueprint | Jhamf Group"
                description="La IA no se explica, se prueba. Interactúa con una operación real de IA y automatización funcionando como si fuera tu empresa."
            />

            <Navbar onOpenWizard={() => window.open('https://form.typeform.com/to/gxR8JkE0', '_blank')} />

            <main className="relative">
                <Hero onStartDemo={handleStartDemo} />

                <div ref={demoRef}>
                    <ContextSelector />
                </div>

                <ProcessDiagram />
                <ToolsSection />
                <MultitenantSection />
                <AutomationDemo />
                <Results />
                <CTA />
            </main>

            <Footer />
        </div>
    );
};

const BlueprintPage = () => {
    return (
        <BlueprintProvider>
            <BlueprintPageContent />
        </BlueprintProvider>
    );
};

export default BlueprintPage;
