import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, GestureResponderEvent } from 'react-native';
import { theme } from '../theme';
import type { LucideIcon } from 'lucide-react-native';

interface AnimatedButtonProps {
  variant?: 'primary' | 'ghost' | 'floating';
  gradient?: [string, string];
  icon?: LucideIcon;
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: any;
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  gradient = ['#7C3AED', '#EC4899'],
  icon: Icon,
  onPress,
  children,
  style,
  disabled = false,
}) => {
  const getStylesByVariant = () => {
    switch (variant) {
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: theme.colors.border,
        };
      case 'floating':
        return {
          backgroundColor: gradient[0],
          shadowColor: gradient[0],
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 12,
        };
      case 'primary':
      default:
        return {
          backgroundColor: gradient[0],
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getStylesByVariant(),
        disabled && { opacity: 0.5 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {Icon && <Icon size={18} color="#FFFFFF" />}
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
