// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
// import { User, Sparkles, Sun, Moon, Brain, Battery, Heart, Zap, Music, BookOpen, Wind, ChevronRight, TrendingUp } from 'lucide-react-native';
// import { FloatingParticles } from '../components/FloatingParticles';
// import { GlassCard } from '../components/GlassCard';
// import { MoodOrb } from '../components/MoodOrb';
// import { ProgressRing } from '../components/ProgressRing';
// import { AIInsightCard } from '../components/AIInsightCard';
// import { AnimatedButton } from '../components/AnimatedButton';
// import { theme } from '../theme';

// interface HomeScreenEnhancedProps {
//   userData?: { name?: string };
//   onNavigate?: (screen: string) => void;
// }

// export const HomeScreenEnhanced: React.FC<HomeScreenEnhancedProps> = ({ userData, onNavigate }) => {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [selectedMood, setSelectedMood] = useState<'calm' | 'energized' | 'focused' | 'peaceful'>('calm');

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 18) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const wellnessMetrics = [
//     { icon: Brain, label: 'Focus', value: 85, color: '#8B5CF6' },
//     { icon: Battery, label: 'Energy', value: 72, color: '#F59E0B' },
//     { icon: Heart, label: 'Calm', value: 91, color: '#06B6D4' },
//     { icon: Zap, label: 'Balance', value: 78, color: '#10B981' },
//   ];

//   const activities = [
//     { icon: Music, title: 'Ocean Waves', subtitle: '15 min session', color: '#06B6D4', screen: 'Sounds' },
//     { icon: BookOpen, title: 'Morning Journal', subtitle: 'Write your thoughts', color: '#EC4899', screen: 'Journal' },
//     { icon: Heart, title: 'Build Daily Habits', subtitle: 'Track your habits', color: '#8B5CF6', screen: 'Habits' },
//     { icon: Wind, title: 'Breathing Exercise', subtitle: '5 min practice', color: '#10B981', screen: 'Wellness' },
//   ];

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <FloatingParticles />

//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.greeting}>{getGreeting()}</Text>
//           <Text style={styles.userName}>{userData?.name || 'Guest'}</Text>
//         </View>
//         <TouchableOpacity style={styles.avatarContainer} onPress={() => onNavigate?.('Profile')}>
//           <User size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Mood Orb Section */}
//       <GlassCard style={styles.moodSection} gradient>
//         <View style={styles.moodContainer}>
//           <View style={styles.moodInfo}>
//             <Text style={styles.moodLabel}>Your Current Energy</Text>
//             <Text style={styles.moodValue}>Calm & Focused</Text>
//             <Text style={styles.moodDescription}>You're in a great state for deep work</Text>
//           </View>
//           <MoodOrb mood={selectedMood} size={100} />
//         </View>
//       </GlassCard>

//       {/* Enhanced Forecast */}
//       <GlassCard style={styles.forecastCard} gradient>
//         <View style={styles.forecastHeader}>
//           <Sparkles size={28} color={theme.colors.primary} />
//           <Text style={styles.forecastTitle}>AI Daily Briefing</Text>
//         </View>
//         <Text style={styles.forecastText}>
//           Today is perfect for deep work and creative exploration. Your energy peaks at 3 PM. Consider a mindful break around 2 PM.
//         </Text>
//         <View style={styles.forecastMetrics}>
//           <View style={styles.forecastMetric}>
//             <Sun size={20} color="#F59E0B" />
//             <Text style={styles.forecastMetricText}>Peak: 3 PM</Text>
//           </View>
//           <View style={styles.forecastMetric}>
//             <TrendingUp size={20} color={theme.colors.success} />
//             <Text style={styles.forecastMetricText}>↑ 12% today</Text>
//           </View>
//           <View style={styles.forecastMetric}>
//             <Moon size={20} color="#8B5CF6" />
//             <Text style={styles.forecastMetricText}>Rest: 10 PM</Text>
//           </View>
//         </View>
//       </GlassCard>

//       {/* Metrics Section - Enhanced */}
//       <Text style={styles.sectionTitle}>Wellness Metrics</Text>
//       <View style={styles.metricsGrid}>
//         {wellnessMetrics.map((metric, index) => (
//           <View key={index} style={styles.metricCard}>
//             <ProgressRing
//               progress={metric.value}
//               size={70}
//               color={metric.color}
//               label={metric.label}
//               value={metric.value}
//             />
//           </View>
//         ))}
//       </View>

//       {/* AI Insights */}
//       <Text style={styles.sectionTitle}>AI Insights</Text>
//       <AIInsightCard
//         title="Emotional Pattern"
//         insight="Your calmness peaks in the morning. Consider scheduling important decisions then."
//         trend="up"
//         trendValue="+8%"
//         gradient
//       />
//       <AIInsightCard
//         title="Sleep Quality"
//         insight="Last night was restful. Maintaining this routine will boost your focus by 15%."
//         trend="up"
//         trendValue="+3hrs"
//       />

//       {/* Activities Section */}
//       <Text style={styles.sectionTitle}>Recommended Activities</Text>
//       {activities.map((activity, index) => (
//         <TouchableOpacity key={index} onPress={() => onNavigate?.(activity.screen)}>
//           <GlassCard style={styles.activityCard}>
//             <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
//               <activity.icon size={24} color={activity.color} />
//             </View>
//             <View style={styles.activityContent}>
//               <Text style={styles.activityTitle}>{activity.title}</Text>
//               <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
//             </View>
//             <ChevronRight size={20} color={theme.colors.textTertiary} />
//           </GlassCard>
//         </TouchableOpacity>
//       ))}

//       {/* Quick Action Buttons */}
//       <View style={styles.quickActions}>
//         <AnimatedButton
//           variant="primary"
//           gradient={['#06B6D4', '#0EA5E9']}
//           icon={Music}
//           onPress={() => onNavigate?.('Sounds')}
//           style={styles.actionButton}
//         >
//           Meditate
//         </AnimatedButton>
//         <AnimatedButton
//           variant="ghost"
//           onPress={() => onNavigate?.('Journal')}
//           style={styles.actionButton}
//         >
//           Journal
//         </AnimatedButton>
//       </View>

//       {/* Daily Affirmation */}
//       <GlassCard style={styles.affirmationCard}>
//         <Text style={styles.affirmationLabel}>Today's Affirmation</Text>
//         <Text style={styles.affirmationText}>
//           "I am calm, capable, and ready to grow"
//         </Text>
//       </GlassCard>

//       <View style={styles.spacer} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//     paddingTop: Platform.OS === 'ios' ? 50 : 30,
//   },
//   spacer: {
//     height: 40,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: theme.spacing.lg,
//     marginBottom: theme.spacing.lg,
//   },
//   greeting: {
//     fontSize: 14,
//     color: theme.colors.textSecondary,
//     marginBottom: 4,
//   },
//   userName: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: theme.colors.text,
//   },
//   avatarContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: theme.colors.surface,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//   },
//   moodSection: {
//     marginHorizontal: theme.spacing.lg,
//   },
//   moodContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     gap: theme.spacing.lg,
//   },
//   moodInfo: {
//     flex: 1,
//   },
//   moodLabel: {
//     fontSize: 12,
//     color: theme.colors.textTertiary,
//     marginBottom: theme.spacing.xs,
//     textTransform: 'uppercase',
//   },
//   moodValue: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: theme.colors.text,
//     marginBottom: theme.spacing.xs,
//   },
//   moodDescription: {
//     fontSize: 13,
//     color: theme.colors.textSecondary,
//     lineHeight: 18,
//   },
//   forecastCard: {
//     marginHorizontal: theme.spacing.lg,
//     marginBottom: theme.spacing.lg,
//   },
//   forecastHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: theme.spacing.md,
//   },
//   forecastTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: theme.colors.text,
//     marginLeft: theme.spacing.sm,
//   },
//   forecastText: {
//     fontSize: 14,
//     color: theme.colors.textSecondary,
//     lineHeight: 20,
//     marginBottom: theme.spacing.md,
//   },
//   forecastMetrics: {
//     flexDirection: 'row',
//     gap: theme.spacing.lg,
//   },
//   forecastMetric: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: theme.spacing.xs,
//   },
//   forecastMetricText: {
//     fontSize: 12,
//     color: theme.colors.textSecondary,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: theme.colors.text,
//     paddingHorizontal: theme.spacing.lg,
//     marginTop: theme.spacing.lg,
//     marginBottom: theme.spacing.md,
//   },
//   metricsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: theme.spacing.lg,
//     gap: theme.spacing.md,
//     marginBottom: theme.spacing.lg,
//   },
//   metricCard: {
//     width: '47%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   activityCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: theme.spacing.lg,
//     marginBottom: theme.spacing.md,
//     padding: theme.spacing.md,
//   },
//   activityIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   activityContent: {
//     flex: 1,
//     marginLeft: theme.spacing.md,
//   },
//   activityTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: theme.colors.text,
//     marginBottom: 2,
//   },
//   activitySubtitle: {
//     fontSize: 13,
//     color: theme.colors.textSecondary,
//   },
//   quickActions: {
//     flexDirection: 'row',
//     gap: theme.spacing.md,
//     paddingHorizontal: theme.spacing.lg,
//     marginVertical: theme.spacing.lg,
//   },
//   actionButton: {
//     flex: 1,
//   },
//   affirmationCard: {
//     marginHorizontal: theme.spacing.lg,
//     marginBottom: theme.spacing.lg,
//     backgroundColor: 'rgba(167, 139, 250, 0.1)',
//     borderColor: 'rgba(167, 139, 250, 0.3)',
//   },
//   affirmationLabel: {
//     fontSize: 12,
//     color: '#C4B5FD',
//     marginBottom: theme.spacing.sm,
//     fontWeight: '600',
//   },
//   affirmationText: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     color: theme.colors.text,
//     lineHeight: 22,
//   },
// });
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, ImageBackground } from 'react-native';
import { User, Sparkles, Wind, Brain, Flame, Moon, ArrowRight, Zap } from 'lucide-react-native';
import { FloatingParticles } from '../components/FloatingParticles';
import { GlassCard } from '../components/GlassCard';
import { MoodOrb } from '../components/MoodOrb';
import { theme } from '../theme';
import { useWellness } from '../context/WellnessContext'; // Ensure this is imported

