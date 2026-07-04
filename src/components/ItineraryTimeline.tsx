/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sunrise, Sun, Sunset, MapPin, Sparkles, Coffee, Copy, CheckCircle } from 'lucide-react';
import { DayItinerary, ItineraryItem } from '../types';

interface ItineraryTimelineProps {
  days: DayItinerary[];
  destinationName: string;
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ days, destinationName }) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeDay = days[activeDayIndex] || days[0];

  const getTimeIcon = (time: 'Morning' | 'Afternoon' | 'Evening') => {
    switch (time) {
      case 'Morning':
        return <Sunrise className="h-5 w-5 text-amber-500" />;
      case 'Afternoon':
        return <Sun className="h-5 w-5 text-amber-500" />;
      case 'Evening':
        return <Sunset className="h-5 w-5 text-stone-400" />;
    }
  };

  const handleCopyItinerary = () => {
    let text = `Cultural Expedition Itinerary for ${destinationName}\n\n`;
    days.forEach((day) => {
      text += `Day ${day.dayNumber}: ${day.theme}\n`;
      day.items.forEach((item) => {
        text += `- [${item.timeOfDay}] ${item.activity} at ${item.location}\n`;
        text += `  Cultural Note: ${item.culturalNote}\n`;
        if (item.foodStop) {
          text += `  Food Stop: ${item.foodStop}\n`;
        }
      });
      text += '\n';
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!days || days.length === 0) {
    return (
      <div className="p-8 bg-white/[0.02] border border-white/10 rounded-xl text-center text-white/40">
        No itinerary items suggested for this trip.
      </div>
    );
  }

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
            Suggested Cultural Expedition
          </h3>
          <p className="text-xs text-white/50 font-sans">
            A balanced flow of historical sites, craft encounters, and local dining
          </p>
        </div>

        <button
          onClick={handleCopyItinerary}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
        >
          {copied ? (
            <>
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy Full Itinerary
            </>
          )}
        </button>
      </div>

      {/* Day Toggles (Pill style, optimized for performance and space) */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day, idx) => (
          <button
            key={day.dayNumber}
            onClick={() => setActiveDayIndex(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeDayIndex === idx
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            Day {day.dayNumber}
          </button>
        ))}
      </div>

      {/* Selected Day Content */}
      {activeDay && (
        <div className="space-y-6">
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block font-sans">
              Day {activeDay.dayNumber} Theme
            </span>
            <p className="font-serif text-base font-bold text-white mt-1">
              {activeDay.theme}
            </p>
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10">
            {activeDay.items.map((item, idx) => (
              <div key={idx} className="relative flex gap-6 items-start">
                {/* Timeline node icon */}
                <div className="z-10 shrink-0 h-12 w-12 bg-[#0A0A0B] border-2 border-white/10 rounded-full flex items-center justify-center shadow-md">
                  {getTimeIcon(item.timeOfDay)}
                </div>

                {/* Card details */}
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-white/40 font-sans">
                      {item.timeOfDay}
                    </span>
                    <span className="text-xs font-semibold text-white/70 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-amber-500" />
                      {item.location}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-sans text-base font-bold text-white leading-snug">
                      {item.activity}
                    </h4>
                  </div>

                  {/* Cultural Note Highlight */}
                  <div className="text-xs text-white/70 font-sans bg-white/[0.02] p-3 rounded-lg border-l-2 border-amber-500 leading-relaxed flex items-start gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <span className="font-bold text-white/80 mr-1">Cultural Context:</span>
                      {item.culturalNote}
                    </div>
                  </div>

                  {/* Optional Food stop */}
                  {item.foodStop && (
                    <div className="text-xs text-white/70 font-sans bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10 flex items-center gap-2">
                      <Coffee className="h-3.5 w-3.5 text-amber-400" />
                      <span>
                        <span className="font-bold">Suggested Pitstop:</span> {item.foodStop}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
