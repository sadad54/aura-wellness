import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { User, Sparkles, Sun, Moon, Brain, Battery, Heart, Zap, Music, BookOpen, Wind, ChevronRight } from 'lucide-react-native';
import { FloatingParticles } from '../components/FloatingParticles';
import { GlassCard } from '../components/GlassCard';
import { theme } from '../theme';

interface HomeScreenProps {
  userData?: { name?: string };
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ userData }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const metrics = [
    { icon: Brain, label: 'Focus', value: 85, color: '#8B5CF6' },
    { icon: Battery, label: 'Energy', value: 72, color: '#F59E0B' },
    { icon: Heart, label: 'Calm', value: 91, color: '#06B6D4' },
    { icon: Zap, label: 'Balance', value: 78, color: '#10B981' },
  ];

  const activities = [
    { icon: Music, title: 'Ocean Waves', subtitle: '15 min session', color: '#06B6D4' },
    { icon: BookOpen, title: 'Morning Journal', subtitle: 'Write your thoughts', color: '#EC4899' },
    { icon: Moon, title: 'Sleep Meditation', subtitle: 'Prepare for rest', color: '#8B5CF6' },
    { icon: Wind, title: 'Breathing Exercise', subtitle: '5 min practice', color: '#10B981' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FloatingParticles />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.userName}>{userData?.name || 'Guest'}</Text>
        </View>
        <TouchableOpacity style={styles.avatarContainer}>
          <User size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <GlassCard style={styles.forecastCard} gradient>
        <View style={styles.forecastHeader}>
          <Sparkles size={28} color="#7C3AED" />
          <Text style={styles.forecastTitle}>Your Wellness Forecast</Text>
        </View>
        <Text style={styles.forecastText}>
          Today is perfect for deep work and creative exploration. Your energy peaks in the afternoon. Consider a mindful break around 3 PM.
        </Text>
        <View style={styles.forecastMetrics}>
          <View style={styles.forecastMetric}>
            <Sun size={20} color="#F59E0B" />
            <Text style={styles.forecastMetricText}>Peak: 3 PM</Text>
          </View>
          <View style={styles.forecastMetric}>
            <Moon size={20} color="#8B5CF6" />
            <Text style={styles.forecastMetricText}>Rest: 10 PM</Text>
          </View>
        </View>
      </GlassCard>

      <Text style={styles.sectionTitle}>Wellness Metrics</Text>
      <View style={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <GlassCard key={index} style={styles.metricCard}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}%</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${metric.value}%`, backgroundColor: metric.color }]} />
            </View>
          </GlassCard>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recommended Activities</Text>
      {activities.map((activity, index) => (
        <TouchableOpacity key={index}>
          <GlassCard style={styles.activityCard}>
            <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
              <activity.icon size={24} color={activity.color} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textTertiary} />
          </GlassCard>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  forecastCard: {
    marginHorizontal: theme.spacing.lg,
  },
  forecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  forecastText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  forecastMetrics: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  forecastMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  forecastMetricText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  metricCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
  metricLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: theme.colors.surface,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.md,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
});