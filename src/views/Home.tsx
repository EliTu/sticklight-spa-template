import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, Code, Settings, Copy, Check } from 'lucide-react';

export const Home: React.FC = () => {
  const [copied, setCopied] = useState<'title' | 'message' | null>(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text: string, type: 'title' | 'message') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Environment variables with fallbacks
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Sticklight Test App (Fallback)';
  const customMessage = import.meta.env.VITE_CUSTOM_MESSAGE || 'Hello from Sticklight Cloud! (Fallback)';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800/80 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Vite + TS Template Active
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-50 tracking-tight">
            Deploy & Test with <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Sticklight Cloud</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            This repository is a fully functional Single Page Application designed to validate build-time environment variable injection, deterministic Yarn installs, and edge CDN fallback routing.
          </p>
        </div>
      </div>

      {/* Grid: Env Variables & Build Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Environment Variables Injection */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/25">
                <Settings className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-lg font-bold text-slate-100">Environment Variables</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Vite injects variables prefixed with <code className="text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/10 font-mono text-xs">VITE_</code> at build time. Verify their runtime values below:
            </p>

            <div className="space-y-4">
              {/* VITE_APP_TITLE */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 font-bold">VITE_APP_TITLE</span>
                  <button 
                    onClick={() => copyToClipboard(appTitle, 'title')}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Copy Value"
                  >
                    {copied === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-sm font-semibold text-sky-400 break-all">{appTitle}</div>
              </div>

              {/* VITE_CUSTOM_MESSAGE */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 font-bold">VITE_CUSTOM_MESSAGE</span>
                  <button 
                    onClick={() => copyToClipboard(customMessage, 'message')}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Copy Value"
                  >
                    {copied === 'message' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-sm font-semibold text-indigo-400 break-all">{customMessage}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
            <span>Status:</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              INJECTED SUCCESSFULLY
            </span>
          </div>
        </div>

        {/* Build Metadata */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-sky-500/10 rounded-xl border border-sky-500/25">
                <Terminal className="w-5 h-5 text-sky-400" />
              </div>
              <h2 className="text-lg font-bold text-slate-100">Build & Runtime Metadata</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Inspect application and bundler runtime flags being loaded by the host CDN in real-time:
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-500">FRAMEWORK STACK</span>
                <span className="text-slate-300 font-semibold">React 18.3.1 + Vite 5.3</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-500">BUILD MODE</span>
                <span className={`font-semibold px-2 py-0.5 rounded ${import.meta.env.DEV ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'}`}>
                  {import.meta.env.MODE.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-500">ROUTING ENGINE</span>
                <span className="text-slate-300">Custom History-based Link Interceptor</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-500">CURRENT ROUTE</span>
                <span className="text-sky-400 font-bold">/</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">LOCAL CLOCK</span>
                <span className="text-slate-300 tabular-nums">{time}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
            <span>Server Pipeline:</span>
            <span className="flex items-center gap-1.5 text-sky-400 font-semibold bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
              <Code className="w-3.5 h-3.5" />
              SPA DEPLOYMENT COMPLIANT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
