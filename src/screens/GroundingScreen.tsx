import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Eye, Hand, Ear, Coffee, Smile, ChevronRight, X } from 'lucide-react-native';
import { theme } from '../theme';
import { AnimatedButton } from '../components/AnimatedButton';

interface GroundingScreenProps {
  onClose: () => void;
}

export const GroundingScreen: React.FC<GroundingScreenProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  
  const steps = [
    { count: 5, label: 'things you can see', icon: Eye, color: '#06B6D4' },
    { count: 4, label: 'things you can touch', icon: Hand, color: '#10B981' },
    { count: 3, label: 'things you can hear', icon: Ear, color: '#F59E0B' },
    { count: 2, label: 'things you can smell', icon: Coffee, color: '#EC4899' },
    { count: 1, label: 'thing you can taste', icon: Smile, color: '#8B5CF6' },
  ];

  const currentStep = steps[step];
  
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.progressText}>Step {step + 1} of 5</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>5-4-3-2-1 Grounding</Text>
        <Text style={styles.subtitle}>Focus on your senses to calm anxiety</Text>

        <View style={styles.iconWrapper}>
          <View style={[styles.iconCircle, { backgroundColor: `${currentStep.color}20` }]}>
            <currentStep.icon size={48} color={currentStep.color} />
          </View>
        </View>

        <Text style={styles.instruction}>
          Name <Text style={{ color: currentStep.color, fontWeight: 'bold' }}>{currentStep.count}</Text> {currentStep.label}
        </Text>

        {Array.from({ length: currentStep.count }).map((_, i) => (
          <TextInput
            key={i}
            style={styles.input}
            placeholder={`${i + 1}. Think of something...`}
            placeholderTextColor={theme.colors.textTertiary}
          />
        ))}

        <AnimatedButton
          variant="primary"
          gradient={[currentStep.color, theme.colors.primary]}
          onPress={handleNext}
          style={styles.button}        >
          {step === steps.length - 1 ? 'Complete' : 'Next'}
        </AnimatedButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingTop: Platform.OS === 'ios' ? 50 : 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  closeButton: { padding: 8 },
  progressText: { color: theme.colors.textSecondary, fontWeight: '600' },
  content: { paddingHorizontal: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 32 },
  iconWrapper: { alignItems: 'center', marginBottom: 24 },
  iconCircle: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  instruction: { fontSize: 20, color: theme.colors.text, textAlign: 'center', marginBottom: 24 },
  input: { backgroundColor: theme.colors.surface, borderRadius: 12, padding: 16, marginBottom: 12, color: theme.colors.text, borderWidth: 1, borderColor: theme.colors.border },
  button: { marginTop: 12 },
});