import React from 'react';
import { motion } from 'framer-motion';
import { AppMode, Theme } from '../types';
import { Users, Workflow, Code, Heart, Coffee, ShieldCheck } from 'lucide-react';

interface AboutProps {
  mode: AppMode;
  theme: Theme;
}

const About: React.FC<AboutProps> = ({ mode, theme }) => {
  const isDiscover = mode === AppMode.DISCOVER;
  const isDark = theme === Theme.DARK;

  const features = [
    {
      icon: <Users size={28} className="text-blue-500" />,
      title: "AI Consultants",
      desc: "Bridging the gap between messy business processes and elegant AI automation logic."
    },
    {
      icon: <Workflow size={28} className="text-purple-500" />,
      title: "n8n Experts",
      desc: "Custom-built workflows for WhatsApp, CRM, and high-scale lead generation systems."
    },
    {
      icon: <Code size={28} className="text-emerald-500" />,
      title: "Self-Hosted",
      desc: "We deploy on your servers. No SaaS monthly taxes, absolute data ownership."
    },
    {
      icon: <ShieldCheck size={28} className="text-amber-500" />,
      title: "Security Native",
      desc: "Credentials remain on your hardware. We never see your master API keys."
    }
  ];

  const team = [
    { name: "Amir", role: "AI Infrastructure", icon: <Code size={18} /> },
    { name: "Ariz", role: "Workflow Lead", icon: <Workflow size={18} /> },
    { name: "Faruk", role: "Strategy", icon: <Heart size={18} /> },
    { name: "Shifa", role: "Support", icon: <Coffee size={18} /> },
  ];

  const cardStyle = isDiscover 
    ? isDark ? 'bg-white/5 border-white/10 hover:border-blue-500/50 backdrop-blur-xl shadow-2xl' : 'bg-white/90 border-blue-100 hover:border-blue-400 shadow-xl'
    : isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm';

  const headingStyle = isDiscover 
    ? isDark ? 'italic font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500' : 'italic font-black text-blue-600'
    : isDark ? 'text-white' : 'text-slate-900';

  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className="w-full">
      <div className="text-center mb-24">
        <h2 className={`text-5xl font-bold mb-8 ${headingStyle}`}>The Team Behind Utsifu.</h2>
        <p className={`max-w-2xl mx-auto text-xl leading-relaxed ${textSecondary}`}>
          Collective of AI architects and engineers building the future of sovereign business intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-10 rounded-[2.5rem] border transition-all duration-500 ${cardStyle}`}
          >
            <div className={`mb-8 p-4 rounded-2xl inline-block ${isDark ? 'bg-white/5' : 'bg-blue-50'}`}>
              {f.icon}
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${textPrimary}`}>{f.title}</h3>
            <p className={`text-base leading-relaxed ${textSecondary}`}>{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className={`rounded-[4rem] p-12 md:p-20 transition-all duration-700 border ${
        isDiscover 
          ? isDark ? 'bg-blue-600/5 border-white/5' : 'bg-blue-50/50 border-blue-100 shadow-2xl shadow-blue-500/5'
          : isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100 shadow-inner'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h3 className={`text-4xl font-bold mb-8 ${textPrimary}`}>The Human Collective.</h3>
            <p className={`mb-12 text-lg leading-relaxed ${textSecondary}`}>
              Automation is empty without creative logic. Our consultants translate messy real-world processes into elegant, self-healing automation engines.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {team.map((member, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isDark ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                  }`}>
                    {member.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold transition-colors ${textPrimary}`}>{member.name}</h4>
                    <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-500 font-bold'}`}>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-[450px] md:h-[600px] rounded-[4rem] overflow-hidden group shadow-2xl bg-slate-950">
             {/* High-quality teamwork image showing collaborative engineering and strategy */}
             <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                alt="Utsifu Collaborative Teamwork" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000"
             />
             
             {/* Gradient Overlay for Text Visibility and Aesthetic Match */}
             <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-purple-600/30 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

             {/* Dynamic Holographic Elements */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-slate-950/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-3xl text-center scale-90 group-hover:scale-100 transition-transform duration-700">
                   <h4 className="text-white font-black text-3xl tracking-tighter italic mb-1 uppercase">Human Strategy</h4>
                   <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.5em]">SOVEREIGN ARCHITECTS</p>
                </div>
             </div>

             {/* Status Badge */}
             <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center text-white font-mono text-xs uppercase tracking-[0.2em] backdrop-blur-2xl bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-2xl z-20">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
                  <span className="font-black">TEAM_SYNC_OK</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-blue-400 font-black">UTSIFU_INTEL_SYSTEM</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;