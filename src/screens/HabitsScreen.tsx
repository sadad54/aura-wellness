import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Platform 
} from 'react-native';
import { 
  Sun, 
  BookHeart, 
  Droplets, 
  Dumbbell, 
  Moon, 
  Plus,
  TrendingUp,
  Flame,
  Calendar,
  CheckCircle2,
  Circle
} from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { theme } from '../theme';

interface Habit {
  id: string;
  name: string;
  time: string;
  streak: number;
  completed: boolean;
  icon: any;
  color: string;
}

export const HabitsScreen: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'morning' | 'evening' | 'anytime'>('all');
  
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Meditation',
      time: '7:00 AM',
      streak: 7,
      completed: true,
      icon: Sun,
      color: '#F59E0B',
    },
    {
      id: '2',
      name: 'Gratitude Journal',
      time: '7:30 AM',
      streak: 12,
      completed: true,
      icon: BookHeart,
      color: '#EC4899',
    },
    {
      id: '3',
      name: 'Hydration',
      time: 'All day',
      streak: 21,
      completed: false,
      icon: Droplets,
      color: '#06B6D4',
    },
    {
      id: '4',
      name: 'Exercise',
      time: '6:00 PM',
      streak: 5,
      completed: false,
      icon: Dumbbell,
      color: '#10B981',
    },
    {
      id: '5',
      name: 'Evening Reflection',
      time: '9:00 PM',
      streak: 14,
      completed: false,
      icon: Moon,
      color: '#8B5CF6',
    },
  ]);

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completedDays = [true, true, true, true, true, false, false];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Habits</Text>
        <Text style={styles.subtitle}>Building your best self, one day at a time</Text>
      </View>

      {/* Progress Card */}
      <GlassCard style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Today's Progress</Text>
          <View style={styles.progressBadge}>
            <TrendingUp size={14} color="#F59E0B" />
            <Text style={styles.progressBadgeText}>{completedCount}/{totalCount}</Text>
          </View>
        </View>

        {/* Circular Progress */}
        <View style={styles.circularProgress}>
          <View style={styles.progressRing}>
            <View style={[styles.progressArc, { 
              borderColor: '#EC4899',
              borderTopColor: progressPercentage > 0 ? '#EC4899' : 'transparent',
              borderRightColor: progressPercentage > 25 ? '#EC4899' : 'transparent',
              borderBottomColor: progressPercentage > 50 ? '#EC4899' : 'transparent',
              borderLeftColor: progressPercentage > 75 ? '#EC4899' : 'transparent',
            }]} />
            <View style={styles.progressCenter}>
              <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
            </View>
          </View>
        </View>

        <Text style={styles.remainingText}>
          {totalCount - completedCount} habits remaining
        </Text>
      </GlassCard>

      {/* AI Recommendation Card */}
      <GlassCard style={styles.aiCard}>
        <View style={styles.aiHeader}>
          <View style={styles.aiIcon}>
            <TrendingUp size={20} color="#FFFFFF" />
          </View>
          <View style={styles.aiContent}>
            <Text style={styles.aiTitle}>AI Recommends</Text>
            <Text style={styles.aiDescription}>
              Based on your stress levels and sleep quality, try adding "Evening Reflection" to your routine.
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Habit</Text>
          <Plus size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </GlassCard>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {(['all', 'morning', 'evening', 'anytime'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterButton,
              filter === f && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(f)}
          >
            <Text style={[
              styles.filterText,
              filter === f && styles.filterTextActive,
            ]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Habits List */}
      <View style={styles.habitsList}>
        {habits.map((habit) => (
          <TouchableOpacity
            key={habit.id}
            onPress={() => toggleHabit(habit.id)}
            activeOpacity={0.7}
          >
            <GlassCard style={styles.habitCard}>
              <View style={[styles.habitIcon, { backgroundColor: habit.color }]}>
                <habit.icon size={24} color="#FFFFFF" />
              </View>
              
              <View style={styles.habitContent}>
                <Text style={styles.habitName}>{habit.name}</Text>
                <View style={styles.habitMeta}>
                  <Text style={styles.habitTime}>{habit.time}</Text>
                  <View style={styles.streakBadge}>
                    <Flame size={14} color="#F59E0B" />
                    <Text style={styles.streakText}>{habit.streak} day streak</Text>
                  </View>
                </View>
              </View>

              <View style={[
                styles.checkCircle,
                habit.completed && styles.checkCircleCompleted,
              ]}>
                {habit.completed ? (
                  <CheckCircle2 size={28} color="#10B981" />
                ) : (
                  <Circle size={28} color={theme.colors.textTertiary} />
                )}
              </View>
            </GlassCard>
          </TouchableOpacity>
        ))}

        {/* Add New Habit Button */}
        <TouchableOpacity>
          <View style={styles.addNewHabit}>
            <Plus size={20} color={theme.colors.textSecondary} />
            <Text style={styles.addNewHabitText}>Add New Habit</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Weekly Overview */}
      <View style={styles.weeklySection}>
        <View style={styles.weeklyHeader}>
          <Calendar size={20} color={theme.colors.text} />
          <Text style={styles.weeklyTitle}>This Week</Text>
        </View>
        
        <View style={styles.weekDays}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.dayColumn}>
              <Text style={styles.dayLabel}>{day}</Text>
              <View style={[
                styles.dayIndicator,
                completedDays[index] && styles.dayIndicatorCompleted,
              ]} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },

  // Progress Card
  progressCard: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  progressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  progressBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },

  // Circular Progress
  circularProgress: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.lg,
  },
  progressRing: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  progressArc: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 12,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressCenter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  remainingText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },

  // AI Card
  aiCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    marginBottom: theme.spacing.md,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 6,
  },
  aiDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },

  // Filter Tabs
  filterContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  filterButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterButtonActive: {
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: theme.colors.text,
    fontWeight: '600',
  },

  // Habits List
  habitsList: {
    marginBottom: theme.spacing.xl,
  },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  habitIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  habitContent: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 6,
  },
  habitMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  habitTime: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  streakText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  checkCircle: {
    marginLeft: theme.spacing.sm,
  },
  checkCircleCompleted: {
    // No additional styles needed, color is set in the icon
  },

  // Add New Habit
  addNewHabit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    gap: theme.spacing.sm,
  },
  addNewHabitText: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },

  // Weekly Section
  weeklySection: {
    marginBottom: theme.spacing.xl * 2,
  },
  weeklyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  weeklyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  dayColumn: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  dayLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  dayIndicator: {
    width: 32,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.surface,
  },
  dayIndicatorCompleted: {
    backgroundColor: '#EC4899',
  },
});