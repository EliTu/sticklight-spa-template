import React from 'react';
import { Cpu, RefreshCw, Layers, Shield } from 'lucide-react';

export const About: React.FC = () => {
  const tests = [
    {
      title: "SPA Fallback Routing",
      desc: "Tests that the Cloudflare Worker intercepts all sub-routes (like `/about` or `/status`) and gracefully serves the fallback `index.html` file rather than throwing a 404. Once loaded, client-side routing handles the view.",
      icon: RefreshCw,
      color: "from-sky-400 to-blue-500",
      bg: "bg-sky-500/10 border-sky-500/20 text-sky-400"
    },
    {
      title: "Static Asset Delivery",
      desc: "Validates that high-volume compiled assets (`/assets/*.js`, `/assets/*.css`, SVG icons) are correctly cached, compressed (Brotli/Gzip), and routed by Sticklight's edge architecture.",
      icon: Layers,
      color: "from-indigo-400 to-purple-500",
      bg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
    },
    {
      title: "Deterministic Installs",
      desc: "Verifies the deployment runner utilizes a clean, locked `yarn.lock` with `yarn install --frozen-lockfile` for exact reproduction. This guarantees there are no package mismatch anomalies between local and edge servers.",
      icon: Shield,
      color: "from-emerald-400 to-teal-500",
      bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
    },
    {
      title: "Dynamic Env Injection",
      desc: "Ensures build-time environment variables defined in sticklight config or inject variables pipelines (such as `VITE_APP_TITLE`) are dynamically loaded during compiling and accurately reflected in the final static build.",
      icon: Cpu,
      color: "from-amber-400 to-orange-500",
      bg: "bg-amber-500/10 border-amber-500/20 text-amber-400"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title block */}
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">About Sticklight Test App</h1>
        <p className="text-slate-400 max-w-3xl leading-relaxed">
          This lightweight boilerplate provides a template for launching Single Page Applications on Sticklight Cloud. By keeping external packages thin, it boots rapidly, builds in seconds, and provides a clear mechanism for end-to-end edge pipeline testing.
        </p>
      </div>

      {/* Grid of Test Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {tests.map((test, index) => {
          const Icon = test.icon;
          return (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700/80 transition-all duration-300 shadow-md flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${test.bg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">{test.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {test.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/40">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Pipeline Target:</span>
                  <span className={`bg-gradient-to-r ${test.color} bg-clip-text text-transparent font-bold tracking-wider uppercase text-[10px]`}>
                    VERIFICATION TARGET
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live test alert */}
      <div className="bg-gradient-to-r from-sky-950/40 to-indigo-950/40 border border-sky-900/50 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-sky-400">SPA Fallback Test Instruction:</h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              To test the routing fallback, refresh your browser right now on this URL (<code className="text-sky-300 font-mono">/about</code>). If the page reloads perfectly, your Cloudflare Worker / CDN fallback is correctly routing non-file GET requests back to <code className="text-sky-300 font-mono">index.html</code>.
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="shrink-0 px-4 py-2 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold rounded-lg text-xs shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 active:shadow-inner transition-all duration-200"
          >
            Trigger Page Refresh
          </button>
        </div>
      </div>
    </div>
  );
};
