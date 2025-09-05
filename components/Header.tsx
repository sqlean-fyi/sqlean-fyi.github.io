import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex items-center gap-4 px-4 md:px-0">
        <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <ellipse cx="12" cy="7" rx="8" ry="3" />
              <path d="M4 7v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.5v-5l-2 3h4l-2 3" />
            </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100 leading-tight">
            SQLean<span className="text-sky-400">.fyi</span>
          </h1>
          <p className="text-sm text-slate-400 leading-tight">
            Cut cloud costs by optimizing queries & identifying anti-patterns.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;