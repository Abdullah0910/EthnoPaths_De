/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Utensils } from 'lucide-react';
import { TravelData } from '../types';

interface CulinaryTabProps {
  data: TravelData;
}

export const CulinaryTab: React.FC<CulinaryTabProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-white/10 pb-2">
        <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
          <Utensils className="h-5 w-5 text-amber-500" /> Curated Culinary Heritage
        </h3>
        <p className="text-xs text-white/50 font-sans mt-0.5">
          Authentic dishes reflecting local agriculture, seasons, and historical trade routes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.foodRecommendations.map((food, idx) => (
          <div key={idx} className="bg-white/[0.02] border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.04] transition-all rounded-xl p-5 flex flex-col justify-between gap-4">
            <div className="space-y-2.5">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-sans text-base font-bold text-white leading-snug">{food.dishName}</h4>
                {food.isStreetFood && (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 shrink-0">
                    Street Food
                  </span>
                )}
              </div>
              {food.pronunciation && (
                <span className="block text-[10px] font-mono text-white/40 font-bold">
                  Pronunciation: [{food.pronunciation}]
                </span>
              )}
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                {food.culturalSignificance}
              </p>
            </div>

            <div className="bg-white/[0.02] p-2.5 rounded border border-white/10 text-xs font-sans text-white/70">
              <span className="font-bold text-white/60 block text-[10px] uppercase tracking-wider mb-0.5">Where to Taste</span>
              {food.recommendedPlaces}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
