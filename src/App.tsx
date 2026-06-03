import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { About } from './views/About';
import { Status } from './views/Status';
import { Link } from './components/Link';
import { HelpCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen to pushState / popstate events
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Update HTML document title based on env VITE_APP_TITLE and route
  useEffect(() => {
    const baseTitle = import.meta.env.VITE_APP_TITLE || 'Sticklight Test App';
    let suffix = 'Home';
    if (currentPath === '/about') suffix = 'About';
    if (currentPath === '/status') suffix = 'Status';
    document.title = `${baseTitle} | ${suffix}`;
  }, [currentPath]);

  // Route matching
  const renderView = () => {
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/about':
        return <About />;
      case '/status':
        return <Status />;
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center py-20 space-y-6 animate-fadeIn">
            <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-rose-400">
              <HelpCircle className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">404 - Page Not Found</h1>
              <p className="text-slate-400 max-w-md">
                The page you are looking for doesn't exist. This validates that the CDN server fallback successfully served <code className="text-sky-300 font-mono">index.html</code>, but the client router doesn't match this route.
              </p>
            </div>
            <Link
              to="/"
              className="px-6 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-lg shadow-sky-500/15 transition-all"
            >
              Return Home
            </Link>
          </div>
        );
    }
  };

  return <Layout currentPath={currentPath}>{renderView()}</Layout>;
};
