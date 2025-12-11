import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Heart, ChevronLeft, Check, X } from 'lucide-react-native';
import { theme } from '../theme';
import { GlassCard } from '../components/GlassCard';

export const EmotionWheelScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [level, setLevel] = useState(1);
  const [history, setHistory] = useState<any[]>([]); // Track path
  const [selection, setSelection] = useState<string | null>(null);

  // Simplified hierarchy data
  const emotions = {
    'Happy': { color: '#F59E0B', sub: ['Optimistic', 'Peaceful', 'Powerful', 'Proud'] },
    'Sad': { color: '#3B82F6', sub: ['Lonely', 'Vulnerable', 'Despair', 'Guilty'] },
    'Angry': { color: '#EF4444', sub: ['Hurt', 'Threatened', 'Hateful', 'Aggressive'] },
    'Fearful': { color: '#8B5CF6', sub: ['Anxious', 'Insecure', 'Weak', 'Rejected'] },
    'Bad': { color: '#10B981', sub: ['Bored', 'Busy', 'Stressed', 'Tired'] },
    'Surprised': { color: '#EC4899', sub: ['Startled', 'Confused', 'Amazed', 'Excited'] },
  };

  const currentOptions = level === 1 ? Object.keys(emotions) : emotions[history[0] as keyof typeof emotions].sub;
  const activeColor = history.length > 0 ? emotions[history[0] as keyof typeof emotions].color : theme.colors.primary;

  const handleSelect = (item: string) => {
    if (level === 1) {
      setHistory([item]);
      setLevel(2);
    } else {
      setSelection(item);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {level > 1 ? (
          <TouchableOpacity onPress={() => { setLevel(1); setHistory([]); setSelection(null); }} style={styles.navButton}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onClose} style={styles.navButton}>
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Emotion Wheel</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.question}>
          {selection ? "You are feeling:" : level === 1 ? "How are you feeling?" : "Can we be more specific?"}
        </Text>

        {selection ? (
          <GlassCard style={[styles.resultCard, { borderColor: activeColor }]} gradient={true}>
            <Heart size={48} color={activeColor} fill={activeColor + '20'} />
            <Text style={styles.resultText}>{selection}</Text>
            <Text style={styles.resultSub}>Acknowledging this feeling is the first step.</Text>
            <TouchableOpacity style={[styles.doneButton, { backgroundColor: activeColor }]} onPress={onClose}>
              <Text style={styles.doneText}>Log Emotion</Text>
            </TouchableOpacity>
          </GlassCard>
        ) : (
          <View style={styles.grid}>
            {currentOptions.map((item) => (
              <TouchableOpacity key={item} style={styles.gridItem} onPress={() => handleSelect(item)}>
                <GlassCard style={[
                        styles.card,
                        level === 1 ? { borderColor: emotions[item as keyof typeof emotions].color } : {}
                    ]} gradient={true}>
                  <View style={[
                    styles.dot, 
                    { backgroundColor: level === 1 ? emotions[item as keyof typeof emotions].color : activeColor }
                  ]} />
                  <Text style={styles.cardText}>{item}</Text>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingTop: Platform.OS === 'ios' ? 50 : 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  navButton: { padding: 8, backgroundColor: theme.colors.surface, borderRadius: 12 },
  title: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text },
  content: { paddingHorizontal: 20 },
  question: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 30, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  gridItem: { width: '48%' },
  card: { padding: 20, alignItems: 'center', justifyContent: 'center', gap: 12, height: 120 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  cardText: { fontSize: 16, fontWeight: '600', color: theme.colors.text },
  resultCard: { padding: 40, alignItems: 'center', gap: 20, marginTop: 20 },
  resultText: { fontSize: 32, fontWeight: 'bold', color: theme.colors.text },
  resultSub: { fontSize: 16, color: theme.colors.textSecondary, textAlign: 'center' },
  doneButton: { paddingHorizontal: 32, paddingVertical: 16, borderRadius: 30, marginTop: 20 },
  doneText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});