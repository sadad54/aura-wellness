import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  gradient?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, style, gradient = false }) => (
  <View style={[styles.glassCard, gradient && styles.gradientBorder, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  glassCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  gradientBorder: {
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
});