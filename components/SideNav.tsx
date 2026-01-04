import React from 'react';
import { AppMode, Theme } from '../types';
import { Home, Info, Server, Sparkles, Mail, LayoutGrid, DollarSign, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  activeSection: string;
  mode: AppMode;
  theme: Theme;
}

const SideNav: React.FC<Props> = ({ activeSection, mode, theme }) => {
  const isDiscover = mode === AppMode.DISCOVER;
  const isDark = theme === Theme.DARK;
  
  const navItems = [
    { id: 'hero', icon: <Home size={18} />, label: 'Home' },
    { id: 'about', icon: <Info size={18} />, label: 'About' },
    { id: 'deploy', icon: <Server size={18} />, label: 'Hosting' },
    { id: 'how-it-works', icon: <HelpCircle size={18} />, label: 'Process' },
    { id: 'solutions', icon: <LayoutGrid size={18} />, label: 'Solutions' },
    { id: 'ai', icon: <Sparkles size={18} />, label: 'Magic Tool' },
    { id: 'pricing', icon: <DollarSign size={18} />, label: 'Pricing' },
    { id: 'contact', icon: <Mail size={18} />, label: 'Contact' },
  ];

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-4 top-4 bottom-4 w-16 hidden md:flex flex-col items-center z-50">
      {/* Main Glass Container */}
      <div className={`w-full h-full rounded-3xl border flex flex-col items-center py-6 transition-all duration-700 glass-morph shadow-2xl ${
        isDiscover 
          ? 'bg-white/5 border-white/10 shadow-blue-500/10' 
          : isDark 
            ? 'bg-slate-900/40 border-slate-800 shadow-black/40' 
            : 'bg-white/60 border-slate-200 shadow-slate-200/50'
      }`}>
        
        {/* Logo Section */}
        <div className="mb-8 shrink-0">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/30 text-lg italic tracking-tighter"
          >
            U
          </motion.div>
        </div>

        {/* Navigation Items Container - Uses flex-grow and justify-evenly to fit any screen height */}
        <div className="flex-1 flex flex-col justify-evenly items-center w-full px-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                className="group relative p-3 flex items-center justify-center transition-all outline-none"
              >
                {/* Active Highlight Background with overshoot/spring animation */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className={`absolute inset-0 rounded-xl z-0 ${
                        isDiscover ? 'bg-blue-600' : isDark ? 'bg-white' : 'bg-slate-900'
                      }`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: [0.8, 1.15, 1], // Overshoot effect: goes ahead then comes back
                        opacity: 1 
                      }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 18, 
                        mass: 0.8 
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <span className={`relative z-10 transition-colors duration-300 ${
                  isActive 
                    ? isDiscover ? 'text-white' : isDark ? 'text-slate-950' : 'text-white'
                    : isDiscover ? 'text-slate-400 group-hover:text-white' : isDark ? 'text-slate-500 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'
                }`}>
                  {item.icon}
                </span>
                
                {/* Fluid Tooltip */}
                <motion.span 
                  initial={false}
                  className={`absolute left-full ml-6 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 pointer-events-none z-[70] shadow-2xl border ${
                    isDark || isDiscover 
                      ? 'bg-slate-900 border-white/10 text-white shadow-black/50' 
                      : 'bg-white border-slate-100 text-slate-900 shadow-slate-200/40'
                  }`}
                >
                  {item.label}
                </motion.span>

                {/* Side Indicator Line */}
                {isActive && (
                  <motion.div 
                    layoutId="side-line"
                    className="absolute -left-2 w-1 h-6 bg-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Decorative Bottom Dot */}
        <div className="mt-8 shrink-0 flex flex-col items-center gap-1.5 opacity-30">
          <div className="w-1 h-1 rounded-full bg-blue-500" />
          <div className="w-1 h-1 rounded-full bg-blue-500/50" />
        </div>
      </div>
    </nav>
  );
};

export default SideNav;