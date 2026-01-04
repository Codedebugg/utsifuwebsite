import React from 'react';
import { motion } from 'framer-motion';
import { AppMode, Theme } from '../types';
import { Check, Zap } from 'lucide-react';

interface Props {
  mode: AppMode;
  theme: Theme;
}

const Pricing: React.FC<Props> = ({ mode, theme }) => {
  const isDiscover = mode === AppMode.DISCOVER;
  const isDark = theme === Theme.DARK;

  const tiers = [
    {
      name: "Strategy Call",
      price: "₹2,999",
      description: "1-hour deep dive into your business processes.",
      features: ["Process Mapping", "ROI Calculation", "Infrastructure Audit", "Custom Roadmap"],
      cta: "Book Now"
    },
    {
      name: "MVP Implementation",
      price: "₹4,999",
      description: "Get your first major automation live in 1 week.",
      features: ["n8n Setup on AWS/Local", "1 High-Impact Workflow", "Gemini API Integration", "30-Day Support"],
      cta: "Get Started",
      highlighted: true
    },
    {
      name: "Enterprise Custom",
      price: "Custom",
      description: "Full-scale automation agency at your service.",
      features: ["Unlimited Workflows", "Custom Node Dev", "24/7 Monitoring", "Employee Training"],
      cta: "Contact Us"
    }
  ];

  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subTextColor = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <motion.h2 
          animate={isDiscover ? { scale: [1, 1.01, 1] } : {}}
          transition={{ repeat: Infinity, duration: 4 }}
          className={`text-4xl md:text-5xl font-bold mb-4 ${textColor}`}
        >
          Simple Investment.
        </motion.h2>
        <p className={`text-lg ${subTextColor}`}>Transparent pricing for sovereign AI infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            initial={isDiscover ? { opacity: 0, scale: 0.9, y: 50 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={isDiscover ? { rotateY: 5, rotateX: 5, scale: 1.03 } : { y: -10 }}
            className={`p-10 rounded-[2.5rem] flex flex-col relative transition-all duration-500 border-2 ${
              tier.highlighted 
                ? isDiscover 
                  ? isDark ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.3)] backdrop-blur-md' : 'bg-blue-50 border-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.1)] backdrop-blur-md'
                  : 'bg-slate-950 text-white border-blue-600 shadow-2xl'
                : isDiscover ? 'glass border-white/10' : isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
            style={{ perspective: 1000 }}
          >
            {tier.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                <Zap size={12} fill="white" /> Most Popular
              </div>
            )}
            
            <h3 className={`text-2xl font-bold mb-2 ${tier.highlighted && !isDiscover ? 'text-white' : textColor}`}>{tier.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className={`text-4xl font-bold ${tier.highlighted && !isDiscover ? 'text-white' : 'text-slate-950 dark:text-white'}`}>{tier.price}</span>
              {tier.price !== "Custom" && <span className="text-slate-500 text-sm font-medium">/project</span>}
            </div>
            <p className={`text-sm mb-8 leading-relaxed ${tier.highlighted && !isDiscover ? 'text-slate-300' : subTextColor}`}>{tier.description}</p>
            
            <div className="space-y-4 mb-10 flex-1">
              {tier.features.map((f, j) => (
                <div key={j} className="flex items-center gap-3 text-sm">
                  <div className={`p-1 rounded-full ${tier.highlighted ? 'bg-blue-500' : 'bg-blue-500/20'}`}>
                    <Check size={14} className={tier.highlighted ? 'text-white' : 'text-blue-600'} />
                  </div>
                  <span className={tier.highlighted && !isDiscover ? 'text-slate-300' : isDark ? 'text-slate-300' : 'text-slate-800 font-medium'}>{f}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all active:scale-95 ${
              tier.highlighted 
                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-500/30' 
                : isDiscover ? isDark ? 'bg-white text-black' : 'bg-slate-900 text-white' : isDark ? 'bg-white text-slate-950 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
            }`}>
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;