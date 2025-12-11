import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Dimensions, Animated } from 'react-native';
import { User, Sparkles, Wind, Brain, Flame, Moon, ArrowRight, Zap, TrendingUp, Clock, Activity, AlertCircle, MessageCircle, Heart } from 'lucide-react-native';
import { FloatingParticles } from '../components/FloatingParticles';
import { GlassCard } from '../components/GlassCard';
import { MoodOrb } from '../components/MoodOrb';
import { theme } from '../theme';
import { useWellness } from '../context/WellnessContext';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface QuickActionConfig {
  id: string;
  label: string;
  emoji: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  tool: string;
  tab: string;
  priority: 'critical' | 'high' | 'routine';
  contextTrigger?: string; // time-based, mood-based, pattern-based
  duration?: string;
  benefit?: string;
}

interface HomeScreenEnhancedProps {
  userData?: { name?: string };
  onNavigate: (tab: string) => void;
}

export const HomeScreenEnhanced: React.FC<HomeScreenEnhancedProps> = ({ userData, onNavigate }) => {
const { insight, wellnessScore } = useWellness();
  const [greeting, setGreeting] = useState('');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [focusedAction, setFocusedAction] = useState<string | null>(null);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
      setTimeOfDay('morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
      setTimeOfDay('afternoon');
    } else {
      setGreeting('Good Evening');
      setTimeOfDay('evening');
    }
  }, []);

  // CORE DIFFERENTIATOR: Context-aware, intent-driven quick actions
  // Instead of generic buttons, these are situation-specific interventions
  // CORE DIFFERENTIATOR: Context-aware, intent-driven quick actions
  // Instead of generic buttons, these are situation-specific interventions
  const getContextualActions = (): QuickActionConfig[] => {
    const baseActions: QuickActionConfig[] = [
      {
        id: 'panicsos',
        label: 'Panic SOS',
        emoji: '🆘',
        description: 'Immediate grounding',
        icon: AlertCircle,
        color: '#EF4444',
        tool: 'Grounding',
        tab: 'Wellness',
        priority: 'critical',
        duration: '5 min',
        benefit: 'Instant anxiety relief',
      },
      {
        id: 'energize',
        emoji: '⚡',
        label: 'Energy Boost',
        description: 'Quick activation',
        icon: Zap,
        color: '#F59E0B',
        tool: 'breath',
        tab: 'Wellness',
        priority: 'high',
        duration: '3 min',
        benefit: '+40% alertness',
      },
      {
        id: 'focus',
        emoji: '🎯',
        label: 'Deep Focus',
        description: 'Sharpen concentration',
        icon: Brain,
        color: '#8B5CF6',
        tool: 'cbt',
        tab: 'Wellness',
        priority: 'routine',
        duration: '10 min',
        benefit: 'Flow state ready',
      },
      {
        id: 'quickjournal',
        emoji: '📝',
        label: 'Brain Dump',
        description: '60-second clarity',
        icon: Activity,
        color: '#EC4899',
        tool: 'journal',
        tab: 'Journal',
        priority: 'routine',
        duration: '1 min',
        benefit: 'Mental reset',
      },
      {
        id: 'reframe',
        emoji: '🔄',
        label: 'Reframe Now',
        description: 'Flip that thought',
        icon: Brain,
        color: '#06B6D4',
        tool: 'cbt',
        tab: 'Wellness',
        priority: 'high',
        duration: '5 min',
        benefit: 'Perspective shift',
      },
      {
        id: 'emotionwheel',
        emoji: '❤️',
        label: 'Name It',
        description: 'Emotion wheel',
        icon: Heart,
        color: '#EC4899',
        tool: 'emotion',
        tab: 'Wellness',
        priority: 'routine',
        duration: '3 min',
        benefit: 'Emotional clarity',
      },
      {
        id: 'affirmation',
        emoji: '✨',
        label: 'Affirm Self',
        description: 'Daily power words',
        icon: Sparkles,
        color: '#F59E0B',
        tool: 'affirm',
        tab: 'Wellness',
        priority: 'routine',
        duration: '2 min',
        benefit: 'Confidence boost',
      },
      {
        id: 'innerchild',
        emoji: '🕊️',
        label: 'Inner Child',
        description: 'Healing dialogue',
        icon: MessageCircle,
        color: '#10B981',
        tool: 'inner',
        tab: 'Wellness',
        priority: 'routine',
        duration: '8 min',
        benefit: 'Self-compassion',
      },
    ];

    // TIME-BASED OPTIMIZATION (App Store Differentiator #1)
    if (timeOfDay === 'morning') {
      return [baseActions[1], baseActions[2], baseActions[3], baseActions[6], baseActions[0], baseActions[4], baseActions[5], baseActions[7]]; // All in morning order
    } else if (timeOfDay === 'afternoon') {
      return [baseActions[0], baseActions[4], baseActions[1], baseActions[2], baseActions[3], baseActions[5], baseActions[6], baseActions[7]]; // SOS first
    } else {
      return [baseActions[0], baseActions[4], baseActions[7], baseActions[3], baseActions[6], baseActions[5], baseActions[1], baseActions[2]]; // Calm focus
    }
  };

  const contextualActions = getContextualActions();

  // CRITICAL-PRIORITY ACTION (Always Visible - App Differentiator #2)
  const criticalAction = contextualActions.find(a => a.priority === 'critical');

  const handleQuickAction = (action: QuickActionConfig) => {
    // Haptic feedback for immediate action feel
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Pulse animation
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigation with context
    setActiveTool(action.tool);
    onNavigate(action.tab);
    setFocusedAction(action.id);
  };
  // SMART RECOMMENDATION BASED ON WELLNESS DATA (App Differentiator #3)
  const getSmartRecommendation = () => {
    const hour = new Date().getHours();
    const wellnessScore = data.wellnessScore;
    const recentMoods = data.moodHistory.slice(-3);

    // If stress pattern detected
    if (wellnessScore < 60) {
      return {
        title: '🆘 Crisis Mode',
        subtitle: 'Your score dropped. Let\'s ground you.',
        actionId: 'panicsos',
      };
    }

    // If low energy morning
    if (hour >= 6 && hour < 9 && wellnessScore < 70) {
      return {
        title: '⚡ Wake-Up Protocol',
        subtitle: 'Energize your morning start',
        actionId: 'energize',
      };
    }

    // Post-lunch afternoon slump
    if (hour >= 14 && hour < 16) {
      return {
        title: '🎯 Afternoon Reset',
        subtitle: 'Regain focus for final push',
        actionId: 'focus',
      };
    }

    // Default evening wind-down
    if (hour >= 20) {
      return {
        title: '🌙 Evening Reflection',
        subtitle: 'Journal before bed',
        actionId: 'quickjournal',
      };
    }

    return {
      title: '✨ Daily Check-in',
      subtitle: 'How are you feeling right now?',
      actionId: 'quickjournal',
    };
  };

  const recommendation = getSmartRecommendation();
  const recommendedAction = contextualActions.find(a => a.id === recommendation.actionId);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FloatingParticles />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting},</Text>
          <Text style={styles.userName}>{userData?.name || 'Friend'}</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn} onPress={() => onNavigate('Profile')}>
          <User size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* MOOD ORB - Visual State Indicator */}
      <View style={styles.orbContainer}>
        <MoodOrb mood="calm" size={140} />
        <View style={styles.orbTextContainer}>
          <Text style={styles.orbLabel}>Current Vibe</Text>
          <Text style={styles.orbValue}>Calm & Focused</Text>
          <TouchableOpacity 
            style={styles.checkInButton}
            onPress={() => onNavigate('Journal')}
          >
            <Text style={styles.checkInText}>Quick Check-in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ========== PRIMARY CTA: CRITICAL ACTION ========== */}
      {criticalAction && (
        <Animated.View style={[styles.criticalActionWrapper, { transform: [{ scale: pulseAnim }] }]}>
          <TouchableOpacity
            style={styles.criticalActionContainer}
            onPress={() => handleQuickAction(criticalAction)}
            activeOpacity={0.8}
          >
            <LinearGradient 
              colors={['#EF4444', '#DC2626']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.criticalGradient}
            >
              <View style={styles.criticalContent}>
                <View style={styles.criticalIcon}>
                  <Text style={styles.iconEmoji}>{criticalAction.emoji}</Text>
                </View>
                <View style={styles.criticalTextGroup}>
                  <Text style={styles.criticalLabel}>IMMEDIATE HELP</Text>
                  <Text style={styles.criticalTitle}>{criticalAction.label}</Text>
                  <Text style={styles.criticalSubtitle}>{criticalAction.description}</Text>
                </View>
                <ArrowRight size={24} color="#FFFFFF" />
              </View>
              <View style={styles.criticalBadge}>
                <Text style={styles.badgeText}>{criticalAction.duration}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* ========== SMART RECOMMENDATION CARD ========== */}
      {recommendedAction && (
        <GlassCard style={styles.recommendationCard} gradient>
          <View style={styles.recommendationHeader}>
            <Sparkles size={20} color={theme.colors.warning} />
            <Text style={styles.recommendationLabel}>Recommended for You</Text>
          </View>
          <TouchableOpacity
            style={styles.recommendationContent}
            onPress={() => handleQuickAction(recommendedAction)}
            activeOpacity={0.7}
          >
            <View style={styles.recIcon}>
              <Text style={styles.recEmoji}>{recommendedAction.emoji}</Text>
            </View>
            <View style={styles.recTextGroup}>
              <Text style={styles.recTitle}>{recommendation.title}</Text>
              <Text style={styles.recSubtitle}>{recommendation.subtitle}</Text>
              <View style={styles.recMeta}>
                <Clock size={12} color={theme.colors.textTertiary} />
                <Text style={styles.recTime}>{recommendedAction.duration}</Text>
                <Text style={styles.recBenefit}>• {recommendedAction.benefit}</Text>
              </View>
            </View>
            <ArrowRight size={20} color={recommendedAction.color} />
          </TouchableOpacity>
        </GlassCard>
      )}

     {/* ========== CONTEXTUAL QUICK ACTIONS - INTELLIGENT GRID ========== */}
      <Text style={styles.quickActionsTitle}>Quick Actions</Text>
      
      {/* STICKY ACTION BAR - Most Used/Urgent 2 Actions (Always Visible) */}
      <View style={styles.stickyActionBar}>
        {contextualActions
          .filter(action => action.priority !== 'critical')
          .slice(0, 2)
          .map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.stickyActionButton}
              onPress={() => handleQuickAction(action)}
              activeOpacity={0.6}
            >
              <View style={[styles.stickyIcon, { backgroundColor: `${action.color}20` }]}>
                <Text style={styles.stickyEmoji}>{action.emoji}</Text>
              </View>
              <View style={styles.stickyTextGroup}>
                <Text style={styles.stickyLabel}>{action.label}</Text>
                <Text style={styles.stickyTime}>{action.duration}</Text>
              </View>
              <ArrowRight size={16} color={action.color} />
            </TouchableOpacity>
          ))}
      </View>

      {/* EXPANDABLE GRID - Remaining 6 Actions in 3x2 Grid */}
      <View style={styles.actionGridContainer}>
        {contextualActions
          .filter(action => action.priority !== 'critical')
          .slice(2, 8)
          .map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.gridActionCard}
              onPress={() => handleQuickAction(action)}
              activeOpacity={0.65}
            >
              <GlassCard
                style={[
                  styles.gridActionGlass,
                  {
                    borderColor:
                      focusedAction === action.id
                        ? action.color
                        : theme.colors.border,
                  },
                ]}
              >
                {/* Top Section - Icon */}
                <View
                  style={[
                    styles.gridIconContainer,
                    { backgroundColor: `${action.color}15` },
                  ]}
                >
                  <Text style={styles.gridEmoji}>{action.emoji}</Text>
                </View>

                {/* Middle Section - Label & Description */}
                <View style={styles.gridTextGroup}>
                  <Text style={styles.gridLabel}>{action.label}</Text>
                  <Text style={styles.gridDescription}>{action.description}</Text>
                </View>

                {/* Bottom Section - Benefit & Duration */}
                <View style={styles.gridMeta}>
                  <Text style={styles.gridDuration}>{action.duration}</Text>
                  <View
                    style={[
                      styles.benefitBadge,
                      { backgroundColor: `${action.color}20` },
                    ]}
                  >
                    <Text style={[styles.benefitText, { color: action.color }]}>
                      {action.benefit}
                    </Text>
                  </View>
                </View>
              </GlassCard>
            </TouchableOpacity>
          ))}
      </View>
      {/* ========== WELLNESS INSIGHTS (Differentiator #4) ========== */}
      <GlassCard style={styles.insightCard} gradient>
        <View style={styles.insightHeader}>
          <TrendingUp size={20} color={theme.colors.success} />
          <Text style={styles.insightLabel}>Your Pattern</Text>
        </View>
        <Text style={styles.insightText}>
        "{insight}"</Text>
      </GlassCard>

      {/* ========== STREAK/PROGRESS INDICATOR ========== */}
      <View style={styles.progressSection}>
        <View style={styles.streakCard}>
          <Flame size={20} color="#F59E0B" />
          <View>
            <Text style={styles.streakValue}>{data.streak} day</Text>
            <Text style={styles.streakLabel}>Streak</Text>
          </View>
        </View>
        <View style={styles.sessionsCard}>
          <Activity size={20} color={theme.colors.accent} />
          <View>
            <Text style={styles.sessionsValue}>{data.totalSessions}</Text>
            <Text style={styles.sessionsLabel}>Sessions</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

