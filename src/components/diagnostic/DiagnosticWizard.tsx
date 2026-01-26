import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check, Sparkles, ArrowRight, RefreshCcw } from 'lucide-react';
import { diagnosticQuestions, getResultCategory } from '../../data/diagnosticData';

interface DiagnosticWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

const DiagnosticWizard = ({ isOpen, onClose }: DiagnosticWizardProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showResult, setShowResult] = useState(false);

    // Calculate progress
    const progress = ((currentStep + 1) / diagnosticQuestions.length) * 100;

    const handleOptionSelect = (score: number) => {
        setAnswers(prev => ({ ...prev, [currentStep]: score }));

        if (currentStep < diagnosticQuestions.length - 1) {
            setTimeout(() => setCurrentStep(prev => prev + 1), 250); // Small delay for visual feedback
        } else {
            setTimeout(() => setShowResult(true), 250);
        }
    };

    const calculateTotalScore = () => {
        return Object.values(answers).reduce((a, b) => a + b, 0);
    };

    const resetWizard = () => {
        setCurrentStep(0);
        setAnswers({});
        setShowResult(false);
    };

    if (!isOpen) return null;

    const result = showResult ? getResultCategory(calculateTotalScore()) : null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-2xl bg-obsidian border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-neon-cyan" />
                            <span className="font-display font-bold text-white tracking-wider">Diagnóstico IA</span>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 overflow-y-auto flex-1">
                        {!showResult ? (
                            <>
                                {/* Progress Bar */}
                                <div className="w-full h-1 bg-white/10 rounded-full mb-8">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-azure to-neon-cyan rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>

                                {/* Question */}
                                <div className="mb-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                        {diagnosticQuestions[currentStep].question}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Pregunta {currentStep + 1} de {diagnosticQuestions.length}
                                    </p>
                                </div>

                                {/* Options */}
                                <div className="space-y-3">
                                    {diagnosticQuestions[currentStep].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(option.score)}
                                            className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-azure/50 transition-all group flex items-center justify-between"
                                        >
                                            <span className="text-gray-300 group-hover:text-white transition-colors">
                                                {option.label}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-azure opacity-0 group-hover:opacity-100 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            // Result View
                            <div className="text-center py-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 mb-6">
                                        <Sparkles className={`w-8 h-8 ${result?.color}`} />
                                    </div>

                                    <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${result?.color}`}>
                                        {result?.title}
                                    </h2>

                                    <p className="text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">
                                        {result?.description}
                                    </p>

                                    <div className="bg-white/5 rounded-xl p-6 text-left mb-8 border border-white/5">
                                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                            <Check className="w-4 h-4 text-neon-cyan" /> Recomendaciones Clave:
                                        </h4>
                                        <ul className="space-y-3">
                                            {result?.recommendations.map((rec, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                                                    <div className="min-w-[4px] h-[4px] bg-azure rounded-full mt-2" />
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <button className="w-full py-4 bg-azure hover:bg-azure-glow text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                                            Solicitar Plan de Acción <ArrowRight className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className="w-full py-3 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-medium rounded-xl transition-colors"
                                        >
                                            Cerrar
                                        </button>
                                        <button
                                            onClick={resetWizard}
                                            className="text-xs text-gray-600 hover:text-gray-400 flex items-center justify-center gap-1 mt-2"
                                        >
                                            <RefreshCcw className="w-3 h-3" /> Reiniciar Test
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DiagnosticWizard;
