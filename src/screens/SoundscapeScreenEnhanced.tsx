import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Animated, Dimensions } from 'react-native';
import { Play, Pause, Volume2, Timer, RotateCcw } from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { theme } from '../theme';

interface Soundscape {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient: [string, string];
  icon: string;
}

export const SoundscapeScreenEnhanced: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedScene, setSelectedScene] = useState('rainforest');
  const [volume, setVolume] = useState(0.7);
  const [duration, setDuration] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const waveformBars = Array(12).fill(0);

  const soundscapes: Soundscape[] = [
    {
      id: 'rainforest',
      name: 'Rainforest',
      description: 'Tropical ambience with birds',
      color: '#10B981',
      gradient: ['#10B981', '#059669'],
      icon: '🌿',
    },
    {
      id: 'ocean',
      name: 'Ocean Waves',
      description: 'Calming ocean soundscape',
      color: '#06B6D4',
      gradient: ['#06B6D4', '#0891B2'],
      icon: '🌊',
    },
    {
      id: 'space',
      name: 'Deep Space',
      description: 'Cosmic meditation',
      color: '#8B5CF6',
      gradient: ['#8B5CF6', '#7C3AED'],
      icon: '🚀',
    },
    {
      id: 'fireplace',
      name: 'Fireplace',
      description: 'Cozy crackling fire',
      color: '#F59E0B',
      gradient: ['#F59E0B', '#D97706'],
      icon: '🔥',
    },
    {
      id: 'forest',
      name: 'Forest Rain',
      description: 'Rain in the woods',
      color: '#059669',
      gradient: ['#059669', '#047857'],
      icon: '🌧️',
    },
    {
      id: 'meditation',
      name: 'Meditation Bell',
      description: 'Zen ambience',
      color: '#EC4899',
      gradient: ['#EC4899', '#DB2777'],
      icon: '🔔',
    },
  ];

  const currentScene = soundscapes.find((s) => s.id === selectedScene);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isPlaying, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setTimeLeft(duration);
    setIsPlaying(false);
  };

  const getWaveformHeight = (index: number) => {
    if (!isPlaying) return 0.2;
    return Math.random() * 0.8 + 0.2;
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: `${currentScene?.color}05` },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Soundscapes</Text>
        <Text style={styles.subtitle}>Find your perfect ambient atmosphere</Text>
      </View>

      {/* Now Playing Section */}
      {currentScene && (
        <GlassCard style={[styles.nowPlayingCard, { borderColor: `${currentScene.color}40` }]}>
          <View style={styles.nowPlayingContent}>
            <Text style={styles.nowPlayingEmoji}>{currentScene.icon}</Text>
            <View style={styles.nowPlayingInfo}>
              <Text style={styles.nowPlayingTitle}>{currentScene.name}</Text>
              <Text style={styles.nowPlayingDesc}>{currentScene.description}</Text>
            </View>
          </View>
        </GlassCard>
      )}

      {/* Player Section */}
      <GlassCard style={styles.playerCard} gradient>
        {/* Visualizer */}
        <View style={styles.visualizer}>
          <Animated.View
            style={[
              styles.outerRing,
              {
                transform: [{ rotate: rotation }],
              },
            ]}
          >
            <View style={styles.outerRingInner} />
          </Animated.View>

          <View style={styles.waveformContainer}>
            {waveformBars.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.waveformBar,
                  {
                    height: isPlaying ? `${getWaveformHeight(index) * 100}%` : '20%',
                    backgroundColor: currentScene?.color || theme.colors.primary,
                  },
                ]}
              />
            ))}
          </View>

          <View style={[styles.centerCircle, { backgroundColor: currentScene?.color }]} />
        </View>

        {/* Time Display */}
        <Text style={styles.timeDisplay}>{formatTime(timeLeft)}</Text>

        {/* Play Button */}
        <TouchableOpacity
          style={[
            styles.playButton,
            {
              backgroundColor: currentScene?.color || theme.colors.primary,
            },
          ]}
          onPress={handlePlayPause}
          activeOpacity={0.7}
        >
          {isPlaying ? (
            <Pause size={40} color="#FFFFFF" fill="#FFFFFF" />
          ) : (
            <Play size={40} color="#FFFFFF" fill="#FFFFFF" />
          )}
        </TouchableOpacity>

        {/* Control Buttons */}
        <View style={styles.controlButtons}>
          <TouchableOpacity
            style={[styles.controlButton, styles.controlButtonSecondary]}
            onPress={handleReset}
          >
            <RotateCcw size={18} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Timer size={18} color={theme.colors.primary} />
            <Text style={styles.controlButtonText}>{duration}m</Text>
          </TouchableOpacity>
        </View>
      </GlassCard>

      {/* Volume Control */}
      <GlassCard style={styles.controlCard}>
        <View style={styles.volumeHeader}>
          <Volume2 size={20} color={theme.colors.primary} />
          <Text style={styles.controlLabel}>Volume</Text>
          <Text style={styles.volumeValue}>{Math.round(volume * 100)}%</Text>
        </View>
        <View style={styles.volumeSliderContainer}>
          <View
            style={[
              styles.volumeSlider,
              {
                width: `${volume * 100}%`,
                backgroundColor: currentScene?.color || theme.colors.primary,
              },
            ]}
          />
        </View>
      </GlassCard>

      {/* Scene Selector */}
      <Text style={styles.sceneTitle}>Choose Your Scene</Text>
      <View style={styles.scenesGrid}>
        {soundscapes.map((scene) => (
          <TouchableOpacity
            key={scene.id}
            style={[
              styles.sceneCard,
              selectedScene === scene.id && {
                backgroundColor: `${scene.color}30`,
                borderColor: scene.color,
              },
            ]}
            onPress={() => {
              setSelectedScene(scene.id);
              setIsPlaying(false);
              setTimeLeft(duration);
            }}
            activeOpacity={0.6}
          >
            <Text style={styles.sceneEmoji}>{scene.icon}</Text>
            <Text style={styles.sceneName}>{scene.name}</Text>
            <Text style={styles.sceneDescription}>{scene.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Duration Selector */}
      <Text style={styles.durationTitle}>Session Duration</Text>
      <View style={styles.durationButtons}>
        {[15, 30, 60, 120].map((min) => (
          <TouchableOpacity
            key={min}
            style={[
              styles.durationButton,
              duration === min && {
                backgroundColor: currentScene?.color || theme.colors.primary,
                borderColor: currentScene?.color || theme.colors.primary,
              },
            ]}
            onPress={() => {
              setDuration(min);
              setTimeLeft(min);
              setIsPlaying(false);
            }}
          >
            <Text
              style={[
                styles.durationButtonText,
                duration === min && { color: '#FFFFFF' },
              ]}
            >
              {min}m
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Info Card */}
      <GlassCard style={styles.infoCard}>
        <Text style={styles.infoTitle}>💡 Soundscape Tips</Text>
        <Text style={styles.infoText}>
          • Use soundscapes during work for better focus{'\n'}
          • Before bed to help you fall asleep{'\n'}
          • During meditation for deeper relaxation{'\n'}
          • Background ambience while reading or studying
        </Text>
      </GlassCard>

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
    marginBottom: theme.spacing.xl,
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
  nowPlayingCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  nowPlayingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  nowPlayingEmoji: {
    fontSize: 40,
  },
  nowPlayingInfo: {
    flex: 1,
  },
  nowPlayingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
  },
  nowPlayingDesc: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  playerCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
  },
  visualizer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    position: 'relative',
  },
  outerRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  outerRingInner: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  waveformContainer: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.md,
  },
  waveformBar: {
    width: '6%',
    borderRadius: 2,
    minHeight: '20%',
  },
  centerCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  timeDisplay: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    fontFamily: 'monospace',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: theme.spacing.lg,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    justifyContent: 'center',
  },
  controlButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  controlButtonSecondary: {
    paddingHorizontal: theme.spacing.md,
  },
  controlButtonText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  controlCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  volumeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
  volumeValue: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  volumeSliderContainer: {
    height: 6,
    backgroundColor: theme.colors.surface,
    borderRadius: 3,
    overflow: 'hidden',
  },
  volumeSlider: {
    height: '100%',
    borderRadius: 3,
  },
  sceneTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  scenesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  sceneCard: {
    width: '47%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sceneEmoji: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  sceneName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  sceneDescription: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  durationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  durationButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  durationButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  infoCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  infoText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
});