// IMPORT THIS at the top of the file
// import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  // ORB SECTION
  orbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 24,
  },
  orbTextContainer: {
    justifyContent: 'center',
  },
  orbLabel: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  orbValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 12,
  },
  checkInButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignSelf: 'flex-start',
  },
  checkInText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },

  // CRITICAL ACTION (PRIMARY CTA)
  criticalActionWrapper: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  criticalActionContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  criticalGradient: {
    padding: 20,
    borderRadius: 20,
    position: 'relative',
  },
  criticalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  criticalIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEmoji: {
    fontSize: 28,
  },
  criticalTextGroup: {
    flex: 1,
  },
  criticalLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  criticalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  criticalSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  criticalBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // RECOMMENDATION CARD
  recommendationCard: {
    marginHorizontal: 24,
    marginBottom: 28,
    padding: 20,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  recommendationLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.warning,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  recommendationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recEmoji: {
    fontSize: 24,
  },
  recTextGroup: {
    flex: 1,
  },
  recTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
  },
  recSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  recMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recTime: {
    fontSize: 11,
    color: theme.colors.textTertiary,
    fontWeight: '600',
  },
  recBenefit: {
    fontSize: 11,
    color: theme.colors.textTertiary,
  },

  // QUICK ACTIONS GRID
