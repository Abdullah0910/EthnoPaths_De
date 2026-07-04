/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin, Sparkles, BookOpen, Utensils, Calendar, Tag, Shield,
  Phone, Globe, Info, Save, Printer, ArrowRight, Star, HeartHandshake, Eye, Compass
} from 'lucide-react';
import { TravelData } from '../types';
import { StoryNarrator } from './StoryNarrator';
import { ItineraryTimeline } from './ItineraryTimeline';

interface TravelDashboardProps {
  data: TravelData;
  onSave: () => void;
  isSaved: boolean;
}

export const TravelDashboard: React.FC<TravelDashboardProps> = ({ data, onSave, isSaved }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'culture' | 'experiences' | 'culinary' | 'itinerary' | 'budget'>('overview');

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
        {activeTab === 'overview' && (
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
        )}

        {/* TAB 2: CULTURE, HERITAGE & ETIQUETTE */}
        {activeTab === 'culture' && (
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
        )}

        {/* TAB 3: HIDDEN GEMS, EVENTS & EXPERIENCES */}
        {activeTab === 'experiences' && (
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
        )}

        {/* TAB 4: TRADITIONAL LOCAL FOOD */}
        {activeTab === 'culinary' && (
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
        )}

        {/* TAB 5: SUGGESTED ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4 animate-fade-in">
            <ItineraryTimeline days={data.itinerary} destinationName={data.destinationName} />
          </div>
        )}

        {/* TAB 6: BUDGETS & SIDE TRIPS */}
        {activeTab === 'budget' && (
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
        )}
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
