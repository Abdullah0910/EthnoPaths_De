/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Bookmark, Sparkles, Clock } from 'lucide-react';

interface HeaderProps {
  onShowSaved: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onShowSaved, savedCount }) => {
  return (
    <header className="border-b border-white/10 bg-[#0A0A0B]/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-amber-500 to-orange-700 text-black p-2 rounded-lg shadow-sm flex items-center justify-center font-bold">
            <Compass className="h-5 w-5 animate-spin-slow text-black" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              EthnoPaths <span className="font-sans text-[9px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">GenAI</span>
            </span>
            <p className="text-[10px] text-white/50 font-sans tracking-wide">Authentic Cultural Travel Discovery</p>
          </div>
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-5">
          {/* System status display */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold">System Status</span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              GenAI-powered
            </span>
          </div>

          <button
            onClick={onShowSaved}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/5 border border-white/10 rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-amber-500"
            aria-label={`View ${savedCount} saved itineraries`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Saved Guides</span>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[9px] font-extrabold h-4.5 w-4.5 rounded-full flex items-center justify-center shadow-sm">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
