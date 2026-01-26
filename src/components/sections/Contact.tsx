import { motion } from 'framer-motion';
import { ArrowRight, Mail, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="relative pt-24 pb-12 bg-obsidian border-t border-white/5">

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative p-12 rounded-3xl bg-gradient-to-r from-azure/10 to-neon-purple/10 border border-white/10 overflow-hidden"
                >
                    {/* Glow Effects */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-azure/5 blur-3xl rounded-full" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                            ¿Listo para evolucionar su empresa?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Hablemos de cómo la Inteligencia Artificial puede trabajar sobre su infraestructura Cloud hoy mismo.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="px-8 py-4 bg-white text-obsidian font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                                Agendar Consultoría Gratuita
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors">
                                Ver Casos de Éxito
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 border-t border-white/10 pt-16 mb-12">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <img
                                src="/jhamf-logo-white.png"
                                alt="Jhamf Group Logo"
                                className="h-16 w-auto object-contain"
                            />
                        </div>
                        <p className="text-gray-400 max-w-sm">
                            Expertos en Cloud Infrastructure y Process Automation. Ayudamos a empresas visionarias a construir el futuro de su operación.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Soluciones</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-neon-cyan transition-colors">Cloud Architecture</a></li>
                            <li><a href="#" className="hover:text-neon-cyan transition-colors">Intelligent Automation</a></li>
                            <li><a href="#" className="hover:text-neon-cyan transition-colors">AI Solutions</a></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Empresa</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-neon-cyan transition-colors">Sobre Nosotros</a></li>
                            <li><a href="#" className="hover:text-neon-cyan transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-neon-cyan transition-colors">Contacto</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Jhamf Group SAS. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
