import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { Check, Lightbulb, RefreshCw, Zap } from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { MoodSelector, type Mood } from '../components/MoodSelector';
import { AIInsightCard } from '../components/AIInsightCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { theme } from '../theme';
import { useWellness } from '../context/WellnessContext';


export const JournalScreenEnhanced: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [aiExpanded, setAiExpanded] = useState(false);
const { addJournalEntry } = useWellness();
const handleSave = () => {
    if (!entry) return;
    
    addJournalEntry({
      text: entry,
      mood: selectedMood || 'neutral',
      intensity: moodIntensity
    });
    
    setEntry(''); // Clear input
    // Ideally, show a success toast or navigate back
    console.log("Saved to global state!");
  };

  const moodOptions: Mood[] = [
    { id: 'joyful', label: 'Joyful', emoji: '😄', color: '#F59E0B' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: '#06B6D4' },
    { id: 'energized', label: 'Energized', emoji: '⚡', color: '#10B981' },
    { id: 'neutral', label: 'Neutral', emoji: '😐', color: '#8B5CF6' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: '#EF4444' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: '#EC4899' },
    { id: 'grateful', label: 'Grateful', emoji: '🙏', color: '#06B6D4' },
    { id: 'peaceful', label: 'Peaceful', emoji: '🕊️', color: '#A78BFA' },
  ];

  const guidedPrompts = [
    { emoji: '🙏', text: 'What are 3 things you\'re grateful for?' },
    { emoji: '🌱', text: 'What did you learn about yourself today?' },
    { emoji: '🤔', text: 'How did you grow today?' },
    { emoji: '✨', text: 'What\'s your intention for tomorrow?' },
  ];

  const handleAIAssist = (action: string) => {
    switch (action) {
      case 'clarify':
        console.log('AI: Clarifying thoughts...');
        break;
      case 'summarize':
        console.log('AI: Summarizing...');
        break;
      case 'reframe':
        console.log('AI: Positive reframing...');
        break;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily Journal</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* Mood Selector - Enhanced */}
      <Text style={styles.sectionTitle}>How are you feeling?</Text>
      <View style={styles.moodSelectorContainer}>
        <MoodSelector
          moods={moodOptions}
          selectedMood={selectedMood}
          onSelectMood={setSelectedMood}
          gridColumns={4}
        />
      </View>

      {/* Mood Intensity Slider */}
      {selectedMood && (
        <GlassCard style={styles.intensityCard}>
          <View style={styles.intensityHeader}>
            <Text style={styles.intensityLabel}>Mood Intensity</Text>
            <View style={styles.intensityValue}>
              <Text style={styles.intensityNumber}>{moodIntensity}</Text>
              <Text style={styles.intensityMax}>/10</Text>
            </View>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={moodIntensity}
            onValueChange={setMoodIntensity}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.surface}
            thumbTintColor={theme.colors.primary}
          />
          <View style={styles.intensityLabels}>
            <Text style={styles.intensityLabel}>Subtle</Text>
            <Text style={styles.intensityLabel}>Intense</Text>
          </View>
        </GlassCard>
      )}

      {/* Guided Prompts */}
      <Text style={styles.sectionTitle}>Guided Prompts</Text>
      <View style={styles.promptsGrid}>
        {guidedPrompts.map((prompt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.promptCard}
            onPress={() => setEntry(entry + (entry ? '\n\n' : '') + prompt.text)}
          >
            <Text style={styles.promptEmoji}>{prompt.emoji}</Text>
            <Text style={styles.promptText}>{prompt.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Journal Input */}
      <Text style={styles.sectionTitle}>Your Thoughts</Text>
      <GlassCard style={styles.inputCard}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind today?"
          placeholderTextColor={theme.colors.textTertiary}
          multiline
          value={entry}
          onChangeText={setEntry}
          textAlignVertical="top"
        />
      </GlassCard>

      {/* AI Writing Assistant */}
      <Text style={styles.sectionTitle}>AI Writing Assistant</Text>
      <TouchableOpacity
        style={styles.aiHeader}
        onPress={() => setAiExpanded(!aiExpanded)}
      >
        <View style={styles.aiTitleContainer}>
          <Lightbulb size={20} color={theme.colors.primary} />
          <Text style={styles.aiTitle}>AI Assistance</Text>
        </View>
        <Text style={styles.aiToggle}>{aiExpanded ? '−' : '+'}</Text>
      </TouchableOpacity>

      {aiExpanded && (
        <GlassCard style={styles.aiCard}>
          <View style={styles.aiButtonsRow}>
            <TouchableOpacity
              style={[styles.aiButton, styles.aiButtonPrimary]}
              onPress={() => handleAIAssist('clarify')}
            >
              <Zap size={16} color="#FFFFFF" />
              <Text style={styles.aiButtonText}>Clarify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.aiButton, styles.aiButtonSecondary]}
              onPress={() => handleAIAssist('summarize')}
            >
              <RefreshCw size={16} color={theme.colors.primary} />
              <Text style={[styles.aiButtonText, { color: theme.colors.primary }]}>
                Summarize
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.aiButton, styles.aiButtonWide, styles.aiButtonPrimary]}
            onPress={() => handleAIAssist('reframe')}
          >
            <Zap size={16} color="#FFFFFF" />
            <Text style={styles.aiButtonText}>Reframe Positively</Text>
          </TouchableOpacity>
          <Text style={styles.aiHint}>
            AI can help clarify your thoughts, find patterns, and reframe challenges positively.
          </Text>
        </GlassCard>
      )}

      {/* Save Button */}
      <AnimatedButton
        variant="primary"
        gradient={[theme.colors.primary, '#EC4899']}
        icon={Check}
        onPress={handleSave}
        style={styles.saveButton}
      >
        Save Entry
      </AnimatedButton>

      {/* Recent Entries */}
      <Text style={styles.sectionTitle}>Recent Entries</Text>
      {[1, 2, 3].map((i) => (
        <TouchableOpacity key={i}>
          <GlassCard style={styles.entryPreview}>
            <View style={styles.entryHeader}>
              <View>
                <Text style={styles.entryDate}>Dec {i}, 2024</Text>
                <Text style={styles.entryMoodLabel}>Mood: Calm</Text>
              </View>
              <View style={styles.entryMoodDisplay}>
                <Text style={styles.entryMood}>😊</Text>
              </View>
            </View>
            <Text style={styles.entryText} numberOfLines={2}>
              Had a wonderful day focusing on my wellness journey and personal growth...
            </Text>
          </GlassCard>
        </TouchableOpacity>
      ))}

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: theme.spacing.lg,
  },
  spacer: {
    height: 40,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  date: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  moodSelectorContainer: {
    marginBottom: theme.spacing.lg,
  },
  intensityCard: {
    marginBottom: theme.spacing.lg,
  },
  intensityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  intensityLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  intensityValue: {
    flexDirection: 'row',
    gap: 2,
  },
  intensityNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  intensityMax: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: theme.spacing.sm,
  },
  intensityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promptsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  promptCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  promptEmoji: {
    fontSize: 24,
    marginBottom: theme.spacing.sm,
  },
  promptText: {
    fontSize: 12,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 16,
  },
  inputCard: {
    minHeight: 180,
    marginBottom: theme.spacing.lg,
  },
  input: {
    fontSize: 16,
    color: theme.colors.text,
    minHeight: 160,
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  aiTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  aiToggle: {
    fontSize: 24,
    color: theme.colors.primary,
  },
  aiCard: {
    marginBottom: theme.spacing.lg,
  },
  aiButtonsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
  },
  aiButtonPrimary: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  aiButtonSecondary: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.border,
  },
  aiButtonWide: {
    flex: 1,
    justifyContent: 'center',
  },
  aiButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  aiHint: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    marginTop: theme.spacing.md,
    lineHeight: 18,
  },
  saveButton: {
    marginBottom: theme.spacing.lg,
  },
  entryPreview: {
    marginBottom: theme.spacing.md,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  entryDate: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  entryMoodLabel: {
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
  entryMoodDisplay: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryMood: {
    fontSize: 20,
  },
  entryText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});
