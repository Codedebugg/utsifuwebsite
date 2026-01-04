import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppMode, Theme } from '../types';
import { ChevronRight, Activity, Cpu, Database, Bell, Clock, Mail } from 'lucide-react';

interface HeroProps {
  mode: AppMode;
  theme: Theme;
}

const WorkflowPeek: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [activeNode, setActiveNode] = useState(0);
  const isDark = theme === Theme.DARK;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    { icon: <Mail size={22} />, label: "Trigger", color: "blue" },
    { icon: <Cpu size={22} />, label: "AI Agent", color: "purple" },
    { icon: <Database size={22} />, label: "Sync CRM", color: "emerald" },
    { icon: <Bell size={22} />, label: "Alert", color: "amber" }
  ];

  return (
    <div className="relative w-full h-[550px] flex items-center justify-center">
      <div className={`absolute inset-0 opacity-[0.1] ${isDark ? 'bg-[radial-gradient(#3b82f6_1px,transparent_1px)]' : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)]'}`} style={{ backgroundSize: '32px 32px' }} />
      
      <div className="absolute inset-0 liquid-container opacity-20 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-12 items-center w-full">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <motion.path 
            d="M 150 250 Q 300 250 450 250 Q 600 250 750 250" 
            fill="none" 
            stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.03)"} 
            strokeWidth="3" 
          />
          <AnimatePresence>
            {activeNode < 3 && (
              <motion.circle
                key={`pulse-${activeNode}`}
                r="6"
                fill="#3b82f6"
                initial={{ cx: 150 + activeNode * 200, cy: 250, opacity: 0 }}
                animate={{ cx: 150 + (activeNode + 1) * 200, cy: 250, opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, ease: "anticipate" }}
              />
            )}
          </AnimatePresence>
        </svg>

        <div className="flex flex-row justify-evenly items-center w-full max-w-4xl relative px-10">
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ 
                scale: activeNode === i ? 1.15 : 1,
                y: activeNode === i ? -10 : 0,
                borderColor: activeNode === i ? (node.color === 'blue' ? '#3b82f6' : node.color === 'purple' ? '#a855f7' : '#10b981') : 'rgba(128,128,128,0.1)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative w-28 h-28 md:w-32 md:h-32 rounded-[2.5rem] border-2 flex flex-col items-center justify-center gap-3 glass-morph shadow-2xl transition-all ${
                isDark ? 'bg-white/5' : 'bg-white'
              }`}
            >
              <div className={`${activeNode === i ? 'text-blue-500 scale-110' : 'text-slate-400'} transition-all duration-500`}>
                {node.icon}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest text-center px-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {node.label}
              </span>
              
              {activeNode === i && (
                <motion.div 
                  layoutId="active-glow"
                  className="absolute -inset-3 rounded-[3rem] border-2 border-blue-500/20 animate-pulse"
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={`w-full max-w-sm p-6 rounded-3xl border font-mono text-[10px] overflow-hidden shadow-2xl ${isDark ? 'bg-black/60 border-white/5 text-blue-400' : 'bg-blue-50/80 border-blue-100 text-blue-800'}`}
        >
          <div className="flex items-center gap-3 mb-4 border-b border-blue-500/10 pb-2">
            <Activity size={12} className="animate-pulse" />
            <span className="font-black uppercase tracking-widest">Live Execution Stream</span>
          </div>
          <div className="space-y-2">
            <p className={`transition-all duration-500 ${activeNode >= 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>{`>> [AUTH] WEBHOOK_RECEIVED_OK`}</p>
            <p className={`transition-all duration-500 delay-75 ${activeNode >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>{`>> [LLM] GEMINI_ANALYSIS: HIGH_INTENT`}</p>
            <p className={`transition-all duration-500 delay-150 ${activeNode >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>{`>> [DB] CRM_UPDATE: SUCCESS_V14`}</p>
            <p className={`transition-all duration-500 delay-225 ${activeNode >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>{`>> [NOTIFY] SLACK_PING: TEAM_ALERT`}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Hero: React.FC<HeroProps> = ({ mode, theme }) => {
  const isDiscover = mode === AppMode.DISCOVER;
  const isDark = theme === Theme.DARK;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center w-full relative min-h-[90vh] py-10 md:py-20">
      <motion.div
        initial={isDiscover ? { x: -60, opacity: 0 } : { opacity: 0, y: 30 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 100, damping: 20 }}
        className="relative z-40"
      >
        <div className="flex flex-wrap items-center gap-4 mb-6 md:mb-10">
          <motion.div 
            className={`inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-black tracking-[0.4em] border transition-all ${
              isDiscover 
                ? isDark 
                  ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.1)]' 
                  : 'bg-white border-blue-600/30 text-blue-700 shadow-xl'
                : isDark 
                  ? 'bg-slate-800 border-slate-700 text-blue-400'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}
            whileHover={{ x: 10, scale: 1.02 }}
          >
            <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 animate-ping" />
            SOVEREIGN AI INFRASTRUCTURE
          </motion.div>

          <motion.div 
            className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[8px] md:text-[9px] font-black uppercase tracking-widest ${isDark ? '' : 'bg-emerald-50 border-emerald-100'}`}
          >
            <Clock size={12} className="animate-spin-slow" />
            Saving 40+ hrs/wk
          </motion.div>
        </div>
        
        <h1 className={`text-4xl sm:text-7xl md:text-[9.5rem] font-bold leading-[1] md:leading-[0.82] mb-8 md:mb-12 tracking-tighter ${
          isDiscover 
            ? 'italic font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500' 
            : isDark ? 'text-white' : 'text-slate-900'
        }`}>
          AI <br />
          <motion.span 
            animate={isDiscover ? { y: [0, -8, 0] } : {}}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className={isDiscover ? 'text-blue-500 inline-block drop-shadow-[0_0_60px_rgba(59,130,246,0.4)]' : 'text-blue-600'}
          >
            Automations.
          </motion.span>
        </h1>
        
        <p className={`text-base md:text-2xl max-w-lg mb-10 md:mb-14 leading-relaxed font-light ${
          isDiscover 
            ? isDark ? 'text-slate-300' : 'text-slate-800 font-medium'
            : isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          We deploy <span className="font-bold underline decoration-blue-500/30 underline-offset-8">custom n8n engines</span> that work for you, not against you. Stop paying "SaaS Taxes" and own your logic.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <motion.a 
            href="#solutions" 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`shimmer-btn px-8 md:px-12 py-5 md:py-7 rounded-[2.5rem] font-black text-lg md:text-xl flex items-center justify-center gap-4 transition-all duration-300 group shadow-2xl ${
              isDiscover 
                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/50' 
                : isDark 
                  ? 'bg-white text-slate-950 hover:bg-slate-200 shadow-white/10' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            Explore Solutions <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </motion.a>
          
          <motion.button 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 md:px-12 py-5 md:py-7 rounded-[2.5rem] font-black text-lg md:text-xl border-2 flex items-center justify-center gap-4 transition-all duration-300 ${
              isDiscover 
                ? isDark 
                  ? 'border-white/10 text-white hover:bg-white/5' 
                  : 'border-blue-300 text-blue-800 hover:bg-blue-50 bg-white shadow-lg'
                : isDark 
                  ? 'border-slate-700 text-white hover:bg-slate-800' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            The Procedure <Activity size={22} />
          </motion.button>
        </div>
      </motion.div>

      <div className="relative hidden lg:flex items-center justify-center z-0">
        <AnimatePresence mode="wait">
          {isDiscover ? (
            <motion.div 
              key="discover-visual"
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 60, damping: 12 }}
              className="w-full"
            >
              <WorkflowPeek theme={theme} />
            </motion.div>
          ) : (
            <motion.div 
              key="prof-visual"
              initial={{ scale: 0.9, opacity: 0, x: 50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-lg rounded-[4.5rem] p-16 border transition-all ${
                isDark ? 'bg-slate-900 border-slate-800 shadow-2xl shadow-black/50' : 'bg-white border-slate-200 shadow-[0_40px_80px_rgba(0,0,0,0.08)]'
              }`}
            >
               <div className="flex items-center justify-between mb-12">
                 <div className="flex gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <div className="w-4 h-4 rounded-full bg-amber-500" />
                    <div className="w-4 h-4 rounded-full bg-emerald-500" />
                 </div>
                 <div className="font-mono text-[11px] uppercase tracking-widest text-slate-500 font-black">U_NODE_SYS_PRO_v2</div>
               </div>
               <div className="space-y-10">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className={`h-5 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} />
                  <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ delay: 0.3 }} className={`h-5 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} />
                  <div className="flex items-center gap-8">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center shadow-xl ${isDark ? 'bg-blue-600/20' : 'bg-blue-600'}`}>
                      <Cpu className="text-white" size={28} />
                    </motion.div>
                    <div className={`h-5 w-1/2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} />
                  </div>
                  <div className="pt-12">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      className="shimmer-btn h-32 w-full bg-slate-950 rounded-[3.5rem] flex items-center justify-center text-white font-black text-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] tracking-[0.3em] uppercase transition-all"
                    >
                      INITIALIZE
                    </motion.div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;