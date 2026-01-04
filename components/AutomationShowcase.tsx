
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppMode, AutomationIdea, Theme } from '../types';
import { Sparkles, Loader2, ArrowRight, Shield, Zap, Terminal, AlertCircle } from 'lucide-react';
import { generateMagicIdeas } from '../services/n8nService';

interface Props {
  mode: AppMode;
  theme: Theme;
}

const AutomationShowcase: React.FC<Props> = ({ mode, theme }) => {
  const isDiscover = mode === AppMode.DISCOVER;
  const isDark = theme === Theme.DARK;
  const [business, setBusiness] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<AutomationIdea[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!business || loading) return;
    setLoading(true);
    setError(null);
    
    try {
      const result = await generateMagicIdeas(business);
      if (result && result.length > 0) {
        setIdeas(result);
      } else {
        setError("Webhook returned no data. Check your n8n workflow output.");
      }
    } catch (err) {
      setError("Failed to connect to n8n cluster.");
    } finally {
      setLoading(false);
    }
  };

  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subTextColor = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className="w-full">
      <div className={`p-10 md:p-16 rounded-[4rem] border transition-all duration-700 overflow-hidden relative ${
        isDiscover 
          ? 'bg-black/60 border-white/5 backdrop-blur-3xl shadow-[0_50px_100px_rgba(59,130,246,0.1)]' 
          : isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl'
      }`}>
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-blue-500/10 pointer-events-none z-0"
        />

        <div className="flex flex-col lg:flex-row gap-16 relative z-10">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-electric">
                 <Shield size={20} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Ops Intel</span>
            </div>
            
            <h2 className={`text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-none ${textColor}`}>
              Magic Tool.
            </h2>
            <p className={`mb-10 text-lg font-light leading-relaxed ${subTextColor}`}>
              Query your <span className="text-blue-500 font-bold italic">sovereign n8n engine</span>. No cached responses—direct from your private node.
            </p>
            
            <div className="relative group">
              <input 
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="Business Type (e.g. Real Estate)"
                className={`w-full p-6 pr-20 rounded-3xl outline-none transition-all font-bold text-lg border-2 ${
                  isDiscover 
                    ? 'bg-white/5 border-white/5 focus:border-blue-500 text-white' 
                    : isDark ? 'bg-slate-800 border-slate-700 focus:border-blue-600 text-white' : 'bg-slate-50 border-slate-100 focus:border-blue-600'
                }`}
              />
              <button 
                onClick={handleGenerate}
                disabled={loading || !business}
                className="shimmer-btn absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-30 disabled:grayscale shadow-lg shadow-blue-600/20"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
              </button>
            </div>
            
            <div className="mt-6 flex items-center gap-3 font-mono text-[9px] text-slate-500">
               <Terminal size={12} />
               STATUS: <span className={loading ? "text-amber-500 animate-pulse" : "text-green-500"}>{loading ? "FETCHING_DATA..." : "TUNNEL_OPEN"}</span>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[350px]">
              <AnimatePresence mode="popLayout">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="col-span-full flex flex-col items-center justify-center p-12 rounded-[3rem] border-2 border-red-500/20 bg-red-500/5 text-red-500"
                  >
                    <AlertCircle size={40} className="mb-4" />
                    <p className="font-bold text-center">{error}</p>
                    <p className="text-xs mt-2 opacity-60">Check console for raw webhook output</p>
                  </motion.div>
                )}

                {ideas.length === 0 && !loading && !error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`col-span-full h-full flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed gap-4 ${
                      isDark ? 'border-white/5 text-slate-700' : 'border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-current flex items-center justify-center opacity-30">
                      <Sparkles size={24} />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-widest font-black">Awaiting n8n Payload...</p>
                  </motion.div>
                )}
                
                {loading && (
                  <div className="col-span-full h-full flex flex-col items-center justify-center gap-8">
                     <div className="flex gap-2">
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 bg-blue-500 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-3 h-3 bg-blue-500 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-3 h-3 bg-blue-500 rounded-full" />
                     </div>
                     <span className="font-mono text-[10px] text-blue-500 uppercase tracking-[0.4em] font-black">Decrypting Sovereign Response...</span>
                  </div>
                )}

                {!loading && ideas.map((idea, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.1 }}
                    className={`p-8 rounded-[2.5rem] border-2 group transition-all duration-500 relative overflow-hidden ${
                      isDiscover 
                        ? 'bg-white/5 border-white/5 hover:border-blue-500 hover:bg-white/10' 
                        : isDark ? 'bg-slate-800 border-slate-700 hover:border-blue-600' : 'bg-slate-50 border-slate-100 hover:border-blue-600 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-widest border border-blue-500/20">
                        {idea.difficulty || 'Expert'}
                      </div>
                      <motion.div whileHover={{ x: 5 }} className="text-slate-500 group-hover:text-blue-500 transition-colors">
                        <ArrowRight size={20} />
                      </motion.div>
                    </div>
                    <h4 className={`text-xl font-black mb-4 tracking-tight ${textColor}`}>{idea.title}</h4>
                    <p className={`text-sm leading-relaxed mb-6 ${subTextColor}`}>{idea.description}</p>
                    
                    <div className="w-full h-1 bg-slate-500/10 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: '100%' }} 
                        transition={{ duration: 1.5, delay: 0.5 + i*0.2 }}
                        className="h-full bg-blue-600 shadow-[0_0_10px_#2563eb]" 
                       />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationShowcase;
