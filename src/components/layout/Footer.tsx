import { Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        <li><Link to="/politica-privacidad" className="hover:text-neon-cyan transition-colors">Política de Privacidad</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-gray-500 pb-8">
                <p>&copy; {new Date().getFullYear()} Jhamf Group SAS. Todos los derechos reservados.</p>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                    <a href="#" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
