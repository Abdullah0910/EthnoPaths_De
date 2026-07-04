/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, MapPin, Sparkles, Calendar, Tag, Compass } from 'lucide-react';
import { TravelSearchQuery } from '../types';

interface SearchFormProps {
  onSearch: (query: TravelSearchQuery) => void;
  isLoading: boolean;
}

const POPULAR_DESTINATIONS = [
  { name: 'Kyoto, Japan', vibe: 'Zen Temples & Tea Houses' },
  { name: 'Oaxaca, Mexico', vibe: 'Indigenous Craft & Culinary' },
  { name: 'Florence, Italy', vibe: 'Renaissance Masterpieces' },
  { name: 'Fez, Morocco', vibe: 'Medieval Medina Crafts' },
  { name: 'Cusco, Peru', vibe: 'Inca Heritage & Andes Culture' },
];

const INTEREST_OPTIONS = [
  { id: 'Hidden Gems', label: 'Hidden Gems', desc: 'Lesser-known, secluded gems' },
  { id: 'Heritage & History', label: 'Heritage & History', desc: 'Monuments, stories, and ruins' },
  { id: 'Art & Craftsmanship', label: 'Local Arts & Crafts', desc: 'Artisans and handmade trades' },
  { id: 'Food & Culinary', label: 'Traditional Food', desc: 'Local delicacies and street food' },
  { id: 'Festivals & Events', label: 'Festivals & Events', desc: 'Seasonal cultural celebrations' },
  { id: 'Spiritualism & Rituals', label: 'Spiritual Traditions', desc: 'Temples, ceremonies, and folklore' },
];

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Hidden Gems', 'Heritage & History']);
  const [budget, setBudget] = useState<'budget' | 'moderate' | 'luxury'>('moderate');
  const [duration, setDuration] = useState<number>(5);

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    onSearch({
      destination: destination.trim(),
      interests: selectedInterests,
      budget,
      duration,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0E0E10] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 animate-fade-in">
      {/* Destination Field */}
      <div className="space-y-2">
        <label htmlFor="destination" className="block text-sm font-semibold text-white/80 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-amber-500" />
          Where do you want to explore?
        </label>
        <div className="relative">
          <input
            id="destination"
            type="text"
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search city, region, or country (e.g., Kyoto, Oaxaca, Provence)"
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-sans"
            disabled={isLoading}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="pt-2">
          <span className="text-xs font-semibold text-white/40 block mb-2 uppercase tracking-wider">Curated Inspirations:</span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_DESTINATIONS.map((dest) => (
              <button
                key={dest.name}
                type="button"
                onClick={() => setDestination(dest.name)}
                className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/80 transition-colors text-left"
                disabled={isLoading}
                title={dest.vibe}
              >
                📍 {dest.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cultural Interests Pillbox */}
      <div className="space-y-2">
        <span className="block text-sm font-semibold text-white/80 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Choose your Cultural Focus
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INTEREST_OPTIONS.map((option) => {
            const isChecked = selectedInterests.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleInterest(option.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isChecked
                    ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500 text-amber-400 shadow-sm'
                    : 'bg-white/5 border-white/10 text-white/80 hover:border-white/20 hover:bg-white/8'
                }`}
                disabled={isLoading}
              >
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="mt-1 h-4 w-4 accent-amber-500 rounded border-white/30 bg-transparent"
                  />
                  <div>
                    <p className="text-xs font-bold font-sans text-white">{option.label}</p>
                    <p className="text-[11px] text-white/50 font-sans mt-0.5 leading-snug">{option.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid for Budget and Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget Options */}
        <div className="space-y-2">
          <span className="block text-sm font-semibold text-white/80 flex items-center gap-2">
            <Tag className="h-4 w-4 text-amber-500" />
            Comfort & Budget Tier
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(['budget', 'moderate', 'luxury'] as const).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setBudget(tier)}
                className={`py-2 px-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  budget === tier
                    ? 'bg-amber-500 border-amber-500 text-black'
                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                }`}
                disabled={isLoading}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Options */}
        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-semibold text-white/80 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-amber-500" />
            Trip Duration (Days)
          </label>
          <div className="flex items-center gap-3">
            <input
              id="duration"
              type="range"
              min="1"
              max="14"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-white/10 rounded-lg"
              disabled={isLoading}
            />
            <span className="text-sm font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg min-w-[50px] text-center font-mono">
              {duration} {duration === 1 ? 'Day' : 'Days'}
            </span>
          </div>
        </div>
      </div>

      {/* Search Submission */}
      <button
        type="submit"
        disabled={isLoading || !destination.trim() || selectedInterests.length === 0}
        className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-600 disabled:bg-white/10 disabled:text-white/30 text-black font-serif font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating Cultural Expedition Guide...
          </>
        ) : (
          <>
            <Compass className="h-5 w-5 text-black" />
            Discover Local Culture & Storytelling
          </>
        )}
      </button>
    </form>
  );
};
