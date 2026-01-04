
import React from 'react';
import { AppMode, Theme } from '../types';
import { Server, Cloud, Shield, DollarSign } from 'lucide-react';

interface Props {
  mode: AppMode;
  theme: Theme;
}

const DeploymentInfo: React.FC<Props> = ({ mode, theme }) => {
  const isDiscover = mode === AppMode.DISCOVER;

  return (
    <div className="w-full">
      <div className={`rounded-3xl p-10 md:p-16 border overflow-hidden relative ${isDiscover ? 'glass border-white/5' : 'bg-slate-900 text-white'}`}>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Infrastructure as Freedom.</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Cloud className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">AWS Free Tier EC2</h3>
                  <p className={`text-sm ${isDiscover ? 'text-slate-400' : 'text-slate-300'}`}>Perfect for startups. Use Amazon's generous free tier to host your n8n instance for $0/mo.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Server className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Self-Purchased Server</h3>
                  <p className={`text-sm ${isDiscover ? 'text-slate-400' : 'text-slate-300'}`}>Absolute privacy. Host your data in-house. Your AI, your rules, your hardware.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <DollarSign className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">No SaaS Fees</h3>
                  <p className={`text-sm ${isDiscover ? 'text-slate-400' : 'text-slate-300'}`}>Stop paying $500/mo for automation tools. We set it up once, you own it forever.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black/50 p-8 rounded-2xl border border-white/10 font-mono text-sm">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="space-y-2">
              <p className="text-green-400">$ ssh root@your-server</p>
              <p className="text-slate-400"># Installing n8n via Docker...</p>
              <p className="text-blue-400">$ docker-compose up -d</p>
              <p className="text-slate-500">Starting instance: [##########] 100%</p>
              <p className="text-white">Success! AI Engine running on port 5678.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentInfo;
