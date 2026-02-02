import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DiagnosticWizard from '../components/diagnostic/DiagnosticWizard';
import AzureHero from '../components/sections/azure/AzureHero';
import AzureTrust from '../components/sections/azure/AzureTrust';
import AzureServices from '../components/sections/azure/AzureServices';
import AzureBenefits from '../components/sections/azure/AzureBenefits';
import AzureUseCases from '../components/sections/azure/AzureUseCases';
import AzureContact from '../components/sections/azure/AzureContact';

const AzurePage: React.FC = () => {
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    useEffect(() => {
        document.title = "Microsoft Azure Partner Colombia | Jhamf Group - Servicios Cloud Corporativos";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-obsidian min-h-screen">
            <Navbar onOpenWizard={() => setIsWizardOpen(true)} />
            <main>
                <AzureHero />
                <AzureTrust />
                <AzureServices />
                <AzureBenefits />
                <AzureUseCases />
                <AzureContact />
            </main>
            <Footer />
            <DiagnosticWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
        </div>
    );
};

export default AzurePage;
