import { Shield, Lock, Users } from 'lucide-react';

const MultitenantSection = () => {
    return (
        <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs font-mono uppercase tracking-widest">
                            <Shield className="w-4 h-4" />
                            Security First
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 text-white">
                            Cada cliente es independiente. <br />
                            <span className="text-gray-500">Sin mezclar datos. Sin riesgos.</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 max-w-lg">
                            Una sola plataforma, múltiples empresas, control total. Arquitectura diseñada para aislar la información sensible.
                        </p>

                        <div className="flex gap-8">
                            <div>
                                <h4 className="flex items-center gap-2 font-bold text-white mb-2">
                                    <Lock className="w-4 h-4 text-neon-lime" /> Encriptación AES-256
                                </h4>
                                <p className="text-sm text-gray-500">En reposo y en tránsito</p>
                            </div>
                            <div>
                                <h4 className="flex items-center gap-2 font-bold text-white mb-2">
                                    <Users className="w-4 h-4 text-neon-cyan" /> RBAC Granular
                                </h4>
                                <p className="text-sm text-gray-500">Roles por organización</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-lg">
                        <div className="relative p-8 bg-white/5 border border-white/10 rounded-2xl">
                            {/* Diagram */}
                            <div className="space-y-4">
                                <ClientRow label="Cliente A" color="bg-neon-lime" />
                                <ClientRow label="Cliente B" color="bg-neon-cyan" />
                                <ClientRow label="Cliente C" color="bg-neon-purple" />

                                <div className="h-8 border-l-2 border-dashed border-gray-700 ml-8 my-2" />

                                <div className="p-4 bg-obsidian border border-white/20 rounded-xl flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Jhamf AI Core</h4>
                                        <p className="text-xs text-gray-400">Procesamiento Aislado</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ClientRow = ({ label, color }: { label: string, color: string }) => (
    <div className="flex items-center gap-4">
        <div className="flex-1 bg-obsidian border border-white/10 p-4 rounded-xl flex justify-between items-center group cursor-default hover:border-white/30 transition-colors">
            <span className="text-gray-300 font-mono text-sm">{label}</span>
            <div className={`w-2 h-2 rounded-full ${color} shadow-[0_0_10px_currentColor] opacity-50 group-hover:opacity-100 transition-opacity`} />
        </div>
        <div className="w-8 h-px bg-gray-700" />
        <div className="w-3 h-3 rounded-full bg-gray-700" />
    </div>
);

export default MultitenantSection;
