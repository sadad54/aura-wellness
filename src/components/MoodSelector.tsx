import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export interface Mood {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

interface MoodSelectorProps {
  moods: Mood[];
  selectedMood: string | null;
  onSelectMood: (moodId: string) => void;
  gridColumns?: number;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  moods,
  selectedMood,
  onSelectMood,
  gridColumns = 4,
}) => {
  const columnWidth = 100 / gridColumns;

  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood.id}
          style={[
            styles.moodButton,
            { width: `${columnWidth}%` },
            selectedMood === mood.id && {
              backgroundColor: `${mood.color}30`,
              borderColor: mood.color,
            },
          ]}
          onPress={() => onSelectMood(mood.id)}
          activeOpacity={0.6}
        >
          <Text style={styles.emoji}>{mood.emoji}</Text>
          <Text style={styles.label}>{mood.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  moodButton: {
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    padding: theme.spacing.sm,
  },
  emoji: {
    fontSize: 28,
    marginBottom: theme.spacing.xs,
  },
  label: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
