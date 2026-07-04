/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TravelSearchQuery {
  destination: string;
  interests: string[];
  budget: 'budget' | 'moderate' | 'luxury';
  duration: number;
}

export interface QuickStats {
  bestSeason: string;
  currency: string;
  language: string;
  vibe: string;
}

export interface HiddenGem {
  name: string;
  location: string;
  culturalSignificance: string;
  whyVisit: string;
}

export interface HeritageSite {
  name: string;
  location: string;
  history: string;
  visitingTips: string;
}

export interface LocalExperience {
  title: string;
  description: string;
  howToFind: string;
  etiquetteCustoms: string;
}

export interface FoodRecommendation {
  dishName: string;
  pronunciation?: string;
  culturalSignificance: string;
  recommendedPlaces: string;
  isStreetFood: boolean;
}

export interface LocalEvent {
  eventName: string;
  seasonOrDate: string;
  culturalMeaning: string;
  travelerParticipation: string;
}

export interface ItineraryItem {
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  activity: string;
  location: string;
  culturalNote: string;
  foodStop?: string;
}

export interface DayItinerary {
  dayNumber: number;
  theme: string;
  items: ItineraryItem[];
}

export interface CostBreakdown {
  accommodation: string;
  food: string;
  transport: string;
  activities: string;
}

export interface BudgetSuggestions {
  estimatedCostPerDayUSD: number;
  tier: string;
  breakdown: CostBreakdown;
  savingTips: string[];
}

export interface EmergencyContacts {
  police: string;
  ambulance: string;
  fire: string;
  helpfulPhrases: { phrase: string; translation: string; pronunciation: string }[];
}

export interface AlternativeDestination {
  name: string;
  distance: string;
  description: string;
  whyVisit: string;
}

export interface TravelData {
  destinationName: string;
  country: string;
  overview: string;
  quickStats: QuickStats;
  hiddenGems: HiddenGem[];
  culturalStorytelling: string;
  heritageSites: HeritageSite[];
  authenticExperiences: LocalExperience[];
  foodRecommendations: FoodRecommendation[];
  localEvents: LocalEvent[];
  itinerary: DayItinerary[];
  budgetSuggestions: BudgetSuggestions;
  travelTips: string[];
  culturalEtiquette: { dos: string[]; donts: string[]; localCustoms: string };
  safetyAdvice: { precautions: string[]; localSafetyLevel: string };
  emergencyContacts: EmergencyContacts;
  packingSuggestions: string[];
  nearbyAlternatives: AlternativeDestination[];
}

export interface SavedTrip {
  id: string;
  query: TravelSearchQuery;
  data: TravelData;
  savedAt: string;
}
