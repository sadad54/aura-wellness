import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Check } from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { theme } from '../theme';

export const JournalScreen: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState<string | null>(null);

  const moods = [
    { id: 'great', emoji: '😄', color: '#10B981' },
    { id: 'good', emoji: '😊', color: '#06B6D4' },
    { id: 'okay', emoji: '😐', color: '#F59E0B' },
    { id: 'bad', emoji: '😔', color: '#EF4444' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Journal</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>How are you feeling?</Text>
      <View style={styles.moodSelector}>
        {moods.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[
              styles.moodButton,
              mood === m.id && { 
                backgroundColor: `${m.color}30`, 
                borderColor: m.color 
              },
            ]}
            onPress={() => setMood(m.id)}
          >
            <Text style={styles.moodButtonEmoji}>{m.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

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

      <TouchableOpacity style={styles.saveButton}>
        <Check size={20} color="#FFFFFF" />
        <Text style={styles.saveButtonText}>Save Entry</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Recent Entries</Text>
      {[1, 2, 3].map((i) => (
        <TouchableOpacity key={i}>
          <GlassCard style={styles.entryPreview}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryDate}>Dec {i}, 2024</Text>
              <Text style={styles.entryMood}>😊</Text>
            </View>
            <Text style={styles.entryText} numberOfLines={2}>
              Had a wonderful day focusing on my wellness journey...
            </Text>
          </GlassCard>
        </TouchableOpacity>
      ))}
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
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  moodSelector: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  moodButton: {
    width: 64,
    height: 64,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodButtonEmoji: {
    fontSize: 32,
  },
  inputCard: {
    minHeight: 200,
    marginBottom: theme.spacing.lg,
  },
  input: {
    fontSize: 16,
    color: theme.colors.text,
    minHeight: 180,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  saveButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  entryMood: {
    fontSize: 24,
  },
  entryText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});