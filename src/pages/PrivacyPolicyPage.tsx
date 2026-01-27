import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const PrivacyPolicyPage = () => {
    return (
        <div className="bg-obsidian min-h-screen text-white font-sans flex flex-col">
            <Navbar onOpenWizard={() => { }} />

            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-16">
                        <span className="text-neon-cyan font-mono mb-4 block">JHAMF GROUP SAS</span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Política de Privacidad y Tratamiento de Datos</h1>
                        <p className="text-gray-400">Última actualización: {new Date().getFullYear()}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-neon-cyan/10 rounded-xl flex items-center justify-center border border-neon-cyan/20">
                                    <FileText className="w-8 h-8 text-neon-cyan" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Documento Oficial</h3>
                                    <p className="text-gray-400 text-sm">Política Tratamiento de Datos Personales.pdf</p>
                                </div>
                            </div>
                            <a
                                href="/Politica-Tratamiento-de-datos-002.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full md:w-auto px-8 py-3 bg-azure hover:bg-neon-blue text-white rounded-lg transition-all flex items-center justify-center gap-2 font-medium group"
                            >
                                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                                Descargar PDF
                            </a>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        <p>
                            En JHAMF GROUP SAS, estamos comprometidos con la protección de la privacidad y los datos personales de nuestros clientes,
                            usuarios y socios. Esta política describe cómo recolectamos, usamos y protegemos su información.
                        </p>

                        <h3>1. Responsable del Tratamiento</h3>
                        <p>
                            JHAMF GROUP SAS, sociedad legalmente constituida, es la responsable del tratamiento de los datos personales.
                        </p>

                        <h3>2. Finalidad del Tratamiento</h3>
                        <p>
                            Sus datos personales serán utilizados para:
                        </p>
                        <ul>
                            <li>Prestación de servicios de consultoría y tecnología.</li>
                            <li>Comunicación sobre novedades, eventos y servicios.</li>
                            <li>Cumplimiento de obligaciones legales y contractuales.</li>
                            <li>Mejora de nuestros servicios a través de análisis y estadísticas.</li>
                        </ul>

                        <h3>3. Derechos de los Titulares</h3>
                        <p>
                            Como titular de los datos, usted tiene derecho a conocer, actualizar, rectificar y suprimir su información personal,
                            así como a revocar la autorización otorgada para su tratamiento.
                        </p>

                        <p className="text-sm text-gray-500 mt-8 italic border-t border-white/10 pt-4">
                            Nota: Este es un resumen informativo. Para conocer todos los detalles legales, por favor descargue el documento oficial PDF utilizando el botón superior.
                        </p>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicyPage;
