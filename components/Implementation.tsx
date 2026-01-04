import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { AppMode, Theme } from '../types';
import { 
  Server, FileJson, Link, MessageSquare, Settings, Zap, PlayCircle, Terminal, ArrowRight
} from 'lucide-react';

interface Props {
  mode: AppMode;
  theme: Theme;
}

const TypewriterText: React.FC<{ text: string; delay?: number; className?: string; theme: Theme }> = ({ text, delay = 0, className, theme }) => {
  const [displayText, setDisplayText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isInView, text]);

  return <p ref={ref} className={className}>{displayText}<span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1" /></p>;
};

const procedureSteps = [
  { icon: <MessageSquare size={32} />, title: "Request", desc: "We audit your manual stack and pinpoint automation ROI targets." },
  { icon: <Settings size={32} />, title: "Select", desc: "Pick AWS, Google Cloud, or your own local hardware environment." },
  { icon: <Server size={32} />, title: "n8n", desc: "Our team deploys a secure, private n8n instance in your cloud." },
  { icon: <FileJson size={32} />, title: "Import", desc: "Custom JSON workflows delivered as blueprints to your cluster." },
  { icon: <Link size={32} />, title: "Connect", desc: "Vault your API keys locally. We build, you hold the master keys." },
  { icon: <PlayCircle size={32} />, title: "Launch", desc: "Automation goes live. Zero recurring fees, 100% data ownership." }
];

