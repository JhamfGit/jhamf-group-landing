import { createContext, useContext, useState, type ReactNode } from 'react';

export type PersonaType = 'sales' | 'ops' | 'support' | 'management';

interface BlueprintContextType {
    activePersona: PersonaType;
    setPersona: (persona: PersonaType) => void;
}

const BlueprintContext = createContext<BlueprintContextType | undefined>(undefined);

export const BlueprintProvider = ({ children }: { children: ReactNode }) => {
    const [activePersona, setActivePersona] = useState<PersonaType>('sales');

    return (
        <BlueprintContext.Provider value={{ activePersona, setPersona: setActivePersona }}>
            {children}
        </BlueprintContext.Provider>
    );
};

export const useBlueprint = () => {
    const context = useContext(BlueprintContext);
    if (!context) {
        throw new Error('useBlueprint must be used within a BlueprintProvider');
    }
    return context;
};
