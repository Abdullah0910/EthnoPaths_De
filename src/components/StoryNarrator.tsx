/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, AlertCircle, Play, Pause, RefreshCw } from 'lucide-react';

interface StoryNarratorProps {
  storyText: string;
  destination: string;
}

const VOICES = [
  { id: 'Zephyr', name: 'Zephyr (Warm & Professional)' },
  { id: 'Kore', name: 'Kore (Clear & Enthusiastic)' },
  { id: 'Puck', name: 'Puck (Narrator Accent)' },
  { id: 'Charon', name: 'Charon (Deep & Traditional)' },
  { id: 'Fenrir', name: 'Fenrir (Serene & Calm)' },
];

export const StoryNarrator: React.FC<StoryNarratorProps> = ({ storyText, destination }) => {
  const [selectedVoice, setSelectedVoice] = useState('Zephyr');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clean up audio object on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [audioUrl]);

  // Reset audio cache and stop playback if the story text or destination changes
  useEffect(() => {
    stopAudio();
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setErrorMsg(null);
  }, [storyText, destination]);

  const handleSynthesizeAndPlay = async () => {
    setErrorMsg(null);

    // If we already have synthesized audio for the current story & voice, just toggle play
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error('Audio playback failed:', err);
          setErrorMsg('Playback was blocked or failed.');
        });
      }
      return;
    }

    setIsSynthesizing(true);
    try {
      const response = await fetch('/api/travel/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: storyText,
          voice: selectedVoice,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to generate speech.');
      }

      const binaryString = window.atob(data.audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Live API and TTS generate 24kHz raw PCM little-endian.
      // We detect if it already has a WAV container by checking the RIFF header.
      // If not, we wrap the raw 24kHz 16-bit mono PCM bytes in a proper WAV header so the browser can play it.
      const isAlreadyWav = bytes.length >= 4 &&
        bytes[0] === 0x52 && // R
        bytes[1] === 0x49 && // I
        bytes[2] === 0x46 && // F
        bytes[3] === 0x46;   // F

      let wavBytes = bytes;
      if (!isAlreadyWav) {
        const sampleRate = 24000;
        const buffer = new ArrayBuffer(44 + bytes.length);
        const view = new DataView(buffer);

        const writeString = (offset: number, str: string) => {
          for (let i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i));
          }
        };

        writeString(0, 'RIFF');
        view.setUint32(4, 36 + bytes.length, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true); // PCM format
        view.setUint16(22, 1, true); // Mono
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true); // Byte rate (sampleRate * 2 bytes/sample)
        view.setUint16(32, 2, true); // Block align
        view.setUint16(34, 16, true); // 16-bit
        writeString(36, 'data');
        view.setUint32(40, bytes.length, true);

        wavBytes = new Uint8Array(buffer);
        wavBytes.set(bytes, 44);
      }

      const blob = new Blob([wavBytes], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);

      setAudioUrl(url);

      // Create internal audio element
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('ended', () => setIsPlaying(false));

      audio.play().catch((err) => {
        console.error('Audio auto-play failed:', err);
        setErrorMsg('Click play to listen. Auto-play was restricted by browser policies.');
        setIsPlaying(false);
      });
    } catch (err: any) {
      console.error('TTS synthesis error:', err);
      // Robust fallback: use Web Speech API (speechSynthesis) if our custom Gemini TTS is unavailable
      handleLocalTTSFallback();
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleLocalTTSFallback = () => {
    if ('speechSynthesis' in window) {
      setErrorMsg('Falling back to system browser voice narrator.');
      const utterance = new SpeechSynthesisUtterance(storyText);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.cancel(); // Stop any currently playing audio
      window.speechSynthesis.speak(utterance);
    } else {
      setErrorMsg('Audio narration is not supported in this environment.');
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // Reset audio cache if voice changes
  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    stopAudio();
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setSelectedVoice(e.target.value);
  };

  return (
    <div className="bg-gradient-to-br from-[#0E0E10] to-[#0A0A0B] border border-white/10 text-stone-100 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
      {/* Visual background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 uppercase tracking-wider font-mono">
            <Sparkles className="h-3 w-3" /> Immersive Oral Storytelling
          </span>
          <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
            Folklore & Heritage of {destination}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed font-serif italic">
            "{storyText}"
          </p>
        </div>

        {/* Audio controls */}
        <div className="flex flex-col items-stretch sm:items-center justify-center gap-3 bg-black/40 border border-white/10 p-4 rounded-xl min-w-[240px]">
          <div className="w-full">
            <label htmlFor="voice-select" className="block text-[11px] font-bold text-white/40 uppercase tracking-widest font-sans mb-1.5">
              Select Narrator Accent
            </label>
            <select
              id="voice-select"
              value={selectedVoice}
              onChange={handleVoiceChange}
              className="w-full bg-[#0A0A0B] border border-white/10 text-white text-xs rounded-lg p-2 focus:ring-1 focus:ring-amber-500 focus:outline-none cursor-pointer"
            >
              {VOICES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center gap-3 w-full pt-1">
            {isSynthesizing ? (
              <button
                disabled
                className="w-full py-3 px-4 bg-white/5 text-white/40 text-xs font-bold rounded-lg flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4 animate-spin text-amber-500" />
                Synthesizing Story...
              </button>
            ) : isPlaying ? (
              <button
                onClick={stopAudio}
                className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Pause className="h-4 w-4" /> Stop Narration
              </button>
            ) : (
              <button
                onClick={handleSynthesizeAndPlay}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="h-4 w-4" /> Listen to Oral Story
              </button>
            )}
          </div>

          {/* Pulsing Audio Waves during Playback */}
          {isPlaying && (
            <div className="flex items-center gap-1 justify-center py-1.5">
              <span className="w-1 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <span className="w-1 h-5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1 h-4 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              <span className="w-1 h-6 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              <span className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
          )}

          {errorMsg && (
            <div className="flex items-start gap-1.5 text-[10px] text-stone-400 mt-1 max-w-[210px] text-center leading-snug">
              <AlertCircle className="h-3 w-3 text-amber-500/80 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
