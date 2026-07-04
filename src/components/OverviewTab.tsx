/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Info, Sparkles, HeartHandshake, Shield } from 'lucide-react';
import { TravelData } from '../types';

interface OverviewTabProps {
  data: TravelData;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Quick stats panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/[0.02] border border-white/10 rounded-xl p-5">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Best Season</span>
          <p className="text-sm font-bold text-white">{data.quickStats.bestSeason}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Local Currency</span>
          <p className="text-sm font-bold text-white font-mono">{data.quickStats.currency}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Primary Language</span>
          <p className="text-sm font-bold text-white">{data.quickStats.language}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Aesthetic Vibe</span>
          <p className="text-xs font-bold text-white italic font-serif">{data.quickStats.vibe}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Essential local tips & Packing suggestions */}
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-500" /> Essential Travel Tips
            </h3>
            <ul className="space-y-2.5">
              {data.travelTips.map((tip, idx) => (
                <li key={idx} className="text-xs text-white/70 leading-relaxed font-sans flex items-start gap-2">
                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" /> Respectful Packing Suggestions
            </h3>
            <ul className="space-y-2">
              {data.packingSuggestions.map((item, idx) => (
                <li key={idx} className="text-xs text-white/70 font-sans flex items-center gap-2">
                  <span className="text-amber-500 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Languages & Emergency Numbers */}
        <div className="space-y-6 bg-white/[0.02] border border-white/10 rounded-xl p-5 sm:p-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-3 flex items-center gap-2">
              <HeartHandshake className="h-4 w-4 text-amber-500" /> Local Useful Phrases
            </h3>
            <div className="space-y-3">
              {data.emergencyContacts.helpfulPhrases.map((phrase, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/10 rounded-lg p-3 flex flex-col gap-1 shadow-xs">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-white font-sans">{phrase.phrase}</span>
                    <span className="text-white/40 font-mono font-normal">[{phrase.pronunciation}]</span>
                  </div>
                  <span className="text-[11px] text-amber-400/80 font-serif italic">"{phrase.translation}"</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-amber-500 animate-pulse" /> Emergency & Support Contacts
            </h4>
            <div className="grid grid-cols-3 gap-3 font-mono text-[11px] text-white/70 font-bold">
              <div className="bg-white/[0.02] border border-white/10 rounded-lg p-2.5 text-center shadow-xs">
                <span className="block text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Police</span>
                <a href={`tel:${data.emergencyContacts.police}`} className="text-amber-400 hover:underline">
                  {data.emergencyContacts.police}
                </a>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-lg p-2.5 text-center shadow-xs">
                <span className="block text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Ambulance</span>
                <a href={`tel:${data.emergencyContacts.ambulance}`} className="text-amber-400 hover:underline">
                  {data.emergencyContacts.ambulance}
                </a>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-lg p-2.5 text-center shadow-xs">
                <span className="block text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Fire</span>
                <a href={`tel:${data.emergencyContacts.fire}`} className="text-amber-400 hover:underline">
                  {data.emergencyContacts.fire}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
