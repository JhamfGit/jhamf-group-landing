import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Upload, Send, FileText, AlertCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import emailjs from '@emailjs/browser';

// ⚠️ REEMPLAZA ESTOS VALORES CON LOS TUYOS DE EMAILJS
const EMAILJS_SERVICE_ID = 'service_tuxji4s';      // Ej: 'service_xyz123'
const EMAILJS_TEMPLATE_ID = 'template_t56ifou';    // Ej: 'template_abc123'
const EMAILJS_PUBLIC_KEY = 'm-Iue2hNH0SNnZdmt';      // Ej: 'abc123XYZ'

const PQRSPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        type: '',
        service: '',
        description: '',
        acceptedPolicy: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, acceptedPolicy: e.target.checked }));
    };

    const generateReference = () => {
        return `PQRS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${new Date().getFullYear()}`;
    };

    // Mapeo de tipos de solicitud para el email
    const getTipoSolicitudLabel = (type: string) => {
        const tipos: Record<string, string> = {
            'peticion': 'Petición',
            'queja': 'Queja',
            'reclamo': 'Reclamo',
            'sugerencia': 'Sugerencia'
        };
        return tipos[type] || type;
    };

    // Mapeo de servicios para el email
    const getServicioLabel = (service: string) => {
        const servicios: Record<string, string> = {
            'consultoria': 'Consultoría IT',
            'ciberseguridad': 'Ciberseguridad',
            'cloud': 'Cloud Computing',
            'infraestructura': 'Infraestructura',
            'otro': 'Otro'
        };
        return servicios[service] || service;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const reference = generateReference();

        try {
            // Preparar los datos para EmailJS
            const templateParams = {
                fullName: formData.fullName,
                companyName: formData.companyName,
                email: formData.email,
                phone: formData.phone || 'No proporcionado',
                type: getTipoSolicitudLabel(formData.type),
                service: getServicioLabel(formData.service),
                description: formData.description,
                referenceNumber: reference,
                fecha: new Date().toLocaleString('es-CO', { 
                    timeZone: 'America/Bogota',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            // Enviar email con EmailJS
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            setReferenceNumber(reference);
            setSubmitStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Error al enviar PQRS:', error);
            setSubmitStatus('error');
            setErrorMessage('Error al enviar la solicitud. Por favor verifica tu conexión e intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-obsidian min-h-screen text-white font-sans">
            <Navbar onOpenWizard={() => { }} />

            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-azure mb-6">
                        Centro de Atención PQRS
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Estamos comprometidos con la excelencia. Utilice este canal para radicar sus
                        Peticiones, Quejas, Reclamos y Sugerencias. Su opinión es fundamental para
                        nuestra mejora continua.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                            <FileText size={16} className="text-neon-cyan" />
                            Tiempo de respuesta: 3-5 días hábiles
                        </span>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {submitStatus === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 border border-neon-cyan/30 rounded-2xl p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="text-neon-cyan w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">¡Solicitud Radicada con Éxito!</h2>
                            <p className="text-gray-300 mb-6">
                                Hemos recibido su solicitud correctamente. Se ha enviado un correo de confirmación a
                                <span className="text-neon-cyan font-medium"> coordinacionsgt@jhamf.com</span>.
                            </p>
                            <div className="bg-black/40 rounded-lg p-4 inline-block mb-8 border border-white/10">
                                <p className="text-sm text-gray-400 mb-1">Número de Radicado</p>
                                <p className="text-2xl font-mono text-neon-cyan tracking-wider">{referenceNumber}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        setSubmitStatus('idle');
                                        setFormData({
                                            fullName: '',
                                            companyName: '',
                                            email: '',
                                            phone: '',
                                            type: '',
                                            service: '',
                                            description: '',
                                            acceptedPolicy: false
                                        });
                                    }}
                                    className="px-8 py-3 bg-azure hover:bg-azure/80 text-white rounded-lg transition-colors font-medium"
                                >
                                    Nueva Solicitud
                                </button>
                            </div>
                        </motion.div>
                    ) : submitStatus === 'error' ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 border border-red-500/30 rounded-2xl p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="text-red-500 w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Error al Enviar</h2>
                            <p className="text-gray-300 mb-6">
                                {errorMessage || 'Hubo un problema al enviar su solicitud. Por favor intente nuevamente.'}
                            </p>
                            <button
                                onClick={() => setSubmitStatus('idle')}
                                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                            >
                                Intentar Nuevamente
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onSubmit={handleSubmit}
                            className="space-y-8 bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl backdrop-blur-sm"
                        >
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                                    <span className="text-neon-cyan">01.</span> Información del Solicitante
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Nombre Completo *</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-gray-600"
                                            placeholder="Juan Pérez"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Empresa *</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            required
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-gray-600"
                                            placeholder="Nombre de su organización"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Correo Electrónico *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-gray-600"
                                            placeholder="correo@ejemplo.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Teléfono (Opcional)</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-gray-600"
                                            placeholder="+57 300 123 4567"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* PQRS Details */}
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                                    <span className="text-neon-cyan">02.</span> Detalle de la Solicitud
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Tipo de Solicitud *</label>
                                        <select
                                            name="type"
                                            required
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled className="text-gray-500">Seleccione el tipo</option>
                                            <option value="peticion">Petición (Información general)</option>
                                            <option value="queja">Queja (Inconformidad con conducta)</option>
                                            <option value="reclamo">Reclamo (Inconformidad con servicio)</option>
                                            <option value="sugerencia">Sugerencia (Mejora)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Servicio Relacionado *</label>
                                        <select
                                            name="service"
                                            required
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Seleccione el servicio</option>
                                            <option value="consultoria">Consultoría IT</option>
                                            <option value="ciberseguridad">Ciberseguridad</option>
                                            <option value="cloud">Cloud Computing</option>
                                            <option value="infraestructura">Infraestructura</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Descripción Detallada *</label>
                                    <textarea
                                        name="description"
                                        required
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={5}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-gray-600 resize-none"
                                        placeholder="Por favor describa su solicitud con el mayor detalle posible..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Attachments Section - Visual Only */}
                            <div>
                                <div className="border border-dashed border-white/20 rounded-lg p-6 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                                    <Upload className="mx-auto h-8 w-8 text-gray-400 group-hover:text-neon-cyan mb-3 transition-colors" />
                                    <p className="text-sm text-gray-300 font-medium">Adjuntar Archivos (Opcional)</p>
                                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG hasta 5MB</p>
                                </div>
                            </div>

                            {/* Policies and Submit */}
                            <div className="pt-4 space-y-6">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            required
                                            name="acceptedPolicy"
                                            checked={formData.acceptedPolicy}
                                            onChange={handleCheckboxChange}
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500 transition-all checked:border-neon-cyan checked:bg-neon-cyan group-hover:border-neon-cyan"
                                        />
                                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg className="h-3.5 w-3.5 text-black" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-400 select-none">
                                        He leído y acepto la <a href="/politica-privacidad" target="_blank" className="text-neon-cyan underline hover:text-white transition-colors">Política de Tratamiento de Datos Personales</a> y autorizo el uso de mis datos para el trámite de esta solicitud.
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.acceptedPolicy}
                                    className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all
                    ${isSubmitting || !formData.acceptedPolicy
                                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-azure to-neon-blue hover:shadow-lg hover:shadow-neon-cyan/25 text-white'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Radicar Solicitud
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PQRSPage;