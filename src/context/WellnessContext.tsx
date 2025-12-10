import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of our data
interface WellnessData {
  wellnessScore: number;
  streak: number;
  totalSessions: number;
  moodHistory: { date: string; mood: string; intensity: number }[];
  journalEntries: { id: string; date: string; text: string; mood: string }[];
}

interface WellnessContextType {
  data: WellnessData;
  addJournalEntry: (entry: { text: string; mood: string; intensity: number }) => void;
  completeSession: () => void; // Call this when finishing Breathing/Audio
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const WellnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
    const [data, setData] = useState<WellnessData>({
    wellnessScore: 75, // Starting score
    streak: 0,
    totalSessions: 0,
    moodHistory: [],
    journalEntries: [],
  });

  // Load data on startup
  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem('aura_data');
        if (stored) setData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load data", e);
      }
    };
    loadData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('aura_data', JSON.stringify(data));
  }, [data]);

  const addJournalEntry = (entry: { text: string; mood: string; intensity: number }) => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...entry,
    };
    
    setData(prev => ({
      ...prev,
      journalEntries: [newEntry, ...prev.journalEntries],
      moodHistory: [...prev.moodHistory, { date: newEntry.date, mood: entry.mood, intensity: entry.intensity }],
      // Simple algorithm to boost wellness score based on action
      wellnessScore: Math.min(100, prev.wellnessScore + 2), 
    }));
  };

  const completeSession = () => {
    setData(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      wellnessScore: Math.min(100, prev.wellnessScore + 5),
    }));
  };

  return (
    <WellnessContext.Provider value={{ data, addJournalEntry, completeSession, activeTool, setActiveTool }}>
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) throw new Error('useWellness must be used within a WellnessProvider');
  return context;
};