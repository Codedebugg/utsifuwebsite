
import React, { useState } from 'react';
import { AppMode, Theme } from '../types';
import { Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import InteractiveCat from './InteractiveCat';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from '../services/n8nService';

interface Props {
  mode: AppMode;
  theme: Theme;
}

const ContactSection: React.FC<Props> = ({ mode, theme }) => {
  const isDiscover = mode === AppMode.DISCOVER;
  const isDark = theme === Theme.DARK;
  
  const [formData, setFormData] = useState({ name: '', email: '', goal: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.goal) return;

    setStatus('submitting');

    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', goal: '' });
    } catch (err) {
      console.error("Submission error:", err);
      setStatus('error');
    }
  };

  return (
    <div className="w-full">
      <div className={`p-12 md:p-24 rounded-[5rem] text-center flex flex-col items-center overflow-hidden relative transition-all duration-1000 ${
        isDiscover 
          ? 'bg-black/60 border border-white/5 backdrop-blur-3xl shadow-[0_50px_100px_rgba(59,130,246,0.15)]' 
          : isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200 shadow-2xl'
      }`}>
        
        {isDiscover && <InteractiveCat isTyping={status === 'submitting'} inputLength={formData.goal.length} isDeleting={false} />}
        
        <motion.div className={`p-6 rounded-full mt-12 mb-10 ${status === 'success' ? 'bg-emerald-500' : 'bg-blue-600'}`}>
          <Mail className="text-white" size={40} />
        </motion.div>
        
        <h2 className={`text-5xl md:text-7xl font-black mb-8 tracking-tighter ${isDiscover || isDark ? 'text-white' : 'text-slate-950'}`}>
          {status === 'success' ? "Transmission Success." : "Initialize Connection."}
        </h2>

        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.form key="form" onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" className="w-full p-6 rounded-3xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500 transition-all" />
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Work Email" className="w-full p-6 rounded-3xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500 transition-all" />
              </div>
              <textarea required name="goal" value={formData.goal} onChange={handleInputChange} rows={4} placeholder="Describe your workflow needs..." className="w-full p-6 rounded-3xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500 transition-all resize-none" />
              {status === 'error' && <div className="text-red-500 text-sm font-bold bg-red-500/10 p-4 rounded-xl">Connection Error: n8n Webhook Unresponsive.</div>}
              <button disabled={status === 'submitting'} className="w-full py-7 rounded-3xl bg-blue-600 text-white font-black text-2xl hover:bg-blue-500 transition-all flex justify-center items-center gap-4">
                {status === 'submitting' ? <Loader2 className="animate-spin" /> : <>Sync to n8n <ArrowRight /></>}
              </button>
            </motion.form>
          ) : (
            <button onClick={() => setStatus('idle')} className="text-blue-500 font-bold underline">Open New Ticket</button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactSection;
