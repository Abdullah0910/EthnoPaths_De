/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { TravelDashboard } from './components/TravelDashboard';
import { SavedTrips } from './components/SavedTrips';
import { TravelData, TravelSearchQuery, SavedTrip } from './types';
import { Compass, Sparkles, MapPin, AlertCircle, RefreshCw, Star } from 'lucide-react';

export default function App() {
  const [activeTrip, setActiveTrip] = useState<TravelData | null>(null);
  const [activeQuery, setActiveQuery] = useState<TravelSearchQuery | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  // Load saved trips from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ethnopaths_saved_trips');
      if (stored) {
        setSavedTrips(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load saved trips from local storage:', err);
    }
  }, []);

  const handleSearch = async (query: TravelSearchQuery) => {
    setIsLoading(true);
    setError(null);
    setActiveTrip(null);
    setActiveQuery(query);

    try {
      const response = await fetch('/api/travel/explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong while connecting to Gemini.');
      }

      setActiveTrip(data);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'An unexpected error occurred while loading your guide. Please check your internet connection or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTrip = () => {
    if (!activeTrip || !activeQuery) return;

    // Check if already saved
    const exists = savedTrips.some(
      (trip) =>
        trip.data.destinationName.toLowerCase() === activeTrip.destinationName.toLowerCase() &&
        trip.query.duration === activeQuery.duration
    );

    if (exists) return;

    const newSaved: SavedTrip = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      query: activeQuery,
      data: activeTrip,
      savedAt: new Date().toLocaleDateString(),
    };

    const updated = [newSaved, ...savedTrips];
    setSavedTrips(updated);
    localStorage.setItem('ethnopaths_saved_trips', JSON.stringify(updated));
  };

  const handleDeleteTrip = (id: string) => {
    const updated = savedTrips.filter((trip) => trip.id !== id);
    setSavedTrips(updated);
    localStorage.setItem('ethnopaths_saved_trips', JSON.stringify(updated));
  };

  const handleSelectSavedTrip = (trip: SavedTrip) => {
    setActiveTrip(trip.data);
    setActiveQuery(trip.query);
    setShowSaved(false);
    // Scroll to dossier display
    const element = document.getElementById('dossier-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isCurrentTripSaved = activeTrip
    ? savedTrips.some(
        (trip) =>
          trip.data.destinationName.toLowerCase() === activeTrip.destinationName.toLowerCase() &&
          trip.query.duration === (activeQuery?.duration || 0)
      )
    : false;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E2E2E2] flex flex-col selection:bg-amber-500/20 selection:text-amber-300">
      <Header onShowSaved={() => setShowSaved(!showSaved)} savedCount={savedTrips.length} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Hero & Hook Banner */}
        <section className="text-center max-w-3xl mx-auto space-y-4 py-4 print:hidden">
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Explore the Uncharted, Respect the Heritage
          </h1>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-serif max-w-2xl mx-auto">
            Welcome to <span className="font-sans font-extrabold text-white">EthnoPaths</span>. Our state-of-the-art Generative AI crafts deep, culturally conscious expeditions tailored to your values—uncovering hidden monuments, oral lore, sustainable craftsmanship, and local events.
          </p>
        </section>

        {/* Saved Trips Display */}
        {showSaved && (
          <section className="animate-fade-in print:hidden">
            <SavedTrips
              trips={savedTrips}
              onSelect={handleSelectSavedTrip}
              onDelete={handleDeleteTrip}
              onClose={() => setShowSaved(false)}
            />
          </section>
        )}

        {/* Input Form Section */}
        <section className="max-w-4xl mx-auto print:hidden">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {/* Loading State Skeleton */}
        {isLoading && (
          <section className="max-w-5xl mx-auto bg-[#0E0E10] border border-white/10 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl animate-pulse">
            <Compass className="h-14 w-14 text-amber-500 mx-auto animate-spin" />
            <div className="space-y-3 max-w-md mx-auto">
              <h2 className="font-serif text-2xl font-bold text-white">Assembling Cultural Archive...</h2>
              <p className="text-xs text-white/40 font-sans leading-relaxed">
                We are calling Gemini to extract historic heritage sites, verify cultural etiquette, find hidden gems, and compose oral folklore narration. This takes about 5 seconds.
              </p>
            </div>
            {/* Visual placeholder bars */}
            <div className="space-y-2 pt-4 max-w-lg mx-auto">
              <div className="h-4 bg-white/5 rounded-md w-full" />
              <div className="h-4 bg-white/5 rounded-md w-5/6 mx-auto" />
              <div className="h-4 bg-white/5 rounded-md w-4/5 mx-auto" />
            </div>
          </section>
        )}

        {/* Error Alert Display */}
        {error && (
          <section className="max-w-3xl mx-auto bg-red-950/20 border border-red-500/30 rounded-2xl p-6 text-center space-y-4 shadow-xl print:hidden">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-sans text-base font-bold text-red-300">Curator Sync Error</h3>
              <p className="text-xs text-red-400 leading-relaxed max-w-lg mx-auto">
                {error}
              </p>
            </div>
            <button
              onClick={() => activeQuery && handleSearch(activeQuery)}
              className="px-4 py-2 bg-red-900/50 hover:bg-red-900/80 text-white font-sans font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" /> Retry Generation
            </button>
          </section>
        )}

        {/* Main Cultural Dossier Display */}
        {activeTrip && (
          <section id="dossier-section" className="max-w-5xl mx-auto space-y-6">
            <TravelDashboard
              data={activeTrip}
              onSave={handleSaveTrip}
              isSaved={isCurrentTripSaved}
            />
          </section>
        )}

        {/* Empty State / Welcome Splash */}
        {!activeTrip && !isLoading && !error && (
          <section className="max-w-4xl mx-auto bg-[#0E0E10] border border-white/10 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl print:hidden">
            <div className="h-16 w-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
              <Compass className="h-8 w-8 text-amber-500" />
            </div>
            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">Your Cultural Compass Awaits</h2>
              <p className="text-xs sm:text-sm text-white/70 font-serif italic leading-relaxed">
                "Travel is more than the seeing of sights; it is a change that goes on, deep and permanent, in the ideas of living." – Miriam Beard
              </p>
              <p className="text-xs text-white/50 font-sans leading-relaxed pt-1">
                Enter your desired destination above and select your focus areas (Heritage, Artisan Crafts, Food History) to generate an authentic digital dossier powered by Google Gemini.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Footer copyright and sustainable travel pledge */}
      <footer className="border-t border-white/10 bg-transparent py-8 text-center text-white/40 font-sans text-xs space-y-2 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 EthnoPaths. Empowering travelers, protecting heritage.</p>
          <div className="flex items-center gap-2 text-[11px] font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span>Sustainable Tourism Certified Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
