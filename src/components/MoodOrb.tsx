import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface MoodOrbProps {
  mood: 'calm' | 'energized' | 'focused' | 'peaceful';
  size?: number;
}

export const MoodOrb: React.FC<MoodOrbProps> = ({ mood, size = 120 }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const moodColors = {
    calm: ['#06B6D4', '#3B82F6'],
    energized: ['#F59E0B', '#EF4444'],
    focused: ['#8B5CF6', '#7C3AED'],
    peaceful: ['#10B981', '#06B6D4'],
  };

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: moodColors[mood]?.[0] || '#7C3AED',
        transform: [{ scale: pulseAnim }],
        shadowColor: moodColors[mood]?.[0] || '#7C3AED',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 30,
        elevation: 10,
      }}
    />
  );
};