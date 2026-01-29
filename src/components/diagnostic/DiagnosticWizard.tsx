import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, ArrowRight, RefreshCcw, Send } from 'lucide-react';
import { diagnosticQuestions, getResultCategory } from '../../data/diagnosticData';

interface DiagnosticWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

// Número de WhatsApp (con código país, sin +)
const WHATSAPP_NUMBER = '573174660498';

const DiagnosticWizard = ({ isOpen, onClose }: DiagnosticWizardProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [answerLabels, setAnswerLabels] = useState<Record<number, string>>({});
    const [showResult, setShowResult] = useState(false);
    const [sending, setSending] = useState(false);

    const progress = ((currentStep + 1) / diagnosticQuestions.length) * 100;

    const handleOptionSelect = (score: number, label: string) => {
        setAnswers(prev => ({ ...prev, [currentStep]: score }));
        setAnswerLabels(prev => ({ ...prev, [currentStep]: label }));

        if (currentStep < diagnosticQuestions.length - 1) {
            setTimeout(() => setCurrentStep(prev => prev + 1), 250);
        } else {
            setTimeout(() => setShowResult(true), 250);
        }
    };

    const calculateTotalScore = () =>
        Object.values(answers).reduce((a, b) => a + b, 0);

    const resetWizard = () => {
        setCurrentStep(0);
        setAnswers({});
        setAnswerLabels({});
        setShowResult(false);
    };

    const getIndividualAnswers = () => {
        const individualAnswers: Record<string, any> = {};

        diagnosticQuestions.forEach((question, index) => {
            individualAnswers[`pregunta_${index + 1}`] = {
                pregunta: question.question,
                respuesta: answerLabels[index] || 'No respondida',
                puntuacion: answers[index] || 0
            };
        });

        return individualAnswers;
    };

    // 🟢 MENSAJE WHATSAPP (con texto inicial solicitado)
    const formatWhatsAppMessage = () => {
        const totalScore = calculateTotalScore();
        const result = getResultCategory(totalScore);
        const individualAnswers = getIndividualAnswers();

        let message = `Quiero recibir más información sobre el siguiente diagnóstico:\n\n`;
        message += `*DIAGNÓSTICO IA*\n`;
        message += `*Puntuación Total:* ${totalScore} puntos\n`;
        message += `*Resultado:* ${result?.title}\n\n`;

        message += `*RESPUESTAS DETALLADAS*\n`;
        message += `${'='.repeat(35)}\n\n`;

        Object.values(individualAnswers).forEach((item: any, index) => {
            message += `*${index + 1}. ${item.pregunta}*\n`;
            message += `✓ ${item.respuesta}\n`;
            message += `Puntos: ${item.puntuacion}\n\n`;
        });

        message += `${'='.repeat(35)}\n\n`;
        message += `*EVALUACIÓN:*\n${result?.description}\n\n`;
        message += `*RECOMENDACIONES:*\n`;

        result?.recommendations.forEach((rec, idx) => {
            message += `${idx + 1}. ${rec}\n`;
        });

        message += `\n📅 ${new Date().toLocaleString('es-ES')}`;

        return encodeURIComponent(message);
    };

    const sendToWhatsApp = () => {
        setSending(true);
        const message = formatWhatsAppMessage();
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
        setTimeout(() => setSending(false), 1000);
    };

    const logResults = () => {
        console.log('RESULTADOS:', {
            total: calculateTotalScore(),
            categoria: getResultCategory(calculateTotalScore()),
            respuestas: getIndividualAnswers()
        });
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
                            <span className="font-display font-bold text-white">
                                Diagnóstico IA
                            </span>
                        </div>
                        <button onClick={onClose}>
                            <X className="w-6 h-6 text-gray-400 hover:text-white" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 overflow-y-auto flex-1">
                        {!showResult ? (
                            <>
                                <div className="w-full h-1 bg-white/10 rounded-full mb-8">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-azure to-neon-cyan rounded-full"
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {diagnosticQuestions[currentStep].question}
                                </h3>

                                <div className="space-y-3 mt-6">
                                    {diagnosticQuestions[currentStep].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(option.score, option.label)}
                                            className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 flex justify-between"
                                        >
                                            <span className="text-gray-300">{option.label}</span>
                                            <ChevronRight className="w-4 h-4 text-azure" />
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <h2 className={`text-3xl font-bold mb-4 ${result?.color}`}>
                                    {result?.title}
                                </h2>

                                <p className="text-gray-300 mb-6">{result?.description}</p>

                                <div className="flex flex-col gap-3">
                                    {/* BOTÓN PRINCIPAL */}
                                    <button
                                        onClick={sendToWhatsApp}
                                        disabled={sending}
                                        className="w-full py-4 bg-azure hover:bg-azure-glow text-white font-bold rounded-xl flex justify-center gap-2"
                                    >
                                        <Send />
                                        {sending ? 'Abriendo WhatsApp...' : 'Quiero recibir asesoría'}
                                    </button>

                                    <button
                                        onClick={logResults}
                                        className="w-full py-4 bg-white/5 text-gray-300 rounded-xl"
                                    >
                                        Ver detalle en consola <ArrowRight className="inline w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={onClose}
                                        className="w-full py-3 text-gray-400"
                                    >
                                        Cerrar
                                    </button>

                                    <button
                                        onClick={resetWizard}
                                        className="text-xs text-gray-600 flex justify-center gap-1"
                                    >
                                        <RefreshCcw className="w-3 h-3" /> Reiniciar Test
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DiagnosticWizard;