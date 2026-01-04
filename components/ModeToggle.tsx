import React from 'react';
import { AppMode, Theme } from '../types';
import { Sparkles, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  mode: AppMode;
  onToggle: () => void;
  theme: Theme;
}

const ModeToggle: React.FC<Props> = ({ mode, onToggle, theme }) => {
  const isDiscover = mode === AppMode.DISCOVER;
  const isDark = theme === Theme.DARK;

  // Extremely explicit colors to ensure visibility
  const containerBg = isDark ? 'bg-slate-950/90' : 'bg-slate-100/90';
  const containerBorder = isDark ? 'border-slate-800' : 'border-slate-300';

  return (
    <div 
      className={`p-1.5 rounded-[1.5rem] flex transition-all duration-500 border-2 shadow-2xl backdrop-blur-2xl ${containerBg} ${containerBorder}`}
    >
      <button
        onClick={() => !isDiscover && onToggle()}
        className={`relative px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all duration-500 overflow-hidden ${
          isDiscover 
            ? 'text-white' 
            : isDark ? 'text-slate-500 hover:text-slate-200' : 'text-slate-400 hover:text-slate-900'
        }`}
      >
        {isDiscover && (
          <motion.div 
            layoutId="mode-accent"
            className="absolute inset-0 bg-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.6)]"
            transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <Sparkles size={16} className={isDiscover ? 'text-blue-100' : ''} /> Discover
        </span>
      </button>

      <button
        onClick={() => isDiscover && onToggle()}
        className={`relative px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all duration-500 overflow-hidden ${
          !isDiscover 
            ? 'text-white' 
            : isDark ? 'text-slate-600 hover:text-slate-400' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        {!isDiscover && (
          <motion.div 
            layoutId="mode-accent"
            className={`absolute inset-0 ${isDark ? 'bg-slate-800 border-white/10 border' : 'bg-slate-900'}`}
            transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <Briefcase size={16} /> Professional
        </span>
      </button>
    </div>
  );
};

export default ModeToggle;