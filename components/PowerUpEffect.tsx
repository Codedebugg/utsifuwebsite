
import React from 'react';
import { motion } from 'framer-motion';
import { AppMode } from '../types';

interface PowerUpEffectProps {
  mode: AppMode;
  isActive: boolean;
}

const PowerUpEffect: React.FC<PowerUpEffectProps> = ({ mode, isActive }) => {
  const isDiscover = mode === AppMode.DISCOVER;

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Background Pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 ${isDiscover ? 'bg-blue-600' : 'bg-slate-900'}`}
      />

      {/* Electric Spark Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={isDiscover 
            ? { x: '50vw', y: '50vh', scale: 0, opacity: 1 } 
            : { 
                x: `${Math.random() * 100}vw`, 
                y: `${Math.random() * 100}vh`, 
                scale: 1.5, 
                opacity: 0 
              }
          }
          animate={isDiscover
            ? { 
                x: `${Math.random() * 100}vw`, 
                y: `${Math.random() * 100}vh`, 
                scale: [0, 1, 0], 
                opacity: [1, 1, 0] 
              }
            : { 
                x: '50vw', 
                y: '50vh', 
                scale: [1.5, 0], 
                opacity: [0, 1, 0] 
              }
          }
          transition={{ duration: 0.8, ease: "circOut", delay: Math.random() * 0.2 }}
          className="absolute w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
        />
      ))}

      {/* Circuit Paths Outgrowth */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-60">
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * (Math.PI / 180);
          const x2 = 50 + Math.cos(angle) * 100;
          const y2 = 50 + Math.sin(angle) * 100;

          return (
            <motion.path
              key={i}
              d={`M 50 50 L ${x2} ${y2}`}
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="100"
              initial={{ strokeDashoffset: isDiscover ? 100 : 0 }}
              animate={{ strokeDashoffset: isDiscover ? 0 : 100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default PowerUpEffect;
