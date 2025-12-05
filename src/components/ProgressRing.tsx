import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  color?: string;
  label: string;
  value?: number | string;
  thickness?: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 80,
  color = theme.colors.primary,
  label,
  value,
  thickness = 4,
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedProgress]);

  const radius = size / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;

  // Convert progress to strokeDashoffset
  const progressInterpolation = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.contentWrapper}>
        {value !== undefined && (
          <Text style={[styles.value, { color }]}>{value}%</Text>
        )}
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Simplified circle indicator */}
      <View
        style={[
          styles.progressCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: thickness,
            borderColor: `${color}30`,
            borderTopColor: color,
            borderRightColor: color,
            opacity: progress / 100,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  label: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  progressCircle: {
    transform: [{ rotate: '-45deg' }],
  },
});
