import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet, StatusBar } from 'react-native';
import { Sparkles, Heart } from 'lucide-react-native';
import { FloatingParticles } from '../components/FloatingParticles';
import { theme } from '../theme';

interface OnboardingScreenProps {
  onComplete: (data: { name: string; mood: string }) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [step]);

  const moods = [
    { id: 'calm', emoji: '😌', label: 'Calm', color: '#06B6D4' },
    { id: 'energized', emoji: '⚡', label: 'Energized', color: '#F59E0B' },
    { id: 'focused', emoji: '🎯', label: 'Focused', color: '#8B5CF6' },
    { id: 'peaceful', emoji: '🕊️', label: 'Peaceful', color: '#10B981' },
    { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#EF4444' },
    { id: 'happy', emoji: '😊', label: 'Happy', color: '#EC4899' },
    { id: 'tired', emoji: '😴', label: 'Tired', color: '#64748B' },
    { id: 'neutral', emoji: '😐', label: 'Neutral', color: '#94A3B8' },
  ];

  const handleContinue = () => {
    if (step === 0 && name) {
      setStep(1);
    } else if (step === 1 && selectedMood) {
      onComplete({ name, mood: selectedMood });
    }
  };

  return (
    <View style={styles.container}>
      <FloatingParticles />
      <StatusBar barStyle="light-content" />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {step === 0 ? (
          <>
            <Sparkles size={60} color="#7C3AED" style={{ marginBottom: 24 }} />
            <Text style={styles.title}>Welcome to AURA</Text>
            <Text style={styles.subtitle}>
              Your personalized sanctuary for mindfulness and emotional well-being
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>What's your name?</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor={theme.colors.textTertiary}
                value={name}
                onChangeText={setName}
                autoFocus
              />
            </View>
          </>
        ) : (
          <>
            <Heart size={60} color="#EC4899" style={{ marginBottom: 24 }} />
            <Text style={styles.title}>How are you feeling?</Text>
            <Text style={styles.subtitle}>
              Select your current mood to personalize your experience
            </Text>
            
            <View style={styles.moodGrid}>
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood.id}
                  style={[
                    styles.moodCard,
                    selectedMood === mood.id && {
                      borderColor: mood.color,
                      borderWidth: 2,
                      backgroundColor: `${mood.color}20`,
                    },
                  ]}
                  onPress={() => setSelectedMood(mood.id)}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <TouchableOpacity
          style={[
            styles.continueButton,
            (step === 0 && !name) || (step === 1 && !selectedMood)
              ? styles.continueButtonDisabled
              : null,
          ]}
          onPress={handleContinue}
          disabled={(step === 0 && !name) || (step === 1 && !selectedMood)}
        >
          <Text style={styles.continueButtonText}>
            {step === 0 ? 'Continue' : 'Start Your Journey'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  inputContainer: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  inputLabel: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  moodCard: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  moodLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  continueButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl * 2,
    borderRadius: theme.borderRadius.xl,
    width: '100%',
  },
  continueButtonDisabled: {
    opacity: 0.4,
  },
  continueButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});