import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Users, Heart, Shield, Lightbulb, Sun, Zap, Award } from 'lucide-react';

const AboutUs = () => {
    const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values' | 'policy'>('mission');

    const content = {
        mission: {
            title: "Misión",
            icon: <Target className="w-8 h-8 text-azure" />,
            text: "Jhamf Group S.A.S. impulsa a MIPYMES, instituciones y organizaciones en su proceso de transformación digital, ofreciendo soluciones tecnológicas integrales, seguridad informática, nube y equipos de cómputo, a través de alianzas estratégicas con líderes globales, talento humano calificado, garantizando continuidad operativa y entornos digitales seguros, para impulsar el crecimiento sostenible de nuestros clientes y contribuir al desarrollo de la región."
        },
        vision: {
            title: "Visión",
            icon: <Eye className="w-8 h-8 text-neon-cyan" />,
            text: "Nuestra visión es ser un referente de confianza y excelencia en soluciones tecnológicas para las MIPYMES, instituciones y organizaciones, consolidando un posicionamiento local y regional, y proyectándonos hacia el ámbito nacional. Nos distinguimos por impulsar la transformación digital de nuestros clientes mediante servicios innovadores, confiables y de calidad, contribuyendo al crecimiento sostenible de nuestros clientes y aliados, y al fortalecimiento del ecosistema empresarial."
        },
        values: {
            title: "Valores Corporativos",
            icon: <Heart className="w-8 h-8 text-neon-purple" />,
            items: [
                { title: "Somos un Equipo", desc: "Trabajo colaborativo y crecimiento continuo.", icon: <Users /> },
                { title: "Somos Empáticos", desc: "Sinergia y relaciones de valor con cada cliente.", icon: <Heart /> },
                { title: "Somos Transparentes", desc: "Claridad, confianza y cumplimiento de acuerdos.", icon: <Shield /> },
                { title: "Somos Apasionados", desc: "Innovación y flexibilidad ante nuevas ideas.", icon: <Zap /> },
                { title: "Somos Cálidos", desc: "Relaciones armoniosas y calidad humana.", icon: <Sun /> },
                { title: "Flexibles e Innovadores", desc: "Soluciones efectivas y espíritu práctico.", icon: <Lightbulb /> },
            ]
        },
        policy: {
            title: "Política de Calidad",
            icon: <Award className="w-8 h-8 text-white" />,
            text: "JHAMF GROUP S.A.S. se compromete a prestar servicios de soluciones tecnológicas integrales, seguridad informática, nube y comercialización de equipos de cómputo con el fin de satisfacer las necesidades de nuestros clientes, a través de talento humano calificado; cumpliendo con la normativa vigente y proponiendo hacia la mejora continua de nuestros procesos.",
            objectives: [
                "Atención al cliente oportuna y de calidad.",
                "Capacitación continua del personal.",
                "Evaluación y mejora continua de los procesos.",
                "Seguridad y privacidad de los datos.",
                "Crecimiento y sostenibilidad financiera."
            ]
        }
    };

    return (
        <section id="nosotros" className="relative py-24 bg-obsidian overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">¿Quiénes <span className="text-azure">Somos?</span></h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Jhamf Group S.A.S. es más que tecnología; somos su aliado estratégico en transformación digital, seguridad informática y servicios Cloud.
                        Facilitamos el camino hacia la modernización para PYMES que buscan excelencia sin complejidad.
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {Object.entries(content).map(([key, data]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key as any)}
                            className={`px-6 py-3 rounded-full border transition-all flex items-center gap-2 ${activeTab === key
                                    ? 'bg-azure/20 border-azure text-white shadow-[0_0_15px_rgba(0,127,255,0.3)]'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {data.icon}
                            <span className="font-semibold">{data.title}</span>
                        </button>
                    ))}
                </div>

                {/* Dynamic Content Area */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-white/10 rounded-xl">
                                    {content[activeTab].icon}
                                </div>
                                <h3 className="text-3xl font-display font-bold text-white">{content[activeTab].title}</h3>
                            </div>

                            {activeTab === 'values' ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {(content.values as any).items.map((item: any, idx: number) => (
                                        <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-azure/30 transition-colors">
                                            <div className="text-azure mb-3">{item.icon}</div>
                                            <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                            <p className="text-gray-400 text-sm">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : activeTab === 'policy' ? (
                                <div>
                                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                        {(content.policy as any).text}
                                    </p>
                                    <h4 className="text-xl font-bold text-white mb-4">Objetivos de Calidad:</h4>
                                    <ul className="grid md:grid-cols-2 gap-4">
                                        {(content.policy as any).objectives.map((obj: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-400">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-cyan shrink-0" />
                                                {obj}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                                    {(content[activeTab] as any).text}
                                </p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default AboutUs;
