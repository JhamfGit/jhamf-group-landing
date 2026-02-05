import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlueprint } from '../context/BlueprintContext';

const AutomationDemo = () => {
    const { activePersona } = useBlueprint();
    const [activeStep, setActiveStep] = useState(0);

    const personaData = {
        management: {
            steps: ['Reporte mensual requerido 📉', 'Consolidar datos de 4 áreas 📊', 'Detectar anomalías en P&L ⚠️', 'Generar presentación ejecutiva 📑', 'Enviar insights a socios 📩'],
            impact: '3 días de análisis → 30 segundos'
        },
        sales: {
            steps: ['Lead llena formulario 📝', 'Enriquecer datos (LinkedIn) 🔍', 'Clasificar potencial (Scoring) 🎯', 'Agendar reunión si es alto valor 📅', 'Enviar secuencia de nutrición 📩'],
            impact: 'Lead perdido → Reunión agendada'
        },
        ops: {
            steps: ['Alerta de inventario bajo 📉', 'Predecir demanda futura 📊', 'Cotizar con 3 proveedores 💰', 'Generar Orden de Compra 🛒', 'Enviar a aprobación el Slack 💬'],
            impact: 'Stockout → Reabastecimiento automático'
        },
        support: {
            steps: ['Ticket de soporte recibido 🎫', 'Analizar sentimiento e intención 🧠', 'Buscar solución en base de conocimiento 📚', 'Responder al cliente 💬', 'Escalar si es necesario 👨‍💻'],
            impact: '4h de espera → Respuesta inmediata'
        }
    };

    const data = personaData[activePersona];

    useEffect(() => {
        setActiveStep(0);
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % (data.steps.length + 2)); // +2 for pause at end
        }, 1500);
        return () => clearInterval(interval);
    }, [activePersona]);

    return (
        <section className="py-20 bg-obsidian">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                        Operación <span className="text-neon-cyan">Autónoma</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Esto es lo que pasa cuando los procesos dejan de depender de personas.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-10 right-10 h-1 bg-white/10 -translate-y-1/2 hidden md:block">
                        <motion.div
                            className="h-full bg-gradient-to-r from-neon-cyan to-neon-lime"
                            initial={{ width: '0%' }}
                            animate={{ width: `${Math.min(100, (activeStep / (data.steps.length - 1)) * 100)}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                        {data.steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0.5, scale: 0.9 }}
                                animate={{
                                    opacity: index <= activeStep ? 1 : 0.3,
                                    scale: index === activeStep ? 1.1 : 1,
                                    y: index === activeStep ? -10 : 0
                                }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl border-2 transition-colors duration-300 bg-obsidian ${index <= activeStep
                                    ? 'border-neon-cyan text-white shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                                    : 'border-white/10 text-gray-600'
                                    }`}>
                                    {step.split(' ').pop()}
                                </div>
                                <p className={`text-sm text-center font-medium transition-colors ${index <= activeStep ? 'text-white' : 'text-gray-600'
                                    }`}>
                                    {step.replace(/ .$| ..$/, '')}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeStep >= data.steps.length && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute inset-0 bg-obsidian/90 flex items-center justify-center z-20 backdrop-blur-sm"
                            >
                                <div className="text-center">
                                    <div className="text-neon-lime text-6xl mb-4 font-bold">✓</div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Proceso Completado</h3>
                                    <p className="text-neon-cyan text-lg font-mono">{data.impact}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default AutomationDemo;
