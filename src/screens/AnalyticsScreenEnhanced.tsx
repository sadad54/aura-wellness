import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { TrendingUp, Calendar, Award, Zap, Heart, Activity } from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { AIInsightCard } from '../components/AIInsightCard';
import { theme } from '../theme';

interface MetricData {
  day: string;
  value: number;
}

export const AnalyticsScreenEnhanced: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  // Sample data
  const moodData: MetricData[] = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 72 },
    { day: 'Wed', value: 68 },
    { day: 'Thu', value: 85 },
    { day: 'Fri', value: 80 },
    { day: 'Sat', value: 90 },
    { day: 'Sun', value: 88 },
  ];

  const sleepData: MetricData[] = [
    { day: 'Mon', value: 6.5 },
    { day: 'Tue', value: 7.2 },
    { day: 'Wed', value: 7.0 },
    { day: 'Thu', value: 8.0 },
    { day: 'Fri', value: 7.8 },
    { day: 'Sat', value: 8.5 },
    { day: 'Sun', value: 8.2 },
  ];

  const focusData: MetricData[] = [
    { day: 'Mon', value: 72 },
    { day: 'Tue', value: 80 },
    { day: 'Wed', value: 75 },
    { day: 'Thu', value: 85 },
    { day: 'Fri', value: 88 },
    { day: 'Sat', value: 70 },
    { day: 'Sun', value: 65 },
  ];

  const stressData: MetricData[] = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 38 },
    { day: 'Wed', value: 42 },
    { day: 'Thu', value: 25 },
    { day: 'Fri', value: 30 },
    { day: 'Sat', value: 15 },
    { day: 'Sun', value: 20 },
  ];

  const maxValue = 100;
  const maxSleep = 9;

  const wellnessScore = 82;
  const currentStreak = 24;
  const totalSessions = 156;
  const averageMood = 79;

  const ChartBar: React.FC<{ value: number; max: number; color: string; label: string }> = ({
    value,
    max,
    color,
    label,
  }) => {
    const height = (value / max) * 80;
    return (
      <View style={styles.chartBarContainer}>
        <View
          style={[
            styles.chartBar,
            {
              height: `${height}%`,
              backgroundColor: color,
            },
          ]}
        />
        <Text style={styles.chartLabel}>{label}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Wellness Analytics</Text>
        <Text style={styles.subtitle}>Your emotional journey</Text>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {(['week', 'month'] as const).map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && {
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.primary,
              },
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period && { color: '#FFFFFF' },
              ]}
            >
              {period === 'week' ? 'This Week' : 'This Month'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Wellness Score Card */}
      <GlassCard style={styles.scoreCard} gradient = {true}>
        <View style={styles.scoreContent}>
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreLabel}>Wellness Score</Text>
            <Text style={styles.scoreValue}>{wellnessScore}</Text>
            <Text style={styles.scoreSubtext}>↑ 8% from last week</Text>
          </View>
          <View style={styles.scoreRing}>
            <Text style={styles.scoreRingText}>{wellnessScore}%</Text>
          </View>
        </View>
      </GlassCard>

      {/* Key Metrics */}
      <View style={styles.metricsRow}>
        <GlassCard style={styles.metricCard} gradient={true}>
          <Award size={24} color={theme.colors.success} />
          <Text style={styles.metricValue}>{currentStreak}</Text>
          <Text style={styles.metricLabel}>Day Streak</Text>
        </GlassCard>
        <GlassCard style={styles.metricCard} gradient={true}>
          <Zap size={24} color={theme.colors.warning} />
          <Text style={styles.metricValue}>{totalSessions}</Text>
          <Text style={styles.metricLabel}>Sessions</Text>
        </GlassCard>
        <GlassCard style={styles.metricCard} gradient={true}>
          <Heart size={24} color="#EC4899" />
          <Text style={styles.metricValue}>{averageMood}</Text>
          <Text style={styles.metricLabel}>Avg Mood</Text>
        </GlassCard>
      </View>

      {/* Mood Over Time Chart */}
      <Text style={styles.chartTitle}>Mood Over Time</Text>
      <GlassCard style={styles.chartCard} gradient={true}>
        <View style={styles.chart}>
          {moodData.map((data, index) => (
            <ChartBar
              key={index}
              value={data.value}
              max={maxValue}
              color="#06B6D4"
              label={data.day}
            />
          ))}
        </View>
      </GlassCard>

      {/* Sleep Quality Chart */}
      <Text style={styles.chartTitle}>Sleep Quality (hours)</Text>
      <GlassCard style={styles.chartCard} gradient={true}>
        <View style={styles.chart}>
          {sleepData.map((data, index) => (
            <ChartBar
              key={index}
              value={data.value}
              max={maxSleep}
              color="#8B5CF6"
              label={data.day}
            />
          ))}
        </View>
      </GlassCard>

      {/* Focus Score Chart */}
      <Text style={styles.chartTitle}>Focus Score</Text>
      <GlassCard style={styles.chartCard} gradient={true}>
        <View style={styles.chart}>
          {focusData.map((data, index) => (
            <ChartBar
              key={index}
              value={data.value}
              max={maxValue}
              color="#10B981"
              label={data.day}
            />
          ))}
        </View>
      </GlassCard>

      {/* Stress Level Chart (inverted) */}
      <Text style={styles.chartTitle}>Stress Level</Text>
      <GlassCard style={styles.chartCard} gradient={true}>
        <View style={styles.chart}>
          {stressData.map((data, index) => (
            <ChartBar
              key={index}
              value={data.value}
              max={maxValue}
              color="#EF4444"
              label={data.day}
            />
          ))}
        </View>
      </GlassCard>

      {/* AI Insights */}
      <Text style={styles.insightTitle}>AI Insights</Text>
      <AIInsightCard
        title="Emotional Pattern"
        insight="Your mood significantly improves during weekends. Consider planning challenging tasks for Tuesday-Thursday for better results."
        trend="up"
        trendValue="+12%"
        gradient
      />
      <AIInsightCard
        title="Sleep Analysis"
        insight="You're getting 7.6 hours average sleep—excellent! This correlates with 15% better focus on those days."
        trend="up"
        trendValue="7.6hrs"
      />
      <AIInsightCard
        title="Stress Reduction"
        insight="Your stress levels dropped 35% this week. Meditation sessions before 3 PM are most effective for you."
        trend="down"
        trendValue="-35%"
      />
      <AIInsightCard
        title="Focus Peak Times"
        insight="Your peak focus occurs 9 AM - 12 PM on weekdays. Schedule deep work during these hours for 25% higher productivity."
        trend="up"
        trendValue="9AM-12PM"
      />

      {/* Weekly Summary */}
      <GlassCard style={styles.summaryCard} gradient={true}>
        <View style={styles.summaryHeader}>
          <TrendingUp size={24} color={theme.colors.primary} />
          <Text style={styles.summaryTitle}>Weekly Summary</Text>
        </View>
        <Text style={styles.summaryText}>
          This week was transformative! Your wellness score improved by 8%, with particularly strong performance on meditation sessions. You completed 12 journaling entries and maintained an 89% consistency rate. Sleep quality improved significantly, contributing to better focus and lower stress.
        </Text>
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportButtonText}>📥 Export Full Report</Text>
        </TouchableOpacity>
      </GlassCard>

      {/* Achievements */}
      <Text style={styles.achievementTitle}>Recent Achievements</Text>
      <View style={styles.achievementsGrid}>
        {[
          { emoji: '🔥', title: '7-Day Streak', subtitle: 'Week meditation' },
          { emoji: '😴', title: 'Good Sleeper', subtitle: '8+ hours' },
          { emoji: '📖', title: 'Journal Master', subtitle: '50 entries' },
          { emoji: '🎯', title: 'Focus Master', subtitle: '90+ score' },
        ].map((achievement, index) => (
          <GlassCard key={index} style={styles.achievementCard}>
            <Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
            <Text style={styles.achievementName}>{achievement.title}</Text>
            <Text style={styles.achievementDesc}>{achievement.subtitle}</Text>
          </GlassCard>
        ))}
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  spacer: {
    height: 40,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  periodButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  scoreCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.lg,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.xs,
  },
  scoreValue: {
    fontSize: 40,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  scoreSubtext: {
    fontSize: 12,
    color: theme.colors.success,
  },
  scoreRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  scoreRingText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
  metricLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  chartCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 150,
    gap: theme.spacing.xs,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  summaryCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  summaryText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  exportButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  exportButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  achievementCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  achievementEmoji: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  achievementName: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
});
