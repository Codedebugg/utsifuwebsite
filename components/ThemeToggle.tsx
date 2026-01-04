import React from 'react';
import { Theme, AppMode } from '../types';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  theme: Theme;
  onToggle: () => void;
  mode: AppMode;
}

const ThemeToggle: React.FC<Props> = ({ theme, onToggle, mode }) => {
  const isDiscover = mode === AppMode.DISCOVER;
  const isDark = theme === Theme.DARK;

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={onToggle}
      className={`group relative w-16 h-16 rounded-2xl transition-all duration-500 flex items-center justify-center overflow-hidden border-2 z-[100] ${
        isDiscover 
          ? isDark 
            ? 'bg-blue-600 border-white/40 text-white shadow-[0_0_30px_rgba(59,130,246,0.6)]' 
            : 'bg-white border-blue-600 text-blue-600 shadow-2xl'
          : isDark 
            ? 'bg-amber-400 border-slate-900 text-slate-950 hover:bg-amber-300' 
            : 'bg-slate-900 border-white text-white hover:bg-slate-800 shadow-xl'
      }`}
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 360, scale: [0.8, 1.1, 1] }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {isDark ? <Moon size={24} strokeWidth={3} /> : <Sun size={24} strokeWidth={3} />}
      </motion.div>
      
      {/* Absolute high-contrast label */}
      <div className={`absolute bottom-1 text-[7px] font-black uppercase tracking-tighter ${
        isDark ? isDiscover ? 'text-white/70' : 'text-slate-900' : 'text-blue-600'
      }`}>
        {isDark ? 'DARK' : 'LIGHT'}
      </div>
    </motion.button>
  );
};

export default ThemeToggle;