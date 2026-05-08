import React from 'react';
import { useTheme } from '../hooks/useTheme';

export function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="w-full pb-6">
      <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-2xl p-8 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-[12px] font-black tracking-[0.2em] text-[#3b82f6] uppercase mb-2">
            MISSION CONTROL DASHBOARD
          </h2>
          <h1 className="text-3xl md:text-5xl font-[900] text-[#1e293b] tracking-tight leading-none">
            Real-Time ISS and News Intelligence
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 border border-[var(--border)] rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Switch to {isDark ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  );
}

