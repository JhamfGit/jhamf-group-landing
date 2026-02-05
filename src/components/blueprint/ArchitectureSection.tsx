import { motion } from 'framer-motion';
import {
    Mail, FileText, Globe, Webhook,
    Workflow, Network,
    BrainCircuit,
    Database, Server, Send, MessageSquare
} from 'lucide-react';

const ArchitectureSection = () => {
    return (
        <section className="py-24 bg-obsidian text-white relative overflow-hidden">
            {/* Background Tech Mesh */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Column: Copy */}
                    <div className="lg:w-1/3 pt-10 sticky top-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold font-display leading-tight mb-6"
                        >
                            Los procesos ya no se olvidan. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-lime">
                                Se ejecutan solos.
                            </span>
                        </motion.h2>

                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            Automatización inteligente con IA, orquestada en la nube y diseñada para escalar.
                        </p>

                        <ul className="space-y-4 mb-12">
                            {[
                                'Seguimiento automático de leads',
                                'Validación inteligente de facturas',
                                'Alertas y control de inventario',
                                'Procesos sin intervención humana'
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 text-gray-300"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>

                        {/* Micro-copy chips */}
                        <div className="flex flex-wrap gap-2">
                            {['IA decide, sistema ejecuta', 'Auditable 100%', 'Zero Friction'].map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-500">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Blueprint Diagram */}
                    <div className="lg:w-2/3 w-full">
                        <div className="relative bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                            {/* Layer 1: Inputs */}
                            <LayerLabel label="INPUTS" />
                            <div className="grid grid-cols-4 gap-4 mb-12">
                                <InputCard icon={Globe} label="Web Forms" />
                                <InputCard icon={Mail} label="Email" />
                                <InputCard icon={Webhook} label="Webhooks" />
                                <InputCard icon={FileText} label="Docs" />
                            </div>

                            <ConnectorLine />

                            {/* Layer 2: Orchestration */}
                            <LayerLabel label="ORCHESTRATION" color="text-neon-cyan" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 relative">
                                <TechBlock
                                    icon={Workflow}
                                    title="n8n"
                                    subtitle="Flujos Flexibles"
                                    color="border-neon-lime/50 bg-neon-lime/5"
                                    active
                                />
                                <TechBlock
                                    icon={Network}
                                    title="Azure Logic Apps"
                                    subtitle="Enterprise Core"
                                    color="border-blue-500/50 bg-blue-500/5"
                                    active
                                />
                                {/* Connecting Pulse */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </div>

                            <ConnectorLine />

                            {/* Layer 3: Intelligence */}
                            <LayerLabel label="INTELLIGENCE" color="text-neon-purple" />
                            <div className="p-1 bg-gradient-to-r from-neon-purple via-pink-500 to-neon-purple rounded-2xl mb-12 animate-pulse-slow">
                                <div className="bg-obsidian rounded-xl p-6 flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                                    <BrainCircuit className="w-12 h-12 text-neon-purple mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Azure OpenAI + Vision</h3>
                                    <div className="flex gap-4 justify-center">
                                        <Badge>OCR</Badge>
                                        <Badge>Classification</Badge>
                                        <Badge>Anomalies</Badge>
                                    </div>
                                </div>
                            </div>

                            <ConnectorLine />

                            {/* Layer 4: Actions */}
                            <LayerLabel label="ACTIONS" />
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <ActionCard icon={Server} label="CRM" />
                                <ActionCard icon={Database} label="ERP" />
                                <ActionCard icon={MessageSquare} label="WhatsApp" />
                                <ActionCard icon={Send} label="Email" />
                            </div>

                        </div>

                        {/* Floating Tool Cards (Legend) */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                            <ToolLegend icon={Workflow} label="n8n Orchestration" />
                            <ToolLegend icon={Network} label="Logic Apps" />
                            <ToolLegend icon={BrainCircuit} label="Cognitive Services" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Sub-components

const LayerLabel = ({ label, color = "text-gray-500" }: { label: string, color?: string }) => (
    <div className={`text-xs font-mono tracking-[0.2em] mb-4 ${color} font-bold`}>{label}</div>
);

const InputCard = ({ icon: Icon, label }: any) => (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/10 transition-colors">
        <Icon className="w-5 h-5 text-gray-400" />
        <span className="text-xs text-gray-400 font-medium">{label}</span>
    </div>
);

const TechBlock = ({ icon: Icon, title, subtitle, color, active }: any) => (
    <div className={`p-6 rounded-xl border-2 backdrop-blur-md relative overflow-hidden group ${color} transition-all duration-500 hover:scale-[1.02]`}>
        <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-black/50 rounded-lg">
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <h4 className="font-bold text-white text-lg">{title}</h4>
                <p className="text-xs opacity-70 uppercase tracking-wider">{subtitle}</p>
            </div>
        </div>
        {active && (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
        )}
    </div>
);

const Badge = ({ children }: any) => (
    <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-gray-300 font-mono border border-white/5">
        {children}
    </span>
);

const ActionCard = ({ icon: Icon, label }: any) => (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:border-neon-cyan/50 transition-colors group">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <Icon className="w-4 h-4 text-gray-500 group-hover:text-neon-cyan transition-colors" />
    </div>
);

const ToolLegend = ({ icon: Icon, label }: any) => (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="text-xs text-gray-400">{label}</span>
    </div>
);

const ConnectorLine = () => (
    <div className="flex justify-center my-4 opacity-20">
        <div className="w-px h-8 bg-white" />
    </div>
);

export default ArchitectureSection;
