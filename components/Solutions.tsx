import React from 'react';
import { motion } from 'framer-motion';
import { AppMode, Theme } from '../types';
import { MessageSquare, BarChart3, Database, Globe, Share2, Layers } from 'lucide-react';

interface Props {
  mode: AppMode;
  theme: Theme;
}

const Solutions: React.FC<Props> = ({ mode, theme }) => {
  const isDiscover = mode === AppMode.DISCOVER;
  const isDark = theme === Theme.DARK;

  const solutions = [
    { title: "Omnichannel Support", desc: "Connect WhatsApp, Email, and Instagram to a central brain that responds via Gemini API.", icon: <MessageSquare className="text-blue-500" /> },
    { title: "Lead Scoring", desc: "Instantly research every lead on LinkedIn and score them before they reach your CRM.", icon: <BarChart3 className="text-purple-500" /> },
    { title: "Database Sync", desc: "Keep your internal databases synced with external SaaS without high API costs.", icon: <Database className="text-emerald-500" /> },
    { title: "Content Factory", desc: "Turn a single URL into social posts, blog entries, and newsletters automatically.", icon: <Share2 className="text-orange-500" /> },
    { title: "Scraping Engines", desc: "Custom scrapers that feed real-time market data into your BI tools.", icon: <Globe className="text-cyan-500" /> },
    { title: "Legacy Bridges", desc: "Bridge old software with AI capabilities using custom-built n8n node adapters.", icon: <Layers className="text-pink-500" /> }
  ];

  const cardStyle = isDiscover 
    ? isDark ? 'bg-white/5 border-white/5 hover:border-blue-500 shadow-2xl backdrop-blur-xl' : 'bg-white/80 border-blue-100 hover:border-blue-500 shadow-xl backdrop-blur-md'
    : isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm hover:shadow-lg';

  const headingColor = isDark ? 'text-white' : 'text-slate-900';
  const descColor = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className="w-full">
      <div className="mb-20">
        <h2 className={`text-5xl font-bold mb-6 ${isDiscover ? 'italic text-blue-600' : headingColor}`}>Our Solutions.</h2>
        <p className={`max-w-xl text-xl ${descColor}`}>Battle-tested workflows running on your private hardware.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className={`p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col gap-6 ${cardStyle}`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isDark ? 'bg-white/5 shadow-inner' : 'bg-slate-50'}`}>
              {s.icon}
            </div>
            <h3 className={`text-2xl font-bold ${headingColor}`}>{s.title}</h3>
            <p className={`text-base leading-relaxed ${descColor}`}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;