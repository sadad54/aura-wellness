import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { supabase } from '../lib/supabase';

// Define the shape of our data
interface WellnessData {
  wellnessScore: number;
  streak: number;
  totalSessions: number;
  moodHistory: { date: string; mood: string; intensity: number }[];
  journalEntries: { id: string; date: string; text: string; mood: string; insight?: string }[];
}

// Define the shape of the Context
interface WellnessContextType {
  data: WellnessData;
  user: any;
  activeTool: string | null;
  insight: string;
  wellnessScore: number;
  
  // Actions
  setActiveTool: (tool: string | null) => void;
  addJournalEntry: (entry: { text: string; mood: string; intensity: number }) => void;
  completeSession: () => void;
  
  // AI Features
  analyzeEntry: (text: string) => Promise<void>;
  getAIReframe: (negativeThought: string) => Promise<{ distortion: string; reframe: string } | null>;
  suggestHabit: () => Promise<{ title: string; time: string } | null>;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const WellnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [insight, setInsight] = useState("Let's make today count.");
  
  // Initialize with default data
  const [data, setData] = useState<WellnessData>({
    wellnessScore: 75,
    streak: 0,
    totalSessions: 0,
    moodHistory: [],
    journalEntries: [],
  });

  // 1. Load Local Data on Startup
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

  // 2. Persist Local Data on Change
  useEffect(() => {
    AsyncStorage.setItem('aura_data', JSON.stringify(data));
  }, [data]);

  // 3. Handle Supabase Auth Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) syncProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch or Create Profile in Supabase
  const syncProfile = async (userId: string) => {
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (profile) {
      // Sync cloud score to local if needed, or vice-versa
      setData(prev => ({ ...prev, wellnessScore: profile.wellness_score }));
    }
  };

  // --- Core Actions ---

  const addJournalEntry = (entry: { text: string; mood: string; intensity: number }) => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      text: entry.text,
      mood: entry.mood,
    };
    
    setData(prev => ({
      ...prev,
      journalEntries: [newEntry, ...prev.journalEntries],
      moodHistory: [...prev.moodHistory, { date: newEntry.date, mood: entry.mood, intensity: entry.intensity }],
      // Simple algorithm: boost score slightly for taking action
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

  // --- AI Integrations ---

  // 1. Analyze Journal (Groq via Supabase Edge Function)
  const analyzeEntry = async (text: string) => {
    try {
      if (!user) return; // Only work if online/logged in

      const { data: aiResponse, error } = await supabase.functions.invoke('analyze-journal', {
        body: { journalText: text },
      });

      if (error) throw error;

      // Parse result (assuming function returns { score_adjustment, insight })
      const result = typeof aiResponse === 'string' ? JSON.parse(aiResponse) : aiResponse;
      const newScore = Math.min(100, Math.max(0, data.wellnessScore + (result.score_adjustment || 0)));
      
      // Update State
      setInsight(result.insight || "Keep journaling to see patterns.");
      setData(prev => ({ ...prev, wellnessScore: newScore }));

      // Save to Supabase DB
      await supabase.from('journals').insert({
        user_id: user.id,
        content: text,
        ai_insight: result.insight,
        mood: 'neutral' // Or pass actual mood if available
      });

      // Update Profile Score
      await supabase.from('profiles').update({ wellness_score: newScore }).eq('id', user.id);

    } catch (error) {
      console.error('AI Analysis Failed:', error);
      // Fallback for offline/error
      setInsight("Your thoughts are safe. Keep going.");
    }
  };

  // 2. CBT Reframing (AI Coach)
const getAIReframe = async (negativeThought: string) => {
    try {
      if (!user) {
        // Fallback for offline/no-auth
        return { distortion: "Negative Filtering", reframe: "Try to look at the whole picture, not just the negative part." };
      }
      const { data: aiResponse, error } = await supabase.functions.invoke('ai-coach', {
        body: { task: 'reframe', content: negativeThought },
      });

      if (error) throw error;
      return typeof aiResponse === 'string' ? JSON.parse(aiResponse) : aiResponse;
    } catch (error) {
      console.error('Reframe Error:', error);
      return null;
    }
  };
  // 3. Habit Suggestion (AI Architect)
const suggestHabit = async () => {
    try {
      if (!user) {
        return { title: "Drink Water", time: "09:00 AM" };
      }
      const recentJournal = data.journalEntries[0]?.text || "";
      const { data: aiResponse, error } = await supabase.functions.invoke('ai-coach', {
        body: { task: 'habit_suggestion', content: recentJournal },
      });

      if (error) throw error;
      return typeof aiResponse === 'string' ? JSON.parse(aiResponse) : aiResponse;
    } catch (error) {
      console.error('Habit Suggestion Error:', error);
      return null;
    }
  };

  return (
    <WellnessContext.Provider value={{ 
      data, 
      user, 
      activeTool, 
      insight,
      setActiveTool, 
      addJournalEntry, 
      completeSession, 
      analyzeEntry,
      getAIReframe,
      suggestHabit,
      wellnessScore: data.wellnessScore,
    }}>
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) throw new Error('useWellness must be used within a WellnessProvider');
  return context;
};