interface HomeScreenEnhancedProps {
  userData?: { name?: string };
  onNavigate: (tab: string) => void;
}

export const HomeScreenEnhanced: React.FC<HomeScreenEnhancedProps> = ({ userData, onNavigate }) => {
  const { setActiveTool } = useWellness(); // Use context to control deep links
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Smart Recommendations based on time/mood (Mock logic)
  const getSmartRecommendation = () => {
    const hour = new Date().getHours();
    if (hour >= 20 || hour < 6) {
      return {
        title: 'Wind Down',
        subtitle: 'Prepare for sleep',
        icon: Moon,
        color: '#8B5CF6',
        action: () => onNavigate('Sounds'), // Navigate to Sounds tab
      };
    }
    return {
      title: 'Daily Focus',
      subtitle: 'Box Breathing',
      icon: Wind,
      color: '#06B6D4',
      action: () => {
        setActiveTool('breath'); // Set the specific tool
        onNavigate('Wellness');  // Switch to Wellness tab
      },
    };
  };

  const recommendation = getSmartRecommendation();

  // Quick Access Grid - Avoiding redundancy by picking high-value targets
  const quickActions = [
    { label: 'Panic SOS', icon: Flame, color: '#EF4444', tool: 'Grounding', tab: 'Wellness' },
    { label: 'Reframe', icon: Brain, color: '#EC4899', tool: 'cbt', tab: 'Wellness' },
    { label: 'Energy', icon: Zap, color: '#F59E0B', tool: 'breath', tab: 'Wellness' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FloatingParticles />

      {/* Header with Personalization */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting},</Text>
          <Text style={styles.userName}>{userData?.name || 'Friend'}</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn} onPress={() => onNavigate('Profile')}>
          <User size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Hero: Emotional Check-in */}
      <View style={styles.orbContainer}>
        <MoodOrb mood="calm" size={140} />
        <View style={styles.orbTextContainer}>
          <Text style={styles.orbLabel}>Current Vibe</Text>
          <Text style={styles.orbValue}>Calm & Focused</Text>
          <TouchableOpacity 
            style={styles.checkInButton}
            onPress={() => onNavigate('Journal')}
          >
            <Text style={styles.checkInText}>Log Mood</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* AI Daily Insight - Uniques Feature */}
      <GlassCard style={styles.insightCard} gradient>
        <View style={styles.insightHeader}>
          <Sparkles size={20} color={theme.colors.warning} />
          <Text style={styles.insightTitle}>Daily Insight</Text>
        </View>
        <Text style={styles.insightText}>
          "Your focus peaks around 10 AM. Try scheduling your deep work blocks then for maximum efficiency."
        </Text>
      </GlassCard>

      {/* Smart Recommendation (The "One Thing") */}
      <Text style={styles.sectionTitle}>Recommended for You</Text>
      <TouchableOpacity onPress={recommendation.action} activeOpacity={0.8}>
        <GlassCard style={styles.recommendationCard}>
          <View style={[styles.recIcon, { backgroundColor: `${recommendation.color}20` }]}>
            <recommendation.icon size={32} color={recommendation.color} />
          </View>
          <View style={styles.recContent}>
            <Text style={styles.recTitle}>{recommendation.title}</Text>
            <Text style={styles.recSubtitle}>{recommendation.subtitle}</Text>
          </View>
          <View style={[styles.playBtn, { backgroundColor: recommendation.color }]}>
            <ArrowRight size={20} color="#FFF" />
          </View>
        </GlassCard>
      </TouchableOpacity>

      {/* Quick Actions Grid - Direct access to tools */}
      <Text style={styles.sectionTitle}>Quick Tools</Text>
      <View style={styles.quickGrid}>
        {quickActions.map((action, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.quickCard}
            onPress={() => {
              setActiveTool(action.tool);
              onNavigate(action.tab);
            }}
          >
            <GlassCard style={styles.quickGlass}>
              <action.icon size={24} color={action.color} />
              <Text style={styles.quickLabel}>{action.label}</Text>
            </GlassCard>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

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
  insightCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 20,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.warning,
    textTransform: 'uppercase',
  },
  insightText: {
    fontSize: 15,
    color: theme.colors.text,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  recommendationCard: {
    marginHorizontal: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  recIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recContent: {
    flex: 1,
  },
  recTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  recSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  quickCard: {
    flex: 1,
  },
  quickGlass: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
});