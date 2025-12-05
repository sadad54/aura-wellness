import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { TrendingUp, Award, Activity, BookOpen, Sparkles } from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { theme } from '../theme';

export const AnalyticsScreen: React.FC = () => {
  const weekData = [
    { day: 'Mon', value: 75 },
    { day: 'Tue', value: 85 },
    { day: 'Wed', value: 68 },
    { day: 'Thu', value: 92 },
    { day: 'Fri', value: 78 },
    { day: 'Sat', value: 88 },
    { day: 'Sun', value: 95 },
  ];

  const stats = [
    { label: 'Avg Wellness', value: '83%', icon: TrendingUp, color: '#10B981' },
    { label: 'Streak', value: '12 days', icon: Award, color: '#F59E0B' },
    { label: 'Sessions', value: '47', icon: Activity, color: '#06B6D4' },
    { label: 'Journal Entries', value: '28', icon: BookOpen, color: '#EC4899' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Weekly wellness overview</Text>
      </View>

      <GlassCard style={styles.chartCard}>
        <Text style={styles.chartTitle}>Wellness Score</Text>
        <View style={styles.chart}>
          {weekData.map((item, index) => (
            <View key={index} style={styles.chartBar}>
              <View style={styles.chartBarContainer}>
                <View 
                  style={[
                    styles.chartBarFill, 
                    { height: `${item.value}%` }
                  ]} 
                />
              </View>
              <Text style={styles.chartLabel}>{item.day}</Text>
            </View>
          ))}
        </View>
      </GlassCard>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <GlassCard key={index} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </GlassCard>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Insights</Text>
      <GlassCard style={styles.insightCard}>
        <Sparkles size={24} color="#7C3AED" />
        <Text style={styles.insightText}>
          Your wellness score improved by 15% this week! You're most productive on Thursdays and Sundays.
        </Text>
      </GlassCard>
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
  chartCard: {
    marginBottom: theme.spacing.lg,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chartBarContainer: {
    width: '60%',
    height: 180,
    justifyContent: 'flex-end',
  },
  chartBarFill: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});