const Implementation: React.FC<Props> = ({ mode, theme }) => {
  const [activeStep, setActiveStep] = useState(0);
  const isDiscover = mode === AppMode.DISCOVER;
  const isDark = theme === Theme.DARK;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progressWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => setActiveStep(p => (p < 5 ? p + 1 : p)), 4000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const stepCardStyle = (isActive: boolean) => {
    if (isActive) return 'bg-blue-600 border-blue-400 text-white shadow-[0_40px_80px_rgba(59,130,246,0.35)] md:-translate-y-10 scale-[1.05] md:scale-[1.08] z-30';
    if (isDiscover) {
      return isDark 
        ? 'bg-white/5 border-white/5 text-slate-300 backdrop-blur-md opacity-40 grayscale-[0.5]' 
        : 'bg-white border-blue-200 text-slate-900 shadow-xl opacity-60';
    }
    return isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-700 shadow-md';
  };

  const mainHeadingColor = isDiscover ? 'italic text-blue-600 drop-shadow-sm' : isDark ? 'text-white' : 'text-slate-950';
  const subHeadingColor = isDark ? 'text-slate-400' : 'text-slate-800 font-medium';

  return (
    <div className="w-full py-10 md:py-20" id="how-it-works" ref={sectionRef}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-8 md:gap-12">
        <div className="max-w-3xl">
          <h2 className={`text-5xl md:text-[7.5rem] font-black mb-6 md:mb-10 tracking-tighter leading-none ${mainHeadingColor}`}>
            The Procedure.
          </h2>
          <p className={`text-xl md:text-2xl font-light leading-relaxed ${subHeadingColor}`}>
            Turning messy real-world operations into <span className="font-black text-blue-600">sovereign code</span> through six precise engineering phases.
          </p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`px-8 md:px-12 py-4 md:py-6 rounded-[2rem] border-2 font-mono text-sm md:text-base flex items-center gap-4 md:gap-6 shadow-2xl ${
          isDark ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-white border-blue-600 text-blue-800'
        }`}>
           <Terminal size={20} className="text-blue-500" />
           CLUSTER_READY: <span className="font-black text-blue-600">5-7 DAYS</span>
        </motion.div>
      </div>

      <div className="relative pb-16 md:pb-24 px-2 md:px-4 overflow-visible">
        {/* Connection Line */}
        <div className="absolute top-[35%] left-0 w-full h-[3px] bg-slate-500/10 -translate-y-1/2 hidden lg:block z-0" />
        <motion.div 
          style={{ width: progressWidth }} 
          className="absolute top-[35%] left-0 h-[3px] bg-blue-600 -translate-y-1/2 hidden lg:block z-0 shadow-electric transition-all" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8 relative">
          {procedureSteps.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                onClick={() => setActiveStep(i)}
                className={`p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border transition-all duration-700 flex flex-col group min-h-[300px] md:min-h-[400px] relative cursor-pointer ${stepCardStyle(isActive)}`}
              >
                <div className="flex justify-between items-center mb-10 md:mb-14">
                  <motion.div 
                    animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[1.75rem] flex items-center justify-center transition-all shadow-lg ${
                      isActive ? 'bg-white/20' : isDark ? 'bg-slate-800' : 'bg-blue-600 shadow-blue-600/20'
                    }`}
                  >
                    {React.cloneElement(step.icon as React.ReactElement<any>, { 
                      className: "text-white",
                      size: 28
                    })}
                  </motion.div>
                  <span className={`font-mono text-[10px] font-black tracking-widest ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>PHASE_0{i+1}</span>
                </div>
                
                <h3 className={`text-xl md:text-2xl font-black mb-4 md:mb-6 uppercase tracking-tighter ${isActive ? 'text-white' : isDark || isDiscover ? 'text-white' : 'text-slate-950'}`}>{step.title}</h3>
                <div className="flex-1">
                  {isActive ? (
                    <TypewriterText text={step.desc} theme={theme} className="text-sm md:text-base leading-relaxed font-black" />
                  ) : (
                    <p className={`text-sm md:text-base leading-relaxed ${isActive ? 'text-white' : isDark ? 'text-slate-400' : 'text-slate-600'}`}>{step.desc}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div 
        whileHover={{ scale: 1.01, y: -5 }}
        className={`mt-20 md:mt-40 p-10 md:p-32 rounded-[3.5rem] md:rounded-[7rem] border-2 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 relative overflow-hidden transition-all duration-1000 ${
        isDiscover ? isDark ? 'bg-blue-600/5 border-white/5 shadow-3xl' : 'bg-white border-blue-200 shadow-[0_60px_120px_rgba(59,130,246,0.15)]' : isDark ? 'bg-slate-900 border-slate-800 shadow-2xl' : 'bg-slate-950 text-white shadow-[0_40px_100px_rgba(0,0,0,0.5)]'
      }`}>
        <div className="flex items-center gap-8 md:gap-16 relative z-10 w-full md:w-auto">
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.15, 1] }}
            transition={{ rotate: { repeat: Infinity, duration: 15, ease: "linear" }, scale: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}
            className="w-20 h-20 md:w-32 md:h-32 rounded-[2rem] md:rounded-[3.5rem] bg-blue-600 flex items-center justify-center text-white shadow-electric shrink-0"
          >
            <Zap size={40} className="md:w-16 md:h-16" fill="currentColor" />
          </motion.div>
          <div>
            <h4 className={`text-3xl md:text-6xl font-black mb-3 md:mb-6 tracking-tighter ${isDark || !isDiscover ? 'text-white' : 'text-slate-950'}`}>Scale without SaaS.</h4>
            <p className={`text-lg md:text-2xl font-light leading-relaxed ${isDark || !isDiscover ? 'text-slate-400' : 'text-slate-800'}`}>Join the sovereign AI movement. Reclaim your logic, ownership, and privacy.</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="shimmer-btn w-full md:w-auto px-10 md:px-20 py-6 md:py-10 bg-blue-600 text-white rounded-[2rem] md:rounded-[4rem] font-black text-xl md:text-3xl hover:bg-blue-500 shadow-electric relative z-10 group shrink-0 active:scale-95"
        >
          Initialize Deployment
          {/* Fixed duplicate className error on line 170 by merging class names */}
          <ArrowRight className="inline-block ml-4 md:ml-6 group-hover:translate-x-4 transition-transform md:w-9 md:h-9" size={28} />
        </motion.button>
        {/* Background Decorative Text */}
        <div className="absolute -bottom-10 md:-bottom-20 -right-10 md:-right-20 text-[10rem] md:text-[25rem] font-black text-blue-500/5 select-none pointer-events-none italic">OPS</div>
      </motion.div>
    </div>
  );
};

export default Implementation;