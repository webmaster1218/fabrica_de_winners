"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Youtube, Send, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      budget: formData.get('budget'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
      }
    } catch (error) {
      alert('Error en la conexión. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="relative py-20 lg:py-32 bg-[#030305] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

          {/* Left Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                HABLEMOS DE <br />
                <span className="text-white/40">TU PRÓXIMO NIVEL</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md">
                No somos una agencia más. Somos tu socio estratégico en el ecosistema digital. Primera consultoría estratégica sin costo.
              </p>
            </motion.div>

            <div className="space-y-6 mb-16">
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm italic">
                Estamos listos para transformar tu presencia digital. Completa el formulario y un especialista se pondrá en contacto contigo en menos de 24 horas.
              </p>
            </div>
          </div>

          {/* Right Column (Form) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-[2.5rem] blur opacity-20" />
            <div className="relative bg-[#0a0a0c] p-10 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
              {submitted ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">¡Mensaje Enviado!</h3>
                  <p className="text-gray-400">Gracias por contactarnos. Nuestro equipo te responderá en breve.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-blue-500 hover:underline text-sm font-bold"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nombre</label>
                      <input name="name" required type="text" placeholder="Juan Pérez" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                      <input name="email" required type="email" placeholder="juan@empresa.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-700" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Presupuesto Mensual</label>
                    <select name="budget" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-gray-400 appearance-none">
                      <option value="">Selecciona un rango</option>
                      <option value="$500 - $1,000 USD">$500 - $1,000 USD</option>
                      <option value="$1,000 - $3,000 USD">$1,000 - $3,000 USD</option>
                      <option value="$3,000 - $10,000 USD">$3,000 - $10,000 USD</option>
                      <option value="$10,000+ USD">$10,000+ USD</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Mensaje</label>
                    <textarea name="message" required rows={4} placeholder="Cuéntanos sobre tus objetivos..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-700 resize-none" />
                  </div>

                  <motion.button
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-black font-bold py-5 rounded-2xl shadow-xl shadow-white/5 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Enviando... <Loader2 className="animate-spin" size={18} /></>
                    ) : (
                      <>
                        Enviar Propuesta
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

