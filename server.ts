/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize Gemini Client
// We verify that GEMINI_API_KEY is present; if not, we fail gracefully rather than crashing during startup
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
  console.log('Gemini client initialized successfully.');
} else {
  console.warn('WARNING: GEMINI_API_KEY environment variable is missing.');
}

// Security Helper: Basic Input Validation and Prompt Injection Defense
function validateTravelRequest(destination: string, interests: string[], duration: number): string | null {
  if (!destination || typeof destination !== 'string' || destination.trim().length < 2) {
    return 'Invalid destination name. It must be a non-empty string of at least 2 characters.';
  }
  if (destination.length > 120) {
    return 'Destination name is too long.';
  }
  if (!Array.isArray(interests) || interests.length === 0) {
    return 'Please select at least one travel interest or style.';
  }
  if (typeof duration !== 'number' || duration < 1 || duration > 14) {
    return 'Trip duration must be a number between 1 and 14 days.';
  }

  // Detect common prompt injection patterns
  const injectionPatterns = [
    /ignore previous/i,
    /system prompt/i,
    /you are now/i,
    /delete files/i,
    /override instructions/i,
    /instruction override/i,
    /sql injection/i,
  ];

  const fullInput = `${destination} ${interests.join(' ')}`;
  for (const pattern of injectionPatterns) {
    if (pattern.test(fullInput)) {
      return 'Potential security hazard detected in the inputs. Please provide valid destination and interests.';
    }
  }

  return null;
}

// Endpoint 1: Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', apiConfigured: !!ai });
});

