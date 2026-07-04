/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, HeartHandshake } from 'lucide-react';
import { TravelData } from '../types';
import { StoryNarrator } from './StoryNarrator';

interface CultureTabProps {
  data: TravelData;
}

export const CultureTab: React.FC<CultureTabProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Storytelling audio component */}
      <StoryNarrator storyText={data.culturalStorytelling} destination={data.destinationName} />

      {/* Heritage Sites Grid */}
      <div>
        <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500" /> Historic Heritage Sites
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.heritageSites.map((site, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/10 rounded-xl p-5 shadow-xs space-y-2.5 hover:border-amber-500/30 transition-all">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-sans text-base font-bold text-white leading-snug">{site.name}</h4>
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {site.location}
                </span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-sans">{site.history}</p>
              <p className="text-xs text-amber-400 font-sans italic bg-amber-500/5 p-2 rounded border border-amber-500/10">
                <span className="font-bold">Respectful Visiting Tip:</span> {site.visitingTips}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Etiquette Card */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 sm:p-6 space-y-4">
        <h3 className="font-serif text-lg font-bold text-amber-400 flex items-center gap-2">
          <HeartHandshake className="h-5 w-5 text-amber-500" /> Essential Cultural Etiquette (Dos & Don'ts)
        </h3>
        <p className="text-xs text-white/80 leading-relaxed font-sans">
          {data.culturalEtiquette.localCustoms}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-white/[0.02] border border-white/10 rounded-lg p-4 space-y-2.5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1 font-sans">
              ✓ Cultural DO's
            </span>
            <ul className="space-y-1.5 text-xs text-white/70">
              {data.culturalEtiquette.dos.map((doItem, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-normal">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{doItem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-lg p-4 space-y-2.5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-red-400 flex items-center gap-1 font-sans">
              ✗ Cultural DON'Ts
            </span>
            <ul className="space-y-1.5 text-xs text-white/70">
              {data.culturalEtiquette.donts.map((dontItem, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-normal">
                  <span className="text-red-400 font-bold shrink-0">✗</span>
                  <span>{dontItem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
