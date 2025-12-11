import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { X, RefreshCw, Share2, Sparkles } from 'lucide-react-native';
import { theme } from '../theme';
import { GlassCard } from '../components/GlassCard';

const { width } = Dimensions.get('window');

export const AffirmationsScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const affirmations = [
    "I am worthy of good things.",
    "My peace is my priority.",
    "I trust the timing of my life.",
    "I am growing every single day.",
    "I choose calm over chaos."
  ];

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % affirmations.length);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <X size={24} color={theme.colors.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Daily Affirmations</Text>
        
        <TouchableOpacity activeOpacity={0.9} onPress={handleNext}>
          <GlassCard style={styles.card} gradient={true}>
            <Sparkles size={40} color={theme.colors.warning} style={{ marginBottom: 20 }} />
            <Text style={styles.affirmationText}>"{affirmations[index]}"</Text>
            <Text style={styles.tapHint}>Tap for next</Text>
          </GlassCard>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={20} color={theme.colors.text} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleNext}>
            <RefreshCw size={20} color={theme.colors.text} />
            <Text style={styles.actionText}>Shuffle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingTop: Platform.OS === 'ios' ? 50 : 20 },
  closeButton: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 8 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.text, marginBottom: 40 },
  card: { width: width - 40, height: 400, alignItems: 'center', justifyContent: 'center', padding: 30, backgroundColor: 'rgba(255,255,255,0.08)' },
  affirmationText: { fontSize: 28, fontWeight: '600', color: theme.colors.text, textAlign: 'center', lineHeight: 40 },
  tapHint: { position: 'absolute', bottom: 30, fontSize: 12, color: theme.colors.textTertiary, textTransform: 'uppercase', letterSpacing: 1 },
  actions: { flexDirection: 'row', gap: 20, marginTop: 40 },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 12, backgroundColor: theme.colors.surface, borderRadius: 20 },
  actionText: { color: theme.colors.text, fontWeight: '600' },
});