// Endpoint 2: Explore & Culture Guide
app.post('/api/travel/explore', async (req: Request, res: Response) => {
  if (!ai) {
    return res.status(500).json({
      error: 'Gemini API key is not configured. Please add GEMINI_API_KEY in Settings > Secrets.',
    });
  }

  const { destination, interests, budget, duration } = req.body;

  // Validate inputs
  const validationError = validateTravelRequest(destination, interests, Number(duration));
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const budgetText = budget === 'budget' ? 'Low-cost, budget-friendly backpacking style' : budget === 'luxury' ? 'Premium, luxury style' : 'Moderate, standard comfort style';

  const userPrompt = `
Generate a comprehensive, culturally rich, and highly engaging travel discovery guide for the destination: "${destination}".
Context/Preferences:
- Travel Style & Interests: ${interests.join(', ')} (focus specifically on these)
- Budget Profile: ${budgetText}
- Trip Duration: ${duration} Days

Your response MUST be a single, valid JSON object matching the requested schema. Ensure all cultural insights are authentic, the storytelling is immersive and educational, and the tips promote respectful, sustainable travel.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `You are an elite UX Travel Engineer, Cultural Anthropologist, and Local Storyteller.
You generate highly accurate, evocative, and practical travel guides that help travelers discover authentic, lesser-known heritage and culture.
Never output any markdown commentary outside of the valid JSON object.
Your JSON response MUST match the following structure exactly:
{
  "destinationName": "The clean name of the destination",
  "country": "The name of the country",
  "overview": "An evocative, welcoming intro paragraph describing the spirit of the place (around 100 words).",
  "quickStats": {
    "bestSeason": "The ideal months to visit",
    "currency": "Local currency code and symbol",
    "language": "Primary language spoken (with a friendly greeting in that language)",
    "vibe": "3-4 words representing the aesthetic vibe"
  },
  "hiddenGems": [
    {
      "name": "Name of the hidden gem",
      "location": "Rough area or specific neighborhood",
      "culturalSignificance": "The cultural background or story behind it",
      "whyVisit": "Why a conscious traveler should visit and what makes it extraordinary"
    }
  ],
  "culturalStorytelling": "A cinematic, deeply immersive narrative about the heritage, history, or folklore of this place. Write this in an elegant, storytelling prose that can be read aloud, bringing the local heritage to life. Length: 150-200 words.",
  "heritageSites": [
    {
      "name": "Name of the heritage site",
      "location": "Location",
      "history": "Rich, brief history of the site",
      "visitingTips": "Special considerations for respectful visiting (e.g. dress codes, local timing)"
    }
  ],
  "authenticExperiences": [
    {
      "title": "Experience title (e.g., Joining a traditional pottery master class)",
      "description": "Engaging description of this authentic, local encounter",
      "howToFind": "Practical, sustainable ways for a traveler to find or support this experience",
      "etiquetteCustoms": "Important etiquette rules to observe during the experience"
    }
  ],
  "foodRecommendations": [
    {
      "dishName": "Local dish name",
      "pronunciation": "Phonetic pronunciation",
      "culturalSignificance": "The history, season, or cultural meaning of this dish",
      "recommendedPlaces": "Where to find it (street market names or traditional eatery types)",
      "isStreetFood": true
    }
  ],
  "localEvents": [
    {
      "eventName": "Name of festival or seasonal event",
      "seasonOrDate": "When it happens",
      "culturalMeaning": "Why the local community celebrates it",
      "travelerParticipation": "How travelers can observe or participate respectfully"
    }
  ],
  "itinerary": [
    {
      "dayNumber": 1,
      "theme": "A theme for the day matching user interests",
      "items": [
        {
          "timeOfDay": "Morning",
          "activity": "Specific visual/cultural activity matching interests",
          "location": "The neighborhood/place",
          "culturalNote": "Insight into the local culture regarding this spot",
          "foodStop": "Suggested traditional breakfast spot or local item to try"
        }
      ]
    }
  ],
  "budgetSuggestions": {
    "estimatedCostPerDayUSD": 120,
    "tier": "Budget/Moderate/Luxury",
    "breakdown": {
      "accommodation": "Specific cost range and typical local lodgings matching the budget tier",
      "food": "Estimated daily food cost and traditional eating habits",
      "transport": "Transit choices and estimated daily costs",
      "activities": "Cost breakdown for heritage entries and experiences"
    },
    "savingTips": ["Tip 1", "Tip 2"]
  },
  "travelTips": ["Essential travel tip 1", "Essential travel tip 2"],
  "culturalEtiquette": {
    "dos": ["Do item 1", "Do item 2"],
    "donts": ["Don't item 1", "Don't item 2"],
    "localCustoms": "Brief explanation of daily customs, body language, or tipping etiquette"
  },
  "safetyAdvice": {
    "precautions": ["Precautions for travelers", "Weather/scam notes"],
    "localSafetyLevel": "Detailed description of general safety"
  },
  "emergencyContacts": {
    "police": "Local phone number",
    "ambulance": "Local phone number",
    "fire": "Local phone number",
    "helpfulPhrases": [
      {
        "phrase": "Helpful phrase (e.g. Please, Thank you, Help)",
        "translation": "English translation",
        "pronunciation": "Phonetic sound"
      }
    ]
  },
  "packingSuggestions": ["Clothing recommendation for heritage site respect", "Practical accessories"],
  "nearbyAlternatives": [
    {
      "name": "Alternative town or village name",
      "distance": "Distance / time from destination",
      "description": "Lesser-known spot offering similar cultural richness with fewer crowds",
      "whyVisit": "Why they should consider a side-trip here"
    }
  ]
}

Provide EXACTLY this JSON structure. Include at least 2 Hidden Gems, 2 Heritage Sites, 2 Authentic Experiences, 3 Food Recommendations, 1-2 Local Events, 3 Alternate Destinations, and a complete day-by-day Itinerary covering ${duration} days (from Day 1 up to Day ${duration}). Do not return any other text besides the JSON object.`,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Gemini returned an empty response.');
    }

    const parsedData = JSON.parse(responseText.trim());
    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error generating travel guide:', error);
    return res.status(500).json({
      error: 'Failed to generate travel guide.',
      details: error.message || error,
    });
  }
});

// Endpoint 3: Text to Speech (TTS) using gemini-3.1-flash-tts-preview
app.post('/api/travel/tts', async (req: Request, res: Response) => {
  if (!ai) {
    return res.status(500).json({
      error: 'Gemini API key is not configured.',
    });
  }

  const { text, voice } = req.body;
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text prompt is required for speech synthesis.' });
  }

  const selectedVoice = voice || 'Zephyr'; // Default voice

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-tts-preview',
      contents: [{ parts: [{ text: `Say this beautifully and clearly as a professional cultural travel guide. Pause naturally at periods: ${text}` }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error('No audio content was generated by Gemini TTS.');
    }

    return res.json({ audio: base64Audio });
  } catch (error: any) {
    console.error('Error generating speech:', error);
    return res.status(500).json({
      error: 'Failed to synthesize speech using Gemini TTS.',
      details: error.message || error,
    });
  }
});

// Serve frontend assets using Vite or Express static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
