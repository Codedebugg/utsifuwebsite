import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppMode, Theme } from './types';
import SideNav from './components/SideNav';
import BottomNav from './components/BottomNav';
import Hero from './components/Hero';
import About from './components/About';
import DeploymentInfo from './components/DeploymentInfo';
import AutomationShowcase from './components/AutomationShowcase';
import Solutions from './components/Solutions';
import Pricing from './components/Pricing';
import Implementation from './components/Implementation';
import ContactSection from './components/ContactSection';
import ModeToggle from './components/ModeToggle';
import ThemeToggle from './components/ThemeToggle';
import UtsifuChatbot from './components/UtsifuChatbot';
import PowerUpEffect from './components/PowerUpEffect';
import Preloader from './components/Preloader';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

const Comets: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <div 
        key={i} 
        className="comet" 
        style={{ 
          top: `${Math.random() * 70}%`, 
          left: `${90 + Math.random() * 50}%`, 
          animationDelay: `${Math.random() * 15}s`,
          animationDuration: `${8 + Math.random() * 8}s`
        }} 
      />
    ))}
  </div>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<AppMode>(AppMode.PROFESSIONAL);
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const toggleMode = useCallback(() => {
    setIsTransitioning(true);
    const newMode = mode === AppMode.DISCOVER ? AppMode.PROFESSIONAL : AppMode.DISCOVER;
    
    // Time the mode swap with the visual peak of the transition
    setTimeout(() => {
      setMode(newMode);
      setTimeout(() => setIsTransitioning(false), 600);
    }, 400);
  }, [mode]);

  const toggleTheme = useCallback(() => setTheme(p => p === Theme.LIGHT ? Theme.DARK : Theme.LIGHT), []);

  useEffect(() => {
    // Sync with ElectricHexLoader duration (approx 5.5s + transition buffer)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6200);

    const handleScroll = () => {
      const sections = ['hero', 'about', 'deploy', 'how-it-works', 'solutions', 'ai', 'pricing', 'contact'];
      let current = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 400) current = section;
        }
      }
      setActiveSection(current);
    };

    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const isDark = theme === Theme.DARK;
  const isDiscover = mode === AppMode.DISCOVER;

  const bgStyle = useMemo(() => {
    if (isDark) return isDiscover ? 'bg-[#030712]' : 'bg-slate-950';
    return isDiscover ? 'bg-blue-50/40' : 'bg-white';
  }, [isDark, isDiscover]);

  const textStyle = useMemo(() => {
    if (isDark) return 'text-slate-100';
    return 'text-slate-900';
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-all duration-700 ${bgStyle} ${textStyle} selection:bg-blue-500 selection:text-white`}>
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-[100]" style={{ scaleX }} />
      
      {/* Mode Switch Power Up Effect */}
      <PowerUpEffect mode={mode} isActive={isTransitioning} />

      <AnimatePresence>
        {isDiscover && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 pointer-events-none z-0">
            <Comets />
            {isDark && (
              <motion.div 
                className="absolute w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]"
                animate={{ x: mousePos.x - 400, y: mousePos.y - 400 }}
                transition={{ type: 'spring', damping: 50, stiffness: 40 }}
              />
            )}
            {!isDark && (
              <motion.div 
                className="absolute w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[120px]"
                animate={{ x: mousePos.x - 400, y: mousePos.y - 400 }}
                transition={{ type: 'spring', damping: 50, stiffness: 40 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <SideNav activeSection={activeSection} mode={mode} theme={theme} />
      <BottomNav activeSection={activeSection} mode={mode} theme={theme} />
      
      <div className="fixed top-6 right-6 z-[60] flex flex-col items-end gap-3">
        <ModeToggle mode={mode} onToggle={toggleMode} theme={theme} />
        <ThemeToggle theme={theme} onToggle={toggleTheme} mode={mode} />
      </div>

      <main className="md:ml-20 mb-20 md:mb-0 relative z-10 overflow-x-hidden">
        <motion.div 
          className="max-w-7xl mx-auto px-6"
          animate={isDiscover ? { rotateX: 1, scale: 0.995 } : { rotateX: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ perspective: 1500 }}
        >
          <section id="hero" className="min-h-screen flex items-center">
            <Hero mode={mode} theme={theme} />
          </section>

          <section id="about" className="py-32">
            <About mode={mode} theme={theme} />
          </section>

          <section id="deploy" className="py-32">
            <DeploymentInfo mode={mode} theme={theme} />
          </section>

          <section id="how-it-works" className="py-32">
            <Implementation mode={mode} theme={theme} />
          </section>

          <section id="solutions" className="py-32">
            <Solutions mode={mode} theme={theme} />
          </section>

          <section id="ai" className="py-32">
            <AutomationShowcase mode={mode} theme={theme} />
          </section>

          <section id="pricing" className="py-32">
            <Pricing mode={mode} theme={theme} />
          </section>

          <section id="contact" className="py-32 pb-60">
            <ContactSection mode={mode} theme={theme} />
          </section>
        </motion.div>
      </main>

      <UtsifuChatbot mode={mode} theme={theme} />
    </div>
  );
};

export default App;