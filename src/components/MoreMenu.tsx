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
  // Keep component rendered while animating out
  const [showComponent, setShowComponent] = useState(visible);
  // Start position: pushed down by 300 units (off-screen/behind tab bar)
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      setShowComponent(true);
      // Slide Up Animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300, // 300ms for smooth entry
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)), // Slight bounce effect for "springy" feel
      }).start();
    } else {
      // Slide Down Animation
      Animated.timing(slideAnim, {
        toValue: 300, // Push back down
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }).start(() => {
        setShowComponent(false); // Unmount after animation finishes
      });
    }
  }, [visible]);

  if (!showComponent) return null;

  const menuItems = [
    { 
      id: 'habits', 
      label: 'Habits', 
      icon: Target, 
      color: '#10B981', // Green
      screen: 'Habits' 
    },
    { 
      id: 'wellness', 
      label: 'Wellness', 
      icon: Brain, 
      color: '#8B5CF6', // Purple
      screen: 'Wellness' 
    },
    { 
      id: 'reflection', 
      label: 'Reflection', 
      icon: Heart, 
      color: '#EC4899', // Pink
      screen: 'Reflection' 
    },
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
                  // Don't close immediately here if you want navigation to happen first, 
                  // but usually closing the menu is desired.
                  // The parent handles state, so this will trigger the 'visible=false' effect above.
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
    bottom: 80, // Positioned just above the tab bar
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
    backgroundColor: '#1A1A24',
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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