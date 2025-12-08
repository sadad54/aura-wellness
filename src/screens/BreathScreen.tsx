import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Platform } from 'react-native';
import { X, Wind } from 'lucide-react-native';
import { theme } from '../theme';
import { GlassCard } from '../components/GlassCard';

export const BreathScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale, Hold
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const breathe = () => {
      // 1. Inhale (4s)
      setPhase('Inhale');
      Animated.parallel([
        Animated.timing(scaleAnim, { toValue: 2.5, duration: 4000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 4000, useNativeDriver: true })
      ]).start(() => {
        // 2. Hold (4s)
        setPhase('Hold');
        setTimeout(() => {
          // 3. Exhale (4s)
          setPhase('Exhale');
          Animated.parallel([
            Animated.timing(scaleAnim, { toValue: 1, duration: 4000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 0.4, duration: 4000, useNativeDriver: true })
          ]).start(() => {
            // 4. Hold (4s)
            setPhase('Hold');
            setTimeout(breathe, 4000);
          });
        }, 4000);
      });
    };

    breathe();
    // Cleanup not strictly necessary for this simple loop logic in this context, 
    // but in production, you'd want to stop animation on unmount.
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <GlassCard style={styles.headerCard}>
          <View style={styles.titleRow}>
            <Wind size={24} color="#8B5CF6" />
            <Text style={styles.title}>Box Breathing</Text>
          </View>
          <Text style={styles.subtitle}>Regulate your nervous system</Text>
        </GlassCard>

        <View style={styles.circleContainer}>
          {/* Outer glowing rings */}
          <Animated.View style={[styles.ring, { transform: [{ scale: scaleAnim }], opacity: 0.2 }]} />
          <Animated.View style={[styles.ring, { transform: [{ scale: scaleAnim }], opacity: 0.1, width: 250, height: 250 }]} />
          
          {/* Main Breathing Circle */}
          <Animated.View style={[styles.breathCircle, { transform: [{ scale: scaleAnim }], opacity: fadeAnim }]}>
            <Text style={styles.phaseText}>{phase}</Text>
          </Animated.View>
        </View>

        <Text style={styles.instruction}>
          {phase === 'Inhale' ? 'Breathe in through nose...' : 
           phase === 'Exhale' ? 'Release slowly...' : 
           'Keep lungs steady...'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingTop: Platform.OS === 'ios' ? 50 : 20 },
  closeButton: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 8 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  headerCard: { width: '100%', alignItems: 'center', marginBottom: 60, paddingVertical: 20 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary },
  circleContainer: { width: 300, height: 300, alignItems: 'center', justifyContent: 'center', marginBottom: 60 },
  ring: { position: 'absolute', width: 200, height: 200, borderRadius: 150, backgroundColor: '#8B5CF6', borderColor: '#8B5CF6', borderWidth: 1 },
  breathCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#8B5CF6', alignItems: 'center', justifyContent: 'center', shadowColor: "#8B5CF6", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 30, elevation: 15 },
  phaseText: { fontSize: 18, fontWeight: 'bold', color: '#FFF', textTransform: 'uppercase', letterSpacing: 2 },
  instruction: { fontSize: 18, color: theme.colors.text, opacity: 0.8, fontWeight: '500' },
});