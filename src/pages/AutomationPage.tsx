import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DiagnosticWizard from '../components/diagnostic/DiagnosticWizard';
import AutomationHero from '../components/sections/automation/AutomationHero';
import AutomationProblems from '../components/sections/automation/AutomationProblems';
import AutomationSolutions from '../components/sections/automation/AutomationSolutions';
import AutomationUseCases from '../components/sections/automation/AutomationUseCases';
import AutomationProcess from '../components/sections/automation/AutomationProcess';
import AutomationCTA from '../components/sections/automation/AutomationCTA';

const AutomationPage: React.FC = () => {
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    useEffect(() => {
        document.title = "Automatización Inteligente & RPA Colombia | Jhamf Group - Agentes IA";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-obsidian min-h-screen">
            <Navbar onOpenWizard={() => setIsWizardOpen(true)} />
            <main>
                <AutomationHero />
                <AutomationProblems />
                <AutomationSolutions />
                <AutomationUseCases />
                <AutomationProcess />
                <AutomationCTA />
            </main>
            <Footer />
            <DiagnosticWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
        </div>
    );
};

export default AutomationPage;
