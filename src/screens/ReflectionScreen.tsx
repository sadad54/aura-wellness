import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Ensure you have expo-linear-gradient installed
import { Heart, Moon, Zap, CloudLightning } from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { theme } from '../theme';

export const ReflectionScreen: React.FC = () => {
  const history = [
    { date: 'Nov 7', mood: 'Happy', score: 8, type: 'happy' },
    { date: 'Nov 8', mood: 'Calm', score: 7, type: 'calm' },
    { date: 'Nov 9', mood: 'Anxious', score: 6, type: 'anxious' },
    { date: 'Nov 10', mood: 'Calm', score: 9, type: 'calm' },
    { date: 'Nov 11', mood: 'Happy', score: 8, type: 'happy' },
    { date: 'Nov 12', mood: 'Calm', score: 7, type: 'calm' },
  ];

  const getMoodGradient = (type: string): [string, string] => {
    switch (type) {
      case 'happy': return ['#F59E0B', '#EC4899'];
      case 'calm': return ['#06B6D4', '#3B82F6'];
      case 'anxious': return ['#F97316', '#EF4444'];
      default: return ['#8B5CF6', '#7C3AED'];
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'happy': return <Heart size={16} color="#FFF" fill="#FFF" />;
      case 'calm': return <Moon size={16} color="#FFF" fill="#FFF" />;
      case 'anxious': return <CloudLightning size={16} color="#FFF" fill="#FFF" />;
      default: return <Zap size={16} color="#FFF" fill="#FFF" />;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Reflection</Text>
        <Text style={styles.subtitle}>Patterns and insights</Text>
      </View>

      {/* Weekly Reflection Card */}
      <GlassCard style={styles.highlightCard}>
        <View style={styles.highlightHeader}>
          <Heart size={24} color={theme.colors.secondary} />
          <Text style={styles.highlightTitle}>Weekly Reflection</Text>
        </View>
        <Text style={styles.highlightText}>
          You were <Text style={styles.bold}>calm 4 days</Text> this week — keep your rhythm steady. Your consistency is building real peace.
        </Text>
      </GlassCard>

      {/* Emotional Weather List */}
      <Text style={styles.sectionTitle}>Emotional Weather</Text>
      <View style={styles.listContainer}>
        {history.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.dateText}>{item.date}</Text>
            
            <LinearGradient
              colors={getMoodGradient(item.type)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.moodBar}
            >
              <View style={styles.moodContent}>
                {getIcon(item.type)}
                <Text style={styles.moodText}>{item.mood}</Text>
              </View>
            </LinearGradient>

            <Text style={styles.scoreText}>{item.score}</Text>
          </View>
        ))}
      </View>

      {/* Timeline Section */}
      <Text style={styles.sectionTitle}>Your Timeline</Text>
      <GlassCard style={styles.timelineCard}>
        {history.slice(0, 3).map((item, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={[styles.timelineIcon, { backgroundColor: getMoodGradient(item.type)[0] }]}>
              {getIcon(item.type)}
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineMood}>{item.mood}</Text>
              <Text style={styles.timelineDate}>{item.date}, 2025</Text>
            </View>
          </View>
        ))}
      </GlassCard>
      
      <View style={{ height: 100 }} />
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
  header: { marginBottom: theme.spacing.lg },
  title: { fontSize: 32, fontWeight: 'bold', color: theme.colors.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary },
  
  highlightCard: { marginBottom: theme.spacing.xl, borderColor: theme.colors.secondary + '40' },
  highlightHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm, gap: 8 },
  highlightTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.secondary },
  highlightText: { fontSize: 15, color: theme.colors.text, lineHeight: 22 },
  bold: { fontWeight: 'bold', color: '#FFF' },

  sectionTitle: { fontSize: 18, fontWeight: '600', color: theme.colors.text, marginBottom: theme.spacing.md },
  
  listContainer: { marginBottom: theme.spacing.xl },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md },
  dateText: { width: 60, fontSize: 13, color: theme.colors.textSecondary },
  moodBar: { flex: 1, height: 44, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 16, marginHorizontal: 12 },
  moodContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  moodText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  scoreText: { width: 30, textAlign: 'center', fontSize: 16, fontWeight: '600', color: theme.colors.textSecondary },

  timelineCard: { paddingVertical: theme.spacing.lg },
  timelineItem: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.lg, paddingHorizontal: theme.spacing.sm },
  timelineIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  timelineContent: { flex: 1 },
  timelineMood: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text },
  timelineDate: { fontSize: 13, color: theme.colors.textSecondary },
});