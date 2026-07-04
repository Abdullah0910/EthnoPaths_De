/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin, Sparkles, BookOpen, Utensils, Calendar, Tag, Globe, Save, Printer, Compass
} from 'lucide-react';
import { TravelData } from '../types';
import { ItineraryTimeline } from './ItineraryTimeline';
import { OverviewTab } from './OverviewTab';
import { CultureTab } from './CultureTab';
import { ExperiencesTab } from './ExperiencesTab';
import { CulinaryTab } from './CulinaryTab';
import { BudgetTab } from './BudgetTab';

interface TravelDashboardProps {
  data: TravelData;
  onSave: () => void;
  isSaved: boolean;
}

export const TravelDashboard: React.FC<TravelDashboardProps> = ({ data, onSave, isSaved }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'culture' | 'experiences' | 'culinary' | 'itinerary' | 'budget'>('overview');

  // Reset active tab to Overview when the destination changes
  React.useEffect(() => {
    setActiveTab('overview');
  }, [data.destinationName]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <MapPin className="h-4 w-4" /> },
    { id: 'culture', label: 'Culture & Heritage', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'experiences', label: 'Gems & Experiences', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'culinary', label: 'Local Delicacies', icon: <Utensils className="h-4 w-4" /> },
    { id: 'itinerary', label: 'Expedition Itinerary', icon: <Calendar className="h-4 w-4" /> },
    { id: 'budget', label: 'Budget & Side Trips', icon: <Tag className="h-4 w-4" /> },
  ] as const;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:space-y-8">
      {/* Dossier Header Card */}
      <div className="bg-[#0E0E10] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full" />

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
              Expedition Dossier
            </span>
            <span className="text-xs font-medium text-white/50 font-mono flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-white/40" />
              {data.quickStats.vibe}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
            {data.destinationName}
            <span className="text-white/40 text-2xl font-light">, {data.country}</span>
          </h2>

          <p className="text-white/70 text-sm max-w-3xl leading-relaxed font-serif italic">
            "{data.overview}"
          </p>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap gap-2 shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
          <button
            onClick={onSave}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all cursor-pointer ${
              isSaved
                ? 'bg-emerald-600/20 border border-emerald-500 text-emerald-400'
                : 'bg-amber-500 border border-amber-500 text-black hover:bg-amber-600'
            }`}
          >
            <Save className="h-4 w-4" />
            {isSaved ? 'Saved to Library' : 'Save to Library'}
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
            title="Print Expedition Guide"
          >
            <Printer className="h-4 w-4" />
            <span className="sm:inline">Print Guide</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation Menu */}
      <div className="border-b border-white/10 overflow-x-auto pb-0.5 scrollbar-none flex gap-1 print:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-white/50 hover:text-white hover:border-white/20'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACTIVE TAB DISPLAY CARD */}
      <div className="bg-[#0E0E10] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl print:border-none print:p-0">
        {/* TAB 1: OVERVIEW & ESSENTIALS */}
        {activeTab === 'overview' && <OverviewTab data={data} />}

        {/* TAB 2: CULTURE, HERITAGE & ETIQUETTE */}
        {activeTab === 'culture' && <CultureTab data={data} />}

        {/* TAB 3: HIDDEN GEMS, EVENTS & EXPERIENCES */}
        {activeTab === 'experiences' && <ExperiencesTab data={data} />}

        {/* TAB 4: TRADITIONAL LOCAL FOOD */}
        {activeTab === 'culinary' && <CulinaryTab data={data} />}

        {/* TAB 5: SUGGESTED ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4 animate-fade-in">
            <ItineraryTimeline days={data.itinerary} destinationName={data.destinationName} />
          </div>
        )}

        {/* TAB 6: BUDGETS & SIDE TRIPS */}
        {activeTab === 'budget' && <BudgetTab data={data} />}
      </div>

      {/* Safety Section (Piped into footer of dashboard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.02] border border-white/10 rounded-xl p-5 font-sans text-xs text-white/70 leading-relaxed">
        <div>
          <span className="font-bold text-white block mb-1">Local Security & Safety Level:</span>
          <span>{data.safetyAdvice.localSafetyLevel}</span>
        </div>
        <div>
          <span className="font-bold text-white block mb-1">Recommended Precautions:</span>
          <ul className="list-disc pl-4 space-y-0.5 text-white/70">
            {data.safetyAdvice.precautions.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
