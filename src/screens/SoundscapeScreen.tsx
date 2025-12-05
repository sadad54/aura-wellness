import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Play, Pause, Volume2 } from 'lucide-react-native';
import { FloatingParticles } from '../components/FloatingParticles';
import { GlassCard } from '../components/GlassCard';
import { theme } from '../theme';

export const SoundscapeScreen: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [selectedScene, setSelectedScene] = useState('ocean');
  const [volume, setVolume] = useState(75);

  const scenes = [
    { id: 'ocean', name: 'Ocean Waves', icon: '🌊', color: '#06B6D4', description: 'Calming coastal sounds' },
    { id: 'rain', name: 'Rainforest', icon: '🌧️', color: '#10B981', description: 'Tropical rain ambience' },
    { id: 'space', name: 'Deep Space', icon: '✨', color: '#8B5CF6', description: 'Cosmic tranquility' },
    { id: 'fire', name: 'Fireplace', icon: '🔥', color: '#F59E0B', description: 'Warm crackling fire' },
    { id: 'forest', name: 'Forest', icon: '🌲', color: '#059669', description: 'Woodland serenity' },
    { id: 'wind', name: 'Mountain Wind', icon: '💨', color: '#0EA5E9', description: 'Alpine breeze' },
  ];

  const currentScene = scenes.find(s => s.id === selectedScene);

  return (
    <View style={styles.container}>
      <FloatingParticles />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Soundscapes</Text>
          <Text style={styles.subtitle}>Immersive audio environments</Text>
        </View>

        <GlassCard 
          style={[styles.nowPlayingCard, { borderColor: currentScene?.color }]} 
          gradient
        >
          <Text style={styles.nowPlayingLabel}>Now Playing</Text>
          <Text style={styles.nowPlayingScene}>
            {currentScene?.icon} {currentScene?.name}
          </Text>
          <Text style={styles.nowPlayingDescription}>
            {currentScene?.description}
          </Text>
          
          <View style={styles.playerControls}>
            <TouchableOpacity 
              style={[styles.playButton, { backgroundColor: currentScene?.color }]} 
              onPress={() => setPlaying(!playing)}
            >
              {playing ? (
                <Pause size={32} color="#FFFFFF" />
              ) : (
                <Play size={32} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.volumeControl}>
            <Volume2 size={20} color={theme.colors.textSecondary} />
            <View style={styles.volumeSlider}>
              <View 
                style={[
                  styles.volumeFill, 
                  { width: `${volume}%`, backgroundColor: currentScene?.color }
                ]} 
              />
            </View>
            <Text style={styles.volumeText}>{volume}%</Text>
          </View>
        </GlassCard>

        <Text style={styles.sectionTitle}>Select Scene</Text>
        <View style={styles.scenesGrid}>
          {scenes.map((scene) => (
            <TouchableOpacity
              key={scene.id}
              onPress={() => setSelectedScene(scene.id)}
            >
              <GlassCard
                style={[
                  styles.sceneCard,
                  ...(selectedScene === scene.id ? [{ 
                    borderColor: scene.color, 
                    borderWidth: 2 
                  }] : []),
                ]}
              >
                <Text style={styles.sceneIcon}>{scene.icon}</Text>
                <Text style={styles.sceneName}>{scene.name}</Text>
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
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
  nowPlayingCard: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  nowPlayingLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  nowPlayingScene: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  nowPlayingDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  playerControls: {
    marginBottom: theme.spacing.lg,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing.md,
  },
  volumeSlider: {
    flex: 1,
    height: 4,
    backgroundColor: theme.colors.surface,
    borderRadius: 2,
    overflow: 'hidden',
  },
  volumeFill: {
    height: '100%',
  },
  volumeText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    width: 40,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  scenesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  sceneCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  sceneIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.sm,
  },
  sceneName: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '600',
  },
});