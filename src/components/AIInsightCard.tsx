import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlassCard } from './GlassCard';
import { theme } from '../theme';
import { Sparkles } from 'lucide-react-native';

interface AIInsightCardProps {
  title: string;
  insight: string;
  metric?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  onPress?: () => void;
  gradient?: boolean;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  insight,
  metric,
  trend = 'neutral',
  trendValue,
  onPress,
  gradient = false,
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return theme.colors.success;
      case 'down':
        return '#EF4444';
      case 'neutral':
      default:
        return theme.colors.accent;
    }
  };

  const getTrendEmoji = () => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      default:
        return '→';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <GlassCard gradient={gradient} style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Sparkles size={18} color={theme.colors.primary} />
            <Text style={styles.title}>{title}</Text>
          </View>
          {metric && (
            <View style={[styles.metricBadge, { borderColor: getTrendColor() }]}>
              <Text style={styles.metricEmoji}>{getTrendEmoji()}</Text>
              <Text style={[styles.metricText, { color: getTrendColor() }]}>
                {trendValue || metric}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.insight}>{insight}</Text>
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  metricBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    gap: 4,
  },
  metricEmoji: {
    fontSize: 14,
  },
  metricText: {
    fontSize: 12,
    fontWeight: '600',
  },
  insight: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});
