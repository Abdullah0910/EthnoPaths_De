/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Trash2, Calendar, MapPin, Tag } from 'lucide-react';
import { SavedTrip } from '../types';

interface SavedTripsProps {
  trips: SavedTrip[];
  onSelect: (trip: SavedTrip) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const SavedTrips: React.FC<SavedTripsProps> = ({ trips, onSelect, onDelete, onClose }) => {
  return (
    <div className="bg-[#0E0E10] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
            Your Saved Expeditions
          </h3>
          <p className="text-xs text-white/50 font-sans">
            Quick access to your curated cultural exploration itineraries
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/80 transition-colors cursor-pointer"
        >
          Hide List
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed border-white/10 rounded-xl space-y-3">
          <Compass className="h-10 w-10 text-white/20 mx-auto animate-pulse" />
          <p className="text-sm font-semibold text-white/70">No guides saved yet</p>
          <p className="text-xs text-white/40 max-w-sm mx-auto leading-relaxed">
            Run a cultural exploration search above and click "Save to Library" to build your permanent bucket list.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:border-amber-500 hover:bg-white/[0.05] hover:shadow-md transition-all flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-serif text-lg font-bold text-white flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
                    {trip.data.destinationName}, {trip.data.country}
                  </span>
                  <button
                    onClick={() => onDelete(trip.id)}
                    className="p-1.5 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors focus:outline-none cursor-pointer"
                    aria-label={`Delete ${trip.data.destinationName} guide`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-white/70 line-clamp-2 italic font-serif">
                  "{trip.data.overview}"
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-[11px] font-semibold text-white/40 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {trip.query.duration} Days
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {trip.query.budget.toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelect(trip)}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-black font-sans font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Compass className="h-3.5 w-3.5" />
                Open Expedition Dossier
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
