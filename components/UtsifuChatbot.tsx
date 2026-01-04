
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Terminal, Cpu, MessageSquare } from 'lucide-react';
import { AppMode, Theme } from '../types';
import { sendChatMessage } from '../services/n8nService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface Props {
  mode: AppMode;
  theme: Theme;
}

const N8nAgentIcon = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6D5B] via-[#8338EC] to-[#3B82F6]" />
    <span className="relative z-10 text-xl filter drop-shadow-md">🤖</span>
  </div>
);

const UtsifuChatbot: React.FC<Props> = ({ mode, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Sovereign n8n Agent Online. Webhook handshake established. ⚡" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDark = theme === Theme.DARK;
  const isDiscover = mode === AppMode.DISCOVER;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const botResponse = await sendChatMessage(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "UPLINK_FAILURE: Connection to n8n cluster timed out. Verify your ngrok tunnel is active and the workflow is listening." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getChatWindowStyles = () => {
    if (isDiscover) return 'bg-slate-950 border-white/10 shadow-[0_40px_100px_rgba(59,130,246,0.3)]';
    return isDark 
      ? 'bg-slate-950 border-slate-800 shadow-[0_40px_100px_rgba(0,0,0,0.8)]' 
      : 'bg-white border-slate-200 shadow-[0_40px_100px_rgba(0,0,0,0.15)]';
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-10 md:right-10 z-[100] flex flex-col items-end" style={{ perspective: '2000px' }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 100, x: 50, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.3, y: 100, x: 50, rotateY: -20 }}
            className={`mb-4 w-[calc(100vw-2rem)] sm:w-[420px] h-[500px] sm:h-[650px] rounded-[2.5rem] border overflow-hidden flex flex-col transition-all duration-500 ${getChatWindowStyles()}`}
          >
            <div className={`p-6 border-b flex items-center justify-between relative ${isDark || isDiscover ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-electric">
                  <N8nAgentIcon />
                </div>
                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDark || isDiscover ? 'text-white' : 'text-slate-950'}`}>SOVEREIGN_AGENT</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8338ec] animate-pulse" />
                    <span className={`text-[8px] font-black tracking-widest ${isDark || isDiscover ? 'text-slate-500' : 'text-slate-400'}`}>WEBHOOK_UPLINK</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-white"><X size={20} /></button>
            </div>

            <div ref={scrollRef} className={`flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide ${isDark || isDiscover ? 'bg-slate-950' : 'bg-white'}`}>
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800'}`}>
                        {msg.role === 'user' ? <User size={14} className="text-white" /> : <Terminal size={14} className="text-blue-400" />}
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-200 border border-white/5'}`}>
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className={`p-6 border-t ${isDark || isDiscover ? 'border-white/5 bg-slate-900' : 'border-slate-200 bg-white'}`}>
              <div className="relative">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Direct webhook query..."
                  className="w-full p-4 pr-14 rounded-2xl outline-none bg-slate-800 border border-white/10 text-white text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 text-white rounded-xl disabled:opacity-30"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#8338ec] to-[#3b82f6] text-white shadow-electric">
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};

export default UtsifuChatbot;
