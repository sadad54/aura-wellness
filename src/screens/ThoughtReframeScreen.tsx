import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Brain, ArrowRight, Check, X, Sparkles } from 'lucide-react-native';
import { theme } from '../theme';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { useWellness } from '../context/WellnessContext';


export const ThoughtReframeScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [thought, setThought] = useState('');
  const [distortion, setDistortion] = useState('');
  const [reframe, setReframe] = useState('');
const { getAIReframe } = useWellness(); // You'll add this to context
  const [isLoading, setIsLoading] = useState(false);
  const distortions = ['All-or-Nothing', 'Catastrophizing', 'Mind Reading', 'Filtering', 'Labeling'];
const handleAIAssist = async () => {
    if (!thought) return;
    setIsLoading(true);
    const result = await getAIReframe(thought);
    if (result) {
      setDistortion(result.distortion);
      setReframe(result.reframe); // Auto-fill the difficult part!
      setStep(3); // Skip to the solution
    }
    setIsLoading(false);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <Text style={styles.stepTitle}>What is the negative thought?</Text>
            <GlassCard style={styles.inputCard}>
              <TextInput 
                style={styles.input} 
                multiline 
                placeholder="I messed up the presentation, I'm a failure..." 
                placeholderTextColor={theme.colors.textTertiary}
                value={thought}
                onChangeText={setThought}
              />
            </GlassCard>
<View style={styles.aiRow}>
        <TouchableOpacity 
          style={styles.aiButton} 
          onPress={handleAIAssist}
          disabled={!thought || isLoading}
        >
          <Sparkles size={16} color="#FFF" />
          <Text style={styles.aiButtonText}>
            {isLoading ? "Thinking..." : "AI: Help me reframe this"}
          </Text>
        </TouchableOpacity>
      </View>

            <AnimatedButton onPress={() => setStep(2)} disabled={!thought}>Next</AnimatedButton>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.stepTitle}>Identify the distortion</Text>
            <Text style={styles.stepSub}>How is your mind tricking you?</Text>
            <View style={styles.chipContainer}>
              {distortions.map(d => (
                <TouchableOpacity key={d} onPress={() => setDistortion(d)} style={[styles.chip, distortion === d && styles.activeChip]}>
                  <Text style={[styles.chipText, distortion === d && { color: '#FFF' }]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <AnimatedButton onPress={() => setStep(3)} disabled={!distortion}>Next</AnimatedButton>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.stepTitle}>Reframe it</Text>
            <Text style={styles.stepSub}>What is a more balanced, realistic perspective?</Text>
            <GlassCard style={styles.inputCard}>
              <TextInput 
                style={styles.input} 
                multiline 
                placeholder="I made a mistake, but I can learn from it. I'm human." 
                placeholderTextColor={theme.colors.textTertiary}
                value={reframe}
                onChangeText={setReframe}
              />
            </GlassCard>
            <AnimatedButton onPress={() => setStep(4)} disabled={!reframe}>Complete</AnimatedButton>
          </>
        );
      case 4:
        return (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <View style={styles.successIcon}>
              <Check size={40} color="#FFF" />
            </View>
            <Text style={styles.successTitle}>Thought Reframed!</Text>
            <Text style={styles.successText}>You've successfully challenged a negative pattern.</Text>
            <AnimatedButton onPress={onClose} style={{ width: '100%', marginTop: 40 }}>Done</AnimatedButton>
          </View>
        );
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}><X size={24} color={theme.colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>CBT Reframe</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {renderStep()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingTop: Platform.OS === 'ios' ? 50 : 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: theme.colors.text },
  content: { padding: 20 },
  stepTitle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 10 },
  stepSub: { fontSize: 16, color: theme.colors.textSecondary, marginBottom: 20 },
  inputCard: { minHeight: 150, padding: 16, marginBottom: 20 },
  input: { color: theme.colors.text, fontSize: 16, lineHeight: 24, height: '100%', textAlignVertical: 'top' },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 40 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border },
  activeChip: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  chipText: { color: theme.colors.textSecondary, fontWeight: '600' },
  successIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: theme.colors.success, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 10 },
  successText: { fontSize: 16, color: theme.colors.textSecondary, textAlign: 'center' },
  aiRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 },
  aiButton: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: theme.colors.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  aiButtonText: { color: '#FFF', fontSize: 12, fontWeight: '600' }
});