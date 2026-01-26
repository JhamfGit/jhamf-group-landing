import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Shield, Headphones, Monitor, ArrowRight, CheckCircle2, Cloud, BrainCircuit } from 'lucide-react';

const services = [
    {
        icon: <Cloud className="w-8 h-8 text-azure" />,
        title: "Infraestructura & Cloud",
        subtitle: "Microsoft Azure Partners",
        description: "Soluciones de nube híbrida y multi-cloud escalables, seguras y optimizadas para su negocio.",
        gradient: "from-azure/20 to-transparent",
        border: "group-hover:border-azure/50",
        items: [
            "Microsoft Azure Partners",
            "Arquitectura Híbrida & Multi-cloud",
            "Seguridad y Compliance",
            "Migración y Modernización"
        ]
    },
    {
        icon: <BrainCircuit className="w-8 h-8 text-neon-purple" />,
        title: "Automatización & IA",
        subtitle: "Intelligent Solutions",
        description: "Impulse la eficiencia operativa con agentes cognitivos y automatización inteligente de procesos.",
        gradient: "from-neon-purple/20 to-transparent",
        border: "group-hover:border-neon-purple/50",
        items: [
            "Automatización de Procesos (RPA)",
            "Agentes Cognitivos & Chatbots",
            "Análisis Predictivo de Datos",
            "Integración de IA Generativa"
        ]
    },
    {
        icon: <Headphones className="w-8 h-8 text-neon-cyan" />,
        title: "Managed IT Services",
        subtitle: "& Outsourcing",
        description: " Soporte integral y mantenimiento para garantizar la continuidad operativa de su negocio.",
        gradient: "from-azure/20 to-transparent",
        border: "group-hover:border-azure/50",
        items: [
            "Soporte técnico y Mesa de Ayuda (Help Desk)",
            "Soporte en sitio y remoto 24/7",
            "Mantenimiento preventivo y correctivo",
            "Gestión de operaciones de TI"
        ]
    },
    {
        icon: <Server className="w-8 h-8 text-neon-cyan" />,
        title: "Infrastructure",
        subtitle: "& Connectivity",
        description: "Diseño y gestión de redes robustas, servidores y entornos híbridos de alto rendimiento.",
        gradient: "from-neon-cyan/20 to-transparent",
        border: "group-hover:border-neon-cyan/50",
        items: [
            "Diseño y administración de infraestructura TI",
            "Redes de voz y datos",
            "Servidores, Nube y entornos híbridos",
            "Cableado estructurado y conectividad"
        ]
    },
    {
        icon: <Shield className="w-8 h-8 text-neon-purple" />,
        title: "Security",
        subtitle: "& Surveillance",
        description: "Protección avanzada para sus activos digitales y físicos con tecnología de vanguardia.",
        gradient: "from-neon-purple/20 to-transparent",
        border: "group-hover:border-neon-purple/50",
        items: [
            "Ciberseguridad y seguridad de la información",
            "Sistemas de videovigilancia CCTV",
            "Control de acceso y monitoreo",
            "Prevención de riesgos y respuesta a incidentes"
        ]
    },
    {
        icon: <Monitor className="w-8 h-8 text-white" />,
        title: "Technology Assets",
        subtitle: "& Licensing",
        description: "Suministro estratégico de hardware y software para potenciar su productividad.",
        gradient: "from-white/10 to-transparent",
        border: "group-hover:border-white/30",
        items: [
            "Venta y renting de equipos de cómputo",
            "Computadores, impresoras y periféricos",
            "Licenciamiento de software y cumplimiento",
            "Gestión del ciclo de vida de los activos"
        ]
    }
];

const Services = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isHighlighted, setIsHighlighted] = useState(false);

    useEffect(() => {
        const handleHighlight = () => {
            setIsHighlighted(true);
            setTimeout(() => setIsHighlighted(false), 2000);
        };

        window.addEventListener('highlight-services', handleHighlight);
        return () => window.removeEventListener('highlight-services', handleHighlight);
    }, []);

    return (
        <section
            id="services"
            className={`relative py-24 bg-obsidian overflow-hidden transition-all duration-1000 ${isHighlighted ? 'shadow-[inset_0_0_100px_rgba(0,127,255,0.1)]' : ''}`}
        >
            {/* Highlight Overlay */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isHighlighted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-azure to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 -translate-y-1/2 w-96 h-96 bg-azure/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure to-neon-purple">Servicios</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Soluciones tecnológicas integrales diseñadas para el mundo empresarial moderno.
                        Cubrimos desde la infraestructura crítica hasta la gestión de activos.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 ${service.border} h-full flex flex-col`}
                        >
                            {/* Hover Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-14 h-14 bg-obsidian/50 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>

                                <h3 className="text-xl font-bold text-white leading-tight">
                                    {service.title} <br />
                                    <span className="text-gray-400 font-normal text-lg">{service.subtitle}</span>
                                </h3>

                                <div className="mt-4 pt-4 border-t border-white/5 flex-grow">
                                    <AnimatePresence mode="wait">
                                        {hoveredIndex === index ? (
                                            <motion.ul
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="space-y-2 overflow-hidden"
                                            >
                                                {service.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                                        <CheckCircle2 className="w-4 h-4 text-azure shrink-0 mt-0.5" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        ) : (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-gray-400 text-sm leading-relaxed"
                                            >
                                                {service.description}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-azure group-hover:text-white transition-colors cursor-pointer">
                                    <span>Ver detalles</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
