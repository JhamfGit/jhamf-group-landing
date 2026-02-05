import { Shield, Lock, Layers, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MultitenantSection = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-black to-obsidian border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs font-mono uppercase tracking-widest">
                        <Lock className="w-3 h-3" />
                        Enterprise Grade
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 text-white">
                        Arquitectura Multi-Tenant <br />
                        <span className="text-gray-500">Preparada para Escalar</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Un motor central, múltiples clientes aislados. Diseñado para MSPs y corporativos que requieren seguridad sin sacrificar eficiencia.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Diagram Column - The "Engine" */}
                    <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[80px]" />

                        <div className="flex flex-col items-center justify-center h-full relative z-10">
                            {/* Central Engine */}
                            <div className="w-full max-w-sm bg-obsidian border border-white/20 p-6 rounded-2xl shadow-2xl mb-8 relative">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-neon-lime text-black text-xs font-bold rounded-full uppercase tracking-wider">
                                    Core Engine
                                </div>
                                <div className="flex justify-around items-center opacity-50 mb-4">
                                    <Layers className="w-8 h-8 text-white" />
                                    <div className="h-px bg-white/20 flex-1 mx-4" />
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 bg-white/10 rounded-full w-3/4 mx-auto" />
                                    <div className="h-2 bg-white/10 rounded-full w-full" />
                                </div>
                            </div>

                            {/* Connection Lines */}
                            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />

                            {/* Tenants */}
                            <div className="grid grid-cols-3 gap-4 w-full">
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-black/40 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-2 hover:border-white/30 transition-colors"
                                    >
                                        <LayoutGrid className={`w-5 h-5 ${i === 1 ? 'text-neon-cyan' : i === 2 ? 'text-neon-lime' : 'text-neon-purple'
                                            }`} />
                                        <span className="text-xs font-mono text-gray-500">Tenant {String.fromCharCode(64 + i)}</span>
                                        <div className="flex gap-1 mt-1">
                                            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse delay-75" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Features Column */}
                    <div className="space-y-4">
                        <FeatureCard
                            title="Aislamiento Total"
                            desc="Datos segregados lógicamente por tenant. Cero mezcla de información."
                            icon={Shield}
                        />
                        <FeatureCard
                            title="Escalado Automático"
                            desc="Infraestructura que crece con la demanda de cada cliente."
                            icon={Layers}
                        />
                        <FeatureCard
                            title="Logs & Auditoría"
                            desc="Trazabilidad completa de cada acción ejecutada por el sistema."
                            icon={CheckCircle2}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ title, desc, icon: Icon }: any) => (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors h-full">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Icon className="w-5 h-5 text-gray-300" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
);

export default MultitenantSection;