// ========== QUICK ACTIONS - NEW INTELLIGENT LAYOUT ==========

  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    paddingHorizontal: 24,
    marginBottom: 16,
  },

  // STICKY ACTION BAR (Top 2 - Always Visible, High Priority)
  stickyActionBar: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 20,
  },
  stickyActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 12,
  },
  stickyIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyEmoji: {
    fontSize: 18,
  },
  stickyTextGroup: {
    flex: 1,
  },
  stickyLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
  },
  stickyTime: {
    fontSize: 11,
    color: theme.colors.textTertiary,
    marginTop: 2,
  },

  // GRID LAYOUT (Remaining 6 Actions in 3x2)
  actionGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  gridActionCard: {
    width: '48%',
    height: 160,
  },
  gridActionGlass: {
    padding: 14,
    borderWidth: 1.5,
    justifyContent: 'space-between',
    height: '100%',
  },
  gridIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridEmoji: {
    fontSize: 18,
  },
  gridTextGroup: {
    flex: 1,
    justifyContent: 'center',
  },
  gridLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
  },
  gridDescription: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    lineHeight: 14,
  },
  gridMeta: {
    gap: 6,
  },
  gridDuration: {
    fontSize: 10,
    color: theme.colors.textTertiary,
    fontWeight: '600',
  },
  benefitBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  benefitText: {
    fontSize: 10,
    fontWeight: '700',
  },

  // ========== END QUICK ACTIONS ==========
  // INSIGHTS & PROGRESS
  insightCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  insightLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.success,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  insightText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },

  progressSection: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
  },
  streakCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  streakValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  streakLabel: {
    fontSize: 11,
    color: theme.colors.textTertiary,
    marginTop: 2,
  },
  sessionsCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sessionsValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  sessionsLabel: {
    fontSize: 11,
    color: theme.colors.textTertiary,
    marginTop: 2,
  },
});