import React, { useState } from 'react';
import { AppMode, Theme } from '../types';
import { Home, Server, Sparkles, Mail, LayoutGrid, Info, DollarSign, HelpCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  activeSection: string;
  mode: AppMode;
  theme: Theme;
}

const BottomNav: React.FC<Props> = ({ activeSection, mode, theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDiscover = mode === AppMode.DISCOVER;
  const isDark = theme === Theme.DARK;

  // Essential core items for the primary bottom nav (max 4)
  const coreItems = [
    { id: 'hero', icon: <Home size={22} />, label: 'Home' },
    { id: 'deploy', icon: <Server size={22} />, label: 'Nodes' },
    { id: 'ai', icon: <Sparkles size={22} />, label: 'Magic' },
    { id: 'contact', icon: <Mail size={22} />, label: 'Contact' },
  ];

  // Secondary items for the "More" menu
  const menuItems = [
    { id: 'about', icon: <Info size={18} />, label: 'About Us' },
    { id: 'how-it-works', icon: <HelpCircle size={18} />, label: 'Our Process' },
    { id: 'solutions', icon: <LayoutGrid size={18} />, label: 'Solutions' },
    { id: 'pricing', icon: <DollarSign size={18} />, label: 'Pricing' },
  ];

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className={`fixed bottom-24 left-4 right-4 z-[95] p-6 rounded-[2.5rem] border shadow-2xl backdrop-blur-3xl ${
              isDiscover || isDark ? 'bg-slate-900/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => handleScroll(e, item.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    activeSection === item.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : isDark || isDiscover ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  <span className={activeSection === item.id ? 'text-white' : 'text-blue-500'}>{item.icon}</span>
                  <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={`fixed bottom-0 left-0 right-0 h-20 md:hidden flex justify-around items-center z-[90] border-t transition-all duration-700 px-4 ${
        isDiscover 
          ? 'bg-slate-950 border-white/10' 
          : isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
      } shadow-[0_-10px_30px_rgba(0,0,0,0.1)]`}>
        {coreItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className="flex flex-col items-center justify-center p-2 relative group"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? isDiscover ? 'text-blue-400' : isDark ? 'text-blue-400' : 'text-blue-600'
                  : isDiscover ? 'text-slate-600' : isDark ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {item.icon}
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest mt-0.5 transition-colors ${
                isActive ? 'text-blue-500' : 'text-slate-600'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-1 w-8 h-0.5 bg-blue-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          );
        })}

        {/* The "More" Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col items-center justify-center p-2 relative group"
        >
          <div className={`p-2 rounded-xl transition-all duration-300 ${
            isMenuOpen 
              ? 'text-blue-500 bg-blue-500/10' 
              : isDiscover || isDark ? 'text-slate-600' : 'text-slate-400'
          }`}>
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </div>
          <span className={`text-[8px] font-black uppercase tracking-widest mt-0.5 ${
            isMenuOpen ? 'text-blue-500' : 'text-slate-600'
          }`}>
            {isMenuOpen ? 'Close' : 'More'}
          </span>
        </button>
      </nav>

      {/* Backdrop for closing menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[85] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default BottomNav;