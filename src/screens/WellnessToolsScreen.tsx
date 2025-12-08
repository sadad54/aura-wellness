import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { ShieldAlert, Wind, Brain, Heart, Sparkles, MessageCircle, AlertCircle } from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { theme } from '../theme';

interface WellnessToolsScreenProps {
  onNavigate: (screen: string) => void;
}

export const WellnessToolsScreen: React.FC<WellnessToolsScreenProps> = ({ onNavigate }) => {
  const tools = [
    { id: 'panic', title: 'Panic SOS', subtitle: '5-4-3-2-1 Grounding', icon: ShieldAlert, color: '#06B6D4', screen: 'Grounding' },
    { id: 'breath', title: 'Breath', subtitle: 'Nervous system', icon: Wind, color: '#8B5CF6', screen: 'breath' },
    { id: 'cbt', title: 'Reframing', subtitle: 'CBT Tracker', icon: Brain, color: '#EC4899', screen: 'cbt' },
    { id: 'emotion', title: 'Emotions', subtitle: 'Identify feelings', icon: Heart, color: '#EF4444', screen: 'emotion' },
    { id: 'affirm', title: 'Affirmations', subtitle: 'Daily power', icon: Sparkles, color: '#F59E0B', screen: 'affirm' },
    { id: 'inner', title: 'Inner Child', subtitle: 'Healing dialog', icon: MessageCircle, color: '#10B981', screen: 'inner' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Wellness Tools</Text>
        <Text style={styles.subtitle}>Evidence-based mental health support</Text>
      </View>

      {/* Panic SOS Banner */}
      <TouchableOpacity onPress={() => onNavigate('Grounding')} activeOpacity={0.8}>
        <GlassCard style={styles.banner} gradient>
          <View style={styles.bannerContent}>
            <View style={styles.bannerIcon}>
              <AlertCircle size={24} color="#EF4444" />
            </View>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>Feeling overwhelmed?</Text>
              <Text style={styles.bannerSubtitle}>Quick grounding exercise available below</Text>
            </View>
            <View style={styles.startButton}>
              <Text style={styles.startText}>Start</Text>
            </View>
          </View>
        </GlassCard>
      </TouchableOpacity>

      {/* Tools Grid */}
      <View style={styles.grid}>
        {tools.map((tool) => (
          <TouchableOpacity 
            key={tool.id} 
            style={styles.gridItem}
            onPress={() => onNavigate(tool.screen)}
          >
            <GlassCard style={styles.toolCard}>
              <View style={[styles.iconContainer, { backgroundColor: `${tool.color}20` }]}>
                <tool.icon size={28} color={tool.color} />
              </View>
              <Text style={styles.toolTitle}>{tool.title}</Text>
              <Text style={styles.toolSubtitle}>{tool.subtitle}</Text>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: theme.spacing.lg,
  },
  header: { marginBottom: theme.spacing.lg },
  title: { fontSize: 32, fontWeight: 'bold', color: theme.colors.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary },
  
  banner: { marginBottom: theme.spacing.xl, borderColor: '#EF4444' },
  bannerContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bannerIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EF444420', alignItems: 'center', justifyContent: 'center' },
  bannerText: { flex: 1 },
  bannerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text },
  bannerSubtitle: { fontSize: 12, color: theme.colors.textSecondary },
  startButton: { backgroundColor: '#EF4444', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  startText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridItem: { width: '48%' },
  toolCard: { height: 160, padding: 16, justifyContent: 'space-between' },
  iconContainer: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  toolTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginBottom: 4 },
  toolSubtitle: { fontSize: 12, color: theme.colors.textSecondary },
});