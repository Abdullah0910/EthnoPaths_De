/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, HeartHandshake, Calendar } from 'lucide-react';
import { TravelData } from '../types';

interface ExperiencesTabProps {
  data: TravelData;
}

export const ExperiencesTab: React.FC<ExperiencesTabProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hidden Gems Section */}
      <div>
        <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500 animate-pulse" /> Off-the-Beaten-Path Hidden Gems
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.hiddenGems.map((gem, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/10 rounded-xl p-5 shadow-xs space-y-2.5 hover:border-amber-500/30 transition-all group">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-sans text-base font-bold text-white leading-snug group-hover:text-amber-400 transition-colors">
                  {gem.name}
                </h4>
                <span className="text-[10px] font-semibold text-white/50 bg-white/5 px-2 py-0.5 rounded font-mono">
                  {gem.location}
                </span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-sans">{gem.culturalSignificance}</p>
              <p className="text-xs text-amber-400 font-sans italic bg-amber-500/5 p-2 rounded border border-amber-500/10">
                <span className="font-bold">Why Visit:</span> {gem.whyVisit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Authentic Experiences Section */}
      <div>
        <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
          <HeartHandshake className="h-5 w-5 text-amber-500" /> Sustainable Local Encounters
        </h3>
        <div className="space-y-4">
          {data.authenticExperiences.map((experience, idx) => (
            <div key={idx} className="border border-white/10 rounded-xl p-5 hover:bg-white/[0.02] transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                <h4 className="font-sans text-base font-bold text-white">{experience.title}</h4>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-sans">
                  Local Encounter
                </span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-sans">{experience.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
                <div className="bg-white/[0.02] p-3 rounded-lg border border-white/10 text-white/70">
                  <span className="font-bold text-white/60 block mb-1">How to Support & Find:</span>
                  <span className="leading-relaxed">{experience.howToFind}</span>
                </div>
                <div className="bg-amber-500/5 p-3 rounded-lg border border-amber-500/10 text-white/70">
                  <span className="font-bold text-amber-400 block mb-1">Interacting Etiquette:</span>
                  <span className="leading-relaxed">{experience.etiquetteCustoms}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Local Festivals */}
      {data.localEvents && data.localEvents.length > 0 && (
        <div>
          <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-500" /> Seasonal Cultural Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.localEvents.map((event, idx) => (
              <div key={idx} className="bg-black/40 text-white rounded-xl p-5 shadow-md space-y-3 border border-white/10">
                <div className="flex justify-between items-start gap-2 border-b border-white/10 pb-2">
                  <h4 className="font-serif text-base font-bold text-white">{event.eventName}</h4>
                  <span className="text-[10px] font-bold text-amber-400 font-mono uppercase shrink-0 mt-0.5">
                    {event.seasonOrDate}
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  <span className="font-bold text-white block mb-0.5">Cultural Significance:</span>
                  {event.culturalMeaning}
                </p>
                <p className="text-xs text-amber-300 font-sans italic bg-amber-500/10 p-2.5 rounded border border-amber-500/20">
                  <span className="font-bold text-amber-200">Visitor Role:</span> {event.travelerParticipation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
