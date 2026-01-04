import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isTyping: boolean;
  inputLength: number;
  isDeleting: boolean;
}

const InteractiveCat: React.FC<Props> = ({ isTyping, inputLength, isDeleting }) => {
  // Eye movement based on input length (simulating "watching" the text grow)
  const eyeX = Math.min(inputLength * 0.08, 5);

  return (
    <div className="relative w-64 h-64 mx-auto mt-6 select-none pointer-events-none">
      <motion.div 
        className="w-full h-full relative"
        animate={{ 
          y: isTyping ? [0, -6, 0] : 0,
          scaleY: isTyping ? [1, 1.03, 1] : 1
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 0.2,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl overflow-visible">
          {/* Fluid Tail */}
          <motion.path 
            d="M75 80 Q95 70 85 45" 
            fill="none" 
            stroke="#2d2d2d" 
            strokeWidth="9" 
            strokeLinecap="round"
            animate={{ 
              rotate: isTyping ? [0, 20, -20, 0] : [0, 8, -8, 0],
              d: isTyping 
                ? ["M75 80 Q95 70 85 45", "M75 80 Q105 75 95 40", "M75 80 Q95 70 85 45"]
                : ["M75 80 Q95 70 85 45", "M75 80 Q90 65 80 40", "M75 80 Q95 70 85 45"]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: isTyping ? 0.35 : 3.5,
              ease: "easeInOut"
            }}
          />

          {/* Body - Slightly Chonkier and Cuter */}
          <circle cx="50" cy="85" r="32" fill="#2d2d2d" />
          <path d="M22 65 Q50 35 78 65 L78 90 L22 90 Z" fill="#2d2d2d" />
          
          {/* Head */}
          <motion.g animate={{ y: isTyping ? -3 : 0 }}>
            <circle cx="50" cy="52" r="26" fill="#2d2d2d" />
            
            {/* Expressive Ears */}
            <motion.path 
              d="M30 40 L15 10 L45 32 Z" fill="#2d2d2d" 
              animate={{ rotate: isTyping ? [-7, 7, -7] : [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: isTyping ? 0.3 : 4 }}
            />
            <motion.path 
              d="M70 40 L85 10 L55 32 Z" fill="#2d2d2d" 
              animate={{ rotate: isTyping ? [7, -7, 7] : [0, -3, 3, 0] }}
              transition={{ repeat: Infinity, duration: isTyping ? 0.3 : 4 }}
            />

            {/* Inner Ears - Soft Pink */}
            <path d="M30 38 L22 20 L42 34 Z" fill="#ffb7c5" opacity="0.5" />
            <path d="M70 38 L78 20 L58 34 Z" fill="#ffb7c5" opacity="0.5" />

            {/* Kawaii Blush */}
            <motion.circle 
              cx="34" cy="62" r="5" fill="#ffb7c5" opacity="0.3" 
              animate={{ scale: isTyping ? 1.2 : 1 }}
            />
            <motion.circle 
              cx="66" cy="62" r="5" fill="#ffb7c5" opacity="0.3" 
              animate={{ scale: isTyping ? 1.2 : 1 }}
            />

            {/* Eyes - Dynamic Tracking */}
            <motion.g animate={{ x: eyeX - 2.5 }}>
              <circle cx="38" cy="55" r="5.5" fill="white" />
              <circle cx="62" cy="55" r="5.5" fill="white" />
              
              <motion.circle 
                cx="38" 
                cy="55" 
                r="3" 
                fill="black" 
                animate={{ 
                  scaleY: isDeleting ? 0.15 : [1, 1, 0.1, 1],
                  y: isDeleting ? 2.5 : 0,
                  x: isDeleting ? -1 : 0
                }}
                transition={{ 
                  scaleY: { repeat: Infinity, duration: 4.5, times: [0, 0.95, 0.97, 1] } 
                }}
              />
              <motion.circle 
                cx="62" 
                cy="55" 
                r="3" 
                fill="black" 
                animate={{ 
                  scaleY: isDeleting ? 0.15 : [1, 1, 0.1, 1],
                  y: isDeleting ? 2.5 : 0,
                  x: isDeleting ? 1 : 0
                }}
                transition={{ 
                  scaleY: { repeat: Infinity, duration: 4.5, times: [0, 0.95, 0.97, 1] } 
                }}
              />
            </motion.g>

            {/* Nose & Mouth */}
            <path d="M48 64 L52 64 L50 66 Z" fill="#ffb7c5" />
            <motion.path 
              d="M45 68 Q50 72 55 68" 
              stroke="#444" 
              strokeWidth="1.5" 
              fill="none" 
              animate={{ 
                d: isTyping ? "M45 70 Q50 74 55 70" : "M45 68 Q50 72 55 68",
                scale: isTyping ? 1.15 : 1
              }}
            />
          </motion.g>

          {/* Whiskers */}
          <line x1="22" y1="58" x2="8" y2="55" stroke="#444" strokeWidth="0.8" />
          <line x1="22" y1="62" x2="6" y2="66" stroke="#444" strokeWidth="0.8" />
          <line x1="78" y1="58" x2="92" y2="55" stroke="#444" strokeWidth="0.8" />
          <line x1="78" y1="62" x2="94" y2="66" stroke="#444" strokeWidth="0.8" />

          {/* Rapid Typing Paws */}
          <AnimatePresence>
            {isTyping && (
              <motion.g
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
              >
                <motion.circle 
                  cx="32" cy="100" r="7" fill="#3d3d3d"
                  animate={{ y: [0, -12, 0], x: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 0.12 }}
                />
                <motion.circle 
                  cx="68" cy="100" r="7" fill="#3d3d3d"
                  animate={{ y: [0, -12, 0], x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 0.12, delay: 0.06 }}
                />
                {/* Keyboard Sparkle */}
                <motion.rect 
                  x="20" y="108" width="60" height="5" rx="2.5" 
                  fill="url(#key-glow-v2)"
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ repeat: Infinity, duration: 0.4 }}
                />
                <defs>
                  <linearGradient id="key-glow-v2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </motion.div>
      <div className="absolute -bottom-4 w-full text-center">
        <motion.span 
          key={isTyping ? 'typing' : 'idle'}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="text-[11px] font-black font-mono text-blue-500 uppercase tracking-[0.2em] bg-blue-600/10 px-6 py-2 rounded-full border border-blue-500/20 shadow-lg shadow-blue-500/10"
        >
          {isDeleting ? "Nyaa? Wait!" : isTyping ? "Transmitting Ops..." : "Sovereign Lookout"}
        </motion.span>
      </div>
    </div>
  );
};

export default InteractiveCat;