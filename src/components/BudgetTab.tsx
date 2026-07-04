/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass } from 'lucide-react';
import { TravelData } from '../types';

interface BudgetTabProps {
  data: TravelData;
}

export const BudgetTab: React.FC<BudgetTabProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Cost Suggestions card */}
      <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-sans">Estimated Cost Breakdown</span>
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-1.5">
              Estimated Daily Expenses:{' '}
              <span className="text-amber-400 font-mono">${data.budgetSuggestions.estimatedCostPerDayUSD} USD</span>
            </h3>
          </div>
          <span className="inline-flex self-start sm:self-center px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-bold uppercase tracking-wider font-mono">
            {data.budgetSuggestions.tier} Tier
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-1">
          <div className="bg-white/[0.02] border border-white/10 p-4 rounded-lg space-y-1">
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Accommodation</span>
            <p className="text-xs font-bold text-white leading-normal">{data.budgetSuggestions.breakdown.accommodation}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 p-4 rounded-lg space-y-1">
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Food & Dining</span>
            <p className="text-xs font-bold text-white leading-normal">{data.budgetSuggestions.breakdown.food}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 p-4 rounded-lg space-y-1">
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Local Transit</span>
            <p className="text-xs font-bold text-white leading-normal">{data.budgetSuggestions.breakdown.transport}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 p-4 rounded-lg space-y-1">
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Heritage Entry & Fees</span>
            <p className="text-xs font-bold text-white leading-normal">{data.budgetSuggestions.breakdown.activities}</p>
          </div>
        </div>

        {/* Money Saving Tips */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          <h4 className="font-serif text-sm font-bold text-white">Sustainable Money Saving Tips</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.budgetSuggestions.savingTips.map((tip, idx) => (
              <div key={idx} className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-lg text-xs text-white/70 font-sans leading-relaxed flex gap-1.5">
                <span className="text-amber-500 shrink-0">✓</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nearby Alternatives Section */}
      <div>
        <div className="border-b border-white/10 pb-2 mb-4">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Compass className="h-5 w-5 text-amber-500" /> Nearby Crowdfree Alternatives
          </h3>
          <p className="text-xs text-white/50 font-sans mt-0.5">
            Lesser-known villages or neighborhoods nearby that preserve pristine cultural traditions with far fewer tourists
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {data.nearbyAlternatives.map((alt, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.04] transition-all rounded-xl p-5 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-sans text-base font-bold text-white leading-tight">{alt.name}</h4>
                  <span className="text-[10px] font-mono text-white/40 font-bold">{alt.distance} away</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-sans line-clamp-4">
                  {alt.description}
                </p>
              </div>

              <div className="bg-white/[0.02] p-2.5 rounded border border-white/10 text-xs text-amber-400 italic font-sans leading-relaxed">
                <span className="font-bold text-white/50 block text-[9px] uppercase tracking-wider mb-0.5">Why visit</span>
                {alt.whyVisit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
