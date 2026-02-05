import { Shield, Lock, Layers, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MultitenantSection = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-black to-obsidian border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Unified Compact Container */}
                <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden relative">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px] -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

                        {/* Left: Diagram (Darker Background) */}
                        <div className="bg-black/40 p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                            {/* Central Engine */}
                            <div className="w-full max-w-[280px] bg-obsidian border border-white/20 p-5 rounded-2xl shadow-2xl mb-8 relative">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-neon-lime text-black text-[10px] font-bold rounded-full uppercase tracking-wider">
                                    Core Engine
                                </div>
                                <div className="flex justify-around items-center opacity-70 mb-3">
                                    <Layers className="w-6 h-6 text-white" />
                                    <div className="h-px bg-white/20 flex-1 mx-3" />
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div className="space-y-1.5">
                                    <div className="h-1.5 bg-white/10 rounded-full w-3/4 mx-auto" />
                                    <div className="h-1.5 bg-white/10 rounded-full w-full" />
                                </div>
                            </div>

                            {/* Connection Lines */}
                            <div className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent" />

                            {/* Tenants Grid */}
                            <div className="grid grid-cols-3 gap-3 w-full max-w-[320px]">
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 hover:bg-white/10 transition-colors cursor-default"
                                    >
                                        <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-neon-cyan' : i === 2 ? 'bg-neon-lime' : 'bg-neon-purple'
                                            } shadow-[0_0_8px_currentColor]`} />
                                        <span className="text-[10px] font-mono text-gray-400 uppercase">Tenant {String.fromCharCode(64 + i)}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Content (Lighter/Glass) */}
                        <div className="p-10 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 mb-6 text-neon-purple text-xs font-mono uppercase tracking-widest font-bold">
                                <Lock className="w-3 h-3" />
                                Enterprise Grade
                            </div>

                            <h2 className="text-3xl font-bold font-display mb-4 text-white">
                                Arquitectura Multi-Tenant <br />
                            </h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Infraestructura diseñada para aislar datos sensibles mientras escala recursos automáticamente. Seguridad bancaria para cada cliente.
                            </p>

                            <ul className="space-y-6">
                                <FeatureRow
                                    icon={Shield}
                                    title="Aislamiento Lógico"
                                    desc="Cero mezcla de datos entre organizaciones."
                                />
                                <FeatureRow
                                    icon={Layers}
                                    title="Escalado Elástico"
                                    desc="Recursos asignados dinámicamente."
                                />
                                <FeatureRow
                                    icon={CheckCircle2}
                                    title="Auditoría Completa"
                                    desc="Logs inmutables de todas las operaciones."
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeatureRow = ({ icon: Icon, title, desc }: any) => (
    <li className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-gray-300" />
        </div>
        <div>
            <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
            <p className="text-sm text-gray-500">{desc}</p>
        </div>
    </li>
);

export default MultitenantSection;
