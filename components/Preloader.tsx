import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap as ZapIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

const ElectricHexLoader = () => {
  const [stage, setStage] = useState('entering'); // entering -> spinning -> overload
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Initial Fluid Entry
    const timer1 = setTimeout(() => setStage('spinning'), 1500);
    // 2. Start generating "Electricity"
    const timer2 = setTimeout(() => setStage('overload'), 3000);
    // 3. Power the page and exit
    const timer3 = setTimeout(() => setIsVisible(false), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Chaotic Spark Generator for "Overload" phase
  useEffect(() => {
    if (stage === 'overload') {
      const interval = setInterval(() => {
        confetti({
          particleCount: 3,
          angle: Math.random() * 360,
          spread: 80,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#a855f7', '#3b82f6', '#ffffff'],
          shapes: ['circle'],
          scalar: 0.5,
          drift: Math.random() * 2 - 1,
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={styles.overlay}
          exit={{ opacity: 0, filter: 'brightness(10) blur(20px)' }}
          transition={{ duration: 0.8 }}
        >
          {/* SVG Filter for Fluid/Gooey Physics */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>

          {/* Background Power Lines with Jitter */}
          <div style={styles.powerGrid}>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                style={styles.powerLine}
                animate={stage === 'overload' ? {
                  opacity: [0.1, 0.8, 0.1],
                  x: [-5, 5, -5],
                  boxShadow: ["0 0 5px #3b82f6", "0 0 25px #a855f7", "0 0 5px #3b82f6"]
                } : { opacity: 0.2 }}
                transition={{ repeat: Infinity, duration: 0.1, delay: i * 0.05 }}
              />
            ))}
          </div>

          {/* Fluid Logo Core */}
          <div style={{ ...styles.fluidWrapper, filter: 'url(#goo)' }}>
            <motion.div
              style={styles.hexagon}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: stage === 'entering' ? [0, 1.2, 1] : 1.1,
                rotate: stage === 'overload' ? [0, 360 * 5] : [0, 360],
              }}
              transition={{ 
                duration: stage === 'overload' ? 0.5 : 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <span style={styles.logoText}>U</span>
              
              {/* Internal Electricity Icon */}
              <motion.div
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                style={styles.zapIcon}
              >
                <ZapIcon size={40} fill="#fff" stroke="#fff" />
              </motion.div>
            </motion.div>

            {/* Arcing Particles popping out of the logo */}
            {stage === 'overload' && [...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                style={styles.arcBit}
                animate={{
                  x: [0, (Math.random() - 0.5) * 400],
                  y: [0, (Math.random() - 0.5) * 400],
                  opacity: [1, 0],
                  scale: [1, 0]
                }}
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
              />
            ))}
          </div>

          {/* Glitch Overlay Text */}
          <motion.div 
            animate={stage === 'overload' ? { x: [-2, 2, -2], opacity: [0.5, 1, 0.5] } : {}}
            transition={{ repeat: Infinity, duration: 0.05 }}
            style={styles.statusText}
          >
            {stage === 'overload' ? "SYSTEM OVERLOAD: POWERING PAGE" : "INITIALIZING..."}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- CSS-in-JS Styles ---
const styles = {
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: '#020005',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    overflow: 'hidden',
  },
  powerGrid: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-around',
    padding: '0 5vw',
  },
  powerLine: {
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #3b82f6, #a855f7, transparent)',
  },
  fluidWrapper: {
    position: 'relative' as const,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '300px',
    height: '300px',
  },
  hexagon: {
    width: '140px',
    height: '160px',
    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' as const,
    boxShadow: '0 0 50px rgba(168, 85, 247, 0.8)',
  },
  logoText: {
    color: '#fff',
    fontSize: '4rem',
    fontWeight: '900',
    fontFamily: 'system-ui, sans-serif',
    zIndex: 2,
  },
  zapIcon: {
    position: 'absolute' as const,
    color: '#fff',
    filter: 'drop-shadow(0 0 10px #fff)',
  },
  arcBit: {
    position: 'absolute' as const,
    width: '20px',
    height: '2px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 15px #3b82f6',
  },
  statusText: {
    marginTop: '40px',
    color: '#3b82f6',
    fontFamily: 'monospace',
    letterSpacing: '4px',
    fontSize: '0.8rem',
    textShadow: '0 0 10px #3b82f6',
  }
};

export default ElectricHexLoader;