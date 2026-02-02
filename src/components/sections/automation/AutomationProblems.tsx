import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileWarning, TrendingDown } from 'lucide-react';

const AutomationProblems: React.FC = () => {
    return (
        <section className="py-20 bg-[#05050A]">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                        ¿El <span className="text-red-500">Caos Operativo</span> frena tu crecimiento?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Muchas empresas pierden potencial atrapadas en procesos manuales obsoletos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Clock,
                            title: "Pérdida de Tiempo",
                            desc: "Talento humano valioso desperdiciado en tareas repetitivas como copiar y pegar datos entre Excels y sistemas.",
                            color: "text-orange-400"
                        },
                        {
                            icon: FileWarning,
                            title: "Errores Costosos",
                            desc: "Facturas mal emitidas, datos de clientes duplicados o perdidos, fallos en la digitación manual.",
                            color: "text-red-400"
                        },
                        {
                            icon: TrendingDown,
                            title: "Escalabilidad Limitada",
                            desc: "Para vender más necesitas contratar más personal operativo, reduciendo márgenes y agilidad.",
                            color: "text-yellow-400"
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="p-8 rounded-2xl bg-[#0F0F1A] border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AutomationProblems;
