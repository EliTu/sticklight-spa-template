import React, { useState, useEffect, useRef } from 'react';
import { Activity, ShieldCheck, Heart, Play, Plus, Minus, Server, Network, Wifi } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

export const Status: React.FC = () => {
  // Counter state
  const [counter, setCounter] = useState(0);

  // Diagnostic states
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '14:59:02', type: 'success', message: 'Edge CDN fallback router initialized.' },
    { timestamp: '14:59:05', type: 'info', message: 'Sticklight environment variables verified.' }
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Latency calculation state
  const [latency, setLatency] = useState<number | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);

  // Toast notifications state
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);
  const nextNotificationId = useRef(0);

  // Scroll logs to bottom when updated
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Handle run diagnostics animation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsRunning(false);
            addLog('success', 'Full system diagnosis complete! All checks optimal.');
            triggerToast('Diagnostics run completed successfully!');
            return 100;
          }
          
          const next = prev + Math.floor(Math.random() * 15) + 5;
          const capped = Math.min(next, 100);
          
          // Add some mock logs at certain progress points
          if (prev < 20 && capped >= 20) {
            addLog('info', 'Checking bundle asset compilation mappings...');
          } else if (prev < 45 && capped >= 45) {
            addLog('success', 'CSS bundles matched. Tailwind engine injected.');
          } else if (prev < 70 && capped >= 70) {
            addLog('info', 'Simulating edge worker fallback routing on /status path...');
          } else if (prev < 90 && capped >= 90) {
            addLog('success', 'Routing verification: OK (popstate binding is fully operational).');
          }
          
          return capped;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const addLog = (type: LogEntry['type'], message: string) => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0];
    setLogs((prev) => [...prev, { timestamp, type, message }]);
  };

  const startDiagnostics = () => {
    if (isRunning) return;
    setProgress(0);
    setIsRunning(true);
    setLogs([]);
    addLog('info', 'Starting comprehensive client-side routing and environment diagnostics...');
  };

  // Measure simulated API latency
  const measureLatency = async () => {
    setIsMeasuring(true);
    setLatency(null);
    const start = performance.now();
    
    // Simulate a network roundtrip
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 400 + 100));
    
    const end = performance.now();
    setLatency(Math.round(end - start));
    setIsMeasuring(false);
    triggerToast('Edge latency measurement complete!');
  };

  const triggerToast = (message: string) => {
    const id = nextNotificationId.current++;
    setNotifications((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {/* Toast Notification Area */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="pointer-events-auto bg-slate-900 border border-sky-500/30 text-sky-300 px-4 py-3 rounded-xl shadow-xl shadow-sky-950/20 flex items-center gap-2 text-sm font-semibold animate-slideIn"
          >
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
            <span>{notif.message}</span>
          </div>
        ))}
      </div>

      {/* Hero Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            <Activity className="w-8 h-8 text-sky-400" />
            Mock Status Dashboard
          </h1>
          <p className="text-slate-400 mt-1 leading-relaxed">
            Test React state management, complex micro-interactions, events, and side-effects.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full self-start md:self-auto">
          <Heart className="w-3.5 h-3.5 fill-current animate-pulse text-emerald-400" />
          SYSTEMS FULLY OPERATIONAL
        </div>
      </div>

      {/* Grid: Metrics, Interactivity & Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Systems Metrics */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Core Network Metrics</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold">SPA FALLBACK STATE</div>
                  <div className="text-sm font-semibold text-slate-200">Active (Always Serve index.html)</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold">EDGE NETWORK CACHING</div>
                  <div className="text-sm font-semibold text-slate-200">99.92% Hit Rate</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold">PROPAGATION</div>
                  <div className="text-sm font-semibold text-slate-200">Global (100ms Convergence)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Event testing */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Event Handlers</h3>
            <p className="text-xs text-slate-400">
              Increase / decrease values. Verifies React event listeners are correctly wired up post-compilation.
            </p>
            <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-slate-800/80">
              <span className="text-sm font-bold text-slate-300">Interact Counter:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCounter((c) => c - 1)}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-slate-600 transition-colors"
                  aria-label="Decrement"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-bold font-mono text-sky-400 w-8 text-center">{counter}</span>
                <button
                  onClick={() => setCounter((c) => c + 1)}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-slate-600 transition-colors"
                  aria-label="Increment"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Diagnostics Console & Latency Tester */}
        <div className="space-y-6 lg:col-span-2">
          {/* Latency tool */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">API Latency Simulator</h3>
              <button
                onClick={measureLatency}
                disabled={isMeasuring}
                className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 text-slate-950 hover:text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/15 transition-all flex items-center gap-1.5"
              >
                {isMeasuring ? 'Testing...' : 'Measure latency'}
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-slate-800/80">
              <span className="text-xs text-slate-400">Simulate API Request to Edge Nodes:</span>
              <div className="font-mono text-sm font-bold text-sky-400">
                {isMeasuring ? (
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                    Calculating...
                  </span>
                ) : latency !== null ? (
                  <span>{latency} ms <span className="text-emerald-400 text-xs">(Optimal)</span></span>
                ) : (
                  <span className="text-slate-500">Not Tested</span>
                )}
              </div>
            </div>
          </div>

          {/* Diagnostic Console */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4 flex flex-col h-[320px]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Diagnostics Console</h3>
              <div className="flex items-center gap-2">
                {isRunning && <span className="text-xs font-mono text-sky-400">{progress}%</span>}
                <button
                  onClick={startDiagnostics}
                  disabled={isRunning}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:bg-slate-950 disabled:text-slate-600 border border-slate-700 hover:border-slate-600 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  Run Checks
                </button>
              </div>
            </div>

            {/* Progress bar */}
            {isRunning && (
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80">
                <div
                  className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Terminal console */}
            <div
              ref={logContainerRef}
              className="flex-grow bg-slate-950 rounded-xl p-4 border border-slate-800/80 font-mono text-xs overflow-y-auto space-y-2 h-48 select-text"
            >
              {logs.length === 0 ? (
                <div className="text-slate-600 text-center h-full flex items-center justify-center italic">
                  Console is empty. Click "Run Checks" to simulate diagnostic runs.
                </div>
              ) : (
                logs.map((log, index) => {
                  let colorClass = 'text-slate-400';
                  if (log.type === 'success') colorClass = 'text-emerald-400';
                  if (log.type === 'warning') colorClass = 'text-amber-400';
                  if (log.type === 'error') colorClass = 'text-rose-400';

                  return (
                    <div key={index} className="flex gap-2 leading-relaxed">
                      <span className="text-slate-600 select-none">[{log.timestamp}]</span>
                      <span className={colorClass}>{log.message}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
