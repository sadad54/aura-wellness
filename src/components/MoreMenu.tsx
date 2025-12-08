import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { X, Target, Brain, Heart } from 'lucide-react-native';
import { GlassCard } from './GlassCard';
import { theme } from '../theme';

interface MoreMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

const { height } = Dimensions.get('window');

export const MoreMenu: React.FC<MoreMenuProps> = ({ visible, onClose, onNavigate }) => {
  const [showComponent, setShowComponent] = useState(visible);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      setShowComponent(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }).start(() => {
        setShowComponent(false);
      });
    }
  }, [visible]);

  if (!showComponent) return null;

  const menuItems = [
    { id: 'habits', label: 'Habits', icon: Target, color: '#10B981', screen: 'Habits' },
    { id: 'wellness', label: 'Wellness', icon: Brain, color: '#8B5CF6', screen: 'Wellness' },
    { id: 'reflection', label: 'Reflection', icon: Heart, color: '#EC4899', screen: 'Reflection' },
  ];

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Animated.View 
        style={[
          styles.animatedContainer, 
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <GlassCard style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>More Features</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => {
                  onNavigate(item.screen);
                  onClose(); 
                }}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                  <item.icon size={28} color="#FFFFFF" />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 90, // Raised slightly to sit above the floating tab bar
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    paddingHorizontal: theme.spacing.md,
  },
  animatedContainer: {
    width: '100%',
  },
  container: {
    width: '100%',
    // Transparent dark background
    backgroundColor: 'rgba(20, 20, 30, 0.85)', 
    padding: theme.spacing.lg,
    borderWidth: 1,
    // Purple Border
    borderColor: theme.colors.primary, 
    // Purple Glow Effect (iOS)
    shadowColor: theme.colors.primary, 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    // Elevation for Android
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  closeButton: {
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  menuLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
});